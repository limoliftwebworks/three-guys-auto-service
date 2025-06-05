"use client";

import React, { useState } from "react";
import { ColorPicker, TextInput } from "../ui";

interface NavigationSectionProps {
  config: any;
  updateConfig: (config: any) => void;
}

export function NavigationSection({
  config,
  updateConfig,
}: NavigationSectionProps) {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    branding: true,
    colors: false,
    mobile: false,
    links: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateNavBar = (field: string, value: any) => {
    const newConfig = {
      ...config,
      navBar: {
        ...config.navBar,
        [field]: value,
      },
    };
    updateConfig(newConfig);
  };

  const updateNavLinks = (index: number, field: string, value: any) => {
    const links = [...(config.navBar?.navLinks || [])];
    if (!links[index]) {
      links[index] = {};
    }
    links[index][field] = value;
    updateNavBar("navLinks", links);
  };

  const addNavLink = () => {
    const links = [...(config.navBar?.navLinks || [])];
    links.push({ path: "/", label: "New Link" });
    updateNavBar("navLinks", links);
  };

  const removeNavLink = (index: number) => {
    const links = [...(config.navBar?.navLinks || [])];
    links.splice(index, 1);
    updateNavBar("navLinks", links);
  };

  const navBar = config.navBar || {};

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-purple-200 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🧭</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Navigation Settings
            </h2>
            <p className="text-gray-600">
              Configure your main navigation menu, logo, branding, and mobile
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
          className="w-full p-4 rounded-lg"
          style={{
            backgroundColor: navBar.backgroundColor || "#ffffff",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {navBar.showLogo && (
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs">LOGO</span>
                </div>
              )}
              <span
                className="text-lg font-bold"
                style={{
                  background: `linear-gradient(to right, ${
                    navBar.siteTitleGradientFrom || "#1e40af"
                  }, ${navBar.siteTitleGradientTo || "#3b82f6"})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {navBar.siteTitle || "Auto_Template"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {navBar.navLinks?.slice(0, 4).map((link: any, index: number) => (
                <span
                  key={index}
                  className="text-sm"
                  style={{ color: navBar.textColor || "#1e40af" }}
                >
                  {link.label}
                </span>
              ))}
              <button
                className="px-3 py-1 rounded text-sm text-white"
                style={{
                  backgroundColor: navBar.scheduleButtonColor || "#1e40af",
                }}
              >
                {navBar.scheduleButtonText || "Schedule Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Branding Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("branding")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏷️</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-purple-800">
                Branding & Logo
              </h3>
              <p className="text-sm text-purple-600">
                Site title, logo configuration, and branding settings
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.branding ? "rotate-180" : ""
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

        {expandedSections.branding && (
          <div className="p-6 space-y-6">
            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-purple-800 mb-4 flex items-center gap-2">
                🏢 Site Title & Logo
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Site Title"
                  value={navBar.siteTitle || ""}
                  onChange={(value) => updateNavBar("siteTitle", value)}
                  placeholder="Auto_Template"
                  icon="🏢"
                  description="Main site title shown in navigation"
                />
                <TextInput
                  label="Logo Filename"
                  value={navBar.logo || ""}
                  onChange={(value) => updateNavBar("logo", value)}
                  placeholder="TC-TITLE.png"
                  icon="🖼️"
                  description="Logo file in /public/images/ folder"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={navBar.showLogo !== false}
                    onChange={(e) => updateNavBar("showLogo", e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label className="text-sm font-medium text-purple-800">
                    Show Logo in Navigation
                  </label>
                </div>
                <TextInput
                  label="Schedule Button Text"
                  value={navBar.scheduleButtonText || ""}
                  onChange={(value) =>
                    updateNavBar("scheduleButtonText", value)
                  }
                  placeholder="Schedule Now"
                  icon="📅"
                  description="Text for the schedule/CTA button"
                />
              </div>
            </div>

            {/* Site Title Gradients */}
            <div className="bg-pink-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-pink-800 mb-4 flex items-center gap-2">
                🎨 Site Title Gradients
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Site Title Gradient From"
                  value={navBar.siteTitleGradientFrom || "#1e40af"}
                  onChange={(value) =>
                    updateNavBar("siteTitleGradientFrom", value)
                  }
                  description="Site title gradient start color"
                />
                <ColorPicker
                  label="Site Title Gradient To"
                  value={navBar.siteTitleGradientTo || "#3b82f6"}
                  onChange={(value) =>
                    updateNavBar("siteTitleGradientTo", value)
                  }
                  description="Site title gradient end color"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Colors Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("colors")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎨</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-blue-800">
                Navigation Colors
              </h3>
              <p className="text-sm text-blue-600">
                Background, text, and button colors for navigation
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.colors ? "rotate-180" : ""
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

        {expandedSections.colors && (
          <div className="p-6 space-y-6">
            {/* Basic Colors */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-blue-800 mb-4 flex items-center gap-2">
                🎨 Basic Colors
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Background Color"
                  value={navBar.backgroundColor || "#ffffff"}
                  onChange={(value) => updateNavBar("backgroundColor", value)}
                  description="Main navigation background"
                />
                <ColorPicker
                  label="Text Color"
                  value={navBar.textColor || "#1e40af"}
                  onChange={(value) => updateNavBar("textColor", value)}
                  description="Navigation text and links"
                />
                <ColorPicker
                  label="Active Tab Color"
                  value={navBar.activeTabColor || "#1e40af"}
                  onChange={(value) => updateNavBar("activeTabColor", value)}
                  description="Highlight color for current page"
                />
                <ColorPicker
                  label="Schedule Button Color"
                  value={navBar.scheduleButtonColor || "#1e40af"}
                  onChange={(value) =>
                    updateNavBar("scheduleButtonColor", value)
                  }
                  description="Call-to-action button background"
                />
              </div>
            </div>

            {/* Hamburger Menu Colors */}
            <div className="bg-indigo-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-indigo-800 mb-4 flex items-center gap-2">
                🍔 Hamburger Menu Colors
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Hamburger Icon Color"
                  value={navBar.hamburgerIconColor || "#1e40af"}
                  onChange={(value) =>
                    updateNavBar("hamburgerIconColor", value)
                  }
                  description="Mobile hamburger menu icon color"
                />
                <ColorPicker
                  label="Hamburger Hover Background"
                  value={navBar.hamburgerIconHoverBgColor || "#1e40af20"}
                  onChange={(value) =>
                    updateNavBar("hamburgerIconHoverBgColor", value)
                  }
                  description="Hover background for hamburger icon"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("mobile")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📱</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-orange-800">
                Mobile Navigation
              </h3>
              <p className="text-sm text-orange-600">
                Mobile menu styling and responsive navigation settings
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.mobile ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-5 h-5 text-orange-600"
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

        {expandedSections.mobile && (
          <div className="p-6 space-y-6">
            <div className="bg-orange-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-orange-800 mb-4 flex items-center gap-2">
                📱 Mobile Menu Styling
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Mobile Menu Background"
                  value={navBar.mobileMenuBgColor || "#ffffff"}
                  onChange={(value) => updateNavBar("mobileMenuBgColor", value)}
                  description="Background color for mobile menu"
                />
                <ColorPicker
                  label="Mobile Nav Text Color"
                  value={navBar.mobileNavTextColor || "#111827"}
                  onChange={(value) =>
                    updateNavBar("mobileNavTextColor", value)
                  }
                  description="Text color for mobile navigation items"
                />
                <ColorPicker
                  label="Mobile Active Tab Background"
                  value={navBar.mobileActiveTabBgColor || "#1e40af20"}
                  onChange={(value) =>
                    updateNavBar("mobileActiveTabBgColor", value)
                  }
                  description="Background for active tab in mobile menu"
                />
                <ColorPicker
                  label="Mobile Active Tab Text"
                  value={navBar.mobileActiveTabTextColor || "#1e40af"}
                  onChange={(value) =>
                    updateNavBar("mobileActiveTabTextColor", value)
                  }
                  description="Text color for active tab in mobile menu"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("links")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔗</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-green-800">
                Navigation Links
              </h3>
              <p className="text-sm text-green-600">
                Configure menu items and navigation structure
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.links ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-5 h-5 text-green-600"
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

        {expandedSections.links && (
          <div className="p-6 space-y-6">
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-green-800 mb-4 flex items-center gap-2">
                🔗 Menu Items
              </h4>
              <div className="space-y-4">
                {(navBar.navLinks || []).map((link: any, index: number) => (
                  <div key={index} className="grid grid-cols-3 gap-3 items-end">
                    <TextInput
                      label={`Link ${index + 1} Label`}
                      value={link.label || ""}
                      onChange={(value: string) =>
                        updateNavLinks(index, "label", value)
                      }
                      placeholder="Home"
                      icon="📝"
                    />
                    <TextInput
                      label={`Link ${index + 1} Path`}
                      value={link.path || ""}
                      onChange={(value: string) =>
                        updateNavLinks(index, "path", value)
                      }
                      placeholder="/"
                      icon="🔗"
                    />
                    <button
                      onClick={() => removeNavLink(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={addNavLink}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Add Navigation Link
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
          💡 Pro Tips
        </h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>
            • Use high contrast between background and text colors for
            accessibility
          </li>
          <li>• Keep navigation links concise and descriptive</li>
          <li>• Test mobile navigation on different screen sizes</li>
          <li>
            • Ensure the schedule button stands out with a contrasting color
          </li>
          <li>• Consider using your brand colors for consistency</li>
          <li>• Navigation links automatically sync with footer links</li>
        </ul>
      </div>
    </div>
  );
}
