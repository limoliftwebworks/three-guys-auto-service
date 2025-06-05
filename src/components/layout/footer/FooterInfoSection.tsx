"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ClockIcon, UserGroupIcon } from "@heroicons/react/24/outline";

interface Hours {
  weekday?: string;
  weekend?: string;
}

interface FooterInfoSectionProps {
  hours: Hours;
  showJoinTeamButton: boolean;
  joinTeamText: string;
  joinTeamLink: string;
  colors: {
    infoTitle: string;
    divider: string;
    socialIcon: string;
    hoursCardBg: string;
    hoursCardText: string;
    hoursCardValue: string;
    joinButtonBg: string;
    joinButtonText: string;
    joinButtonHoverBg: string;
  };
}

export default function FooterInfoSection({
  hours,
  showJoinTeamButton,
  joinTeamText,
  joinTeamLink,
  colors,
}: FooterInfoSectionProps) {
  return (
    <div className="col-span-1">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-lg font-semibold mb-5 relative inline-block"
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
            className="p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
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
              className="flex items-center justify-center space-x-2 p-4 rounded-lg transition-all duration-300 group shadow-sm hover:shadow-md"
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
              <span className="font-medium text-[15px]" data-join-team-text>
                {joinTeamText || "Join the Team"}
              </span>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
