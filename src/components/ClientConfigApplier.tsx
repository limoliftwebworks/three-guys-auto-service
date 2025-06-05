"use client";

import { useEffect } from "react";
import localConfig from "../config/localConfig";

export default function ClientConfigApplier() {
  useEffect(() => {
    // Apply loading configuration CSS variables
    const loadingConfig = localConfig.loadingScreen || {
      backgroundColor: "#FFFFFF",
      timing: { fadeOutDuration: 500, minimumDisplayTime: 800 },
      spinner: { size: 60, thickness: 4, color: "#1d4ed8", enabled: true },
      logoWidth: 280,
    };

    document.documentElement.style.setProperty(
      "--loading-bg-color",
      loadingConfig.backgroundColor
    );
    document.documentElement.style.setProperty(
      "--loading-fade-duration",
      `${loadingConfig.timing.fadeOutDuration}ms`
    );
    document.documentElement.style.setProperty(
      "--spinner-size",
      `${loadingConfig.spinner.size}px`
    );
    document.documentElement.style.setProperty(
      "--spinner-thickness",
      `${loadingConfig.spinner.thickness}px`
    );
    document.documentElement.style.setProperty(
      "--spinner-color",
      loadingConfig.spinner.color
    );
    document.documentElement.style.setProperty(
      "--spinner-display",
      loadingConfig.spinner.enabled ? "block" : "none"
    );
    document.documentElement.style.setProperty(
      "--logo-width",
      `${loadingConfig.logoWidth}px`
    );

    // Apply theme colors
    const themeColor = localConfig.themeColor || "#1e40af";
    const themeColorLight = `${themeColor}22`;

    document.documentElement.style.setProperty("--theme-color", themeColor);
    document.documentElement.style.setProperty(
      "--theme-color-light",
      themeColorLight
    );

    // Set browser title
    const browserConfig = localConfig.browser || {};
    if (browserConfig.title) {
      document.title = browserConfig.title;
    }

    // Handle smaller browser tabs using shortTitle
    if (browserConfig.shortTitle) {
      const handleVisibilityChange = () => {
        document.title = document.hidden
          ? browserConfig.shortTitle ||
            browserConfig.title ||
            "Davis Tree Service"
          : browserConfig.title || "Davis Tree Service";
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Cleanup
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }
  }, []);

  return null; // This component doesn't render anything
}
