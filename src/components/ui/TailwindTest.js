'use client';

export default function TailwindTest() {
  return (
    <div className="fixed top-4 left-4 z-50 bg-gray-800 p-4 rounded-lg shadow-lg border border-sky-500">
      <h2 className="text-xl font-bold text-sky-400 mb-2">Tailwind Test</h2>
      <div className="space-y-2">
        <p className="text-white">This is white text</p>
        <p className="text-sky-400">This is sky-400 text</p>
        <p className="text-gray-300">This is gray-300 text</p>
        <p className="font-bold">This is bold text</p>
        <p className="italic">This is italic text</p>
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
        </div>
        <button className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded">
          Button
        </button>
      </div>
    </div>
  );
}