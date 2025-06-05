'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
}

interface FooterContactInfoProps {
  contactInfo: ContactInfo;
  colors: {
    contactInfoTitle: string;
    divider: string;
    text: string;
    linkHover: string;
    socialIcon: string;
  };
}

export default function FooterContactInfo({ 
  contactInfo, 
  colors 
}: FooterContactInfoProps) {
  return (
    <div className="col-span-1">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-lg font-semibold mb-5 relative inline-block"
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
            <div className="flex items-center space-x-3 group hover:bg-white/80 p-2 rounded-lg transition-all duration-300">
              <MapPinIcon 
                className="w-5 h-5 transform transition-transform duration-200 group-hover:scale-110" 
                style={{ color: colors.socialIcon }}
              />
              <div>
                <p 
                  className="transition-colors duration-200 text-[15px]"
                  style={{ 
                    color: colors.text,
                    "--hover-color": colors.linkHover
                  } as React.CSSProperties}
                >{contactInfo.address}</p>
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
              className="flex items-center space-x-3 group hover:bg-white/80 p-2 rounded-lg transition-all duration-300"
            >
              <PhoneIcon 
                className="w-5 h-5 transform transition-transform duration-200 group-hover:scale-110" 
                style={{ color: colors.socialIcon }}
              />
              <span 
                className="transition-colors duration-200 text-[15px] group-hover:text-[--hover-color]"
                style={{ 
                  color: colors.text,
                  "--hover-color": colors.linkHover
                } as React.CSSProperties}
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
              className="flex items-center space-x-3 group hover:bg-white/80 p-2 rounded-lg transition-all duration-300"
            >
              <EnvelopeIcon 
                className="w-5 h-5 transform transition-transform duration-200 group-hover:scale-110" 
                style={{ color: colors.socialIcon }}
              />
              <span 
                className="transition-colors duration-200 text-[15px] group-hover:text-[--hover-color]"
                style={{ 
                  color: colors.text,
                  "--hover-color": colors.linkHover
                } as React.CSSProperties}
              >
                {contactInfo.email}
              </span>
            </a>
          </motion.li>
        )}
      </ul>
    </div>
  )
} 