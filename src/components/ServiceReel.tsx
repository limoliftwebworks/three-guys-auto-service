"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  WrenchScrewdriverIcon,
  SparklesIcon,
  PaintBrushIcon,
  WrenchIcon,
  BeakerIcon,
  CogIcon,
  TruckIcon,
  ShieldCheckIcon,
  DocumentCheckIcon,
  SwatchIcon,
  ScaleIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { useConfig } from "../context/ConfigContext";

// Define the service interface for better type checking
interface Service {
  title: string;
  description: string;
  icon: JSX.Element;
  priority?: boolean; // Mark some services as priority for loading
}

const services: Service[] = [
  {
    title: "Collision Repair",
    description: "Expert repair for all types of collision damage",
    icon: <WrenchScrewdriverIcon className="h-8 w-8" />,
    priority: true,
  },
  {
    title: "Frame & Alignment",
    description: "Precision frame straightening and alignment",
    icon: <ScaleIcon className="h-8 w-8" />,
    priority: true,
  },
  {
    title: "Paint Services",
    description: "Professional auto painting and color matching",
    icon: <PaintBrushIcon className="h-8 w-8" />,
    priority: true,
  },
  {
    title: "Auto Detailing",
    description: "Comprehensive interior and exterior detailing",
    icon: <SparklesIcon className="h-8 w-8" />,
  },
  {
    title: "Insurance Claims",
    description: "Assistance with insurance claim processing",
    icon: <ClipboardDocumentCheckIcon className="h-8 w-8" />,
  },
  {
    title: "Dent Removal",
    description: "Paintless dent repair and removal",
    icon: <WrenchIcon className="h-8 w-8" />,
  },
  {
    title: "Quality Assurance",
    description: "Rigorous quality control inspections",
    icon: <ShieldCheckIcon className="h-8 w-8" />,
  },
  {
    title: "Towing Service",
    description: "24/7 emergency towing available",
    icon: <TruckIcon className="h-8 w-8" />,
  },
  {
    title: "Paint Protection",
    description: "Advanced paint protection solutions",
    icon: <BeakerIcon className="h-8 w-8" />,
  },
  {
    title: "Mechanical Repairs",
    description: "Complete mechanical repair services",
    icon: <CogIcon className="h-8 w-8" />,
  },
  {
    title: "Color Matching",
    description: "Precise computerized color matching",
    icon: <SwatchIcon className="h-8 w-8" />,
  },
  {
    title: "Estimates",
    description: "Free detailed repair estimates",
    icon: <DocumentCheckIcon className="h-8 w-8" />,
  },
];

