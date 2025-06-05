"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import localConfig from "@/config/localConfig";

export default function Contact() {
  // Get contact config and services config for CTA section
  const contactConfig = localConfig.pages?.Contact || {};
  const servicesConfig = localConfig.pages?.Services || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: contactConfig.serviceOptions[0] || "General Inquiry",
  });

  const formatPhoneNumber = (input: string): string => {
    const cleaned = input.replace(/\D/g, "");
    if (cleaned.length >= 7) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6,
        10
      )}`.trim();
    } else if (cleaned.length >= 4) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}`.trim();
    } else if (cleaned.length > 0) {
      return `(${cleaned}`;
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, message, service } = formData;
    const { error } = await supabase
      .from("contacts")
      .insert([{ name, email, phone, message, service }]);
    if (error) {
      alert("There was an error sending your message.");
    } else {
      alert("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        service: contactConfig.serviceOptions[0] || "General Inquiry",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? formatPhoneNumber(value) : value,
    }));
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        className="pt-32 pb-20 relative overflow-hidden"
        style={{
          backgroundImage: contactConfig.heroImage
            ? `linear-gradient(to bottom right, ${
                contactConfig.heroBgGradientFrom
              }, ${contactConfig.heroBgGradientVia}, ${
                contactConfig.heroBgGradientTo
              }), url(${
                contactConfig.heroImage.startsWith("/")
                  ? contactConfig.heroImage
                  : `/images/${contactConfig.heroImage}`
              })`
            : `linear-gradient(to bottom right, ${contactConfig.heroBgGradientFrom}, ${contactConfig.heroBgGradientVia}, ${contactConfig.heroBgGradientTo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Modern decorative elements */}
        <div className="absolute inset-0">
          {/* Large blurred shapes */}
          <div
            className="absolute w-[600px] h-[600px] -left-64 -top-64 rounded-full blur-3xl animate-blob"
            style={{
              backgroundColor: `${
                contactConfig.heroBlurredCircle1Color
              }${Math.floor(contactConfig.heroBlurredCircle1Opacity * 100)
                .toString(16)
                .padStart(2, "0")}`,
            }}
          ></div>
          <div
            className="absolute w-[500px] h-[500px] -right-32 -bottom-32 rounded-full blur-3xl animate-blob animation-delay-2000"
            style={{
              backgroundColor: `${
                contactConfig.heroBlurredCircle2Color
              }${Math.floor(contactConfig.heroBlurredCircle2Opacity * 100)
                .toString(16)
                .padStart(2, "0")}`,
            }}
          ></div>

          {/* Decorative patterns */}
          <div
            className="absolute inset-0"
            style={{ opacity: contactConfig.heroPatternOpacity }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, ${contactConfig.heroPatternColor} 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            ></div>
          </div>

          {/* Light beams */}
          <div
            className="absolute top-0 left-1/3 w-[400px] h-[600px] rotate-[24deg] transform-gpu"
            style={{
              background: `linear-gradient(to bottom, ${
                contactConfig.heroLightBeam1Color
              }${Math.floor(contactConfig.heroLightBeam1Opacity * 100)
                .toString(16)
                .padStart(2, "0")}, transparent)`,
            }}
          ></div>
          <div
            className="absolute bottom-0 right-1/3 w-[400px] h-[600px] -rotate-[24deg] transform-gpu"
            style={{
              background: `linear-gradient(to top, ${
                contactConfig.heroLightBeam2Color
              }${Math.floor(contactConfig.heroLightBeam2Opacity * 100)
                .toString(16)
                .padStart(2, "0")}, transparent)`,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-8">
              <div
                className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm border"
                style={{
                  backgroundColor: contactConfig.heroBadgeBgColor,
                  borderColor: contactConfig.heroBadgeBorderColor,
                  color: contactConfig.heroBadgeTextColor,
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: contactConfig.heroBadgeIconColor }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z"
                  />
                </svg>
                <span className="text-sm font-medium">
                  {contactConfig.badge}
                </span>
              </div>
            </div>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold"
                style={{ color: contactConfig.heroTitleColor }}
              >
                Get in{" "}
                <span className="relative inline-block">
                  <span
                    className="relative z-10 text-transparent bg-clip-text drop-shadow-lg"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${contactConfig.heroTitleGradientFrom}, ${contactConfig.heroTitleGradientVia}, ${contactConfig.heroTitleGradientTo})`,
                    }}
                  >
                    Touch
                  </span>
                  <div
                    className="absolute inset-0 blur-2xl scale-150"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${contactConfig.heroTitleGlowColor}, ${contactConfig.heroTitleGlowColor})`,
                      opacity: contactConfig.heroTitleGlowOpacity,
                    }}
                  ></div>
                </span>
              </h1>
            </motion.div>

            <motion.div
              className="relative inline-block mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div
                className="text-xl leading-relaxed max-w-2xl mx-auto"
                style={{ color: contactConfig.heroSubtitleColor }}
              >
                {contactConfig.subtitle?.split("We're here to help.")[0] || ""}
                <span className="relative inline-block">
                  <span className="relative z-10">
                    We&apos;re here to help.
                  </span>
                  <span
                    className="absolute bottom-0 left-0 right-0 h-3 -rotate-1"
                    style={{
                      backgroundColor:
                        contactConfig.heroSubtitleHighlightBgColor,
                    }}
                  ></span>
                </span>
              </div>
            </motion.div>

            <div className="flex justify-center gap-4 mb-8">
              <div
                className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm border hover:bg-white/15 transition-all duration-200"
                style={{
                  backgroundColor: contactConfig.featureBadge1BgColor,
                  borderColor: contactConfig.featureBadge1BorderColor,
                  color: contactConfig.featureBadge1TextColor,
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: contactConfig.featureBadge1IconColor }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="text-sm font-medium">
                  {contactConfig.featureBadge1Text}
                </span>
              </div>

              <div
                className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm border hover:bg-white/15 transition-all duration-200"
                style={{
                  backgroundColor: contactConfig.featureBadge2BgColor,
                  borderColor: contactConfig.featureBadge2BorderColor,
                  color: contactConfig.featureBadge2TextColor,
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: contactConfig.featureBadge2IconColor }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                <span className="text-sm font-medium">
                  {contactConfig.featureBadge2Text}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="py-16"
        style={{ backgroundColor: contactConfig.contactSectionBgColor }}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2
                className="text-3xl font-display font-bold mb-8"
                style={{ color: contactConfig.contactInfoTitleColor }}
              >
                {contactConfig.contactInfoTitleText}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: contactConfig.contactIconBgColor,
                    }}
                  >
                    <PhoneIcon
                      className="w-6 h-6"
                      style={{ color: contactConfig.contactIconColor }}
                    />
                  </div>
                  <div>
                    <h3
                      className="font-semibold mb-1"
                      style={{ color: contactConfig.contactLabelColor }}
                    >
                      {contactConfig.phoneLabel}
                    </h3>
                    <p style={{ color: contactConfig.contactTextColor }}>
                      <a
                        href={contactConfig.phoneNumberLink}
                        className="transition-colors hover:text-blue-600"
                        style={{ color: contactConfig.contactTextColor }}
                      >
                        {contactConfig.phoneNumber}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: contactConfig.contactIconBgColor,
                    }}
                  >
                    <EnvelopeIcon
                      className="w-6 h-6"
                      style={{ color: contactConfig.contactIconColor }}
                    />
                  </div>
                  <div>
                    <h3
                      className="font-semibold mb-1"
                      style={{ color: contactConfig.contactLabelColor }}
                    >
                      {contactConfig.emailLabel}
                    </h3>
                    <p style={{ color: contactConfig.contactTextColor }}>
                      <a
                        href={contactConfig.emailAddressLink}
                        className="transition-colors hover:text-blue-600"
                        style={{ color: contactConfig.contactTextColor }}
                      >
                        {contactConfig.emailAddress}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: contactConfig.contactIconBgColor,
                    }}
                  >
                    <MapPinIcon
                      className="w-6 h-6"
                      style={{ color: contactConfig.contactIconColor }}
                    />
                  </div>
                  <div>
                    <h3
                      className="font-semibold mb-1"
                      style={{ color: contactConfig.contactLabelColor }}
                    >
                      {contactConfig.locationLabel}
                    </h3>
                    <p
                      style={{
                        color: contactConfig.contactTextColor,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {contactConfig.locationAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: contactConfig.contactIconBgColor,
                    }}
                  >
                    <ClockIcon
                      className="w-6 h-6"
                      style={{ color: contactConfig.contactIconColor }}
                    />
                  </div>
                  <div>
                    <h3
                      className="font-semibold mb-1"
                      style={{ color: contactConfig.contactLabelColor }}
                    >
                      {contactConfig.hoursLabel}
                    </h3>
                    <p
                      style={{
                        color: contactConfig.contactTextColor,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {contactConfig.hoursText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-12">
                <iframe
                  src={contactConfig.googleMapEmbedUrl}
                  className={`w-full rounded-${contactConfig.googleMapBorderRadius} shadow-${contactConfig.googleMapShadow}`}
                  style={{ border: 0, height: contactConfig.googleMapHeight }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2
                className="text-3xl font-display font-bold mb-8"
                style={{ color: contactConfig.formTitleColor }}
              >
                {contactConfig.formTitleText}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                    style={{ color: contactConfig.formLabelColor }}
                  >
                    {contactConfig.formFieldFullName}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full ${contactConfig.formInputPadding} rounded-${contactConfig.formInputBorderRadius} border focus:ring-2 transition-colors`}
                    style={
                      {
                        backgroundColor: contactConfig.formInputBgColor,
                        borderColor: contactConfig.formInputBorderColor,
                        color: contactConfig.formInputTextColor,
                        "--tw-ring-color":
                          contactConfig.formInputFocusRingColor,
                        "--tw-ring-opacity": "1",
                        "--tw-ring-offset-width": "0px",
                        "--tw-ring-offset-color": "#fff",
                        "--tw-ring-offset-shadow": "0 0 #0000",
                        "--tw-ring-shadow": "0 0 #0000",
                      } as React.CSSProperties
                    }
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: contactConfig.formLabelColor }}
                  >
                    {contactConfig.formFieldEmail}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full ${contactConfig.formInputPadding} rounded-${contactConfig.formInputBorderRadius} border focus:ring-2 transition-colors`}
                    style={
                      {
                        backgroundColor: contactConfig.formInputBgColor,
                        borderColor: contactConfig.formInputBorderColor,
                        color: contactConfig.formInputTextColor,
                        "--tw-ring-color":
                          contactConfig.formInputFocusRingColor,
                      } as React.CSSProperties
                    }
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                    style={{ color: contactConfig.formLabelColor }}
                  >
                    {contactConfig.formFieldPhone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full ${contactConfig.formInputPadding} rounded-${contactConfig.formInputBorderRadius} border focus:ring-2 transition-colors`}
                    style={
                      {
                        backgroundColor: contactConfig.formInputBgColor,
                        borderColor: contactConfig.formInputBorderColor,
                        color: contactConfig.formInputTextColor,
                        "--tw-ring-color":
                          contactConfig.formInputFocusRingColor,
                      } as React.CSSProperties
                    }
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium mb-2"
                    style={{ color: contactConfig.formLabelColor }}
                  >
                    {contactConfig.formFieldService}
                  </label>
                  <div className="relative">
                    <svg
                      className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: contactConfig.contactIconColor }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                      />
                    </svg>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-${contactConfig.formInputBorderRadius} border focus:ring-2 transition-colors`}
                      style={
                        {
                          backgroundColor: contactConfig.formInputBgColor,
                          borderColor: contactConfig.formInputBorderColor,
                          color: contactConfig.formInputTextColor,
                          "--tw-ring-color":
                            contactConfig.formInputFocusRingColor,
                        } as React.CSSProperties
                      }
                    >
                      {contactConfig.serviceOptions.map(
                        (option: string, index: number) => (
                          <option key={index}>{option}</option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                    style={{ color: contactConfig.formLabelColor }}
                  >
                    {contactConfig.formFieldMessage}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full ${contactConfig.formInputPadding} rounded-${contactConfig.formInputBorderRadius} border focus:ring-2 transition-colors`}
                    style={
                      {
                        backgroundColor: contactConfig.formInputBgColor,
                        borderColor: contactConfig.formInputBorderColor,
                        color: contactConfig.formInputTextColor,
                        "--tw-ring-color":
                          contactConfig.formInputFocusRingColor,
                      } as React.CSSProperties
                    }
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 font-semibold rounded-${contactConfig.formSubmitBtnBorderRadius} transition-colors duration-200`}
                  style={{
                    backgroundColor: contactConfig.formSubmitBtnBgColor,
                    color: contactConfig.formSubmitBtnTextColor,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor =
                      contactConfig.formSubmitBtnHoverBgColor;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor =
                      contactConfig.formSubmitBtnBgColor;
                  }}
                >
                  {contactConfig.formSubmitBtnText}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Using Services config for consistency */}
      <section className="relative py-20">
        {/* Diagonal stripes background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom right, ${servicesConfig.ctaBgGradientFrom}, ${servicesConfig.ctaBgGradientVia}, ${servicesConfig.ctaBgGradientTo})`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, ${servicesConfig.ctaBgPatternColor} 0px, ${servicesConfig.ctaBgPatternColor} 1px, transparent 1px, transparent 40px)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div
              className="backdrop-blur-[2px] rounded-xl py-8 px-12"
              style={{
                backgroundColor: servicesConfig.ctaCardBgColor,
              }}
            >
              <div className="text-center">
                <h2
                  className="text-3xl md:text-4xl font-display font-bold mb-3"
                  style={{ color: servicesConfig.ctaTitleColor }}
                >
                  {servicesConfig.ctaTitle}
                </h2>
                <p
                  className="text-xl mb-6"
                  style={{ color: servicesConfig.ctaDescriptionColor }}
                >
                  {servicesConfig.ctaDescription}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = "/#schedule";
                    }}
                    className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-colors duration-200"
                    style={{
                      backgroundColor: servicesConfig.scheduleButtonBgColor,
                      color: servicesConfig.scheduleButtonTextColor,
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor =
                        servicesConfig.scheduleButtonHoverBgColor;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor =
                        servicesConfig.scheduleButtonBgColor;
                    }}
                  >
                    {servicesConfig.scheduleButtonText}
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </a>
                  <a
                    href={contactConfig.phoneNumberLink}
                    className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-colors duration-200"
                    style={{
                      backgroundColor: servicesConfig.callButtonBgColor,
                      color: servicesConfig.callButtonTextColor,
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor =
                        servicesConfig.callButtonHoverBgColor;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor =
                        servicesConfig.callButtonBgColor;
                    }}
                  >
                    {servicesConfig.callButtonText}
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
