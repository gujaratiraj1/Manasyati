// Performance monitoring with modern techniques
const perfMetrics = {
  init() {
    this.observePageLoad();
    this.observeNetworkRequests();
    this.observeResourceTiming();
    this.trackErrors();
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
  },

  // Observe page load time
  observePageLoad() {
    if (window.performance) {
      window.addEventListener('load', () => {
        try {
          const timing = performance.timing;
          const loadTime = timing.loadEventEnd - timing.navigationStart;
          console.info(`Page load time: ${loadTime}ms`);
          
          // Send to analytics if needed
          if (window.gtag) {
            gtag('event', 'timing_complete', {
              name: 'page_load',
              value: loadTime,
              event_category: 'Performance'
            });
          }
        } catch (err) {
          console.error('Error calculating page load time:', err);
        }
      });
    }
  },

  // Monitor network requests
  observeNetworkRequests() {
    try {
      const originalFetch = window.fetch;
      window.fetch = async (...args) => {
        const start = performance.now();
        try {
          const response = await originalFetch(...args);
          const duration = performance.now() - start;
          console.info(`Request to ${args[0]} took ${duration.toFixed(2)}ms`);
          return response;
        } catch (err) {
          console.error('Network request failed:', err);
          throw err;
        }
      };
    } catch (err) {
      console.error('Error setting up network monitoring:', err);
    }
  },

  // Monitor resource timing
  observeResourceTiming() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.initiatorType === 'img') {
            console.info(`Image ${entry.name.split('/').pop()} loaded in ${entry.duration.toFixed(2)}ms`);
          } else if (entry.initiatorType === 'script') {
            console.info(`Script ${entry.name.split('/').pop()} loaded in ${entry.duration.toFixed(2)}ms`);
          } else if (entry.initiatorType === 'css') {
            console.info(`CSS ${entry.name.split('/').pop()} loaded in ${entry.duration.toFixed(2)}ms`);
          }
        });
      });
      observer.observe({ entryTypes: ['resource'] });
    } catch (err) {
      console.error('Error setting up resource timing:', err);
    }
  },

  // Track JavaScript errors
  trackErrors() {
    window.addEventListener('error', (e) => {
      console.error('Runtime error:', e.message);
      
      // Send to analytics
      if (window.gtag) {
        gtag('event', 'exception', {
          description: `${e.message} at ${e.filename}:${e.lineno}:${e.colno}`,
          fatal: false
        });
      }
    });
  },
  
  // Largest Contentful Paint
  observeLCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.info(`LCP: ${lastEntry.startTime.toFixed(2)}ms`);
        
        // Report to analytics
        if (window.gtag) {
          gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'LCP',
            value: Math.round(lastEntry.startTime)
          });
        }
      });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (err) {
      console.error('Error setting up LCP monitoring:', err);
    }
  },
  
  // First Input Delay
  observeFID() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstInput = entries[0];
        const delay = firstInput.processingStart - firstInput.startTime;
        console.info(`FID: ${delay.toFixed(2)}ms`);
        
        // Report to analytics
        if (window.gtag) {
          gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'FID',
            value: Math.round(delay)
          });
        }
      });
      observer.observe({ type: 'first-input', buffered: true });
    } catch (err) {
      console.error('Error setting up FID monitoring:', err);
    }
  },
  
  // Cumulative Layout Shift
  observeCLS() {
    try {
      let clsValue = 0;
      let clsEntries = [];
      
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
          }
        });
        
        console.info(`Current CLS: ${clsValue.toFixed(4)}`);
        
        // Report to analytics
        if (window.gtag) {
          gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'CLS',
            value: Math.round(clsValue * 1000)
          });
        }
      });
      
      observer.observe({ type: 'layout-shift', buffered: true });
    } catch (err) {
      console.error('Error setting up CLS monitoring:', err);
    }
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  perfMetrics.init();
});

// Add dynamic image loading optimization
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  // For browsers that don't support native lazy loading
  if ('loading' in HTMLImageElement.prototype === false) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    
    lazyImages.forEach(image => {
      lazyImageObserver.observe(image);
    });
  }
});

