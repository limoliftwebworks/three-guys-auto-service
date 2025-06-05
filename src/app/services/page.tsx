"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, Suspense, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MouseFollowGradient from "@/components/MouseFollowGradient";
import localConfig from "@/config/localConfig";
import {
  WrenchScrewdriverIcon,
  SparklesIcon,
  PaintBrushIcon,
  ExclamationTriangleIcon,
  WrenchIcon,
  BeakerIcon,
  CheckIcon,
  ArrowRightIcon,
  XMarkIcon,
  ShieldCheckIcon,
  CogIcon,
  TruckIcon,
  DocumentCheckIcon,
  SparklesIcon as SparklesOutlineIcon,
  WrenchScrewdriverIcon as WrenchScrewdriverOutlineIcon,
  CogIcon as CogOutlineIcon,
} from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

// Add at the top of the file after the imports
declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
      minimize?: () => void;
    };
  }
}

// Helper function to convert hex color to hue-rotate value
const getHueRotate = (hexColor: string): string => {
  // Remove the hash if it exists
  const hex = hexColor.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find the hue
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h = 0;

  if (max !== min) {
    if (max === r) {
      h = 60 * ((g - b) / (max - min));
    } else if (max === g) {
      h = 60 * (2 + (b - r) / (max - min));
    } else {
      h = 60 * (4 + (r - g) / (max - min));
    }
  }

  if (h < 0) h += 360;

  // Return hue-rotate value (primary red is approximately at 0deg)
  return `${h}deg`;
};

// Define interfaces for service category and services
interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor?: string;
  bgColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  borderColor?: string;
  textColor?: string;
  borderRadius?: string;
  shadow?: string;
  backgroundOpacity?: number;
  iconSize?: string;
  titleFontSize?: string;
  descriptionFontSize?: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  bgImage: string;
  color: string;
  bgColor?: string;
  iconColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  borderColor?: string;
  textColor?: string;
  cardTextColor?: string;
  cardDescriptionColor?: string;
  cardBorderRadius?: string;
  cardShadow?: string;
  cardBackgroundOpacity?: number;
  iconSize?: string;
  titleFontSize?: string;
  descriptionFontSize?: string;
  services: ServiceItem[];
  colorGradient?: { fromColor: string; toColor: string } | null;
}

// Interface for expertise cards
interface ExpertiseCard {
  title: string;
  description: string;
}

