"use client";

import { useState } from "react";
import Modal from "./Modal";
import {
  ShieldCheckIcon,
  UserIcon,
  ClockIcon,
  CreditCardIcon,
  BuildingOfficeIcon,
  ScaleIcon,
  DocumentCheckIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";
import localConfig from "@/config/localConfig";

// Get business info from config
const businessInfo = localConfig.businessInfo || {};
const businessName = businessInfo.name || "Davis Tree Service";
const businessType = businessInfo.llcType || "LLC";
const contactEmail = businessInfo.contactEmail || "support@example.com";
const contactPhone = businessInfo.contactPhone || "(706) 296-3318";

// Get privacy policy styling from config
const privacyStyles = businessInfo.legalPages?.privacyPolicy || {
  headerColor: "#387e62",
  linkColor: "#66bf9b",
  backgroundColor: "#ffffff",
  textColor: "#1f1f1f",
  borderColor: "#e5e7eb",
  iconColor: "#66bf9b",
};

// Get terms of service styling from config
const termsStyles = businessInfo.legalPages?.termsOfService || {
  headerColor: "#387e62",
  linkColor: "#66bf9b",
  backgroundColor: "#ffffff",
  textColor: "#1f1f1f",
  borderColor: "#e5e7eb",
  disclaimerBgColor: "#f9fafb",
  disclaimerTextColor: "#374151",
};

interface TawkMessengerProps {
  propertyId: string;
  widgetId: string;
}

declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
      minimize?: () => void;
    };
    TawkMessenger?: {
      onLoad?: () => void;
    };
  }
}

interface SectionProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  children: React.ReactNode;
  styleType?: "privacy" | "terms";
}

const Section = ({
  icon: Icon,
  title,
  children,
  styleType = "privacy",
}: SectionProps) => {
  const styles = styleType === "privacy" ? privacyStyles : termsStyles;

  return (
    <div className="relative">
      <div className="flex items-start gap-4 group">
        <div className="flex-shrink-0 mt-1">
          <div
            className="p-2 rounded-xl transition-colors duration-200"
            style={{
              backgroundColor: `${styles.iconColor}30`,
              color: styles.iconColor,
            }}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="flex-1">
          <h4
            className="font-semibold text-lg transition-colors duration-200"
            style={{ color: styles.headerColor }}
          >
            {title}
          </h4>
          <div className="mt-2 space-y-3" style={{ color: styles.textColor }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const List = ({
  items,
  styleType = "privacy",
}: {
  items: string[];
  styleType?: "privacy" | "terms";
}) => {
  const styles = styleType === "privacy" ? privacyStyles : termsStyles;

  return (
    <ul className="list-none pl-0 space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: `${styles.iconColor}70` }}
          />
          <span style={{ color: styles.textColor }}>{item}</span>
        </li>
      ))}
    </ul>
  );
};

interface PrivacyPolicyReturn {
  openPrivacyPolicy: () => void;
  PrivacyPolicyModal: React.FC;
}

