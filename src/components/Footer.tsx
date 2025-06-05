"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { usePrivacyPolicy, useTermsOfService } from "./PolicyModals";
import Image from "next/image";
import localConfig from "../config/localConfig";
import {
  FooterStyle,
  SocialLinks,
  getFooterStyle,
  getSocialLinks,
  normalizeConfig,
  SiteConfig,
} from "../config/configFixTypes";
import { useConfig } from "@/context/ConfigContext";

// Define interfaces for the configuration objects
interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
}

interface Hours {
  weekday?: string;
  weekend?: string;
}

// Add type for footerLink items
interface FooterLink {
  label: string;
  path: string;
}

// Add social icons imports
const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterXIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface ShimmerLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  textColor?: string;
  hoverColor?: string;
}

const ShimmerLink = ({
  href,
  children,
  className = "",
  textColor = "#4b5563",
  hoverColor = "#4f46e5",
}: ShimmerLinkProps) => (
  <Link href={href} className={`group relative inline-block ${className}`}>
    <span
      className="relative z-10 transition-all duration-300 group-hover:translate-x-1 text-base"
      style={
        {
          color: textColor,
          "--hover-color": hoverColor,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
    <div className="absolute inset-0 -z-10 translate-y-[80%] group-hover:translate-y-[20%] opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-transparent via-primary-500/10 to-transparent bg-[length:200%_100%] group-hover:animate-[shimmer_2s_infinite]" />
  </Link>
);

export default function Footer() {
  const { openPrivacyPolicy, PrivacyPolicyModal } = usePrivacyPolicy();
  const { openTermsOfService, TermsOfServiceModal } = useTermsOfService();

  // DIRECTLY USE LOCAL CONFIG VALUES WITHOUT TRYING TO USE CONTEXT
  // Get company info
  const companyName = localConfig.companyName || "Davis Tree Service";
  const description =
    localConfig.description ||
    "Professional tree removal services in Athens, GA";

  // Get links and social media
  const footerLinks = localConfig.footerLinks || [];
  const socialLinks = getSocialLinks(localConfig);

  // Get contact info and hours
  const contactInfo = localConfig.contactInfo || {};
  const hours = localConfig.hours || {};

  // Get button configuration
  const showJoinTeamButton =
    localConfig.showJoinTeamButton === undefined
      ? true
      : localConfig.showJoinTeamButton;
  const joinTeamText = localConfig.joinTeamText || "Join Our Team";
  const joinTeamLink = localConfig.joinTeamLink || "/careers";
  const copyright =
    localConfig.copyright ||
    `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`;

  // Get footer styling
  const style = getFooterStyle(localConfig);

  const colors = {
    gradientFrom: style.gradientFromColor || "#ffffff",
    gradientTo: style.gradientToColor || "#f9fafb",
    title: style.titleColor || "#4f46e5",
    text: style.textColor || "#4b5563",
    link: style.linkColor || "#4b5563",
    linkHover: style.linkHoverColor || "#4f46e5",
    socialIcon: style.socialIconColor || "#4f46e5",
    divider: style.dividerColor || "rgba(79, 70, 229, 0.2)",
    quickLinksTitle: style.quickLinksTitleColor || "#4f46e5",
    contactInfoTitle: style.contactInfoTitleColor || "#4f46e5",
    infoTitle: style.infoTitleColor || "#4f46e5",
    joinButtonBg: style.joinButtonBgColor || "#4f46e5",
    joinButtonText: style.joinButtonTextColor || "#ffffff",
    joinButtonHoverBg: style.joinButtonHoverBgColor || "#4338ca",
    hoursCardBg: style.hoursCardBgColor || "rgba(255, 255, 255, 0.6)",
    hoursCardText: style.hoursCardTextColor || "#4b5563",
    hoursCardValue: style.hoursCardValueColor || "#4f46e5",
    copyrightText: style.copyrightTextColor || "#6b7280",
    policyLink: style.policyLinkColor || "#6b7280",
    policyLinkHover: style.policyLinkHoverColor || "#4f46e5",
  };

  return (
    <footer
      className="relative data-cursor-element"
      style={{
        background: `linear-gradient(to bottom, ${colors.gradientFrom}, ${colors.gradientTo})`,
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Brand Section */}
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-2 flex items-center"
            >
              <span
                className="font-bold text-2xl md:text-3xl font-rubik block leading-tight select-none data-cursor-element"
                style={{ color: colors.title }}
              >
                {companyName}
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-6 leading-relaxed text-[15px] data-cursor-element"
              style={{ color: colors.text }}
            >
              {description}
            </motion.p>

            {/* Social Media Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex space-x-6"
            >
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-transform duration-200 hover:scale-110 data-cursor-element"
                  style={{ color: colors.socialIcon }}
                >
                  <InstagramIcon />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-transform duration-200 hover:scale-110 data-cursor-element"
                  style={{ color: colors.socialIcon }}
                >
                  <FacebookIcon />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-transform duration-200 hover:scale-110 data-cursor-element"
                  style={{ color: colors.socialIcon }}
                >
                  <LinkedInIcon />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-transform duration-200 hover:scale-110 data-cursor-element"
                  style={{ color: colors.socialIcon }}
                >
                  <TwitterXIcon />
                </a>
              )}
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:ml-8">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold mb-5 relative inline-block data-cursor-element"
              style={{ color: colors.quickLinksTitle }}
            >
              Quick Links
              <span
                className="absolute -bottom-1 left-0 w-12 h-0.5 rounded-full"
                style={{ backgroundColor: colors.divider }}
              ></span>
            </motion.h3>
            <ul className="space-y-3">
              {footerLinks.map(
                (link: { label: string; path: string }, index: number) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="transform hover:-translate-y-0.5 transition-transform duration-200"
                  >
                    <ShimmerLink
                      href={link.path}
                      textColor={colors.link}
                      hoverColor={colors.linkHover}
                      className="data-cursor-element"
                    >
                      {link.label}
                    </ShimmerLink>
                  </motion.li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold mb-5 relative inline-block data-cursor-element"
              style={{ color: colors.contactInfoTitle }}
            >
              Contact Info
              <span
                className="absolute -bottom-1 left-0 w-12 h-0.5 rounded-full"
                style={{ backgroundColor: colors.divider }}
              ></span>
            </motion.h3>
            <ul className="space-y-3">
              {contactInfo.address && (
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-3 group hover:bg-white/80 p-2 rounded-lg transition-all duration-300 data-cursor-element">
                    <MapPinIcon
                      className="w-5 h-5 transform transition-transform duration-200 group-hover:scale-110"
                      style={{ color: colors.socialIcon }}
                    />
                    <div>
                      <p
                        className="transition-colors duration-200 text-[15px]"
                        style={
                          {
                            color: colors.text,
                            "--hover-color": colors.linkHover,
                          } as React.CSSProperties
                        }
                      >
                        {contactInfo.address}
                      </p>
                    </div>
                  </div>
                </motion.li>
              )}
              {contactInfo.phone && (
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center space-x-3 group hover:bg-white/80 p-2 rounded-lg transition-all duration-300 data-cursor-element"
                  >
                    <PhoneIcon
                      className="w-5 h-5 transform transition-transform duration-200 group-hover:scale-110"
                      style={{ color: colors.socialIcon }}
                    />
                    <span
                      className="transition-colors duration-200 text-[15px] group-hover:text-[--hover-color]"
                      style={
                        {
                          color: colors.text,
                          "--hover-color": colors.linkHover,
                        } as React.CSSProperties
                      }
                    >
                      {contactInfo.phone}
                    </span>
                  </a>
                </motion.li>
              )}
              {contactInfo.email && (
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center space-x-3 group hover:bg-white/80 p-2 rounded-lg transition-all duration-300 data-cursor-element"
                  >
                    <EnvelopeIcon
                      className="w-5 h-5 transform transition-transform duration-200 group-hover:scale-110"
                      style={{ color: colors.socialIcon }}
                    />
                    <span
                      className="transition-colors duration-200 text-[15px] group-hover:text-[--hover-color]"
                      style={
                        {
                          color: colors.text,
                          "--hover-color": colors.linkHover,
                        } as React.CSSProperties
                      }
                    >
                      {contactInfo.email}
                    </span>
                  </a>
                </motion.li>
              )}
            </ul>
          </div>

          {/* Info Section */}
          <div className="col-span-1">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold mb-5 relative inline-block data-cursor-element"
              style={{ color: colors.infoTitle }}
            >
              Info
              <span
                className="absolute -bottom-1 left-0 w-12 h-0.5 rounded-full"
                style={{ backgroundColor: colors.divider }}
              ></span>
            </motion.h3>
            <div className="space-y-3">
              {/* Hours Card */}
              {(hours.weekday || hours.weekend) && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group data-cursor-element"
                  style={{ backgroundColor: colors.hoursCardBg }}
                >
                  <div className="flex items-start space-x-3">
                    <ClockIcon
                      className="w-5 h-5 transform transition-transform duration-200 group-hover:scale-110 shrink-0"
                      style={{ color: colors.socialIcon }}
                    />
                    <div className="flex-1 space-y-2">
                      {hours.weekday && (
                        <div className="flex justify-between items-center">
                          <span
                            className="text-[15px]"
                            style={{ color: colors.hoursCardText }}
                          >
                            Monday - Friday
                          </span>
                          <span
                            className="font-medium text-[15px]"
                            style={{ color: colors.hoursCardValue }}
                          >
                            {hours.weekday}
                          </span>
                        </div>
                      )}
                      {hours.weekend && (
                        <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                          <span
                            className="text-[15px]"
                            style={{ color: colors.hoursCardText }}
                          >
                            Saturday - Sunday
                          </span>
                          <span
                            className="font-medium text-[15px]"
                            style={{ color: colors.hoursCardValue }}
                          >
                            {hours.weekend}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Join Our Team Button */}
              {showJoinTeamButton && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    href={joinTeamLink}
                    className="flex items-center justify-center space-x-2 p-4 rounded-lg transition-all duration-300 group shadow-sm hover:shadow-md data-cursor-element"
                    style={
                      {
                        backgroundColor: colors.joinButtonBg,
                        color: colors.joinButtonText,
                        "--hover-bg": colors.joinButtonHoverBg,
                      } as React.CSSProperties
                    }
                    onMouseOver={(e) => {
                      const target = e.currentTarget;
                      target.style.backgroundColor = colors.joinButtonHoverBg;
                    }}
                    onMouseOut={(e) => {
                      const target = e.currentTarget;
                      target.style.backgroundColor = colors.joinButtonBg;
                    }}
                  >
                    <UserGroupIcon className="w-5 h-5" />
                    <span className="font-medium text-[15px]">
                      {joinTeamText}
                    </span>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-16 pt-8 max-w-6xl mx-auto"
          style={{ borderTop: `1px solid ${colors.divider}` }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm data-cursor-element"
              style={{ color: colors.copyrightText }}
            >
              {copyright}
            </motion.p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="transform hover:-translate-y-0.5 transition-transform duration-200"
              >
                <button
                  onClick={openPrivacyPolicy}
                  className="transition-colors duration-200 data-cursor-element"
                  style={
                    {
                      color: colors.policyLink,
                      "--hover-color": colors.policyLinkHover,
                    } as React.CSSProperties
                  }
                  onMouseOver={(e) => {
                    const target = e.currentTarget;
                    target.style.color = colors.policyLinkHover;
                  }}
                  onMouseOut={(e) => {
                    const target = e.currentTarget;
                    target.style.color = colors.policyLink;
                  }}
                >
                  Privacy Policy
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="transform hover:-translate-y-0.5 transition-transform duration-200"
              >
                <button
                  onClick={openTermsOfService}
                  className="transition-colors duration-200 data-cursor-element"
                  style={
                    {
                      color: colors.policyLink,
                      "--hover-color": colors.policyLinkHover,
                    } as React.CSSProperties
                  }
                  onMouseOver={(e) => {
                    const target = e.currentTarget;
                    target.style.color = colors.policyLinkHover;
                  }}
                  onMouseOut={(e) => {
                    const target = e.currentTarget;
                    target.style.color = colors.policyLink;
                  }}
                >
                  Terms of Service
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Render the modals */}
      <PrivacyPolicyModal />
      <TermsOfServiceModal />
    </footer>
  );
}
