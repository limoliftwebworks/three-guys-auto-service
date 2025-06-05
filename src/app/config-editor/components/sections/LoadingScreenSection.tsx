"use client";

import React from "react";
import { ColorPicker, TextInput } from "../ui";

interface LoadingScreenSectionProps {
  config: any;
  updateConfig: (config: any) => void;
}

export function LoadingScreenSection({
  config,
  updateConfig,
}: LoadingScreenSectionProps) {
  const updateLoadingScreen = (field: string, value: any) => {
    const newConfig = {
      ...config,
      loadingScreen: {
        ...config.loadingScreen,
        [field]: value,
      },
    };
    updateConfig(newConfig);
  };

  const updateSpinner = (field: string, value: any) => {
    const newConfig = {
      ...config,
      loadingScreen: {
        ...config.loadingScreen,
        spinner: {
          ...config.loadingScreen?.spinner,
          [field]: value,
        },
      },
    };
    updateConfig(newConfig);
  };

  const updateTiming = (field: string, value: any) => {
    const newConfig = {
      ...config,
      loadingScreen: {
        ...config.loadingScreen,
        timing: {
          ...config.loadingScreen?.timing,
          [field]: value,
        },
      },
    };
    updateConfig(newConfig);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-orange-200 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
            <span className="text-2xl">⏳</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Loading Screen Settings
            </h2>
            <p className="text-gray-600">
              Configure the loading animation and splash screen
            </p>
          </div>
        </div>
      </div>

      {/* Enable/Disable Toggle */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6">
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.loadingScreen?.enabled !== false}
              onChange={(e) => updateLoadingScreen("enabled", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
          </label>
          <div>
            <p className="font-medium text-gray-800">Enable Loading Screen</p>
            <p className="text-sm text-gray-600">
              Show loading animation while site loads
            </p>
          </div>
        </div>
      </div>

      {config.loadingScreen?.enabled !== false && (
        <>
          {/* Preview */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              👀 Live Preview
            </h3>
            <div
              className="w-full h-32 rounded-lg flex flex-col items-center justify-center relative"
              style={{
                backgroundColor:
                  config.loadingScreen?.backgroundColor || "#FFFFFF",
              }}
            >
              <div className="text-xs text-gray-600 mb-2">
                LOGO: {config.loadingScreen?.logoImage || "logo.png"}
              </div>
              {config.loadingScreen?.spinner?.enabled !== false && (
                <div
                  className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
                  style={{
                    borderColor:
                      config.loadingScreen?.spinner?.color || "#66bf9b",
                    borderTopColor: "transparent",
                  }}
                />
              )}
            </div>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo & Branding */}
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                🖼️ Logo & Branding
              </h3>
              <div className="space-y-4">
                <TextInput
                  label="Logo Image"
                  value={config.loadingScreen?.logoImage || ""}
                  onChange={(value) => updateLoadingScreen("logoImage", value)}
                  placeholder="logo.png"
                  icon="🖼️"
                  description="Logo file in /public/images/ folder"
                />
                <TextInput
                  label="Logo Alt Text"
                  value={config.loadingScreen?.logoAlt || ""}
                  onChange={(value) => updateLoadingScreen("logoAlt", value)}
                  placeholder="Your Business Name"
                  icon="📝"
                />
                <TextInput
                  label="Logo Width (px)"
                  value={config.loadingScreen?.logoWidth?.toString() || ""}
                  onChange={(value) =>
                    updateLoadingScreen("logoWidth", parseInt(value) || 280)
                  }
                  placeholder="280"
                  icon="📏"
                  type="text"
                />
                <ColorPicker
                  label="Background Color"
                  value={config.loadingScreen?.backgroundColor || "#FFFFFF"}
                  onChange={(value) =>
                    updateLoadingScreen("backgroundColor", value)
                  }
                  description="Loading screen background"
                />
              </div>
            </div>

            {/* Spinner Settings */}
            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
                🔄 Spinner Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.loadingScreen?.spinner?.enabled !== false}
                      onChange={(e) =>
                        updateSpinner("enabled", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                  <div>
                    <p className="font-medium text-gray-800">Show Spinner</p>
                    <p className="text-sm text-gray-600">
                      Display loading animation
                    </p>
                  </div>
                </div>

                {config.loadingScreen?.spinner?.enabled !== false && (
                  <>
                    <ColorPicker
                      label="Spinner Color"
                      value={config.loadingScreen?.spinner?.color || "#66bf9b"}
                      onChange={(value) => updateSpinner("color", value)}
                      description="Color of the spinning animation"
                    />
                    <TextInput
                      label="Spinner Size (px)"
                      value={
                        config.loadingScreen?.spinner?.size?.toString() || ""
                      }
                      onChange={(value) =>
                        updateSpinner("size", parseInt(value) || 60)
                      }
                      placeholder="60"
                      icon="📐"
                    />
                    <TextInput
                      label="Border Thickness (px)"
                      value={
                        config.loadingScreen?.spinner?.thickness?.toString() ||
                        ""
                      }
                      onChange={(value) =>
                        updateSpinner("thickness", parseInt(value) || 4)
                      }
                      placeholder="4"
                      icon="🔲"
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Timing Settings */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
              ⏱️ Timing Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Minimum Display Time (ms)"
                value={
                  config.loadingScreen?.timing?.minimumDisplayTime?.toString() ||
                  ""
                }
                onChange={(value) =>
                  updateTiming("minimumDisplayTime", parseInt(value) || 800)
                }
                placeholder="800"
                icon="⏰"
                description="Minimum time to show loading screen"
              />
              <TextInput
                label="Fade Out Duration (ms)"
                value={
                  config.loadingScreen?.timing?.fadeOutDuration?.toString() ||
                  ""
                }
                onChange={(value) =>
                  updateTiming("fadeOutDuration", parseInt(value) || 500)
                }
                placeholder="500"
                icon="🌅"
                description="How long the fade out animation takes"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
