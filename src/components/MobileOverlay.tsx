import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import localConfig from "@/config/localConfig";

interface MobileOverlayProps {
  title?: string;
  message?: string;
  buttonText?: string;
  buttonLink?: string;
}

const MobileOverlay: React.FC<MobileOverlayProps> = (props) => {
  // Get config from localConfig
  const config = localConfig.pages.Careers.mobileOverlay;
  const brandGreen = localConfig.pages.Careers.formHeaderBgFrom || "#126e40";
  const brandGreenLight = localConfig.pages.Careers.formHeaderBgTo || "#4bf63b";

  // Use props if provided, otherwise fallback to config values
  const title = props.title || config.title;
  const message = props.message || config.message;
  const buttonText = props.buttonText || config.buttonText;
  const buttonLink = props.buttonLink || config.buttonLink;
  const footerText = config.footerText;

  return (
    <div
      className={`fixed inset-0 z-${config.overlayZIndex} bg-black flex items-center justify-center p-6`}
      style={{ backgroundColor: `rgba(0, 0, 0, ${config.backgroundOpacity})` }}
    >
      <motion.div
        className={`bg-${config.cardBackgroundColor} rounded-${config.cardBorderRadius} p-6 max-w-md w-full shadow-${config.cardBoxShadow} border-t-${config.cardBorderTopWidth}`}
        style={{
          backgroundColor: config.cardBackgroundColor,
          borderColor: brandGreen,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          {/* Tree service icon */}
          <div
            className={`w-${config.iconWidth} h-${config.iconHeight} mx-auto mb-4 rounded-full flex items-center justify-center`}
            style={{
              backgroundColor: `${brandGreen}${Math.round(
                config.iconBackgroundOpacity * 100
              )}`,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              viewBox="0 0 24 24"
              style={{ color: brandGreen }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Tree trunk */}
              <path d="M12 22V13" />
              {/* Tree branches/leaves */}
              <path d="M12 13L18 7" />
              <path d="M12 13L6 7" />
              <path d="M12 8L15 5" />
              <path d="M12 8L9 5" />
              {/* Tree base/roots */}
              <path d="M9 22h6" />
              {/* Tree top */}
              <path d="M8 3L12 7L16 3" />
            </svg>
          </div>

          <h2
            className={`text-${config.titleFontSize} font-${config.titleFontWeight} mb-3`}
            style={{ color: brandGreen }}
          >
            {title}
          </h2>

          <p className="mb-6" style={{ color: config.messageColor }}>
            {message}
          </p>

          <Link href={buttonLink}>
            <motion.button
              className={`w-${config.buttonWidth} ${config.buttonPadding} text-white font-${config.buttonFontWeight} rounded-${config.buttonBorderRadius} shadow-${config.buttonShadow}`}
              style={{
                background: `linear-gradient(to right, ${brandGreen}, ${brandGreenLight})`,
                color: config.buttonTextColor,
              }}
              whileHover={{ scale: config.buttonHoverScale }}
              whileTap={{ scale: config.buttonTapScale }}
            >
              {buttonText}
            </motion.button>
          </Link>

          <div
            className={`mt-${config.footerMarginTop} pt-${config.footerPaddingTop} border-t`}
            style={{
              borderColor: config.footerBorderColor,
            }}
          >
            <p
              className={`text-${config.footerTextSize}`}
              style={{ color: config.footerTextColor }}
            >
              {footerText}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileOverlay;
