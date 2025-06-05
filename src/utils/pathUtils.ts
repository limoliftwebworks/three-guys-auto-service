/**
 * Utility functions for handling image paths
 */

/**
 * Formats a filename to include the proper image path prefix
 * @param filename The image filename
 * @returns The properly formatted image path
 */
export const formatImagePath = (filename: string): string => {
  if (!filename) return '';
  
  // If it already has the full path, return as is
  if (filename.startsWith('/images/')) return filename;
  
  // If it has just the filename, add the path prefix
  return `/images/${filename}`;
};

/**
 * Extracts just the filename from a full image path
 * @param path The full image path
 * @returns Just the filename without the path prefix
 */
export const getImageFilename = (path: string): string => {
  if (!path) return '';
  
  // If it has the full path, extract just the filename
  if (path.startsWith('/images/')) return path.slice(8);
  
  // Otherwise, return as is
  return path;
}; 