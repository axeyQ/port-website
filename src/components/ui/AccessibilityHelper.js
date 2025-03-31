'use client';

import { useState, useEffect } from 'react';

// SkipLink component for keyboard navigation
export function SkipLink({ 
  href = '#main-content', 
  text = 'Skip to main content', 
  className = '' 
}) {
  return (
    <a
      href={href}
      className={`absolute left-0 top-0 p-3 bg-sky-600 text-white transform -translate-y-full focus:translate-y-0 z-50 transition-transform focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-600 ${className}`}
    >
      {text}
    </a>
  );
}

// VisuallyHidden component for screen readers
export function VisuallyHidden({ children, as: Component = 'span', ...props }) {
  return (
    <Component
      className="absolute w-px h-px p-0 -m-1 overflow-hidden whitespace-nowrap border-0"
      {...props}
    >
      {children}
    </Component>
  );
}

// LiveRegion component for announcing dynamic content changes
export function LiveRegion({ 
  children, 
  ariaLive = 'polite', 
  ariaAtomic = true,
  className = ''
}) {
  return (
    <div
      className={`sr-only ${className}`}
      aria-live={ariaLive}
      aria-atomic={ariaAtomic}
    >
      {children}
    </div>
  );
}

// AnimationToggle component for users with motion sensitivity
export function AnimationToggle({ onToggle, initialState = true, className = '' }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(initialState);
  
  const toggleAnimations = () => {
    const newState = !animationsEnabled;
    setAnimationsEnabled(newState);
    
    // Set a data attribute on the document body to control animations
    if (newState) {
      document.body.removeAttribute('data-reduced-motion');
    } else {
      document.body.setAttribute('data-reduced-motion', 'true');
    }
    
    // Call the callback if provided
    if (onToggle) {
      onToggle(newState);
    }
    
    // Save preference to local storage
    try {
      localStorage.setItem('prefersReducedMotion', String(!newState));
    } catch (e) {
      console.error('Failed to save animation preference', e);
    }
  };
  
  // Check user's saved preference and prefers-reduced-motion setting
  useEffect(() => {
    try {
      // Check browser preference
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const browserPrefersReducedMotion = mediaQuery.matches;
      
      // Check saved preference
      const savedPreference = localStorage.getItem('prefersReducedMotion');
      const userPrefersReducedMotion = savedPreference 
        ? savedPreference === 'true'
        : browserPrefersReducedMotion;
      
      // Update state and body attribute
      setAnimationsEnabled(!userPrefersReducedMotion);
      if (userPrefersReducedMotion) {
        document.body.setAttribute('data-reduced-motion', 'true');
        if (onToggle) onToggle(false);
      }
      
      // Listen for changes to prefers-reduced-motion
      const handleChange = (e) => {
        const newValue = !e.matches;
        setAnimationsEnabled(newValue);
        if (newValue) {
          document.body.removeAttribute('data-reduced-motion');
        } else {
          document.body.setAttribute('data-reduced-motion', 'true');
        }
        if (onToggle) onToggle(newValue);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch (e) {
      console.error('Failed to initialize animation preference', e);
    }
  }, [onToggle]);
  
  return (
    <button
      type="button"
      onClick={toggleAnimations}
      className={`flex items-center gap-2 p-2 ${className}`}
      aria-pressed={animationsEnabled}
    >
      <span className="relative inline-block w-10 h-6 rounded-full bg-gray-700">
        <span
          className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform duration-200 transform ${
            animationsEnabled ? 'translate-x-4 bg-sky-500' : 'bg-gray-400'
          }`}
        />
      </span>
      <span>{animationsEnabled ? 'Animations On' : 'Animations Off'}</span>
    </button>
  );
}

// ThemeToggle component for light/dark mode
export function ThemeToggle({ onToggle, initialTheme = 'dark', className = '' }) {
  const [theme, setTheme] = useState(initialTheme);
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Update document class for theme
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Call the callback if provided
    if (onToggle) {
      onToggle(newTheme);
    }
    
    // Save preference to local storage
    try {
      localStorage.setItem('theme', newTheme);
    } catch (e) {
      console.error('Failed to save theme preference', e);
    }
  };
  
  // Initialize theme based on saved preference or system preference
  useEffect(() => {
    try {
      // Check saved preference
      const savedTheme = localStorage.getItem('theme');
      
      // Check browser preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Determine theme
      const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
      setTheme(initialTheme);
      
      // Apply theme
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      if (onToggle) onToggle(initialTheme);
    } catch (e) {
      console.error('Failed to initialize theme', e);
    }
  }, [onToggle]);
  
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2 ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
  );
}