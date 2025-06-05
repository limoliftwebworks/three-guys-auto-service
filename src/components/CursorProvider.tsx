"use client";

import React, { useState, useEffect } from "react";
import CustomCursor from "./CustomCursor";
import localConfig from "@/config/localConfig";

// Get cursor settings from localConfig
const cursorSettings = localConfig.cursor || {
  enabled: true,
  mobileEnabled: false,
  cursorImage: undefined,
  elementCursorImage: undefined,
};

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Check if the current device is mobile in various ways
    const checkIsMobile = () => {
      const mobileBreakpoint = 663; // Fixed breakpoint for cursor visibility

      const isMobileWidth = window.innerWidth < mobileBreakpoint;
      const hasMobileClass =
        document.documentElement.classList.contains("mobile-device");
      const hasMobileAttribute =
        document.documentElement.getAttribute("data-is-mobile") === "true";

      // Consider mobile if any of the detection methods indicate it's mobile
      const isMobileDevice =
        isMobileWidth || hasMobileClass || hasMobileAttribute;

      setIsMobile(isMobileDevice);

      // For debugging (remove in production)
      if (isMobileDevice) {
        console.debug("Mobile device detected - cursor disabled", {
          width: window.innerWidth,
          hasMobileClass,
          hasMobileAttribute,
        });
      }
    };

    // Check on initial load
    checkIsMobile();
    // Mark as loaded so we don't show/hide the cursor during SSR
    setHasLoaded(true);

    // Add listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Add listener for class or attribute changes on html element
    const observer = new MutationObserver(checkIsMobile);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-is-mobile"],
    });

    return () => {
      window.removeEventListener("resize", checkIsMobile);
      observer.disconnect();
    };
  }, []);

  // Determine if the cursor should be shown
  const shouldShowCursor =
    cursorSettings.enabled &&
    (cursorSettings.cursorImage || cursorSettings.elementCursorImage) &&
    !(isMobile && !cursorSettings.mobileEnabled) &&
    hasLoaded;

  return (
    <>
      {shouldShowCursor && (
        <CustomCursor
          cursorImage={cursorSettings.cursorImage}
          elementCursorImage={cursorSettings.elementCursorImage}
        />
      )}
      {children}
    </>
  );
};

export default CursorProvider;
