"use client";

import React, { useState, useEffect } from "react";
import localConfig from "@/config/localConfig";
import {
  getFooterStyle,
  getSocialLinks,
  normalizeConfig,
  SiteConfig,
} from "@/config/configFixTypes";
import FooterBrandSection from "./FooterBrandSection";
import FooterLinks from "./FooterLinks";
import FooterContactInfo from "./FooterContactInfo";
import FooterInfoSection from "./FooterInfoSection";
import FooterBottomBar from "./FooterBottomBar";

interface PolicyModalProps {
  openPrivacyPolicy: () => void;
  PrivacyPolicyModal: React.FC;
  openTermsOfService: () => void;
  TermsOfServiceModal: React.FC;
}

// Policy modal hooks (moved inside component to fix React hooks rules)

export default function Footer() {
  // Policy modal hooks (properly inside component)
  let policyModals: PolicyModalProps | null = null;
  try {
    const {
      usePrivacyPolicy,
      useTermsOfService,
    } = require("../../PolicyModals");
    const privacyPolicyHook = usePrivacyPolicy();
    const termsOfServiceHook = useTermsOfService();
    policyModals = {
      openPrivacyPolicy: privacyPolicyHook.openPrivacyPolicy,
      PrivacyPolicyModal: privacyPolicyHook.PrivacyPolicyModal,
      openTermsOfService: termsOfServiceHook.openTermsOfService,
      TermsOfServiceModal: termsOfServiceHook.TermsOfServiceModal,
    };
  } catch (error) {
    console.warn("Policy modals not available:", error);
    // Create dummy functions and components as fallbacks
    policyModals = {
      openPrivacyPolicy: () =>
        console.log("Privacy policy modal not available"),
      PrivacyPolicyModal: () => null,
      openTermsOfService: () =>
        console.log("Terms of service modal not available"),
      TermsOfServiceModal: () => null,
    };
  }

  // Destructure with fallback for safety
  const {
    openPrivacyPolicy,
    PrivacyPolicyModal,
    openTermsOfService,
    TermsOfServiceModal,
  } = policyModals || {};

  // Use state to manage config to ensure it's reactive and fresh
  const [currentConfig, setCurrentConfig] = useState<SiteConfig>(
    normalizeConfig(localConfig)
  );

  // Force refresh from localConfig on mount
  useEffect(() => {
    // This ensures we're always using the latest localConfig with proper structure
    setCurrentConfig(normalizeConfig({ ...localConfig }));
  }, []);

  // Get data from currentConfig
  const companyName = currentConfig.navBar?.siteTitle || "Davis Tree Service";
  const description =
    currentConfig.description ||
    "Professional tree removal services in Athens, GA";
  const footerLinks = currentConfig.footerLinks || [];
  const socialLinks = getSocialLinks(currentConfig);
  const contactInfo = currentConfig.contactInfo || {};
  const hours = currentConfig.hours || {};
  const showJoinTeamButton = currentConfig.showJoinTeamButton || false;
  const joinTeamText = currentConfig.joinTeamText || "Join the Team";
  const joinTeamLink = currentConfig.joinTeamLink || "/careers";
  const copyright =
    currentConfig.copyright ||
    `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`;

  // Get footer styling with proper structure
  const style = getFooterStyle(currentConfig);
  const colors = {
    gradientFrom: style.gradientFromColor || "#000000",
    gradientTo: style.gradientToColor || "#111111",
    title: style.titleColor || "#ffffff",
    text: style.textColor || "#e5e7eb",
    link: style.linkColor || "#e5e7eb",
    linkHover: style.linkHoverColor || "#ffffff",
    socialIcon: style.socialIconColor || "#e5e7eb",
    divider: style.dividerColor || "rgba(255, 255, 255, 0.1)",
    quickLinksTitle: style.quickLinksTitleColor || "#ffffff",
    contactInfoTitle: style.contactInfoTitleColor || "#ffffff",
    infoTitle: style.infoTitleColor || "#ffffff",
    joinButtonBg: style.joinButtonBgColor || "#3b82f6",
    joinButtonText: style.joinButtonTextColor || "#ffffff",
    joinButtonHoverBg: style.joinButtonHoverBgColor || "#2563eb",
    hoursCardBg: style.hoursCardBgColor || "rgba(255, 255, 255, 0.05)",
    hoursCardText: style.hoursCardTextColor || "#e5e7eb",
    hoursCardValue: style.hoursCardValueColor || "#ffffff",
    copyrightText: style.copyrightTextColor || "#9ca3af",
    policyLink: style.policyLinkColor || "#e5e7eb",
    policyLinkHover: style.policyLinkHoverColor || "#ffffff",
  };

  return (
    <footer
      className="relative"
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
          <FooterBrandSection
            companyName={companyName}
            description={description}
            socialLinks={socialLinks}
            colors={{
              title: colors.title,
              text: colors.text,
              socialIcon: colors.socialIcon,
            }}
          />

          {/* Quick Links */}
          <FooterLinks
            title="Quick Links"
            links={footerLinks}
            colors={{
              quickLinksTitle: colors.quickLinksTitle,
              divider: colors.divider,
              link: colors.link,
              linkHover: colors.linkHover,
            }}
          />

          {/* Contact Info */}
          <FooterContactInfo
            contactInfo={contactInfo}
            colors={{
              contactInfoTitle: colors.contactInfoTitle,
              divider: colors.divider,
              text: colors.text,
              linkHover: colors.linkHover,
              socialIcon: colors.socialIcon,
            }}
          />

          {/* Info Section */}
          <FooterInfoSection
            hours={hours}
            showJoinTeamButton={showJoinTeamButton}
            joinTeamText={joinTeamText}
            joinTeamLink={joinTeamLink}
            colors={{
              infoTitle: colors.infoTitle,
              divider: colors.divider,
              socialIcon: colors.socialIcon,
              hoursCardBg: colors.hoursCardBg,
              hoursCardText: colors.hoursCardText,
              hoursCardValue: colors.hoursCardValue,
              joinButtonBg: colors.joinButtonBg,
              joinButtonText: colors.joinButtonText,
              joinButtonHoverBg: colors.joinButtonHoverBg,
            }}
          />
        </div>

        {/* Bottom Bar */}
        <FooterBottomBar
          copyright={copyright}
          openPrivacyPolicy={openPrivacyPolicy || (() => {})}
          openTermsOfService={openTermsOfService || (() => {})}
          colors={{
            divider: colors.divider,
            copyrightText: colors.copyrightText,
            policyLink: colors.policyLink,
            policyLinkHover: colors.policyLinkHover,
          }}
        />
      </div>

      {/* Policy Modals */}
      {PrivacyPolicyModal && <PrivacyPolicyModal />}
      {TermsOfServiceModal && <TermsOfServiceModal />}
    </footer>
  );
}
