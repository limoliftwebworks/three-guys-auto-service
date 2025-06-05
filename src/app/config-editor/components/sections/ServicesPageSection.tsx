"use client";

import React, { useState } from "react";
import { ColorPicker, TextInput } from "../ui";

interface ServicesPageSectionProps {
  config: any;
  updateConfig: (config: any) => void;
}

export function ServicesPageSection({
  config,
  updateConfig,
}: ServicesPageSectionProps) {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    hero: true,
    background: false,
    categories: false,
    cta: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateServicesPage = (field: string, value: any) => {
    const newConfig = {
      ...config,
      pages: {
        ...config.pages,
        Services: {
          ...config.pages?.Services,
          [field]: value,
        },
      },
    };
    updateConfig(newConfig);
  };

  const updateServiceCategory = (
    categoryIndex: number,
    field: string,
    value: any
  ) => {
    const currentCategories = servicesPage.serviceCategories || [];
    const updatedCategories = [...currentCategories];
    updatedCategories[categoryIndex] = {
      ...updatedCategories[categoryIndex],
      [field]: value,
    };
    updateServicesPage("serviceCategories", updatedCategories);
  };

  const updateCategoryService = (
    categoryIndex: number,
    serviceIndex: number,
    field: string,
    value: any
  ) => {
    const currentCategories = servicesPage.serviceCategories || [];
    const updatedCategories = [...currentCategories];
    const currentServices = updatedCategories[categoryIndex].services || [];
    const updatedServices = [...currentServices];
    updatedServices[serviceIndex] = {
      ...updatedServices[serviceIndex],
      [field]: value,
    };
    updatedCategories[categoryIndex] = {
      ...updatedCategories[categoryIndex],
      services: updatedServices,
    };
    updateServicesPage("serviceCategories", updatedCategories);
  };

  const servicesPage = config.pages?.Services || {};

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-orange-200 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🔧</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Services Page Settings
            </h2>
            <p className="text-gray-600">
              Configure your services page hero, categories, styling, and CTA
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("hero")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🦸</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-orange-800">
                Hero Section
              </h3>
              <p className="text-sm text-orange-600">
                Hero content, titles, badge, and stats cards
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.hero ? "rotate-180" : ""
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

        {expandedSections.hero && (
          <div className="p-6 space-y-6">
            {/* Hero Content */}
            <div className="bg-orange-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-orange-800 mb-4 flex items-center gap-2">
                📝 Hero Content
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Page Title"
                  value={servicesPage.title || ""}
                  onChange={(value: string) =>
                    updateServicesPage("title", value)
                  }
                  placeholder="Our Auto Body Services"
                  icon="📋"
                />
                <ColorPicker
                  label="Title Color"
                  value={servicesPage.heroTitleColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateServicesPage("heroTitleColor", value)
                  }
                  description="Hero title color"
                />
                <div className="md:col-span-2">
                  <TextInput
                    label="Subtitle"
                    value={servicesPage.subtitle || ""}
                    onChange={(value: string) =>
                      updateServicesPage("subtitle", value)
                    }
                    placeholder="Expert collision repair and auto body services in Duluth, GA. Quality work guaranteed."
                    icon="💬"
                  />
                </div>
                <ColorPicker
                  label="Subtitle Color"
                  value={servicesPage.heroSubtitleColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateServicesPage("heroSubtitleColor", value)
                  }
                  description="Hero subtitle color"
                />
              </div>
            </div>

            {/* Hero Badge */}
            <div className="bg-red-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-red-800 mb-4 flex items-center gap-2">
                🏷️ Hero Badge
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Badge Text"
                  value={servicesPage.badge || ""}
                  onChange={(value: string) =>
                    updateServicesPage("badge", value)
                  }
                  placeholder="Certified Auto Body Shop"
                  icon="🏷️"
                />
                <ColorPicker
                  label="Badge Background"
                  value={servicesPage.heroBadgeBgColor || "#1e40af3a"}
                  onChange={(value: string) =>
                    updateServicesPage("heroBadgeBgColor", value)
                  }
                  description="Badge background color"
                />
                <ColorPicker
                  label="Badge Text Color"
                  value={servicesPage.heroBadgeTextColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateServicesPage("heroBadgeTextColor", value)
                  }
                  description="Badge text color"
                />
                <ColorPicker
                  label="Badge Icon Color"
                  value={servicesPage.heroBadgeIconColor || "#93c5fd"}
                  onChange={(value: string) =>
                    updateServicesPage("heroBadgeIconColor", value)
                  }
                  description="Badge icon color"
                />
                <ColorPicker
                  label="Badge Checkmark Color"
                  value={servicesPage.heroBadgeCheckmarkColor || "#60a5fa"}
                  onChange={(value: string) =>
                    updateServicesPage("heroBadgeCheckmarkColor", value)
                  }
                  description="Badge checkmark color"
                />
                <ColorPicker
                  label="Badge Medal Icon Color"
                  value={servicesPage.heroBadgeMedalIconColor || "#3b82f6"}
                  onChange={(value: string) =>
                    updateServicesPage("heroBadgeMedalIconColor", value)
                  }
                  description="Badge medal icon color"
                />
              </div>
            </div>

            {/* Hero Stats Cards */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-purple-800 mb-4 flex items-center gap-2">
                📊 Hero Statistics Cards
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Card 1 Title"
                  value={servicesPage.card1Title || ""}
                  onChange={(value: string) =>
                    updateServicesPage("card1Title", value)
                  }
                  placeholder="Years Experience"
                  icon="🏆"
                />
                <TextInput
                  label="Card 1 Value"
                  value={servicesPage.card1Value || ""}
                  onChange={(value: string) =>
                    updateServicesPage("card1Value", value)
                  }
                  placeholder="15+"
                  icon="🔢"
                />
                <TextInput
                  label="Card 2 Title"
                  value={servicesPage.card2Title || ""}
                  onChange={(value: string) =>
                    updateServicesPage("card2Title", value)
                  }
                  placeholder="Cars Repaired"
                  icon="🏆"
                />
                <TextInput
                  label="Card 2 Value"
                  value={servicesPage.card2Value || ""}
                  onChange={(value: string) =>
                    updateServicesPage("card2Value", value)
                  }
                  placeholder="5000+"
                  icon="🔢"
                />
                <ColorPicker
                  label="Stats Card Background"
                  value={servicesPage.heroStatsCardBgColor || "#1e40af4f"}
                  onChange={(value: string) =>
                    updateServicesPage("heroStatsCardBgColor", value)
                  }
                  description="Stats card background color"
                />
                <ColorPicker
                  label="Stats Card Text Color"
                  value={servicesPage.heroStatsCardTextColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateServicesPage("heroStatsCardTextColor", value)
                  }
                  description="Stats card text color"
                />
                <ColorPicker
                  label="Stats Card Value Color"
                  value={servicesPage.heroStatsCardValueColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateServicesPage("heroStatsCardValueColor", value)
                  }
                  description="Stats card value color"
                />
                <ColorPicker
                  label="Stats Card Icon Color"
                  value={servicesPage.heroStatsCardIconColor || "#93c5fd"}
                  onChange={(value: string) =>
                    updateServicesPage("heroStatsCardIconColor", value)
                  }
                  description="Stats card icon color"
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
                  value={servicesPage.heroImage || ""}
                  onChange={(value: string) =>
                    updateServicesPage("heroImage", value)
                  }
                  placeholder="/images/auto-services-hero.jpg"
                  icon="🖼️"
                />
                <ColorPicker
                  label="Background Gradient From"
                  value={servicesPage.heroBgGradientFrom || "#1e40af"}
                  onChange={(value: string) =>
                    updateServicesPage("heroBgGradientFrom", value)
                  }
                  description="Background gradient start color"
                />
                <ColorPicker
                  label="Background Gradient Via"
                  value={servicesPage.heroBgGradientVia || "#1e3a8a"}
                  onChange={(value: string) =>
                    updateServicesPage("heroBgGradientVia", value)
                  }
                  description="Background gradient middle color"
                />
                <ColorPicker
                  label="Background Gradient To"
                  value={servicesPage.heroBgGradientTo || "#1d4ed8"}
                  onChange={(value: string) =>
                    updateServicesPage("heroBgGradientTo", value)
                  }
                  description="Background gradient end color"
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
                  value={servicesPage.heroBlurredCircle1Color || "#3b82f6"}
                  onChange={(value: string) =>
                    updateServicesPage("heroBlurredCircle1Color", value)
                  }
                  description="First decorative circle color"
                />
                <ColorPicker
                  label="Blurred Circle 2 Color"
                  value={servicesPage.heroBlurredCircle2Color || "#60a5fa"}
                  onChange={(value: string) =>
                    updateServicesPage("heroBlurredCircle2Color", value)
                  }
                  description="Second decorative circle color"
                />
                <ColorPicker
                  label="Pattern Color"
                  value={servicesPage.heroPatternColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateServicesPage("heroPatternColor", value)
                  }
                  description="Background pattern color"
                />
                <ColorPicker
                  label="Light Beam 1 Color"
                  value={servicesPage.heroLightBeam1Color || "#3b82f6"}
                  onChange={(value: string) =>
                    updateServicesPage("heroLightBeam1Color", value)
                  }
                  description="First light beam color"
                />
                <ColorPicker
                  label="Light Beam 2 Color"
                  value={servicesPage.heroLightBeam2Color || "#93c5fd"}
                  onChange={(value: string) =>
                    updateServicesPage("heroLightBeam2Color", value)
                  }
                  description="Second light beam color"
                />
              </div>
            </div>

            {/* Service Categories Background */}
            <div className="bg-indigo-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-indigo-800 mb-4 flex items-center gap-2">
                🎯 Service Categories Background
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Categories Background Color"
                  value={servicesPage.serviceCategoriesBgColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateServicesPage("serviceCategoriesBgColor", value)
                  }
                  description="Service categories section background"
                />
                <ColorPicker
                  label="Categories Gradient From"
                  value={servicesPage.serviceCategoriesBgColorFrom || "#ffffff"}
                  onChange={(value: string) =>
                    updateServicesPage("serviceCategoriesBgColorFrom", value)
                  }
                  description="Categories background gradient start"
                />
                <ColorPicker
                  label="Categories Gradient To"
                  value={servicesPage.serviceCategoriesBgColorTo || "#ffffff"}
                  onChange={(value: string) =>
                    updateServicesPage("serviceCategoriesBgColorTo", value)
                  }
                  description="Categories background gradient end"
                />
                <TextInput
                  label="Gradient Opacity"
                  value={
                    servicesPage.serviceCategoriesGradientOpacity?.toString() ||
                    "0.7"
                  }
                  onChange={(value: string) =>
                    updateServicesPage(
                      "serviceCategoriesGradientOpacity",
                      parseFloat(value)
                    )
                  }
                  placeholder="0.7"
                  icon="🎨"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Service Categories */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("categories")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📂</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-blue-800">
                Service Categories
              </h3>
              <p className="text-sm text-blue-600">
                Configure service category cards, individual services, and
                styling
              </p>
            </div>
          </div>
          <div
            className={`transform transition-transform ${
              expandedSections.categories ? "rotate-180" : ""
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

        {expandedSections.categories && (
          <div className="p-6 space-y-6">
            {/* Category Card Styling */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-blue-800 mb-4 flex items-center gap-2">
                🎨 Category Card Styling
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Card Title Color"
                  value={
                    servicesPage.serviceCategoryCardTitleColor || "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateServicesPage("serviceCategoryCardTitleColor", value)
                  }
                  description="Category card title color"
                />
                <ColorPicker
                  label="Card Description Color"
                  value={
                    servicesPage.serviceCategoryCardDescriptionColor ||
                    "#0342c2"
                  }
                  onChange={(value: string) =>
                    updateServicesPage(
                      "serviceCategoryCardDescriptionColor",
                      value
                    )
                  }
                  description="Category card description color"
                />
                <ColorPicker
                  label="Card Border Color"
                  value={
                    servicesPage.serviceCategoryCardBorderColor || "#e5e7eb"
                  }
                  onChange={(value: string) =>
                    updateServicesPage("serviceCategoryCardBorderColor", value)
                  }
                  description="Category card border color"
                />
                <ColorPicker
                  label="Card Button Color"
                  value={
                    servicesPage.serviceCategoryCardButtonColor || "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateServicesPage("serviceCategoryCardButtonColor", value)
                  }
                  description="Category card button text color"
                />
                <ColorPicker
                  label="Card Button Background"
                  value={
                    servicesPage.serviceCategoryCardButtonBgColor ||
                    "rgba(255, 255, 255, 0.1)"
                  }
                  onChange={(value: string) =>
                    updateServicesPage(
                      "serviceCategoryCardButtonBgColor",
                      value
                    )
                  }
                  description="Category card button background"
                />
                <ColorPicker
                  label="Card Button Hover Background"
                  value={
                    servicesPage.serviceCategoryCardButtonHoverBgColor ||
                    "#2ba99f"
                  }
                  onChange={(value: string) =>
                    updateServicesPage(
                      "serviceCategoryCardButtonHoverBgColor",
                      value
                    )
                  }
                  description="Category card button hover background"
                />
                <ColorPicker
                  label="Card Button Hover Color"
                  value={
                    servicesPage.serviceCategoryCardButtonHoverColor ||
                    "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateServicesPage(
                      "serviceCategoryCardButtonHoverColor",
                      value
                    )
                  }
                  description="Category card button hover text color"
                />
              </div>
            </div>

            {/* Service Categories List */}
            <div className="bg-indigo-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-indigo-800 mb-4 flex items-center gap-2">
                📋 Service Categories Configuration
              </h4>
              <div className="space-y-6">
                {servicesPage.serviceCategories?.map(
                  (category: any, categoryIndex: number) => (
                    <div
                      key={categoryIndex}
                      className="bg-white rounded-lg p-6 border border-gray-200"
                    >
                      <h5 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-lg">🏷️</span>
                        Category {categoryIndex + 1}:{" "}
                        {category.title || "Untitled"}
                      </h5>

                      {/* Category Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <TextInput
                          label="Category Title"
                          value={category.title || ""}
                          onChange={(value: string) =>
                            updateServiceCategory(categoryIndex, "title", value)
                          }
                          placeholder="Collision Services"
                          icon="📝"
                        />
                        <TextInput
                          label="Category ID"
                          value={category.id || ""}
                          onChange={(value: string) =>
                            updateServiceCategory(categoryIndex, "id", value)
                          }
                          placeholder="collision"
                          icon="🆔"
                        />
                        <div className="md:col-span-2">
                          <TextInput
                            label="Description"
                            value={category.description || ""}
                            onChange={(value: string) =>
                              updateServiceCategory(
                                categoryIndex,
                                "description",
                                value
                              )
                            }
                            placeholder="Complete collision repair services to restore your vehicle to pre-accident condition"
                            icon="💬"
                          />
                        </div>
                        <TextInput
                          label="Background Image"
                          value={category.bgImage || ""}
                          onChange={(value: string) =>
                            updateServiceCategory(
                              categoryIndex,
                              "bgImage",
                              value
                            )
                          }
                          placeholder="collision-repair.jpg"
                          icon="🖼️"
                        />
                        <TextInput
                          label="Icon"
                          value={category.icon || ""}
                          onChange={(value: string) =>
                            updateServiceCategory(categoryIndex, "icon", value)
                          }
                          placeholder="WrenchScrewdriverIcon"
                          icon="🔧"
                        />
                      </div>

                      {/* Category Styling */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h6 className="font-medium text-gray-700 mb-3">
                          Category Styling
                        </h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ColorPicker
                            label="Title Color"
                            value={category.titleColor || "#ffffff"}
                            onChange={(value: string) =>
                              updateServiceCategory(
                                categoryIndex,
                                "titleColor",
                                value
                              )
                            }
                            description="Category title color"
                          />
                          <ColorPicker
                            label="Description Color"
                            value={category.descriptionColor || "#ffffff"}
                            onChange={(value: string) =>
                              updateServiceCategory(
                                categoryIndex,
                                "descriptionColor",
                                value
                              )
                            }
                            description="Category description color"
                          />
                          <ColorPicker
                            label="Icon Color"
                            value={category.iconColor || "#ffffff"}
                            onChange={(value: string) =>
                              updateServiceCategory(
                                categoryIndex,
                                "iconColor",
                                value
                              )
                            }
                            description="Category icon color"
                          />
                          <ColorPicker
                            label="Border Color"
                            value={category.borderColor || "#1e40af"}
                            onChange={(value: string) =>
                              updateServiceCategory(
                                categoryIndex,
                                "borderColor",
                                value
                              )
                            }
                            description="Category border color"
                          />
                          <TextInput
                            label="Color Gradient"
                            value={category.color || ""}
                            onChange={(value: string) =>
                              updateServiceCategory(
                                categoryIndex,
                                "color",
                                value
                              )
                            }
                            placeholder="#1e40af-#3b82f6"
                            icon="🎨"
                          />
                        </div>
                      </div>

                      {/* Individual Services */}
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h6 className="font-medium text-blue-700 mb-3 flex items-center gap-2">
                          <span>🛠️</span>
                          Individual Services ({category.services?.length || 0})
                        </h6>
                        <div className="space-y-4">
                          {category.services?.map(
                            (service: any, serviceIndex: number) => (
                              <div
                                key={serviceIndex}
                                className="bg-white rounded-md p-4 border"
                              >
                                <div className="font-medium text-gray-600 mb-3">
                                  Service {serviceIndex + 1}:{" "}
                                  {service.title || "Untitled"}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <TextInput
                                    label="Service Title"
                                    value={service.title || ""}
                                    onChange={(value: string) =>
                                      updateCategoryService(
                                        categoryIndex,
                                        serviceIndex,
                                        "title",
                                        value
                                      )
                                    }
                                    placeholder="Collision Repair"
                                    icon="📝"
                                  />
                                  <TextInput
                                    label="Service Icon"
                                    value={service.icon || ""}
                                    onChange={(value: string) =>
                                      updateCategoryService(
                                        categoryIndex,
                                        serviceIndex,
                                        "icon",
                                        value
                                      )
                                    }
                                    placeholder="WrenchScrewdriverIcon"
                                    icon="🔧"
                                  />
                                  <div className="md:col-span-2">
                                    <TextInput
                                      label="Description"
                                      value={service.description || ""}
                                      onChange={(value: string) =>
                                        updateCategoryService(
                                          categoryIndex,
                                          serviceIndex,
                                          "description",
                                          value
                                        )
                                      }
                                      placeholder="Expert repair for all types of collision damage..."
                                      icon="💬"
                                    />
                                  </div>
                                  <ColorPicker
                                    label="Icon Color"
                                    value={service.iconColor || "#3b82f6"}
                                    onChange={(value: string) =>
                                      updateCategoryService(
                                        categoryIndex,
                                        serviceIndex,
                                        "iconColor",
                                        value
                                      )
                                    }
                                    description="Service icon color"
                                  />
                                  <ColorPicker
                                    label="Title Color"
                                    value={service.titleColor || "#111827"}
                                    onChange={(value: string) =>
                                      updateCategoryService(
                                        categoryIndex,
                                        serviceIndex,
                                        "titleColor",
                                        value
                                      )
                                    }
                                    description="Service title color"
                                  />
                                  <ColorPicker
                                    label="Description Color"
                                    value={
                                      service.descriptionColor || "#6b7280"
                                    }
                                    onChange={(value: string) =>
                                      updateCategoryService(
                                        categoryIndex,
                                        serviceIndex,
                                        "descriptionColor",
                                        value
                                      )
                                    }
                                    description="Service description color"
                                  />
                                  <ColorPicker
                                    label="Background Color"
                                    value={service.bgColor || "#f9fafb"}
                                    onChange={(value: string) =>
                                      updateCategoryService(
                                        categoryIndex,
                                        serviceIndex,
                                        "bgColor",
                                        value
                                      )
                                    }
                                    description="Service background color"
                                  />
                                  <ColorPicker
                                    label="Border Color"
                                    value={service.borderColor || "#e5e7eb"}
                                    onChange={(value: string) =>
                                      updateCategoryService(
                                        categoryIndex,
                                        serviceIndex,
                                        "borderColor",
                                        value
                                      )
                                    }
                                    description="Service border color"
                                  />
                                </div>
                              </div>
                            )
                          ) || (
                            <p className="text-gray-500 italic text-sm">
                              No services configured for this category
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                ) || (
                  <p className="text-gray-500 italic">
                    No service categories configured
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button
          onClick={() => toggleSection("cta")}
          className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📢</span>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-green-800">
                Call to Action Section
              </h3>
              <p className="text-sm text-green-600">
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

        {expandedSections.cta && (
          <div className="p-6 space-y-6">
            {/* CTA Background */}
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-green-800 mb-4 flex items-center gap-2">
                🎨 CTA Background & Styling
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Background Gradient From"
                  value={servicesPage.ctaBgGradientFrom || "#1e40af"}
                  onChange={(value: string) =>
                    updateServicesPage("ctaBgGradientFrom", value)
                  }
                  description="CTA background gradient start"
                />
                <ColorPicker
                  label="Background Gradient Via"
                  value={servicesPage.ctaBgGradientVia || "#3b82f6"}
                  onChange={(value: string) =>
                    updateServicesPage("ctaBgGradientVia", value)
                  }
                  description="CTA background gradient middle"
                />
                <ColorPicker
                  label="Background Gradient To"
                  value={servicesPage.ctaBgGradientTo || "#2563eb"}
                  onChange={(value: string) =>
                    updateServicesPage("ctaBgGradientTo", value)
                  }
                  description="CTA background gradient end"
                />
                <ColorPicker
                  label="Background Pattern Color"
                  value={servicesPage.ctaBgPatternColor || "#ffffff60"}
                  onChange={(value: string) =>
                    updateServicesPage("ctaBgPatternColor", value)
                  }
                  description="CTA background pattern color"
                />
                <ColorPicker
                  label="CTA Card Background"
                  value={servicesPage.ctaCardBgColor || "#ffffff2f"}
                  onChange={(value: string) =>
                    updateServicesPage("ctaCardBgColor", value)
                  }
                  description="CTA card background color"
                />
                <ColorPicker
                  label="CTA Card Border"
                  value={servicesPage.ctaCardBorderColor || "#ffffff20"}
                  onChange={(value: string) =>
                    updateServicesPage("ctaCardBorderColor", value)
                  }
                  description="CTA card border color"
                />
              </div>
            </div>

            {/* CTA Content */}
            <div className="bg-emerald-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                📝 CTA Content
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="CTA Title"
                  value={servicesPage.ctaTitle || ""}
                  onChange={(value: string) =>
                    updateServicesPage("ctaTitle", value)
                  }
                  placeholder="Ready to Get Your Car Back to Perfect?"
                  icon="📋"
                />
                <ColorPicker
                  label="Title Color"
                  value={servicesPage.ctaTitleColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateServicesPage("ctaTitleColor", value)
                  }
                  description="CTA title color"
                />
                <div className="md:col-span-2">
                  <TextInput
                    label="CTA Description"
                    value={servicesPage.ctaDescription || ""}
                    onChange={(value: string) =>
                      updateServicesPage("ctaDescription", value)
                    }
                    placeholder="Schedule your appointment today and experience the difference expert auto body repair makes."
                    icon="💬"
                  />
                </div>
                <ColorPicker
                  label="Description Color"
                  value={servicesPage.ctaDescriptionColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateServicesPage("ctaDescriptionColor", value)
                  }
                  description="CTA description color"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="bg-teal-50 rounded-xl p-6">
              <h4 className="text-md font-semibold text-teal-800 mb-4 flex items-center gap-2">
                🔘 CTA Buttons
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Schedule Button Text"
                  value={servicesPage.scheduleButtonText || ""}
                  onChange={(value: string) =>
                    updateServicesPage("scheduleButtonText", value)
                  }
                  placeholder="Schedule Now"
                  icon="📅"
                />
                <ColorPicker
                  label="Schedule Button Background"
                  value={servicesPage.scheduleButtonBgColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateServicesPage("scheduleButtonBgColor", value)
                  }
                  description="Schedule button background"
                />
                <ColorPicker
                  label="Schedule Button Text Color"
                  value={servicesPage.scheduleButtonTextColor || "#1e40af"}
                  onChange={(value: string) =>
                    updateServicesPage("scheduleButtonTextColor", value)
                  }
                  description="Schedule button text color"
                />
                <ColorPicker
                  label="Schedule Button Hover Background"
                  value={servicesPage.scheduleButtonHoverBgColor || "#f3f4f6"}
                  onChange={(value: string) =>
                    updateServicesPage("scheduleButtonHoverBgColor", value)
                  }
                  description="Schedule button hover background"
                />
                <TextInput
                  label="Call Button Text"
                  value={servicesPage.callButtonText || ""}
                  onChange={(value: string) =>
                    updateServicesPage("callButtonText", value)
                  }
                  placeholder="Call Us Now"
                  icon="📞"
                />
                <ColorPicker
                  label="Call Button Background"
                  value={servicesPage.callButtonBgColor || "#1e40af"}
                  onChange={(value: string) =>
                    updateServicesPage("callButtonBgColor", value)
                  }
                  description="Call button background"
                />
                <ColorPicker
                  label="Call Button Text Color"
                  value={servicesPage.callButtonTextColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateServicesPage("callButtonTextColor", value)
                  }
                  description="Call button text color"
                />
                <ColorPicker
                  label="Call Button Hover Background"
                  value={servicesPage.callButtonHoverBgColor || "#1d4ed8"}
                  onChange={(value: string) =>
                    updateServicesPage("callButtonHoverBgColor", value)
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
