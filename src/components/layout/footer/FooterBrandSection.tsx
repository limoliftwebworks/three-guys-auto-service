"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterXIcon,
} from "./SocialIcons";

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  [key: string]: string | undefined;
}

interface BrandSectionProps {
  companyName: string;
  description: string;
  socialLinks: SocialLinks;
  colors: {
    title: string;
    text: string;
    socialIcon: string;
  };
}

export default function FooterBrandSection({
  companyName,
  description,
  socialLinks,
  colors,
}: BrandSectionProps) {
  // Ensure socialLinks is defined with empty object as fallback
  const links = socialLinks || {};

  return (
    <div className="col-span-1">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-2 flex items-center"
      >
        <span
          className="font-bold text-2xl md:text-3xl font-rubik block leading-tight select-none"
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
        className="mb-6 leading-relaxed text-[15px]"
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
        {links.instagram && (
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform duration-200 hover:scale-110"
            style={{ color: colors.socialIcon }}
          >
            <InstagramIcon />
          </a>
        )}
        {links.facebook && (
          <a
            href={links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform duration-200 hover:scale-110"
            style={{ color: colors.socialIcon }}
          >
            <FacebookIcon />
          </a>
        )}
        {links.linkedin && (
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform duration-200 hover:scale-110"
            style={{ color: colors.socialIcon }}
          >
            <LinkedInIcon />
          </a>
        )}
        {links.twitter && (
          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-transform duration-200 hover:scale-110"
            style={{ color: colors.socialIcon }}
          >
            <TwitterXIcon />
          </a>
        )}
      </motion.div>
    </div>
  );
}
