"use client";

import { useEffect, useCallback } from "react";

interface ClientStylesApplierProps {
  config: any;
  loadingConfig: any;
}

export default function ClientStylesApplier({
  config,
  loadingConfig,
}: ClientStylesApplierProps) {
  // Move cursor enforcement function outside useEffect to avoid function declaration in block
  const enforceCursorNone = useCallback(() => {
    if (typeof window === "undefined") return;

    if (
      window.innerWidth >= 663 &&
      !document.documentElement.classList.contains("mobile-device") &&
      document.documentElement.getAttribute("data-is-mobile") !== "true"
    ) {
      // Force cursor: none on everything
      const allElements = document.querySelectorAll("*");
      allElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.setProperty("cursor", "none", "important");
        }
      });
    }
  }, []);

  // Mobile detection function
  const handleMobileDetection = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      const userAgent =
        navigator.userAgent || navigator.vendor || (window as any).opera;
      const isIOS =
        /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
      const isAndroid = /Android/i.test(userAgent);
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        ) || window.innerWidth < 663;

      if (isIOS || isAndroid || isMobile) {
        document.documentElement.setAttribute("data-is-mobile", "true");
        document.documentElement.classList.add("mobile-device");
      } else {
        document.documentElement.setAttribute("data-is-mobile", "false");
        document.documentElement.classList.remove("mobile-device");
      }

      // Add resize listener to update attribute based on width
      const handleResize = () => {
        if (window.innerWidth < 663) {
          document.documentElement.setAttribute("data-is-mobile", "true");
          document.documentElement.classList.add("mobile-device");
        } else if (!isIOS && !isAndroid && !isMobile) {
          document.documentElement.setAttribute("data-is-mobile", "false");
          document.documentElement.classList.remove("mobile-device");
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    } catch (e) {
      console.error("Error in mobile detection:", e);
    }
  }, []);

  useEffect(() => {
    // Only run on client side after hydration
    if (typeof window === "undefined") return;

    try {
      // Extract theme color if available
      const themeColor = config.themeColor || "#1e40af"; // Default to blue
      const themeColorLight = `${themeColor}22`; // 13% opacity for backgrounds

      // Handle mobile detection after hydration
      const cleanupResize = handleMobileDetection();

      // Set loading configuration CSS variables
      document.documentElement.style.setProperty(
        "--loading-bg-color",
        loadingConfig.backgroundColor || "#FFFFFF"
      );
      document.documentElement.style.setProperty(
        "--loading-fade-duration",
        `${loadingConfig.timing?.fadeOutDuration || 500}ms`
      );
      document.documentElement.style.setProperty(
        "--spinner-size",
        `${loadingConfig.spinner?.size || 60}px`
      );
      document.documentElement.style.setProperty(
        "--spinner-thickness",
        `${loadingConfig.spinner?.thickness || 4}px`
      );
      document.documentElement.style.setProperty(
        "--spinner-color",
        loadingConfig.spinner?.color || "#1d4ed8"
      );
      document.documentElement.style.setProperty(
        "--spinner-display",
        loadingConfig.spinner?.enabled !== false ? "block" : "none"
      );
      document.documentElement.style.setProperty(
        "--logo-width",
        `${loadingConfig.logoWidth || 280}px`
      );

      // Apply theme colors
      document.documentElement.style.setProperty("--theme-color", themeColor);
      document.documentElement.style.setProperty(
        "--theme-color-light",
        themeColorLight
      );

      // Remove no-js class
      document.documentElement.classList.remove("no-js");

      // Run cursor enforcement immediately
      enforceCursorNone();

      // And on periodic intervals to catch any dynamic elements
      const cursorInterval = setInterval(enforceCursorNone, 1000);

      // Cleanup interval on unmount
      return () => {
        clearInterval(cursorInterval);
        if (cleanupResize) cleanupResize();
      };
    } catch (e) {
      console.error("Error in ClientStylesApplier:", e);
    }
  }, [config, loadingConfig, enforceCursorNone, handleMobileDetection]);

  // This component doesn't render anything visible
  return null;
}