export function usePrivacyPolicy(): PrivacyPolicyReturn {
  const [isOpen, setIsOpen] = useState(false);

  const PrivacyPolicyModalComponent: React.FC = () => (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Privacy Policy"
      bgColor={privacyStyles.backgroundColor}
      textColor={privacyStyles.textColor}
      borderColor={privacyStyles.borderColor}
    >
      <div className="space-y-8">
        <Section
          icon={UserIcon}
          title="Information We Collect"
          styleType="privacy"
        >
          <p style={{ color: privacyStyles.textColor }}>
            We collect information that you provide directly to us, including
            when you schedule a service, contact us for support, or interact
            with our website. This may include:
          </p>
          <List
            items={[
              "Name and contact information",
              "Vehicle information",
              "Service history and preferences",
              "Payment information",
            ]}
            styleType="privacy"
          />
        </Section>

        <Section
          icon={ShieldCheckIcon}
          title="How We Use Your Information"
          styleType="privacy"
        >
          <p>We use the information we collect to:</p>
          <List
            items={[
              "Provide and improve our services",
              "Communicate with you about services and appointments",
              "Process your payments",
              "Send you marketing communications (with your consent)",
              "Comply with legal obligations",
            ]}
            styleType="privacy"
          />
        </Section>

        <Section
          icon={BuildingOfficeIcon}
          title="Information Sharing"
          styleType="privacy"
        >
          <p>
            We do not sell your personal information. We may share your
            information with:
          </p>
          <List
            items={[
              "Service providers who assist in our operations",
              "Insurance companies (with your consent)",
              "Law enforcement when required by law",
            ]}
            styleType="privacy"
          />
        </Section>

        <Section
          icon={DocumentCheckIcon}
          title="Your Rights"
          styleType="privacy"
        >
          <p>You have the right to:</p>
          <List
            items={[
              "Access your personal information",
              "Correct inaccurate information",
              "Request deletion of your information",
              "Opt-out of marketing communications",
            ]}
            styleType="privacy"
          />
        </Section>

        <Section icon={BellAlertIcon} title="Contact Us" styleType="privacy">
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <div className="mt-3 space-y-2">
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-2 hover:underline"
              style={{ color: privacyStyles.linkColor }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: `${privacyStyles.iconColor}70` }}
              />
              {contactEmail}
            </a>
            <a
              href={`tel:${contactPhone}`}
              className="flex items-center gap-2 hover:underline"
              style={{ color: privacyStyles.linkColor }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: `${privacyStyles.iconColor}70` }}
              />
              {contactPhone}
            </a>
          </div>
        </Section>
      </div>
    </Modal>
  );

  return {
    openPrivacyPolicy: () => setIsOpen(true),
    PrivacyPolicyModal: PrivacyPolicyModalComponent,
  };
}

interface TermsOfServiceReturn {
  openTermsOfService: () => void;
  TermsOfServiceModal: React.FC;
}

export function useTermsOfService(): TermsOfServiceReturn {
  const [isOpen, setIsOpen] = useState(false);

  const TermsOfServiceModalComponent: React.FC = () => (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Terms of Service"
      bgColor={termsStyles.backgroundColor}
      textColor={termsStyles.textColor}
      borderColor={termsStyles.borderColor}
    >
      <div className="space-y-8">
        <Section
          icon={DocumentCheckIcon}
          title="Acceptance of Terms"
          styleType="terms"
        >
          <p>
            By accessing and using {businessName} services and website, you
            agree to be bound by these Terms of Service and all applicable laws
            and regulations.
          </p>
        </Section>

        <Section
          icon={BuildingOfficeIcon}
          title="Service Description"
          styleType="terms"
        >
          <p>
            {businessName} provides tree removal services, tree trimming, stump
            grinding, and related services.
          </p>
        </Section>

        <Section
          icon={ClockIcon}
          title="Scheduling and Appointments"
          styleType="terms"
        >
          <List
            items={[
              "Appointments must be scheduled in advance",
              "24-hour notice is required for cancellations",
              "Late arrivals may need to be rescheduled",
            ]}
            styleType="terms"
          />
        </Section>

        <Section icon={CreditCardIcon} title="Payment Terms" styleType="terms">
          <List
            items={[
              "Payment is required upon completion of service",
              "We accept major credit cards, cash, and approved insurance payments",
              "All prices are subject to change without notice",
            ]}
            styleType="terms"
          />
        </Section>

        <Section icon={ShieldCheckIcon} title="Warranty" styleType="terms">
          <p>
            Our work is backed by a limited warranty. Specific terms and
            conditions apply. The warranty is non-transferable and valid only
            for the original service.
          </p>
        </Section>

        <Section
          icon={ScaleIcon}
          title="Limitation of Liability"
          styleType="terms"
        >
          <p>
            {businessName} {businessType} is not liable for any indirect,
            incidental, or consequential damages arising from our services.
          </p>
        </Section>

        <Section
          icon={DocumentCheckIcon}
          title="Changes to Terms"
          styleType="terms"
        >
          <p>
            We reserve the right to modify these terms at any time. Continued
            use of our services constitutes acceptance of any changes.
          </p>
        </Section>
      </div>
    </Modal>
  );

  return {
    openTermsOfService: () => setIsOpen(true),
    TermsOfServiceModal: TermsOfServiceModalComponent,
  };
}
