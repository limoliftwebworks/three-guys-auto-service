"use client";

import React from "react";
import { ColorPicker, TextInput } from "../ui";

interface BrowserSectionProps {
  config: any;
  updateConfig: (config: any) => void;
}

export function BrowserSection({ config, updateConfig }: BrowserSectionProps) {
  const updateBrowser = (field: string, value: any) => {
    const newConfig = {
      ...config,
      browser: {
        ...config.browser,
        [field]: value,
      },
    };
    updateConfig(newConfig);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-green-200 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🌐</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Browser & SEO Settings
            </h2>
            <p className="text-gray-600">
              Configure page titles, favicons, and browser appearance
            </p>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          👀 Browser Tab Preview
        </h3>
        <div className="bg-white rounded-lg p-4 border shadow-sm">
          <div className="flex items-center gap-2 text-sm">
            <div
              className="w-4 h-4 rounded-sm"
              style={{
                backgroundColor: config.browser?.themeColor || "#66bf9b",
              }}
            />
            <span className="font-medium truncate">
              {config.browser?.title || "Your Website Title"}
            </span>
            <span className="text-xs text-gray-500">📁</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Favicon folder: /{config.browser?.faviconFolder || "favicon"}/
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 gap-6">
        {/* Page Titles */}
        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
            📄 Page Titles & SEO
          </h3>
          <div className="space-y-4">
            <TextInput
              label="Main Page Title"
              value={config.browser?.title || ""}
              onChange={(value) => updateBrowser("title", value)}
              placeholder="Your Business - Professional Services in Your City"
              icon="📝"
              description="This appears in the browser tab and search results"
            />
            <TextInput
              label="Short Title"
              value={config.browser?.shortTitle || ""}
              onChange={(value) => updateBrowser("shortTitle", value)}
              placeholder="Your Business"
              icon="📋"
              description="Shorter version used in small browser tabs"
            />
          </div>
        </div>

        {/* Favicon & Theme */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
            🎨 Favicon & Theme
          </h3>
          <div className="space-y-4">
            <TextInput
              label="Favicon Folder"
              value={config.browser?.faviconFolder || ""}
              onChange={(value) => updateBrowser("faviconFolder", value)}
              placeholder="favicon"
              icon="📁"
              description="Folder name in /public/ containing your favicon files"
            />
            <ColorPicker
              label="Theme Color"
              value={config.browser?.themeColor || "#66bf9b"}
              onChange={(value) => updateBrowser("themeColor", value)}
              description="Browser theme color for mobile devices and some browsers"
            />
          </div>
        </div>

        {/* Favicon Requirements */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center gap-2">
            📋 Favicon File Requirements
          </h3>
          <div className="text-sm text-yellow-700 space-y-2">
            <p>Your favicon folder should contain these files:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <div className="font-medium">Required Files:</div>
                <ul className="text-xs mt-1 space-y-1">
                  <li>• favicon.ico (32×32 or 16×16)</li>
                  <li>• favicon-16x16.png</li>
                  <li>• favicon-32x32.png</li>
                  <li>• apple-touch-icon.png (180×180)</li>
                </ul>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <div className="font-medium">Optional Files:</div>
                <ul className="text-xs mt-1 space-y-1">
                  <li>• site.webmanifest</li>
                  <li>• android-chrome-192x192.png</li>
                  <li>• android-chrome-512x512.png</li>
                  <li>• safari-pinned-tab.svg</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
            💡 SEO Tips
          </h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>
              • Keep titles under 60 characters for best search result display
            </li>
            <li>• Include your location and main service in the title</li>
            <li>• Use a consistent theme color that matches your brand</li>
            <li>
              • Generate favicons using tools like favicon.io or
              realfavicongenerator.net
            </li>
            <li>
              • Test your favicon by checking your browser tab after saving
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
