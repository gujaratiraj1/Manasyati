# Manasyati Engineering Services Website

A modern, responsive website for Manasyati Engineering Services, showcasing their MEP design solutions and services in Hyderabad.

## Features

- Responsive design optimized for all devices
- Modern UI with smooth animations and interactive elements
- Comprehensive service showcase with detailed information
- Client and architect portfolio gallery
- Contact and quote request forms with validation
- Performance optimized with service worker and resource caching
- SEO optimized with structured data and meta tags
- Accessibility compliant design

## Project Structure

```
manasyati/
├── public/                # Production-ready assets
│   ├── css/               # Compiled and optimized CSS
│   ├── js/                # Compiled and optimized JavaScript
│   └── images/            # Optimized images
├── scripts/               # Build and utility scripts
│   ├── build.js           # Production build script
│   └── optimize-images.js # Image optimization script
├── css/                   # Source CSS files
├── js/                    # Source JavaScript files
├── img_res/               # Original image resources
├── image/                 # Additional image resources
├── ourclients/            # Client logo images
├── *.html                 # HTML pages
├── server.js              # Express server for serving the website
├── 404.html               # Custom 404 error page
├── 500.html               # Custom 500 error page
├── robots.txt             # SEO directives for crawlers
├── sitemap.xml            # XML sitemap for search engines
├── sw.js                  # Service worker for offline capabilities
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## Technologies Used

- **Frontend:**
  - HTML5
  - CSS3 with Tailwind CSS
  - JavaScript (Vanilla)
  - AOS (Animate On Scroll)
  - Remix Icon (Icon library)
  - Service Worker for offline support
  
- **Backend:**
  - Node.js
  - Express.js
  - Compression (for gzip compression)
  - Helmet (for security headers)

- **Tools & Development:**
  - npm (Package management)
  - Sharp (Image optimization)
  - ESLint (Code linting)
  - Nodemon (Development server)

## Performance Optimizations

- Image optimization with appropriate formats and sizes
- Lazy loading of images and non-critical resources
- Resource hints (preload, prefetch) for critical assets
- Service worker for caching and offline support
- Critical CSS inlining for faster render times
- Minified and compressed assets
- Browser caching with appropriate cache headers
- Deferred loading of non-critical JavaScript

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/manasyati/website.git
cd manasyati
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Visit `http://localhost:3000` in your browser

### Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reloading
- `npm run build` - Build the project for production
- `npm run optimize-images` - Optimize images for production
- `npm run lint` - Run ESLint to check code quality

## Development

### File Naming Conventions

- HTML files: `Page-Name.html`
- CSS files: `component-name.css` or `page-name.css`
- JavaScript files: `feature-name.js`
- Image files: `descriptive-name.webp` (or `.jpg`, `.png`)

### CSS Organization

- Base styles in `main.css`
- Component-specific styles in separate files
- Utility classes provided by Tailwind CSS

### JavaScript Organization

- Modular JavaScript with separate files for each feature
- Performance optimizations in `performance.js`
- Service worker registration in `sw.js`

## Deployment

The website can be deployed to any static hosting service or Node.js hosting platform:

### Static Hosting (after building)

1. Run `npm run build` to build the project
2. Deploy the `public` directory to:
   - GitHub Pages
   - Netlify
   - Vercel
   - AWS S3
   - Firebase Hosting

### Node.js Hosting (with server)

1. Deploy the entire project to:
   - Heroku
   - DigitalOcean
   - AWS Elastic Beanstalk
   - Google Cloud Run
   - Azure App Service

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Manasyati Engineering Services
- Website: https://www.manasyati.com
- Email: ramana@manasyati.com
- Phone: +91 730 688 5392
- Address: #1-4/CP/218/5/165, Plot NO.165, Central Park Phase II, Kondapur S1. Hyderabad - 500084, India 