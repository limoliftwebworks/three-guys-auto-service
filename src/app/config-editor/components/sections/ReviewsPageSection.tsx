"use client";

import React, { useState } from "react";
import { ColorPicker, TextInput } from "../ui";

interface ReviewsPageSectionProps {
  config: any;
  updateConfig: (config: any) => void;
}

export function ReviewsPageSection({
  config,
  updateConfig,
}: ReviewsPageSectionProps) {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    hero: true,
    background: false,
    reviews: false,
    share: false,
    cta: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateReviewsPage = (field: string, value: any) => {
    const newConfig = {
      ...config,
      pages: {
        ...config.pages,
        Reviews: {
          ...config.pages?.Reviews,
          [field]: value,
        },
      },
    };
    updateConfig(newConfig);
  };

  const reviewsPage = config.pages?.Reviews || {};

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-blue-200 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">⭐</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Reviews Page Settings
            </h2>
            <p className="text-gray-600">
              Configure your reviews page hero, review display, styling, and
              interactions
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("hero")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🦸</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-blue-800">
                Hero Section
              </h3>
              <p className="text-sm text-blue-600">
                Hero content, title, badge, and statistics
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.hero ? "rotate-180" : ""
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

        {expandedSections.hero && (
          <div className="p-6 space-y-6">
            {/* Hero Content */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-blue-800 mb-4 flex items-center gap-2">
                📝 Hero Content
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Page Title"
                  value={reviewsPage.title || ""}
                  onChange={(value: string) =>
                    updateReviewsPage("title", value)
                  }
                  placeholder="Customer Reviews"
                  icon="📋"
                />
                <ColorPicker
                  label="Title Color"
                  value={reviewsPage.heroTitleColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroTitleColor", value)
                  }
                  description="Hero title color"
                />
                <div className="md:col-span-2">
                  <TextInput
                    label="Subtitle"
                    value={reviewsPage.subtitle || ""}
                    onChange={(value: string) =>
                      updateReviewsPage("subtitle", value)
                    }
                    placeholder="We're proud of the work we do and the trust our customers place in us."
                    icon="💬"
                  />
                </div>
                <ColorPicker
                  label="Subtitle Color"
                  value={reviewsPage.heroSubtitleColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroSubtitleColor", value)
                  }
                  description="Hero subtitle color"
                />
              </div>
            </div>

            {/* Hero Badge */}
            <div className="bg-indigo-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-indigo-800 mb-4 flex items-center gap-2">
                🏷️ Hero Badge
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Badge Text"
                  value={reviewsPage.badge || ""}
                  onChange={(value: string) =>
                    updateReviewsPage("badge", value)
                  }
                  placeholder="Verified Google Reviews"
                  icon="🏷️"
                />
                <ColorPicker
                  label="Badge Background"
                  value={reviewsPage.heroBadgeBgColor || "#ffffff10"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroBadgeBgColor", value)
                  }
                  description="Badge background color"
                />
                <ColorPicker
                  label="Badge Text Color"
                  value={reviewsPage.heroBadgeTextColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroBadgeTextColor", value)
                  }
                  description="Badge text color"
                />
                <ColorPicker
                  label="Badge Icon Color"
                  value={reviewsPage.heroBadgeIconColor || "#93c5fd"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroBadgeIconColor", value)
                  }
                  description="Badge icon color"
                />
                <ColorPicker
                  label="Badge Checkmark Color"
                  value={reviewsPage.heroBadgeCheckmarkColor || "#3b82f6"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroBadgeCheckmarkColor", value)
                  }
                  description="Badge checkmark color"
                />
                <ColorPicker
                  label="Badge Border Color"
                  value={reviewsPage.heroBadgeBorderColor || "#3b82f6"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroBadgeBorderColor", value)
                  }
                  description="Badge border color"
                />
              </div>
            </div>

            {/* Hero Stats */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-purple-800 mb-4 flex items-center gap-2">
                📊 Hero Statistics Cards
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Stats Card 1 Title"
                  value={reviewsPage.statsCard1Title || ""}
                  onChange={(value: string) =>
                    updateReviewsPage("statsCard1Title", value)
                  }
                  placeholder="Verified Reviews"
                  icon="🏆"
                />
                <ColorPicker
                  label="Stats Card 1 Icon Color"
                  value={reviewsPage.statsCard1IconColor || "#93c5fd"}
                  onChange={(value: string) =>
                    updateReviewsPage("statsCard1IconColor", value)
                  }
                  description="First stats card icon color"
                />
                <TextInput
                  label="Stats Card 2 Title"
                  value={reviewsPage.statsCard2Title || ""}
                  onChange={(value: string) =>
                    updateReviewsPage("statsCard2Title", value)
                  }
                  placeholder="Average Rating"
                  icon="🏆"
                />
                <ColorPicker
                  label="Stats Card 2 Icon Color"
                  value={reviewsPage.statsCard2IconColor || "#facc15"}
                  onChange={(value: string) =>
                    updateReviewsPage("statsCard2IconColor", value)
                  }
                  description="Second stats card icon color"
                />
                <ColorPicker
                  label="Stats Card Background"
                  value={reviewsPage.statsCardBgColor || "#ffffff10"}
                  onChange={(value: string) =>
                    updateReviewsPage("statsCardBgColor", value)
                  }
                  description="Stats card background color"
                />
                <ColorPicker
                  label="Stats Card Text Color"
                  value={reviewsPage.statsCardTextColor || "#f3f4f6"}
                  onChange={(value: string) =>
                    updateReviewsPage("statsCardTextColor", value)
                  }
                  description="Stats card text color"
                />
                <ColorPicker
                  label="Stats Card Title Color"
                  value={reviewsPage.statsCardTitleColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateReviewsPage("statsCardTitleColor", value)
                  }
                  description="Stats card title color"
                />
                <ColorPicker
                  label="Stats Card Border Color"
                  value={reviewsPage.statsCardBorderColor || "#ffffff20"}
                  onChange={(value: string) =>
                    updateReviewsPage("statsCardBorderColor", value)
                  }
                  description="Stats card border color"
                />
                <ColorPicker
                  label="Stats Card Hover Border"
                  value={reviewsPage.statsCardHoverBorderColor || "#ffffff30"}
                  onChange={(value: string) =>
                    updateReviewsPage("statsCardHoverBorderColor", value)
                  }
                  description="Stats card hover border color"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Background & Decorative Elements */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("background")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎨</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-purple-800">
                Background & Decorative Elements
              </h3>
              <p className="text-sm text-purple-600">
                Hero background, gradients, patterns, and decorative elements
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.background ? "rotate-180" : ""
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

        {expandedSections.background && (
          <div className="p-6 space-y-6">
            {/* Hero Background */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-purple-800 mb-4 flex items-center gap-2">
                🖼️ Hero Background
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Hero Image"
                  value={reviewsPage.heroImage || ""}
                  onChange={(value: string) =>
                    updateReviewsPage("heroImage", value)
                  }
                  placeholder="/images/auto-reviews-hero.jpg"
                  icon="🖼️"
                />
                <ColorPicker
                  label="Background Gradient From"
                  value={reviewsPage.heroBgGradientFrom || "#1e40af"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroBgGradientFrom", value)
                  }
                  description="Hero background gradient start"
                />
                <ColorPicker
                  label="Background Gradient Via"
                  value={reviewsPage.heroBgGradientVia || "#1e3a8a"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroBgGradientVia", value)
                  }
                  description="Hero background gradient middle"
                />
                <ColorPicker
                  label="Background Gradient To"
                  value={reviewsPage.heroBgGradientTo || "#1d4ed8"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroBgGradientTo", value)
                  }
                  description="Hero background gradient end"
                />
              </div>
            </div>

            {/* Hero Decorative Elements */}
            <div className="bg-pink-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-pink-800 mb-4 flex items-center gap-2">
                ✨ Hero Decorative Elements
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Blurred Circle 1 Color"
                  value={reviewsPage.heroBlurredCircle1Color || "#3b82f6"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroBlurredCircle1Color", value)
                  }
                  description="First decorative circle color"
                />
                <ColorPicker
                  label="Blurred Circle 2 Color"
                  value={reviewsPage.heroBlurredCircle2Color || "#60a5fa"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroBlurredCircle2Color", value)
                  }
                  description="Second decorative circle color"
                />
                <ColorPicker
                  label="Blurred Circle 3 Color"
                  value={reviewsPage.heroBlurredCircle3Color || "#93c5fd"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroBlurredCircle3Color", value)
                  }
                  description="Third decorative circle color"
                />
                <ColorPicker
                  label="Light Beam 1 Color"
                  value={reviewsPage.heroLightBeam1Color || "#3b82f6"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroLightBeam1Color", value)
                  }
                  description="First light beam color"
                />
                <ColorPicker
                  label="Light Beam 2 Color"
                  value={reviewsPage.heroLightBeam2Color || "#60a5fa"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroLightBeam2Color", value)
                  }
                  description="Second light beam color"
                />
                <ColorPicker
                  label="Pattern Color"
                  value={reviewsPage.heroPatternColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroPatternColor", value)
                  }
                  description="Background pattern color"
                />
                <TextInput
                  label="Pattern Opacity"
                  value={reviewsPage.heroPatternOpacity?.toString() || "0.1"}
                  onChange={(value: string) =>
                    updateReviewsPage("heroPatternOpacity", parseFloat(value))
                  }
                  placeholder="0.1"
                  icon="🎨"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("reviews")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-amber-800">
                Reviews Display & Styling
              </h3>
              <p className="text-sm text-amber-600">
                Review cards, pagination, avatar colors, and display options
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.reviews ? "rotate-180" : ""
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

        {expandedSections.reviews && (
          <div className="p-6 space-y-6">
            {/* Reviews Section Background */}
            <div className="bg-amber-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-amber-800 mb-4 flex items-center gap-2">
                🎯 Reviews Section Background
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Reviews Section Background"
                  value={reviewsPage.reviewsSectionBgColor || "#dbeafe2a"}
                  onChange={(value: string) =>
                    updateReviewsPage("reviewsSectionBgColor", value)
                  }
                  description="Reviews section background color"
                />
              </div>
            </div>

            {/* Review Cards Styling */}
            <div className="bg-orange-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-orange-800 mb-4 flex items-center gap-2">
                💳 Review Cards Styling
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Review Card Background"
                  value={reviewsPage.reviewCardBgColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateReviewsPage("reviewCardBgColor", value)
                  }
                  description="Review card background color"
                />
                <TextInput
                  label="Review Card Hover Shadow"
                  value={reviewsPage.reviewCardHoverShadow || "lg"}
                  onChange={(value: string) =>
                    updateReviewsPage("reviewCardHoverShadow", value)
                  }
                  placeholder="lg"
                  icon="💫"
                />
                <ColorPicker
                  label="Review Card Border"
                  value={reviewsPage.reviewCardBorderColor || "#e5e7eb"}
                  onChange={(value: string) =>
                    updateReviewsPage("reviewCardBorderColor", value)
                  }
                  description="Review card border color"
                />
                <ColorPicker
                  label="Review Text Color"
                  value={reviewsPage.reviewCardTextColor || "#4b5563"}
                  onChange={(value: string) =>
                    updateReviewsPage("reviewCardTextColor", value)
                  }
                  description="Review text color"
                />
                <ColorPicker
                  label="Author Name Color"
                  value={reviewsPage.reviewCardAuthorNameColor || "#111827"}
                  onChange={(value: string) =>
                    updateReviewsPage("reviewCardAuthorNameColor", value)
                  }
                  description="Review author name color"
                />
                <ColorPicker
                  label="Source Color"
                  value={reviewsPage.reviewCardSourceColor || "#6b7280"}
                  onChange={(value: string) =>
                    updateReviewsPage("reviewCardSourceColor", value)
                  }
                  description="Review source text color"
                />
                <ColorPicker
                  label="Star Color"
                  value={reviewsPage.reviewCardStarColor || "#facc15"}
                  onChange={(value: string) =>
                    updateReviewsPage("reviewCardStarColor", value)
                  }
                  description="Review star color"
                />
                <ColorPicker
                  label="Empty Star Color"
                  value={reviewsPage.reviewCardStarEmptyColor || "#d1d5db"}
                  onChange={(value: string) =>
                    updateReviewsPage("reviewCardStarEmptyColor", value)
                  }
                  description="Empty star color"
                />
                <ColorPicker
                  label="Show More Color"
                  value={reviewsPage.reviewCardShowMoreColor || "#1e40af"}
                  onChange={(value: string) =>
                    updateReviewsPage("reviewCardShowMoreColor", value)
                  }
                  description="Show more button color"
                />
                <ColorPicker
                  label="Show More Hover Color"
                  value={reviewsPage.reviewCardShowMoreHoverColor || "#3b82f6"}
                  onChange={(value: string) =>
                    updateReviewsPage("reviewCardShowMoreHoverColor", value)
                  }
                  description="Show more button hover color"
                />
                <ColorPicker
                  label="Card Gradient Color"
                  value={reviewsPage.reviewCardGradientColor || "#1e40af"}
                  onChange={(value: string) =>
                    updateReviewsPage("reviewCardGradientColor", value)
                  }
                  description="Review card gradient accent color"
                />
              </div>
            </div>

            {/* Review Avatars */}
            <div className="bg-yellow-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                👤 Review Avatar Colors
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Avatar Text Color"
                  value={reviewsPage.reviewAvatarTextColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateReviewsPage("reviewAvatarTextColor", value)
                  }
                  description="Avatar text color"
                />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avatar Background Colors (comma-separated hex values)
                  </label>
                  <TextInput
                    label=""
                    value={reviewsPage.reviewAvatarColors?.join(", ") || ""}
                    onChange={(value: string) =>
                      updateReviewsPage(
                        "reviewAvatarColors",
                        value.split(", ").map((c) => c.trim())
                      )
                    }
                    placeholder="#3b82f6, #10b981, #f59e0b, #ef4444, #8b5cf6, #ec4899, #6366f1, #14b8a6"
                    icon="🎨"
                  />
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="bg-emerald-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                📄 Pagination Controls
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Pagination Button Background"
                  value={reviewsPage.paginationButtonBgColor || "#2563eb"}
                  onChange={(value: string) =>
                    updateReviewsPage("paginationButtonBgColor", value)
                  }
                  description="Pagination button background"
                />
                <ColorPicker
                  label="Pagination Button Text Color"
                  value={reviewsPage.paginationButtonTextColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateReviewsPage("paginationButtonTextColor", value)
                  }
                  description="Pagination button text color"
                />
                <TextInput
                  label="Disabled Button Opacity"
                  value={
                    reviewsPage.paginationButtonDisabledOpacity?.toString() ||
                    "0.5"
                  }
                  onChange={(value: string) =>
                    updateReviewsPage(
                      "paginationButtonDisabledOpacity",
                      parseFloat(value)
                    )
                  }
                  placeholder="0.5"
                  icon="🎨"
                />
                <ColorPicker
                  label="Pagination Text Color"
                  value={reviewsPage.paginationTextColor || "#4b5563"}
                  onChange={(value: string) =>
                    updateReviewsPage("paginationTextColor", value)
                  }
                  description="Pagination info text color"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Share Experience Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("share")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">✍️</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-green-800">
                Share Experience Section
              </h3>
              <p className="text-sm text-green-600">
                Write review section styling and button configuration
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.share ? "rotate-180" : ""
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

        {expandedSections.share && (
          <div className="p-6 space-y-6">
            {/* Share Experience Content */}
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-green-800 mb-4 flex items-center gap-2">
                📝 Share Experience Content
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Share Experience Title"
                  value={reviewsPage.shareExperienceTitle || ""}
                  onChange={(value: string) =>
                    updateReviewsPage("shareExperienceTitle", value)
                  }
                  placeholder="Share Your Experience"
                  icon="📋"
                />
                <ColorPicker
                  label="Title Color"
                  value={reviewsPage.shareExperienceTitleColor || "#111827"}
                  onChange={(value: string) =>
                    updateReviewsPage("shareExperienceTitleColor", value)
                  }
                  description="Share experience title color"
                />
                <div className="md:col-span-2">
                  <TextInput
                    label="Share Experience Subtitle"
                    value={reviewsPage.shareExperienceSubtitle || ""}
                    onChange={(value: string) =>
                      updateReviewsPage("shareExperienceSubtitle", value)
                    }
                    placeholder="Help others by sharing your experience with us"
                    icon="💬"
                  />
                </div>
                <ColorPicker
                  label="Subtitle Color"
                  value={reviewsPage.shareExperienceSubtitleColor || "#4b5563"}
                  onChange={(value: string) =>
                    updateReviewsPage("shareExperienceSubtitleColor", value)
                  }
                  description="Share experience subtitle color"
                />
              </div>
            </div>

            {/* Share Experience Styling */}
            <div className="bg-emerald-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                🎨 Share Experience Styling
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Background Color"
                  value={reviewsPage.shareExperienceBgColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateReviewsPage("shareExperienceBgColor", value)
                  }
                  description="Share experience background color"
                />
                <ColorPicker
                  label="Border Color"
                  value={reviewsPage.shareExperienceBorderColor || "#e5e7eb"}
                  onChange={(value: string) =>
                    updateReviewsPage("shareExperienceBorderColor", value)
                  }
                  description="Share experience border color"
                />
                <TextInput
                  label="Shadow"
                  value={reviewsPage.shareExperienceShadow || "sm"}
                  onChange={(value: string) =>
                    updateReviewsPage("shareExperienceShadow", value)
                  }
                  placeholder="sm"
                  icon="💫"
                />
                <TextInput
                  label="Hover Shadow"
                  value={reviewsPage.shareExperienceHoverShadow || "md"}
                  onChange={(value: string) =>
                    updateReviewsPage("shareExperienceHoverShadow", value)
                  }
                  placeholder="md"
                  icon="💫"
                />
                <ColorPicker
                  label="Gradient Color"
                  value={reviewsPage.shareExperienceGradientColor || "#1e40af"}
                  onChange={(value: string) =>
                    updateReviewsPage("shareExperienceGradientColor", value)
                  }
                  description="Share experience gradient accent"
                />
                <TextInput
                  label="Gradient Opacity"
                  value={
                    reviewsPage.shareExperienceGradientOpacity?.toString() ||
                    "0.5"
                  }
                  onChange={(value: string) =>
                    updateReviewsPage(
                      "shareExperienceGradientOpacity",
                      parseFloat(value)
                    )
                  }
                  placeholder="0.5"
                  icon="🎨"
                />
              </div>
            </div>

            {/* Share Button */}
            <div className="bg-teal-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-teal-800 mb-4 flex items-center gap-2">
                🔘 Share Button Configuration
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Button Text"
                  value={reviewsPage.shareButtonText || ""}
                  onChange={(value: string) =>
                    updateReviewsPage("shareButtonText", value)
                  }
                  placeholder="Write a Review on Google"
                  icon="📝"
                />
                <TextInput
                  label="Button Link"
                  value={reviewsPage.shareButtonLink || ""}
                  onChange={(value: string) =>
                    updateReviewsPage("shareButtonLink", value)
                  }
                  placeholder="https://g.co/kgs/NVDcU7f"
                  icon="🔗"
                />
                <ColorPicker
                  label="Button Background"
                  value={reviewsPage.shareButtonBgColor || "#1e40af"}
                  onChange={(value: string) =>
                    updateReviewsPage("shareButtonBgColor", value)
                  }
                  description="Share button background color"
                />
                <ColorPicker
                  label="Button Text Color"
                  value={reviewsPage.shareButtonTextColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateReviewsPage("shareButtonTextColor", value)
                  }
                  description="Share button text color"
                />
                <ColorPicker
                  label="Button Hover Background"
                  value={reviewsPage.shareButtonHoverBgColor || "#f3f4f6"}
                  onChange={(value: string) =>
                    updateReviewsPage("shareButtonHoverBgColor", value)
                  }
                  description="Share button hover background"
                />
                <TextInput
                  label="Button Shadow"
                  value={reviewsPage.shareButtonShadow || "sm"}
                  onChange={(value: string) =>
                    updateReviewsPage("shareButtonShadow", value)
                  }
                  placeholder="sm"
                  icon="💫"
                />
                <TextInput
                  label="Button Hover Shadow"
                  value={reviewsPage.shareButtonHoverShadow || "md"}
                  onChange={(value: string) =>
                    updateReviewsPage("shareButtonHoverShadow", value)
                  }
                  placeholder="md"
                  icon="💫"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("cta")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📢</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-violet-800">
                Call to Action Section
              </h3>
              <p className="text-sm text-violet-600">
                CTA background, content, and button styling
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.cta ? "rotate-180" : ""
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

        {expandedSections.cta && (
          <div className="p-6 space-y-6">
            {/* CTA Background */}
            <div className="bg-violet-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-violet-800 mb-4 flex items-center gap-2">
                🎨 CTA Background & Styling
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Background Gradient From"
                  value={reviewsPage.ctaBgGradientFrom || "#1e40af"}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaBgGradientFrom", value)
                  }
                  description="CTA background gradient start"
                />
                <ColorPicker
                  label="Background Gradient Via"
                  value={reviewsPage.ctaBgGradientVia || "#3b82f6"}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaBgGradientVia", value)
                  }
                  description="CTA background gradient middle"
                />
                <ColorPicker
                  label="Background Gradient To"
                  value={reviewsPage.ctaBgGradientTo || "#2563eb"}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaBgGradientTo", value)
                  }
                  description="CTA background gradient end"
                />
                <ColorPicker
                  label="Pattern Color"
                  value={reviewsPage.ctaPatternColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaPatternColor", value)
                  }
                  description="CTA background pattern color"
                />
                <TextInput
                  label="Pattern Opacity"
                  value={reviewsPage.ctaPatternOpacity?.toString() || "0.05"}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaPatternOpacity", parseFloat(value))
                  }
                  placeholder="0.05"
                  icon="🎨"
                />
                <ColorPicker
                  label="CTA Card Background"
                  value={reviewsPage.ctaCardBgColor || "#ffffff0d"}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaCardBgColor", value)
                  }
                  description="CTA card background color"
                />
                <TextInput
                  label="CTA Card Blur Amount"
                  value={reviewsPage.ctaCardBlurAmount || "2px"}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaCardBlurAmount", value)
                  }
                  placeholder="2px"
                  icon="💫"
                />
              </div>
            </div>

            {/* CTA Content */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-purple-800 mb-4 flex items-center gap-2">
                📝 CTA Content
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="CTA Title"
                  value={reviewsPage.ctaTitle || ""}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaTitle", value)
                  }
                  placeholder="Ready to Get Your Car Back to Perfect?"
                  icon="📋"
                />
                <ColorPicker
                  label="Title Color"
                  value={reviewsPage.ctaTitleColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaTitleColor", value)
                  }
                  description="CTA title color"
                />
                <div className="md:col-span-2">
                  <TextInput
                    label="CTA Description"
                    value={reviewsPage.ctaDescription || ""}
                    onChange={(value: string) =>
                      updateReviewsPage("ctaDescription", value)
                    }
                    placeholder="Schedule your appointment today and experience the difference expert auto body repair makes."
                    icon="💬"
                  />
                </div>
                <ColorPicker
                  label="Description Color"
                  value={reviewsPage.ctaDescriptionColor || "#93c5fd"}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaDescriptionColor", value)
                  }
                  description="CTA description color"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="bg-pink-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-pink-800 mb-4 flex items-center gap-2">
                🔘 CTA Buttons
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Schedule Button Text"
                  value={reviewsPage.ctaScheduleButtonText || ""}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaScheduleButtonText", value)
                  }
                  placeholder="Schedule Now"
                  icon="📅"
                />
                <ColorPicker
                  label="Schedule Button Background"
                  value={reviewsPage.ctaScheduleButtonBgColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaScheduleButtonBgColor", value)
                  }
                  description="Schedule button background"
                />
                <ColorPicker
                  label="Schedule Button Text Color"
                  value={reviewsPage.ctaScheduleButtonTextColor || "#2563eb"}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaScheduleButtonTextColor", value)
                  }
                  description="Schedule button text color"
                />
                <ColorPicker
                  label="Schedule Button Hover Background"
                  value={reviewsPage.ctaScheduleButtonHoverBgColor || "#f3f4f6"}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaScheduleButtonHoverBgColor", value)
                  }
                  description="Schedule button hover background"
                />
                <TextInput
                  label="Call Button Text"
                  value={reviewsPage.ctaCallButtonText || ""}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaCallButtonText", value)
                  }
                  placeholder="Call Us Now"
                  icon="📞"
                />
                <ColorPicker
                  label="Call Button Background"
                  value={reviewsPage.ctaCallButtonBgColor || "#2563eb"}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaCallButtonBgColor", value)
                  }
                  description="Call button background"
                />
                <ColorPicker
                  label="Call Button Text Color"
                  value={reviewsPage.ctaCallButtonTextColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaCallButtonTextColor", value)
                  }
                  description="Call button text color"
                />
                <ColorPicker
                  label="Call Button Hover Background"
                  value={reviewsPage.ctaCallButtonHoverBgColor || "#1d4ed8"}
                  onChange={(value: string) =>
                    updateReviewsPage("ctaCallButtonHoverBgColor", value)
                  }
                  description="Call button hover background"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
