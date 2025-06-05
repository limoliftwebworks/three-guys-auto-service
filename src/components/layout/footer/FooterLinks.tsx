'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ShimmerLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  textColor?: string;
  hoverColor?: string;
}

// Shimmer effect link component
const ShimmerLink = ({ 
  href, 
  children, 
  className = "",
  textColor = "#4b5563",
  hoverColor = "#4f46e5"
}: ShimmerLinkProps) => (
  <Link 
    href={href}
    className={`group relative inline-block ${className}`}
  >
    <span 
      className="relative z-10 transition-all duration-300 group-hover:translate-x-1 text-base" 
      style={{ 
        color: textColor,
        "--hover-color": hoverColor
      } as React.CSSProperties}
    >
      {children}
    </span>
    <div className="absolute inset-0 -z-10 translate-y-[80%] group-hover:translate-y-[20%] opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-transparent via-primary-500/10 to-transparent bg-[length:200%_100%] group-hover:animate-[shimmer_2s_infinite]" />
  </Link>
)

interface FooterLinksProps {
  title: string;
  links: { label: string; path: string }[];
  colors: {
    quickLinksTitle: string;
    divider: string;
    link: string;
    linkHover: string;
  };
}

export default function FooterLinks({ 
  title, 
  links, 
  colors 
}: FooterLinksProps) {
  return (
    <div className="col-span-1 md:ml-8">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-lg font-semibold mb-5 relative inline-block"
        style={{ color: colors.quickLinksTitle }}
      >
        {title}
        <span 
          className="absolute -bottom-1 left-0 w-12 h-0.5 rounded-full"
          style={{ backgroundColor: colors.divider }}
        ></span>
      </motion.h3>
      <ul className="space-y-3">
        {links.map(({ label, path }, index) => (
          <motion.li 
            key={label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="transform hover:-translate-y-0.5 transition-transform duration-200"
          >
            <ShimmerLink 
              href={path}
              textColor={colors.link}
              hoverColor={colors.linkHover}
            >
              {label}
            </ShimmerLink>
          </motion.li>
        ))}
      </ul>
    </div>
  )
} 