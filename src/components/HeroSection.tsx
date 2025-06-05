import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  SparklesIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import OptimizedImage from "./OptimizedImage";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  content?: string;
  location?: string;
  backgroundImage?: string;
  mobileBackgroundImage?: string;
  badge?: string;
  heroBadgeColor?: string;
  heroBadgeTitleColor?: string;
  heroTitleColor?: string;
  heroLocationColor?: string;
  heroContentColor?: string;
  heroSubtitleColor?: string;
  scheduleButtonText?: string;
  scheduleButtonColor?: string;
  scheduleButtonTextColor?: string;
  contactButtonText?: string;
  contactButtonColor?: string;
  contactButtonTextColor?: string;
  heroContactButtonBorderColor?: string;
  heroContactButtonHoverColor?: string;
  heroContactButtonHoverTextColor?: string;
  heroContactButtonHoverBorderColor?: string;
  heroCard1Text?: string;
  heroCard2Text?: string;
  heroCard3Text?: string;
  heroBox1BgColor?: string;
  heroBox1TextColor?: string;
  heroBox1BorderColor?: string;
  heroBox1IconBgColor?: string;
  heroBox1IconColor?: string;
  heroBox2BgColor?: string;
  heroBox2TextColor?: string;
  heroBox2BorderColor?: string;
  heroBox2IconBgColor?: string;
  heroBox2IconColor?: string;
  heroBox3BgColor?: string;
  heroBox3TextColor?: string;
  heroBox3BorderColor?: string;
  heroBox3IconBgColor?: string;
  heroBox3IconColor?: string;
  heroGradientTop?: string;
  heroGradientBottom?: string;
  heroGradientLeft?: string;
  heroRadialColor?: string;
  onShowInstructions?: () => void;
}

