// Function to detect if we are on the server or client
export const isClient = typeof window !== 'undefined';

// Throttle function to limit the rate at which a function is executed
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Function to map a value from one range to another
export function mapRange(value, in_min, in_max, out_min, out_max) {
  return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// Generate a random number between min and max
export function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Lerp (Linear Interpolation) function
export function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

// Clamp a value between min and max
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Detect mobile device
export function isMobile() {
  return isClient && window.matchMedia('(max-width: 768px)').matches;
}

// Delay execution (async/await helper)
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}