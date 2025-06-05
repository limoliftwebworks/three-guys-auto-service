"use client";

import React from "react";
import { TextInput } from "../ui";

interface CursorSectionProps {
  config: any;
  updateConfig: (config: any) => void;
}

export function CursorSection({ config, updateConfig }: CursorSectionProps) {
  const updateCursor = (field: string, value: any) => {
    const newConfig = {
      ...config,
      cursor: {
        ...config.cursor,
        [field]: value,
      },
    };
    updateConfig(newConfig);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-pink-200 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🎯</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Custom Cursor Settings
            </h2>
            <p className="text-gray-600">
              Configure interactive cursor design and behavior
            </p>
          </div>
        </div>
      </div>

      {/* Enable/Disable Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-pink-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-pink-800 mb-4 flex items-center gap-2">
            🖥️ Desktop Settings
          </h3>
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.cursor?.enabled !== false}
                onChange={(e) => updateCursor("enabled", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
            </label>
            <div>
              <p className="font-medium text-gray-800">Enable Custom Cursor</p>
              <p className="text-sm text-gray-600">
                Show custom cursor on desktop devices
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
            📱 Mobile Settings
          </h3>
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.cursor?.mobileEnabled === true}
                onChange={(e) =>
                  updateCursor("mobileEnabled", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
            <div>
              <p className="font-medium text-gray-800">Enable on Mobile</p>
              <p className="text-sm text-gray-600">
                Show custom cursor on mobile devices (not recommended)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cursor Images */}
      {config.cursor?.enabled !== false && (
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
            🖼️ Cursor Images
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              label="Default Cursor Image"
              value={config.cursor?.cursorImage || ""}
              onChange={(value) => updateCursor("cursorImage", value)}
              placeholder="cursor.png"
              icon="🖱️"
              description="Cursor for background/non-interactive areas"
            />
            <TextInput
              label="Interactive Element Cursor"
              value={config.cursor?.elementCursorImage || ""}
              onChange={(value) => updateCursor("elementCursorImage", value)}
              placeholder="pointer.png"
              icon="👆"
              description="Cursor for buttons, links, and interactive elements"
            />
          </div>

          <div className="mt-4 p-4 bg-purple-100 rounded-lg">
            <p className="text-sm text-purple-700">
              <strong>📁 File Location:</strong> Cursor images should be placed
              in <code>/public/cursor/</code> folder.
            </p>
          </div>
        </div>
      )}

      {/* Preview */}
      {config.cursor?.enabled !== false && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            👀 Cursor Preview
          </h3>
          <div className="bg-white rounded-lg p-8 border">
            <div className="text-center space-y-4">
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-600">
                  Move your mouse around this area to see the default cursor
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Using: {config.cursor?.cursorImage || "default cursor"}
                </p>
              </div>
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                style={{ cursor: "pointer" }}
              >
                Hover me for interactive cursor
              </button>
              <p className="text-xs text-gray-500">
                Interactive elements use:{" "}
                {config.cursor?.elementCursorImage || "default pointer"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
          💡 Cursor Tips
        </h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Custom cursors work best on desktop devices</li>
          <li>
            • Keep cursor images small (24x24px to 32x32px) for best performance
          </li>
          <li>• Use PNG format with transparency for best results</li>
          <li>
            • The cursor hotspot (click point) is automatically set to the
            top-left corner
          </li>
          <li>
            • Test your cursors on different backgrounds to ensure visibility
          </li>
          <li>
            • Consider using different cursors for different interaction states
          </li>
          <li>• Mobile devices typically ignore custom cursors</li>
        </ul>
      </div>
    </div>
  );
}
