'use client';

import { useState } from 'react';

export default function TailwindDebug() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg"
      >
        {isOpen ? 'Hide Debug' : 'Debug Panel'}
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-64 bg-gray-800 border border-sky-400 rounded-lg shadow-xl p-4">
          <h3 className="text-sky-400 font-bold text-lg mb-3">Tailwind v3 Debug</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Text Colors</p>
              <div className="space-y-1 mt-1">
                <p className="text-white">White text</p>
                <p className="text-sky-400">Sky-400 text</p>
                <p className="text-gray-400">Gray-400 text</p>
                <p className="text-gray-300">Gray-300 text</p>
                <p className="text-red-500">Red-500 text</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-400">Backgrounds</p>
              <div className="grid grid-cols-3 gap-1 mt-1">
                <div className="bg-sky-400 h-6 rounded"></div>
                <div className="bg-sky-500 h-6 rounded"></div>
                <div className="bg-sky-600 h-6 rounded"></div>
                <div className="bg-gray-700 h-6 rounded"></div>
                <div className="bg-gray-800 h-6 rounded"></div>
                <div className="bg-gray-900 h-6 rounded"></div>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-400">Font Size Classes</p>
              <div className="space-y-1 mt-1">
                <p className="text-xs">text-xs</p>
                <p className="text-sm">text-sm</p>
                <p className="text-base">text-base</p>
                <p className="text-lg">text-lg</p>
                <p className="text-xl">text-xl</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-400">Spacing Classes</p>
              <div className="flex items-center mt-1">
                <div className="p-1 bg-sky-500 rounded"></div>
                <div className="p-2 bg-sky-500 rounded ml-2"></div>
                <div className="p-3 bg-sky-500 rounded ml-2"></div>
                <div className="p-4 bg-sky-500 rounded ml-2"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}