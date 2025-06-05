"use client";

import React, { useState } from "react";
import { ColorPicker, TextInput } from "../ui";

interface ThemeSectionProps {
  config: any;
  updateConfig: (config: any) => void;
}

export function ThemeSection({ config, updateConfig }: ThemeSectionProps) {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    theme: true,
    global: false,
    company: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateTheme = (field: string, value: any) => {
    const newConfig = {
      ...config,
      theme: {
        ...config.theme,
        [field]: value,
      },
    };
    updateConfig(newConfig);
  };

  const updateGlobalSetting = (field: string, value: any) => {
    const newConfig = {
      ...config,
      [field]: value,
    };
    updateConfig(newConfig);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-purple-200 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🎨</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Theme & Global Settings
            </h2>
            <p className="text-gray-600">
              Configure site-wide theme colors, global settings, and company
              information
            </p>
          </div>
        </div>
      </div>

      {/* Theme Colors */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("theme")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎨</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-purple-800">
                Theme Colors
              </h3>
              <p className="text-sm text-purple-600">
                Site-wide color scheme and theme settings
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.theme ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-5 h-5 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {expandedSections.theme && (
          <div className="p-6 space-y-6">
            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-purple-800 mb-4 flex items-center gap-2">
                🎨 Primary Colors
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Primary 600"
                  value={config.theme?.primary600 || "#2563eb"}
                  onChange={(value: string) => updateTheme("primary600", value)}
                  description="Primary color (600 shade)"
                />
                <ColorPicker
                  label="Primary 700"
                  value={config.theme?.primary700 || "#1d4ed8"}
                  onChange={(value: string) => updateTheme("primary700", value)}
                  description="Primary color (700 shade)"
                />
                <ColorPicker
                  label="Theme Color"
                  value={config.themeColor || "#f5d6d6"}
                  onChange={(value: string) =>
                    updateGlobalSetting("themeColor", value)
                  }
                  description="Global theme accent color"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global Settings */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("global")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚙️</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-blue-800">
                Global Settings
              </h3>
              <p className="text-sm text-blue-600">
                Site-wide preferences and configurations
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.global ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {expandedSections.global && (
          <div className="p-6 space-y-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-blue-800 mb-4 flex items-center gap-2">
                🌐 Global Settings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="showLogo"
                    checked={config.showLogo || false}
                    onChange={(e) =>
                      updateGlobalSetting("showLogo", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor="showLogo"
                    className="text-sm font-medium text-gray-700"
                  >
                    Show Logo Globally
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="showJoinTeamButton"
                    checked={config.showJoinTeamButton || false}
                    onChange={(e) =>
                      updateGlobalSetting(
                        "showJoinTeamButton",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor="showJoinTeamButton"
                    className="text-sm font-medium text-gray-700"
                  >
                    Show Join Team Button
                  </label>
                </div>
                <TextInput
                  label="Scheduling Button Text"
                  value={config.schedulingButtonText || ""}
                  onChange={(value: string) =>
                    updateGlobalSetting("schedulingButtonText", value)
                  }
                  placeholder="Schedule Now"
                  icon="📅"
                />
                <TextInput
                  label="Join Team Text"
                  value={config.joinTeamText || ""}
                  onChange={(value: string) =>
                    updateGlobalSetting("joinTeamText", value)
                  }
                  placeholder="Join the Team"
                  icon="👥"
                />
                <TextInput
                  label="Join Team Link"
                  value={config.joinTeamLink || ""}
                  onChange={(value: string) =>
                    updateGlobalSetting("joinTeamLink", value)
                  }
                  placeholder="/careers"
                  icon="🔗"
                />
                <TextInput
                  label="Theme Link"
                  value={config.themeLink || ""}
                  onChange={(value: string) =>
                    updateGlobalSetting("themeLink", value)
                  }
                  placeholder="https://example.com"
                  icon="🔗"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Company Information */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("company")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏢</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-amber-800">
                Company Information
              </h3>
              <p className="text-sm text-amber-600">
                Global company details and contact information
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.company ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-5 h-5 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {expandedSections.company && (
          <div className="p-6 space-y-6">
            <div className="bg-amber-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-amber-800 mb-4 flex items-center gap-2">
                🏢 Company Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Company Name"
                  value={config.companyName || ""}
                  onChange={(value: string) =>
                    updateGlobalSetting("companyName", value)
                  }
                  placeholder="Davis Tree Service"
                  icon="🏢"
                />
                <TextInput
                  label="Site Description"
                  value={config.description || ""}
                  onChange={(value: string) =>
                    updateGlobalSetting("description", value)
                  }
                  placeholder="Professional tree removal services in Athens, GA"
                  icon="📝"
                />
                <TextInput
                  label="Copyright Text"
                  value={config.copyright || ""}
                  onChange={(value: string) =>
                    updateGlobalSetting("copyright", value)
                  }
                  placeholder="© 2025 Davis Tree Service. All rights reserved."
                  icon="©"
                />
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-orange-800 mb-4 flex items-center gap-2">
                📞 Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Address"
                  value={config.contactInfo?.address || ""}
                  onChange={(value: string) =>
                    updateGlobalSetting("contactInfo", {
                      ...config.contactInfo,
                      address: value,
                    })
                  }
                  placeholder="Athens, GA"
                  icon="📍"
                />
                <TextInput
                  label="Phone"
                  value={config.contactInfo?.phone || ""}
                  onChange={(value: string) =>
                    updateGlobalSetting("contactInfo", {
                      ...config.contactInfo,
                      phone: value,
                    })
                  }
                  placeholder="(706)-296-3318"
                  icon="📞"
                />
                <TextInput
                  label="Email"
                  value={config.contactInfo?.email || ""}
                  onChange={(value: string) =>
                    updateGlobalSetting("contactInfo", {
                      ...config.contactInfo,
                      email: value,
                    })
                  }
                  placeholder="jimmy@davistree.com"
                  icon="📧"
                />
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                ⏰ Business Hours
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Weekday Hours"
                  value={config.hours?.weekday || ""}
                  onChange={(value: string) =>
                    updateGlobalSetting("hours", {
                      ...config.hours,
                      weekday: value,
                    })
                  }
                  placeholder="Monday - Friday: 9AM - 5PM"
                  icon="📅"
                />
                <TextInput
                  label="Weekend Hours"
                  value={config.hours?.weekend || ""}
                  onChange={(value: string) =>
                    updateGlobalSetting("hours", {
                      ...config.hours,
                      weekend: value,
                    })
                  }
                  placeholder="Closed"
                  icon="📅"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pro Tip */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">💡</span>
          </div>
          <div>
            <h4 className="font-semibold text-purple-800 mb-2">Pro Tip</h4>
            <p className="text-purple-700 text-sm">
              Theme colors affect the overall appearance of your website.
              Changes here will be reflected across all pages. Keep your brand
              colors consistent for a professional look.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
