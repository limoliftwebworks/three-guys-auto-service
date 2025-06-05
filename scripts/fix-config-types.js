const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ts = require('typescript');

// Paths
const configPath = path.join(__dirname, '../src/config/localConfig.ts');
const configTypesPath = path.join(__dirname, '../src/config/configTypes.ts');
const srcDir = path.join(__dirname, '../src');

// Read the config types file
let configTypesContent;
try {
  configTypesContent = fs.readFileSync(configTypesPath, 'utf8');
} catch (error) {
  console.error('Error reading configTypes.ts:', error);
  // Continue with the script as we may not need this for the basic cleanup
}

// Function to extract interface properties from the configTypes.ts file
function extractInterfaceProperties(content, interfaceName) {
  const sourceFile = ts.createSourceFile(
    'configTypes.ts',
    content,
    ts.ScriptTarget.Latest,
    true
  );

  const properties = [];

  function visit(node) {
    if (
      ts.isInterfaceDeclaration(node) &&
      node.name.text === interfaceName
    ) {
      node.members.forEach(member => {
        if (ts.isPropertySignature(member) && member.name) {
          const propertyName = member.name.getText(sourceFile);
          let propertyType = member.type ? member.type.getText(sourceFile) : 'any';
          const isOptional = member.questionToken !== undefined;
          
          properties.push({
            name: propertyName,
            type: propertyType,
            isOptional
          });
        }
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return properties;
}

// Function to get default values based on type
function getDefaultValue(type) {
  switch (type) {
    case 'string':
      return '"Default Value"';
    case 'number':
      return '0';
    case 'boolean':
      return 'false';
    case 'any':
      return '{}';
    default:
      if (type.includes('[]')) {
        return '[]';
      }
      return '{}';
  }
}

// Function to validate and fix the Home page configuration
function validateHomePageConfig(content) {
  try {
    // Check if the HomeCard properties exist in the file
    const homeCardProps = [
      'heroCard1Text', 
      'heroCard2Text', 
      'heroCard3Text', 
      'contactButtonText'
    ];
    
    // Create a simple check for each property
    let missingProps = [];
    
    for (const prop of homeCardProps) {
      const propRegex = new RegExp(`["']${prop}["']\\s*:`);
      if (!propRegex.test(content)) {
        missingProps.push({
          name: prop,
          type: 'string'
        });
      }
    }
    
    if (missingProps.length > 0) {
      console.log(`Missing properties: ${missingProps.map(p => p.name).join(', ')}`);
      
      // Find Home section
      const homeMatch = content.match(/"Home"\s*:\s*{/);
      if (homeMatch) {
        const homeStart = homeMatch.index;
        
        // Look for a good insertion point - right after scheduleButtonColor or heroOverlayColor
        const homeSection = content.substring(homeStart);
        const scheduleButtonMatch = homeSection.match(/"scheduleButtonColor"\s*:\s*"[^"]*"\s*,?\s*(?=\n)/);
        const heroOverlayMatch = homeSection.match(/"heroOverlayColor"\s*:\s*"[^"]*"\s*,?\s*(?=\n)/);
        
        let insertPosition = 0;
        if (scheduleButtonMatch) {
          insertPosition = homeStart + scheduleButtonMatch.index + scheduleButtonMatch[0].length;
        } else if (heroOverlayMatch) {
          insertPosition = homeStart + heroOverlayMatch.index + heroOverlayMatch[0].length;
        } else {
          // Look for subtitle as a fallback
          const subtitleMatch = homeSection.match(/"subtitle"\s*:\s*"[^"]*"\s*,?\s*(?=\n)/);
          if (subtitleMatch) {
            insertPosition = homeStart + subtitleMatch.index + subtitleMatch[0].length;
          } else {
            // If all else fails, look for the end of the guaranteeSection
            const guaranteeSectionMatch = homeSection.match(/"guaranteeSection"\s*:\s*{[^]*?}\s*,?\s*(?=\n)/);
            if (guaranteeSectionMatch) {
              insertPosition = homeStart + guaranteeSectionMatch.index + guaranteeSectionMatch[0].length;
            }
          }
        }
        
        if (insertPosition > 0) {
          // Generate the properties to insert
          const insertText = missingProps
            .map(prop => `\n      "${prop.name}": ${prop.type === 'string' ? `"${prop.name.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase())}"` : getDefaultValue(prop.type)}`)
            .join(',');
          
          // Insert after the found property
          content = 
            content.slice(0, insertPosition) + 
            (content[insertPosition-1] !== ',' ? ',' : '') + 
            insertText +
            content.slice(insertPosition);
          
          console.log('Updated config with missing HomePage properties');
        } else {
          console.error('Could not find a suitable insertion point in the Home section');
        }
      } else {
        console.error('Could not find Home section in the config');
      }
    } else {
      console.log('All required HomePage properties are present');
    }
    
    return content;
  } catch (error) {
    console.error('Error validating HomePage config:', error);
    return content; // Return the original content in case of errors
  }
}

// Function to validate and ensure all required pages exist
function validateAllPages(content) {
  try {
    // First, check if the pages section exists
    const pagesMatch = content.match(/"pages"\s*:\s*{/);
    if (!pagesMatch) {
      console.error('Could not find pages section in the config');
      return content;
    }

    // Check for required pages
    const requiredPages = ['Contact', 'Reviews', 'Services'];
    let missingPages = [];

    // See which pages are missing
    for (const page of requiredPages) {
      const pageRegex = new RegExp(`["']${page}["']\\s*:\\s*{`);
      if (!pageRegex.test(content)) {
        missingPages.push(page);
      }
    }

    if (missingPages.length > 0) {
      console.log(`Missing pages: ${missingPages.join(', ')}`);

      // We need to find where to insert the missing pages
      // This should be within the pages object, before its closing brace
      
      // First, find the pages section
      const pagesStart = pagesMatch.index;
      const pagesSection = content.substring(pagesStart);
      
      // Find all the page objects within the pages section
      const pageMatches = Array.from(pagesSection.matchAll(/"([^"]+)"\s*:\s*{/g));
      
      // If we found any pages, insert after the last one's closing brace
      if (pageMatches.length > 0) {
        // Find the last page
        const lastPageMatch = pageMatches[pageMatches.length - 1];
        const lastPageName = lastPageMatch[1];
        const lastPageStart = pagesStart + lastPageMatch.index;
        
        // Find the closing brace for this page by counting braces
        let lastPageSection = pagesSection.substring(lastPageMatch.index);
        let braceCount = 1; // Start with 1 for the opening brace
        let endPos = 0;
        
        for (let i = lastPageMatch[0].length; i < lastPageSection.length; i++) {
          if (lastPageSection[i] === '{') braceCount++;
          if (lastPageSection[i] === '}') braceCount--;
          
          if (braceCount === 0) {
            endPos = i;
            break;
          }
        }
        
        if (endPos > 0) {
          const insertPosition = lastPageStart + endPos + 1; // +1 to get past the closing brace
          
          // Generate the missing pages content
          let insertText = '';
          
          // Add each missing page with default content
          for (const page of missingPages) {
            if (page === 'Contact') {
              insertText += `,
      "Contact": {
        "title": "Contact Us",
        "content": "<p>Get in touch with our team today.</p>",
        "heroImage": "/images/hero-contact.jpg"
      }`;
            } else if (page === 'Reviews') {
              insertText += `,
      "Reviews": {
        "title": "Customer Reviews",
        "highlight": "Our Community",
        "subtitle": "We're committed to excellence",
        "content": "<p>See what our customers say about us.</p>",
        "titleColor": "#111827",
        "highlightColor": "#4f46e5",
        "subtitleColor": "#4b5563",
        "contentColor": "#6b7280",
        "badge": "Testimonials",
        "badgeColor": "#f3e8ff",
        "badgeTextColor": "#9333ea",
        "heroBgColor": "#4f46e5",
        "heroGradientStart": "#4338ca",
        "heroGradientEnd": "#6366f1",
        "heroOverlayOpacity": 0.5,
        "reviewsSectionTitle": "What Our Customers Say",
        "reviewsSectionSubtitle": "Read testimonials from satisfied customers",
        "reviewsTitleColor": "#065f46",
        "reviewsSubtitleColor": "#047857",
        "testimonialLayout": "grid",
        "cardsPerRow": "3",
        "cardBgColor": "#ffffff",
        "cardBorderColor": "#e5e7eb",
        "cardTextColor": "#374151",
        "cardShadow": "md",
        "authorNameColor": "#111827",
        "ratingColor": "#FBBF24",
        "ctaTitle": "Ready to Experience Our Service?",
        "ctaDescription": "Join our growing list of satisfied customers today.",
        "ctaTitleColor": "#FFFFFF",
        "ctaDescriptionColor": "#F3F4F6",
        "ctaButtonText": "Schedule Now",
        "ctaButtonUrl": "/#schedule",
        "ctaButtonBgColor": "#FFFFFF",
        "ctaButtonTextColor": "#4F46E5",
        "ctaSecondaryButtonText": "Call Us",
        "ctaSecondaryButtonUrl": "tel:+10000000000",
        "ctaSecondaryButtonBgColor": "#4F46E5",
        "ctaSecondaryButtonTextColor": "#FFFFFF",
        "ctaBgColor": "#4F46E5",
        "ctaGradientStart": "#4338ca",
        "ctaGradientEnd": "#6366f1",
        "ctaPatternStyle": "diagonal-lines",
        "reviews": [
          {
            "text": "They did an incredible job. I'm extremely happy with the results and would recommend them to everyone!",
            "author": "Customer A.",
            "rating": 5
          },
          {
            "text": "The service was AMAZING!! Their work is top notch!",
            "author": "Customer B.",
            "rating": 5
          },
          {
            "text": "Great experience from start to finish. Will definitely use their services again.",
            "author": "Customer C.",
            "rating": 5
          }
        ]
      }`;
            } else if (page === 'Services') {
              insertText += `,
      "Services": {
        "title": "Our Services",
        "subtitle": "Professional services with quality guaranteed.",
        "badge": "Certified Professionals",
        "yearsExperience": "10+",
        "carsRepaired": "1000+",
        "serviceCategories": [
          {
            "id": "category1",
            "title": "Main Services",
            "icon": "<Icon className=\\"w-full h-full\\" />",
            "description": "Our primary service offerings",
            "bgImage": "/images/back1.png",
            "color": "from-primary-500 to-primary-600",
            "services": [
              {
                "title": "Service 1",
                "description": "Description of service 1",
                "icon": "<Icon1 className=\\"w-6 h-6\\" />"
              },
              {
                "title": "Service 2",
                "description": "Description of service 2",
                "icon": "<Icon2 className=\\"w-6 h-6\\" />"
              }
            ]
          }
        ],
        "expertiseTitle": "Why Choose Us",
        "expertiseDescription": "We provide the highest quality service with attention to detail.",
        "expertiseCards": [
          {
            "title": "Quality First",
            "description": "We never compromise on quality."
          },
          {
            "title": "Advanced Techniques",
            "description": "We use the latest technologies and methodologies."
          },
          {
            "title": "Customer Satisfaction",
            "description": "Your satisfaction is our top priority."
          }
        ],
        "ctaTitle": "Ready to Get Started?",
        "ctaDescription": "Schedule your appointment today.",
        "scheduleButtonText": "Schedule Now",
        "callButtonText": "Call Us Now",
        "heroImage": "/images/hero-services.jpg"
      }`;
            }
          }
          
          // Insert the missing pages
          content = 
            content.slice(0, insertPosition) + 
            insertText +
            content.slice(insertPosition);
          
          console.log('Added missing pages to the configuration');
        } else {
          console.error('Could not find the end of the last page section');
        }
      } else {
        // If we didn't find any pages, add them as the first pages
        const pagesOpenBracePos = pagesStart + "\"pages\": {".length;
        
        // Generate the missing pages content
        let insertText = '';
        
        // Add each missing page with default content
        for (const page of missingPages) {
          if (page === 'Contact') {
            insertText += `
      "Contact": {
        "title": "Contact Us",
        "content": "<p>Get in touch with our team today.</p>",
        "heroImage": "/images/hero-contact.jpg"
      },`;
          } else if (page === 'Reviews') {
            // Same as above
            // ...
          } else if (page === 'Services') {
            // Same as above
            // ...
          }
        }
        
        // Insert right after the opening brace of pages
        content = 
          content.slice(0, pagesOpenBracePos) + 
          insertText +
          content.slice(pagesOpenBracePos);
        
        console.log('Added missing pages to the configuration');
      }
    } else {
      console.log('All required pages are present');
    }
    
    return content;
  } catch (error) {
    console.error('Error validating pages:', error);
    return content; // Return the original content in case of errors
  }
}

// Function to fix the config file
function fixConfigFile() {
  console.log('Fixing and validating localConfig.ts...');
  
  try {
    // Read the current file
    let content = fs.readFileSync(configPath, 'utf8');
    
    // Always clean the file completely
    const localConfigIndex = content.indexOf('const localConfig');
    if (localConfigIndex > 0) {
      // Extract the comment header
      let headerMatch = content.match(/\/\/ Define the type.*\n\/\/ Last updated.*/);
      const headerComment = headerMatch ? headerMatch[0] : '// Define the type for the localConfig object';
      
      // Create a clean import section
      const importSection = `${headerComment}
import { SiteConfig } from './configTypes';

// Export the LocalConfig interface as an alias for backward compatibility
export type LocalConfig = SiteConfig;

`;
      
      // Get the localConfig part
      const configPart = content.substring(localConfigIndex);
      
      // Combine parts
      content = importSection + configPart;
      
      // Validate and update HomePage properties
      content = validateHomePageConfig(content);
      
      // Validate and ensure all required pages exist
      content = validateAllPages(content);
      
      // Write to file
      fs.writeFileSync(configPath, content, 'utf8');
      console.log('✅ localConfig.ts completely cleaned, fixed and validated');
    } else {
      console.error('❌ Could not find "const localConfig" in the file');
    }
    
    // Clean up backup files
    cleanupBackupFiles();
    
  } catch (error) {
    console.error('❌ Error fixing localConfig.ts:', error);
  }
}

// Function to clean up backup files that cause TypeScript errors
function cleanupBackupFiles() {
  console.log('Cleaning up backup files...');
  
  try {
    // Find and delete all backup files
    const backupPattern = path.join(srcDir, 'config', 'localConfig.backup-*.ts');
    
    // In Windows environment, use more specific commands
    if (process.platform === 'win32') {
      try {
        // Delete files using rimraf-style approach
        const backupFiles = fs.readdirSync(path.join(srcDir, 'config'))
          .filter(file => file.startsWith('localConfig.backup-') && file.endsWith('.ts'))
          .map(file => path.join(srcDir, 'config', file));
        
        // Delete each file
        let deletedCount = 0;
        backupFiles.forEach(file => {
          try {
            fs.unlinkSync(file);
            deletedCount++;
          } catch (e) {
            console.error(`Failed to delete ${file}:`, e.message);
          }
        });
        
        if (deletedCount > 0) {
          console.log(`✅ Deleted ${deletedCount} backup files`);
        } else {
          console.log('No backup files found to delete');
        }
      } catch (e) {
        console.error('Error finding or deleting backup files:', e.message);
      }
    } else {
      // For Unix-like systems, use find directly
      try {
        execSync(`find ${srcDir} -name "localConfig.backup-*.ts" -delete`, { stdio: 'inherit' });
        console.log('✅ Backup files cleaned up');
      } catch (e) {
        console.error('Error cleaning backup files:', e.message);
      }
    }
  } catch (error) {
    console.error('❌ Error cleaning backup files:', error);
  }
}

// If this script is run directly
if (require.main === module) {
  fixConfigFile();
}

// Export the function for use in other scripts
module.exports = { fixConfigFile }; 