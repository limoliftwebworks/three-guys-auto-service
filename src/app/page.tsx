"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  StarIcon,
  ClockIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import ServiceReel from "../components/ServiceReel";
import Image from "next/image";
import OptimizedImage from "../components/OptimizedImage";
import Script from "next/script";
import { useConfig } from "../context/ConfigContext";
import { useConfigHydration } from "../context/ConfigContext";
import React, { useState, useEffect, useMemo } from "react";
import { disableReloadWarning } from "../utils/preventReloadWarning";
import Modal from "../components/Modal";
import HeroSection from "@/components/HeroSection";
import localConfig from "../config/localConfig";

// Add Calendly type declaration
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement | null;
        prefill?: Record<string, any>;
        utm?: Record<string, any>;
        branding?: boolean;
      }) => void;
    };
  }
}

// Add a helper to convert hex to rgba with alpha
function hexToRgba(hex: string, alpha: number) {
  let c = hex.replace("#", "");
  if (c.length === 3)
    c = c
      .split("")
      .map((x) => x + x)
      .join("");
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${
    num & 255
  }, ${alpha})`;
}

export default function Home() {
  // Get loading screen config
  const loadingConfig = localConfig.loadingScreen || { enabled: true };

  // Get the config object from context
  const config = useConfig();
  // Get config hydration state
  const isConfigHydrated = useConfigHydration();
  // State to track client-side rendering
  const [isClient, setIsClient] = useState(false);
  // State for instructions modal
  const [showInstructions, setShowInstructions] = useState(false);
  // State for reviews from API
  const [apiReviews, setApiReviews] = useState<
    Array<{ text: string; author: string; rating: number }>
  >([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  // State to track if the component is fully hydrated
  const [isHydrated, setIsHydrated] = useState(false);

  // Set isClient to true once component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Set isHydrated true after styles are applied
  useEffect(() => {
    if (isClient) {
      // Add a small delay to ensure styles are properly applied
      const timer = setTimeout(() => {
        setIsHydrated(true);

        // Also make sure loading overlay is hidden if loading screen is disabled
        if (!loadingConfig.enabled) {
          const overlay = document.getElementById("loading-overlay");
          if (overlay) overlay.classList.add("hidden");
        }
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isClient, loadingConfig.enabled]);

  // Fetch reviews from API
  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/api/reviews?page=1&pageSize=3");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();

        // Transform the data to match the expected format
        const formattedReviews = data.reviews.map((review: any) => ({
          text: review.text,
          author: review.author_name,
          rating: review.rating,
        }));

        setApiReviews(formattedReviews);
        setReviewsLoaded(true);
      } catch (error) {
        console.error("Error fetching reviews for homepage:", error);
        setReviewsLoaded(true); // Still mark as loaded so fallbacks can display
      }
    }

    if (isClient) {
      fetchReviews();
    }
  }, [isClient]);

  // Debug log to see what config is loaded
  // console.log("Config in Home:", config);
  // Home page content from config
  const home = config?.pages?.Home || {};
  // Reviews page content from config
  const reviewsConfig = config?.pages?.Reviews || {};
  // Scheduling button text from config
  const schedulingButtonText = config?.schedulingButtonText;
  // Hero gradient color from Home page config
  const heroGradientColor = config?.pages?.Home?.heroGradientColor || "#0a2540";
  const infoBar = config?.infoBar || {};

  // Instructions content
  const instructionsContent = [
    {
      title: "Tree Removal Services",
      content:
        "We provide professional tree removal services for residential and commercial properties.",
    },
    {
      title: "Expert Arborists",
      content:
        "Our team of certified arborists ensures safe and efficient tree removal.",
    },
    {
      title: home.heroCard1Text || "Hero Card 1",
      content: "This is the first hero card showcased on the homepage.",
    },
    {
      title: home.heroCard2Text || "Hero Card 2",
      content: "This is the second hero card displayed on the homepage.",
    },
    {
      title: home.heroCard3Text || "Hero Card 3",
      content: "This is the third hero card featured on the homepage.",
    },
  ];

  // Set CSS variables when component loads
  useEffect(() => {
    if (isClient && home.scheduleSection) {
      // Set schedule section gradient variables
      document.documentElement.style.setProperty(
        "--schedule-gradient-top",
        home.scheduleSection.scheduleGradientTop || "#ffffff"
      );
      document.documentElement.style.setProperty(
        "--schedule-gradient-bottom",
        home.scheduleSection.scheduleGradientBottom || "#f1f5f9"
      );
    }
  }, [isClient, home.scheduleSection]);

  // Debug log to check button styles
  useEffect(() => {
    if (isClient) {
      // Wait for 1 second before showing alert
      setTimeout(() => {
        // console.log("BUTTON DEBUG:", {
        //   "Schedule Button Properties": {
        //     scheduleButtonColor: home.scheduleButtonColor,
        //     scheduleButtonText: home.scheduleButtonText,
        //     scheduleButtonTextColor: home.scheduleButtonTextColor,
        //     heroScheduleButtonColor: home.heroScheduleButtonColor,
        //     heroScheduleButtonTextColor: home.heroScheduleButtonTextColor,
        //   },
        //   "Contact Button Properties": {
        //     contactButtonColor: home.contactButtonColor,
        //     contactButtonText: home.contactButtonText,
        //     contactButtonTextColor: home.contactButtonTextColor,
        //     heroContactButtonColor: home.heroContactButtonColor,
        //     heroContactButtonTextColor: home.heroContactButtonTextColor,
        //     heroContactButtonBorderColor: home.heroContactButtonBorderColor,
        //   },
        // });
      }, 1000);
    }
  }, [isClient, home]);

  // Only render content when both the component and config are fully hydrated
  if (!isHydrated || !isConfigHydrated) {
    return null; // Return nothing during server-side rendering or before hydration
  }

  return (
    <div className="min-h-screen" suppressHydrationWarning>
      {/* Header (no config prop) */}
      <Header />

      {/* Instructions Modal */}
      <Modal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        title="Services Information"
      >
        <div className="space-y-6">
          {instructionsContent.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </Modal>

      {/* Hero Section using component */}
      <HeroSection
        backgroundImage={home.heroImage || ""}
        mobileBackgroundImage={home.heroMobileImage || ""}
        title={home.title || "Welcome to our Site"}
        subtitle={home.subtitle2 || "We provide the best services"}
        content={home.content || ""}
        location={home.location || ""}
        badge={home.badge || ""}
        heroBadgeColor={home.heroBadgeColor || "#1787c9"}
        heroBadgeTitleColor={home.heroBadgeTitleColor || "#fff"}
        heroTitleColor={home.heroTitleColor || "#fff"}
        heroLocationColor={home.heroLocationColor || "#38bdf8"}
        heroContentColor={home.heroContentColor || "#fff"}
        heroSubtitleColor={home.heroSubtitleColor || "#fff"}
        scheduleButtonText={home.scheduleButtonText || "Schedule Now"}
        scheduleButtonColor={home.heroScheduleButtonColor || "#c9ba18"}
        scheduleButtonTextColor={home.heroScheduleButtonTextColor || "#ffffff"}
        contactButtonText={home.contactButtonText || "Contact Us"}
        contactButtonColor={home.heroContactButtonColor || "#ffffff"}
        contactButtonTextColor={home.heroContactButtonTextColor || "#4fc917"}
        heroContactButtonBorderColor={
          home.heroContactButtonBorderColor || "#ffffff"
        }
        heroContactButtonHoverColor={
          home.heroContactButtonHoverColor || "#4fc917"
        }
        heroContactButtonHoverTextColor={
          home.heroContactButtonHoverTextColor || "#ffffff"
        }
        heroContactButtonHoverBorderColor={
          home.heroContactButtonHoverBorderColor || "#4fc917"
        }
        heroCard1Text={home.heroCard1Text || "Hero Card 1"}
        heroCard2Text={home.heroCard2Text || "Hero Card 2"}
        heroCard3Text={home.heroCard3Text || "Hero Card 3"}
        heroBox1BgColor={home.heroBox1BgColor || "#25647a"}
        heroBox1TextColor={home.heroBox1TextColor || "#fff"}
        heroBox1BorderColor={home.heroBox1BorderColor || "#25647a"}
        heroBox1IconBgColor={
          home.heroBox1IconBgColor || "rgba(255,255,255,0.1)"
        }
        heroBox1IconColor={home.heroBox1IconColor || "#fff"}
        heroBox2BgColor={home.heroBox2BgColor || "#25647a"}
        heroBox2TextColor={home.heroBox2TextColor || "#fff"}
        heroBox2BorderColor={home.heroBox2BorderColor || "#25647a"}
        heroBox2IconBgColor={
          home.heroBox2IconBgColor || "rgba(255,255,255,0.1)"
        }
        heroBox2IconColor={home.heroBox2IconColor || "#fff"}
        heroBox3BgColor={home.heroBox3BgColor || "#25647a"}
        heroBox3TextColor={home.heroBox3TextColor || "#fff"}
        heroBox3BorderColor={home.heroBox3BorderColor || "#25647a"}
        heroBox3IconBgColor={
          home.heroBox3IconBgColor || "rgba(255,255,255,0.1)"
        }
        heroBox3IconColor={home.heroBox3IconColor || "#fff"}
        heroGradientTop={home.heroGradientTop}
        heroGradientBottom={home.heroGradientBottom}
        heroGradientLeft={home.heroGradientLeft || home.heroGradientBottom}
        heroRadialColor={home.heroRadialColor || "#38bdf8"}
        onShowInstructions={() => setShowInstructions(true)}
      />

      {/* Schedule Section */}
      <section
        id="schedule"
        className="py-16 bg-gradient-to-b"
        style={{
          background: `linear-gradient(to bottom, ${
            home.scheduleSection?.scheduleGradientTop || "#ffffff"
          }, ${home.scheduleSection?.scheduleGradientBottom || "#f1f5f9"})`,
        }}
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 mb-3 text-sm font-semibold tracking-wider uppercase bg-primary-50/80 backdrop-blur-sm rounded-full shadow-sm border border-primary-100/50"
              style={{
                background:
                  home.scheduleSection?.scheduleSectionBadgeColor || "#e0e7ff",
                color:
                  home.scheduleSection?.scheduleSectionBadgeTextColor ||
                  "#4f46e5",
              }}
            >
              {home.scheduleSection?.scheduleSectionTitle || "OUR SCHEDULE"}
            </motion.div>
          </motion.div>

          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden p-0 md:p-0">
            {/* Left: Info */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-start">
              <div className="flex items-center mb-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mr-6"
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  {/* Custom icon image */}
                  <Image
                    src={`/images/${
                      home.scheduleSection?.scheduleIconImage ||
                      "clock-icon.png"
                    }`}
                    alt="Schedule Icon"
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <div
                    className="uppercase text-xs font-semibold tracking-widest mb-1"
                    style={{
                      color:
                        home.scheduleSection?.bookingTitleColor || "#6b7280",
                    }}
                  >
                    {home.scheduleSection?.bookingTitle || "BOOK YOUR SERVICE"}
                  </div>
                  <div className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-1 text-left">
                    <span
                      style={{
                        color:
                          home.scheduleSection?.scheduleTitlePart1Color ||
                          "#333333",
                      }}
                    >
                      {home.scheduleSection?.scheduleTitlePart1 ||
                        "Schedule Your "}
                    </span>
                    <span
                      style={{
                        color:
                          home.scheduleSection?.scheduleTitlePart2Color ||
                          "#e69999",
                      }}
                    >
                      {home.scheduleSection?.scheduleTitlePart2 ||
                        "Auto Estimate"}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="flex items-center gap-2 font-semibold mb-2 text-base"
                style={{
                  color:
                    home.scheduleSection?.scheduleAddressColor || "#2563eb",
                }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.5 11 9 11s9-5.75 9-11c0-4.97-4.03-9-9-9zm0 13.5c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5z"
                    fill={
                      home.scheduleSection?.scheduleAddressColor || "#2563eb"
                    }
                  />
                </svg>
                <span className="font-bold">
                  {home.scheduleSection?.scheduleAddress ||
                    "2785 Buford Hwy STE 101, Duluth, GA 30096"}
                </span>
              </div>
              <div
                className="text-base leading-relaxed mt-2 text-left"
                style={{
                  color:
                    home.scheduleSection?.scheduleContentColor || "#6b7280",
                }}
              >
                {home.scheduleSection?.scheduleContent ||
                  "Book your appointment with our expert technicians. We'll get your vehicle back to its best condition."}
              </div>
            </div>
            {/* Right: Custom Calendar CTA */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
              <div
                className="relative w-full flex items-center justify-center"
                style={{
                  minHeight: "520px",
                  minWidth: "420px",
                  height: "520px",
                  maxWidth: "520px",
                }}
              >
                {/* Animated Ripple Gradient Background */}
                <div
                  className="absolute inset-0 rounded-2xl calendar-ripple-bg"
                  style={{
                    background: `linear-gradient(120deg, ${
                      home.scheduleSection?.calendarRippleStartColor ||
                      "#4f46e5"
                    } 0%, ${
                      home.scheduleSection?.calendarRippleEndColor || "#818cf8"
                    } 100%)`,
                    opacity:
                      home.scheduleSection?.calendarRippleOpacity || 0.15,
                    zIndex: 0,
                  }}
                ></div>
                {/* Shimmer overlay */}
                <div className="absolute inset-0 pointer-events-none z-10">
                  <div className="calendar-shimmer-bg w-full h-full rounded-2xl"></div>
                </div>
                {/* Calendar SVG Illustration */}
                <div className="w-full h-full flex items-center justify-center relative z-20">
                  {/* Modern Calendar Design */}
                  <div
                    className="w-full max-w-[320px] h-auto bg-white rounded-2xl shadow-xl overflow-hidden"
                    style={{
                      backgroundColor:
                        home.scheduleSection?.calendarBgColor || "#f9fafb",
                      border: `2px solid ${
                        home.scheduleSection?.calendarBorderColor || "#66bf9b"
                      }`,
                    }}
                  >
                    {/* Calendar Header */}
                    <div
                      className="w-full h-16 flex items-center justify-center px-6 py-4"
                      style={{
                        backgroundColor:
                          home.scheduleSection?.calendarAccentColor ||
                          "#66bf9b",
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-white font-bold text-lg">
                          Schedule Now
                        </span>
                      </div>
                    </div>

                    {/* Weekdays */}
                    <div className="grid grid-cols-7 gap-0 pt-4 pb-2 px-4">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-center h-8"
                        >
                          <span
                            className="text-xs font-medium"
                            style={{
                              color:
                                home.scheduleSection?.calendarAccentColor ||
                                "#66bf9b",
                            }}
                          >
                            {day}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 px-4 py-2 pb-6">
                      {/* Days according to config or default to first few days in July */}
                      {Array.from({
                        length: parseInt(
                          home.scheduleSection?.calendarEmptyDays || "2"
                        ),
                      }).map((_, i) => (
                        <div
                          key={`empty-${i}`}
                          className="flex items-center justify-center h-9"
                        >
                          <span className="text-sm text-gray-300"></span>
                        </div>
                      ))}

                      {/* Actual days - randomly generated availability */}
                      {Array.from({
                        length: parseInt(
                          home.scheduleSection?.calendarDaysInMonth || "28"
                        ),
                      }).map((_, i) => {
                        const day = i + 1;
                        // Generate a semi-random pattern using the day number
                        const isAvailable =
                          (day % 2 === 0 && day % 3 !== 0) || day % 5 === 0;
                        const isSelected =
                          day ===
                          parseInt(
                            home.scheduleSection?.calendarSelectedDay || "15"
                          );

                        return (
                          <div
                            key={`day-${day}`}
                            className={`flex items-center justify-center h-9 relative ${
                              isAvailable ? "cursor-pointer" : ""
                            }`}
                          >
                            <div
                              className={`
                              w-8 h-8 rounded-full flex items-center justify-center text-sm transition
                              ${isSelected ? "font-bold" : "font-medium"}
                            `}
                              style={{
                                backgroundColor: isSelected
                                  ? home.scheduleSection?.calendarAccentColor ||
                                    "#66bf9b"
                                  : isAvailable
                                  ? "#f0fdf4"
                                  : "transparent",
                                color: isSelected
                                  ? "#ffffff"
                                  : isAvailable
                                  ? home.scheduleSection?.calendarAccentColor ||
                                    "#66bf9b"
                                  : "#6b7280",
                                border:
                                  isAvailable && !isSelected
                                    ? `1px solid ${
                                        home.scheduleSection
                                          ?.calendarAccentColor || "#66bf9b"
                                      }`
                                    : "none",
                              }}
                            >
                              {day}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* Tap to Book Button Overlay */}
                <button
                  className="absolute inset-0 w-full h-full flex flex-col items-center justify-center rounded-2xl group focus:outline-none overflow-hidden"
                  style={{
                    cursor: "pointer",
                    zIndex: 20,
                  }}
                  onClick={() => {
                    if (home.scheduleSection?.calendlyUrl) {
                      window.open(home.scheduleSection.calendlyUrl, "_blank");
                    }
                  }}
                  aria-label="Book Now"
                >
                  <span
                    className="relative z-10 text-white text-2xl font-bold mb-4 drop-shadow-lg pulse-cta"
                    style={{
                      color:
                        home.scheduleSection?.tapToBookTextColor || "#ffffff",
                    }}
                  >
                    {home.scheduleSection?.tapToBookText || "Tap to Book"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section
        className="pt-8 pb-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, ${
            home.guaranteeSection?.guaranteeBgGradientTop || "#ffffff"
          }, ${home.guaranteeSection?.guaranteeBgGradientBottom || "#f0f9ff"})`,
        }}
      >
        {/* Enhanced decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br rounded-full blur-[128px] mix-blend-multiply"
            style={{
              background: `linear-gradient(to bottom right, ${
                home.guaranteeSection?.guaranteeDecorativeElements
                  ?.topCircleFromColor || "#e0f2fe"
              }, ${
                home.guaranteeSection?.guaranteeDecorativeElements
                  ?.topCircleToColor || "#bae6fd"
              })`,
              opacity:
                home.guaranteeSection?.guaranteeDecorativeElements
                  ?.topCircleOpacity || 0.3,
            }}
          ></div>
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br rounded-full blur-[128px] mix-blend-multiply"
            style={{
              background: `linear-gradient(to bottom right, ${
                home.guaranteeSection?.guaranteeDecorativeElements
                  ?.bottomCircleFromColor || "#bae6fd"
              }, ${
                home.guaranteeSection?.guaranteeDecorativeElements
                  ?.bottomCircleToColor || "#e0f2fe"
              })`,
              opacity:
                home.guaranteeSection?.guaranteeDecorativeElements
                  ?.bottomCircleOpacity || 0.3,
            }}
          ></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, ${
                home.guaranteeSection?.guaranteeDecorativeElements
                  ?.centerRadialColor || "rgba(255,255,255,0.8)"
              } 0%, rgba(255,255,255,0) 100%)`,
              opacity:
                home.guaranteeSection?.guaranteeDecorativeElements
                  ?.centerRadialOpacity || 0.8,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 mb-3 text-sm font-semibold tracking-wider uppercase bg-primary-50/80 backdrop-blur-sm rounded-full shadow-sm border border-primary-100/50"
              style={{
                background:
                  home.guaranteeSection?.guaranteeBadgeColor || "#e0e7ff",
                color:
                  home.guaranteeSection?.guaranteeBadgeTextColor || "#4f46e5",
              }}
            >
              {home.guaranteeSection?.guaranteeTitle || "Our Guarantee"}
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-5 items-center justify-items-center gap-16 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Lifetime Warranty Emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center group"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 bg-gradient-to-br rounded-full blur-2xl transform group-hover:scale-110 transition-transform duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${
                      home.guaranteeSection?.guaranteeDecorativeElements
                        ?.item1BgFromColor || "#c9f5c9"
                    }, ${
                      home.guaranteeSection?.guaranteeDecorativeElements
                        ?.item1BgViaColor || "#99dac0"
                    }, ${
                      home.guaranteeSection?.guaranteeDecorativeElements
                        ?.item1BgToColor || "#c9f5c9"
                    })`,
                    opacity: 0.2,
                  }}
                ></div>
                <div
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-white via-sky-50 to-white flex items-center justify-center mb-6 mx-auto relative shadow-lg backdrop-blur-sm border border-sky-100/50 transform group-hover:scale-105 transition-all duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${
                      home.guaranteeSection?.guaranteeIconBgColor1 ||
                      home.guaranteeSection?.guaranteeIconBgColor ||
                      "#ffffff"
                    }, #fafcff)`,
                    borderColor:
                      home.guaranteeSection?.guaranteeIconBorderColor1 ||
                      home.guaranteeSection?.guaranteeIconBorderColor ||
                      "#e0e7ff",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to bottom right, ${
                        home.guaranteeSection?.guaranteeDecorativeElements
                          ?.itemHoverFromColor || "#c9f5c9"
                      }, ${
                        home.guaranteeSection?.guaranteeDecorativeElements
                          ?.itemHoverToColor || "#99dac0"
                      })`,
                      opacity: 0.1,
                    }}
                  ></div>
                  <OptimizedImage
                    src={home.guaranteeSection?.guaranteeIcon1 || "access.png"}
                    alt={
                      home.guaranteeSection?.guaranteeTitle1 ||
                      "Lifetime Warranty"
                    }
                    width={56}
                    height={56}
                    className="w-14 h-14 transform group-hover:rotate-12 transition-transform duration-500"
                    quality={90}
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    color:
                      home.guaranteeSection?.guaranteeTitleTextColor1 ||
                      home.guaranteeSection?.guaranteeTitleTextColor ||
                      "#111827",
                  }}
                >
                  {home.guaranteeSection?.guaranteeTitle1 ||
                    "Lifetime Warranty"}
                </h3>
                <p
                  style={{
                    color:
                      home.guaranteeSection?.guaranteeSubtitleTextColor1 ||
                      home.guaranteeSection?.guaranteeSubtitleTextColor ||
                      "#6b7280",
                  }}
                >
                  {home.guaranteeSection?.guaranteeSubtitle1 ||
                    "On All Services"}
                </p>
              </motion.div>
            </motion.div>

            {/* Free Estimates */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center group"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 bg-gradient-to-br rounded-full blur-2xl transform group-hover:scale-110 transition-transform duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${
                      home.guaranteeSection?.guaranteeDecorativeElements
                        ?.item2BgFromColor || "#c9f5c9"
                    }, ${
                      home.guaranteeSection?.guaranteeDecorativeElements
                        ?.item2BgViaColor || "#99dac0"
                    }, ${
                      home.guaranteeSection?.guaranteeDecorativeElements
                        ?.item2BgToColor || "#c9f5c9"
                    })`,
                    opacity: 0.2,
                  }}
                ></div>
                <div
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-white via-sky-50 to-white flex items-center justify-center mb-6 mx-auto relative shadow-lg backdrop-blur-sm border border-sky-100/50 transform group-hover:scale-105 transition-all duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${
                      home.guaranteeSection?.guaranteeIconBgColor2 ||
                      home.guaranteeSection?.guaranteeIconBgColor ||
                      "#ffffff"
                    }, #fafcff)`,
                    borderColor:
                      home.guaranteeSection?.guaranteeIconBorderColor2 ||
                      home.guaranteeSection?.guaranteeIconBorderColor ||
                      "#e0e7ff",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to bottom right, ${
                        home.guaranteeSection?.guaranteeDecorativeElements
                          ?.itemHoverFromColor || "#c9f5c9"
                      }, ${
                        home.guaranteeSection?.guaranteeDecorativeElements
                          ?.itemHoverToColor || "#99dac0"
                      })`,
                      opacity: 0.1,
                    }}
                  ></div>
                  <OptimizedImage
                    src={home.guaranteeSection?.guaranteeIcon2 || "free.png"}
                    alt={
                      home.guaranteeSection?.guaranteeTitle2 || "Free Estimates"
                    }
                    width={56}
                    height={56}
                    className="w-14 h-14 transform group-hover:rotate-12 transition-transform duration-500"
                    quality={90}
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    color:
                      home.guaranteeSection?.guaranteeTitleTextColor2 ||
                      home.guaranteeSection?.guaranteeTitleTextColor ||
                      "#111827",
                  }}
                >
                  {home.guaranteeSection?.guaranteeTitle2 || "Free Estimates"}
                </h3>
                <p
                  style={{
                    color:
                      home.guaranteeSection?.guaranteeSubtitleTextColor2 ||
                      home.guaranteeSection?.guaranteeSubtitleTextColor ||
                      "#6b7280",
                  }}
                >
                  {home.guaranteeSection?.guaranteeSubtitle2 ||
                    "Quick & Accurate"}
                </p>
              </motion.div>
            </motion.div>

            {/* PPG Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative group"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br rounded-2xl blur-2xl transform group-hover:scale-110 transition-transform duration-500"
                style={{
                  background: `linear-gradient(to bottom right, ${
                    home.guaranteeSection?.guaranteeDecorativeElements
                      ?.centerBgFromColor || "#c9f5c9"
                  }, ${
                    home.guaranteeSection?.guaranteeDecorativeElements
                      ?.centerBgViaColor || "#99dac0"
                  }, ${
                    home.guaranteeSection?.guaranteeDecorativeElements
                      ?.centerBgToColor || "#c9f5c9"
                  })`,
                  opacity: 0.2,
                }}
              ></div>
              <div
                className="w-56 h-auto relative bg-gradient-to-br from-white via-sky-50/50 to-white rounded-2xl p-8 backdrop-blur-sm border border-sky-100/50 shadow-lg transform group-hover:scale-105 transition-all duration-500"
                style={{
                  background: `linear-gradient(to bottom right, ${
                    home.guaranteeSection?.guaranteeCenterBgColor ||
                    home.guaranteeSection?.guaranteeIconBgColor ||
                    "#ffffff"
                  }, #fafcff)`,
                  borderColor:
                    home.guaranteeSection?.guaranteeCenterBorderColor ||
                    home.guaranteeSection?.guaranteeIconBorderColor ||
                    "#e0e7ff",
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${
                      home.guaranteeSection?.guaranteeDecorativeElements
                        ?.itemHoverFromColor || "#c9f5c9"
                    }, ${
                      home.guaranteeSection?.guaranteeDecorativeElements
                        ?.itemHoverToColor || "#99dac0"
                    })`,
                    opacity: 0.05,
                  }}
                ></div>
                <OptimizedImage
                  src={home.guaranteeSection?.guaranteeCenterLogo || "PPG.png"}
                  alt="Paint Company Logo"
                  width={200}
                  height={200}
                  className="object-contain relative transform group-hover:scale-105 transition-transform duration-500"
                  quality={90}
                  priority={true}
                  blurEffect={true}
                />
              </div>
            </motion.div>

            {/* Insurance Companies Emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center group"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 bg-gradient-to-br rounded-full blur-2xl transform group-hover:scale-110 transition-transform duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${
                      home.guaranteeSection?.guaranteeDecorativeElements
                        ?.item4BgFromColor || "#c9f5c9"
                    }, ${
                      home.guaranteeSection?.guaranteeDecorativeElements
                        ?.item4BgViaColor || "#99dac0"
                    }, ${
                      home.guaranteeSection?.guaranteeDecorativeElements
                        ?.item4BgToColor || "#c9f5c9"
                    })`,
                    opacity: 0.2,
                  }}
                ></div>
                <div
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-white via-sky-50 to-white flex items-center justify-center mb-6 mx-auto relative shadow-lg backdrop-blur-sm border border-sky-100/50 transform group-hover:scale-105 transition-all duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${
                      home.guaranteeSection?.guaranteeIconBgColor4 ||
                      home.guaranteeSection?.guaranteeIconBgColor ||
                      "#ffffff"
                    }, #fafcff)`,
                    borderColor:
                      home.guaranteeSection?.guaranteeIconBorderColor4 ||
                      home.guaranteeSection?.guaranteeIconBorderColor ||
                      "#e0e7ff",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to bottom right, ${
                        home.guaranteeSection?.guaranteeDecorativeElements
                          ?.itemHoverFromColor || "#c9f5c9"
                      }, ${
                        home.guaranteeSection?.guaranteeDecorativeElements
                          ?.itemHoverToColor || "#99dac0"
                      })`,
                      opacity: 0.1,
                    }}
                  ></div>
                  <OptimizedImage
                    src={
                      home.guaranteeSection?.guaranteeIcon4 || "calculator.png"
                    }
                    alt={
                      home.guaranteeSection?.guaranteeTitle4 ||
                      "Insurance Approved"
                    }
                    width={48}
                    height={48}
                    className="w-12 h-12 transform group-hover:rotate-12 transition-transform duration-500"
                    quality={90}
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    color:
                      home.guaranteeSection?.guaranteeTitleTextColor4 ||
                      home.guaranteeSection?.guaranteeTitleTextColor ||
                      "#111827",
                  }}
                >
                  {home.guaranteeSection?.guaranteeTitle4 ||
                    "Insurance Approved"}
                </h3>
                <p
                  style={{
                    color:
                      home.guaranteeSection?.guaranteeSubtitleTextColor4 ||
                      home.guaranteeSection?.guaranteeSubtitleTextColor ||
                      "#6b7280",
                  }}
                >
                  {home.guaranteeSection?.guaranteeSubtitle4 ||
                    "All Major & Minor Companies"}
                </p>
              </motion.div>
            </motion.div>

            {/* Towing Service */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center group"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 bg-gradient-to-br rounded-full blur-2xl transform group-hover:scale-110 transition-transform duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${
                      home.guaranteeSection?.guaranteeDecorativeElements
                        ?.item5BgFromColor || "#c9f5c9"
                    }, ${
                      home.guaranteeSection?.guaranteeDecorativeElements
                        ?.item5BgViaColor || "#99dac0"
                    }, ${
                      home.guaranteeSection?.guaranteeDecorativeElements
                        ?.item5BgToColor || "#c9f5c9"
                    })`,
                    opacity: 0.2,
                  }}
                ></div>
                <div
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-white via-sky-50 to-white flex items-center justify-center mb-6 mx-auto relative shadow-lg backdrop-blur-sm border border-sky-100/50 transform group-hover:scale-105 transition-all duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${
                      home.guaranteeSection?.guaranteeIconBgColor5 ||
                      home.guaranteeSection?.guaranteeIconBgColor ||
                      "#ffffff"
                    }, #fafcff)`,
                    borderColor:
                      home.guaranteeSection?.guaranteeIconBorderColor5 ||
                      home.guaranteeSection?.guaranteeIconBorderColor ||
                      "#e0e7ff",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to bottom right, ${
                        home.guaranteeSection?.guaranteeDecorativeElements
                          ?.itemHoverFromColor || "#c9f5c9"
                      }, ${
                        home.guaranteeSection?.guaranteeDecorativeElements
                          ?.itemHoverToColor || "#99dac0"
                      })`,
                      opacity: 0.1,
                    }}
                  ></div>
                  <OptimizedImage
                    src={
                      home.guaranteeSection?.guaranteeIcon5 || "shipping.png"
                    }
                    alt={
                      home.guaranteeSection?.guaranteeTitle5 || "Towing Service"
                    }
                    width={56}
                    height={56}
                    className="w-14 h-14 transform group-hover:rotate-12 transition-transform duration-500"
                    quality={90}
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    color:
                      home.guaranteeSection?.guaranteeTitleTextColor5 ||
                      home.guaranteeSection?.guaranteeTitleTextColor ||
                      "#111827",
                  }}
                >
                  {home.guaranteeSection?.guaranteeTitle5 || "Towing Service"}
                </h3>
                <p
                  style={{
                    color:
                      home.guaranteeSection?.guaranteeSubtitleTextColor5 ||
                      home.guaranteeSection?.guaranteeSubtitleTextColor ||
                      "#6b7280",
                  }}
                >
                  {home.guaranteeSection?.guaranteeSubtitle5 ||
                    "24/7 Available"}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section
        className="py-2 relative overflow-hidden"
        style={{
          background: home.servicesSection?.servicesBgColor || "#ffffff",
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-50/30 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-50/30 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative pt-20">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="inline-block px-4 py-1 mb-2 text-sm font-semibold tracking-wider uppercase rounded-full shadow-sm"
              style={{
                background:
                  home.servicesSection?.servicesBadgeColor || "#e0e7ff",
                color:
                  home.servicesSection?.servicesBadgeTextColor || "#4f46e5",
              }}
            >
              {home.servicesSection?.servicesBadgeText || "Our Expertise"}
            </span>
            <h2
              className="text-4xl md:text-5xl font-display font-bold mb-4"
              style={{
                color: home.servicesSection?.servicesTitleColor || "#111827",
              }}
            >
              {
                (
                  home.servicesSection?.servicesTitle ||
                  "Expert Auto Body Repair Services"
                ).split(
                  home.servicesSection?.servicesHighlightText ||
                    "Repair Services"
                )[0]
              }
              <span className="relative inline-block">
                <span
                  className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${
                      home.servicesSection?.servicesHighlightColor || "#4f46e5"
                    }, ${
                      home.servicesSection?.servicesHighlightColor || "#4f46e5"
                    })`,
                  }}
                >
                  {home.servicesSection?.servicesHighlightText ||
                    "Repair Services"}
                </span>
                <span
                  className="absolute -bottom-2 left-0 w-full h-2.5 -rotate-1"
                  style={{
                    background:
                      home.servicesSection?.servicesHighlightUnderlineColor ||
                      "#e0e7ff",
                  }}
                ></span>
              </span>
            </h2>
          </motion.div>
        </div>

        <div className="py-8">
          <div className="container mx-auto px-4 mb-6">
            <motion.p
              className="text-lg leading-relaxed max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                color:
                  home.servicesSection?.servicesDescriptionColor || "#6b7280",
              }}
            >
              {home.servicesSection?.servicesDescription ||
                "We specialize in comprehensive auto body repair services, from collision repair and dent removal to expert paint matching and structural repairs."}
            </motion.p>
          </div>

          <ServiceReel />

          <div className="text-center mt-6">
            <motion.a
              href={home.servicesSection?.servicesButtonUrl || "/services"}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/30 group relative overflow-hidden"
              style={{
                background: `linear-gradient(to right, ${
                  home.servicesSection?.servicesButtonStartColor || "#4f46e5"
                }, ${
                  home.servicesSection?.servicesButtonEndColor || "#4338ca"
                })`,
                color:
                  home.servicesSection?.servicesButtonTextColor || "#ffffff",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{
                  background: `linear-gradient(to right, ${
                    home.servicesSection?.servicesButtonEndColor || "#4338ca"
                  }, ${
                    home.servicesSection?.servicesButtonStartColor || "#4f46e5"
                  })`,
                }}
              ></span>
              <span className="relative">
                {home.servicesSection?.servicesButtonText ||
                  "Explore Our Services"}
              </span>
              <ArrowRightIcon className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Reviews Preview Section */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background: `linear-gradient(to bottom right, ${
            home.reviewsSection?.reviewsBgStartColor || "#4f46e5"
          }, ${home.reviewsSection?.reviewsBgMiddleColor || "#4338ca"}, ${
            home.reviewsSection?.reviewsBgEndColor || "#3730a3"
          })`,
        }}
      >
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block mb-6">
              <div
                className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm border"
                style={{
                  background:
                    home.reviewsSection?.reviewsBadgeColor ||
                    "rgba(255, 255, 255, 0.1)",
                  borderColor:
                    home.reviewsSection?.reviewsBadgeColor ||
                    "rgba(255, 255, 255, 0.2)",
                }}
              >
                <Image
                  src="/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span
                  className="text-sm font-medium"
                  style={{
                    color:
                      home.reviewsSection?.reviewsBadgeTextColor || "#ffffff",
                  }}
                >
                  {home.reviewsSection?.reviewsBadgeText ||
                    "Verified Google Reviews"}
                </span>
                <svg
                  className="w-5 h-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {/* Section title, highlight, and subtitle from config */}
            <motion.h2
              className="text-4xl md:text-5xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span
                style={{
                  color: home.reviewsSection?.reviewsTitleColor || "#ffffff",
                }}
              >
                {home.reviewsSection?.reviewsTitle ||
                  reviewsConfig?.title ||
                  "What Our Customers "}
              </span>
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, ${
                    home.reviewsSection?.reviewsHighlightColor || "#93c5fd"
                  }, ${
                    home.reviewsSection?.reviewsHighlightColor || "#93c5fd"
                  }80)`,
                }}
              >
                {home.reviewsSection?.reviewsHighlight ||
                  reviewsConfig?.highlight ||
                  "Are Saying"}
              </span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl leading-relaxed mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                color: home.reviewsSection?.reviewsSubtitleColor || "#e0f2fe",
              }}
            >
              {home.reviewsSection?.reviewsSubtitle ||
                reviewsConfig?.subtitle ||
                "See what our satisfied customers have to say about our service."}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {isClient && !reviewsLoaded ? (
              // Loading state
              <>
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="relative backdrop-blur-sm rounded-xl p-6 border"
                    style={{
                      background:
                        home.reviewsSection?.reviewCardBgColor ||
                        "rgba(255, 255, 255, 0.1)",
                      borderColor:
                        home.reviewsSection?.reviewCardBorderColor ||
                        "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="h-5 w-5 rounded-full bg-gray-300/30 mr-1"
                        ></div>
                      ))}
                    </div>
                    <div className="h-4 bg-gray-300/30 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-300/30 rounded mb-2 w-5/6"></div>
                    <div className="h-4 bg-gray-300/30 rounded mb-4 w-2/3"></div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-300/30"></div>
                      <div>
                        <div className="h-4 bg-gray-300/30 rounded mb-1 w-24"></div>
                        <div className="h-3 bg-gray-300/30 rounded w-32"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : isClient && reviewsLoaded && apiReviews.length > 0 ? (
              apiReviews.map(
                (
                  review: { text: string; author: string; rating: number },
                  index: number
                ) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative backdrop-blur-sm rounded-xl p-6 border transition-all duration-200"
                    style={
                      {
                        background:
                          home.reviewsSection?.reviewCardBgColor ||
                          "rgba(255, 255, 255, 0.1)",
                        borderColor:
                          home.reviewsSection?.reviewCardBorderColor ||
                          "rgba(255, 255, 255, 0.2)",
                        "--hover-border-color":
                          home.reviewsSection?.reviewCardHoverBorderColor ||
                          "rgba(255, 255, 255, 0.3)",
                      } as React.CSSProperties
                    }
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor =
                        home.reviewsSection?.reviewCardHoverBorderColor ||
                        "rgba(255, 255, 255, 0.3)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor =
                        home.reviewsSection?.reviewCardBorderColor ||
                        "rgba(255, 255, 255, 0.2)";
                    }}
                  >
                    <div className="flex mb-4">
                      {[...Array(review?.rating || 5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="h-5 w-5"
                          style={{
                            color:
                              home.reviewsSection?.reviewStarColor || "#fbbf24",
                          }}
                        />
                      ))}
                    </div>
                    <p
                      className="mb-6 leading-relaxed"
                      style={{
                        color:
                          home.reviewsSection?.reviewTextColor ||
                          "rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      "{review?.text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center text-white font-medium">
                        {review?.author[0]}
                      </div>
                      <div>
                        <p
                          className="font-medium"
                          style={{
                            color:
                              home.reviewsSection?.reviewAuthorColor ||
                              "#ffffff",
                          }}
                        >
                          {review?.author}
                        </p>
                        <p
                          className="text-sm"
                          style={{
                            color:
                              home.reviewsSection?.reviewVerifiedColor ||
                              "#93c5fd",
                          }}
                        >
                          Verified Customer
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              )
            ) : (
              <>
                {(
                  home.reviewsSection?.defaultReviews || [
                    {
                      text: "Absolutely phenomenal work! My car looks even better than before the accident. The attention to detail and craftsmanship is top-notch. I highly recommend their services.",
                      author: "Jennifer R.",
                      rating: 5,
                    },
                    {
                      text: "Fast, professional service from start to finish. They handled my insurance claim seamlessly and kept me updated throughout the entire repair process. Couldn't be happier with the results!",
                      author: "Michael S.",
                      rating: 5,
                    },
                    {
                      text: "The team truly went above and beyond my expectations. Not only was my car repaired perfectly, but they also detailed it before returning it to me. Excellent customer service and quality work.",
                      author: "David W.",
                      rating: 5,
                    },
                  ]
                ).map(
                  (
                    review: { text: string; author: string; rating: number },
                    index: number
                  ) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative backdrop-blur-sm rounded-xl p-6 border transition-all duration-200"
                      style={
                        {
                          background:
                            home.reviewsSection?.reviewCardBgColor ||
                            "rgba(255, 255, 255, 0.1)",
                          borderColor:
                            home.reviewsSection?.reviewCardBorderColor ||
                            "rgba(255, 255, 255, 0.2)",
                          "--hover-border-color":
                            home.reviewsSection?.reviewCardHoverBorderColor ||
                            "rgba(255, 255, 255, 0.3)",
                        } as React.CSSProperties
                      }
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor =
                          home.reviewsSection?.reviewCardHoverBorderColor ||
                          "rgba(255, 255, 255, 0.3)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor =
                          home.reviewsSection?.reviewCardBorderColor ||
                          "rgba(255, 255, 255, 0.2)";
                      }}
                    >
                      <div className="flex mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className="h-5 w-5"
                            style={{
                              color:
                                home.reviewsSection?.reviewStarColor ||
                                "#fbbf24",
                            }}
                          />
                        ))}
                      </div>
                      <p
                        className="mb-6 leading-relaxed"
                        style={{
                          color:
                            home.reviewsSection?.reviewTextColor ||
                            "rgba(255, 255, 255, 0.9)",
                        }}
                      >
                        "{review.text}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center text-white font-medium">
                          {review.author[0]}
                        </div>
                        <div>
                          <p
                            className="font-medium"
                            style={{
                              color:
                                home.reviewsSection?.reviewAuthorColor ||
                                "#ffffff",
                            }}
                          >
                            {review.author}
                          </p>
                          <p
                            className="text-sm"
                            style={{
                              color:
                                home.reviewsSection?.reviewVerifiedColor ||
                                "#93c5fd",
                            }}
                          >
                            Verified Customer
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </>
            )}
          </div>

          <div className="text-center">
            <motion.a
              href="/reviews"
              className="inline-flex items-center gap-2 px-6 py-3 border backdrop-blur-sm rounded-lg font-medium transition-all duration-200 hover:scale-105 group"
              style={{
                background:
                  home.reviewsSection?.viewAllButtonBgColor ||
                  "rgba(255, 255, 255, 0.1)",
                color: home.reviewsSection?.viewAllButtonTextColor || "#ffffff",
                borderColor:
                  home.reviewsSection?.viewAllButtonBorderColor ||
                  "rgba(255, 255, 255, 0.2)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{
                y: -2,
                backgroundColor:
                  home.reviewsSection?.viewAllButtonHoverBgColor ||
                  "rgba(255, 255, 255, 0.2)",
              }}
            >
              {home.reviewsSection?.viewAllButtonText || "View All Reviews"}
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer (no config prop) */}
      <Footer />
    </div>
  );
}

/* Add shimmer animation to globals.css if not present */
// .shimmer-bg {
//   background: linear-gradient(120deg, rgba(156,163,175,0.7) 0%, rgba(209,213,219,0.3) 40%, rgba(156,163,175,0.7) 100%);
//   background-size: 200% 100%;
//   animation: shimmer 2s infinite linear;
// }
// @keyframes shimmer {
//   0% { background-position: -200% 0; }
//   100% { background-position: 200% 0; }
// }
