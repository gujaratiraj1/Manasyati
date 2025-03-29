// Performance monitoring
const perfMetrics = {
  init() {
    this.observePageLoad();
    this.observeNetworkRequests();
    this.observeResourceTiming();
    this.trackErrors();
  },

  observePageLoad() {
    if (window.performance) {
      window.addEventListener('load', () => {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.info(`Page load time: ${loadTime}ms`);
      });
    }
  },

  observeNetworkRequests() {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const start = performance.now();
      try {
        const response = await originalFetch(...args);
        const duration = performance.now() - start;
        console.info(`Request to ${args[0]} took ${duration}ms`);
        return response;
      } catch (err) {
        console.error('Network request failed:', err);
        throw err;
      }
    };
  },

  observeResourceTiming() {
    performance.getEntriesByType('resource').forEach(entry => {
      if (entry.initiatorType === 'img') {
        console.info(`Image ${entry.name} loaded in ${entry.duration}ms`);
      }
    });
  },

  trackErrors() {
    window.addEventListener('error', (e) => {
      console.error('Runtime error:', e.message);
      // Send to error tracking service
    });
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  perfMetrics.init();
});
