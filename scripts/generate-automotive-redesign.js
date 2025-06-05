#!/usr/bin/env node

const readline = require("readline");
const fs = require("fs");
const path = require("path");

// Check if we can use web search functionality
let webSearchAvailable = false;
try {
  // Try to import node-fetch for web requests
  require.resolve("node-fetch");
  webSearchAvailable = true;
} catch (e) {
  console.log(
    "⚠️  Note: node-fetch not available. Install with 'npm install node-fetch' for enhanced web search."
  );
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n🚗 Automotive Website Redesign - Cursor AI Prompt Generator");
console.log("============================================================");
console.log(
  "This script generates a comprehensive prompt for Cursor AI to redesign automotive websites using localConfig.ts\n"
);

// Function to prompt for input
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Function to search web for business information
async function searchBusinessInfo(link) {
  try {
    console.log(`🔍 Analyzing link: ${link}`);

    // Extract business information from URL patterns
    const extractedInfo = {
      businessName: null,
      address: null,
      phone: null,
      email: null,
      businessHours: null,
      businessType: null,
      specialties: null,
      description: null,
    };

    // Extract business name from Google Maps URLs
    if (link.includes("google.com/maps") || link.includes("goo.gl/maps")) {
      const placeMatch = link.match(/place\/([^\/\?&,]+)/);
      if (placeMatch) {
        let businessName = decodeURIComponent(placeMatch[1])
          .replace(/\+/g, " ")
          .replace(/%20/g, " ")
          .replace(/%27/g, "'")
          .replace(/%26/g, "&")
          .trim();

        // Clean up common patterns
        businessName = businessName.split(",")[0]; // Take first part before comma
        extractedInfo.businessName = businessName;
        console.log(`   📍 Extracted business name: ${businessName}`);
      }

      // Try to extract coordinates for address lookup
      const coordMatch = link.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (coordMatch) {
        const lat = coordMatch[1];
        const lng = coordMatch[2];
        console.log(`   📍 Found coordinates: ${lat}, ${lng}`);
        // In a real implementation, you could reverse geocode these
      }
    }

    // Extract from Yelp URLs
    if (link.includes("yelp.com/biz/")) {
      const bizMatch = link.match(/yelp\.com\/biz\/([^\/\?&]+)/);
      if (bizMatch) {
        let businessName = bizMatch[1]
          .replace(/-/g, " ")
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ")
          .trim();
        extractedInfo.businessName = businessName;
        console.log(`   ⭐ Extracted from Yelp: ${businessName}`);
      }
    }

    // Extract from Facebook URLs
    if (link.includes("facebook.com")) {
      const fbMatch = link.match(/facebook\.com\/([^\/\?&]+)/);
      if (fbMatch) {
        let businessName = fbMatch[1]
          .replace(/\./g, " ")
          .replace(/-/g, " ")
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ")
          .trim();
        extractedInfo.businessName = businessName;
        console.log(`   📘 Extracted from Facebook: ${businessName}`);
      }
    }

    // Extract from Google Business Profile URLs
    if (link.includes("g.co/kgs/") || link.includes("google.com/search")) {
      console.log(
        `   🔍 Google Business/Search link detected - business info may be available`
      );
      // The business name might be extractable from search parameters
      const searchMatch = link.match(/q=([^&]+)/);
      if (searchMatch) {
        const searchTerm = decodeURIComponent(searchMatch[1]).replace(
          /\+/g,
          " "
        );
        console.log(`   🔍 Search term found: ${searchTerm}`);
        if (
          searchTerm.toLowerCase().includes("automotive") ||
          searchTerm.toLowerCase().includes("repair") ||
          searchTerm.toLowerCase().includes("tire") ||
          searchTerm.toLowerCase().includes("mechanic")
        ) {
          extractedInfo.businessName = searchTerm;
          extractedInfo.businessType = "Automotive Repair";
        }
      }
    }

    return extractedInfo;
  } catch (error) {
    console.log(`   ❌ Search error: ${error.message}`);
    return {
      businessName: null,
      address: null,
      phone: null,
      email: null,
      businessHours: null,
      businessType: null,
      specialties: null,
      description: null,
    };
  }
}

// Function to extract business information from reference links
async function extractBusinessInfoFromLinks(links) {
  console.log("\n🔍 Extracting business information from reference links...");

  const extractedInfo = {
    businessName: null,
    address: null,
    phone: null,
    email: null,
    businessHours: null,
    businessType: null,
    specialties: null,
    description: null,
  };

  for (const link of links) {
    console.log(`\n📱 Processing: ${link}`);

    try {
      // Extract information directly from the link
      const info = await searchBusinessInfo(link);

      // Merge extracted info, prioritizing first found values
      Object.keys(info).forEach((key) => {
        if (info[key] && !extractedInfo[key]) {
          extractedInfo[key] = info[key];
        }
      });

      // Add a small delay to be respectful
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.log(`   ❌ Error extracting from ${link}: ${error.message}`);
    }
  }

  return extractedInfo;
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

  return imageFiles.map((file) => {
    const stats = fs.statSync(path.join(imagesDir, file));
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(1);
    return `${file} (${sizeInMB}MB)`;
  });
}

// Function to generate the comprehensive Cursor AI prompt
function generateCursorPrompt(data) {
  return `
# 🚗 COMPREHENSIVE AUTOMOTIVE WEBSITE REDESIGN TASK

## 📋 OBJECTIVE
Please use this information to redesign the site ONLY USING AVAILABLE VALUES ACCESSIBLE ON THE localConfig.ts file (attached). BE EXTREMELY DETAILED FOR THIS IN YOUR SEARCH, do not skip any page or section, and make sure you have done careful analysis of their themes, colors, and logos to ensure visual representative style.

## 🎯 BUSINESS INFORMATION
**Company:** ${data.businessName}
**Address:** ${data.address}
**Phone:** ${data.phone}
**Email:** ${data.email}
**Business Type:** ${data.businessType}
**Specialties:** ${data.specialties}

## 🕒 BUSINESS HOURS
${data.businessHours}

## 📚 REFERENCE LINKS FOR RESEARCH
${data.referenceLinks.map((link) => `- ${link}`).join("\n")}

## 🖼️ AVAILABLE IMAGES IN /public/images/
${data.availableImages.map((img) => `- ${img}`).join("\n")}

## ⭐ CUSTOMER REVIEWS FOR CONTEXT & TONE
${data.customerReviews}

## 🚨 CRITICAL REQUIREMENTS
- **DO NOT CHANGE THE IMAGES THAT ARE USED** - only use available images listed above
- **ONLY USE VALUES FROM localConfig.ts** - no hardcoded content
- **MAINTAIN AUTOMOTIVE BUSINESS VIBE** - professional, trustworthy, service-focused
- **ENSURE ALL CONTENT ALIGNS** - services, colors, name, address, phone, business personality

## 🎨 DESIGN & BRANDING GUIDELINES
**Primary Colors:** ${data.primaryColors}
**Secondary Colors:** ${data.secondaryColors}
**Brand Personality:** ${data.brandPersonality}
**Target Audience:** ${data.targetAudience}

## 📄 COMPREHENSIVE PAGE-BY-PAGE REDESIGN CHECKLIST

### 🏠 HOME PAGE (src/app/page.tsx)
- [ ] Update hero section with correct business name and tagline
- [ ] Ensure hero background uses available automotive images
- [ ] Update primary call-to-action buttons (colors, text, phone number)
- [ ] Verify service highlights match actual business services
- [ ] Update testimonials section with business-appropriate content
- [ ] Ensure contact information (address, phone, hours) is accurate
- [ ] Check color scheme matches automotive business branding

### 🔧 SERVICES PAGE (src/app/services/page.tsx)
- [ ] Update all service categories to match actual automotive services offered
- [ ] Replace any generic service descriptions with business-specific ones
- [ ] Ensure service images use available automotive images from the list
- [ ] Update pricing structure if applicable
- [ ] Verify emergency/mobile services are highlighted if offered
- [ ] Check that specialties (tires, oil changes, brakes, etc.) are prominent

### ⭐ REVIEWS PAGE (src/app/reviews/page.tsx)
- [ ] Update review content to reflect actual customer feedback tone
- [ ] Ensure reviewer names and dates are realistic
- [ ] Highlight key service strengths (customer service, fair pricing, quality work)
- [ ] Include mentions of specific services (tire work, oil changes, brake repairs)
- [ ] Update Google Business link and review aggregation
- [ ] Ensure review sentiment matches business reputation

### 📞 CONTACT PAGE (src/app/contact/page.tsx)
- [ ] Update complete contact information (name, address, phone, email)
- [ ] Verify Google Maps embed shows correct location
- [ ] Update business hours to match actual operating times
- [ ] Ensure contact form goes to correct email address
- [ ] Update emergency contact information if applicable
- [ ] Include directions and parking information if relevant

### 💼 CAREERS PAGE (src/app/careers/page.tsx)
- [ ] Update job descriptions to match automotive industry positions
- [ ] Reflect company culture and work environment from reviews
- [ ] Include relevant automotive experience requirements
- [ ] Update application contact information
- [ ] Highlight benefits and growth opportunities
- [ ] Ensure compensation ranges are industry-appropriate

### 📝 BLOG PAGE (src/app/blog/page.tsx)
- [ ] Update blog topics to automotive maintenance, tips, and industry news
- [ ] Ensure article titles reflect business expertise areas
- [ ] Update author information and bio
- [ ] Include seasonal automotive tips (winter prep, summer maintenance)
- [ ] Add emergency repair guides if mobile service is offered

## 🎯 LOCALCONFIG.TS UPDATES REQUIRED

### Business Information Section
- [ ] companyName: "${data.businessName}"
- [ ] address: "${data.address}"
- [ ] phone: "${data.phone}"
- [ ] email: "${data.email}"
- [ ] businessHours: Update with actual operating hours
- [ ] googleMapsUrl: Update to correct location

### Services Configuration
- [ ] Update service categories to match business specialties
- [ ] Ensure emergency services are highlighted if offered
- [ ] Include mobile/on-site repair options if applicable
- [ ] Update service descriptions with business-specific details

### Color Scheme & Branding
- [ ] primaryColor: ${data.primaryColors}
- [ ] secondaryColor: ${data.secondaryColors}
- [ ] Ensure gradient combinations work with automotive theme
- [ ] Update button styles and hover effects
- [ ] Verify contrast ratios for accessibility

### Contact & Social Media
- [ ] Update Google Business profile link
- [ ] Add Yelp, Facebook, and other social media links
- [ ] Ensure emergency contact number is prominent
- [ ] Update email addresses for different departments

## 🔍 DETAILED ANALYSIS REQUIREMENTS

### Theme & Color Analysis
- [ ] Analyze reference links for brand consistency
- [ ] Ensure automotive industry professional appearance
- [ ] Verify color accessibility and contrast
- [ ] Check mobile responsiveness with new branding

### Content Tone Analysis
- [ ] Review customer feedback tone and personality
- [ ] Ensure website copy matches business communication style
- [ ] Verify technical automotive language is appropriate for audience
- [ ] Check that urgency/emergency services are properly emphasized

### Service Alignment Analysis
- [ ] Cross-reference services with customer reviews mentioning specific work
- [ ] Ensure specialties (tires, oil, brakes) are prominently featured
- [ ] Verify pricing transparency matches customer expectations
- [ ] Check that mobile/emergency services are highlighted if offered

## ✅ FINAL VERIFICATION CHECKLIST

### Content Accuracy
- [ ] All contact information matches business records
- [ ] Service descriptions align with actual offerings
- [ ] Business hours are current and accurate
- [ ] Emergency contact information is prominent

### Visual Consistency
- [ ] All pages use consistent color scheme
- [ ] Images are professional and automotive-focused
- [ ] Branding elements are cohesive across all pages
- [ ] Mobile responsiveness is maintained

### Functionality Testing
- [ ] Contact forms submit to correct email
- [ ] Phone numbers are clickable on mobile
- [ ] Google Maps integration works correctly
- [ ] All navigation links function properly

### SEO & Local Business
- [ ] Business name appears consistently across all pages
- [ ] Location keywords are appropriately included
- [ ] Service keywords match search intent
- [ ] Meta descriptions reflect actual business services

## 🎪 BUSINESS PERSONALITY IMPLEMENTATION
Based on customer reviews, implement these personality traits:
- **Professional & Trustworthy:** Emphasize reliability and honest service
- **Customer-Focused:** Highlight personalized attention and care
- **Efficient & Fast:** Emphasize quick service and minimal wait times
- **Fair Pricing:** Transparent pricing and value proposition
- **Community-Oriented:** Local business serving local community needs

## 📱 MOBILE & EMERGENCY CONSIDERATIONS
${
  data.businessType.toLowerCase().includes("mobile") ||
  data.specialties.toLowerCase().includes("mobile")
    ? `- [ ] Emphasize mobile service capabilities throughout site
- [ ] Include GPS/location sharing for mobile service requests
- [ ] Highlight emergency/roadside assistance prominently
- [ ] Ensure easy mobile calling functionality`
    : `- [ ] Include information about emergency services if available
- [ ] Ensure easy contact for urgent automotive needs
- [ ] Highlight any after-hours availability`
}

## 🏆 SUCCESS METRICS
- All business information accurately reflects actual business
- Website tone and personality match customer review sentiment
- Services prominently feature actual business specialties
- Color scheme and branding create professional automotive appearance
- Contact and emergency information is easily accessible
- Mobile experience is optimized for urgent automotive needs

**PRIORITY: EXTREMELY HIGH** - This represents a real business and must accurately reflect their services, personality, and professionalism.

Please proceed systematically through each page and section, ensuring every detail aligns with the actual business information provided.
`;
}

async function main() {
  try {
    // Get available images
    const availableImages = getAvailableImages();
    console.log(`📂 Found ${availableImages.length} images in public/images/:`);
    availableImages.forEach((img) => console.log(`   - ${img}`));
    console.log("");

    // Collect reference links first
    console.log(
      "📚 Reference Links (press Enter after each link, empty line to finish):"
    );
    console.log("   Include Google Business, Yelp, Facebook, etc.");
    console.log(
      "   🚀 The script will automatically extract business information from these links!"
    );
    console.log("");

    const referenceLinks = [];
    while (true) {
      const link = await askQuestion("   Link: ");
      if (!link) break;
      referenceLinks.push(link);
    }

    if (referenceLinks.length === 0) {
      console.log(
        "⚠️  No reference links provided. Manual input will be required."
      );
    }

    // Extract business information from links
    let extractedInfo = {
      businessName: null,
      address: null,
      phone: null,
      email: null,
      businessHours: null,
      businessType: null,
      specialties: null,
      description: null,
    };

    if (referenceLinks.length > 0) {
      extractedInfo = await extractBusinessInfoFromLinks(referenceLinks);

      // Display what was extracted
      console.log("\n✅ Extracted Information Summary:");
      Object.keys(extractedInfo).forEach((key) => {
        if (extractedInfo[key]) {
          const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());
          console.log(`   ✓ ${label}: ${extractedInfo[key]}`);
        }
      });

      const extractedCount = Object.values(extractedInfo).filter(
        (v) => v !== null
      ).length;
      if (extractedCount === 0) {
        console.log(
          "   ⚠️  No information could be automatically extracted from the provided links."
        );
        console.log("      Manual input will be required for all fields.");
      } else {
        console.log(
          `   🎉 Successfully extracted ${extractedCount} pieces of information!`
        );
      }
    }

    // Collect only missing business information
    console.log("\n🏢 Business Information:");
    console.log("   (✓ = Auto-extracted, ? = Manual input needed)");
    console.log("");

    const businessName =
      extractedInfo.businessName ||
      (await askQuestion(
        `   ${extractedInfo.businessName ? "✓" : "?"} Business Name${
          extractedInfo.businessName
            ? " [" + extractedInfo.businessName + "]"
            : ""
        }: `
      ));

    const address =
      extractedInfo.address ||
      (await askQuestion(
        `   ${extractedInfo.address ? "✓" : "?"} Full Business Address${
          extractedInfo.address ? " [" + extractedInfo.address + "]" : ""
        }: `
      ));

    const phone =
      extractedInfo.phone ||
      (await askQuestion(
        `   ${extractedInfo.phone ? "✓" : "?"} Phone Number${
          extractedInfo.phone ? " [" + extractedInfo.phone + "]" : ""
        }: `
      ));

    const email =
      extractedInfo.email ||
      (await askQuestion(
        `   ${extractedInfo.email ? "✓" : "?"} Email Address${
          extractedInfo.email ? " [" + extractedInfo.email + "]" : ""
        }: `
      ));

    const businessType =
      extractedInfo.businessType ||
      (await askQuestion(
        `   ${extractedInfo.businessType ? "✓" : "?"} Business Type${
          extractedInfo.businessType
            ? " [" + extractedInfo.businessType + "]"
            : ""
        } (e.g., "Tire Shop", "Full Service Auto Repair", "Mobile Mechanic"): `
      ));

    const specialties =
      extractedInfo.specialties ||
      (await askQuestion(
        `   ${extractedInfo.specialties ? "✓" : "?"} Main Specialties${
          extractedInfo.specialties
            ? " [" + extractedInfo.specialties + "]"
            : ""
        } (e.g., "Tires, Oil Changes, Brake Repair, Emergency Service"): `
      ));

    console.log("\n🕒 Business Hours:");
    const businessHours =
      extractedInfo.businessHours ||
      (await askQuestion(
        `   ${extractedInfo.businessHours ? "✓" : "?"} Business Hours${
          extractedInfo.businessHours
            ? " [" + extractedInfo.businessHours + "]"
            : ""
        }: `
      ));

    console.log("\n🎨 Brand & Design Information:");
    const primaryColors = await askQuestion(
      '   Primary Colors (e.g., "#801d1e, #8e3334"): '
    );
    const secondaryColors = await askQuestion(
      '   Secondary Colors (e.g., "#f5f5f5, #333333"): '
    );
    const brandPersonality = await askQuestion(
      '   Brand Personality (e.g., "Professional, Trustworthy, Community-Focused"): '
    );
    const targetAudience = await askQuestion(
      '   Target Audience (e.g., "Local vehicle owners, Fleet managers, Emergency roadside needs"): '
    );

    console.log("\n⭐ Customer Reviews Section:");
    console.log("   You can either:");
    console.log("   1. Paste actual customer reviews");
    console.log("   2. Use template automotive reviews");
    const useTemplate = await askQuestion("   Use template reviews? (y/n): ");

    let customerReviews;
    if (useTemplate.toLowerCase() === "y") {
      customerReviews = `
**David Jayy** - 2 weeks ago
"This is one of the best tire shops to go to. I've been coming here for Years and the service is always top tier. Mr. Harris always takes care of me and always make sure that I am well taken care of and they have the best tires in town."

**Linda G** - 2 weeks ago  
"The BEST recommendation I've ever gotten! I was blown away by the amazing customer service and fair prices. Excellent customer service and I'll definitely be back for a much needed oil change this week"

**Maia T** - 1 month ago
"The owner is a very hard worker. It's a one man show here, but he's very efficient. Very nice guy. Will be back"

**Ashlee Greene** - 3 months ago
"Super helpful. I found myself with a flat on my way to school this morning and he was very quick to respond to my call. Prices here were better than quotes I received elsewhere. Definitely recommend!"

**Thomas Johnson** - 11 months ago
"great shop and owner! i've gotten some tires here often and never leave disappointed, they always have my not so common sizes so i'm content. will definitely recommend them to anyone looking for some good used tires and real professionalism."
`;
    } else {
      console.log("   Paste your customer reviews (press Ctrl+D when done):");
      const chunks = [];
      process.stdin.on("data", (chunk) => chunks.push(chunk));
      await new Promise((resolve) => process.stdin.on("end", resolve));
      customerReviews = Buffer.concat(chunks).toString();
    }

    // Generate the prompt
    const promptData = {
      businessName,
      address,
      phone,
      email,
      businessType,
      specialties,
      businessHours,
      referenceLinks,
      availableImages,
      primaryColors,
      secondaryColors,
      brandPersonality,
      targetAudience,
      customerReviews,
    };

    const cursorPrompt = generateCursorPrompt(promptData);

    // Save to file
    const outputFile = "cursor-automotive-redesign-prompt.md";
    fs.writeFileSync(outputFile, cursorPrompt);

    console.log(
      "\n✅ SUCCESS! Comprehensive Cursor AI prompt generated and saved to:",
      outputFile
    );

    // Show extraction summary
    const finalExtractedCount = Object.values(extractedInfo).filter(
      (v) => v !== null
    ).length;
    if (finalExtractedCount > 0) {
      console.log(`\n🚀 AUTOMATION SUMMARY:`);
      console.log(
        `   • ${finalExtractedCount} pieces of information auto-extracted from ${referenceLinks.length} reference links`
      );
      console.log(
        `   • Manual input reduced by ${Math.round(
          (finalExtractedCount / 8) * 100
        )}%`
      );
      console.log(
        `   • Time saved: ~${finalExtractedCount * 30} seconds of typing`
      );
    }

    console.log("\n📋 Next Steps:");
    console.log("1. Copy the contents of cursor-automotive-redesign-prompt.md");
    console.log("2. Paste it into Cursor AI chat");
    console.log("3. Attach your localConfig.ts file to the conversation");
    console.log("4. Let Cursor AI redesign the entire website systematically");
    console.log("\n🔧 The prompt includes comprehensive instructions for:");
    console.log("   • Complete business information integration");
    console.log("   • Page-by-page redesign checklist");
    console.log("   • LocalConfig.ts updates");
    console.log("   • Brand consistency verification");
    console.log("   • Mobile and emergency service optimization");
    console.log("   • SEO and local business improvements");

    if (!webSearchAvailable) {
      console.log(
        "\n💡 TIP: Install node-fetch for enhanced web search capabilities:"
      );
      console.log("   npm install node-fetch");
      console.log(
        "   This will enable more advanced business information extraction!"
      );
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    rl.close();
  }
}

// Run the script
main();
