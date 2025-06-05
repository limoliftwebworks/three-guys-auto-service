"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import MouseFollowGradient from "@/components/MouseFollowGradient";
import { supabase } from "@/lib/supabase";
import {
  formatPhoneNumber,
  validateEmail,
  validatePhone,
} from "@/utils/formatters";
import localConfig from "@/config/localConfig";
import MobileOverlay from "@/components/MobileOverlay";

interface Reference {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  position: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  references: Reference[];
}

export default function CareersPage() {
  // Get careers config with fallbacks
  const careersConfig = localConfig.pages?.Careers || {};
  const [isMobile, setIsMobile] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Get the mobile overlay config
    const overlayConfig = localConfig.pages?.Careers?.mobileOverlay;

    // Set fixed breakpoint to match cursor
    const mobileBreakpoint = 663;

    // Check if the overlay is enabled in the config
    if (!overlayConfig?.enabled) {
      setIsMobile(false);
      setHasLoaded(true);
      return;
    }

    // Function to check if the viewport is mobile size
    const checkIsMobile = () => {
      const mobileView = window.innerWidth < mobileBreakpoint;
      setIsMobile(mobileView);

      // Log message for developers
      if (mobileView) {
        console.log(
          `Mobile view detected (width < ${mobileBreakpoint}px): Career application form is optimized for desktop. Mobile overlay shown.`
        );
      }
    };

    // Initial check
    checkIsMobile();
    // Mark as loaded so we don't show/hide the overlay during SSR
    setHasLoaded(true);

    // Set up event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Clean up event listener
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "",
    position: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    references: [
      {
        name: "",
        relationship: "",
        phone: "",
        email: "",
      },
    ],
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    phone: "",
    references: [{ email: "", phone: "" }],
  });
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const formattedPhone = formatPhoneNumber(value);
      setFormData((prev) => ({
        ...prev,
        [name]: formattedPhone,
      }));
      setFormErrors((prev) => ({
        ...prev,
        phone: validatePhone(formattedPhone)
          ? ""
          : "Please enter a valid 10-digit phone number",
      }));
    } else if (name === "email") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      setFormErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Please enter a valid email address",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        setSubmitStatus({
          type: "error",
          message: "Resume file size must be less than 10MB",
        });
        return;
      }
      setResume(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Upload resume to Supabase Storage if present
      let resumeUrl = "";
      if (resume) {
        const fileExt = resume.name.split(".").pop();
        const fileName = `${Date.now()}-${formData.firstName}-${
          formData.lastName
        }.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(fileName, resume);

        if (uploadError) {
          console.error("Resume upload error:", uploadError);
          throw uploadError;
        }

        resumeUrl = uploadData.path;
      }

      // Save application data to Supabase
      const { error: insertError } = await supabase
        .from("job_applications")
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address || "", // Add default values for required fields
          city: formData.city || "",
          state: formData.state || "",
          zip: formData.zip || "",
          position: formData.position,
          start_date: new Date().toISOString().split("T")[0], // Current date as default
          experience: formData.experience,
          resume_url: resumeUrl || null,
        });

      if (insertError) {
        console.error("Application insert error:", insertError);
        throw insertError;
      }

      // Redirect to success page
      router.push("/careers/success");
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitStatus({
        type: "error",
        message:
          "There was an error submitting your application. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  const addReference = () => {
    setFormData((prev) => ({
      ...prev,
      references: [
        ...prev.references,
        { name: "", relationship: "", phone: "", email: "" },
      ],
    }));
  };

  const removeReference = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index),
    }));
  };

  const handleReferenceChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references.map((ref, i) => {
        if (i === index) {
          if (field === "phone") {
            return { ...ref, [field]: formatPhoneNumber(value) };
          }
          return { ...ref, [field]: value };
        }
        return ref;
      }),
    }));

    if (field === "email" || field === "phone") {
      setFormErrors((prev) => ({
        ...prev,
        references: prev.references.map((ref, i) => {
          if (i === index) {
            if (field === "email") {
              return {
                ...ref,
                email: validateEmail(value)
                  ? ""
                  : "Please enter a valid email address",
              };
            }
            if (field === "phone") {
              return {
                ...ref,
                phone: validatePhone(value)
                  ? ""
                  : "Please enter a valid 10-digit phone number",
              };
            }
          }
          return ref;
        }),
      }));
    }
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Mobile Overlay - only shown on mobile devices after component has loaded on client */}
      {hasLoaded && isMobile && (
        <MobileOverlay
          title={localConfig.pages?.Careers?.mobileOverlay?.title || ""}
          message={localConfig.pages?.Careers?.mobileOverlay?.message || ""}
          buttonText={
            localConfig.pages?.Careers?.mobileOverlay?.buttonText || ""
          }
          buttonLink={
            localConfig.pages?.Careers?.mobileOverlay?.buttonLink || ""
          }
        />
      )}

      {/* Hero Section */}
      <section
        className="pb-16 relative overflow-hidden bg-gradient-to-br"
        style={{
          backgroundImage: careersConfig.heroImage
            ? `linear-gradient(to bottom right, ${
                careersConfig.heroBgGradientFrom
              }, ${careersConfig.heroBgGradientVia}, ${
                careersConfig.heroBgGradientTo
              }), url(${
                careersConfig.heroImage.startsWith("/")
                  ? careersConfig.heroImage
                  : `/images/${careersConfig.heroImage}`
              })`
            : `linear-gradient(to bottom right, ${careersConfig.heroBgGradientFrom}, ${careersConfig.heroBgGradientVia}, ${careersConfig.heroBgGradientTo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          paddingTop: careersConfig.heroPaddingTop || "128px",
        }}
      >
        <MouseFollowGradient variant="dark" opacity={0.3} />

        {/* Decorative Elements */}
        <div className="absolute inset-0 z-0">
          {/* Large blurred shapes */}
          <div
            className="absolute w-[600px] h-[600px] -left-64 -top-64 rounded-full blur-3xl animate-blob opacity-20"
            style={{
              backgroundColor: careersConfig.heroBlurredCircle1Color,
              opacity: careersConfig.heroBlurredCircle1Opacity,
            }}
          ></div>
          <div
            className="absolute w-[500px] h-[500px] -right-32 -bottom-32 rounded-full blur-3xl animate-blob animation-delay-2000 opacity-20"
            style={{
              backgroundColor: careersConfig.heroBlurredCircle2Color,
              opacity: careersConfig.heroBlurredCircle2Opacity,
            }}
          ></div>

          {/* Decorative patterns */}
          <div
            className="absolute inset-0"
            style={{ opacity: careersConfig.heroPatternOpacity }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, ${careersConfig.heroPatternColor} 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            ></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div
                className="inline-block mb-4 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 bg-white/10"
                style={{
                  borderColor: careersConfig.hireBadgeBorderColor,
                  backgroundColor: careersConfig.hireBadgeBgColor,
                }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: careersConfig.hireBadgeTextColor }}
                >
                  {careersConfig.hireBadgeText}
                </span>
              </div>
              <h1
                className="text-5xl md:text-6xl font-display font-bold mb-4"
                style={{ color: careersConfig.hireTitleColor }}
              >
                {careersConfig.hireTitle.split("Team")[0]}
                <span className="relative inline-block">
                  <span
                    className="relative z-10 text-transparent bg-clip-text drop-shadow-lg"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${careersConfig.hireTitleHighlightColor}, ${careersConfig.hireTitleHighlightColor}, ${careersConfig.hireTitleHighlightColor})`,
                    }}
                  >
                    Team
                  </span>
                  <div
                    className="absolute inset-0 blur-2xl scale-150"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${careersConfig.hireTitleGlowColor}, ${careersConfig.hireTitleGlowColor})`,
                      opacity: careersConfig.hireTitleGlowOpacity,
                    }}
                  ></div>
                </span>
              </h1>
            </motion.div>
            <motion.p
              className="text-xl leading-relaxed max-w-2xl mx-auto"
              style={{
                color: careersConfig.hireSubtitleColor,
                opacity: careersConfig.hireSubtitleOpacity,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {careersConfig.hireSubtitle}
            </motion.p>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-auto min-w-[100vw]"
            style={{
              height: careersConfig.waveSeparatorHeight || "auto",
              display: "block",
            }}
            preserveAspectRatio="none"
          >
            <path
              fill={careersConfig.waveSeparatorColor || "#F9FAFB"}
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Application Form Section */}
      <section
        className="py-20"
        style={{
          backgroundColor: careersConfig.applicationSectionBgColor || "#F9FAFB",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white rounded-3xl overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                boxShadow:
                  careersConfig.applicationFormShadow ||
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              {/* Form Header */}
              <div
                className="relative p-8"
                style={{
                  background: `linear-gradient(to right, ${careersConfig.formHeaderBgFrom}, ${careersConfig.formHeaderBgTo})`,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, ${careersConfig.formHeaderPatternColor} 1px, transparent 0)`,
                    backgroundSize: careersConfig.formHeaderPatternSize,
                    opacity: careersConfig.formHeaderPatternOpacity,
                  }}
                ></div>
                <h2
                  className="text-3xl font-bold mb-2"
                  style={{ color: careersConfig.formHeaderTitleColor }}
                >
                  {careersConfig.formHeaderTitleText}
                </h2>
                <p
                  style={{
                    color: careersConfig.formHeaderSubtitleColor,
                    opacity: careersConfig.formHeaderSubtitleOpacity,
                  }}
                >
                  {careersConfig.formHeaderSubtitleText}
                </p>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information Section */}
                  <div
                    className={`p-6 rounded-2xl border transition-all hover:shadow-${careersConfig.formSectionHoverShadow}`}
                    style={{
                      backgroundColor: careersConfig.formSectionBgColor,
                      borderColor: careersConfig.formSectionBorderColor,
                    }}
                  >
                    <div
                      className="flex items-center mb-4"
                      style={{ color: careersConfig.formSectionTitleColor }}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                      </svg>
                      <h3 className="text-xl font-semibold">
                        Personal Information
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium mb-2"
                          style={{ color: careersConfig.formLabelColor }}
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full ${careersConfig.formInputPadding} rounded-${careersConfig.formInputBorderRadius} border focus:ring-2 transition-all`}
                          style={
                            {
                              backgroundColor: careersConfig.formInputBgColor,
                              borderColor: careersConfig.formInputBorderColor,
                              color: careersConfig.formInputTextColor,
                              "--tw-ring-color":
                                careersConfig.formInputFocusRingColor,
                              "--tw-ring-opacity": "1",
                            } as React.CSSProperties
                          }
                          placeholder="Enter your first name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium mb-2"
                          style={{ color: careersConfig.formLabelColor }}
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full ${careersConfig.formInputPadding} rounded-${careersConfig.formInputBorderRadius} border focus:ring-2 transition-all`}
                          style={
                            {
                              backgroundColor: careersConfig.formInputBgColor,
                              borderColor: careersConfig.formInputBorderColor,
                              color: careersConfig.formInputTextColor,
                              "--tw-ring-color":
                                careersConfig.formInputFocusRingColor,
                              "--tw-ring-opacity": "1",
                            } as React.CSSProperties
                          }
                          placeholder="Enter your last name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                          style={{ color: careersConfig.formLabelColor }}
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full ${careersConfig.formInputPadding} rounded-${careersConfig.formInputBorderRadius} border focus:ring-2 transition-all`}
                          style={
                            {
                              backgroundColor: careersConfig.formInputBgColor,
                              borderColor: formErrors.email
                                ? careersConfig.formErrorColor
                                : careersConfig.formInputBorderColor,
                              color: careersConfig.formInputTextColor,
                              "--tw-ring-color":
                                careersConfig.formInputFocusRingColor,
                              "--tw-ring-opacity": "1",
                            } as React.CSSProperties
                          }
                          placeholder="name@example.com"
                        />
                        {formErrors.email && (
                          <p
                            className="mt-1 text-sm"
                            style={{ color: careersConfig.formErrorColor }}
                          >
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium mb-2"
                          style={{ color: careersConfig.formLabelColor }}
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full ${careersConfig.formInputPadding} rounded-${careersConfig.formInputBorderRadius} border focus:ring-2 transition-all`}
                          style={
                            {
                              backgroundColor: careersConfig.formInputBgColor,
                              borderColor: formErrors.phone
                                ? careersConfig.formErrorColor
                                : careersConfig.formInputBorderColor,
                              color: careersConfig.formInputTextColor,
                              "--tw-ring-color":
                                careersConfig.formInputFocusRingColor,
                              "--tw-ring-opacity": "1",
                            } as React.CSSProperties
                          }
                          placeholder="(555) 555-5555"
                        />
                        {formErrors.phone && (
                          <p
                            className="mt-1 text-sm"
                            style={{ color: careersConfig.formErrorColor }}
                          >
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Professional Information Section */}
                  <div
                    className={`p-6 rounded-2xl border transition-all hover:shadow-${careersConfig.formSectionHoverShadow}`}
                    style={{
                      backgroundColor: careersConfig.formSectionBgColor,
                      borderColor: careersConfig.formSectionBorderColor,
                    }}
                  >
                    <div
                      className="flex items-center mb-4"
                      style={{ color: careersConfig.formSectionTitleColor }}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                      <h3 className="text-xl font-semibold">
                        Professional Information
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="experience"
                          className="block text-sm font-medium mb-2"
                          style={{ color: careersConfig.formLabelColor }}
                        >
                          Years of Experience
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            id="experience"
                            name="experience"
                            required
                            min="0"
                            max="50"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 ${careersConfig.formInputPadding} border rounded-${careersConfig.formInputBorderRadius} focus:ring-2 transition-all`}
                            style={
                              {
                                backgroundColor: careersConfig.formInputBgColor,
                                borderColor: careersConfig.formInputBorderColor,
                                color: careersConfig.formInputTextColor,
                                "--tw-ring-color":
                                  careersConfig.formInputFocusRingColor,
                                "--tw-ring-opacity": "1",
                              } as React.CSSProperties
                            }
                            placeholder="0"
                          />
                          <div
                            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                            style={{
                              color: careersConfig.formSectionTitleColor,
                            }}
                          >
                            <svg
                              className="w-5 h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="position"
                          className="block text-sm font-medium mb-2"
                          style={{ color: careersConfig.formLabelColor }}
                        >
                          Position
                        </label>
                        <div className="relative">
                          <select
                            id="position"
                            name="position"
                            required
                            value={formData.position}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 ${careersConfig.formInputPadding} rounded-${careersConfig.formInputBorderRadius} border focus:ring-2 transition-all appearance-none`}
                            style={
                              {
                                backgroundColor: careersConfig.formInputBgColor,
                                borderColor: careersConfig.formInputBorderColor,
                                color: careersConfig.formInputTextColor,
                                "--tw-ring-color":
                                  careersConfig.formInputFocusRingColor,
                                "--tw-ring-opacity": "1",
                              } as React.CSSProperties
                            }
                          >
                            <option value="">Select a position</option>
                            {careersConfig.positionOptions.map(
                              (option: string, index: number) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              )
                            )}
                          </select>
                          <div
                            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                            style={{
                              color: careersConfig.formSectionTitleColor,
                            }}
                          >
                            <svg
                              className="w-5 h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div
                            className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                            style={{
                              color: careersConfig.formSectionTitleColor,
                            }}
                          >
                            <svg
                              className="w-5 h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="resume"
                          className="block text-sm font-medium mb-2"
                          style={{ color: careersConfig.formLabelColor }}
                        >
                          Resume (PDF, DOC, DOCX - Max 10MB)
                        </label>
                        <div
                          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-all hover:border-opacity-100"
                          style={{
                            borderColor:
                              careersConfig.formInputBorderColor + "80",
                          }}
                        >
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                              style={{
                                color: careersConfig.formSectionTitleColor,
                              }}
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="resume"
                                className="relative cursor-pointer bg-white rounded-md font-medium focus-within:outline-none"
                                style={{
                                  color: careersConfig.formSectionTitleColor,
                                }}
                              >
                                <span>Upload a file</span>
                                <input
                                  id="resume"
                                  name="resume"
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={handleFileChange}
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PDF, DOC, DOCX up to 10MB
                            </p>
                          </div>
                        </div>
                        {resume && (
                          <p
                            className="mt-2 text-sm"
                            style={{
                              color: careersConfig.formSectionTitleColor,
                            }}
                          >
                            Selected file:{" "}
                            <span className="font-medium">{resume.name}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* References Section */}
                  <div
                    className={`p-6 rounded-2xl border transition-all hover:shadow-${careersConfig.formSectionHoverShadow}`}
                    style={{
                      backgroundColor: careersConfig.formSectionBgColor,
                      borderColor: careersConfig.formSectionBorderColor,
                    }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div
                        className="flex items-center"
                        style={{ color: careersConfig.formSectionTitleColor }}
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        <h3 className="text-xl font-semibold">References</h3>
                      </div>
                      <button
                        type="button"
                        onClick={addReference}
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                        style={{
                          backgroundColor: careersConfig.addReferenceBtnBgColor,
                          color: careersConfig.addReferenceBtnTextColor,
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor =
                            careersConfig.addReferenceBtnHoverBgColor;
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor =
                            careersConfig.addReferenceBtnBgColor;
                        }}
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add Reference
                      </button>
                    </div>

                    {formData.references.map((reference, index) => (
                      <div
                        key={index}
                        className="mb-6 p-4 bg-white rounded-xl border border-gray-200 transition-all hover:shadow-md"
                        style={{
                          backgroundColor: careersConfig.formInputBgColor,
                          borderColor: careersConfig.formInputBorderColor,
                        }}
                      >
                        <div
                          className="flex justify-between items-center mb-4 pb-2 border-b"
                          style={{
                            borderColor:
                              careersConfig.formInputBorderColor + "40",
                          }}
                        >
                          <h4
                            className="text-lg font-medium"
                            style={{
                              color: careersConfig.formSectionTitleColor,
                            }}
                          >
                            Reference #{index + 1}
                          </h4>
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => removeReference(index)}
                              className="text-sm flex items-center transition-colors"
                              style={{
                                color: careersConfig.removeReferenceBtnColor,
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.color =
                                  careersConfig.removeReferenceBtnHoverColor;
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.color =
                                  careersConfig.removeReferenceBtnColor;
                              }}
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label
                              className="block text-sm font-medium mb-2"
                              style={{ color: careersConfig.formLabelColor }}
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              required
                              value={reference.name}
                              onChange={(e) =>
                                handleReferenceChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              className={`w-full ${careersConfig.formInputPadding} rounded-${careersConfig.formInputBorderRadius} border focus:ring-2 transition-all`}
                              style={
                                {
                                  backgroundColor:
                                    careersConfig.formInputBgColor,
                                  borderColor:
                                    careersConfig.formInputBorderColor,
                                  color: careersConfig.formInputTextColor,
                                  "--tw-ring-color":
                                    careersConfig.formInputFocusRingColor,
                                  "--tw-ring-opacity": "1",
                                } as React.CSSProperties
                              }
                              placeholder="John Doe"
                            />
                          </div>

                          <div>
                            <label
                              className="block text-sm font-medium mb-2"
                              style={{ color: careersConfig.formLabelColor }}
                            >
                              Relationship
                            </label>
                            <input
                              type="text"
                              required
                              value={reference.relationship}
                              onChange={(e) =>
                                handleReferenceChange(
                                  index,
                                  "relationship",
                                  e.target.value
                                )
                              }
                              className={`w-full ${careersConfig.formInputPadding} rounded-${careersConfig.formInputBorderRadius} border focus:ring-2 transition-all`}
                              style={
                                {
                                  backgroundColor:
                                    careersConfig.formInputBgColor,
                                  borderColor:
                                    careersConfig.formInputBorderColor,
                                  color: careersConfig.formInputTextColor,
                                  "--tw-ring-color":
                                    careersConfig.formInputFocusRingColor,
                                  "--tw-ring-opacity": "1",
                                } as React.CSSProperties
                              }
                              placeholder="Previous Manager"
                            />
                          </div>

                          <div>
                            <label
                              className="block text-sm font-medium mb-2"
                              style={{ color: careersConfig.formLabelColor }}
                            >
                              Email Address
                            </label>
                            <input
                              type="email"
                              required
                              value={reference.email}
                              onChange={(e) =>
                                handleReferenceChange(
                                  index,
                                  "email",
                                  e.target.value
                                )
                              }
                              className={`w-full ${careersConfig.formInputPadding} rounded-${careersConfig.formInputBorderRadius} border focus:ring-2 transition-all`}
                              style={
                                {
                                  backgroundColor:
                                    careersConfig.formInputBgColor,
                                  borderColor: formErrors.references[index]
                                    ?.email
                                    ? careersConfig.formErrorColor
                                    : careersConfig.formInputBorderColor,
                                  color: careersConfig.formInputTextColor,
                                  "--tw-ring-color":
                                    careersConfig.formInputFocusRingColor,
                                  "--tw-ring-opacity": "1",
                                } as React.CSSProperties
                              }
                              placeholder="john@example.com"
                            />
                            {formErrors.references[index]?.email && (
                              <p
                                className="mt-1 text-sm"
                                style={{ color: careersConfig.formErrorColor }}
                              >
                                {formErrors.references[index].email}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              className="block text-sm font-medium mb-2"
                              style={{ color: careersConfig.formLabelColor }}
                            >
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              required
                              value={reference.phone}
                              onChange={(e) =>
                                handleReferenceChange(
                                  index,
                                  "phone",
                                  e.target.value
                                )
                              }
                              className={`w-full ${careersConfig.formInputPadding} rounded-${careersConfig.formInputBorderRadius} border focus:ring-2 transition-all`}
                              style={
                                {
                                  backgroundColor:
                                    careersConfig.formInputBgColor,
                                  borderColor: formErrors.references[index]
                                    ?.phone
                                    ? careersConfig.formErrorColor
                                    : careersConfig.formInputBorderColor,
                                  color: careersConfig.formInputTextColor,
                                  "--tw-ring-color":
                                    careersConfig.formInputFocusRingColor,
                                  "--tw-ring-opacity": "1",
                                } as React.CSSProperties
                              }
                              placeholder="(555) 555-5555"
                            />
                            {formErrors.references[index]?.phone && (
                              <p
                                className="mt-1 text-sm"
                                style={{ color: careersConfig.formErrorColor }}
                              >
                                {formErrors.references[index].phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-4 text-white font-semibold rounded-${careersConfig.submitButtonBorderRadius} shadow-lg transition-all duration-300 text-lg`}
                      style={{
                        background: isSubmitting
                          ? "#9ca3af"
                          : `linear-gradient(to right, ${careersConfig.submitButtonBgFrom}, ${careersConfig.submitButtonBgTo})`,
                        color: careersConfig.submitButtonTextColor,
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        boxShadow:
                          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                      }}
                      onMouseOver={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.boxShadow =
                            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Submit Application
                          <svg
                            className="ml-2 -mr-1 w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Status Message */}
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl shadow-md"
                      style={{
                        backgroundColor:
                          submitStatus.type === "success"
                            ? careersConfig.successMessageBgColor
                            : careersConfig.errorMessageBgColor,
                        borderColor:
                          submitStatus.type === "success"
                            ? careersConfig.successMessageBorderColor
                            : careersConfig.errorMessageBorderColor,
                        color:
                          submitStatus.type === "success"
                            ? careersConfig.successMessageTextColor
                            : careersConfig.errorMessageTextColor,
                        border: "1px solid",
                      }}
                    >
                      <div className="flex items-center">
                        {submitStatus.type === "success" ? (
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        {submitStatus.message}
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