export default function ServiceReel() {
  const [currentChunk, setCurrentChunk] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const config = useConfig();
  const home = config?.pages?.Home || {};
  const servicesConfig = home.servicesSection || {};

  // Create an intersection observer to detect when the component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const serviceReelElement = document.getElementById("service-reel");
    if (serviceReelElement) {
      observer.observe(serviceReelElement);
    }

    return () => {
      if (serviceReelElement) {
        observer.unobserve(serviceReelElement);
      }
    };
  }, []);

  // Check if we're on mobile - memoize the event handler
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  // Handle mobile chunk rotation with cleanup and better timings
  useEffect(() => {
    if (!isMobile || !isInView) return;

    const interval = setInterval(() => {
      setCurrentChunk((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile, isInView, services.length]);

  // Split services into chunks of 3 for mobile
  const mobileChunks = useMemo(
    () =>
      Array.from({ length: Math.ceil(services.length / 3) }, (_, i) =>
        services.slice(i * 3, i * 3 + 3)
      ),
    [services]
  );

  return (
    <div id="service-reel" className="relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-50/50 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gray-50/50 via-transparent to-transparent"></div>
      </div>

      <div className="relative max-w-[120rem] mx-auto">
        {/* Left gradient */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[35rem] z-10">
          <div
            className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent"
            style={{
              background: `linear-gradient(to right, ${
                servicesConfig.serviceReelGradientFromColor || "#ffffff"
              }, ${
                servicesConfig.serviceReelGradientFromColor || "#ffffff"
              }99, transparent)`,
            }}
          ></div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent translate-x-[20%]"
            style={{
              background: `linear-gradient(to right, ${
                servicesConfig.serviceReelGradientFromColor || "#ffffff"
              }, ${
                servicesConfig.serviceReelGradientFromColor || "#ffffff"
              }80, transparent)`,
              transform: "translateX(20%)",
            }}
          ></div>
        </div>

        {/* Right gradient */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[35rem] z-10">
          <div
            className="absolute inset-0 bg-gradient-to-l from-white via-white to-transparent"
            style={{
              background: `linear-gradient(to left, ${
                servicesConfig.serviceReelGradientToColor || "#ffffff"
              }, ${
                servicesConfig.serviceReelGradientToColor || "#ffffff"
              }99, transparent)`,
            }}
          ></div>
          <div
            className="absolute inset-0 bg-gradient-to-l from-white via-white/80 to-transparent translate-x-[-20%]"
            style={{
              background: `linear-gradient(to left, ${
                servicesConfig.serviceReelGradientToColor || "#ffffff"
              }, ${
                servicesConfig.serviceReelGradientToColor || "#ffffff"
              }80, transparent)`,
              transform: "translateX(-20%)",
            }}
          ></div>
        </div>

        <div className="overflow-hidden md:mx-[18rem] px-4 md:px-0">
          {/* Mobile View */}
          <div className="md:hidden w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChunk}
                className="flex justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  key={currentChunk}
                  className="w-[280px] aspect-square backdrop-blur-sm p-4 rounded-2xl hover:shadow-md transition-all duration-300 group shrink-0 flex flex-col items-center text-center justify-center"
                  style={{
                    backgroundColor:
                      servicesConfig.serviceReelCardBgColor || "#ffffff",
                    borderColor:
                      servicesConfig.serviceReelCardBorderColor || "#f3f4f680",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    boxShadow: `0 4px 6px ${
                      servicesConfig.serviceReelCardHoverShadowColor ||
                      "rgba(0, 0, 0, 0.08)"
                    }`,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex justify-center"
                    style={{
                      color: servicesConfig.serviceReelIconColor || "#dc7070",
                    }}
                  >
                    {React.cloneElement(services[currentChunk].icon, {
                      className: "w-12 h-12",
                    })}
                  </div>
                  <h3
                    className="font-display font-bold mb-2 text-lg transition-colors duration-300"
                    style={{
                      color: servicesConfig.serviceReelTitleColor || "#111827",
                    }}
                  >
                    {services[currentChunk].title}
                  </h3>
                  <p
                    className="text-sm transition-colors duration-300 max-w-[85%]"
                    style={{
                      color:
                        servicesConfig.serviceReelDescriptionColor || "#6b7280",
                    }}
                  >
                    {services[currentChunk].description}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
            {/* Mobile Progress Indicators */}
            <div className="flex justify-center gap-1.5 mt-6 flex-wrap px-4">
              {services.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentChunk ? "w-6" : "w-1.5"
                  }`}
                  style={{
                    backgroundColor:
                      index === currentChunk
                        ? servicesConfig.serviceReelMobileIndicatorColor ||
                          "#dc7070"
                        : servicesConfig.serviceReelMobileInactiveColor ||
                          "#e0e0e0",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            {isInView && (
              <motion.div
                className="flex gap-8 animate-scroll"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* First set of cards */}
                <div className="flex gap-8 shrink-0">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      className="w-[18rem] aspect-square backdrop-blur-sm p-7 rounded-3xl hover:shadow-md transition-all duration-300 group shrink-0 flex flex-col items-center text-center justify-center"
                      style={{
                        backgroundColor:
                          servicesConfig.serviceReelCardBgColor || "#ffffff",
                        borderColor:
                          servicesConfig.serviceReelCardBorderColor ||
                          "#f3f4f680",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        boxShadow: `0 4px 6px ${
                          servicesConfig.serviceReelCardHoverShadowColor ||
                          "rgba(0, 0, 0, 0.08)"
                        }`,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      // Delay animation for services that aren't prioritized
                      transition={{
                        delay: service.priority
                          ? index * 0.1
                          : index * 0.05 + 0.3,
                        duration: 0.4,
                      }}
                    >
                      <div
                        className="mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex justify-center"
                        style={{
                          color:
                            servicesConfig.serviceReelIconColor || "#dc7070",
                        }}
                      >
                        {React.cloneElement(service.icon, {
                          className: "w-16 h-16",
                        })}
                      </div>
                      <h3
                        className="font-display font-bold mb-4 text-xl transition-colors duration-300"
                        style={{
                          color:
                            servicesConfig.serviceReelTitleColor || "#111827",
                        }}
                      >
                        {service.title}
                      </h3>
                      <p
                        className="text-base transition-colors duration-300 max-w-[85%]"
                        style={{
                          color:
                            servicesConfig.serviceReelDescriptionColor ||
                            "#6b7280",
                        }}
                      >
                        {service.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
                {/* Second set of cards (only loaded when in view) */}
                <div className="flex gap-8 shrink-0">
                  {services.map((service, index) => (
                    <motion.div
                      key={`duplicate-${index}`}
                      className="w-[18rem] aspect-square backdrop-blur-sm p-7 rounded-3xl hover:shadow-md transition-all duration-300 group shrink-0 flex flex-col items-center text-center justify-center"
                      style={{
                        backgroundColor:
                          servicesConfig.serviceReelCardBgColor || "#ffffff",
                        borderColor:
                          servicesConfig.serviceReelCardBorderColor ||
                          "#f3f4f680",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        boxShadow: `0 4px 6px ${
                          servicesConfig.serviceReelCardHoverShadowColor ||
                          "rgba(0, 0, 0, 0.08)"
                        }`,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      // Stagger and delay animation to reduce initial load
                      transition={{
                        delay: service.priority
                          ? index * 0.1 + 0.5
                          : index * 0.05 + 0.8,
                        duration: 0.4,
                      }}
                    >
                      <div
                        className="mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex justify-center"
                        style={{
                          color:
                            servicesConfig.serviceReelIconColor || "#dc7070",
                        }}
                      >
                        {React.cloneElement(service.icon, {
                          className: "w-16 h-16",
                        })}
                      </div>
                      <h3
                        className="font-display font-bold mb-4 text-xl transition-colors duration-300"
                        style={{
                          color:
                            servicesConfig.serviceReelTitleColor || "#111827",
                        }}
                      >
                        {service.title}
                      </h3>
                      <p
                        className="text-base transition-colors duration-300 max-w-[85%]"
                        style={{
                          color:
                            servicesConfig.serviceReelDescriptionColor ||
                            "#6b7280",
                        }}
                      >
                        {service.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
          will-change: transform;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
