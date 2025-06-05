"use client";

import React, { useState } from "react";
import { ColorPicker, TextInput } from "../ui";

interface HomePageSectionProps {
  config: any;
  updateConfig: (config: any) => void;
}

export function HomePageSection({
  config,
  updateConfig,
}: HomePageSectionProps) {
  const [activeTab, setActiveTab] = useState("hero");

  const updateHomePage = (field: string, value: any) => {
    const newConfig = {
      ...config,
      pages: {
        ...config.pages,
        Home: {
          ...config.pages?.Home,
          [field]: value,
        },
      },
    };
    updateConfig(newConfig);
  };

  const updateScheduleSection = (field: string, value: any) => {
    const newConfig = {
      ...config,
      pages: {
        ...config.pages,
        Home: {
          ...config.pages?.Home,
          scheduleSection: {
            ...config.pages?.Home?.scheduleSection,
            [field]: value,
          },
        },
      },
    };
    updateConfig(newConfig);
  };

  const updateGuaranteeSection = (field: string, value: any) => {
    const newConfig = {
      ...config,
      pages: {
        ...config.pages,
        Home: {
          ...config.pages?.Home,
          guaranteeSection: {
            ...config.pages?.Home?.guaranteeSection,
            [field]: value,
          },
        },
      },
    };
    updateConfig(newConfig);
  };

  const updateServicesSection = (field: string, value: any) => {
    const newConfig = {
      ...config,
      pages: {
        ...config.pages,
        Home: {
          ...config.pages?.Home,
          servicesSection: {
            ...config.pages?.Home?.servicesSection,
            [field]: value,
          },
        },
      },
    };
    updateConfig(newConfig);
  };

  const updateReviewsSection = (field: string, value: any) => {
    const newConfig = {
      ...config,
      pages: {
        ...config.pages,
        Home: {
          ...config.pages?.Home,
          reviewsSection: {
            ...config.pages?.Home?.reviewsSection,
            [field]: value,
          },
        },
      },
    };
    updateConfig(newConfig);
  };

  const homePage = config.pages?.Home || {};

  const tabs = [
    { id: "hero", name: "Hero Section", icon: "🦸" },
    { id: "schedule", name: "Schedule Section", icon: "📅" },
    { id: "guarantee", name: "Guarantee Section", icon: "✅" },
    { id: "services", name: "Services Section", icon: "🔧" },
    { id: "reviews", name: "Reviews Section", icon: "⭐" },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-indigo-200 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🏠</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Home Page Settings
            </h2>
            <p className="text-gray-600">
              Configure your homepage hero, schedule, guarantee, and other
              sections
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-indigo-100 text-indigo-700 border-b-2 border-indigo-500"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "hero" && (
          <div className="space-y-6">
            {/* Hero Basic Settings */}
            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center gap-2">
                🦸 Hero Section
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Badge Text"
                  value={homePage.badge || ""}
                  onChange={(value: string) => updateHomePage("badge", value)}
                  placeholder="Tree Removal Service"
                  icon="🏷️"
                />
                <ColorPicker
                  label="Badge Background"
                  value={homePage.heroBadgeColor || "#f5d6d61e"}
                  onChange={(value: string) =>
                    updateHomePage("heroBadgeColor", value)
                  }
                  description="Badge background color"
                />
                <div className="md:col-span-2">
                  <TextInput
                    label="Main Title"
                    value={homePage.title || ""}
                    onChange={(value: string) => updateHomePage("title", value)}
                    placeholder="Welcome to Davis Tree Removal"
                    icon="📝"
                  />
                </div>
                <TextInput
                  label="Location"
                  value={homePage.location || ""}
                  onChange={(value: string) =>
                    updateHomePage("location", value)
                  }
                  placeholder="Duluth, Georgia"
                  icon="📍"
                />
                <ColorPicker
                  label="Title Color"
                  value={homePage.heroTitleColor || "#000000"}
                  onChange={(value: string) =>
                    updateHomePage("heroTitleColor", value)
                  }
                  description="Main title color"
                />
                <ColorPicker
                  label="Location Color"
                  value={homePage.heroLocationColor || "#e0f2fe"}
                  onChange={(value: string) =>
                    updateHomePage("heroLocationColor", value)
                  }
                  description="Location text color"
                />
                <ColorPicker
                  label="Badge Title Color"
                  value={homePage.heroBadgeTitleColor || "#000000"}
                  onChange={(value: string) =>
                    updateHomePage("heroBadgeTitleColor", value)
                  }
                  description="Badge text color"
                />
                <TextInput
                  label="Subtitle"
                  value={homePage.subtitle2 || ""}
                  onChange={(value: string) =>
                    updateHomePage("subtitle2", value)
                  }
                  placeholder="Quality service description"
                  icon="📄"
                />
                <ColorPicker
                  label="Subtitle Color"
                  value={homePage.heroSubtitleColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateHomePage("heroSubtitleColor", value)
                  }
                  description="Subtitle text color"
                />
              </div>
            </div>

            {/* Hero Background Gradients */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                🎨 Hero Background Gradients
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Gradient Top Color"
                  value={homePage.heroGradientTop || "#66bf9b"}
                  onChange={(value: string) =>
                    updateHomePage("heroGradientTop", value)
                  }
                  description="Top gradient color"
                />
                <ColorPicker
                  label="Gradient Bottom Color"
                  value={homePage.heroGradientBottom || "#66bf9b"}
                  onChange={(value: string) =>
                    updateHomePage("heroGradientBottom", value)
                  }
                  description="Bottom gradient color"
                />
                <TextInput
                  label="Hero Image"
                  value={homePage.heroImage || ""}
                  onChange={(value: string) =>
                    updateHomePage("heroImage", value)
                  }
                  placeholder="auto1.png"
                  icon="🖼️"
                />
                <TextInput
                  label="Hero Mobile Image"
                  value={homePage.heroMobileImage || ""}
                  onChange={(value: string) =>
                    updateHomePage("heroMobileImage", value)
                  }
                  placeholder="auto-mobile.png"
                  icon="📱"
                  description="Separate image optimized for mobile devices"
                />
              </div>
            </div>

            {/* Hero Buttons */}
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                🔘 Hero Buttons
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Schedule Button Text"
                  value={homePage.scheduleButtonText || "Schedule Now"}
                  onChange={(value: string) =>
                    updateHomePage("scheduleButtonText", value)
                  }
                  placeholder="Schedule Now"
                  icon="📅"
                />
                <ColorPicker
                  label="Schedule Button Color"
                  value={homePage.heroScheduleButtonColor || "#3d725d"}
                  onChange={(value: string) =>
                    updateHomePage("heroScheduleButtonColor", value)
                  }
                  description="Schedule button background"
                />
                <ColorPicker
                  label="Schedule Button Text"
                  value={homePage.heroScheduleButtonTextColor || "#000000"}
                  onChange={(value: string) =>
                    updateHomePage("heroScheduleButtonTextColor", value)
                  }
                  description="Schedule button text color"
                />
                <ColorPicker
                  label="Schedule Button Hover"
                  value={homePage.heroScheduleButtonHoverColor || "#2d5a47"}
                  onChange={(value: string) =>
                    updateHomePage("heroScheduleButtonHoverColor", value)
                  }
                  description="Schedule button hover background"
                />
                <TextInput
                  label="Contact Button Text"
                  value={homePage.contactButtonText || "Contact Us"}
                  onChange={(value: string) =>
                    updateHomePage("contactButtonText", value)
                  }
                  placeholder="Contact Us"
                  icon="📞"
                />
                <ColorPicker
                  label="Contact Button Color"
                  value={homePage.heroContactButtonColor || "#ff000000"}
                  onChange={(value: string) =>
                    updateHomePage("heroContactButtonColor", value)
                  }
                  description="Contact button background"
                />
                <ColorPicker
                  label="Contact Button Text"
                  value={homePage.heroContactButtonTextColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateHomePage("heroContactButtonTextColor", value)
                  }
                  description="Contact button text color"
                />
                <ColorPicker
                  label="Contact Button Border"
                  value={homePage.heroContactButtonBorderColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateHomePage("heroContactButtonBorderColor", value)
                  }
                  description="Contact button border color"
                />
                <ColorPicker
                  label="Contact Button Hover Color"
                  value={homePage.heroContactButtonHoverColor || "#ffffff20"}
                  onChange={(value: string) =>
                    updateHomePage("heroContactButtonHoverColor", value)
                  }
                  description="Contact button hover background"
                />
                <ColorPicker
                  label="Contact Button Hover Text"
                  value={homePage.heroContactButtonHoverTextColor || "#000000"}
                  onChange={(value: string) =>
                    updateHomePage("heroContactButtonHoverTextColor", value)
                  }
                  description="Contact button hover text color"
                />
                <ColorPicker
                  label="Contact Button Hover Border"
                  value={
                    homePage.heroContactButtonHoverBorderColor || "#000000"
                  }
                  onChange={(value: string) =>
                    updateHomePage("heroContactButtonHoverBorderColor", value)
                  }
                  description="Contact button hover border color"
                />
              </div>
            </div>

            {/* Hero Cards/Boxes */}
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                🎴 Hero Feature Cards
              </h3>

              {/* Card 1 */}
              <div className="mb-6 p-4 bg-white rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-700 mb-3">
                  Card 1 Settings
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <TextInput
                    label="Card 1 Text"
                    value={homePage.heroCard1Text || "*Free Estimates"}
                    onChange={(value: string) =>
                      updateHomePage("heroCard1Text", value)
                    }
                    placeholder="*Free Estimates"
                    icon="💬"
                  />
                  <ColorPicker
                    label="Background"
                    value={homePage.heroBox1BgColor || "#66bf9b1f"}
                    onChange={(value: string) =>
                      updateHomePage("heroBox1BgColor", value)
                    }
                    description="Card 1 background"
                  />
                  <ColorPicker
                    label="Text Color"
                    value={homePage.heroBox1TextColor || "#ffffff"}
                    onChange={(value: string) =>
                      updateHomePage("heroBox1TextColor", value)
                    }
                    description="Card 1 text color"
                  />
                  <ColorPicker
                    label="Border Color"
                    value={homePage.heroBox1BorderColor || "#66bf9b"}
                    onChange={(value: string) =>
                      updateHomePage("heroBox1BorderColor", value)
                    }
                    description="Card 1 border"
                  />
                  <ColorPicker
                    label="Icon Background"
                    value={homePage.heroBox1IconBgColor || "#7fd1b6"}
                    onChange={(value: string) =>
                      updateHomePage("heroBox1IconBgColor", value)
                    }
                    description="Icon background"
                  />
                  <ColorPicker
                    label="Icon Color"
                    value={homePage.heroBox1IconColor || "#000000"}
                    onChange={(value: string) =>
                      updateHomePage("heroBox1IconColor", value)
                    }
                    description="Icon color"
                  />
                </div>
              </div>

              {/* Card 2 */}
              <div className="mb-6 p-4 bg-white rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-700 mb-3">
                  Card 2 Settings
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <TextInput
                    label="Card 2 Text"
                    value={homePage.heroCard2Text || "Licensed"}
                    onChange={(value: string) =>
                      updateHomePage("heroCard2Text", value)
                    }
                    placeholder="Licensed"
                    icon="💬"
                  />
                  <ColorPicker
                    label="Background"
                    value={homePage.heroBox2BgColor || "#66bf9b1f"}
                    onChange={(value: string) =>
                      updateHomePage("heroBox2BgColor", value)
                    }
                    description="Card 2 background"
                  />
                  <ColorPicker
                    label="Text Color"
                    value={homePage.heroBox2TextColor || "#ffffff"}
                    onChange={(value: string) =>
                      updateHomePage("heroBox2TextColor", value)
                    }
                    description="Card 2 text color"
                  />
                  <ColorPicker
                    label="Border Color"
                    value={homePage.heroBox2BorderColor || "#66bf9b"}
                    onChange={(value: string) =>
                      updateHomePage("heroBox2BorderColor", value)
                    }
                    description="Card 2 border"
                  />
                  <ColorPicker
                    label="Icon Background"
                    value={homePage.heroBox2IconBgColor || "#7fd1b6"}
                    onChange={(value: string) =>
                      updateHomePage("heroBox2IconBgColor", value)
                    }
                    description="Icon background"
                  />
                  <ColorPicker
                    label="Icon Color"
                    value={homePage.heroBox2IconColor || "#000000"}
                    onChange={(value: string) =>
                      updateHomePage("heroBox2IconColor", value)
                    }
                    description="Icon color"
                  />
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-4 bg-white rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-700 mb-3">
                  Card 3 Settings
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <TextInput
                    label="Card 3 Text"
                    value={homePage.heroCard3Text || "Fast Removal"}
                    onChange={(value: string) =>
                      updateHomePage("heroCard3Text", value)
                    }
                    placeholder="Fast Removal"
                    icon="💬"
                  />
                  <ColorPicker
                    label="Background"
                    value={homePage.heroBox3BgColor || "#66bf9b1f"}
                    onChange={(value: string) =>
                      updateHomePage("heroBox3BgColor", value)
                    }
                    description="Card 3 background"
                  />
                  <ColorPicker
                    label="Text Color"
                    value={homePage.heroBox3TextColor || "#ffffff"}
                    onChange={(value: string) =>
                      updateHomePage("heroBox3TextColor", value)
                    }
                    description="Card 3 text color"
                  />
                  <ColorPicker
                    label="Border Color"
                    value={homePage.heroBox3BorderColor || "#66bf9b"}
                    onChange={(value: string) =>
                      updateHomePage("heroBox3BorderColor", value)
                    }
                    description="Card 3 border"
                  />
                  <ColorPicker
                    label="Icon Background"
                    value={homePage.heroBox3IconBgColor || "#7fd1b6"}
                    onChange={(value: string) =>
                      updateHomePage("heroBox3IconBgColor", value)
                    }
                    description="Icon background"
                  />
                  <ColorPicker
                    label="Icon Color"
                    value={homePage.heroBox3IconColor || "#000000"}
                    onChange={(value: string) =>
                      updateHomePage("heroBox3IconColor", value)
                    }
                    description="Icon color"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="space-y-6">
            {/* Schedule Section Basic */}
            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
                📅 Schedule Section
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <TextInput
                    label="Section Title"
                    value={homePage.scheduleSection?.scheduleSectionTitle || ""}
                    onChange={(value: string) =>
                      updateScheduleSection("scheduleSectionTitle", value)
                    }
                    placeholder="REQUEST A FREE ESTIMATE BELOW"
                    icon="📋"
                  />
                </div>
                <ColorPicker
                  label="Title Color"
                  value={
                    homePage.scheduleSection?.scheduleSectionTitleColor ||
                    "#53a584"
                  }
                  onChange={(value: string) =>
                    updateScheduleSection("scheduleSectionTitleColor", value)
                  }
                  description="Section title color"
                />
                <TextInput
                  label="Calendly URL"
                  value={homePage.scheduleSection?.calendlyUrl || ""}
                  onChange={(value: string) =>
                    updateScheduleSection("calendlyUrl", value)
                  }
                  placeholder="https://calendly.com/your-link"
                  icon="🔗"
                />
              </div>
            </div>

            {/* Schedule Icon Settings */}
            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center gap-2">
                🕒 Schedule Icon Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Icon Image"
                  value={homePage.scheduleSection?.scheduleIconImage || ""}
                  onChange={(value: string) =>
                    updateScheduleSection("scheduleIconImage", value)
                  }
                  placeholder="calendar.png"
                  icon="🖼️"
                  description="Icon file in /public/images/ folder"
                />
                <ColorPicker
                  label="Icon Background Color"
                  value={
                    homePage.scheduleSection?.scheduleIconBgColor || "#3b82f6"
                  }
                  onChange={(value: string) =>
                    updateScheduleSection("scheduleIconBgColor", value)
                  }
                  description="Background color of the icon circle"
                />
                <ColorPicker
                  label="Icon Color"
                  value={
                    homePage.scheduleSection?.scheduleIconColor || "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateScheduleSection("scheduleIconColor", value)
                  }
                  description="Color of the icon (if using icon font)"
                />
              </div>
            </div>

            {/* Schedule Content Settings */}
            <div className="bg-emerald-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                📝 Schedule Content Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Booking Title"
                  value={homePage.scheduleSection?.bookingTitle || ""}
                  onChange={(value: string) =>
                    updateScheduleSection("bookingTitle", value)
                  }
                  placeholder="Schedule Your Auto Estimate"
                  icon="📅"
                />
                <ColorPicker
                  label="Booking Title Color"
                  value={
                    homePage.scheduleSection?.bookingTitleColor || "#1e40af"
                  }
                  onChange={(value: string) =>
                    updateScheduleSection("bookingTitleColor", value)
                  }
                  description="Color of the main booking title"
                />
                <TextInput
                  label="Schedule Title Part 1"
                  value={homePage.scheduleSection?.scheduleTitlePart1 || ""}
                  onChange={(value: string) =>
                    updateScheduleSection("scheduleTitlePart1", value)
                  }
                  placeholder="Book your appointment with our "
                  icon="📝"
                />
                <ColorPicker
                  label="Title Part 1 Color"
                  value={
                    homePage.scheduleSection?.scheduleTitlePart1Color ||
                    "#111827"
                  }
                  onChange={(value: string) =>
                    updateScheduleSection("scheduleTitlePart1Color", value)
                  }
                  description="Color of the first part of the title"
                />
                <TextInput
                  label="Schedule Title Part 2"
                  value={homePage.scheduleSection?.scheduleTitlePart2 || ""}
                  onChange={(value: string) =>
                    updateScheduleSection("scheduleTitlePart2", value)
                  }
                  placeholder="expert technicians"
                  icon="📝"
                />
                <ColorPicker
                  label="Title Part 2 Color"
                  value={
                    homePage.scheduleSection?.scheduleTitlePart2Color ||
                    "#1e40af"
                  }
                  onChange={(value: string) =>
                    updateScheduleSection("scheduleTitlePart2Color", value)
                  }
                  description="Color of the highlighted part of the title"
                />
                <TextInput
                  label="Schedule Address"
                  value={homePage.scheduleSection?.scheduleAddress || ""}
                  onChange={(value: string) =>
                    updateScheduleSection("scheduleAddress", value)
                  }
                  placeholder="2785 Buford Hwy Ste 101-C, Duluth, GA 30096"
                  icon="📍"
                />
                <ColorPicker
                  label="Address Color"
                  value={
                    homePage.scheduleSection?.scheduleAddressColor || "#6b7280"
                  }
                  onChange={(value: string) =>
                    updateScheduleSection("scheduleAddressColor", value)
                  }
                  description="Color of the address text"
                />
                <div className="md:col-span-2">
                  <TextInput
                    label="Schedule Content"
                    value={homePage.scheduleSection?.scheduleContent || ""}
                    onChange={(value: string) =>
                      updateScheduleSection("scheduleContent", value)
                    }
                    placeholder="We'll get your vehicle back to its best condition with professional collision repair services."
                    icon="💬"
                    description="Descriptive text about the scheduling process"
                  />
                </div>
                <ColorPicker
                  label="Content Color"
                  value={
                    homePage.scheduleSection?.scheduleContentColor || "#6b7280"
                  }
                  onChange={(value: string) =>
                    updateScheduleSection("scheduleContentColor", value)
                  }
                  description="Color of the content description text"
                />
              </div>
            </div>

            {/* Calendar Settings */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                🗓️ Calendar Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Calendar Background"
                  value={homePage.scheduleSection?.calendarBgColor || "#ffffff"}
                  onChange={(value: string) =>
                    updateScheduleSection("calendarBgColor", value)
                  }
                  description="Calendar background color"
                />
                <ColorPicker
                  label="Calendar Border"
                  value={
                    homePage.scheduleSection?.calendarBorderColor || "#99dac0"
                  }
                  onChange={(value: string) =>
                    updateScheduleSection("calendarBorderColor", value)
                  }
                  description="Calendar border color"
                />
                <ColorPicker
                  label="Calendar Accent"
                  value={
                    homePage.scheduleSection?.calendarAccentColor || "#7dae99"
                  }
                  onChange={(value: string) =>
                    updateScheduleSection("calendarAccentColor", value)
                  }
                  description="Calendar accent color"
                />
                <ColorPicker
                  label="Ripple Start Color"
                  value={
                    homePage.scheduleSection?.calendarRippleStartColor ||
                    "#9ddac0"
                  }
                  onChange={(value: string) =>
                    updateScheduleSection("calendarRippleStartColor", value)
                  }
                  description="Calendar ripple start color"
                />
                <ColorPicker
                  label="Ripple End Color"
                  value={
                    homePage.scheduleSection?.calendarRippleEndColor ||
                    "#a3d8c3"
                  }
                  onChange={(value: string) =>
                    updateScheduleSection("calendarRippleEndColor", value)
                  }
                  description="Calendar ripple end color"
                />
                <TextInput
                  label="Calendar Month"
                  value={homePage.scheduleSection?.calendarMonth || ""}
                  onChange={(value: string) =>
                    updateScheduleSection("calendarMonth", value)
                  }
                  placeholder="AUGUST"
                  icon="📅"
                />
                <TextInput
                  label="Calendar Year"
                  value={homePage.scheduleSection?.calendarYear || ""}
                  onChange={(value: string) =>
                    updateScheduleSection("calendarYear", value)
                  }
                  placeholder="2024"
                  icon="📅"
                />
              </div>
            </div>

            {/* Schedule Background Gradients */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                🎨 Schedule Background Gradients
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Gradient Top Color"
                  value={
                    homePage.scheduleSection?.scheduleGradientTop || "#ceffec"
                  }
                  onChange={(value: string) =>
                    updateScheduleSection("scheduleGradientTop", value)
                  }
                  description="Schedule section gradient top"
                />
                <ColorPicker
                  label="Gradient Bottom Color"
                  value={
                    homePage.scheduleSection?.scheduleGradientBottom ||
                    "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateScheduleSection("scheduleGradientBottom", value)
                  }
                  description="Schedule section gradient bottom"
                />
                <ColorPicker
                  label="Section Badge Background"
                  value={
                    homePage.scheduleSection?.scheduleSectionBadgeColor ||
                    "#f5d6d636"
                  }
                  onChange={(value: string) =>
                    updateScheduleSection("scheduleSectionBadgeColor", value)
                  }
                  description="Badge background color"
                />
                <ColorPicker
                  label="Section Badge Text"
                  value={
                    homePage.scheduleSection?.scheduleSectionBadgeTextColor ||
                    "#387e62"
                  }
                  onChange={(value: string) =>
                    updateScheduleSection(
                      "scheduleSectionBadgeTextColor",
                      value
                    )
                  }
                  description="Badge text color"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "guarantee" && (
          <div className="space-y-6">
            {/* Guarantee Section */}
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                ✅ Guarantee Section
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Section Title"
                  value={homePage.guaranteeSection?.guaranteeTitle || ""}
                  onChange={(value: string) =>
                    updateGuaranteeSection("guaranteeTitle", value)
                  }
                  placeholder="Our Guarantee"
                  icon="🏆"
                />
                <ColorPicker
                  label="Badge Color"
                  value={
                    homePage.guaranteeSection?.guaranteeBadgeColor ||
                    "#c9f5c9ec"
                  }
                  onChange={(value: string) =>
                    updateGuaranteeSection("guaranteeBadgeColor", value)
                  }
                  description="Badge background color"
                />
              </div>
            </div>

            {/* Guarantee Background Gradients */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                🎨 Guarantee Background Gradients
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Background Gradient Top"
                  value={
                    homePage.guaranteeSection?.guaranteeBgGradientTop ||
                    "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateGuaranteeSection("guaranteeBgGradientTop", value)
                  }
                  description="Guarantee section gradient top"
                />
                <ColorPicker
                  label="Background Gradient Bottom"
                  value={
                    homePage.guaranteeSection?.guaranteeBgGradientBottom ||
                    "#f0f9ff"
                  }
                  onChange={(value: string) =>
                    updateGuaranteeSection("guaranteeBgGradientBottom", value)
                  }
                  description="Guarantee section gradient bottom"
                />
                <ColorPicker
                  label="Badge Text Color"
                  value={
                    homePage.guaranteeSection?.guaranteeBadgeTextColor ||
                    "#000000"
                  }
                  onChange={(value: string) =>
                    updateGuaranteeSection("guaranteeBadgeTextColor", value)
                  }
                  description="Badge text color"
                />
              </div>
            </div>

            {/* Guarantee Items */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                🛡️ Guarantee Items
              </h3>

              {/* Item 1 */}
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">Item 1</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    label="Icon 1"
                    value={homePage.guaranteeSection?.guaranteeIcon1 || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeIcon1", value)
                    }
                    placeholder="shield.png"
                    icon="🖼️"
                  />
                  <TextInput
                    label="Title 1"
                    value={homePage.guaranteeSection?.guaranteeTitle1 || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeTitle1", value)
                    }
                    placeholder="Lifetime Warranty"
                    icon="📝"
                  />
                  <TextInput
                    label="Subtitle 1"
                    value={homePage.guaranteeSection?.guaranteeSubtitle1 || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeSubtitle1", value)
                    }
                    placeholder="On All Services"
                    icon="📝"
                  />
                  <ColorPicker
                    label="Icon Background 1"
                    value={
                      homePage.guaranteeSection?.guaranteeIconBgColor1 ||
                      "#ffffff"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeIconBgColor1", value)
                    }
                    description="Icon background color"
                  />
                  <ColorPicker
                    label="Icon Border 1"
                    value={
                      homePage.guaranteeSection?.guaranteeIconBorderColor1 ||
                      "#dbeafe"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeIconBorderColor1", value)
                    }
                    description="Icon border color"
                  />
                  <ColorPicker
                    label="Title Color 1"
                    value={
                      homePage.guaranteeSection?.guaranteeTitleTextColor1 ||
                      "#111827"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeTitleTextColor1", value)
                    }
                    description="Title text color"
                  />
                  <ColorPicker
                    label="Subtitle Color 1"
                    value={
                      homePage.guaranteeSection?.guaranteeSubtitleTextColor1 ||
                      "#6b7280"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection(
                        "guaranteeSubtitleTextColor1",
                        value
                      )
                    }
                    description="Subtitle text color"
                  />
                </div>
              </div>

              {/* Item 2 */}
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">Item 2</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    label="Icon 2"
                    value={homePage.guaranteeSection?.guaranteeIcon2 || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeIcon2", value)
                    }
                    placeholder="estimate.png"
                    icon="🖼️"
                  />
                  <TextInput
                    label="Title 2"
                    value={homePage.guaranteeSection?.guaranteeTitle2 || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeTitle2", value)
                    }
                    placeholder="Free Estimates"
                    icon="📝"
                  />
                  <TextInput
                    label="Subtitle 2"
                    value={homePage.guaranteeSection?.guaranteeSubtitle2 || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeSubtitle2", value)
                    }
                    placeholder="Quick & Accurate"
                    icon="📝"
                  />
                  <ColorPicker
                    label="Icon Background 2"
                    value={
                      homePage.guaranteeSection?.guaranteeIconBgColor2 ||
                      "#ffffff"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeIconBgColor2", value)
                    }
                    description="Icon background color"
                  />
                  <ColorPicker
                    label="Icon Border 2"
                    value={
                      homePage.guaranteeSection?.guaranteeIconBorderColor2 ||
                      "#dbeafe"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeIconBorderColor2", value)
                    }
                    description="Icon border color"
                  />
                  <ColorPicker
                    label="Title Color 2"
                    value={
                      homePage.guaranteeSection?.guaranteeTitleTextColor2 ||
                      "#111827"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeTitleTextColor2", value)
                    }
                    description="Title text color"
                  />
                  <ColorPicker
                    label="Subtitle Color 2"
                    value={
                      homePage.guaranteeSection?.guaranteeSubtitleTextColor2 ||
                      "#6b7280"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection(
                        "guaranteeSubtitleTextColor2",
                        value
                      )
                    }
                    description="Subtitle text color"
                  />
                </div>
              </div>

              {/* Center Logo */}
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Center Logo
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    label="Center Logo"
                    value={homePage.guaranteeSection?.guaranteeCenterLogo || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeCenterLogo", value)
                    }
                    placeholder="ppg-logo.png"
                    icon="🖼️"
                  />
                  <ColorPicker
                    label="Center Background"
                    value={
                      homePage.guaranteeSection?.guaranteeCenterBgColor ||
                      "#ffffff"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeCenterBgColor", value)
                    }
                    description="Center logo background"
                  />
                  <ColorPicker
                    label="Center Border"
                    value={
                      homePage.guaranteeSection?.guaranteeCenterBorderColor ||
                      "#dbeafe"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection(
                        "guaranteeCenterBorderColor",
                        value
                      )
                    }
                    description="Center logo border"
                  />
                </div>
              </div>

              {/* Item 4 */}
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">Item 4</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    label="Icon 4"
                    value={homePage.guaranteeSection?.guaranteeIcon4 || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeIcon4", value)
                    }
                    placeholder="insurance.png"
                    icon="🖼️"
                  />
                  <TextInput
                    label="Title 4"
                    value={homePage.guaranteeSection?.guaranteeTitle4 || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeTitle4", value)
                    }
                    placeholder="Insurance Approved"
                    icon="📝"
                  />
                  <TextInput
                    label="Subtitle 4"
                    value={homePage.guaranteeSection?.guaranteeSubtitle4 || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeSubtitle4", value)
                    }
                    placeholder="All Major & Minor Companies"
                    icon="📝"
                  />
                  <ColorPicker
                    label="Icon Background 4"
                    value={
                      homePage.guaranteeSection?.guaranteeIconBgColor4 ||
                      "#ffffff"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeIconBgColor4", value)
                    }
                    description="Icon background color"
                  />
                  <ColorPicker
                    label="Icon Border 4"
                    value={
                      homePage.guaranteeSection?.guaranteeIconBorderColor4 ||
                      "#dbeafe"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeIconBorderColor4", value)
                    }
                    description="Icon border color"
                  />
                  <ColorPicker
                    label="Title Color 4"
                    value={
                      homePage.guaranteeSection?.guaranteeTitleTextColor4 ||
                      "#111827"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeTitleTextColor4", value)
                    }
                    description="Title text color"
                  />
                  <ColorPicker
                    label="Subtitle Color 4"
                    value={
                      homePage.guaranteeSection?.guaranteeSubtitleTextColor4 ||
                      "#6b7280"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection(
                        "guaranteeSubtitleTextColor4",
                        value
                      )
                    }
                    description="Subtitle text color"
                  />
                </div>
              </div>

              {/* Item 5 */}
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">Item 5</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    label="Icon 5"
                    value={homePage.guaranteeSection?.guaranteeIcon5 || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeIcon5", value)
                    }
                    placeholder="tow-truck.png"
                    icon="🖼️"
                  />
                  <TextInput
                    label="Title 5"
                    value={homePage.guaranteeSection?.guaranteeTitle5 || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeTitle5", value)
                    }
                    placeholder="Towing Service"
                    icon="📝"
                  />
                  <TextInput
                    label="Subtitle 5"
                    value={homePage.guaranteeSection?.guaranteeSubtitle5 || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeSubtitle5", value)
                    }
                    placeholder="24/7 Available"
                    icon="📝"
                  />
                  <ColorPicker
                    label="Icon Background 5"
                    value={
                      homePage.guaranteeSection?.guaranteeIconBgColor5 ||
                      "#ffffff"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeIconBgColor5", value)
                    }
                    description="Icon background color"
                  />
                  <ColorPicker
                    label="Icon Border 5"
                    value={
                      homePage.guaranteeSection?.guaranteeIconBorderColor5 ||
                      "#dbeafe"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeIconBorderColor5", value)
                    }
                    description="Icon border color"
                  />
                  <ColorPicker
                    label="Title Color 5"
                    value={
                      homePage.guaranteeSection?.guaranteeTitleTextColor5 ||
                      "#111827"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeTitleTextColor5", value)
                    }
                    description="Title text color"
                  />
                  <ColorPicker
                    label="Subtitle Color 5"
                    value={
                      homePage.guaranteeSection?.guaranteeSubtitleTextColor5 ||
                      "#6b7280"
                    }
                    onChange={(value: string) =>
                      updateGuaranteeSection(
                        "guaranteeSubtitleTextColor5",
                        value
                      )
                    }
                    description="Subtitle text color"
                  />
                </div>
              </div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                🎯 Guarantee Items
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-emerald-700">Item 1</h4>
                  <TextInput
                    label="Title"
                    value={homePage.guaranteeSection?.guaranteeTitle1 || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeTitle1", value)
                    }
                    placeholder="Lifetime Warranty"
                    icon="1️⃣"
                  />
                  <TextInput
                    label="Subtitle"
                    value={homePage.guaranteeSection?.guaranteeSubtitle1 || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeSubtitle1", value)
                    }
                    placeholder="On All Services"
                    icon="📝"
                  />
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-emerald-700">Item 2</h4>
                  <TextInput
                    label="Title"
                    value={homePage.guaranteeSection?.guaranteeTitle2 || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeTitle2", value)
                    }
                    placeholder="Free Estimates"
                    icon="2️⃣"
                  />
                  <TextInput
                    label="Subtitle"
                    value={homePage.guaranteeSection?.guaranteeSubtitle2 || ""}
                    onChange={(value: string) =>
                      updateGuaranteeSection("guaranteeSubtitle2", value)
                    }
                    placeholder="Quick & Accurate"
                    icon="📝"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="space-y-6">
            {/* Services Section */}
            <div className="bg-cyan-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-cyan-800 mb-4 flex items-center gap-2">
                🔧 Services Section
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Badge Text"
                  value={homePage.servicesSection?.servicesBadgeText || ""}
                  onChange={(value: string) =>
                    updateServicesSection("servicesBadgeText", value)
                  }
                  placeholder="Our Expertise"
                  icon="🏷️"
                />
                <TextInput
                  label="Section Title"
                  value={homePage.servicesSection?.servicesTitle || ""}
                  onChange={(value: string) =>
                    updateServicesSection("servicesTitle", value)
                  }
                  placeholder="Comprehensive Tree"
                  icon="📋"
                />
                <TextInput
                  label="Highlight Text"
                  value={homePage.servicesSection?.servicesHighlightText || ""}
                  onChange={(value: string) =>
                    updateServicesSection("servicesHighlightText", value)
                  }
                  placeholder="Care Services"
                  icon="✨"
                />
                <TextInput
                  label="Button Text"
                  value={homePage.servicesSection?.servicesButtonText || ""}
                  onChange={(value: string) =>
                    updateServicesSection("servicesButtonText", value)
                  }
                  placeholder="Explore Our Services"
                  icon="🔘"
                />
                <TextInput
                  label="Button URL"
                  value={homePage.servicesSection?.servicesButtonUrl || ""}
                  onChange={(value: string) =>
                    updateServicesSection("servicesButtonUrl", value)
                  }
                  placeholder="/services"
                  icon="🔗"
                />
                <div className="md:col-span-2">
                  <TextInput
                    label="Services Description"
                    value={homePage.servicesSection?.servicesDescription || ""}
                    onChange={(value: string) =>
                      updateServicesSection("servicesDescription", value)
                    }
                    placeholder="We specialize in comprehensive auto body repair services..."
                    icon="📝"
                    description="Description text for the services section"
                  />
                </div>
              </div>
            </div>

            {/* Services Text Colors */}
            <div className="bg-pink-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-pink-800 mb-4 flex items-center gap-2">
                🎨 Services Text Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Badge Background"
                  value={
                    homePage.servicesSection?.servicesBadgeColor || "#dbeafe6b"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("servicesBadgeColor", value)
                  }
                  description="Badge background color"
                />
                <ColorPicker
                  label="Badge Text Color"
                  value={
                    homePage.servicesSection?.servicesBadgeTextColor ||
                    "#1e40af"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("servicesBadgeTextColor", value)
                  }
                  description="Badge text color"
                />
                <ColorPicker
                  label="Title Color"
                  value={
                    homePage.servicesSection?.servicesTitleColor || "#111827"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("servicesTitleColor", value)
                  }
                  description="Main title color"
                />
                <ColorPicker
                  label="Highlight Color"
                  value={
                    homePage.servicesSection?.servicesHighlightColor ||
                    "#1e40af"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("servicesHighlightColor", value)
                  }
                  description="Highlight text color"
                />
                <ColorPicker
                  label="Highlight Underline"
                  value={
                    homePage.servicesSection?.servicesHighlightUnderlineColor ||
                    "#3b82f642"
                  }
                  onChange={(value: string) =>
                    updateServicesSection(
                      "servicesHighlightUnderlineColor",
                      value
                    )
                  }
                  description="Underline decoration color"
                />
                <ColorPicker
                  label="Description Color"
                  value={
                    homePage.servicesSection?.servicesDescriptionColor ||
                    "#6b7280"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("servicesDescriptionColor", value)
                  }
                  description="Description text color"
                />
                <ColorPicker
                  label="Button Text Color"
                  value={
                    homePage.servicesSection?.servicesButtonTextColor ||
                    "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("servicesButtonTextColor", value)
                  }
                  description="Button text color"
                />
              </div>
            </div>

            {/* Service Cards */}
            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center gap-2">
                📋 Service Card Styling
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Card Background"
                  value={
                    homePage.servicesSection?.serviceReelCardBgColor ||
                    "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("serviceReelCardBgColor", value)
                  }
                  description="Service card background"
                />
                <ColorPicker
                  label="Card Border"
                  value={
                    homePage.servicesSection?.serviceReelCardBorderColor ||
                    "#f3f4f680"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("serviceReelCardBorderColor", value)
                  }
                  description="Service card border"
                />
                <ColorPicker
                  label="Card Hover Shadow"
                  value={
                    homePage.servicesSection?.serviceReelCardHoverShadowColor ||
                    "rgba(0, 0, 0, 0.08)"
                  }
                  onChange={(value: string) =>
                    updateServicesSection(
                      "serviceReelCardHoverShadowColor",
                      value
                    )
                  }
                  description="Card hover shadow color"
                />
                <ColorPicker
                  label="Icon Color"
                  value={
                    homePage.servicesSection?.serviceReelIconColor || "#1e40af"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("serviceReelIconColor", value)
                  }
                  description="Service card icon color"
                />
                <ColorPicker
                  label="Title Color"
                  value={
                    homePage.servicesSection?.serviceReelTitleColor || "#111827"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("serviceReelTitleColor", value)
                  }
                  description="Service card title color"
                />
                <ColorPicker
                  label="Title Hover Color"
                  value={
                    homePage.servicesSection?.serviceReelTitleHoverColor ||
                    "#1e40af"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("serviceReelTitleHoverColor", value)
                  }
                  description="Title hover color"
                />
                <ColorPicker
                  label="Description Color"
                  value={
                    homePage.servicesSection?.serviceReelDescriptionColor ||
                    "#6b7280"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("serviceReelDescriptionColor", value)
                  }
                  description="Card description color"
                />
                <ColorPicker
                  label="Description Hover"
                  value={
                    homePage.servicesSection
                      ?.serviceReelDescriptionHoverColor || "#374151"
                  }
                  onChange={(value: string) =>
                    updateServicesSection(
                      "serviceReelDescriptionHoverColor",
                      value
                    )
                  }
                  description="Description hover color"
                />
              </div>
            </div>

            {/* Mobile Indicators */}
            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
                📱 Mobile Indicators
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Active Indicator"
                  value={
                    homePage.servicesSection?.serviceReelMobileIndicatorColor ||
                    "#1e40af"
                  }
                  onChange={(value: string) =>
                    updateServicesSection(
                      "serviceReelMobileIndicatorColor",
                      value
                    )
                  }
                  description="Active mobile indicator color"
                />
                <ColorPicker
                  label="Inactive Indicator"
                  value={
                    homePage.servicesSection?.serviceReelMobileInactiveColor ||
                    "#e0e0e0"
                  }
                  onChange={(value: string) =>
                    updateServicesSection(
                      "serviceReelMobileInactiveColor",
                      value
                    )
                  }
                  description="Inactive mobile indicator color"
                />
              </div>
            </div>

            {/* Services Button Gradients */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                🎨 Services Button Gradients
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Button Start Color"
                  value={
                    homePage.servicesSection?.servicesButtonStartColor ||
                    "#387e62"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("servicesButtonStartColor", value)
                  }
                  description="Button gradient start"
                />
                <ColorPicker
                  label="Button End Color"
                  value={
                    homePage.servicesSection?.servicesButtonEndColor ||
                    "#387e62"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("servicesButtonEndColor", value)
                  }
                  description="Button gradient end"
                />
                <ColorPicker
                  label="Button Hover Start"
                  value={
                    homePage.servicesSection?.servicesButtonHoverStartColor ||
                    "#246043"
                  }
                  onChange={(value: string) =>
                    updateServicesSection(
                      "servicesButtonHoverStartColor",
                      value
                    )
                  }
                  description="Button hover gradient start"
                />
                <ColorPicker
                  label="Button Hover End"
                  value={
                    homePage.servicesSection?.servicesButtonHoverEndColor ||
                    "#246043"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("servicesButtonHoverEndColor", value)
                  }
                  description="Button hover gradient end"
                />
                <ColorPicker
                  label="Gradient From Color"
                  value={
                    homePage.servicesSection?.serviceReelGradientFromColor ||
                    "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("serviceReelGradientFromColor", value)
                  }
                  description="Service reel gradient from"
                />
                <ColorPicker
                  label="Gradient To Color"
                  value={
                    homePage.servicesSection?.serviceReelGradientToColor ||
                    "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateServicesSection("serviceReelGradientToColor", value)
                  }
                  description="Service reel gradient to"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {/* Reviews Section */}
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                ⭐ Reviews Section
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Badge Text"
                  value={homePage.reviewsSection?.reviewsBadgeText || ""}
                  onChange={(value: string) =>
                    updateReviewsSection("reviewsBadgeText", value)
                  }
                  placeholder="Verified Google Reviews"
                  icon="🏷️"
                />
                <TextInput
                  label="Section Title"
                  value={homePage.reviewsSection?.reviewsTitle || ""}
                  onChange={(value: string) =>
                    updateReviewsSection("reviewsTitle", value)
                  }
                  placeholder="What Our Customers"
                  icon="📋"
                />
                <TextInput
                  label="Highlight Text"
                  value={homePage.reviewsSection?.reviewsHighlight || ""}
                  onChange={(value: string) =>
                    updateReviewsSection("reviewsHighlight", value)
                  }
                  placeholder="Are Saying"
                  icon="✨"
                />
                <TextInput
                  label="Button Text"
                  value={homePage.reviewsSection?.viewAllButtonText || ""}
                  onChange={(value: string) =>
                    updateReviewsSection("viewAllButtonText", value)
                  }
                  placeholder="View All Reviews"
                  icon="🔘"
                />
                <TextInput
                  label="Subtitle"
                  value={homePage.reviewsSection?.reviewsSubtitle || ""}
                  onChange={(value: string) =>
                    updateReviewsSection("reviewsSubtitle", value)
                  }
                  placeholder="We're committed to excellence"
                  icon="📝"
                />
              </div>
            </div>

            {/* Review Text Colors */}
            <div className="bg-teal-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-teal-800 mb-4 flex items-center gap-2">
                🎨 Review Text Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Badge Background"
                  value={
                    homePage.reviewsSection?.reviewsBadgeColor ||
                    "rgba(255, 255, 255, 0.1)"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("reviewsBadgeColor", value)
                  }
                  description="Badge background color"
                />
                <ColorPicker
                  label="Badge Text Color"
                  value={
                    homePage.reviewsSection?.reviewsBadgeTextColor || "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("reviewsBadgeTextColor", value)
                  }
                  description="Badge text color"
                />
                <ColorPicker
                  label="Title Color"
                  value={
                    homePage.reviewsSection?.reviewsTitleColor || "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("reviewsTitleColor", value)
                  }
                  description="Main title color"
                />
                <ColorPicker
                  label="Highlight Color"
                  value={
                    homePage.reviewsSection?.reviewsHighlightColor || "#93c5fd"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("reviewsHighlightColor", value)
                  }
                  description="Highlight text color"
                />
                <ColorPicker
                  label="Subtitle Color"
                  value={
                    homePage.reviewsSection?.reviewsSubtitleColor || "#e0f2fe"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("reviewsSubtitleColor", value)
                  }
                  description="Subtitle text color"
                />
              </div>
            </div>

            {/* Review Cards */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                💬 Review Card Styling
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Card Background"
                  value={
                    homePage.reviewsSection?.reviewCardBgColor ||
                    "rgba(255, 255, 255, 0.1)"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("reviewCardBgColor", value)
                  }
                  description="Review card background"
                />
                <ColorPicker
                  label="Card Border"
                  value={
                    homePage.reviewsSection?.reviewCardBorderColor ||
                    "rgba(255, 255, 255, 0.2)"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("reviewCardBorderColor", value)
                  }
                  description="Review card border"
                />
                <ColorPicker
                  label="Card Hover Border"
                  value={
                    homePage.reviewsSection?.reviewCardHoverBorderColor ||
                    "rgba(255, 255, 255, 0.3)"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("reviewCardHoverBorderColor", value)
                  }
                  description="Card hover border color"
                />
                <ColorPicker
                  label="Review Text Color"
                  value={
                    homePage.reviewsSection?.reviewTextColor ||
                    "rgba(255, 255, 255, 0.9)"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("reviewTextColor", value)
                  }
                  description="Review text color"
                />
                <ColorPicker
                  label="Author Color"
                  value={
                    homePage.reviewsSection?.reviewAuthorColor || "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("reviewAuthorColor", value)
                  }
                  description="Author name color"
                />
                <ColorPicker
                  label="Verified Color"
                  value={
                    homePage.reviewsSection?.reviewVerifiedColor || "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("reviewVerifiedColor", value)
                  }
                  description="Verified text color"
                />
                <ColorPicker
                  label="Star Color"
                  value={homePage.reviewsSection?.reviewStarColor || "#fbbf24"}
                  onChange={(value: string) =>
                    updateReviewsSection("reviewStarColor", value)
                  }
                  description="Star rating color"
                />
              </div>
            </div>

            {/* View All Button */}
            <div className="bg-lime-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-lime-800 mb-4 flex items-center gap-2">
                🔘 View All Button
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Button Background"
                  value={
                    homePage.reviewsSection?.viewAllButtonBgColor ||
                    "rgba(255, 255, 255, 0.1)"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("viewAllButtonBgColor", value)
                  }
                  description="Button background color"
                />
                <ColorPicker
                  label="Button Hover BG"
                  value={
                    homePage.reviewsSection?.viewAllButtonHoverBgColor ||
                    "rgba(255, 255, 255, 0.2)"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("viewAllButtonHoverBgColor", value)
                  }
                  description="Button hover background"
                />
                <ColorPicker
                  label="Button Text Color"
                  value={
                    homePage.reviewsSection?.viewAllButtonTextColor || "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("viewAllButtonTextColor", value)
                  }
                  description="Button text color"
                />
                <ColorPicker
                  label="Button Border"
                  value={
                    homePage.reviewsSection?.viewAllButtonBorderColor ||
                    "rgba(255, 255, 255, 0.2)"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("viewAllButtonBorderColor", value)
                  }
                  description="Button border color"
                />
              </div>
            </div>

            {/* Review Background Gradients */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                🎨 Review Background Gradients
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPicker
                  label="Background Start"
                  value={
                    homePage.reviewsSection?.reviewsBgStartColor || "#7dd0ae"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("reviewsBgStartColor", value)
                  }
                  description="Gradient start color"
                />
                <ColorPicker
                  label="Background Middle"
                  value={
                    homePage.reviewsSection?.reviewsBgMiddleColor || "#66bf9b"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("reviewsBgMiddleColor", value)
                  }
                  description="Gradient middle color"
                />
                <ColorPicker
                  label="Background End"
                  value={
                    homePage.reviewsSection?.reviewsBgEndColor || "#53a584"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("reviewsBgEndColor", value)
                  }
                  description="Gradient end color"
                />
                <ColorPicker
                  label="Title Color"
                  value={
                    homePage.reviewsSection?.reviewsTitleColor || "#ffffff"
                  }
                  onChange={(value: string) =>
                    updateReviewsSection("reviewsTitleColor", value)
                  }
                  description="Title text color"
                />
                <ColorPicker
                  label="Star Color"
                  value={homePage.reviewsSection?.reviewStarColor || "#fbbf24"}
                  onChange={(value: string) =>
                    updateReviewsSection("reviewStarColor", value)
                  }
                  description="Star rating color"
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
          <li>• Use consistent brand colors across all homepage sections</li>
          <li>• Keep hero titles concise but compelling</li>
          <li>• Ensure good contrast between text and background colors</li>
          <li>
            • Test your Calendly URL to make sure scheduling works properly
          </li>
          <li>
            • Update guarantee items to reflect your actual business offerings
          </li>
        </ul>
      </div>
    </div>
  );
}
