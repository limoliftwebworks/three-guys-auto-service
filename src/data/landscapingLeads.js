/**
 * Landscaping Leads Data Processor
 *
 * This file provides utility functions to access and filter the landscaping company data
 * stored in the CSV file. It's intended to be used for lead management and generation.
 */

// Mock data processor - in a real implementation, you would use a CSV parser
// or database connection to access the full dataset.

const leadCategories = {
  WITH_WEBSITE_AND_OWNER:
    "Businesses with outdated websites and owner contacts",
  WITH_WEBSITE_NO_OWNER: "Businesses with outdated websites, no owner contacts",
  NO_WEBSITE_NO_OWNER: "Businesses with no websites, no owner contacts",
};

// Sample of data - first few entries from each category
const landscapingLeadsSample = {
  // Category 1: Businesses with outdated websites and owner contacts
  withWebsiteAndOwner: [
    {
      businessName: "Flores Landscape Design",
      ownerName: "Juan Flores",
      phone: "323-268-1234",
      email: "contact@floreslandscapedesign.com",
      website: "http://floreslandscapedesign.com",
      address: "1245 S Vermont Ave, Los Angeles, CA 90006",
      source: "Yelp/Website",
      notes: "Outdated website, non-mobile-friendly, last updated ~2015",
    },
    {
      businessName: "Green Thumb Landscaping",
      ownerName: "Maria Gonzalez",
      phone: "415-731-5678",
      email: "info@greenthumb-sf.com",
      website: "http://greenthumb-sf.com",
      address: "3210 Geary Blvd, San Francisco, CA 94118",
      source: "Yelp/Google",
      notes: "Outdated website, broken contact form",
    },
    // Additional entries would be here in the full implementation
  ],

  // Category 2: Businesses with outdated websites, no owner contacts
  withWebsiteNoOwner: [
    {
      businessName: "Sunny Hills Landscapes",
      ownerName: "",
      phone: "619-298-3456",
      email: "info@sunnyhillslandscapes.com",
      website: "http://sunnyhillslandscapes.com",
      address: "4560 El Cajon Blvd, San Diego, CA 92115",
      source: "Google",
      notes: "Outdated website, no owner name found",
    },
    {
      businessName: "Coastal Green Designs",
      ownerName: "",
      phone: "310-450-7890",
      email: "hello@coastaldesigns.net",
      website: "http://coastaldesigns.net",
      address: "2100 Ocean Park Blvd, Santa Monica, CA 90405",
      source: "Yelp/Website",
      notes: "Website not responsive, no owner contact",
    },
    // Additional entries would be here in the full implementation
  ],

  // Category 3: Businesses with no websites, no owner contacts
  noWebsiteNoOwner: [
    {
      businessName: "Bay Lawn Services",
      ownerName: "",
      phone: "510-763-4567",
      email: "",
      website: "None",
      address: "5432 Foothill Blvd, Oakland, CA 94601",
      source: "Yelp",
      notes: "No website listed, no owner contact found",
    },
    {
      businessName: "Starlight Landscaping",
      ownerName: "",
      phone: "562-590-6789",
      email: "",
      website: "None",
      address: "1234 Long Beach Blvd, Long Beach, CA 90802",
      source: "Google",
      notes: "No website, no owner details",
    },
    // Additional entries would be here in the full implementation
  ],
};

/**
 * Get all landscaping leads
 * @returns {Array} Full list of leads
 */
export function getAllLeads() {
  // In a real implementation, this would process the CSV file
  // For now, return the sample data flattened into an array
  return [
    ...landscapingLeadsSample.withWebsiteAndOwner,
    ...landscapingLeadsSample.withWebsiteNoOwner,
    ...landscapingLeadsSample.noWebsiteNoOwner,
  ];
}

/**
 * Get landscaping leads by category
 * @param {string} category - The category to filter by
 * @returns {Array} Filtered list of leads
 */
export function getLeadsByCategory(category) {
  switch (category) {
    case leadCategories.WITH_WEBSITE_AND_OWNER:
      return landscapingLeadsSample.withWebsiteAndOwner;
    case leadCategories.WITH_WEBSITE_NO_OWNER:
      return landscapingLeadsSample.withWebsiteNoOwner;
    case leadCategories.NO_WEBSITE_NO_OWNER:
      return landscapingLeadsSample.noWebsiteNoOwner;
    default:
      return getAllLeads();
  }
}

/**
 * Get leads by location (city)
 * @param {string} city - The city to filter by
 * @returns {Array} Filtered list of leads
 */
export function getLeadsByCity(city) {
  const allLeads = getAllLeads();
  return allLeads.filter((lead) => {
    return lead.address.toLowerCase().includes(city.toLowerCase());
  });
}

export { leadCategories, landscapingLeadsSample };

/**
 * In a production environment, this file would likely:
 * 1. Use a CSV parser library to read the full data
 * 2. Include more comprehensive filtering options
 * 3. Connect to a database for real-time updates
 * 4. Include pagination and search functionality
 */
