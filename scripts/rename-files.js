/**
 * File Renaming Script for Manasyati Engineering Website
 * 
 * This script helps rename HTML files to follow a consistent naming convention:
 * - Removes spaces and replaces with hyphens
 * - Makes all filenames lowercase
 * - Removes redundant text like "Engineering Services" from filenames
 * 
 * Usage: node rename-files.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  directory: path.join(__dirname, '..'),
  dryRun: true, // Set to false to actually rename files
  pattern: /\.html$/i,
  replacements: [
    { from: /Manasyati Engineering Services/g, to: 'Manasyati' },
    { from: /Manasyati Engineering/g, to: 'Manasyati' },
    { from: / - /g, to: '-' },
    { from: / /g, to: '-' }
  ]
};

// Function to rename files
async function renameFiles() {
  console.log(`Starting file renaming ${config.dryRun ? '(DRY RUN)' : ''}`);
  
  try {
    // Get all HTML files
    const files = fs.readdirSync(config.directory)
      .filter(file => config.pattern.test(file));
    
    console.log(`Found ${files.length} HTML files`);
    
    // Process each file
    for (const oldFilename of files) {
      let newFilename = oldFilename;
      
      // Apply each replacement
      for (const { from, to } of config.replacements) {
        newFilename = newFilename.replace(from, to);
      }
      
      // Convert to lowercase
      newFilename = newFilename.toLowerCase();
      
      // Skip if filename hasn't changed
      if (oldFilename === newFilename) {
        console.log(`Skipping ${oldFilename} (no change needed)`);
        continue;
      }
      
      console.log(`Renaming ${oldFilename} -> ${newFilename}`);
      
      // Rename file if not in dry run mode
      if (!config.dryRun) {
        fs.renameSync(
          path.join(config.directory, oldFilename),
          path.join(config.directory, newFilename)
        );
      }
    }
    
    console.log('File renaming completed successfully');
    if (config.dryRun) {
      console.log('This was a dry run. Set config.dryRun = false to actually rename the files.');
    }
  } catch (error) {
    console.error('Error renaming files:', error);
  }
}

// Execute the script
renameFiles(); 