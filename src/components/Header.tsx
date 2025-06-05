"use client";

import Link from "next/link";
import {
  PhoneIcon,
  MapPinIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useConfig } from "@/context/ConfigContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const config = useConfig();

  // Add local state for InfoBar settings to ensure persistence
  const [infoBarBgColor, setInfoBarBgColor] = useState<string>("#1787c9");
  const [infoBarTextColor, setInfoBarTextColor] = useState<string>("#ffffff");

  const navBar = config.navBar || {};
  const navLinks = navBar.navLinks || [];
  const navBg = navBar.backgroundColor || "#fff";
  const navText = navBar.textColor || "#0369a1";

  const infoBar = config.infoBar || {};

  // Load InfoBar colors from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Try to load from the most recent source of truth
      try {
        // First check sessionStorage for preview config
        const previewConfig = sessionStorage.getItem("previewConfig");
        if (previewConfig) {
          const parsedConfig = JSON.parse(previewConfig);
          if (parsedConfig.infoBar?.backgroundColor) {
            setInfoBarBgColor(parsedConfig.infoBar.backgroundColor);
          }
          if (parsedConfig.infoBar?.textColor) {
            setInfoBarTextColor(parsedConfig.infoBar.textColor);
          }
          return;
        }

        // Then check localStorage for saved config
        const savedConfig = localStorage.getItem("siteConfig");
        if (savedConfig) {
          const parsedConfig = JSON.parse(savedConfig);
          if (parsedConfig.infoBar?.backgroundColor) {
            setInfoBarBgColor(parsedConfig.infoBar.backgroundColor);
          }
          if (parsedConfig.infoBar?.textColor) {
            setInfoBarTextColor(parsedConfig.infoBar.textColor);
          }
        }
      } catch (error) {
        console.error("Error loading InfoBar colors from storage:", error);
      }
    }
  }, []);

  // Update local state when config changes
  useEffect(() => {
    if (infoBar.backgroundColor) {
      setInfoBarBgColor(infoBar.backgroundColor);
    }
    if (infoBar.textColor) {
      setInfoBarTextColor(infoBar.textColor);
    }
  }, [infoBar.backgroundColor, infoBar.textColor]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll(); // Check initial scroll position
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActivePath = (path: any) => {
    if (path === "/" || path.toLowerCase() === "home") return pathname === "/";
    return pathname === path;
  };

  // Listen for direct DOM updates from preview iframe
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleMessage = (event: MessageEvent) => {
        if (
          event.data &&
          event.data.type === "configUpdate" &&
          event.data.config?.infoBar
        ) {
          if (event.data.config.infoBar.backgroundColor) {
            setInfoBarBgColor(event.data.config.infoBar.backgroundColor);
          }
          if (event.data.config.infoBar.textColor) {
            setInfoBarTextColor(event.data.config.infoBar.textColor);
          }
        }
      };

      window.addEventListener("message", handleMessage);

      // Listen for custom event from InfoBarConfig
      const handleInfoBarColorChange = (event: CustomEvent) => {
        const { colorType, value } = event.detail;
        if (colorType === "backgroundColor") {
          setInfoBarBgColor(value);
        } else if (colorType === "textColor") {
          setInfoBarTextColor(value);
        }
      };

      // Also listen for custom event
      const handleConfigChange = () => {
        if (window && (window as any).__PREVIEW_CONFIG__?.infoBar) {
          const previewConfig = (window as any).__PREVIEW_CONFIG__;
          if (previewConfig.infoBar.backgroundColor) {
            setInfoBarBgColor(previewConfig.infoBar.backgroundColor);
          }
          if (previewConfig.infoBar.textColor) {
            setInfoBarTextColor(previewConfig.infoBar.textColor);
          }
        }
      };

      // Listen for config saved event
      const handleConfigSaved = (event: CustomEvent) => {
        const { config } = event.detail;
        if (config?.infoBar) {
          if (config.infoBar.backgroundColor) {
            setInfoBarBgColor(config.infoBar.backgroundColor);
          }
          if (config.infoBar.textColor) {
            setInfoBarTextColor(config.infoBar.textColor);
          }
        }
      };

      document.addEventListener("preview-config-loaded", handleConfigChange);
      document.addEventListener(
        "infobar-color-changed",
        handleInfoBarColorChange as EventListener
      );
      document.addEventListener(
        "config-saved",
        handleConfigSaved as EventListener
      );

      return () => {
        window.removeEventListener("message", handleMessage);
        document.removeEventListener(
          "preview-config-loaded",
          handleConfigChange
        );
        document.removeEventListener(
          "infobar-color-changed",
          handleInfoBarColorChange as EventListener
        );
        document.removeEventListener(
          "config-saved",
          handleConfigSaved as EventListener
        );
      };
    }
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      {/* Top info bar: phone, location, hours only */}
      <div
        className="w-full transition-all duration-300 ease-out backdrop-blur-sm hidden md:block relative overflow-hidden"
        style={{
          background: infoBarBgColor,
          height: isScrolled ? "0" : "44px",
          opacity: isScrolled ? "0" : "1",
          overflow: "hidden",
        }}
        suppressHydrationWarning
      >
        <div className="container mx-auto px-4 h-11">
          <div className="h-full flex items-center justify-between">
            <div className="flex items-center gap-8 text-sm">
              {infoBar.phone && (
                <span
                  className="flex items-center gap-2 relative"
                  style={{ color: infoBarTextColor }}
                >
                  {/* Semi-transparent background only around the icon */}
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                    <PhoneIcon className="h-4 w-4 relative z-10" />
                  </span>
                  <span className="font-medium tracking-wide relative z-10">
                    {infoBar.phone}
                  </span>
                </span>
              )}
              {infoBar.address && (
                <span
                  className="flex items-center gap-2 relative"
                  style={{ color: infoBarTextColor }}
                >
                  {/* Semi-transparent background only around the icon */}
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                    <MapPinIcon className="h-4 w-4 flex-shrink-0 relative z-10" />
                  </span>
                  <span className="font-medium tracking-wide relative z-10">
                    {infoBar.address}
                  </span>
                </span>
              )}
            </div>
            {infoBar.hours && (
              <div
                className="flex items-center gap-2"
                style={{ color: infoBarTextColor }}
              >
                <span className="bg-white/20 px-4 py-1.5 rounded-full font-medium tracking-wide">
                  {infoBar.hours}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur" : "bg-white"
        } ${isScrolled ? "shadow-md" : ""}`}
        style={{
          background: navBg,
        }}
        suppressHydrationWarning
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-3">
            <Link href="/" className="relative group flex items-center gap-2">
              {(config.navBar?.showLogo !== undefined
                ? config.navBar.showLogo
                : config.showLogo) && config.navBar?.logo ? (
                <img
                  src={
                    config.navBar.logo.startsWith("/")
                      ? config.navBar.logo
                      : `/images/${config.navBar.logo}`
                  }
                  alt={config.navBar.siteTitle}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <span
                  className="font-bold text-2xl md:text-3xl font-rubik leading-tight select-none"
                  style={{
                    background: `linear-gradient(90deg, ${
                      config.navBar?.siteTitleGradientFrom || "#3b82f6"
                    }, ${config.navBar?.siteTitleGradientTo || "#06b6d4"})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                    display: "inline",
                  }}
                >
                  {config.navBar?.siteTitle || "Site Title"}
                </span>
              )}
            </Link>
            <div className="flex-1 flex justify-center">
              <div className="hidden md:flex items-center gap-10">
                {navLinks.map((item: any) => (
                  <Link
                    key={item.label}
                    href={item.path}
                    className="relative group transition-colors duration-300"
                    style={{ color: navText }}
                  >
                    <span
                      className={`relative font-medium tracking-wide inline-block py-2.5 text-base ${
                        isActivePath(item.path) ? "" : ""
                      }`}
                      style={
                        isActivePath(item.path)
                          ? {
                              color: config.navBar?.activeTabColor || "#3b82f6",
                            }
                          : {}
                      }
                    >
                      {item.label}
                      <span
                        className="absolute left-0 bottom-0 w-full h-0.5 transform origin-left transition-transform duration-300 ease-out"
                        style={{
                          background: isActivePath(item.path)
                            ? config.navBar?.activeTabColor || "#3b82f6"
                            : "transparent",
                          transform: isActivePath(item.path)
                            ? "scaleX(1)"
                            : "scaleX(0)",
                        }}
                      ></span>
                      <span
                        className="absolute left-0 -bottom-px w-full h-[2px] transform origin-left transition-transform duration-300 ease-out delay-75"
                        style={{
                          background: isActivePath(item.path)
                            ? (config.navBar?.activeTabColor || "#3b82f6") +
                              "33"
                            : "transparent",
                          transform: isActivePath(item.path)
                            ? "scaleX(1)"
                            : "scaleX(0)",
                        }}
                      ></span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative p-2 rounded-lg transition-all duration-300 group"
              style={{
                backgroundColor:
                  config.navBar?.hamburgerIconHoverBgColor ||
                  "rgba(102, 191, 155, 0.1)",
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div
                className="absolute inset-0 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundColor:
                    config.navBar?.hamburgerIconHoverBgColor ||
                    "rgba(102, 191, 155, 0.1)",
                }}
              ></div>
              {isMobileMenuOpen ? (
                <XMarkIcon
                  className="h-5 w-5 relative z-10 transition-transform duration-300 transform group-hover:scale-110"
                  style={{
                    color: config.navBar?.hamburgerIconColor || "#387e62",
                  }}
                />
              ) : (
                <Bars3Icon
                  className="h-5 w-5 relative z-10 transition-transform duration-300 transform group-hover:scale-110"
                  style={{
                    color: config.navBar?.hamburgerIconColor || "#387e62",
                  }}
                />
              )}
            </button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block ml-4"
            >
              <Link
                href="/"
                className="inline-flex items-center justify-center text-white h-11 px-6 rounded-md font-medium shadow-lg transition-all duration-300 hover:shadow-xl whitespace-nowrap"
                style={{
                  background: config.navBar?.scheduleButtonColor || "#2563eb",
                  border: "none",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname === "/") {
                    document
                      .getElementById("schedule")
                      ?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = "/#schedule";
                  }
                }}
              >
                {config.navBar?.scheduleButtonText || "Schedule Now"}
              </Link>
            </motion.div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <div
              className="absolute right-0 top-0 h-full w-64 shadow-xl"
              style={{
                backgroundColor: config.navBar?.mobileMenuBgColor || "#ffffff",
              }}
              suppressHydrationWarning
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="p-2 border-b border-gray-200">
                  <Link href="/">
                    {(config.navBar?.showLogo !== undefined
                      ? config.navBar.showLogo
                      : config.showLogo) && config.navBar?.logo ? (
                      <img
                        src={
                          config.navBar.logo.startsWith("/")
                            ? config.navBar.logo
                            : `/images/${config.navBar.logo}`
                        }
                        alt={config.navBar.siteTitle}
                        className="h-8 w-auto object-contain"
                      />
                    ) : (
                      <span
                        className="font-bold text-2xl md:text-3xl font-rubik leading-tight select-none"
                        style={{
                          background: `linear-gradient(90deg, ${
                            config.navBar?.siteTitleGradientFrom || "#3b82f6"
                          }, ${
                            config.navBar?.siteTitleGradientTo || "#06b6d4"
                          })`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          color: "transparent",
                          display: "inline",
                        }}
                      >
                        {config.navBar?.siteTitle || "Site Title"}
                      </span>
                    )}
                  </Link>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex-1 p-4">
                  <div className="flex flex-col space-y-4">
                    {navLinks.map((item: any) => (
                      <Link
                        key={item.label}
                        href={item.path}
                        className={`text-lg font-medium py-2 px-4 rounded-lg transition-colors`}
                        style={{
                          backgroundColor: isActivePath(item.path)
                            ? config.navBar?.mobileActiveTabBgColor ||
                              "rgba(102, 191, 155, 0.1)"
                            : "transparent",
                          color: isActivePath(item.path)
                            ? config.navBar?.mobileActiveTabTextColor ||
                              "#387e62"
                            : config.navBar?.mobileNavTextColor || "#111827",
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Mobile Menu Footer */}
                <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <div className="text-center space-y-3">
                    <div className="flex flex-col items-center gap-2 mb-4">
                      <a
                        href="tel:+17704950050"
                        className="text-gray-600 hover:text-primary-600 transition-colors flex items-center gap-2"
                      >
                        <PhoneIcon className="h-4 w-4" />
                        <span>(770) 495-0050</span>
                      </a>
                      <div className="text-sm text-gray-500">
                        Mon-Fri: 8:30 AM - 6:00 PM
                      </div>
                    </div>
                    <Link
                      href="/"
                      className="w-full inline-flex items-center justify-center text-white h-11 px-6 rounded-md font-medium shadow-lg transition-all duration-300 hover:shadow-xl whitespace-nowrap"
                      style={{
                        background:
                          config.navBar?.scheduleButtonColor || "#2563eb",
                        border: "none",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        if (window.location.pathname === "/") {
                          document
                            .getElementById("schedule")
                            ?.scrollIntoView({ behavior: "smooth" });
                        } else {
                          window.location.href = "/#schedule";
                        }
                      }}
                    >
                      {config.navBar?.scheduleButtonText || "Schedule Now"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
