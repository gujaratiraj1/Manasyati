/**
 * Build script for Manasyati Engineering Website
 * This script prepares the site for production by:
 * 1. Copying HTML files to public directory
 * 2. Minifying CSS and JS
 * 3. Optimizing images
 * 4. Creating a service worker
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Directories
const sourceDir = path.join(__dirname, '..');
const publicDir = path.join(__dirname, '../public');

// Create required directories
const dirs = [
  publicDir,
  path.join(publicDir, 'css'),
  path.join(publicDir, 'js'),
  path.join(publicDir, 'images'),
  path.join(publicDir, 'fonts')
];

// Ensure directories exist
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Copy HTML files to public directory
function copyHtmlFiles() {
  console.log('Copying HTML files...');
  
  // Get all HTML files in the root directory
  const htmlFiles = fs.readdirSync(sourceDir)
    .filter(file => file.endsWith('.html'));
  
  // Copy each file to the public directory
  htmlFiles.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(publicDir, file);
    
    // Read the file content
    const content = fs.readFileSync(sourcePath, 'utf8');
    
    // Write to destination
    fs.writeFileSync(destPath, content);
    console.log(`Copied: ${file}`);
  });
  
  console.log('HTML files copied successfully');
}

// Copy static assets
function copyStaticAssets() {
  console.log('Copying static assets...');
  
  // Define asset directories to copy
  const assetDirs = [
    { src: 'css', dest: 'css' },
    { src: 'js', dest: 'js' },
    { src: 'img_res', dest: 'images' },
    { src: 'image', dest: 'images' }
  ];
  
  // Copy each asset directory
  assetDirs.forEach(({ src, dest }) => {
    const srcDir = path.join(sourceDir, src);
    const destDir = path.join(publicDir, dest);
    
    // Skip if source directory doesn't exist
    if (!fs.existsSync(srcDir)) {
      console.log(`Skipping directory (not found): ${src}`);
      return;
    }
    
    // Ensure destination directory exists
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Read all files in the source directory
    const files = fs.readdirSync(srcDir);
    
    // Copy each file to the destination directory
    files.forEach(file => {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);
      
      // Skip if it's a directory
      if (fs.statSync(srcPath).isDirectory()) {
        return;
      }
      
      // Copy file
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${src}/${file} to ${dest}/${file}`);
    });
  });
  
  console.log('Static assets copied successfully');
}

// Copy configuration files
function copyConfigFiles() {
  console.log('Copying configuration files...');
  
  // Define config files to copy
  const configFiles = [
    'robots.txt',
    'sitemap.xml',
    'sw.js',
    'CNAME'
  ];
  
  // Copy each config file
  configFiles.forEach(file => {
    const srcPath = path.join(sourceDir, file);
    const destPath = path.join(publicDir, file);
    
    // Skip if file doesn't exist
    if (!fs.existsSync(srcPath)) {
      console.log(`Skipping file (not found): ${file}`);
      return;
    }
    
    // Copy file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied: ${file}`);
  });
  
  console.log('Configuration files copied successfully');
}

// Run build tasks
async function build() {
  console.log('Starting build process...');
  
  try {
    // Run tasks
    copyHtmlFiles();
    copyStaticAssets();
    copyConfigFiles();
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Execute build
build(); 