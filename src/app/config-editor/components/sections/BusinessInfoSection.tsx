"use client";

import React, { useState } from "react";
import { ColorPicker, TextInput } from "../ui";

interface BusinessInfoSectionProps {
  config: any;
  updateConfig: (config: any) => void;
}

export function BusinessInfoSection({
  config,
  updateConfig,
}: BusinessInfoSectionProps) {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    company: true,
    legal: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateBusinessInfo = (field: string, value: any) => {
    const newConfig = {
      ...config,
      businessInfo: {
        ...config.businessInfo,
        [field]: value,
      },
    };
    updateConfig(newConfig);
  };

  const updateLegalPage = (page: string, field: string, value: any) => {
    const newConfig = {
      ...config,
      businessInfo: {
        ...config.businessInfo,
        legalPages: {
          ...config.businessInfo?.legalPages,
          [page]: {
            ...config.businessInfo?.legalPages?.[page],
            [field]: value,
          },
        },
      },
    };
    updateConfig(newConfig);
  };

  const businessInfo = config.businessInfo || {};

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-amber-200 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🏢</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Business Information
            </h2>
            <p className="text-gray-600">
              Configure your company details, contact information, and legal
              page styling
            </p>
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("company")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏢</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-amber-800">
                Company Details
              </h3>
              <p className="text-sm text-amber-600">
                Business name, contact information, and company details
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
            {/* Basic Company Information */}
            <div className="bg-amber-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-amber-800 mb-4 flex items-center gap-2">
                🏢 Basic Company Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Company Name"
                  value={businessInfo.name || ""}
                  onChange={(value: string) =>
                    updateBusinessInfo("name", value)
                  }
                  placeholder="Taylor's Collision"
                  icon="🏢"
                  description="Full legal business name"
                />
                <TextInput
                  label="Business Type"
                  value={businessInfo.llcType || ""}
                  onChange={(value: string) =>
                    updateBusinessInfo("llcType", value)
                  }
                  placeholder="LLC, Inc, Corp, etc."
                  icon="📋"
                  description="Legal business structure"
                />
                <TextInput
                  label="Contact Email"
                  value={businessInfo.contactEmail || ""}
                  onChange={(value: string) =>
                    updateBusinessInfo("contactEmail", value)
                  }
                  placeholder="support@taylorscollision.com"
                  icon="📧"
                  description="Primary business email address"
                />
                <TextInput
                  label="Contact Phone"
                  value={businessInfo.contactPhone || ""}
                  onChange={(value: string) =>
                    updateBusinessInfo("contactPhone", value)
                  }
                  placeholder="(770) 495-0050"
                  icon="📞"
                  description="Main business phone number"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legal Pages Styling */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("legal")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚖️</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-blue-800">
                Legal Pages Styling
              </h3>
              <p className="text-sm text-blue-600">
                Customize privacy policy and terms of service page appearance
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.legal ? "rotate-180" : ""
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

        {expandedSections.legal && (
          <div className="p-6 space-y-6">
            {/* Privacy Policy Styling */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-blue-800 mb-4 flex items-center gap-2">
                🔒 Privacy Policy Styling
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Header Color"
                  value={
                    businessInfo.legalPages?.privacyPolicy?.headerColor ||
                    "#1e40af"
                  }
                  onChange={(value: string) =>
                    updateLegalPage("privacyPolicy", "headerColor", value)
                  }
                  description="Color for page headers and titles"
                />
                <ColorPicker
                  label="Link Color"
                  value={
                    businessInfo.legalPages?.privacyPolicy?.linkColor ||
                    "#3b82f6"
                  }
                  onChange={(value: string) =>
                    updateLegalPage("privacyPolicy", "linkColor", value)
                  }
                  description="Color for clickable links"
                />
                <ColorPicker
                  label="Background Color"
                  value={
                    businessInfo.legalPages?.privacyPolicy?.backgroundColor ||
                    "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateLegalPage("privacyPolicy", "backgroundColor", value)
                  }
                  description="Page background color"
                />
                <ColorPicker
                  label="Text Color"
                  value={
                    businessInfo.legalPages?.privacyPolicy?.textColor ||
                    "#1f1f1f"
                  }
                  onChange={(value: string) =>
                    updateLegalPage("privacyPolicy", "textColor", value)
                  }
                  description="Main body text color"
                />
                <ColorPicker
                  label="Border Color"
                  value={
                    businessInfo.legalPages?.privacyPolicy?.borderColor ||
                    "#e5e7eb"
                  }
                  onChange={(value: string) =>
                    updateLegalPage("privacyPolicy", "borderColor", value)
                  }
                  description="Border and divider color"
                />
                <ColorPicker
                  label="Icon Color"
                  value={
                    businessInfo.legalPages?.privacyPolicy?.iconColor ||
                    "#1e40af"
                  }
                  onChange={(value: string) =>
                    updateLegalPage("privacyPolicy", "iconColor", value)
                  }
                  description="Icon and accent color"
                />
              </div>
            </div>

            {/* Terms of Service Styling */}
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-green-800 mb-4 flex items-center gap-2">
                📜 Terms of Service Styling
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Header Color"
                  value={
                    businessInfo.legalPages?.termsOfService?.headerColor ||
                    "#1e40af"
                  }
                  onChange={(value: string) =>
                    updateLegalPage("termsOfService", "headerColor", value)
                  }
                  description="Color for page headers and titles"
                />
                <ColorPicker
                  label="Link Color"
                  value={
                    businessInfo.legalPages?.termsOfService?.linkColor ||
                    "#3b82f6"
                  }
                  onChange={(value: string) =>
                    updateLegalPage("termsOfService", "linkColor", value)
                  }
                  description="Color for clickable links"
                />
                <ColorPicker
                  label="Background Color"
                  value={
                    businessInfo.legalPages?.termsOfService?.backgroundColor ||
                    "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateLegalPage("termsOfService", "backgroundColor", value)
                  }
                  description="Page background color"
                />
                <ColorPicker
                  label="Text Color"
                  value={
                    businessInfo.legalPages?.termsOfService?.textColor ||
                    "#1f1f1f"
                  }
                  onChange={(value: string) =>
                    updateLegalPage("termsOfService", "textColor", value)
                  }
                  description="Main body text color"
                />
                <ColorPicker
                  label="Border Color"
                  value={
                    businessInfo.legalPages?.termsOfService?.borderColor ||
                    "#e5e7eb"
                  }
                  onChange={(value: string) =>
                    updateLegalPage("termsOfService", "borderColor", value)
                  }
                  description="Border and divider color"
                />
                <ColorPicker
                  label="Disclaimer Background Color"
                  value={
                    businessInfo.legalPages?.termsOfService
                      ?.disclaimerBgColor || "#f9fafb"
                  }
                  onChange={(value: string) =>
                    updateLegalPage(
                      "termsOfService",
                      "disclaimerBgColor",
                      value
                    )
                  }
                  description="Background color for disclaimer sections"
                />
                <ColorPicker
                  label="Disclaimer Text Color"
                  value={
                    businessInfo.legalPages?.termsOfService
                      ?.disclaimerTextColor || "#374151"
                  }
                  onChange={(value: string) =>
                    updateLegalPage(
                      "termsOfService",
                      "disclaimerTextColor",
                      value
                    )
                  }
                  description="Text color for disclaimer sections"
                />
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
          <li>• Keep business information accurate and up-to-date</li>
          <li>• Use consistent branding colors across all legal pages</li>
          <li>
            • Ensure contact information matches your actual business details
          </li>
          <li>
            • Consider accessibility when choosing text and background colors
          </li>
          <li>
            • Legal page styling should maintain readability and professionalism
          </li>
        </ul>
      </div>
    </div>
  );
}
