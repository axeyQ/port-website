// src/components/ui/Honeypot.js
'use client';

export default function Honeypot() {
  // This component adds a hidden field that only bots will fill out
  // Humans won't see it, but bots scanning the form will
  return (
    <div
      className="opacity-0 absolute top-0 left-0 h-0 w-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <label className="text-xs text-gray-500">
        Leave this field empty if you&apos;re human:
        <input
          type="text"
          name="website"
          tabIndex="-1"
          autoComplete="off"
        />
      </label>
    </div>
  );
}