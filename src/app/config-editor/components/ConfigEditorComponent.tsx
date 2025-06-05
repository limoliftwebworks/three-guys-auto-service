"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  InfoBarSection,
  NavigationSection,
  LoadingScreenSection,
  BrowserSection,
  HomePageSection,
  FooterSection,
  CursorSection,
  BusinessInfoSection,
  ServicesPageSection,
  ReviewsPageSection,
  ContactPageSection,
  CareersPageSection,
  ThemeSection,
  PoliciesSection,
} from "./sections";

interface ConfigSection {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
}

const configSections: ConfigSection[] = [
  {
    id: "infoBar",
    name: "Info Bar",
    description: "Top banner with contact info and hours",
    icon: "📞",
    color: "from-blue-500 to-blue-600",
    gradient: "from-blue-50 to-blue-100",
  },
  {
    id: "navigation",
    name: "Navigation",
    description: "Main menu, logo, and navigation settings",
    icon: "🧭",
    color: "from-purple-500 to-purple-600",
    gradient: "from-purple-50 to-purple-100",
  },
  {
    id: "cursor",
    name: "Custom Cursor",
    description: "Interactive cursor design and behavior",
    icon: "🎯",
    color: "from-pink-500 to-pink-600",
    gradient: "from-pink-50 to-pink-100",
  },
  {
    id: "loadingScreen",
    name: "Loading Screen",
    description: "Loading animation and splash screen",
    icon: "⏳",
    color: "from-yellow-500 to-orange-500",
    gradient: "from-yellow-50 to-orange-100",
  },
  {
    id: "browser",
    name: "Browser & SEO",
    description: "Page titles, favicons, and meta settings",
    icon: "🌐",
    color: "from-green-500 to-emerald-600",
    gradient: "from-green-50 to-emerald-100",
  },
  {
    id: "homePage",
    name: "Home Page",
    description: "Hero section, content, and layout",
    icon: "🏠",
    color: "from-indigo-500 to-blue-600",
    gradient: "from-indigo-50 to-blue-100",
  },
  {
    id: "servicesPage",
    name: "Services Page",
    description: "Services hero, categories, and CTA",
    icon: "🔧",
    color: "from-cyan-500 to-cyan-600",
    gradient: "from-cyan-50 to-cyan-100",
  },
  {
    id: "reviewsPage",
    name: "Reviews Page",
    description: "Reviews display and interactions",
    icon: "⭐",
    color: "from-blue-500 to-blue-600",
    gradient: "from-blue-50 to-blue-100",
  },
  {
    id: "contactPage",
    name: "Contact Page",
    description: "Contact form, info, and map settings",
    icon: "📞",
    color: "from-emerald-500 to-emerald-600",
    gradient: "from-emerald-50 to-emerald-100",
  },
  {
    id: "careersPage",
    name: "Careers Page",
    description: "Job application form and mobile settings",
    icon: "💼",
    color: "from-violet-500 to-violet-600",
    gradient: "from-violet-50 to-violet-100",
  },
  {
    id: "businessInfo",
    name: "Business Info",
    description: "Company details and legal page styling",
    icon: "🏢",
    color: "from-amber-500 to-amber-600",
    gradient: "from-amber-50 to-amber-100",
  },
  {
    id: "theme",
    name: "Theme & Global",
    description: "Theme colors, global settings, and company info",
    icon: "🎨",
    color: "from-purple-500 to-pink-600",
    gradient: "from-purple-50 to-pink-100",
  },
  {
    id: "policies",
    name: "Policies & Navigation",
    description: "Legal policies, navigation links, and social media",
    icon: "📋",
    color: "from-green-500 to-emerald-600",
    gradient: "from-green-50 to-emerald-100",
  },
  {
    id: "footer",
    name: "Footer",
    description: "Footer links, contact info, and styling",
    icon: "👣",
    color: "from-gray-600 to-gray-700",
    gradient: "from-gray-50 to-gray-100",
  },
];

function ConfigEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string>("infoBar");
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Initialize active section from URL params or localStorage
  useEffect(() => {
    const urlSection = searchParams.get("section");
    const savedSection = localStorage.getItem("configEditor-activeSection");

    // Priority: URL param > localStorage > default
    const initialSection = urlSection || savedSection || "infoBar";

    if (configSections.find((s) => s.id === initialSection)) {
      setActiveSection(initialSection);
      // Update URL if different
      if (urlSection !== initialSection) {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set("section", initialSection);
        router.replace(newUrl.pathname + newUrl.search, { scroll: false });
      }
    }
  }, [searchParams, router]);

  // Update URL and localStorage when section changes
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    localStorage.setItem("configEditor-activeSection", sectionId);

    // Update URL to persist through reloads
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("section", sectionId);
    router.replace(newUrl.pathname + newUrl.search, { scroll: false });
  };

  // Load config on mount
  useEffect(() => {
    loadConfig();
  }, []);

  // Debug: Log section changes to console
  useEffect(() => {
    console.log(`Config Editor: Active section changed to: ${activeSection}`);
  }, [activeSection]);

  // Add Ctrl+S save functionality
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        if (hasUnsavedChanges && config) {
          saveConfig(config);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasUnsavedChanges, config]);

  const loadConfig = async () => {
    try {
      const response = await fetch("/api/get-config");
      const data = await response.json();
      if (data.success) {
        setConfig(data.config);
      }
    } catch (error) {
      console.error("Error loading config:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update config without saving (for real-time editing)
  const updateConfig = (newConfig: any) => {
    setConfig(newConfig);
    setHasUnsavedChanges(true);
  };

  // Save config to server
  const saveConfig = async (configToSave: any) => {
    setSaveStatus("saving");

    try {
      const response = await fetch("/api/update-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configToSave),
      });

      if (response.ok) {
        setSaveStatus("saved");
        setHasUnsavedChanges(false);
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      console.error("Error saving config:", error);
      setSaveStatus("error");
    }
  };

  const renderSection = () => {
    if (!config) return null;

    switch (activeSection) {
      case "infoBar":
        return <InfoBarSection config={config} updateConfig={updateConfig} />;
      case "navigation":
        return (
          <NavigationSection config={config} updateConfig={updateConfig} />
        );
      case "cursor":
        return <CursorSection config={config} updateConfig={updateConfig} />;
      case "loadingScreen":
        return (
          <LoadingScreenSection config={config} updateConfig={updateConfig} />
        );
      case "browser":
        return <BrowserSection config={config} updateConfig={updateConfig} />;
      case "homePage":
        return <HomePageSection config={config} updateConfig={updateConfig} />;
      case "servicesPage":
        return (
          <ServicesPageSection config={config} updateConfig={updateConfig} />
        );
      case "reviewsPage":
        return (
          <ReviewsPageSection config={config} updateConfig={updateConfig} />
        );
      case "contactPage":
        return (
          <ContactPageSection config={config} updateConfig={updateConfig} />
        );
      case "careersPage":
        return (
          <CareersPageSection config={config} updateConfig={updateConfig} />
        );
      case "businessInfo":
        return (
          <BusinessInfoSection config={config} updateConfig={updateConfig} />
        );
      case "theme":
        return <ThemeSection config={config} updateConfig={updateConfig} />;
      case "policies":
        return <PoliciesSection config={config} updateConfig={updateConfig} />;
      case "footer":
        return <FooterSection config={config} updateConfig={updateConfig} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg text-gray-600">
          Loading configuration...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Save Status */}
      {(saveStatus !== "idle" || hasUnsavedChanges) && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
            saveStatus === "saving"
              ? "bg-blue-500 text-white"
              : saveStatus === "saved"
              ? "bg-green-500 text-white"
              : saveStatus === "error"
              ? "bg-red-500 text-white"
              : hasUnsavedChanges
              ? "bg-yellow-500 text-white"
              : "bg-gray-500 text-white"
          }`}
        >
          {saveStatus === "saving" && (
            <>
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
              Saving...
            </>
          )}
          {saveStatus === "saved" && "✅ Saved!"}
          {saveStatus === "error" && "❌ Error saving"}
          {saveStatus === "idle" && hasUnsavedChanges && (
            <div className="flex items-center gap-2">
              <span>⚠️ Unsaved changes</span>
              <kbd className="px-2 py-1 bg-white/20 rounded text-xs">
                Ctrl+S
              </kbd>
              <span>to save</span>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎨</span>
              Config Sections
            </h2>

            <div className="space-y-2">
              {configSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    activeSection === section.id
                      ? `bg-gradient-to-r ${section.color} text-white shadow-md transform scale-105`
                      : `bg-gradient-to-r ${section.gradient} hover:shadow-md hover:scale-102 text-gray-700`
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{section.icon}</span>
                    <div>
                      <div className="font-semibold">{section.name}</div>
                      <div
                        className={`text-sm ${
                          activeSection === section.id
                            ? "text-white/80"
                            : "text-gray-600"
                        }`}
                      >
                        {section.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => config && saveConfig(config)}
                  disabled={!hasUnsavedChanges}
                  className={`w-full p-3 rounded-lg transition-all duration-200 ${
                    hasUnsavedChanges
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-md"
                      : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {saveStatus === "saving" ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      💾 Save Changes{" "}
                      {hasUnsavedChanges && (
                        <kbd className="ml-2 px-1 bg-white/20 rounded text-xs">
                          Ctrl+S
                        </kbd>
                      )}
                    </>
                  )}
                </button>
                <button
                  onClick={() => window.open("/", "_blank")}
                  className="w-full p-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-200"
                >
                  👀 Preview Site
                </button>
                <button
                  onClick={loadConfig}
                  className="w-full p-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
                >
                  🔄 Reload Config
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {/* Instructions Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="font-semibold text-blue-900">
                  How to Use This Editor
                </h3>
                <p className="text-blue-700 text-sm">
                  Make your changes and press{" "}
                  <kbd className="px-2 py-1 bg-blue-200 rounded text-xs font-mono">
                    Ctrl+S
                  </kbd>{" "}
                  to save, or click the "Save Changes" button. No more
                  auto-reloading!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper component with Suspense boundary
export default function ConfigEditorComponent() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg text-gray-600">
            Loading configuration...
          </span>
        </div>
      }
    >
      <ConfigEditorContent />
    </Suspense>
  );
}
