"use client";

import React, { useState } from "react";
import { ColorPicker, TextInput } from "../ui";

interface ContactPageSectionProps {
  config: any;
  updateConfig: (config: any) => void;
}

export function ContactPageSection({
  config,
  updateConfig,
}: ContactPageSectionProps) {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    hero: true,
    contact: false,
    form: false,
    map: false,
    cta: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateContactPage = (field: string, value: any) => {
    const newConfig = {
      ...config,
      pages: {
        ...config.pages,
        Contact: {
          ...config.pages?.Contact,
          [field]: value,
        },
      },
    };
    updateConfig(newConfig);
  };

  const updateServiceOptions = (options: string[]) => {
    updateContactPage("serviceOptions", options);
  };

  const addServiceOption = () => {
    const current = contactPage.serviceOptions || [];
    updateServiceOptions([...current, "New Service"]);
  };

  const removeServiceOption = (index: number) => {
    const current = contactPage.serviceOptions || [];
    updateServiceOptions(current.filter((_: string, i: number) => i !== index));
  };

  const updateServiceOption = (index: number, value: string) => {
    const current = contactPage.serviceOptions || [];
    const updated = [...current];
    updated[index] = value;
    updateServiceOptions(updated);
  };

  const contactPage = config.pages?.Contact || {};

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-emerald-200 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">📞</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Contact Page Settings
            </h2>
            <p className="text-gray-600">
              Configure your contact page hero, contact info, form, and map
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("hero")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🦸</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-emerald-800">
                Hero Section
              </h3>
              <p className="text-sm text-emerald-600">
                Hero banner, title, and badges
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.hero ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-5 h-5 text-emerald-600"
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
            <div className="bg-emerald-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                📝 Hero Content
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Page Title"
                  value={contactPage.title || ""}
                  onChange={(value: string) =>
                    updateContactPage("title", value)
                  }
                  placeholder="Get in Touch"
                  icon="📋"
                />
                <ColorPicker
                  label="Title Color"
                  value={contactPage.heroTitleColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateContactPage("heroTitleColor", value)
                  }
                  description="Hero title color"
                />
                <div className="md:col-span-2">
                  <TextInput
                    label="Subtitle"
                    value={contactPage.subtitle || ""}
                    onChange={(value: string) =>
                      updateContactPage("subtitle", value)
                    }
                    placeholder="Have questions about our services? Need an estimate? We're here to help."
                    icon="💬"
                  />
                </div>
                <ColorPicker
                  label="Subtitle Color"
                  value={contactPage.heroSubtitleColor || "#ffffffff"}
                  onChange={(value: string) =>
                    updateContactPage("heroSubtitleColor", value)
                  }
                  description="Hero subtitle color"
                />
              </div>
            </div>

            {/* Hero Badges */}
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-green-800 mb-4 flex items-center gap-2">
                🏷️ Hero Badges
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Main Badge Text"
                  value={contactPage.badge || ""}
                  onChange={(value: string) =>
                    updateContactPage("badge", value)
                  }
                  placeholder="24/7 Customer Support"
                  icon="🏷️"
                />
                <ColorPicker
                  label="Badge Background"
                  value={contactPage.heroBadgeBgColor || "#ffffff1a"}
                  onChange={(value: string) =>
                    updateContactPage("heroBadgeBgColor", value)
                  }
                  description="Main badge background"
                />
                <TextInput
                  label="Feature Badge 1"
                  value={contactPage.featureBadge1Text || ""}
                  onChange={(value: string) =>
                    updateContactPage("featureBadge1Text", value)
                  }
                  placeholder="24/7 AI Assistant"
                  icon="1️⃣"
                />
                <TextInput
                  label="Feature Badge 2"
                  value={contactPage.featureBadge2Text || ""}
                  onChange={(value: string) =>
                    updateContactPage("featureBadge2Text", value)
                  }
                  placeholder="Expert Consultation"
                  icon="2️⃣"
                />
              </div>
            </div>

            {/* Hero Background */}
            <div className="bg-teal-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-teal-800 mb-4 flex items-center gap-2">
                🎨 Hero Background
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Hero Image"
                  value={contactPage.heroImage || ""}
                  onChange={(value: string) =>
                    updateContactPage("heroImage", value)
                  }
                  placeholder="/images/contact-hero.jpg"
                  icon="🖼️"
                />
                <ColorPicker
                  label="Background Gradient From"
                  value={contactPage.heroBgGradientFrom || "#7dd0ae"}
                  onChange={(value: string) =>
                    updateContactPage("heroBgGradientFrom", value)
                  }
                  description="Background gradient start"
                />
                <ColorPicker
                  label="Background Gradient Via"
                  value={contactPage.heroBgGradientVia || "#387e62"}
                  onChange={(value: string) =>
                    updateContactPage("heroBgGradientVia", value)
                  }
                  description="Background gradient middle"
                />
                <ColorPicker
                  label="Background Gradient To"
                  value={contactPage.heroBgGradientTo || "#367658"}
                  onChange={(value: string) =>
                    updateContactPage("heroBgGradientTo", value)
                  }
                  description="Background gradient end"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("contact")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-blue-800">
                Contact Information
              </h3>
              <p className="text-sm text-blue-600">
                Contact details and styling
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.contact ? "rotate-180" : ""
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

        {expandedSections.contact && (
          <div className="p-6 space-y-6">
            {/* Contact Details */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-blue-800 mb-4 flex items-center gap-2">
                📞 Contact Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Phone Number"
                  value={contactPage.phoneNumber || ""}
                  onChange={(value: string) =>
                    updateContactPage("phoneNumber", value)
                  }
                  placeholder="(770) 495-0050"
                  icon="📞"
                />
                <TextInput
                  label="Phone Link"
                  value={contactPage.phoneNumberLink || ""}
                  onChange={(value: string) =>
                    updateContactPage("phoneNumberLink", value)
                  }
                  placeholder="tel:+17704950050"
                  icon="🔗"
                />
                <TextInput
                  label="Email Address"
                  value={contactPage.emailAddress || ""}
                  onChange={(value: string) =>
                    updateContactPage("emailAddress", value)
                  }
                  placeholder="support@example.com"
                  icon="📧"
                />
                <TextInput
                  label="Email Link"
                  value={contactPage.emailAddressLink || ""}
                  onChange={(value: string) =>
                    updateContactPage("emailAddressLink", value)
                  }
                  placeholder="mailto:support@example.com"
                  icon="🔗"
                />
                <div className="md:col-span-2">
                  <TextInput
                    label="Location Address"
                    value={contactPage.locationAddress || ""}
                    onChange={(value: string) =>
                      updateContactPage("locationAddress", value)
                    }
                    placeholder="2785 Buford Hwy Ste 101-C,\nDuluth, GA 30096"
                    icon="📍"
                  />
                </div>
                <div className="md:col-span-2">
                  <TextInput
                    label="Business Hours"
                    value={contactPage.hoursText || ""}
                    onChange={(value: string) =>
                      updateContactPage("hoursText", value)
                    }
                    placeholder="Monday - Friday: 8:30 AM - 6:00 PM\nSaturday - Sunday: Closed"
                    icon="🕒"
                  />
                </div>
              </div>
            </div>

            {/* Contact Styling */}
            <div className="bg-cyan-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-cyan-800 mb-4 flex items-center gap-2">
                🎨 Contact Styling
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Section Title"
                  value={contactPage.contactInfoTitleText || ""}
                  onChange={(value: string) =>
                    updateContactPage("contactInfoTitleText", value)
                  }
                  placeholder="Contact Information"
                  icon="📋"
                />
                <ColorPicker
                  label="Title Color"
                  value={contactPage.contactInfoTitleColor || "#0c2217"}
                  onChange={(value: string) =>
                    updateContactPage("contactInfoTitleColor", value)
                  }
                  description="Contact section title color"
                />
                <ColorPicker
                  label="Icon Background"
                  value={contactPage.contactIconBgColor || "#7dd0ad42"}
                  onChange={(value: string) =>
                    updateContactPage("contactIconBgColor", value)
                  }
                  description="Contact icon background color"
                />
                <ColorPicker
                  label="Icon Color"
                  value={contactPage.contactIconColor || "#0c2217"}
                  onChange={(value: string) =>
                    updateContactPage("contactIconColor", value)
                  }
                  description="Contact icon color"
                />
                <ColorPicker
                  label="Label Color"
                  value={contactPage.contactLabelColor || "#111827"}
                  onChange={(value: string) =>
                    updateContactPage("contactLabelColor", value)
                  }
                  description="Contact label color"
                />
                <ColorPicker
                  label="Text Color"
                  value={contactPage.contactTextColor || "#4b5563"}
                  onChange={(value: string) =>
                    updateContactPage("contactTextColor", value)
                  }
                  description="Contact text color"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("form")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📝</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-purple-800">
                Contact Form
              </h3>
              <p className="text-sm text-purple-600">
                Form styling and service options
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.form ? "rotate-180" : ""
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

        {expandedSections.form && (
          <div className="p-6 space-y-6">
            {/* Form Content */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-purple-800 mb-4 flex items-center gap-2">
                📝 Form Content
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Form Title"
                  value={contactPage.formTitleText || ""}
                  onChange={(value: string) =>
                    updateContactPage("formTitleText", value)
                  }
                  placeholder="Send Us a Message"
                  icon="📋"
                />
                <ColorPicker
                  label="Form Title Color"
                  value={contactPage.formTitleColor || "#111827"}
                  onChange={(value: string) =>
                    updateContactPage("formTitleColor", value)
                  }
                  description="Form title color"
                />
                <TextInput
                  label="Submit Button Text"
                  value={contactPage.formSubmitBtnText || ""}
                  onChange={(value: string) =>
                    updateContactPage("formSubmitBtnText", value)
                  }
                  placeholder="Send Message"
                  icon="📤"
                />
                <ColorPicker
                  label="Submit Button Background"
                  value={contactPage.formSubmitBtnBgColor || "#0c2217"}
                  onChange={(value: string) =>
                    updateContactPage("formSubmitBtnBgColor", value)
                  }
                  description="Submit button background"
                />
              </div>
            </div>

            {/* Form Styling */}
            <div className="bg-pink-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-pink-800 mb-4 flex items-center gap-2">
                🎨 Form Styling
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Label Color"
                  value={contactPage.formLabelColor || "#374151"}
                  onChange={(value: string) =>
                    updateContactPage("formLabelColor", value)
                  }
                  description="Form label color"
                />
                <ColorPicker
                  label="Input Background"
                  value={contactPage.formInputBgColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateContactPage("formInputBgColor", value)
                  }
                  description="Input background color"
                />
                <ColorPicker
                  label="Input Border"
                  value={contactPage.formInputBorderColor || "#d1d5db"}
                  onChange={(value: string) =>
                    updateContactPage("formInputBorderColor", value)
                  }
                  description="Input border color"
                />
                <ColorPicker
                  label="Input Text"
                  value={contactPage.formInputTextColor || "#111827"}
                  onChange={(value: string) =>
                    updateContactPage("formInputTextColor", value)
                  }
                  description="Input text color"
                />
                <ColorPicker
                  label="Focus Ring"
                  value={contactPage.formInputFocusRingColor || "#3b82f6"}
                  onChange={(value: string) =>
                    updateContactPage("formInputFocusRingColor", value)
                  }
                  description="Input focus ring color"
                />
                <ColorPicker
                  label="Submit Button Text"
                  value={contactPage.formSubmitBtnTextColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateContactPage("formSubmitBtnTextColor", value)
                  }
                  description="Submit button text color"
                />
              </div>
            </div>

            {/* Service Options */}
            <div className="bg-rose-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-rose-800 mb-4 flex items-center gap-2">
                🛠️ Service Options
              </h4>
              <div className="space-y-3">
                {(contactPage.serviceOptions || []).map(
                  (option: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <TextInput
                        label={`Service ${index + 1}`}
                        value={option}
                        onChange={(value: string) =>
                          updateServiceOption(index, value)
                        }
                        placeholder="Service option"
                        icon="🔧"
                      />
                      <button
                        onClick={() => removeServiceOption(index)}
                        className="mt-6 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  )
                )}
                <button
                  onClick={addServiceOption}
                  className="w-full mt-3 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                >
                  + Add Service Option
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Google Map */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("map")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🗺️</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-orange-800">
                Google Map
              </h3>
              <p className="text-sm text-orange-600">Map embed and styling</p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.map ? "rotate-180" : ""
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

        {expandedSections.map && (
          <div className="p-6 space-y-6">
            <div className="bg-orange-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-orange-800 mb-4 flex items-center gap-2">
                🗺️ Map Settings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <TextInput
                    label="Google Map Embed URL"
                    value={contactPage.googleMapEmbedUrl || ""}
                    onChange={(value: string) =>
                      updateContactPage("googleMapEmbedUrl", value)
                    }
                    placeholder="https://www.google.com/maps/embed?pb=..."
                    icon="🔗"
                  />
                </div>
                <TextInput
                  label="Map Height"
                  value={contactPage.googleMapHeight || ""}
                  onChange={(value: string) =>
                    updateContactPage("googleMapHeight", value)
                  }
                  placeholder="300px"
                  icon="📏"
                />
                <TextInput
                  label="Map Border Radius"
                  value={contactPage.googleMapBorderRadius || ""}
                  onChange={(value: string) =>
                    updateContactPage("googleMapBorderRadius", value)
                  }
                  placeholder="lg"
                  icon="🔲"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("cta")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📢</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-indigo-800">
                Call to Action
              </h3>
              <p className="text-sm text-indigo-600">Bottom CTA section</p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.cta ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-5 h-5 text-indigo-600"
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

        {expandedSections.cta && (
          <div className="p-6 space-y-6">
            {/* CTA Content */}
            <div className="bg-indigo-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-indigo-800 mb-4 flex items-center gap-2">
                📝 CTA Content
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="CTA Title"
                  value={contactPage.ctaTitle || ""}
                  onChange={(value: string) =>
                    updateContactPage("ctaTitle", value)
                  }
                  placeholder="Ready to Get ss Car Back to Perfect?"
                  icon="📋"
                />
                <ColorPicker
                  label="Title Color"
                  value={contactPage.ctaTitleColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateContactPage("ctaTitleColor", value)
                  }
                  description="CTA title color"
                />
                <div className="md:col-span-2">
                  <TextInput
                    label="CTA Description"
                    value={contactPage.ctaDescription || ""}
                    onChange={(value: string) =>
                      updateContactPage("ctaDescription", value)
                    }
                    placeholder="Schedule your e today and experience the difference expert auto body repair makes."
                    icon="💬"
                  />
                </div>
                <ColorPicker
                  label="Description Color"
                  value={contactPage.ctaDescriptionColor || "#e0f2fe"}
                  onChange={(value: string) =>
                    updateContactPage("ctaDescriptionColor", value)
                  }
                  description="CTA description color"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-blue-800 mb-4 flex items-center gap-2">
                🔘 CTA Buttons
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Schedule Button Text"
                  value={contactPage.ctaScheduleButtonText || ""}
                  onChange={(value: string) =>
                    updateContactPage("ctaScheduleButtonText", value)
                  }
                  placeholder="Schedule Now"
                  icon="📅"
                />
                <ColorPicker
                  label="Schedule Button Background"
                  value={contactPage.ctaScheduleButtonBgColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateContactPage("ctaScheduleButtonBgColor", value)
                  }
                  description="Schedule button background"
                />
                <TextInput
                  label="Call Button Text"
                  value={contactPage.ctaCallButtonText || ""}
                  onChange={(value: string) =>
                    updateContactPage("ctaCallButtonText", value)
                  }
                  placeholder="Call Us Now"
                  icon="📞"
                />
                <ColorPicker
                  label="Call Button Background"
                  value={contactPage.ctaCallButtonBgColor || "#387e62"}
                  onChange={(value: string) =>
                    updateContactPage("ctaCallButtonBgColor", value)
                  }
                  description="Call button background"
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
          <li>• Make sure phone and email links work correctly</li>
          <li>• Test the Google Maps embed URL before using it</li>
          <li>• Use high contrast colors for form accessibility</li>
          <li>• Keep service options relevant to your business</li>
          <li>• Ensure contact information is up to date</li>
        </ul>
      </div>
    </div>
  );
}
