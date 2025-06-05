'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface FooterBottomBarProps {
  copyright: string;
  openPrivacyPolicy: () => void;
  openTermsOfService: () => void;
  colors: {
    divider: string;
    copyrightText: string;
    policyLink: string;
    policyLinkHover: string;
  };
}

export default function FooterBottomBar({
  copyright,
  openPrivacyPolicy,
  openTermsOfService,
  colors
}: FooterBottomBarProps) {
  return (
    <div 
      className="mt-16 pt-8 max-w-6xl mx-auto"
      style={{ borderTop: `1px solid ${colors.divider}` }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm"
          style={{ color: colors.copyrightText }}
        >
          {copyright}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex space-x-6 mt-4 md:mt-0"
        >
          <button 
            onClick={openPrivacyPolicy}
            className="text-sm transition-colors duration-200 hover:underline"
            style={{ 
              color: colors.policyLink
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = colors.policyLinkHover;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = colors.policyLink;
            }}
          >
            Privacy Policy
          </button>
          <button 
            onClick={openTermsOfService}
            className="text-sm transition-colors duration-200 hover:underline"
            style={{ 
              color: colors.policyLink
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = colors.policyLinkHover;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = colors.policyLink;
            }}
          >
            Terms of Service
          </button>
        </motion.div>
      </div>
    </div>
  )
} 