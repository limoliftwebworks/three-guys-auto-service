// This file defines the type structure for the site configuration

/**
 * Main configuration interface for the site
 */
export interface SiteConfig {
  showLogo?: boolean;
  infoBar?: InfoBarConfig;
  navBar?: NavBarConfig;
  pages?: Record<string, PageConfig>;
  theme?: ThemeConfig;
  navLinks?: NavLink[];
  policies?: PolicyConfig;
  description?: string;
  contactInfo?: ContactInfo;
  hours?: Hours;
  footerLinks?: NavLink[];
  socialLinks?: SocialLinks;
  showJoinTeamButton?: boolean;
  joinTeamText?: string;
  joinTeamLink?: string;
  copyright?: string;
  footerStyle?: FooterStyle;
  schedulingButtonText?: string;
  themeColor?: string;
  _timestamp?: string;
  _lastUpdated?: string;
  themeLink?: string;
  companyName?: string;
  guaranteeItems?: GuaranteeItem[];
  services?: ServicesConfig;
  [key: string]: any; // Allow for additional properties
}

export interface InfoBarConfig {
  backgroundColor?: string;
  textColor?: string;
  phone?: string;
  address?: string;
  hours?: string;
  message?: string;
}

export interface NavBarConfig {
  backgroundColor?: string;
  textColor?: string;
  logo?: string;
  showLogo?: boolean;
  siteTitle?: string;
  siteTitleGradientFrom?: string;
  siteTitleGradientTo?: string;
  navLinks?: NavLink[];
  scheduleButtonText?: string;
  scheduleButtonColor?: string;
  activeTabColor?: string;
  hamburgerIconColor?: string;
  hamburgerIconHoverBgColor?: string;
  mobileMenuBgColor?: string;
  mobileNavTextColor?: string;
  mobileActiveTabBgColor?: string;
  mobileActiveTabTextColor?: string;
}

export interface NavLink {
  path: string;
  label: string;
}

export interface PageConfig {
  title?: string;
  content?: string;
  heroImage?: string;
  badge?: string;
  location?: string;
  subtitle?: string;
  subtitle2?: string;
  heroGradientTop?: string;
  heroGradientBottom?: string;
  heroTitleColor?: string;
  heroLocationColor?: string;
  heroContentColor?: string;
  heroSubtitleColor?: string;
  heroBadgeColor?: string;
  heroBadgeTitleColor?: string;
  heroScheduleButtonColor?: string;
  heroScheduleButtonTextColor?: string;
  heroScheduleButtonHoverColor?: string;
  heroContactButtonColor?: string;
  heroContactButtonTextColor?: string;
  heroContactButtonBorderColor?: string;
  heroContactButtonHoverColor?: string;
  heroContactButtonHoverTextColor?: string;
  heroContactButtonHoverBorderColor?: string;
  heroBox1BgColor?: string;
  heroBox1TextColor?: string;
  heroBox1BorderColor?: string;
  heroBox1IconBgColor?: string;
  heroBox1IconColor?: string;
  heroBox2BgColor?: string;
  heroBox2TextColor?: string;
  heroBox2BorderColor?: string;
  heroBox2IconBgColor?: string;
  heroBox2IconColor?: string;
  heroBox3BgColor?: string;
  heroBox3TextColor?: string;
  heroBox3BorderColor?: string;
  heroBox3IconBgColor?: string;
  heroBox3IconColor?: string;
  [key: string]: any; // Allow for additional properties
}

export interface ThemeConfig {
  primary600?: string;
  primary700?: string;
}

export interface PolicyConfig {
  terms?: string;
  privacy?: string;
}

export interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
}

export interface Hours {
  weekday?: string;
  weekend?: string;
}

export interface SocialLinks {
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
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
}

export interface GuaranteeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ServicesConfig {
  title: string;
  description: string;
  items: ServiceItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}
