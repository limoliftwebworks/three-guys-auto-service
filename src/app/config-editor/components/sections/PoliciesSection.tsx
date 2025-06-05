"use client";

import React, { useState } from "react";
import { ColorPicker, TextInput } from "../ui";

interface PoliciesSectionProps {
  config: any;
  updateConfig: (config: any) => void;
}

export function PoliciesSection({
  config,
  updateConfig,
}: PoliciesSectionProps) {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    policies: true,
    navigation: false,
    social: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updatePolicies = (field: string, value: any) => {
    const newConfig = {
      ...config,
      policies: {
        ...config.policies,
        [field]: value,
      },
    };
    updateConfig(newConfig);
  };

  const updateSocialLinks = (field: string, value: any) => {
    const newConfig = {
      ...config,
      socialLinks: {
        ...config.socialLinks,
        [field]: value,
      },
    };
    updateConfig(newConfig);
  };

  const updateNavLinks = (newNavLinks: any[]) => {
    const newConfig = {
      ...config,
      navLinks: newNavLinks,
    };
    updateConfig(newConfig);
  };

  const updateFooterLinks = (newFooterLinks: any[]) => {
    const newConfig = {
      ...config,
      footerLinks: newFooterLinks,
    };
    updateConfig(newConfig);
  };

  const addNavLink = () => {
    const currentLinks = config.navLinks || [];
    updateNavLinks([...currentLinks, { path: "", label: "" }]);
  };

  const removeNavLink = (index: number) => {
    const currentLinks = config.navLinks || [];
    updateNavLinks(currentLinks.filter((_: any, i: number) => i !== index));
  };

  const updateNavLink = (index: number, field: string, value: string) => {
    const currentLinks = [...(config.navLinks || [])];
    currentLinks[index] = { ...currentLinks[index], [field]: value };
    updateNavLinks(currentLinks);
  };

  const addFooterLink = () => {
    const currentLinks = config.footerLinks || [];
    updateFooterLinks([...currentLinks, { path: "", label: "" }]);
  };

  const removeFooterLink = (index: number) => {
    const currentLinks = config.footerLinks || [];
    updateFooterLinks(currentLinks.filter((_: any, i: number) => i !== index));
  };

  const updateFooterLink = (index: number, field: string, value: string) => {
    const currentLinks = [...(config.footerLinks || [])];
    currentLinks[index] = { ...currentLinks[index], [field]: value };
    updateFooterLinks(currentLinks);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-green-200 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">📋</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Policies & Navigation
            </h2>
            <p className="text-gray-600">
              Configure legal policies, navigation links, and social media links
            </p>
          </div>
        </div>
      </div>

      {/* Legal Policies */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("policies")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚖️</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-green-800">
                Legal Policies
              </h3>
              <p className="text-sm text-green-600">
                Terms of service and privacy policy content
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.policies ? "rotate-180" : ""
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

        {expandedSections.policies && (
          <div className="p-6 space-y-6">
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-green-800 mb-4 flex items-center gap-2">
                📄 Policy Content
              </h4>
              <div className="space-y-4">
                <TextInput
                  label="Terms of Service"
                  value={config.policies?.terms || ""}
                  onChange={(value: string) => updatePolicies("terms", value)}
                  placeholder="Our terms of service text here."
                  icon="📋"
                  multiline={true}
                />
                <TextInput
                  label="Privacy Policy"
                  value={config.policies?.privacy || ""}
                  onChange={(value: string) => updatePolicies("privacy", value)}
                  placeholder="Our privacy policy text here."
                  icon="🔒"
                  multiline={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("navigation")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧭</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-blue-800">
                Navigation Links
              </h3>
              <p className="text-sm text-blue-600">
                Configure main navigation and footer links
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.navigation ? "rotate-180" : ""
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

        {expandedSections.navigation && (
          <div className="p-6 space-y-6">
            {/* Navigation Links */}
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-semibold text-blue-800 flex items-center gap-2">
                  🧭 Main Navigation Links
                </h4>
                <button
                  onClick={addNavLink}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                >
                  + Add Link
                </button>
              </div>
              <div className="space-y-3">
                {(config.navLinks || []).map((link: any, index: number) => (
                  <div
                    key={index}
                    className="flex gap-3 items-end bg-white p-3 rounded-lg"
                  >
                    <div className="flex-1">
                      <TextInput
                        label="Label"
                        value={link.label || ""}
                        onChange={(value: string) =>
                          updateNavLink(index, "label", value)
                        }
                        placeholder="Home"
                        icon="🏷️"
                      />
                    </div>
                    <div className="flex-1">
                      <TextInput
                        label="Path"
                        value={link.path || ""}
                        onChange={(value: string) =>
                          updateNavLink(index, "path", value)
                        }
                        placeholder="/"
                        icon="🔗"
                      />
                    </div>
                    <button
                      onClick={() => removeNavLink(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            <div className="bg-indigo-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-semibold text-indigo-800 flex items-center gap-2">
                  👣 Footer Links
                </h4>
                <button
                  onClick={addFooterLink}
                  className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
                >
                  + Add Link
                </button>
              </div>
              <div className="space-y-3">
                {(config.footerLinks || []).map((link: any, index: number) => (
                  <div
                    key={index}
                    className="flex gap-3 items-end bg-white p-3 rounded-lg"
                  >
                    <div className="flex-1">
                      <TextInput
                        label="Label"
                        value={link.label || ""}
                        onChange={(value: string) =>
                          updateFooterLink(index, "label", value)
                        }
                        placeholder="Home"
                        icon="🏷️"
                      />
                    </div>
                    <div className="flex-1">
                      <TextInput
                        label="Path"
                        value={link.path || ""}
                        onChange={(value: string) =>
                          updateFooterLink(index, "path", value)
                        }
                        placeholder="/"
                        icon="🔗"
                      />
                    </div>
                    <button
                      onClick={() => removeFooterLink(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("social")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📱</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-purple-800">
                Social Media Links
              </h3>
              <p className="text-sm text-purple-600">
                Configure social media platform links
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.social ? "rotate-180" : ""
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

        {expandedSections.social && (
          <div className="p-6 space-y-6">
            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-purple-800 mb-4 flex items-center gap-2">
                📱 Social Platform Links
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Twitter URL"
                  value={config.socialLinks?.twitter || ""}
                  onChange={(value: string) =>
                    updateSocialLinks("twitter", value)
                  }
                  placeholder="https://twitter.com/company"
                  icon="🐦"
                />
                <TextInput
                  label="Facebook URL"
                  value={config.socialLinks?.facebook || ""}
                  onChange={(value: string) =>
                    updateSocialLinks("facebook", value)
                  }
                  placeholder="https://facebook.com/company"
                  icon="📘"
                />
                <TextInput
                  label="LinkedIn URL"
                  value={config.socialLinks?.linkedin || ""}
                  onChange={(value: string) =>
                    updateSocialLinks("linkedin", value)
                  }
                  placeholder="https://linkedin.com/company/company"
                  icon="💼"
                />
                <TextInput
                  label="Instagram URL"
                  value={config.socialLinks?.instagram || ""}
                  onChange={(value: string) =>
                    updateSocialLinks("instagram", value)
                  }
                  placeholder="https://instagram.com/company"
                  icon="📷"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pro Tip */}
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">💡</span>
          </div>
          <div>
            <h4 className="font-semibold text-green-800 mb-2">Pro Tip</h4>
            <p className="text-green-700 text-sm">
              Keep your policies up to date with current laws and regulations.
              Navigation links should be consistent across your header, footer,
              and any other navigation areas. Active social media links help
              build credibility and engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
