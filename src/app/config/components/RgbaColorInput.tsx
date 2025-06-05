'use client';

import { useRef, useState, useEffect } from 'react';

/**
 * RGBA Color Input component with transparency slider
 * Supports both hex and rgba color formats with transparency adjustments
 */
export default function RgbaColorInput({ 
  label, 
  value = 'rgba(255, 255, 255, 1.00)', 
  onChange
}: { 
  label?: string, 
  value: string, 
  onChange: (v: string) => void
}) {
  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const [colorValue, setColorValue] = useState<string>(value);
  const [transparency, setTransparency] = useState<number>(0);
  
  // Extract alpha from an rgba string
  const extractAlpha = (color: string): number => {
    if (!color) return 1;
    
    if (color.startsWith('rgba')) {
      const matches = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (matches && matches[4]) {
        return parseFloat(matches[4]);
      }
    }
    return 1; // Default alpha if not rgba
  };
  
  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number = 1): string => {
    if (!hex) return `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
    
    if (hex.startsWith('rgba')) {
      // Already rgba format, just change alpha
      return hex.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/, `rgba($1, $2, $3, ${alpha.toFixed(2)})`);
    }
    
    // Remove # if present
    const cleanHex = hex.replace('#', '');
    
    // Convert hex to rgb
    const r = parseInt(cleanHex.length === 3 ? cleanHex.slice(0, 1).repeat(2) : cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.length === 3 ? cleanHex.slice(1, 2).repeat(2) : cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.length === 3 ? cleanHex.slice(2, 3).repeat(2) : cleanHex.slice(4, 6), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
  };
  
  // Convert rgba to hex
  const rgbaToHex = (rgba: string): string => {
    if (!rgba) return '#ffffff';
    
    if (!rgba.startsWith('rgba')) return rgba;
    
    const matches = rgba.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
    if (!matches) return rgba;
    
    const r = parseInt(matches[1]);
    const g = parseInt(matches[2]);
    const b = parseInt(matches[3]);
    
    // Convert to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };
  
  // Initialize component state from the initial value
  useEffect(() => {
    if (value) {
      setColorValue(value);
      const alpha = extractAlpha(value);
      setTransparency(Math.round((1 - alpha) * 100));
    }
  }, [value]);
  
  const handleColorChange = (newColor: string) => {
    // Calculate the current transparency
    const alpha = 1 - (transparency / 100);
    
    // Convert the new color to rgba with the current transparency
    const rgbaColor = hexToRgba(newColor, alpha);
    
    // Update the color value
    setColorValue(rgbaColor);
    
    // Call the onChange callback
    onChange(rgbaColor);
  };
  
  const handleTransparencyChange = (newTransparency: number) => {
    // Update the transparency state
    setTransparency(newTransparency);
    
    // Calculate the new alpha
    const alpha = 1 - (newTransparency / 100);
    
    // Get the current hex color
    const hexColor = rgbaToHex(colorValue);
    
    // Convert the hex color to rgba with the new alpha
    const rgbaColor = hexToRgba(hexColor, alpha);
    
    // Update the color value
    setColorValue(rgbaColor);
    
    // Call the onChange callback
    onChange(rgbaColor);
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {label && <label className="text-sm font-medium w-32">{label}</label>}
        
        {/* Hidden color input */}
        <input
          ref={colorInputRef}
          type="color"
          value={rgbaToHex(colorValue)}
          onChange={(e) => handleColorChange(e.target.value)}
          className="opacity-0 absolute w-0 h-0"
        />
        
        {/* Visible colored square */}
        <div 
          className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
          style={{ backgroundColor: colorValue }}
          onClick={() => colorInputRef.current?.click()}
        ></div>
        
        {/* Input for rgba value */}
        <input
          type="text"
          value={colorValue}
          onChange={(e) => {
            setColorValue(e.target.value);
            onChange(e.target.value);
          }}
          className="border border-gray-200 rounded px-2 py-1 text-sm flex-1 font-mono shadow-sm"
          placeholder="rgba(255, 255, 255, 1.00)"
        />
      </div>
      
      {/* Transparency slider */}
      <div className="flex items-center gap-2 pl-32">
        <span className="text-xs text-gray-500 w-20">Transparency:</span>
        <input
          type="range"
          min="0"
          max="100"
          value={transparency}
          onChange={(e) => handleTransparencyChange(parseInt(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs font-mono w-12 text-center">
          {transparency}%
        </span>
      </div>
    </div>
  );
} 