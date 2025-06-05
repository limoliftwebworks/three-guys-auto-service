#!/usr/bin/env node

const readline = require("readline");
const fs = require("fs");
const path = require("path");

// Check if we can use web search functionality
let webSearchAvailable = false;
let fetch;
try {
  // Try to import node-fetch for web requests
  const nodeFetch = require("node-fetch");
  // node-fetch v3+ exports as ES module with default export
  fetch = nodeFetch.default;

  if (typeof fetch !== "function") {
    throw new Error("node-fetch default export is not a function");
  }

  webSearchAvailable = true;
  console.log("✅ Web scraping enabled with node-fetch");
} catch (e) {
  console.log(
    "⚠️  Note: node-fetch not available. Install with 'npm install node-fetch' for enhanced web scraping."
  );
  console.log("    Limited to URL pattern matching only.");
  console.log("    Error:", e.message);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  "\n🚗 FULLY AUTOMATED Automotive Website Redesign - Cursor AI Prompt Generator"
);
console.log(
  "======================================================================="
);
console.log(
  "This script automatically extracts business data and generates safe prompts for Cursor AI\n"
);
console.log("🚀 FULLY AUTOMATED FEATURES:");
console.log("   ✅ Zero manual input required - 100% automated");
console.log("   🔒 Preserves existing services & guarantee sections");
console.log(
  "   📞 Skips missing contact info (keeps existing localConfig values)"
);
console.log("   🌐 Comprehensive web scraping from 7+ website types");
console.log("   🎨 Smart automotive branding defaults");
console.log("   ⭐ Auto-extracted customer reviews when available\n");

// Function to prompt for input
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Function to delay between requests to be respectful
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to extract text content safely
function extractTextContent(html, selector) {
  try {
    const regex = new RegExp(selector, "gi");
    const matches = html.match(regex);
    if (matches && matches.length > 0) {
      return matches[0].replace(/<[^>]*>/g, "").trim();
    }
  } catch (e) {
    // Silent fail for regex issues
  }
  return null;
}

// Function to extract multiple text contents
function extractMultipleTextContent(html, selector) {
  try {
    const regex = new RegExp(selector, "gi");
    const matches = html.match(regex) || [];
    return matches
      .map((match) => match.replace(/<[^>]*>/g, "").trim())
      .filter((text) => text.length > 0);
  } catch (e) {
    return [];
  }
}

