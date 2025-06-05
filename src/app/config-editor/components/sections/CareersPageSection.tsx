"use client";

import React, { useState } from "react";
import { ColorPicker, TextInput } from "../ui";

interface CareersPageSectionProps {
  config: any;
  updateConfig: (config: any) => void;
}

export function CareersPageSection({
  config,
  updateConfig,
}: CareersPageSectionProps) {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    hero: true,
    form: false,
    mobile: false,
    positions: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateCareersPage = (field: string, value: any) => {
    const newConfig = {
      ...config,
      pages: {
        ...config.pages,
        Careers: {
          ...config.pages?.Careers,
          [field]: value,
        },
      },
    };
    updateConfig(newConfig);
  };

  const updateMobileOverlay = (field: string, value: any) => {
    const newConfig = {
      ...config,
      pages: {
        ...config.pages,
        Careers: {
          ...config.pages?.Careers,
          mobileOverlay: {
            ...config.pages?.Careers?.mobileOverlay,
            [field]: value,
          },
        },
      },
    };
    updateConfig(newConfig);
  };

  const updatePositionOptions = (options: string[]) => {
    updateCareersPage("positionOptions", options);
  };

  const addPositionOption = () => {
    const current = careersPage.positionOptions || [];
    updatePositionOptions([...current, "New Position"]);
  };

  const removePositionOption = (index: number) => {
    const current = careersPage.positionOptions || [];
    updatePositionOptions(
      current.filter((_: string, i: number) => i !== index)
    );
  };

  const updatePositionOption = (index: number, value: string) => {
    const current = careersPage.positionOptions || [];
    const updated = [...current];
    updated[index] = value;
    updatePositionOptions(updated);
  };

  const careersPage = config.pages?.Careers || {};

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-violet-200 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-violet-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">💼</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Careers Page Settings
            </h2>
            <p className="text-gray-600">
              Configure your careers page hero, application form, and mobile
              settings
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("hero")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🦸</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-violet-800">
                Hero Section
              </h3>
              <p className="text-sm text-violet-600">
                Hero banner, badges, and background
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.hero ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-5 h-5 text-violet-600"
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

        {expandedSections.hero && (
          <div className="p-6 space-y-6">
            {/* Hero Content */}
            <div className="bg-violet-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-violet-800 mb-4 flex items-center gap-2">
                📝 Hero Content
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Hire Badge Text"
                  value={careersPage.hireBadgeText || ""}
                  onChange={(value: string) =>
                    updateCareersPage("hireBadgeText", value)
                  }
                  placeholder="We're hiring passionate professionals"
                  icon="🏷️"
                />
                <ColorPicker
                  label="Badge Background"
                  value={careersPage.hireBadgeBgColor || "#ffffff10"}
                  onChange={(value: string) =>
                    updateCareersPage("hireBadgeBgColor", value)
                  }
                  description="Hero badge background"
                />
                <TextInput
                  label="Hero Title"
                  value={careersPage.hireTitle || ""}
                  onChange={(value: string) =>
                    updateCareersPage("hireTitle", value)
                  }
                  placeholder="Join Our Team"
                  icon="📋"
                />
                <ColorPicker
                  label="Title Color"
                  value={careersPage.hireTitleColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateCareersPage("hireTitleColor", value)
                  }
                  description="Hero title color"
                />
                <div className="md:col-span-2">
                  <TextInput
                    label="Hero Subtitle"
                    value={careersPage.hireSubtitle || ""}
                    onChange={(value: string) =>
                      updateCareersPage("hireSubtitle", value)
                    }
                    placeholder="Build your career with Davis Tree Service. We're looking for talented individuals who are passionate about tree care and customer service."
                    icon="💬"
                  />
                </div>
                <ColorPicker
                  label="Subtitle Color"
                  value={careersPage.hireSubtitleColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateCareersPage("hireSubtitleColor", value)
                  }
                  description="Hero subtitle color"
                />
              </div>
            </div>

            {/* Hero Background */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-purple-800 mb-4 flex items-center gap-2">
                🎨 Hero Background
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Hero Padding Top"
                  value={careersPage.heroPaddingTop || ""}
                  onChange={(value: string) =>
                    updateCareersPage("heroPaddingTop", value)
                  }
                  placeholder="150px"
                  icon="📏"
                />
                <ColorPicker
                  label="Background Gradient From"
                  value={careersPage.heroBgGradientFrom || "#387e62"}
                  onChange={(value: string) =>
                    updateCareersPage("heroBgGradientFrom", value)
                  }
                  description="Background gradient start"
                />
                <ColorPicker
                  label="Background Gradient Via"
                  value={careersPage.heroBgGradientVia || "#0c2217"}
                  onChange={(value: string) =>
                    updateCareersPage("heroBgGradientVia", value)
                  }
                  description="Background gradient middle"
                />
                <ColorPicker
                  label="Background Gradient To"
                  value={careersPage.heroBgGradientTo || "#246043"}
                  onChange={(value: string) =>
                    updateCareersPage("heroBgGradientTo", value)
                  }
                  description="Background gradient end"
                />
                <ColorPicker
                  label="Blurred Circle 1"
                  value={careersPage.heroBlurredCircle1Color || "#098633"}
                  onChange={(value: string) =>
                    updateCareersPage("heroBlurredCircle1Color", value)
                  }
                  description="First decorative circle color"
                />
                <ColorPicker
                  label="Blurred Circle 2"
                  value={careersPage.heroBlurredCircle2Color || "#1caa3a"}
                  onChange={(value: string) =>
                    updateCareersPage("heroBlurredCircle2Color", value)
                  }
                  description="Second decorative circle color"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Application Form */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("form")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📝</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-green-800">
                Application Form
              </h3>
              <p className="text-sm text-green-600">
                Form styling, headers, and sections
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.form ? "rotate-180" : ""
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

        {expandedSections.form && (
          <div className="p-6 space-y-6">
            {/* Form Header */}
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-green-800 mb-4 flex items-center gap-2">
                📋 Form Header
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Form Header Title"
                  value={careersPage.formHeaderTitleText || ""}
                  onChange={(value: string) =>
                    updateCareersPage("formHeaderTitleText", value)
                  }
                  placeholder="Application Form"
                  icon="📋"
                />
                <ColorPicker
                  label="Header Title Color"
                  value={careersPage.formHeaderTitleColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateCareersPage("formHeaderTitleColor", value)
                  }
                  description="Form header title color"
                />
                <div className="md:col-span-2">
                  <TextInput
                    label="Form Header Subtitle"
                    value={careersPage.formHeaderSubtitleText || ""}
                    onChange={(value: string) =>
                      updateCareersPage("formHeaderSubtitleText", value)
                    }
                    placeholder="Fill out the form below to apply for a position with our team"
                    icon="💬"
                  />
                </div>
                <ColorPicker
                  label="Header Subtitle Color"
                  value={careersPage.formHeaderSubtitleColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateCareersPage("formHeaderSubtitleColor", value)
                  }
                  description="Form header subtitle color"
                />
                <ColorPicker
                  label="Header Background From"
                  value={careersPage.formHeaderBgFrom || "#66bf9b"}
                  onChange={(value: string) =>
                    updateCareersPage("formHeaderBgFrom", value)
                  }
                  description="Header background gradient start"
                />
                <ColorPicker
                  label="Header Background To"
                  value={careersPage.formHeaderBgTo || "#387e62"}
                  onChange={(value: string) =>
                    updateCareersPage("formHeaderBgTo", value)
                  }
                  description="Header background gradient end"
                />
              </div>
            </div>

            {/* Form Styling */}
            <div className="bg-emerald-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                🎨 Form Styling
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Section Background"
                  value={careersPage.formSectionBgColor || "#f9fafb"}
                  onChange={(value: string) =>
                    updateCareersPage("formSectionBgColor", value)
                  }
                  description="Form section background"
                />
                <ColorPicker
                  label="Section Border"
                  value={careersPage.formSectionBorderColor || "#e5e7eb"}
                  onChange={(value: string) =>
                    updateCareersPage("formSectionBorderColor", value)
                  }
                  description="Form section border color"
                />
                <ColorPicker
                  label="Section Title Color"
                  value={careersPage.formSectionTitleColor || "#126e40"}
                  onChange={(value: string) =>
                    updateCareersPage("formSectionTitleColor", value)
                  }
                  description="Form section title color"
                />
                <ColorPicker
                  label="Input Background"
                  value={careersPage.formInputBgColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateCareersPage("formInputBgColor", value)
                  }
                  description="Input background color"
                />
                <ColorPicker
                  label="Input Border"
                  value={careersPage.formInputBorderColor || "#d1d5db"}
                  onChange={(value: string) =>
                    updateCareersPage("formInputBorderColor", value)
                  }
                  description="Input border color"
                />
                <ColorPicker
                  label="Input Text"
                  value={careersPage.formInputTextColor || "#111827"}
                  onChange={(value: string) =>
                    updateCareersPage("formInputTextColor", value)
                  }
                  description="Input text color"
                />
                <ColorPicker
                  label="Focus Ring"
                  value={careersPage.formInputFocusRingColor || "#4bf63b"}
                  onChange={(value: string) =>
                    updateCareersPage("formInputFocusRingColor", value)
                  }
                  description="Input focus ring color"
                />
                <ColorPicker
                  label="Label Color"
                  value={careersPage.formLabelColor || "#374151"}
                  onChange={(value: string) =>
                    updateCareersPage("formLabelColor", value)
                  }
                  description="Form label color"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-teal-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-teal-800 mb-4 flex items-center gap-2">
                🔘 Submit Button
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Button Background From"
                  value={careersPage.submitButtonBgFrom || "#126e40"}
                  onChange={(value: string) =>
                    updateCareersPage("submitButtonBgFrom", value)
                  }
                  description="Submit button gradient start"
                />
                <ColorPicker
                  label="Button Background To"
                  value={careersPage.submitButtonBgTo || "#0c2217"}
                  onChange={(value: string) =>
                    updateCareersPage("submitButtonBgTo", value)
                  }
                  description="Submit button gradient end"
                />
                <ColorPicker
                  label="Button Text Color"
                  value={careersPage.submitButtonTextColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateCareersPage("submitButtonTextColor", value)
                  }
                  description="Submit button text color"
                />
                <ColorPicker
                  label="Add Reference Button"
                  value={careersPage.addReferenceBtnBgColor || "#126e40"}
                  onChange={(value: string) =>
                    updateCareersPage("addReferenceBtnBgColor", value)
                  }
                  description="Add reference button color"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Position Options */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("positions")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">👔</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-blue-800">
                Position Options
              </h3>
              <p className="text-sm text-blue-600">Available job positions</p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.positions ? "rotate-180" : ""
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

        {expandedSections.positions && (
          <div className="p-6 space-y-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-blue-800 mb-4 flex items-center gap-2">
                👔 Job Positions
              </h4>
              <div className="space-y-3">
                {(careersPage.positionOptions || []).map(
                  (position: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <TextInput
                        label={`Position ${index + 1}`}
                        value={position}
                        onChange={(value: string) =>
                          updatePositionOption(index, value)
                        }
                        placeholder="Job position"
                        icon="👔"
                      />
                      <button
                        onClick={() => removePositionOption(index)}
                        className="mt-6 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  )
                )}
                <button
                  onClick={addPositionOption}
                  className="w-full mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  + Add Position Option
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("mobile")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📱</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-orange-800">
                Mobile Overlay
              </h3>
              <p className="text-sm text-orange-600">
                Mobile device restrictions and styling
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
            {/* Mobile Overlay Settings */}
            <div className="bg-orange-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-orange-800 mb-4 flex items-center gap-2">
                📱 Mobile Overlay Settings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={careersPage.mobileOverlay?.enabled || false}
                    onChange={(e) =>
                      updateMobileOverlay("enabled", e.target.checked)
                    }
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label className="text-sm font-medium text-orange-800">
                    Enable Mobile Overlay
                  </label>
                </div>
                <TextInput
                  label="Mobile Breakpoint"
                  value={
                    careersPage.mobileOverlay?.mobileBreakpoint?.toString() ||
                    ""
                  }
                  onChange={(value: string) =>
                    updateMobileOverlay(
                      "mobileBreakpoint",
                      parseInt(value) || 663
                    )
                  }
                  placeholder="663"
                  icon="📏"
                />
                <TextInput
                  label="Overlay Title"
                  value={careersPage.mobileOverlay?.title || ""}
                  onChange={(value: string) =>
                    updateMobileOverlay("title", value)
                  }
                  placeholder="Desktop View Required"
                  icon="📋"
                />
                <div className="md:col-span-2">
                  <TextInput
                    label="Overlay Message"
                    value={careersPage.mobileOverlay?.message || ""}
                    onChange={(value: string) =>
                      updateMobileOverlay("message", value)
                    }
                    placeholder="Our job application form requires a larger screen. Please visit this page on a desktop or laptop computer for the best experience."
                    icon="💬"
                  />
                </div>
                <TextInput
                  label="Button Text"
                  value={careersPage.mobileOverlay?.buttonText || ""}
                  onChange={(value: string) =>
                    updateMobileOverlay("buttonText", value)
                  }
                  placeholder="Back to Home Page"
                  icon="🔘"
                />
                <TextInput
                  label="Button Link"
                  value={careersPage.mobileOverlay?.buttonLink || ""}
                  onChange={(value: string) =>
                    updateMobileOverlay("buttonLink", value)
                  }
                  placeholder="/"
                  icon="🔗"
                />
              </div>
            </div>

            {/* Mobile Overlay Styling */}
            <div className="bg-yellow-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                🎨 Mobile Overlay Styling
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Card Background"
                  value={
                    careersPage.mobileOverlay?.cardBackgroundColor || "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateMobileOverlay("cardBackgroundColor", value)
                  }
                  description="Overlay card background"
                />
                <ColorPicker
                  label="Button Text Color"
                  value={
                    careersPage.mobileOverlay?.buttonTextColor || "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateMobileOverlay("buttonTextColor", value)
                  }
                  description="Button text color"
                />
                <ColorPicker
                  label="Message Color"
                  value={careersPage.mobileOverlay?.messageColor || "#4b5563"}
                  onChange={(value: string) =>
                    updateMobileOverlay("messageColor", value)
                  }
                  description="Message text color"
                />
                <ColorPicker
                  label="Footer Text Color"
                  value={
                    careersPage.mobileOverlay?.footerTextColor || "#6b7280"
                  }
                  onChange={(value: string) =>
                    updateMobileOverlay("footerTextColor", value)
                  }
                  description="Footer text color"
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
          <li>• Use professional colors that reflect your company brand</li>
          <li>• Keep position options current and relevant to open roles</li>
          <li>• Test the mobile overlay breakpoint on different devices</li>
          <li>• Ensure form styling is accessible with good contrast</li>
          <li>• Consider using gradient backgrounds for visual appeal</li>
        </ul>
      </div>
    </div>
  );
}