// Common site functionality
const siteCommon = {
  init() {
    this.setupStickyHeader();
    this.setupCounterAnimations();
    this.setupModalFunctions();
    this.setupParticlesJS();
    this.setupAOSAnimations();
    this.enhanceAccessibility();
    this.standardizeModalFunctionality();
  },

  // Set up sticky header
  setupStickyHeader() {
    const header = document.querySelector('header');
    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('floating-nav', window.scrollY > 0);
        header.classList.toggle('scrolled', window.scrollY > 100);
      });
    }
  },

  // Set up counter animations
  setupCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;

    const animateCounter = (counter) => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      
      const updateCount = () => {
        const inc = target / 200;
        if (count < target) {
          count = Math.ceil(count + inc);
          counter.innerText = count;
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };
      
      updateCount();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5, rootMargin: '0px 0px -100px 0px' }
    );

    counters.forEach(counter => observer.observe(counter));
  },

  // Modal functions
  setupModalFunctions() {
    // Quote Modal Functions
    window.openQuoteModal = function() {
      const modal = document.getElementById('quoteModal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    };

    window.closeQuoteModal = function() {
      const modal = document.getElementById('quoteModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    };

    // Consultation Modal Functions
    window.openConsultationModal = function() {
      const modal = document.getElementById('consultationModal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    };

    window.closeConsultationModal = function() {
      const modal = document.getElementById('consultationModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    };

    // Set up any quote forms
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
      quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Handle form submission
        window.closeQuoteModal();
        
        // Show success message
        const successDialog = document.createElement('div');
        successDialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        successDialog.innerHTML = `
          <div class="bg-white !rounded-lg p-8 max-w-md w-full mx-4">
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 !rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="ri-check-line text-3xl text-green-500" aria-hidden="true"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
              <p class="text-gray-600 mb-6">Thank you for your interest. Our team will contact you within 24 hours.</p>
              <button onclick="this.closest('.fixed').remove()" class="bg-primary text-white px-6 py-2 !rounded-button font-semibold hover:bg-opacity-90">Close</button>
            </div>
          </div>
        `;
        document.body.appendChild(successDialog);
        quoteForm.reset();
      });
    }
    
    // Set up any consultation forms
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
      consultationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Handle form submission
        window.closeConsultationModal();
        
        // Show success message
        const successDialog = document.createElement('div');
        successDialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        successDialog.innerHTML = `
          <div class="bg-white !rounded-lg p-8 max-w-md w-full mx-4">
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 !rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="ri-check-line text-3xl text-green-500" aria-hidden="true"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
              <p class="text-gray-600 mb-6">Thank you for your interest. Our team will contact you within 24 hours.</p>
              <button onclick="this.closest('.fixed').remove()" class="bg-primary text-white px-6 py-2 !rounded-button font-semibold hover:bg-opacity-90">Close</button>
            </div>
          </div>
        `;
        document.body.appendChild(successDialog);
        consultationForm.reset();
      });
    }
  },

  // Standardize modal functionality across all pages
  standardizeModalFunctionality() {
    // Ensure buttons have proper click handlers
    document.querySelectorAll('button').forEach(button => {
      const buttonText = button.textContent.trim().toLowerCase();
      
      // Add event listeners to buttons without onclick attributes
      if (!button.hasAttribute('onclick')) {
        if (buttonText.includes('quote')) {
          button.setAttribute('onclick', 'openQuoteModal()');
          button.setAttribute('aria-label', 'Request a Quote');
        } else if (buttonText.includes('consultation') || buttonText.includes('consult')) {
          button.setAttribute('onclick', 'openConsultationModal()');
          button.setAttribute('aria-label', 'Request a Consultation');
        }
      }
    });
    
    // Check if page has quote button but no modal, and create one if needed
    if (document.querySelector('button[onclick*="openQuoteModal"]') && !document.getElementById('quoteModal')) {
      this.createQuoteModal();
    }
    
    // Check if page has consultation button but no modal, and create one if needed
    if (document.querySelector('button[onclick*="openConsultationModal"]') && !document.getElementById('consultationModal')) {
      this.createConsultationModal();
    }
  },
  
  // Create quote modal if it doesn't exist
  createQuoteModal() {
    const modal = document.createElement('div');
    modal.id = 'quoteModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white !rounded-lg p-8 max-w-2xl w-full mx-4">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900" id="quoteFormHeading">Request a Quote</h3>
          <button
            onclick="closeQuoteModal()"
            class="text-gray-500 hover:text-gray-700"
            aria-label="Close quote form"
          >
            <i class="ri-close-line text-2xl" aria-hidden="true"></i>
          </button>
        </div>
        <form id="quoteForm" class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                aria-required="true"
                class="w-full px-4 py-2 border !rounded-button"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                aria-required="true"
                class="w-full px-4 py-2 border !rounded-button"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                aria-required="true"
                class="w-full px-4 py-2 border !rounded-button"
              />
            </div>
            <div>
              <label for="projectType" class="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
              <select
                id="projectType"
                name="projectType"
                required
                aria-required="true"
                class="w-full px-4 py-2 border !rounded-button"
              >
                <option value="">Select Type</option>
                <option value="commercial">Commercial</option>
                <option value="residential">Residential</option>
                <option value="industrial">Industrial</option>
                <option value="healthcare">Healthcare</option>
              </select>
            </div>
          </div>
          <div>
            <label for="requirements" class="block text-sm font-medium text-gray-700 mb-2">Project Requirements</label>
            <textarea
              id="requirements"
              name="requirements"
              required
              aria-required="true"
              class="w-full px-4 py-2 border !rounded-button h-32"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-primary text-white py-3 !rounded-button font-semibold hover:bg-opacity-90"
          >
            Submit Request
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add the modal open and close functions to window if they don't exist
    if (typeof window.openQuoteModal !== 'function') {
      window.openQuoteModal = function() {
        const modal = document.getElementById('quoteModal');
        if (modal) {
          modal.classList.remove('hidden');
          modal.classList.add('flex');
        }
      };
    }
    
    if (typeof window.closeQuoteModal !== 'function') {
      window.closeQuoteModal = function() {
        const modal = document.getElementById('quoteModal');
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
      };
    }
    
    // Set up form submission handler
    setTimeout(() => {
      const quoteForm = document.getElementById('quoteForm');
      if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
          e.preventDefault();
          window.closeQuoteModal();
          
          // Show success message
          const successDialog = document.createElement('div');
          successDialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
          successDialog.innerHTML = `
            <div class="bg-white !rounded-lg p-8 max-w-md w-full mx-4">
              <div class="text-center">
                <div class="w-16 h-16 bg-green-100 !rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="ri-check-line text-3xl text-green-500" aria-hidden="true"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
                <p class="text-gray-600 mb-6">Thank you for your interest. Our team will contact you within 24 hours.</p>
                <button onclick="this.closest('.fixed').remove()" class="bg-primary text-white px-6 py-2 !rounded-button font-semibold hover:bg-opacity-90">Close</button>
              </div>
            </div>
          `;
          document.body.appendChild(successDialog);
          quoteForm.reset();
        });
      }
    }, 100);
  },
  
  // Create consultation modal if it doesn't exist
  createConsultationModal() {
    const modal = document.createElement('div');
    modal.id = 'consultationModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white !rounded-lg p-8 max-w-2xl w-full mx-4">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-900" id="consultationFormHeading">Schedule a Consultation</h3>
          <button
            onclick="closeConsultationModal()"
            class="text-gray-500 hover:text-gray-700"
            aria-label="Close consultation form"
          >
            <i class="ri-close-line text-2xl" aria-hidden="true"></i>
          </button>
        </div>
        <form id="consultationForm" class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label for="consultFullName" class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                id="consultFullName"
                name="fullName"
                required
                aria-required="true"
                class="w-full px-4 py-2 border !rounded-button"
              />
            </div>
            <div>
              <label for="consultEmail" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                id="consultEmail"
                name="email"
                required
                aria-required="true"
                class="w-full px-4 py-2 border !rounded-button"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label for="consultPhone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                id="consultPhone"
                name="phone"
                required
                aria-required="true"
                class="w-full px-4 py-2 border !rounded-button"
              />
            </div>
            <div>
              <label for="consultProjectType" class="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
              <select
                id="consultProjectType"
                name="projectType"
                required
                aria-required="true"
                class="w-full px-4 py-2 border !rounded-button"
              >
                <option value="">Select Type</option>
                <option value="commercial">Commercial</option>
                <option value="residential">Residential</option>
                <option value="industrial">Industrial</option>
                <option value="healthcare">Healthcare</option>
              </select>
            </div>
          </div>
          <div>
            <label for="consultRequirements" class="block text-sm font-medium text-gray-700 mb-2">Project Requirements</label>
            <textarea
              id="consultRequirements"
              name="requirements"
              required
              aria-required="true"
              class="w-full px-4 py-2 border !rounded-button h-32"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-primary text-white py-3 !rounded-button font-semibold hover:bg-opacity-90"
          >
            Submit Request
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add the modal open and close functions to window if they don't exist
    if (typeof window.openConsultationModal !== 'function') {
      window.openConsultationModal = function() {
        const modal = document.getElementById('consultationModal');
        if (modal) {
          modal.classList.remove('hidden');
          modal.classList.add('flex');
        }
      };
    }
    
    if (typeof window.closeConsultationModal !== 'function') {
      window.closeConsultationModal = function() {
        const modal = document.getElementById('consultationModal');
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
      };
    }
    
    // Set up form submission handler
    setTimeout(() => {
      const consultationForm = document.getElementById('consultationForm');
      if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
          e.preventDefault();
          window.closeConsultationModal();
          
          // Show success message
          const successDialog = document.createElement('div');
          successDialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
          successDialog.innerHTML = `
            <div class="bg-white !rounded-lg p-8 max-w-md w-full mx-4">
              <div class="text-center">
                <div class="w-16 h-16 bg-green-100 !rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="ri-check-line text-3xl text-green-500" aria-hidden="true"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
                <p class="text-gray-600 mb-6">Thank you for your interest. Our team will contact you within 24 hours.</p>
                <button onclick="this.closest('.fixed').remove()" class="bg-primary text-white px-6 py-2 !rounded-button font-semibold hover:bg-opacity-90">Close</button>
              </div>
            </div>
          `;
          document.body.appendChild(successDialog);
          consultationForm.reset();
        });
      }
    }, 100);
  },

  // Initialize particles.js if present
  setupParticlesJS() {
    if (window.particlesJS && document.getElementById('particles-js')) {
      particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
          }
        },
        retina_detect: true
      });
    }
  },

  // Initialize AOS animations
  setupAOSAnimations() {
    if (window.AOS) {
      AOS.init({
        duration: 800,
        once: true,
        disable: window.innerWidth < 768
      });
    }
  },

  // Enhance accessibility
  enhanceAccessibility() {
    // Add aria-hidden to decorative icons
    document.querySelectorAll('.ri-checkbox-circle-line, .ri-phone-line, .ri-mail-line, .ri-map-pin-line').forEach(icon => {
      if (!icon.hasAttribute('aria-hidden')) {
        icon.setAttribute('aria-hidden', 'true');
      }
    });

    // Ensure all links have descriptive text
    document.querySelectorAll('a:not([aria-label])').forEach(link => {
      if (!link.textContent.trim() && link.querySelector('i')) {
        const nextText = link.nextElementSibling?.textContent;
        if (nextText) {
          link.setAttribute('aria-label', nextText.trim());
        }
      }
    });

    // Ensure all images have alt text
    document.querySelectorAll('img:not([alt])').forEach(img => {
      img.setAttribute('alt', '');
    });
  }
};

// Initialize common functionality
document.addEventListener('DOMContentLoaded', () => {
  siteCommon.init();
});
