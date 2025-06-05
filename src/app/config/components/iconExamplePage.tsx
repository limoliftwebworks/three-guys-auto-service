'use client';

import React, { useState } from 'react';
import IconConfigField from '@/components/IconConfigField';

// Simple example component showing the Icon Selector integration
export default function IconExamplePage() {
  const [selectedIcon, setSelectedIcon] = useState('<ExclamationTriangleIcon className="w-full h-full" />');
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Icon Selector Example</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Select an Icon</h2>
          <IconConfigField
            label="Icon"
            value={selectedIcon}
            onChange={setSelectedIcon}
          />
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Selected Icon</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 border rounded flex items-center justify-center bg-blue-50 p-2">
              <div dangerouslySetInnerHTML={{ __html: selectedIcon }} />
            </div>
            <div>
              <p className="font-medium">Icon HTML:</p>
              <code className="bg-gray-100 p-2 rounded block mt-1 text-sm">{selectedIcon}</code>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">How to Use</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="mb-2">1. Import the IconConfigField component:</p>
            <code className="bg-gray-100 p-2 rounded block mt-1 mb-4 text-sm">
              {`import IconConfigField from '@/components/IconConfigField';`}
            </code>
            
            <p className="mb-2">2. Use it in your component:</p>
            <code className="bg-gray-100 p-2 rounded block mt-1 mb-4 text-sm whitespace-pre-wrap">
              {`const [icon, setIcon] = useState('<EmailIcon className="w-full h-full" />');\n\n<IconConfigField\n  label="Icon"\n  value={icon}\n  onChange={setIcon}\n/>`}
            </code>
            
            <p className="mb-2">3. To render the selected icon:</p>
            <code className="bg-gray-100 p-2 rounded block mt-1 text-sm">
              {`<div dangerouslySetInnerHTML={{ __html: icon }} />`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
} 