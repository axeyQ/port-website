'use client';

import { useState } from 'react';

export default function TailwindV4Test() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 50 }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          backgroundColor: '#0284c7', 
          color: 'white', 
          fontWeight: 'bold',
          padding: '0.5rem 1rem',
          borderRadius: '9999px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}
      >
        Tailwind Test
      </button>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '3rem',
          right: 0,
          width: '16rem',
          backgroundColor: '#1f2937',
          border: '1px solid #0284c7',
          borderRadius: '0.5rem',
          padding: '1rem'
        }}>
          <h3 style={{ color: '#38bdf8', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Tailwind Test
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.25rem', marginBottom: '0.5rem' }}>
            <div style={{ backgroundColor: '#38bdf8', height: '2rem', borderRadius: '0.25rem' }}></div>
            <div style={{ backgroundColor: '#0ea5e9', height: '2rem', borderRadius: '0.25rem' }}></div>
            <div style={{ backgroundColor: '#0284c7', height: '2rem', borderRadius: '0.25rem' }}></div>
          </div>
          
          <div style={{ color: 'white', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem' }}>XS</span>
            <span style={{ fontSize: '0.875rem' }}>SM</span>
            <span style={{ fontSize: '1rem' }}>BASE</span>
            <span style={{ fontSize: '1.125rem' }}>LG</span>
            <span style={{ fontSize: '1.25rem' }}>XL</span>
          </div>
        </div>
      )}
    </div>
  );
}