"use client";

import React, { useState, useCallback } from "react";
import { RgbaStringColorPicker, HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
}

// Helper functions to convert between color formats
const hexToRgba = (
  hex: string
): { r: number; g: number; b: number; a: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(
    hex
  );
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    const a = result[4] ? parseInt(result[4], 16) / 255 : 1;
    return { r, g, b, a };
  }
  return { r: 0, g: 0, b: 0, a: 1 };
};

const rgbaToString = (rgba: {
  r: number;
  g: number;
  b: number;
  a: number;
}): string => {
  if (rgba.a === 1) {
    return `#${rgba.r.toString(16).padStart(2, "0")}${rgba.g
      .toString(16)
      .padStart(2, "0")}${rgba.b.toString(16).padStart(2, "0")}`;
  }
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
};

const parseColorValue = (
  color: string
): { r: number; g: number; b: number; a: number } => {
  // Handle rgba() format
  const rgbaMatch = color.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
  );
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1]),
      g: parseInt(rgbaMatch[2]),
      b: parseInt(rgbaMatch[3]),
      a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
    };
  }

  // Handle hex with alpha (e.g., #ffffff20)
  if (color.length === 9 && color.startsWith("#")) {
    return hexToRgba(color);
  }

  // Handle standard hex
  if (color.startsWith("#")) {
    return hexToRgba(color);
  }

  // Default fallback
  return { r: 0, g: 0, b: 0, a: 1 };
};

export function ColorPicker({
  label,
  value,
  onChange,
  description,
}: ColorPickerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState<"hex" | "rgba">(() => {
    return value.includes("rgba") || value.length === 9 ? "rgba" : "hex";
  });

  const currentColor = parseColorValue(value);
  const currentRgbaString = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${currentColor.a})`;
  const currentHex = `#${currentColor.r
    .toString(16)
    .padStart(2, "0")}${currentColor.g
    .toString(16)
    .padStart(2, "0")}${currentColor.b.toString(16).padStart(2, "0")}`;

  const handleColorChange = useCallback(
    (newColor: string) => {
      onChange(newColor);
    },
    [onChange]
  );

  const handleRgbaChange = useCallback(
    (newRgbaString: string) => {
      onChange(newRgbaString);
    },
    [onChange]
  );

  // Common color presets including transparency
  const colorPresets = [
    "#53a584",
    "#66bf9b",
    "#387e62",
    "#246043",
    "#3b82f6",
    "#1d4ed8",
    "#ef4444",
    "#dc2626",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#10b981",
    "#ffffff",
    "#000000",
    "rgba(255, 255, 255, 0.1)",
    "rgba(255, 255, 255, 0.2)",
    "rgba(255, 255, 255, 0.3)",
    "rgba(0, 0, 0, 0.1)",
    "rgba(0, 0, 0, 0.2)",
    "rgba(0, 0, 0, 0.3)",
    "rgba(53, 165, 132, 0.2)",
    "rgba(102, 191, 155, 0.3)",
    "rgba(59, 130, 246, 0.1)",
    "rgba(239, 68, 68, 0.2)",
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Color Display & Input */}
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Checkerboard background for transparency preview */}
          <div className="absolute inset-0 bg-checkerboard opacity-50"></div>
          <div
            className="absolute inset-0"
            style={{ backgroundColor: value }}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="rgba(255, 255, 255, 0.5)"
          />
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setMode(mode === "hex" ? "rgba" : "hex")}
            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border text-gray-600"
          >
            {mode === "hex" ? "HEX" : "RGBA"}
          </button>
        </div>
      </div>

      {/* Color Picker */}
      {isExpanded && (
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-lg">
          <div className="mb-4">
            {mode === "rgba" ? (
              <RgbaStringColorPicker
                color={currentRgbaString}
                onChange={handleRgbaChange}
              />
            ) : (
              <HexColorPicker color={currentHex} onChange={handleColorChange} />
            )}
          </div>

          {/* Color Presets */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Quick Colors
            </h4>
            <div className="grid grid-cols-8 gap-2">
              {colorPresets.map((color, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onChange(color);
                    setIsExpanded(false);
                  }}
                  className={`w-8 h-8 rounded-md border-2 hover:scale-110 transition-transform relative overflow-hidden ${
                    color === value
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-300"
                  }`}
                  title={color}
                >
                  <div className="absolute inset-0 bg-checkerboard opacity-50"></div>
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: color }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setIsExpanded(false)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded border text-gray-600"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .bg-checkerboard {
          background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(-45deg, transparent 75%, #ccc 75%);
          background-size: 8px 8px;
          background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
        }
      `}</style>
    </div>
  );
}
