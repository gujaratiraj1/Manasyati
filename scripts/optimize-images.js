/**
 * Image Optimization Script for Manasyati Engineering Website
 * 
 * This script optimizes images by:
 * 1. Converting images to modern formats (WebP)
 * 2. Resizing images to appropriate dimensions
 * 3. Compressing images to reduce file size
 * 
 * Note: This script requires the following packages to be installed:
 * - sharp (npm install sharp)
 * - glob (npm install glob)
 * 
 * Usage: node optimize-images.js
 */

console.log('Image Optimization Script');
console.log('-------------------------');
console.log('This script will optimize images in the img_res and image directories.');
console.log('To use this script, you need to install the required packages:');
console.log('npm install sharp glob');
console.log('\nAfter installing the packages, run this script again.');
console.log('-------------------------');

/*
// Uncomment this code after installing the required packages

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

// Configuration
const config = {
  inputDirs: ['img_res', 'image'],
  outputBaseDir: 'public/images',
  sizes: {
    small: 480,
    medium: 768,
    large: 1280
  },
  quality: 80,
  formats: ['webp', 'jpeg']
};

// Create output directory if it doesn't exist
if (!fs.existsSync(config.outputBaseDir)) {
  fs.mkdirSync(config.outputBaseDir, { recursive: true });
}

// Process all image files
async function processImages() {
  console.log('Starting image optimization...');
  
  for (const inputDir of config.inputDirs) {
    // Skip if directory doesn't exist
    if (!fs.existsSync(inputDir)) {
      console.log(`Skipping directory (not found): ${inputDir}`);
      continue;
    }
    
    // Get all image files in the directory
    const imageFiles = glob.sync(`${inputDir}/**/*.{jpg,jpeg,png,gif}`, { nocase: true });
    
    console.log(`Found ${imageFiles.length} images in ${inputDir}`);
    
    // Process each image
    for (const imageFile of imageFiles) {
      try {
        const filename = path.basename(imageFile, path.extname(imageFile));
        const outputDir = path.join(config.outputBaseDir, inputDir);
        
        // Create output directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // Load the image
        const image = sharp(imageFile);
        
        // Get image metadata
        const metadata = await image.metadata();
        
        // Generate different sizes and formats
        for (const [sizeName, maxSize] of Object.entries(config.sizes)) {
          // Skip if image is smaller than the target size
          if (metadata.width <= maxSize) continue;
          
          // Resize image
          const resized = image.clone().resize({ 
            width: maxSize,
            height: maxSize,
            fit: 'inside',
            withoutEnlargement: true
          });
          
          // Generate different formats
          for (const format of config.formats) {
            const outputFile = path.join(outputDir, `${filename}-${sizeName}.${format}`);
            
            await resized.toFormat(format, { quality: config.quality })
              .toFile(outputFile);
            
            console.log(`Optimized: ${imageFile} -> ${outputFile}`);
          }
        }
        
        // Copy the original file as well
        const outputFile = path.join(outputDir, path.basename(imageFile));
        fs.copyFileSync(imageFile, outputFile);
        
      } catch (error) {
        console.error(`Error processing ${imageFile}:`, error);
      }
    }
  }
  
  console.log('Image optimization completed successfully!');
}

// Execute image optimization
processImages().catch(error => {
  console.error('Image optimization failed:', error);
  process.exit(1);
});
*/ 