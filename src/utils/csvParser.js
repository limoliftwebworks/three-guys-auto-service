/**
 * CSV Parser Utility
 *
 * A simple utility for parsing CSV files in the browser or Node.js environment.
 * This can be used to process the landscaping leads data from the CSV file.
 */

/**
 * Parse a CSV string into an array of objects
 * @param {string} csvContent - The raw CSV content as a string
 * @param {Object} options - Parsing options
 * @returns {Array} An array of objects representing the CSV data
 */
export function parseCSV(csvContent, options = {}) {
  const {
    delimiter = ",",
    hasHeader = true,
    skipCommentLines = true,
    commentPrefix = "#",
    headerMap = null,
  } = options;

  // Split the content into lines
  const lines = csvContent.split(/\r?\n/);
  const result = [];

  // Skip empty lines and comment lines if specified
  const nonEmptyLines = lines.filter((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine === "") return false;
    if (skipCommentLines && trimmedLine.startsWith(commentPrefix)) return false;
    return true;
  });

  // Extract headers if the CSV has them
  let headers = [];
  let startIndex = 0;

  if (hasHeader && nonEmptyLines.length > 0) {
    headers = nonEmptyLines[0].split(delimiter).map((header) => header.trim());
    startIndex = 1;
  }

  // Process data rows
  for (let i = startIndex; i < nonEmptyLines.length; i++) {
    const line = nonEmptyLines[i];

    // Skip comment lines that might appear after the header
    if (skipCommentLines && line.trim().startsWith(commentPrefix)) {
      continue;
    }

    // Parse the values
    const values = line.split(delimiter).map((val) => val.trim());

    if (hasHeader) {
      // Create an object with header keys
      const rowObj = {};
      headers.forEach((header, index) => {
        const key = headerMap ? headerMap[header] || header : header;
        rowObj[key] = values[index] || "";
      });
      result.push(rowObj);
    } else {
      // Without headers, just add the values array
      result.push(values);
    }
  }

  return result;
}

/**
 * Asynchronously fetch and parse a CSV file
 * @param {string} filePath - Path to the CSV file
 * @param {Object} options - Parsing options
 * @returns {Promise<Array>} Promise resolving to parsed CSV data
 */
export async function fetchAndParseCSV(filePath, options = {}) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch CSV: ${response.status} ${response.statusText}`
      );
    }

    const csvContent = await response.text();
    return parseCSV(csvContent, options);
  } catch (error) {
    console.error("Error fetching or parsing CSV:", error);
    throw error;
  }
}

/**
 * Example usage:
 *
 * Import both functions:
 * import { parseCSV, fetchAndParseCSV } from '@/utils/csvParser';
 *
 * For client-side fetching:
 * const landscapingLeads = await fetchAndParseCSV('/data/landscaping-companies.csv', {
 *   headerMap: {
 *     'Business Name': 'businessName',
 *     'Owner/Decision-Maker Name': 'ownerName',
 *     'Phone Number': 'phone',
 *     // etc.
 *   }
 * });
 *
 * For server-side or direct string parsing:
 * import { readFileSync } from 'fs';
 * const csvContent = readFileSync('./data/landscaping-companies.csv', 'utf8');
 * const landscapingLeads = parseCSV(csvContent);
 */
