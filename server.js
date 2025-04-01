/**
 * Manasyati Engineering Services Website - Server
 * 
 * This is a simple Express server to serve the Manasyati Engineering website
 * with proper compression, caching, and security headers.
 */

const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

// Configuration
const config = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development',
  staticDir: '.',  // In production, this would be 'public'
  clientLogosDir: 'ourclients',
  cacheControl: {
    staticAssets: 31536000,  // 1 year in seconds
    html: 86400,  // 1 day in seconds
    default: 0
  }
};

// Create Express app
const app = express();

// Enable compression for all responses
app.use(compression());

// Configure security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com", "https://www.googletagmanager.com", "https://unpkg.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://unpkg.com", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:", "https://www.manasyati.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net"],
      connectSrc: ["'self'", "https://www.google-analytics.com"],
    },
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));

// Cache control middleware
const cacheControl = (req, res, next) => {
  if (req.url.match(/\.(css|js|woff2|jpg|jpeg|png|webp|gif|ico)$/)) {
    // Long-term caching for static assets
    res.setHeader('Cache-Control', `public, max-age=${config.cacheControl.staticAssets}`);
  } else if (req.url.match(/\.(html)$/)) {
    // Shorter caching for HTML files
    res.setHeader('Cache-Control', `public, max-age=${config.cacheControl.html}`);
  } else {
    // Default caching policy
    res.setHeader('Cache-Control', `public, max-age=${config.cacheControl.default}`);
  }
  next();
};

// Apply cache control middleware
app.use(cacheControl);

// Serve static files
app.use(express.static(config.staticDir, {
  etag: true,
  lastModified: true,
}));

// API Endpoints
// -------------

// Endpoint to get client logos
app.get('/api/ourclients', async (req, res) => {
  try {
    const files = await fs.readdir(config.clientLogosDir);
    res.json({ success: true, data: files });
  } catch (error) {
    console.error('Failed to read client logos:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to read client logos',
      message: config.environment === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
// -------------

// 404 handler
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'), err => {
    if (err) {
      console.error('Error sending 404 page:', err);
      res.status(404).send('Page not found');
    }
  });
});

// General error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).sendFile(path.join(__dirname, '500.html'), error => {
    if (error) {
      console.error('Error sending 500 page:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port} in ${config.environment} mode`);
  console.log(`http://localhost:${config.port}`);
});