// Define the ServicesConfig interface
interface ServicesConfig {
  title?: string;
  subtitle?: string;
  badge?: string;
  yearsExperience?: string;
  carsRepaired?: string;
  serviceCategories?: ServiceCategory[];
  expertiseTitle?: string;
  expertiseDescription?: string;
  expertiseCards?: {
    title: string;
    description: string;
  }[];
  ctaTitle?: string;
  ctaDescription?: string;
  scheduleButtonText?: string;
  callButtonText?: string;
  heroImage?: string;
  card1Title?: string;
  card1Value?: string;
  card2Title?: string;
  card2Value?: string;
  heroBgGradientFrom?: string;
  heroBgGradientVia?: string;
  heroBgGradientTo?: string;
  heroBadgeBgColor?: string;
  heroBadgeTextColor?: string;
  heroBadgeIconColor?: string;
  heroTitleColor?: string;
  heroSubtitleColor?: string;
  heroStatsCardBgColor?: string;
  heroStatsCardIconColor?: string;
  heroStatsCardValueColor?: string;
  heroStatsCardTextColor?: string;
  heroBlurredCircle1Color?: string;
  heroBlurredCircle2Color?: string;
  heroPatternColor?: string;
  heroLightBeam1Color?: string;
  heroLightBeam2Color?: string;
  heroBadgeMedalIconColor?: string;
  heroBadgeCheckmarkColor?: string;
  // Service Categories Section
  serviceCategoriesBgColor?: string;
  serviceCategoriesBgColorFrom?: string;
  serviceCategoriesBgColorTo?: string;
  serviceCategoriesGradientOpacity?: number;
  serviceCategoryCardGradientFrom?: string;
  serviceCategoryCardGradientTo?: string;
  serviceCategoryCardTitleColor?: string;
  serviceCategoryCardDescriptionColor?: string;
  serviceCategoryCardButtonColor?: string;
  serviceCategoryCardButtonBgColor?: string;
  serviceCategoryCardButtonHoverBgColor?: string;
  serviceCategoryCardButtonHoverColor?: string;
  serviceCategoryCardBorderColor?: string;
  // Service Item Cards
  serviceItemCardBgColor?: string;
  serviceItemCardBorderColor?: string;
  serviceItemCardTitleColor?: string;
  serviceItemCardDescriptionColor?: string;
  serviceItemCardIconColor?: string;
  // Expertise Section
  expertiseBgGradientFrom?: string;
  expertiseBgGradientVia?: string;
  expertiseBgGradientTo?: string;
  expertiseAnimatedOrbsColor1?: string;
  expertiseAnimatedOrbsColor2?: string;
  expertiseAnimatedOrbsColor3?: string;
  expertiseTitleColor?: string;
  expertiseDescriptionColor?: string;
  expertiseCardBgColor?: string;
  expertiseCardShadow?: string;
  expertiseCardHoverGradient?: string;
  expertiseCardIconBgColor?: string;
  expertiseCardIconColor?: string;
  expertiseCardTitleColor?: string;
  expertiseCardTextColor?: string;
  // CTA Section
  ctaBgGradientFrom?: string;
  ctaBgGradientVia?: string;
  ctaBgGradientTo?: string;
  ctaBgPatternColor?: string;
  ctaCardBgColor?: string;
  ctaCardBorderColor?: string;
  ctaTitleColor?: string;
  ctaDescriptionColor?: string;
  scheduleButtonBgColor?: string;
  scheduleButtonTextColor?: string;
  callButtonBgColor?: string;
  callButtonTextColor?: string;
}

// Add type for the icon prop
interface SectionProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ icon: Icon, title, children }) => (
  <div className="relative">
    <div className="flex items-start gap-4 group">
      <div className="flex-shrink-0 mt-1">
        <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors duration-200">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h4>
        <div className="mt-2 text-gray-600 space-y-3">{children}</div>
      </div>
    </div>
  </div>
);

function ServicesContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [serviceCategoriesData, setServiceCategoriesData] = useState<
    ServiceCategory[]
  >([]);

  // Get config data from localConfig
  const servicesConfig: ServicesConfig = (localConfig.pages as any)
    ?.Services || {
    serviceCategories: [],
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setSelectedCategory(null);
  };

  // Simple effect to handle modal state
  useEffect(() => {
    // Toggle body scroll when modal opens/closes
    if (selectedCategory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Add escape key handler
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCategory) {
        setSelectedCategory(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    // Cleanup
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [selectedCategory]);

  // Map the icon strings from config to actual React components
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      ExclamationTriangleIcon: (
        <ExclamationTriangleIcon className="w-full h-full" />
      ),
      SparklesIcon: <SparklesIcon className="w-full h-full" />,
      PaintBrushIcon: <PaintBrushIcon className="w-full h-full" />,
      WrenchIcon: <WrenchIcon className="w-full h-full" />,
      CogIcon: <CogIcon className="w-full h-full" />,
      BeakerIcon: <BeakerIcon className="w-full h-full" />,
      CheckIcon: <CheckIcon className="w-full h-full" />,
      ArrowRightIcon: <ArrowRightIcon className="w-full h-full" />,
      XMarkIcon: <XMarkIcon className="w-full h-full" />,
      ShieldCheckIcon: <ShieldCheckIcon className="w-full h-full" />,
      TruckIcon: <TruckIcon className="w-full h-full" />,
      DocumentCheckIcon: <DocumentCheckIcon className="w-full h-full" />,
      WrenchScrewdriverIcon: (
        <WrenchScrewdriverIcon className="w-full h-full" />
      ),
      SparklesOutlineIcon: <SparklesIcon className="w-full h-full" />,
      WrenchScrewdriverOutlineIcon: (
        <WrenchScrewdriverIcon className="w-full h-full" />
      ),
      CogOutlineIcon: <CogIcon className="w-full h-full" />,
    };

    return (
      iconMap[iconName] || <WrenchScrewdriverIcon className="w-full h-full" />
    );
  };

  // Helper function to parse category colors in "fromColor-toColor" format or Tailwind format
  const parseCategoryColor = (colorString: string) => {
    if (!colorString) return null;

    // Check if the color string has the format "color1-color2"
    if (colorString.includes("-")) {
      const [fromColor, toColor] = colorString.split("-");
      return { fromColor, toColor };
    }

    // Check if it uses Tailwind-style "from-X to-Y" format
    if (colorString.includes("from-") && colorString.includes("to-")) {
      // For Tailwind format, we'll use default gradient colors
      return {
        fromColor: servicesConfig.serviceCategoryCardGradientFrom || "#dc7070",
        toColor: servicesConfig.serviceCategoryCardGradientTo || "#e69999",
      };
    }

    return null;
  };

  // Use the serviceCategories from the config if available, otherwise use fallback
  const fallbackCategories: ServiceCategory[] = [
    {
      id: "collision",
      title: "Collision Services",
      icon: <ExclamationTriangleIcon className="w-full h-full" />,
      description:
        "Complete collision repair services to restore your vehicle to pre-accident condition",
      bgImage: "autored1.png",
      color: "from-primary-500 to-primary-600",
      iconColor: "#ffffff",
      titleColor: "#ffffff",
      descriptionColor: "#f3f4f6",
      borderColor: "#e5e7eb",
      services: [
        {
          title: "Collision Repair",
          description: "Expert repair of vehicle damage from accidents",
          icon: <WrenchScrewdriverIcon className="w-6 h-6" />,
          iconColor: "#3b82f6",
          titleColor: "#111827",
          descriptionColor: "#6b7280",
          bgColor: "#f9fafb",
          borderColor: "#e5e7eb",
        },
        {
          title: "Frame & Alignment",
          description: "Precise frame straightening and alignment services",
          icon: <CogIcon className="w-6 h-6" />,
          iconColor: "#3b82f6",
          titleColor: "#111827",
          descriptionColor: "#6b7280",
          bgColor: "#f9fafb",
          borderColor: "#e5e7eb",
        },
        {
          title: "Paint Services",
          description: "Professional auto painting with color matching",
          icon: <PaintBrushIcon className="w-6 h-6" />,
          iconColor: "#3b82f6",
          titleColor: "#111827",
          descriptionColor: "#6b7280",
          bgColor: "#f9fafb",
          borderColor: "#e5e7eb",
        },
        {
          title: "Dent Removal",
          description: "Skilled dent removal using advanced techniques",
          icon: <WrenchIcon className="w-6 h-6" />,
          iconColor: "#3b82f6",
          titleColor: "#111827",
          descriptionColor: "#6b7280",
          bgColor: "#f9fafb",
          borderColor: "#e5e7eb",
        },
      ],
    },
    {
      id: "cosmetic",
      title: "Cosmetic Services",
      icon: <SparklesIcon className="w-full h-full" />,
      description:
        "Premium cosmetic services to enhance and protect your vehicle's appearance",
      bgImage: "autored3.png",
      color: "from-primary-500 to-primary-600",
      iconColor: "#ffffff",
      titleColor: "#ffffff",
      descriptionColor: "#f3f4f6",
      borderColor: "#e5e7eb",
      services: [
        {
          title: "Auto Detailing",
          description: "Comprehensive interior and exterior detailing",
          icon: <SparklesIcon className="w-6 h-6" />,
          iconColor: "#3b82f6",
          titleColor: "#111827",
          descriptionColor: "#6b7280",
          bgColor: "#f9fafb",
          borderColor: "#e5e7eb",
        },
        {
          title: "Paint Protection",
          description: "Advanced paint protection and ceramic coating",
          icon: <ShieldCheckIcon className="w-6 h-6" />,
          iconColor: "#3b82f6",
          titleColor: "#111827",
          descriptionColor: "#6b7280",
          bgColor: "#f9fafb",
          borderColor: "#e5e7eb",
        },
        {
          title: "Classic Restoration",
          description: "Expert restoration of vintage vehicles",
          icon: <WrenchScrewdriverIcon className="w-6 h-6" />,
          iconColor: "#3b82f6",
          titleColor: "#111827",
          descriptionColor: "#6b7280",
          bgColor: "#f9fafb",
          borderColor: "#e5e7eb",
        },
        {
          title: "Wheel & Rim Services",
          description: "Professional wheel repair and restoration",
          icon: <CogIcon className="w-6 h-6" />,
          iconColor: "#3b82f6",
          titleColor: "#111827",
          descriptionColor: "#6b7280",
          bgColor: "#f9fafb",
          borderColor: "#e5e7eb",
        },
      ],
    },
    {
      id: "mechanical",
      title: "Mechanical Services",
      icon: <CogIcon className="w-full h-full" />,
      description:
        "Essential mechanical services and diagnostics for optimal vehicle performance",
      bgImage: "autored4.png",
      color: "from-primary-500 to-primary-600",
      iconColor: "#ffffff",
      titleColor: "#ffffff",
      descriptionColor: "#f3f4f6",
      borderColor: "#e5e7eb",
      services: [
        {
          title: "Diagnostic Services",
          description: "Comprehensive vehicle diagnostics and assessment",
          icon: <BeakerIcon className="w-6 h-6" />,
          iconColor: "#3b82f6",
          titleColor: "#111827",
          descriptionColor: "#6b7280",
          bgColor: "#f9fafb",
          borderColor: "#e5e7eb",
        },
        {
          title: "Check Engine Light",
          description: "Professional diagnosis and resolution",
          icon: <ExclamationTriangleIcon className="w-6 h-6" />,
          iconColor: "#3b82f6",
          titleColor: "#111827",
          descriptionColor: "#6b7280",
          bgColor: "#f9fafb",
          borderColor: "#e5e7eb",
        },
        {
          title: "Fleet Services",
          description: "Specialized fleet maintenance and repair",
          icon: <TruckIcon className="w-6 h-6" />,
          iconColor: "#3b82f6",
          titleColor: "#111827",
          descriptionColor: "#6b7280",
          bgColor: "#f9fafb",
          borderColor: "#e5e7eb",
        },
        {
          title: "Custom Fabrication",
          description: "Specialized metal fabrication and repairs",
          icon: <WrenchIcon className="w-6 h-6" />,
          iconColor: "#3b82f6",
          titleColor: "#111827",
          descriptionColor: "#6b7280",
          bgColor: "#f9fafb",
          borderColor: "#e5e7eb",
        },
      ],
    },
  ];

  // Process and update categories whenever config changes
  useEffect(() => {
    // Process categories from config or use fallback
    const processCategories = (categories: ServiceCategory[]) => {
      return categories.map((category) => {
        // Process category icon
        const categoryIcon =
          typeof category.icon === "string"
            ? getIconComponent(category.icon)
            : category.icon;

        // Parse category color gradient if it exists
        const categoryColorGradient = parseCategoryColor(category.color);

        // Apply global config colors if not specified in the category
        const processedCategory = {
          ...category,
          titleColor:
            category.titleColor || servicesConfig.serviceCategoryCardTitleColor,
          descriptionColor:
            category.descriptionColor ||
            servicesConfig.serviceCategoryCardDescriptionColor,
          iconColor:
            category.iconColor || servicesConfig.serviceItemCardIconColor,
          icon: categoryIcon,
          colorGradient: categoryColorGradient,
        };

        // Process service icons
        const processedServices = category.services.map((service) => {
          const serviceIcon =
            typeof service.icon === "string"
              ? getIconComponent(service.icon)
              : service.icon;

          // Apply global config colors if not specified in the service
          return {
            ...service,
            icon: serviceIcon,
            titleColor:
              service.titleColor || servicesConfig.serviceItemCardTitleColor,
            descriptionColor:
              service.descriptionColor ||
              servicesConfig.serviceItemCardDescriptionColor,
            iconColor:
              service.iconColor || servicesConfig.serviceItemCardIconColor,
            bgColor: service.bgColor || servicesConfig.serviceItemCardBgColor,
            borderColor:
              service.borderColor || servicesConfig.serviceItemCardBorderColor,
          };
        });

        return { ...processedCategory, services: processedServices };
      });
    };

    const categories = servicesConfig.serviceCategories
      ? processCategories(servicesConfig.serviceCategories as any)
      : processCategories(fallbackCategories);

    setServiceCategoriesData(categories);
  }, []); // Empty dependency array to only run once

  const selectedCategoryData = serviceCategoriesData.find(
    (c) => c.id === selectedCategory
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative">
      <Header />

      {/* Hero Section */}
      <section
        className="relative pt-24 md:pt-32 pb-16 overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600"
        style={{
          backgroundImage: servicesConfig.heroImage
            ? `linear-gradient(to bottom right, ${
                servicesConfig.heroBgGradientFrom || "#dc7070"
              }, ${servicesConfig.heroBgGradientVia || "#e69999"}, ${
                servicesConfig.heroBgGradientTo || "#e69999"
              }), url(${
                servicesConfig.heroImage.startsWith("/")
                  ? servicesConfig.heroImage
                  : `/images/${servicesConfig.heroImage}`
              })`
            : `linear-gradient(to bottom right, ${
                servicesConfig.heroBgGradientFrom || "#dc7070"
              }, ${servicesConfig.heroBgGradientVia || "#e69999"}, ${
                servicesConfig.heroBgGradientTo || "#e69999"
              })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large blurred circles */}
          <div
            className="absolute w-[500px] h-[500px] -top-48 -left-48 rounded-full blur-3xl animate-blob"
            style={{
              backgroundColor: `${
                servicesConfig.heroBlurredCircle1Color ||
                "rgba(220, 112, 112, 0.2)"
              }`,
            }}
          ></div>
          <div
            className="absolute w-[400px] h-[400px] -bottom-48 -right-48 rounded-full blur-3xl animate-blob animation-delay-2000"
            style={{
              backgroundColor: `${
                servicesConfig.heroBlurredCircle2Color ||
                "rgba(230, 153, 153, 0.2)"
              }`,
            }}
          ></div>

          {/* Decorative patterns */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, ${
                  servicesConfig.heroPatternColor || "rgba(255,255,255,0.15)"
                } 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            ></div>
          </div>

          {/* Subtle light beams */}
          <div
            className="absolute -top-24 left-1/4 w-96 h-96 rotate-12 transform-gpu"
            style={{
              background: `linear-gradient(to bottom, ${
                servicesConfig.heroLightBeam1Color || "rgba(220, 112, 112, 0.3)"
              }, transparent)`,
            }}
          ></div>
          <div
            className="absolute -bottom-24 right-1/4 w-96 h-96 -rotate-12 transform-gpu"
            style={{
              background: `linear-gradient(to top, ${
                servicesConfig.heroLightBeam2Color || "rgba(220, 112, 112, 0.3)"
              }, transparent)`,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4">
              <div
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                style={{
                  backgroundColor:
                    servicesConfig.heroBadgeBgColor ||
                    "rgba(255, 255, 255, 0.1)",
                }}
              >
                <div className="w-6 h-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="w-6 h-6"
                    fill="currentColor"
                    style={{
                      color:
                        servicesConfig.heroBadgeMedalIconColor || "#fbbf24",
                    }}
                  >
                    <path d="M20,2H4V4L9.81,8.36C6.14,9.57 4.14,13.53 5.35,17.2C6.56,20.87 10.5,22.87 14.19,21.66C17.86,20.45 19.86,16.5 18.65,12.82C17.95,10.71 16.3,9.05 14.19,8.36L20,4V2M14.94,19.5L12,17.78L9.06,19.5L9.84,16.17L7.25,13.93L10.66,13.64L12,10.5L13.34,13.64L16.75,13.93L14.16,16.17L14.94,19.5Z" />
                  </svg>
                </div>
                <span
                  className="text-sm font-medium text-white"
                  style={{
                    color: servicesConfig.heroBadgeTextColor || "#ffffff",
                  }}
                >
                  {servicesConfig.badge || "Certified Auto Body Shop"}
                </span>
                <svg
                  className="w-5 h-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style={{
                    color: servicesConfig.heroBadgeCheckmarkColor || "#4ade80",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="text-white"
                style={{ color: servicesConfig.heroTitleColor || "#ffffff" }}
              >
                {servicesConfig.title || "Our Auto Body Services"}
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-blue-50 leading-relaxed max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                color: servicesConfig.heroSubtitleColor || "#ffffff",
                opacity: 1,
                display: "block",
                fontWeight: 400,
              }}
            >
              {servicesConfig.subtitle ||
                "Expert collision repair and auto body services. Quality work guaranteed."}
            </motion.p>

            <div className="flex justify-center gap-8">
              <div className="group relative">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to right, ${
                      servicesConfig.heroBgGradientFrom || "#dc7070"
                    }, ${servicesConfig.heroBgGradientTo || "#e69999"})`,
                  }}
                ></div>
                <div
                  className="relative px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200"
                  style={{
                    backgroundColor:
                      servicesConfig.heroStatsCardBgColor ||
                      "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <svg
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{
                        color:
                          servicesConfig.heroStatsCardIconColor || "#dc7070",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div
                    className="text-3xl font-bold text-white mb-1 font-display"
                    style={{
                      color:
                        servicesConfig.heroStatsCardValueColor || "#ffffff",
                    }}
                  >
                    {servicesConfig.card1Value || "15+"}
                  </div>
                  <div
                    className="text-sm text-blue-100 font-medium"
                    style={{
                      color: servicesConfig.heroStatsCardTextColor || "#ffffff",
                    }}
                  >
                    {servicesConfig.card1Title || "Years Experience"}
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-primary-500 rounded-xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to right, ${
                      servicesConfig.heroBgGradientTo || "#e69999"
                    }, ${servicesConfig.heroBgGradientFrom || "#dc7070"})`,
                  }}
                ></div>
                <div
                  className="relative px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200"
                  style={{
                    backgroundColor:
                      servicesConfig.heroStatsCardBgColor ||
                      "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <svg
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{
                        color:
                          servicesConfig.heroStatsCardIconColor || "#dc7070",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                  </div>
                  <div
                    className="text-3xl font-bold text-white mb-1 font-display"
                    style={{
                      color:
                        servicesConfig.heroStatsCardValueColor || "#ffffff",
                    }}
                  >
                    {servicesConfig.card2Value || "5000+"}
                  </div>
                  <div
                    className="text-sm text-blue-100 font-medium"
                    style={{
                      color: servicesConfig.heroStatsCardTextColor || "#ffffff",
                    }}
                  >
                    {servicesConfig.card2Title || "Cars Repaired"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section
        className="py-20 overflow-hidden relative"
        style={{
          background: `linear-gradient(to bottom, ${
            servicesConfig.serviceCategoriesBgColorFrom || "#f9fafb"
          }, ${servicesConfig.serviceCategoriesBgColorTo || "#f3f4f6"})`,
        }}
      >
        <MouseFollowGradient
          variant="light"
          opacity={servicesConfig.serviceCategoriesGradientOpacity || 0.6}
        />
        <div className="container mx-auto px-4">
          <div className="max-w-[90rem] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCategoriesData.map((category) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative bg-black rounded-2xl overflow-hidden aspect-[3/4] transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                >
                  <Image
                    src={
                      category.bgImage.startsWith("/")
                        ? category.bgImage
                        : `/images/${category.bgImage}`
                    }
                    alt={category.title}
                    width={1200}
                    height={1600}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="relative h-full p-6 flex flex-col justify-end">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center p-4 mb-4 transform transition-transform duration-300 group-hover:scale-110"
                      style={{
                        color: category.iconColor || "#ffffff",
                        background: category.colorGradient
                          ? `linear-gradient(to bottom right, ${category.colorGradient.fromColor}, ${category.colorGradient.toColor})`
                          : `linear-gradient(to bottom right, ${
                              servicesConfig.serviceCategoryCardGradientFrom ||
                              "#dc7070"
                            }, ${
                              servicesConfig.serviceCategoryCardGradientTo ||
                              "#e69999"
                            })`,
                      }}
                    >
                      {category.icon}
                    </div>
                    <h2
                      className="text-2xl font-display font-bold mb-2"
                      style={{
                        color: category.titleColor || "#ffffff",
                      }}
                    >
                      {category.title}
                    </h2>
                    <p
                      className="mb-4"
                      style={{
                        color: category.descriptionColor || "#f3f4f6",
                      }}
                    >
                      {category.description}
                    </p>
                    <button
                      onClick={() => handleCategorySelect(category.id)}
                      className="w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 border"
                      style={{
                        color:
                          hoveredButton === category.id
                            ? servicesConfig.serviceCategoryCardButtonHoverColor ||
                              "#ffffff"
                            : servicesConfig.serviceCategoryCardButtonColor ||
                              "#ffffff",
                        borderColor:
                          servicesConfig.serviceCategoryCardBorderColor ||
                          "#e5e7eb",
                        backgroundColor:
                          hoveredButton === category.id
                            ? servicesConfig.serviceCategoryCardButtonHoverBgColor ||
                              "#3d2ba9"
                            : servicesConfig.serviceCategoryCardButtonBgColor ||
                              "rgba(255, 255, 255, 0.1)",
                        borderWidth: "1px",
                      }}
                      onMouseEnter={() => setHoveredButton(category.id)}
                      onMouseLeave={() => setHoveredButton(null)}
                    >
                      Learn More
                      <ArrowRightIcon className="w-4 h-4 ml-2 inline-block" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedCategory && selectedCategoryData && (
          <>
            {/* Full-screen overlay that closes the modal when clicked */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 cursor-pointer"
              aria-label="Close modal"
            />
            <motion.div
              className="fixed top-20 inset-x-0 bottom-0 flex items-center justify-center z-30 p-4"
              onClick={handleCloseModal} // Close when clicking the outer container
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()} // Stop clicks within the modal from closing it
                className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl relative overflow-y-auto max-h-[90vh] md:max-h-[85vh]"
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute right-4 top-4 p-2.5 rounded-full bg-white hover:bg-gray-100 z-50 transition-colors duration-200 shadow-lg flex items-center justify-center"
                  aria-label="Close"
                  style={{
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <XMarkIcon className="w-6 h-6 text-gray-700" />
                </button>

                <div className="relative h-[250px] md:h-[400px]">
                  <Image
                    src={
                      selectedCategoryData.bgImage.startsWith("/")
                        ? selectedCategoryData.bgImage
                        : `/images/${selectedCategoryData.bgImage}`
                    }
                    alt={selectedCategoryData.title}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-start md:items-center gap-4 md:gap-6">
                      <div
                        className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center p-3 md:p-4"
                        style={{
                          color: selectedCategoryData.iconColor || "#ffffff",
                          background: selectedCategoryData.colorGradient
                            ? `linear-gradient(to bottom right, ${selectedCategoryData.colorGradient.fromColor}, ${selectedCategoryData.colorGradient.toColor})`
                            : `linear-gradient(to bottom right, ${
                                servicesConfig.serviceCategoryCardGradientFrom ||
                                "#dc7070"
                              }, ${
                                servicesConfig.serviceCategoryCardGradientTo ||
                                "#e69999"
                              })`,
                        }}
                      >
                        {selectedCategoryData.icon}
                      </div>
                      <div>
                        <h2
                          className="text-2xl md:text-3xl font-display font-bold mb-1 md:mb-2"
                          style={{
                            color: selectedCategoryData.titleColor || "#ffffff",
                          }}
                        >
                          {selectedCategoryData.title}
                        </h2>
                        <p
                          className="text-base md:text-lg line-clamp-2 md:line-clamp-none"
                          style={{
                            color:
                              selectedCategoryData.descriptionColor ||
                              "#f3f4f6",
                          }}
                        >
                          {selectedCategoryData.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                    {selectedCategoryData.services.map((service, idx) => (
                      <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="rounded-xl p-4 md:p-6 transition-colors duration-200"
                        style={{
                          backgroundColor: service.bgColor || "#f9fafb",
                          borderColor: service.borderColor || "#e5e7eb",
                          borderWidth: "1px",
                        }}
                      >
                        <div className="flex items-start gap-3 md:gap-4">
                          <div
                            className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center p-2 md:p-3 shrink-0"
                            style={{
                              color: service.iconColor || "#ffffff",
                              background: selectedCategoryData.colorGradient
                                ? `linear-gradient(to bottom right, ${selectedCategoryData.colorGradient.fromColor}, ${selectedCategoryData.colorGradient.toColor})`
                                : `linear-gradient(to bottom right, ${
                                    servicesConfig.serviceCategoryCardGradientFrom ||
                                    "#dc7070"
                                  }, ${
                                    servicesConfig.serviceCategoryCardGradientTo ||
                                    "#e69999"
                                  })`,
                            }}
                          >
                            {service.icon}
                          </div>
                          <div>
                            <h3
                              className="text-lg md:text-xl font-bold mb-1 md:mb-2"
                              style={{
                                color: service.titleColor || "#111827",
                              }}
                            >
                              {service.title}
                            </h3>
                            <p
                              className="text-sm md:text-base"
                              style={{
                                color: service.descriptionColor || "#6b7280",
                              }}
                            >
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Call to Action Section */}
      <section className="relative py-20">
        {/* Diagonal stripes background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600"
          style={{
            background: `linear-gradient(to bottom right, ${
              servicesConfig.ctaBgGradientFrom || "#dc7070"
            }, ${servicesConfig.ctaBgGradientVia || "#e69999"}, ${
              servicesConfig.ctaBgGradientTo || "#e69999"
            })`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, ${
                servicesConfig.ctaBgPatternColor || "rgba(255,255,255,0.05)"
              } 0px, ${
                servicesConfig.ctaBgPatternColor || "rgba(255,255,255,0.05)"
              } 1px, transparent 1px, transparent 40px)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div
              className="bg-white/5 backdrop-blur-[2px] rounded-xl py-8 px-12"
              style={{
                backgroundColor:
                  servicesConfig.ctaCardBgColor || "rgba(255, 255, 255, 0.05)",
                borderColor:
                  servicesConfig.ctaCardBorderColor ||
                  "rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="text-center">
                <h2
                  className="text-3xl md:text-4xl font-display font-bold text-white mb-3"
                  style={{ color: servicesConfig.ctaTitleColor || "#ffffff" }}
                >
                  {servicesConfig.ctaTitle ||
                    "Ready to Get Your Car Back to Perfect?"}
                </h2>
                <p
                  className="text-xl text-blue-50 mb-6"
                  style={{
                    color: servicesConfig.ctaDescriptionColor || "#ffffff",
                  }}
                >
                  {servicesConfig.ctaDescription ||
                    "Schedule your appointment today and experience the difference expert auto body repair makes."}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = "/#schedule";
                    }}
                    className="inline-flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-100 text-primary-600 font-semibold rounded-lg transition-colors duration-200"
                    style={{
                      backgroundColor:
                        servicesConfig.scheduleButtonBgColor || "#ffffff",
                      color:
                        servicesConfig.scheduleButtonTextColor || "#dc7070",
                    }}
                  >
                    {servicesConfig.scheduleButtonText || "Schedule Now"}
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </a>
                  <a
                    href="tel:+17704950050"
                    className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
                    style={{
                      backgroundColor:
                        servicesConfig.callButtonBgColor || "#dc7070",
                      color: servicesConfig.callButtonTextColor || "#ffffff",
                    }}
                  >
                    {servicesConfig.callButtonText || "Call Us Now"}
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function Services() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
