"use client";

import React from "react";
import { ColorPicker, TextInput } from "../ui";

interface InfoBarSectionProps {
  config: any;
  updateConfig: (config: any) => void;
}

export function InfoBarSection({ config, updateConfig }: InfoBarSectionProps) {
  const updateInfoBar = (field: string, value: any) => {
    const newConfig = {
      ...config,
      infoBar: {
        ...config.infoBar,
        [field]: value,
      },
    };
    updateConfig(newConfig);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-blue-200 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">📞</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Info Bar Settings
            </h2>
            <p className="text-gray-600">
              Configure the top contact banner that appears above your
              navigation
            </p>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          👀 Live Preview
        </h3>
        <div
          className="w-full p-4 rounded-lg text-center"
          style={{
            backgroundColor: config.infoBar?.backgroundColor || "#53a584",
            color: config.infoBar?.textColor || "#000000",
          }}
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span>📞 {config.infoBar?.phone || "Your Phone"}</span>
            <span>📍 {config.infoBar?.address || "Your Address"}</span>
            <span>🕒 {config.infoBar?.hours || "Your Hours"}</span>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
            📋 Contact Information
          </h3>
          <div className="space-y-4">
            <TextInput
              label="Phone Number"
              value={config.infoBar?.phone || ""}
              onChange={(value: string) => updateInfoBar("phone", value)}
              placeholder="(555) 123-4567"
              icon="📞"
            />
            <TextInput
              label="Address"
              value={config.infoBar?.address || ""}
              onChange={(value: string) => updateInfoBar("address", value)}
              placeholder="123 Main St, City, State"
              icon="📍"
            />
            <TextInput
              label="Business Hours"
              value={config.infoBar?.hours || ""}
              onChange={(value: string) => updateInfoBar("hours", value)}
              placeholder="Mon-Fri: 9AM-5PM"
              icon="🕒"
            />
            {config.infoBar?.message !== undefined && (
              <TextInput
                label="Additional Message"
                value={config.infoBar?.message || ""}
                onChange={(value: string) => updateInfoBar("message", value)}
                placeholder="Special announcements or promotions"
                icon="💬"
              />
            )}
          </div>
        </div>

        {/* Colors & Styling */}
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
            🎨 Colors & Styling
          </h3>
          <div className="space-y-4">
            <ColorPicker
              label="Background Color"
              value={config.infoBar?.backgroundColor || "#53a584"}
              onChange={(value: string) =>
                updateInfoBar("backgroundColor", value)
              }
              description="The background color of the info bar"
            />
            <ColorPicker
              label="Text Color"
              value={config.infoBar?.textColor || "#000000"}
              onChange={(value: string) => updateInfoBar("textColor", value)}
              description="The color of text in the info bar"
            />
          </div>
        </div>
      </div>

      {/* Visibility Toggle */}
      <div className="bg-green-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
          👁️ Visibility Settings
        </h3>
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.navBar?.showLogo !== false} // Default to true if undefined
              onChange={(e) => {
                const newConfig = {
                  ...config,
                  navBar: {
                    ...config.navBar,
                    showLogo: e.target.checked,
                  },
                };
                updateConfig(newConfig);
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
          <div>
            <p className="font-medium text-gray-800">Show Company Logo</p>
            <p className="text-sm text-gray-600">
              Display your logo alongside the info bar
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
          💡 Pro Tips
        </h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>
            • Keep phone numbers in a consistent format for better readability
          </li>
          <li>
            • Use contrasting colors for text and background for accessibility
          </li>
          <li>
            • Keep the address concise - full details can go on the contact page
          </li>
          <li>
            • Consider your brand colors when choosing the background color
          </li>
        </ul>
      </div>
    </div>
  );
}
