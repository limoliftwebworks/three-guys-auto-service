"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Props for the CustomCursor component
interface CustomCursorProps {
  cursorImage?: string; // Custom cursor image path for background
  elementCursorImage?: string; // Custom cursor image path for interactive elements
}

// Component definition
const CustomCursor: React.FC<CustomCursorProps> = ({
  cursorImage,
  elementCursorImage,
}) => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isOverElement, setIsOverElement] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Event handler for mouse movements
  const handleMouseMove = (e: MouseEvent): void => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    setIsVisible(true);

    // Check if the cursor is over an interactive element
    const target = e.target as HTMLElement;
    const isInteractive = !!(
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT" ||
      target.closest("button") ||
      target.closest("a") ||
      target.closest('[role="button"]') ||
      target.closest('[role="link"]') ||
      target.closest(".interactive") ||
      // Check for data-cursor-element on the target or its closest parent with this attribute
      target.hasAttribute("data-cursor-element") ||
      target.closest("[data-cursor-element]")
    );

    setIsOverElement(isInteractive);
  };

  // Event handler for when mouse leaves the page
  const handleMouseLeave = (): void => {
    setIsVisible(false);
  };

  // Event handler for when mouse enters the page
  const handleMouseEnter = (): void => {
    setIsVisible(true);
  };

  // Effect to dynamically hide the cursor when component mounts
  useEffect(() => {
    // Apply cursor hiding immediately and directly to all elements
    if ((cursorImage || elementCursorImage) && window.innerWidth >= 663) {
      // Create a style element
      const style = document.createElement("style");
      style.id = "cursor-hide-style";
      style.textContent = `
        * { cursor: none !important; }
        html { cursor: none !important; }
        body { cursor: none !important; }
        a, a * { cursor: none !important; }
        button, button * { cursor: none !important; }
        input, input * { cursor: none !important; }
        textarea, textarea * { cursor: none !important; }
        select, select * { cursor: none !important; }
        [role="button"], [role="button"] * { cursor: none !important; }
        [class*="btn"], [class*="btn"] * { cursor: none !important; }
        [class*="button"], [class*="button"] * { cursor: none !important; }
        .interactive, .interactive * { cursor: none !important; }
        [tabindex], [tabindex] * { cursor: none !important; }
      `;
      document.head.appendChild(style);

      // Also apply directly to body
      document.body.style.setProperty("cursor", "none", "important");

      // Direct approach: attempt to override ALL css with inline styles
      const allElements = document.querySelectorAll("*");
      allElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.setProperty("cursor", "none", "important");
        }
      });

      // Add resize listener to remove/add styles when crossing breakpoint
      const handleResize = () => {
        if (window.innerWidth < 663) {
          // Remove cursor styles when below breakpoint
          if (document.getElementById("cursor-hide-style")) {
            document.head.removeChild(
              document.getElementById("cursor-hide-style")!
            );
          }
          document.body.style.removeProperty("cursor");
          allElements.forEach((el) => {
            if (el instanceof HTMLElement) {
              el.style.removeProperty("cursor");
            }
          });
        } else if (!document.getElementById("cursor-hide-style")) {
          // Re-add cursor styles when above breakpoint
          document.head.appendChild(style);
          document.body.style.setProperty("cursor", "none", "important");
          allElements.forEach((el) => {
            if (el instanceof HTMLElement) {
              el.style.setProperty("cursor", "none", "important");
            }
          });
        }
      };

      window.addEventListener("resize", handleResize);

      // Add a MutationObserver to check for dynamically added elements
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList" && mutation.addedNodes.length) {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof HTMLElement) {
                node.style.setProperty("cursor", "none", "important");
                const children = node.querySelectorAll("*");
                children.forEach((child) => {
                  if (child instanceof HTMLElement) {
                    child.style.setProperty("cursor", "none", "important");
                  }
                });
              }
            });
          }
        });
      });

      // Start observing the document
      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        // Clean up styles on component unmount
        if (document.getElementById("cursor-hide-style")) {
          document.head.removeChild(
            document.getElementById("cursor-hide-style")!
          );
        }
        document.body.style.removeProperty("cursor");

        // Reset cursor on all elements
        allElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.removeProperty("cursor");
          }
        });

        // Remove resize listener
        window.removeEventListener("resize", handleResize);

        // Disconnect observer
        observer.disconnect();
      };
    }
  }, [cursorImage, elementCursorImage]);

  // Effect to attach and detach event listeners
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // If no cursor images are set, don't render anything
  if (!cursorImage && !elementCursorImage) return null;

  // Select the appropriate cursor image based on what we're hovering over
  const activeCursorImage = isOverElement ? elementCursorImage : cursorImage;

  return (
    <>
      <div className="custom-cursor-container fixed top-0 left-0 w-screen h-screen pointer-events-none overflow-hidden z-[9999]">
        {activeCursorImage && isVisible && (
          <div
            className="custom-cursor absolute pointer-events-none"
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
              transform: "translate(0, 0)",
            }}
          >
            <Image
              src={`/cursor/${activeCursorImage}`}
              alt="Custom cursor"
              width={32}
              height={32}
              className="pointer-events-none"
              priority
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CustomCursor;
