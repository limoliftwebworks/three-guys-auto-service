import React, { useState, useEffect, useRef } from 'react';

interface ColorSelectorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showHexInput?: boolean;
  presetColors?: string[];
}

const ColorSelectorInput: React.FC<ColorSelectorInputProps> = ({
  label,
  value,
  onChange,
  showHexInput = true,
  presetColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#000000', '#ffffff']
}) => {
  const [hexValue, setHexValue] = useState(value);
  const [debouncedValue, setDebouncedValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Handle initial values for RGB/RGBA format
  useEffect(() => {
    if (value && !hexValue.startsWith('#') && value !== hexValue) {
      setHexValue(value);
    }
  }, [value, hexValue]);

  // Debounce effect - only triggers onChange after user stops typing for 1000ms
  useEffect(() => {
    // Skip validation for RGB/RGBA values
    if (hexValue.startsWith('rgb')) {
      const timer = setTimeout(() => {
        setDebouncedValue(hexValue);
        onChange(hexValue);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    // Validate for hex colors
    else if (/^#([0-9A-F]{3}){1,2}$/i.test(hexValue)) {
      const timer = setTimeout(() => {
        setDebouncedValue(hexValue);
        onChange(hexValue);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [hexValue, onChange]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setHexValue(newValue);
    // We no longer immediately call onChange here
    // The debounce effect above will handle it
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setHexValue(newColor);
    setDebouncedValue(newColor);
    onChange(newColor);
  };

  const handlePresetClick = (color: string) => {
    setHexValue(color);
    setDebouncedValue(color);
    onChange(color);
    
    // Focus the input after selecting a preset color
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Prevent event propagation to stop clicks from bubbling
  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={hexValue.startsWith('#') ? hexValue : '#ffffff'}
            onChange={handleColorPickerChange}
            className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
            onClick={handleInputClick}
          />
          {showHexInput && (
            <input
              type="text"
              value={hexValue}
              onChange={handleHexChange}
              onClick={handleInputClick}
              ref={inputRef}
              onBlur={() => {
                // Don't reset if it's an RGB/RGBA value
                if (hexValue.startsWith('rgb')) {
                  return;
                }
                // Reset to current value if invalid hex on blur
                if (!/^#([0-9A-F]{3}){1,2}$/i.test(hexValue)) {
                  setHexValue(value);
                }
              }}
              className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-40 font-mono text-sm"
              placeholder="#000000 or rgba(...)"
            />
          )}
          <div 
            className="w-8 h-8 rounded border border-gray-300 flex-shrink-0"
            style={{ backgroundColor: value }}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {presetColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handlePresetClick(color)}
              className={`w-6 h-6 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                color === value ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorSelectorInput; 