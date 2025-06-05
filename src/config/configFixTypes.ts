// This is a simplified version of configFixTypes.ts
// It just returns the config as-is without any complex normalization

// Define the interfaces directly in this file instead of importing
export interface SiteConfig {
  navBar?: {
    siteTitle?: string;
    [key: string]: any;
  };
  cursor?: {
    enabled?: boolean;
    cursorImage?: string;
    elementCursorImage?: string;
    [key: string]: any;
  };
  browser?: {
    title?: string;
    shortTitle?: string;
    faviconFolder?: string;
    themeColor?: string;
    [key: string]: any;
  };
  businessInfo?: {
    name?: string;
    llcType?: string;
    contactEmail?: string;
    contactPhone?: string;
    legalPages?: {
      privacyPolicy?: {
        headerColor?: string;
        linkColor?: string;
        backgroundColor?: string;
        textColor?: string;
        borderColor?: string;
        iconColor?: string;
        [key: string]: any;
      };
      termsOfService?: {
        headerColor?: string;
        linkColor?: string;
        backgroundColor?: string;
        textColor?: string;
        borderColor?: string;
        disclaimerBgColor?: string;
        disclaimerTextColor?: string;
        [key: string]: any;
      };
      [key: string]: any;
    };
    [key: string]: any;
  };
  description?: string;
  footerLinks?: Array<{ label: string; path: string }>;
  socialLinks?: SocialLinks;
  contactInfo?: {
    address?: string;
    phone?: string;
    email?: string;
    [key: string]: any;
  };
  hours?: {
    weekday?: string;
    weekend?: string;
    [key: string]: any;
  };
  showJoinTeamButton?: boolean;
  joinTeamText?: string;
  joinTeamLink?: string;
  copyright?: string;
  footerStyle?: FooterStyle;
  [key: string]: any;
}

export interface FooterStyle {
  backgroundColor?: string;
  gradientFromColor?: string;
  gradientToColor?: string;
  titleColor?: string;
  textColor?: string;
  linkColor?: string;
  linkHoverColor?: string;
  socialIconColor?: string;
  dividerColor?: string;
  quickLinksTitleColor?: string;
  contactInfoTitleColor?: string;
  infoTitleColor?: string;
  joinButtonBgColor?: string;
  joinButtonTextColor?: string;
  joinButtonHoverBgColor?: string;
  hoursCardBgColor?: string;
  hoursCardTextColor?: string;
  hoursCardValueColor?: string;
  copyrightTextColor?: string;
  policyLinkColor?: string;
  policyLinkHoverColor?: string;
  [key: string]: string | undefined;
}

export interface SocialLinks {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  [key: string]: string | undefined;
}

/**
 * Normalizes the configuration to ensure it has the complete expected structure
 * This simplified version just returns the config without modification
 */
export function normalizeConfig(config: any): SiteConfig {
  // Simply return the config as-is with type assertion
  return config as SiteConfig;
}

/**
 * Get social links with proper defaults
 */
export function getSocialLinks(config: any): SocialLinks {
  return (config.socialLinks || {}) as SocialLinks;
}

/**
 * Get footer style with proper defaults
 */
export function getFooterStyle(config: any): FooterStyle {
  const defaultStyle: FooterStyle = {
    gradientFromColor: "#000000",
    gradientToColor: "#111111",
    titleColor: "#ffffff",
    textColor: "#e5e7eb",
    linkColor: "#e5e7eb",
    linkHoverColor: "#ffffff",
    socialIconColor: "#e5e7eb",
    dividerColor: "rgba(255, 255, 255, 0.1)",
    quickLinksTitleColor: "#ffffff",
    contactInfoTitleColor: "#ffffff",
    infoTitleColor: "#ffffff",
    joinButtonBgColor: "#22d3ee",
    joinButtonTextColor: "#ffffff",
    joinButtonHoverBgColor: "#06b6d4",
    hoursCardBgColor: "rgba(255, 255, 255, 0.05)",
    hoursCardTextColor: "#e5e7eb",
    hoursCardValueColor: "#ffffff",
    copyrightTextColor: "#9ca3af",
    policyLinkColor: "#e5e7eb",
    policyLinkHoverColor: "#ffffff",
  };

  // Merge with config.footerStyle if available
  return { ...defaultStyle, ...(config.footerStyle || {}) };
}
