const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

// Enable compression for all responses
app.use(compression());

// Security headers
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

// Cache control middleware for static files
const cacheControl = (req, res, next) => {
  // Set caching headers
  const oneYearInSeconds = 31536000;
  const oneDayInSeconds = 86400;

  if (req.url.match(/\.(css|js|woff2|jpg|jpeg|png|webp|gif|ico)$/)) {
    // Long-term caching for static assets
    res.setHeader('Cache-Control', `public, max-age=${oneYearInSeconds}`);
  } else if (req.url.match(/\.(html)$/)) {
    // Shorter caching for HTML files
    res.setHeader('Cache-Control', `public, max-age=${oneDayInSeconds}`);
  } else {
    // Default caching policy
    res.setHeader('Cache-Control', 'public, max-age=0');
  }
  next();
};

// Apply cache control middleware
app.use(cacheControl);

// Serve static files with appropriate options
app.use(express.static('.', {
  etag: true, // Enable ETag for caching
  lastModified: true, // Enable Last-Modified for caching
}));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Internal Server Error');
});

// Endpoint to get client logos
app.get('/ourclients', async (req, res) => {
  try {
    const files = await fs.readdir('ourclients');
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read client logos' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
