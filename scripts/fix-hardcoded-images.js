#!/usr/bin/env node

const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  "\n🔧 Hardcoded Image Reference Fixer - Cursor AI Prompt Generator"
);
console.log("================================================================");
console.log(
  "This script generates a comprehensive prompt for Cursor AI to fix hardcoded image references in websites.\n"
);

// Function to prompt for input
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Function to get available images from public/images directory
function getAvailableImages() {
  const imagesDir = path.join(process.cwd(), "public", "images");

  if (!fs.existsSync(imagesDir)) {
    console.log("⚠️  Warning: public/images directory not found");
    return [];
  }

  const files = fs.readdirSync(imagesDir);
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"].includes(ext);
  });

  return imageFiles;
}

// Function to generate the Cursor AI prompt
function generateCursorPrompt(data) {
  return `
# 🔧 TASK: Fix All Hardcoded Image References and Implement Automatic Configuration Control

## 📋 OBJECTIVE
Remove all hardcoded image paths that cause 404 errors and implement a system where hero background images are automatically controlled by configuration files instead of being hardcoded in CSS.

## 🎯 BUSINESS CONTEXT
**Company:** ${data.companyName}
**Website Type:** ${data.websiteType}
**Location:** ${data.location}

## 📚 REFERENCE LINKS
${data.referenceLinks.map((link) => `- ${link}`).join("\n")}

## 🖼️ AVAILABLE IMAGES IN /public/images/
${data.availableImages.map((img) => `- ${img}`).join("\n")}

## 🚀 IMPLEMENTATION STEPS

### Step 1: Remove Hardcoded CSS Background Images
- [ ] Check \`src/app/main.css\` and \`src/app/globals.css\` for hardcoded background images
- [ ] Remove specific image URLs from CSS \`.hero-section\` classes
- [ ] Keep only positioning and sizing properties in CSS

### Step 2: Implement Automatic Hero Image Support
- [ ] Ensure all page components check their configuration for \`heroImage\` property
- [ ] Update hero sections to use this pattern:
\`\`\`javascript
style={{
  backgroundImage: pageConfig.heroImage 
    ? \`linear-gradient(...), url(\${pageConfig.heroImage.startsWith('/') ? pageConfig.heroImage : \`/images/\${pageConfig.heroImage}\`})\`
    : \`linear-gradient(...)\`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}}
\`\`\`

### Step 3: Fix Configuration File
- [ ] Remove any hardcoded \`heroImage\` paths that reference non-existent files
- [ ] Update service categories or content sections that reference missing images
- [ ] Replace with available images from the list above

### Step 4: Update Fallback Categories/Content
- [ ] Check for hardcoded fallback data in page components
- [ ] Replace any \`/images/missing-file.jpg\` references with available images
- [ ] Ensure fallback content uses existing images

### Step 5: Verify All Image References
- [ ] Search codebase for \`/images/\` references
- [ ] Verify each referenced image exists in \`/public/images/\`
- [ ] Replace missing images with available alternatives

## 🎨 PREFERRED IMAGE USAGE
${data.imageUsageGuidelines}

## 🔍 SEARCH PATTERNS
Use these search patterns to find problematic references:
- \`grep -r "/images/" src/\`
- \`grep -r "heroImage.*jpg\\|png\\|gif" src/\`
- \`grep -r "bgImage.*images" src/\`

## ✅ SUCCESS CRITERIA
1. **No 404 errors** in browser console for image files
2. **Hero images controlled by configuration** - no hardcoded CSS background images
3. **Automatic fallbacks** - pages without configured images show gradients
4. **All image references point to existing files** in \`/public/images/\`
5. **Configuration-driven** - easy to change images by updating config files

## 🚨 CRITICAL REQUIREMENTS
- **DO NOT** create new image files or directories
- **ONLY USE** images from the available list above
- **MAINTAIN** existing functionality while removing hardcoded references
- **ENSURE** graceful fallbacks when no hero image is configured
- **TEST** that each page loads without 404 errors

## 📋 FINAL CHECKLIST
- [ ] All CSS background images removed from stylesheets
- [ ] Hero sections support automatic image configuration
- [ ] Configuration file cleaned of non-existent image references
- [ ] Fallback content updated with existing images
- [ ] All pages load without 404 image errors
- [ ] Images controlled entirely through configuration files

**Priority: HIGH** - This affects user experience and SEO due to 404 errors.

## 💡 IMPLEMENTATION NOTES
- Pages should automatically detect if \`heroImage\` is configured and use it
- If no \`heroImage\` is configured, fall back to gradient backgrounds
- Support both relative (\`image.png\`) and absolute (\`/images/image.png\`) paths
- Maintain existing color schemes and styling while fixing image issues

Please proceed to implement these fixes systematically, ensuring each step is completed before moving to the next.
`;
}

async function main() {
  try {
    // Get available images
    const availableImages = getAvailableImages();
    console.log(`📂 Found ${availableImages.length} images in public/images/:`);
    availableImages.forEach((img) => console.log(`   - ${img}`));
    console.log("");

    // Collect information
    const companyName = await askQuestion("🏢 Company/Website Name: ");
    const websiteType = await askQuestion(
      '🌐 Website Type (e.g., "Auto Repair Shop", "Restaurant", "E-commerce"): '
    );
    const location = await askQuestion("📍 Location (optional): ");

    console.log(
      "\n📚 Reference Links (press Enter after each link, empty line to finish):"
    );
    const referenceLinks = [];
    while (true) {
      const link = await askQuestion("   Link: ");
      if (!link) break;
      referenceLinks.push(link);
    }

    console.log("\n🎨 Image Usage Guidelines:");
    const imageUsageGuidelines = await askQuestion(
      '   Describe how images should be used (e.g., "Use red automotive images for heroes, icons for services"): '
    );

    // Generate the prompt
    const promptData = {
      companyName,
      websiteType,
      location,
      referenceLinks,
      availableImages,
      imageUsageGuidelines,
    };

    const cursorPrompt = generateCursorPrompt(promptData);

    // Save to file
    const outputFile = "cursor-fix-images-prompt.md";
    fs.writeFileSync(outputFile, cursorPrompt);

    console.log(
      "\n✅ SUCCESS! Cursor AI prompt generated and saved to:",
      outputFile
    );
    console.log("\n📋 Next Steps:");
    console.log("1. Copy the contents of cursor-fix-images-prompt.md");
    console.log("2. Paste it into Cursor AI chat");
    console.log("3. Let Cursor AI implement the fixes automatically");
    console.log("\n🔧 The prompt includes all necessary instructions to:");
    console.log("   • Remove hardcoded CSS background images");
    console.log("   • Implement automatic hero image configuration");
    console.log("   • Fix missing image references");
    console.log("   • Update fallback content");
    console.log("   • Ensure no 404 errors");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    rl.close();
  }
}

// Run the script
main();