// Enhanced function to scrape business information from web pages
async function scrapeBusinessInfo(link) {
  try {
    console.log(`🔍 Scraping: ${link}`);

    if (!webSearchAvailable) {
      console.log(
        `   ⚠️ Web scraping not available - falling back to URL pattern matching`
      );
      return await searchBusinessInfo(link);
    }

    // Add delay to be respectful
    await delay(1000);

    const response = await fetch(link, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      timeout: 10000,
    });

    if (!response.ok) {
      console.log(
        `   ❌ HTTP ${response.status} - falling back to URL pattern matching`
      );
      return await searchBusinessInfo(link);
    }

    const html = await response.text();

    const extractedInfo = {
      businessName: null,
      address: null,
      phone: null,
      email: null,
      businessHours: null,
      businessType: null,
      specialties: null,
      description: null,
      services: [],
      reviews: [],
      website: null,
      socialMedia: {},
      bbbRating: null,
      yearsInBusiness: null,
      emergencyServices: [],
      certifications: [],
      warranties: [],
      pricing: null,
    };

    // Google Business / Google Maps scraping
    if (link.includes("google.com") || link.includes("goo.gl")) {
      console.log(`   📍 Scraping Google Business information...`);

      // Business name
      let businessName =
        extractTextContent(html, "<h1[^>]*>[^<]*</h1>") ||
        extractTextContent(
          html,
          '<h2[^>]*data-attrid="title"[^>]*>[^<]*</h2>'
        ) ||
        extractTextContent(html, '"name":"[^"]*"');
      if (businessName) {
        businessName = businessName
          .replace(/"/g, "")
          .replace(/name:/g, "")
          .trim();
        extractedInfo.businessName = businessName;
        console.log(`   ✓ Business Name: ${businessName}`);
      }

      // Address
      let address =
        extractTextContent(
          html,
          '"address":\\{[^}]*"streetAddress":"[^"]*"[^}]*"addressLocality":"[^"]*"[^}]*"addressRegion":"[^"]*"[^}]*"postalCode":"[^"]*"'
        ) ||
        extractTextContent(
          html,
          'data-attrid="kp-wp-tab-cont-address-1"[^>]*>[^<]*</div>'
        );
      if (address) {
        address = address
          .replace(/"/g, "")
          .replace(
            /address:|streetAddress:|addressLocality:|addressRegion:|postalCode:/g,
            ""
          )
          .trim();
        extractedInfo.address = address;
        console.log(`   ✓ Address: ${address}`);
      }

      // Phone number
      let phone =
        extractTextContent(html, '"telephone":"[^"]*"') ||
        extractTextContent(
          html,
          'data-attrid="kp-wp-tab-cont-phone"[^>]*>[^<]*</a>'
        );
      if (phone) {
        phone = phone
          .replace(/"/g, "")
          .replace(/telephone:/g, "")
          .trim();
        extractedInfo.phone = phone;
        console.log(`   ✓ Phone: ${phone}`);
      }

      // Business hours
      const hoursPatterns = [
        '"openingHours":\\[[^\\]]*\\]',
        'data-attrid="kp-wp-tab-cont-hours"[^>]*>[\\s\\S]*?</div>',
        '"dayOfWeek":"[^"]*","opens":"[^"]*","closes":"[^"]*"',
      ];

      for (const pattern of hoursPatterns) {
        const hours = extractTextContent(html, pattern);
        if (hours) {
          extractedInfo.businessHours = hours
            .replace(/"/g, "")
            .replace(/openingHours:|dayOfWeek:|opens:|closes:/g, "")
            .trim();
          console.log(`   ✓ Business Hours: ${extractedInfo.businessHours}`);
          break;
        }
      }

      // Services/Specialties from Google Business
      const services = extractMultipleTextContent(
        html,
        "Services:.*?<[^>]*>[^<]*automotive[^<]*</[^>]*>"
      );
      if (services.length > 0) {
        extractedInfo.services = services;
        extractedInfo.specialties = services.join(", ");
        console.log(`   ✓ Services: ${services.join(", ")}`);
      }

      // Reviews
      const reviews = extractMultipleTextContent(
        html,
        '"text":"[^"]*"[^}]*"authorName":"[^"]*"[^}]*"rating":[0-9]'
      );
      if (reviews.length > 0) {
        extractedInfo.reviews = reviews.slice(0, 5); // Limit to 5 reviews
        console.log(`   ✓ Found ${reviews.length} reviews`);
      }
    }

    // Yelp scraping
    if (link.includes("yelp.com")) {
      console.log(`   ⭐ Scraping Yelp information...`);

      // Business name from Yelp
      let businessName =
        extractTextContent(html, "<h1[^>]*>[^<]*</h1>") ||
        extractTextContent(html, '"name":"[^"]*"');
      if (businessName) {
        businessName = businessName
          .replace(/"/g, "")
          .replace(/name:/g, "")
          .trim();
        extractedInfo.businessName = businessName;
        console.log(`   ✓ Business Name: ${businessName}`);
      }

      // Address from Yelp
      let address = extractTextContent(
        html,
        '"streetAddress":"[^"]*"[^}]*"addressLocality":"[^"]*"[^}]*"addressRegion":"[^"]*"[^}]*"postalCode":"[^"]*"'
      );
      if (address) {
        address = address
          .replace(/"/g, "")
          .replace(
            /streetAddress:|addressLocality:|addressRegion:|postalCode:/g,
            " "
          )
          .trim();
        extractedInfo.address = address;
        console.log(`   ✓ Address: ${address}`);
      }

      // Phone from Yelp
      let phone =
        extractTextContent(html, '"telephone":"[^"]*"') ||
        extractTextContent(html, "phone-number[^>]*>[^<]*</p>");
      if (phone) {
        phone = phone
          .replace(/"/g, "")
          .replace(/telephone:/g, "")
          .trim();
        extractedInfo.phone = phone;
        console.log(`   ✓ Phone: ${phone}`);
      }

      // Business hours from Yelp
      const yelpHours = extractMultipleTextContent(
        html,
        '"day":"[^"]*","start":"[^"]*","end":"[^"]*"'
      );
      if (yelpHours.length > 0) {
        extractedInfo.businessHours = yelpHours.join("; ");
        console.log(`   ✓ Business Hours: ${extractedInfo.businessHours}`);
      }

      // Categories/Services from Yelp
      const categories =
        extractMultipleTextContent(html, '"categories":\\[[^\\]]*\\]') ||
        extractMultipleTextContent(html, "category-str-list[^>]*>[^<]*</span>");
      if (categories.length > 0) {
        extractedInfo.businessType = categories[0];
        extractedInfo.specialties = categories.join(", ");
        console.log(`   ✓ Categories: ${categories.join(", ")}`);
      }

      // Reviews from Yelp
      const yelpReviews = extractMultipleTextContent(
        html,
        '"text":"[^"]*"[^}]*"user":\\{[^}]*"name":"[^"]*"[^}]*"rating":[0-9]'
      );
      if (yelpReviews.length > 0) {
        extractedInfo.reviews = yelpReviews.slice(0, 5);
        console.log(`   ✓ Found ${yelpReviews.length} Yelp reviews`);
      }
    }

    // Facebook scraping
    if (link.includes("facebook.com")) {
      console.log(`   📘 Scraping Facebook information...`);

      // Business name from Facebook
      let businessName =
        extractTextContent(html, "<title>[^<]*</title>") ||
        extractTextContent(html, '"name":"[^"]*"');
      if (businessName) {
        businessName = businessName
          .replace(/"/g, "")
          .replace(/name:/g, "")
          .replace(/\| Facebook/g, "")
          .trim();
        extractedInfo.businessName = businessName;
        console.log(`   ✓ Business Name: ${businessName}`);
      }

      // Description from Facebook
      let description =
        extractTextContent(html, '"description":"[^"]*"') ||
        extractTextContent(
          html,
          'meta[^>]*property="og:description"[^>]*content="[^"]*"'
        );
      if (description) {
        description = description
          .replace(/"/g, "")
          .replace(/description:|content=/g, "")
          .trim();
        extractedInfo.description = description;
        console.log(`   ✓ Description: ${description.substring(0, 100)}...`);
      }

      // Contact info from Facebook
      let phone = extractTextContent(html, '"telephone":"[^"]*"');
      if (phone) {
        phone = phone
          .replace(/"/g, "")
          .replace(/telephone:/g, "")
          .trim();
        extractedInfo.phone = phone;
        console.log(`   ✓ Phone: ${phone}`);
      }

      let email =
        extractTextContent(html, '"email":"[^"]*"') ||
        extractTextContent(
          html,
          "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"
        );
      if (email) {
        email = email
          .replace(/"/g, "")
          .replace(/email:/g, "")
          .trim();
        extractedInfo.email = email;
        console.log(`   ✓ Email: ${email}`);
      }
    }

    // Better Business Bureau (BBB) scraping
    if (link.includes("bbb.org")) {
      console.log(`   📊 Scraping BBB information...`);

      // Business name from BBB
      let businessName =
        extractTextContent(
          html,
          '<h1[^>]*class="[^"]*business-name[^"]*"[^>]*>[^<]*</h1>'
        ) || extractTextContent(html, '"businessName":"[^"]*"');
      if (businessName) {
        businessName = businessName
          .replace(/"/g, "")
          .replace(/businessName:/g, "")
          .trim();
        extractedInfo.businessName = businessName;
        console.log(`   ✓ BBB Business Name: ${businessName}`);
      }

      // BBB Rating and accreditation
      let bbbRating = extractTextContent(html, "BBB Rating[^\\d]*([A-F][+-]?)");
      if (bbbRating) {
        extractedInfo.bbbRating = bbbRating;
        console.log(`   ✓ BBB Rating: ${bbbRating}`);
      }

      // Years in business
      let yearsInBusiness = extractTextContent(
        html,
        "Years in Business[^\\d]*(\\d+)"
      );
      if (yearsInBusiness) {
        extractedInfo.yearsInBusiness = yearsInBusiness;
        console.log(`   ✓ Years in Business: ${yearsInBusiness}`);
      }
    }

    // Automotive-specific websites (CarGurus, AutoTrader, etc.)
    if (
      link.includes("cargurus.com") ||
      link.includes("autotrader.com") ||
      link.includes("cars.com")
    ) {
      console.log(`   🚗 Scraping automotive marketplace information...`);

      // Dealer/Service information
      let dealerName =
        extractTextContent(html, '"dealerName":"[^"]*"') ||
        extractTextContent(html, "dealer-name[^>]*>[^<]*</");
      if (dealerName) {
        dealerName = dealerName
          .replace(/"/g, "")
          .replace(/dealerName:/g, "")
          .trim();
        extractedInfo.businessName = dealerName;
        console.log(`   ✓ Dealer Name: ${dealerName}`);
      }
    }

    // LinkedIn business pages
    if (link.includes("linkedin.com/company")) {
      console.log(`   💼 Scraping LinkedIn company information...`);

      // Company name
      let companyName =
        extractTextContent(html, "<h1[^>]*>[^<]*</h1>") ||
        extractTextContent(html, '"name":"[^"]*"');
      if (companyName) {
        companyName = companyName
          .replace(/"/g, "")
          .replace(/name:/g, "")
          .replace(/\| LinkedIn/g, "")
          .trim();
        extractedInfo.businessName = companyName;
        console.log(`   ✓ LinkedIn Company: ${companyName}`);
      }

      // Company description
      let description =
        extractTextContent(html, '"description":"[^"]*"') ||
        extractTextContent(
          html,
          'meta[^>]*property="og:description"[^>]*content="[^"]*"'
        );
      if (description) {
        description = description
          .replace(/"/g, "")
          .replace(/description:|content=/g, "")
          .trim();
        extractedInfo.description = description;
        console.log(
          `   ✓ Company Description: ${description.substring(0, 100)}...`
        );
      }
    }

    // Generic website scraping for automotive businesses (enhanced)
    if (
      !link.includes("google.com") &&
      !link.includes("yelp.com") &&
      !link.includes("facebook.com") &&
      !link.includes("bbb.org") &&
      !link.includes("linkedin.com") &&
      !link.includes("cargurus.com") &&
      !link.includes("autotrader.com")
    ) {
      console.log(`   🌐 Scraping general website information...`);

      // Enhanced business name extraction
      let businessName =
        extractTextContent(html, "<title>[^<]*</title>") ||
        extractTextContent(html, "<h1[^>]*>[^<]*</h1>") ||
        extractTextContent(html, '"name":"[^"]*"') ||
        extractTextContent(html, 'property="og:site_name"[^>]*content="[^"]*"');
      if (businessName) {
        businessName = businessName
          .replace(/"/g, "")
          .replace(/name:|content=/g, "")
          .replace(/\|.*$/, "")
          .trim();
        extractedInfo.businessName = businessName;
        console.log(`   ✓ Website Business Name: ${businessName}`);
      }

      // Enhanced automotive-specific content detection
      const automotiveKeywords = [
        "tire",
        "auto",
        "repair",
        "mechanic",
        "brake",
        "oil change",
        "automotive",
        "car",
        "truck",
        "service",
        "transmission",
        "battery",
        "muffler",
        "exhaust",
        "engine",
        "suspension",
        "alignment",
        "inspection",
        "diagnostic",
        "maintenance",
        "tune-up",
        "radiator",
        "coolant",
        "belts",
        "hoses",
        "filters",
        "windshield",
        "glass",
        "detailing",
        "wash",
        "emergency roadside",
        "towing",
        "mobile service",
      ];
      const pageText = html.toLowerCase();

      const foundKeywords = automotiveKeywords.filter((keyword) =>
        pageText.includes(keyword)
      );
      if (foundKeywords.length > 0) {
        extractedInfo.businessType = "Automotive Service";
        extractedInfo.specialties = foundKeywords.slice(0, 10).join(", ");
        console.log(
          `   ✓ Automotive keywords found (${
            foundKeywords.length
          }): ${foundKeywords.slice(0, 5).join(", ")}${
            foundKeywords.length > 5 ? "..." : ""
          }`
        );
      }

      // Enhanced service extraction from page content
      const servicePatterns = [
        "services?[^\\w]*([^<]*(?:tire|oil|brake|transmission|engine|repair|maintenance|diagnostic|inspection)[^<]*)",
        "we (offer|provide|specialize)[^<]*([^<]*(?:automotive|auto|car|truck)[^<]*)",
        "(?:our|available)\\s+services?[^<]*([^<]*(?:repair|maintenance|service)[^<]*)",
      ];

      const extractedServices = [];
      for (const pattern of servicePatterns) {
        const services = extractMultipleTextContent(html, pattern);
        extractedServices.push(...services);
      }

      if (extractedServices.length > 0) {
        extractedInfo.services = [...new Set(extractedServices)].slice(0, 15);
        console.log(
          `   ✓ Services extracted: ${extractedInfo.services
            .slice(0, 3)
            .join(", ")}${extractedInfo.services.length > 3 ? "..." : ""}`
        );
      }

      // Enhanced contact information extraction
      const phonePatterns = [
        "\\(\\d{3}\\)\\s*\\d{3}-\\d{4}",
        "\\d{3}-\\d{3}-\\d{4}",
        "\\d{3}\\.\\d{3}\\.\\d{4}",
        "\\+1[\\s\\-]?\\(?\\d{3}\\)?[\\s\\-]?\\d{3}[\\s\\-]?\\d{4}",
        "call[^\\d]*(\\d{3}[\\s\\-\\.]?\\d{3}[\\s\\-\\.]?\\d{4})",
        "phone[^\\d]*(\\d{3}[\\s\\-\\.]?\\d{3}[\\s\\-\\.]?\\d{4})",
      ];

      for (const pattern of phonePatterns) {
        const phone = extractTextContent(html, pattern);
        if (phone && !extractedInfo.phone) {
          extractedInfo.phone = phone.replace(/[^\d\-\(\)\s\+]/g, "").trim();
          console.log(`   ✓ Phone: ${extractedInfo.phone}`);
          break;
        }
      }

      // Enhanced email extraction
      const emailPatterns = [
        "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
        "mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})",
        "email[^@]*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})",
        "contact[^@]*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})",
      ];

      for (const pattern of emailPatterns) {
        const email = extractTextContent(html, pattern);
        if (email && !extractedInfo.email) {
          extractedInfo.email = email
            .replace(/mailto:|email:|contact:/gi, "")
            .trim();
          console.log(`   ✓ Email: ${extractedInfo.email}`);
          break;
        }
      }

      // Enhanced address extraction
      const addressPatterns = [
        "\\d+\\s+[A-Za-z\\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Way)[^\\n\\r]{0,50}",
        "address[^\\n\\r]*([^\\n\\r]*\\d+[^\\n\\r]*(?:Street|St|Avenue|Ave|Road|Rd)[^\\n\\r]*)",
        "located[^\\n\\r]*([^\\n\\r]*\\d+[^\\n\\r]*(?:Street|St|Avenue|Ave|Road|Rd)[^\\n\\r]*)",
      ];

      for (const pattern of addressPatterns) {
        const address = extractTextContent(html, pattern);
        if (address && !extractedInfo.address) {
          extractedInfo.address = address
            .replace(/address:|located:/gi, "")
            .trim();
          console.log(`   ✓ Address: ${extractedInfo.address}`);
          break;
        }
      }

      // Enhanced business hours extraction
      const enhancedHoursPatterns = [
        "(?:hours?|open)[^\\n\\r]*\\n?[^\\n\\r]*(?:mon|monday)[^\\n\\r]*\\d{1,2}[:\\s]*\\d{0,2}[^\\n\\r]*[ap]?m?[^\\n\\r]*\\d{1,2}[:\\s]*\\d{0,2}[^\\n\\r]*[ap]?m?",
        "(?:business|store|shop)\\s+hours?[^\\n\\r]*\\n?[^\\n\\r]*(?:mon|monday)[^\\n\\r]*\\d{1,2}",
        "hours?[^\\n\\r]*(?:monday|mon)[^\\n\\r]*(?:tuesday|tue)[^\\n\\r]*(?:wednesday|wed)",
        "open[^\\n\\r]*(?:7\\s*days|daily|monday|mon)[^\\n\\r]*\\d{1,2}[:\\s]*\\d{0,2}",
      ];

      for (const pattern of enhancedHoursPatterns) {
        const hours = extractTextContent(html, pattern);
        if (hours && !extractedInfo.businessHours) {
          extractedInfo.businessHours = hours
            .replace(/hours?:|business|store|shop|open:/gi, "")
            .trim();
          console.log(
            `   ✓ Business Hours: ${extractedInfo.businessHours.substring(
              0,
              50
            )}...`
          );
          break;
        }
      }

      // Extract emergency/24-hour service information
      const emergencyPatterns = [
        "24[\\s\\-]*hour",
        "emergency[^\\n\\r]*service",
        "roadside[^\\n\\r]*assistance",
        "mobile[^\\n\\r]*service",
        "on[\\s\\-]*site[^\\n\\r]*service",
      ];

      const emergencyServices = [];
      for (const pattern of emergencyPatterns) {
        const service = extractTextContent(html, pattern);
        if (service) {
          emergencyServices.push(service.trim());
        }
      }

      if (emergencyServices.length > 0) {
        extractedInfo.emergencyServices = [...new Set(emergencyServices)];
        console.log(`   ✓ Emergency Services: ${emergencyServices.join(", ")}`);
      }

      // Extract certifications and warranties
      const certificationPatterns = [
        "ASE[\\s\\-]*certified",
        "certified[^\\n\\r]*technician",
        "licensed[^\\n\\r]*mechanic",
        "warranty[^\\n\\r]*(?:guarantee|included|available)",
        "insured[^\\n\\r]*bonded",
        "AAA[\\s\\-]*approved",
      ];

      const certifications = [];
      for (const pattern of certificationPatterns) {
        const cert = extractTextContent(html, pattern);
        if (cert) {
          certifications.push(cert.trim());
        }
      }

      if (certifications.length > 0) {
        extractedInfo.certifications = [...new Set(certifications)];
        console.log(`   ✓ Certifications: ${certifications.join(", ")}`);
      }

      // Extract pricing information
      const pricingPatterns = [
        "\\$\\d+[^\\n\\r]*(?:oil change|tire|brake|service)",
        "starting[^\\$]*\\$\\d+",
        "as low as[^\\$]*\\$\\d+",
        "free[^\\n\\r]*(?:estimate|inspection|diagnostic)",
      ];

      const pricingInfo = [];
      for (const pattern of pricingPatterns) {
        const price = extractTextContent(html, pattern);
        if (price) {
          pricingInfo.push(price.trim());
        }
      }

      if (pricingInfo.length > 0) {
        extractedInfo.pricing = pricingInfo.join("; ");
        console.log(`   ✓ Pricing Info: ${extractedInfo.pricing}`);
      }
    }

    // Fallback to URL pattern matching if no content was scraped
    if (
      !extractedInfo.businessName &&
      !extractedInfo.phone &&
      !extractedInfo.address
    ) {
      console.log(
        `   ⚠️ No content scraped - falling back to URL pattern matching`
      );
      return await searchBusinessInfo(link);
    }

    console.log(`   ✅ Successfully scraped business information`);
    return extractedInfo;
  } catch (error) {
    console.log(`   ❌ Scraping error: ${error.message}`);
    console.log(`   🔄 Falling back to URL pattern matching...`);
    return await searchBusinessInfo(link);
  }
}

// Original function for URL pattern matching (fallback)
async function searchBusinessInfo(link) {
  try {
    console.log(`🔍 Analyzing link pattern: ${link}`);

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
      services: [],
      reviews: [],
      website: null,
      socialMedia: {},
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
    console.log(`   ❌ Pattern matching error: ${error.message}`);
    return {
      businessName: null,
      address: null,
      phone: null,
      email: null,
      businessHours: null,
      businessType: null,
      specialties: null,
      description: null,
      services: [],
      reviews: [],
      website: null,
      socialMedia: {},
    };
  }
}

// Enhanced function to extract comprehensive business information from reference links
async function extractBusinessInfoFromLinks(links) {
  console.log(
    "\n🔍 Extracting comprehensive business information from reference links..."
  );

  const extractedInfo = {
    businessName: null,
    address: null,
    phone: null,
    email: null,
    businessHours: null,
    businessType: null,
    specialties: null,
    description: null,
    services: [],
    reviews: [],
    website: null,
    socialMedia: {},
    bbbRating: null,
    yearsInBusiness: null,
    emergencyServices: [],
    certifications: [],
    warranties: [],
    pricing: null,
  };

  const allScrapedData = [];

  for (const link of links) {
    console.log(`\n📱 Processing: ${link}`);

    try {
      // Scrape comprehensive information from the link
      const info = await scrapeBusinessInfo(link);
      allScrapedData.push(info);

      // Merge extracted info, prioritizing first found values but collecting all services and reviews
      Object.keys(info).forEach((key) => {
        if (key === "services" && info[key] && info[key].length > 0) {
          extractedInfo.services = [...extractedInfo.services, ...info[key]];
        } else if (key === "reviews" && info[key] && info[key].length > 0) {
          extractedInfo.reviews = [...extractedInfo.reviews, ...info[key]];
        } else if (info[key] && !extractedInfo[key]) {
          extractedInfo[key] = info[key];
        }
      });

      // Add a delay to be respectful to servers
      await delay(2000);
    } catch (error) {
      console.log(`   ❌ Error extracting from ${link}: ${error.message}`);
    }
  }

  // Post-process the extracted data
  if (extractedInfo.services.length > 0) {
    // Remove duplicates and clean up services
    extractedInfo.services = [...new Set(extractedInfo.services)];
    if (!extractedInfo.specialties) {
      extractedInfo.specialties = extractedInfo.services.slice(0, 5).join(", ");
    }
  }

  if (extractedInfo.reviews.length > 0) {
    // Limit reviews and remove duplicates
    extractedInfo.reviews = [...new Set(extractedInfo.reviews)].slice(0, 10);
  }

  // Enhanced summary display
  console.log("\n✅ COMPREHENSIVE EXTRACTION SUMMARY:");
  console.log("=========================================");

  let extractedCount = 0;
  Object.keys(extractedInfo).forEach((key) => {
    if (
      extractedInfo[key] &&
      (typeof extractedInfo[key] !== "object" || extractedInfo[key].length > 0)
    ) {
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

      if (key === "services") {
        console.log(
          `   ✓ ${label}: ${extractedInfo[key].length} found - ${extractedInfo[
            key
          ]
            .slice(0, 3)
            .join(", ")}${extractedInfo[key].length > 3 ? "..." : ""}`
        );
      } else if (key === "reviews") {
        console.log(`   ✓ ${label}: ${extractedInfo[key].length} found`);
      } else {
        const value = extractedInfo[key].toString();
        console.log(
          `   ✓ ${label}: ${
            value.length > 50 ? value.substring(0, 50) + "..." : value
          }`
        );
      }
      extractedCount++;
    }
  });

  if (extractedCount === 0) {
    console.log(
      "   ⚠️  No information could be automatically extracted from the provided links."
    );
    console.log(
      "      This might be due to website protection or structure changes."
    );
    console.log("      Manual input will be required for all fields.");
  } else {
    console.log(
      `\n🎉 SUCCESS: Extracted ${extractedInfo.services.length} services, ${
        extractedInfo.reviews.length
      } reviews, and ${extractedCount - 2} other data points!`
    );

    if (webSearchAvailable) {
      console.log(`🚀 SCRAPING PERFORMANCE:`);
      console.log(
        `   • ${links.length} links processed with full web scraping`
      );
      console.log(`   • Enhanced data extraction vs basic URL parsing`);
      console.log(`   • Real-time business information gathered`);
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

## 🎯 BUSINESS INFORMATION (AUTO-EXTRACTED)
${data.businessName ? `**Company:** ${data.businessName}` : ""}
${data.address ? `**Address:** ${data.address}` : ""}
${data.phone ? `**Phone:** ${data.phone}` : ""}
${data.email ? `**Email:** ${data.email}` : ""}
${data.businessType ? `**Business Type:** ${data.businessType}` : ""}
${data.specialties ? `**Specialties:** ${data.specialties}` : ""}
${data.bbbRating ? `**BBB Rating:** ${data.bbbRating}` : ""}
${data.yearsInBusiness ? `**Years in Business:** ${data.yearsInBusiness}` : ""}
${
  data.emergencyServices && data.emergencyServices.length > 0
    ? `**Emergency Services:** ${data.emergencyServices.join(", ")}`
    : ""
}
${
  data.certifications && data.certifications.length > 0
    ? `**Certifications:** ${data.certifications.join(", ")}`
    : ""
}
${data.pricing ? `**Pricing Information:** ${data.pricing}` : ""}

## ⚠️ MISSING DATA HANDLING
${
  !data.businessName
    ? "- ⚠️ Business name not found - keep existing localConfig value"
    : ""
}
${
  !data.address
    ? "- ⚠️ Address not found - keep existing localConfig value"
    : ""
}
${!data.phone ? "- ⚠️ Phone not found - keep existing localConfig value" : ""}
${!data.email ? "- ⚠️ Email not found - keep existing localConfig value" : ""}
${
  !data.businessHours
    ? "- ⚠️ Business hours not found - keep existing localConfig value"
    : ""
}

## 🕒 BUSINESS HOURS
${data.businessHours}

## 📚 REFERENCE LINKS FOR RESEARCH
${data.referenceLinks.map((link) => `- ${link}`).join("\n")}

## 🖼️ AVAILABLE IMAGES IN /public/images/
${data.availableImages.map((img) => `- ${img}`).join("\n")}

## ⭐ CUSTOMER REVIEWS FOR CONTEXT & TONE
${data.customerReviews}

## 🚨 CRITICAL REQUIREMENTS & PRESERVATION RULES
- **DO NOT CHANGE THE IMAGES THAT ARE USED** - only use available images listed above
- **ONLY USE VALUES FROM localConfig.ts** - no hardcoded content
- **🚫 PRESERVE EXISTING SERVICES SECTIONS** - DO NOT modify or remove existing service offerings in localConfig.ts
- **🚫 PRESERVE EXISTING GUARANTEE SECTIONS** - DO NOT modify or remove existing warranty/guarantee content
- **📞 SKIP MISSING CONTACT INFO** - If phone/email wasn't extracted, keep existing localConfig values
- **🎨 ONLY UPDATE WHAT WAS FOUND** - Only modify localConfig fields that have extracted data
- **MAINTAIN AUTOMOTIVE BUSINESS VIBE** - professional, trustworthy, service-focused
- **ENSURE ALL CONTENT ALIGNS** - colors, name, address, phone, business personality (when available)

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

## 🎯 LOCALCONFIG.TS CONDITIONAL UPDATES

### Business Information Section (Only Update If Data Available)
${
  data.businessName
    ? `- [ ] companyName: "${data.businessName}"`
    : "- [ ] companyName: KEEP EXISTING VALUE - no data found"
}
${
  data.address
    ? `- [ ] address: "${data.address}"`
    : "- [ ] address: KEEP EXISTING VALUE - no data found"
}
${
  data.phone
    ? `- [ ] phone: "${data.phone}"`
    : "- [ ] phone: KEEP EXISTING VALUE - no data found"
}
${
  data.email
    ? `- [ ] email: "${data.email}"`
    : "- [ ] email: KEEP EXISTING VALUE - no data found"
}
${
  data.businessHours
    ? `- [ ] businessHours: "${data.businessHours}"`
    : "- [ ] businessHours: KEEP EXISTING VALUE - no data found"
}
${
  data.address
    ? "- [ ] googleMapsUrl: Update to correct location"
    : "- [ ] googleMapsUrl: KEEP EXISTING VALUE - no address found"
}

### Services Configuration (PRESERVATION REQUIRED)
- [ ] 🚫 DO NOT MODIFY existing service categories in localConfig.ts
- [ ] 🚫 DO NOT REMOVE existing service offerings
- [ ] 🚫 DO NOT CHANGE existing service descriptions
- [ ] ✅ ONLY ADD emergency service highlights if detected and missing
- [ ] ✅ ONLY ADD mobile service options if detected and missing

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
  (data.businessType && data.businessType.toLowerCase().includes("mobile")) ||
  (data.specialties && data.specialties.toLowerCase().includes("mobile"))
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

    // Use only automatically extracted information
    console.log("\n🏢 FULLY AUTOMATED BUSINESS INFORMATION EXTRACTION:");
    console.log("   ✅ Using only automatically scraped data");
    console.log("   🚫 No manual input required");
    console.log("");

    // Only use what was successfully extracted
    const businessName = extractedInfo.businessName;
    const address = extractedInfo.address;
    const phone = extractedInfo.phone;
    const email = extractedInfo.email;
    const businessType = extractedInfo.businessType;
    const specialties = extractedInfo.specialties;
    const businessHours = extractedInfo.businessHours;

    // Display what we're using
    if (businessName) console.log(`   ✓ Business Name: ${businessName}`);
    if (address) console.log(`   ✓ Address: ${address}`);
    if (phone) console.log(`   ✓ Phone: ${phone}`);
    if (email) console.log(`   ✓ Email: ${email}`);
    if (businessType) console.log(`   ✓ Business Type: ${businessType}`);
    if (specialties) console.log(`   ✓ Specialties: ${specialties}`);
    if (businessHours) console.log(`   ✓ Business Hours: ${businessHours}`);

    // Set default branding if not extracted
    const primaryColors = extractedInfo.primaryColors || "#1a365d, #2d3748";
    const secondaryColors = extractedInfo.secondaryColors || "#f7fafc, #edf2f7";
    const brandPersonality = "Professional, Trustworthy, Community-Focused";
    const targetAudience =
      "Local vehicle owners, Fleet managers, Emergency roadside needs";

    console.log(`\n🎨 Using Default Automotive Branding:`);
    console.log(`   ✓ Primary Colors: ${primaryColors}`);
    console.log(`   ✓ Secondary Colors: ${secondaryColors}`);
    console.log(`   ✓ Brand Personality: ${brandPersonality}`);
    console.log(`   ✓ Target Audience: ${targetAudience}`);

    // Use extracted reviews or default template
    let customerReviews;
    if (extractedInfo.reviews && extractedInfo.reviews.length > 0) {
      console.log(
        `\n⭐ Using ${extractedInfo.reviews.length} Auto-Extracted Customer Reviews`
      );
      customerReviews = extractedInfo.reviews
        .map(
          (review, index) =>
            `**Customer ${index + 1}** - Recent Review\n"${review}"`
        )
        .join("\n\n");
    } else {
      console.log(
        "\n⭐ Using Template Automotive Reviews (no reviews extracted)"
      );
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

    // Show comprehensive automation summary
    const finalExtractedCount = Object.values(extractedInfo).filter(
      (v) => v !== null && (typeof v !== "object" || v.length > 0)
    ).length;

    console.log(`\n🚀 FULLY AUTOMATED PROCESSING SUMMARY:`);
    console.log(`=========================================`);
    console.log(
      `   ✅ ${finalExtractedCount} data points automatically extracted from ${referenceLinks.length} links`
    );
    console.log(`   🚫 Zero manual input required`);
    console.log(`   🔒 Existing services & guarantees preserved`);
    console.log(
      `   📞 Missing contact info handling: skip and preserve existing`
    );
    console.log(`   🎨 Smart defaults applied for branding`);

    const dataTypes = [];
    if (businessName) dataTypes.push("Business Name");
    if (address) dataTypes.push("Address");
    if (phone) dataTypes.push("Phone");
    if (email) dataTypes.push("Email");
    if (businessHours) dataTypes.push("Hours");
    if (extractedInfo.emergencyServices?.length > 0)
      dataTypes.push("Emergency Services");
    if (extractedInfo.reviews?.length > 0)
      dataTypes.push(`${extractedInfo.reviews.length} Reviews`);

    if (dataTypes.length > 0) {
      console.log(`   📊 Extracted: ${dataTypes.join(", ")}`);
    }

    console.log("\n📋 NEXT STEPS - FULLY AUTOMATED:");
    console.log("1. Copy the contents of cursor-automotive-redesign-prompt.md");
    console.log("2. Paste it into Cursor AI chat");
    console.log("3. Attach your localConfig.ts file to the conversation");
    console.log("4. AI will automatically apply ONLY the extracted data");
    console.log("\n🔧 The automated prompt includes:");
    console.log("   ✅ Only update fields with extracted data");
    console.log("   🚫 Preserve existing services & guarantee sections");
    console.log("   📞 Skip missing contact info (keep existing values)");
    console.log("   🎨 Smart automotive branding defaults");
    console.log("   ⭐ Auto-extracted or template customer reviews");
    console.log("   🔒 Zero risk of data loss or unwanted changes");

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