export default function HeroSection({
  title = "Welcome to our Site",
  subtitle = "We provide the best services",
  content = "",
  location = "",
  backgroundImage = "",
  mobileBackgroundImage = "",
  badge = "",
  heroBadgeColor = "#1787c9",
  heroBadgeTitleColor = "#fff",
  heroTitleColor = "#fff",
  heroLocationColor = "#38bdf8",
  heroContentColor = "#fff",
  heroSubtitleColor = "#fff",
  scheduleButtonText = "Schedule Now",
  scheduleButtonColor = "#c9ba18",
  scheduleButtonTextColor = "#ffffff",
  contactButtonText = "Contact Us",
  contactButtonColor = "#ffffff",
  contactButtonTextColor = "#4fc917",
  heroContactButtonBorderColor = "#ffffff",
  heroContactButtonHoverColor = "#4fc917",
  heroContactButtonHoverTextColor = "#ffffff",
  heroContactButtonHoverBorderColor = "#4fc917",
  heroCard1Text = "Hero Card 1",
  heroCard2Text = "Hero Card 2",
  heroCard3Text = "Hero Card 3",
  heroBox1BgColor = "#25647a",
  heroBox1TextColor = "#fff",
  heroBox1BorderColor = "#25647a",
  heroBox1IconBgColor = "rgba(255,255,255,0.1)",
  heroBox1IconColor = "#fff",
  heroBox2BgColor = "#25647a",
  heroBox2TextColor = "#fff",
  heroBox2BorderColor = "#25647a",
  heroBox2IconBgColor = "rgba(255,255,255,0.1)",
  heroBox2IconColor = "#fff",
  heroBox3BgColor = "#25647a",
  heroBox3TextColor = "#fff",
  heroBox3BorderColor = "#25647a",
  heroBox3IconBgColor = "rgba(255,255,255,0.1)",
  heroBox3IconColor = "#fff",
  heroGradientTop = "#2563eb",
  heroGradientBottom = "#1e293b",
  heroGradientLeft = "#1e293b",
  heroRadialColor = "#38bdf8",
  onShowInstructions = () => {},
}: HeroSectionProps) {
  // State to track if the component has mounted
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Ensure client-side rendering for background image and detect mobile
  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical mobile breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Function to ensure image URLs are properly formatted
  const getImageUrl = (src: string) => {
    if (!src) return "";
    // If it's a data URL or absolute URL, return as is
    if (
      src.startsWith("data:") ||
      src.startsWith("http://") ||
      src.startsWith("https://")
    ) {
      return src;
    }
    // If it doesn't start with a slash or 'images/', prepend '/images/'
    if (!src.startsWith("/") && !src.startsWith("images/")) {
      return `/images/${src}`;
    }
    // For relative URLs, ensure they start with a slash
    return src.startsWith("/") ? src : `/${src}`;
  };

  // Helper function to convert hex to rgba with alpha
  const hexToRgba = (hex: string, alpha: number) => {
    if (!hex) return `rgba(0, 0, 0, ${alpha})`;
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
  };

  // Use default values if not provided
  const finalGradientTop = heroGradientTop || "#8b2424";
  const finalGradientBottom = heroGradientBottom || "#000000";
  const finalGradientLeft = heroGradientLeft || finalGradientBottom;
  const finalRadialColor = heroRadialColor || "#f5d6d6";

  // console.log("Hero Gradient Colors:", {
  //   top: finalGradientTop,
  //   bottom: finalGradientBottom,
  //   left: finalGradientLeft,
  //   radial: finalRadialColor,
  // });

  return (
    <section
      className="hero-section relative overflow-hidden"
      style={{
        position: "relative",
        minHeight: "90vh",
      }}
    >
      {/* Hero Background Image with Optimized Image */}
      {mounted && (
        <div className="absolute inset-0">
          {/* Desktop/Mobile Image Logic */}
          {isMobile && mobileBackgroundImage ? (
            <OptimizedImage
              src={getImageUrl(mobileBackgroundImage)}
              alt="Background"
              fill
              priority={true}
              quality={85}
              blurEffect={true}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                zIndex: 0,
              }}
            />
          ) : backgroundImage ? (
            <OptimizedImage
              src={getImageUrl(backgroundImage)}
              alt="Background"
              fill
              priority={true}
              quality={85}
              blurEffect={true}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                zIndex: 0,
              }}
            />
          ) : null}
        </div>
      )}

      {/* Top dark blue gradient overlay for navbar transition */}
      <div
        className="absolute top-0 left-0 w-full h-16 z-30 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${hexToRgba(
            finalGradientBottom,
            0.85
          )} 0%, ${hexToRgba(finalGradientBottom, 0)} 100%)`,
        }}
      ></div>

      {/* Main overlay gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${hexToRgba(
            finalGradientTop,
            0.5
          )} 0%, ${hexToRgba(finalGradientTop, 0.25)} 50%, ${hexToRgba(
            finalGradientBottom,
            0.4
          )} 100%)`,
          zIndex: 1,
        }}
      ></div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${hexToRgba(
            finalGradientLeft,
            0.3
          )} 0%, transparent 100%)`,
          zIndex: 1,
        }}
      ></div>

      {/* Tech pattern overlay */}
      <div className="absolute inset-0 opacity-20" style={{ zIndex: 2 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, ${hexToRgba(
                finalRadialColor,
                0.15
              )} 0%, transparent 8%),
              radial-gradient(circle at 80% 20%, ${hexToRgba(
                finalRadialColor,
                0.15
              )} 0%, transparent 6%),
              radial-gradient(circle at 40% 70%, ${hexToRgba(
                finalRadialColor,
                0.15
              )} 0%, transparent 12%),
              radial-gradient(circle at 70% 50%, ${hexToRgba(
                finalRadialColor,
                0.15
              )} 0%, transparent 10%),
              linear-gradient(to bottom right, transparent 0%, transparent 100%)
            `,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      <div
        className="container mx-auto px-4 relative z-20 h-full flex items-center"
        style={{ minHeight: "90vh" }}
      >
        <motion.div
          className="hero-content max-w-3xl md:py-12 w-full pt-6 sm:pt-10 md:pt-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge from config */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 sm:mb-8 inline-block"
            >
              <span
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-lg backdrop-blur-sm"
                style={{
                  background: heroBadgeColor,
                  color: heroBadgeTitleColor,
                }}
              >
                {badge}
              </span>
            </motion.div>
          )}
          {/* Title and location from config */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-display font-extrabold mb-4 sm:mb-8 leading-[1.1] drop-shadow-xl text-left">
            <span style={{ color: heroTitleColor }}>{title}</span>
            {location && (
              <span
                className="drop-shadow-xl font-extrabold block sm:inline"
                style={{ color: heroLocationColor }}
              >
                {location}
              </span>
            )}
          </h1>
          {/* Main content and subtitle from config */}
          <div
            className="text-base sm:text-xl mb-6 sm:mb-12 max-w-2xl leading-relaxed drop-shadow-lg font-medium text-left"
            style={{ color: heroContentColor }}
          >
            {content && <div>{content.replace(/<[^>]+>/g, "")}</div>}
            {subtitle && (
              <span
                className="block sm:inline"
                style={{ color: heroSubtitleColor }}
              >
                {" "}
                {subtitle}
              </span>
            )}
          </div>
          {/* Scheduling and Contact buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full items-start justify-start mb-8">
            <motion.a
              href="#schedule"
              onClick={(e) => {
                e.preventDefault();
                const scheduleSection = document.getElementById("schedule");
                if (scheduleSection) {
                  scheduleSection.scrollIntoView({ behavior: "smooth" });
                } else {
                  // Fallback if section not found
                  window.location.href = "/#schedule";
                }
              }}
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-20 py-3 sm:py-4 min-w-[140px] sm:min-w-[320px] rounded-lg font-semibold text-base sm:text-2xl transition-all duration-300 shadow-xl hover:shadow-2xl relative group overflow-hidden text-left"
              style={{
                background: scheduleButtonColor,
                color: scheduleButtonTextColor,
                border: "none",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Scroll to schedule section"
            >
              {scheduleButtonText}
            </motion.a>
            <motion.a
              href="/contact"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-20 py-3 sm:py-4 min-w-[140px] sm:min-w-[320px] rounded-lg font-semibold text-base sm:text-2xl transition-all duration-300 shadow-xl hover:shadow-2xl relative group overflow-hidden text-left"
              style={{
                background: contactButtonColor,
                color: contactButtonTextColor,
                border: `2px solid ${
                  heroContactButtonBorderColor || contactButtonColor
                }`,
                transition: "all 0.3s",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  heroContactButtonHoverColor || "#4fc917";
                e.currentTarget.style.color =
                  heroContactButtonHoverTextColor || "#ffffff";
                e.currentTarget.style.border = `2px solid ${
                  heroContactButtonHoverBorderColor || "#4fc917"
                }`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = contactButtonColor;
                e.currentTarget.style.color = contactButtonTextColor;
                e.currentTarget.style.border = `2px solid ${
                  heroContactButtonBorderColor || contactButtonColor
                }`;
              }}
            >
              <span className="mr-2">{contactButtonText}</span>
              <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>
          {/* Hero boxes - single column on mobile, fixed width and aligned on desktop */}
          <div className="flex flex-col sm:flex-row sm:justify-start gap-4 sm:gap-6 w-full items-center">
            {[
              {
                icon: <ShieldCheckIcon className="w-7 h-7" />,
                text: heroCard1Text,
                boxBg: heroBox1BgColor,
                textColor: heroBox1TextColor,
                borderColor: heroBox1BorderColor,
                iconBg: heroBox1IconBgColor,
                iconColor: heroBox1IconColor,
              },
              {
                icon: <SparklesIcon className="w-7 h-7" />,
                text: heroCard2Text,
                boxBg: heroBox2BgColor,
                textColor: heroBox2TextColor,
                borderColor: heroBox2BorderColor,
                iconBg: heroBox2IconBgColor,
                iconColor: heroBox2IconColor,
              },
              {
                icon: <ClockIcon className="w-7 h-7" />,
                text: heroCard3Text,
                boxBg: heroBox3BgColor,
                textColor: heroBox3TextColor,
                borderColor: heroBox3BorderColor,
                iconBg: heroBox3IconBgColor,
                iconColor: heroBox3IconColor,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 w-full sm:w-auto flex-1 mb-4 sm:mb-0"
                style={{
                  background: item.boxBg,
                  borderColor: item.borderColor,
                }}
              >
                <div
                  className="p-2 rounded-xl flex items-center justify-center"
                  style={{ background: item.iconBg }}
                >
                  {React.cloneElement(item.icon, {
                    style: { color: item.iconColor },
                  })}
                </div>
                <span
                  className="font-bold text-base sm:text-lg tracking-wide whitespace-nowrap"
                  style={{ color: item.textColor }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
