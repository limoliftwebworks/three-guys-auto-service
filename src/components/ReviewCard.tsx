"use client";

import React, { useState, useRef } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Database } from "../lib/database.types";
import { motion } from "framer-motion";

type Review = Database["public"]["Tables"]["reviews"]["Row"];

interface ReviewCardProps {
  review: Review;
  config: any; // Added config prop
}

const getInitial = (name: string) => {
  return name.charAt(0).toUpperCase();
};

const getBackgroundColor = (initial: string, colors: string[]) => {
  // Generate a consistent color based on the initial using the provided colors
  const index = initial.charCodeAt(0) % colors.length;
  return colors[index];
};

export default function ReviewCard({ review, config }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const initial = getInitial(review.author_name);
  const bgColor = getBackgroundColor(initial, config.reviewAvatarColors);

  // Determine shadow based on hover state
  const getShadow = () => {
    if (isHovered) {
      switch (config.reviewCardHoverShadow) {
        case "sm":
          return "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
        case "md":
          return "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
        case "lg":
          return "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
        case "xl":
          return "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
        case "2xl":
          return "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
        default:
          return "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
      }
    } else {
      return "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-lg p-6 transition-all duration-200"
      style={{
        backgroundColor: config.reviewCardBgColor,
        borderColor: config.reviewCardBorderColor,
        boxShadow: getShadow(),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={{
          background: isHovered
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${config.reviewCardGradientColor}10, ${config.reviewCardGradientColor}05 40%, transparent 80%)`
            : "none",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Content container */}
      <div className="relative z-10">
        {/* Rating */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className="h-5 w-5"
                style={{
                  color:
                    i < review.rating
                      ? config.reviewCardStarColor
                      : config.reviewCardStarEmptyColor,
                }}
              />
            ))}
          </div>
          <span
            className="text-sm"
            style={{ color: config.reviewCardSourceColor }}
          >
            {review.relative_time_description}
          </span>
        </div>

        {/* Review Text */}
        <div className="mb-4">
          <p style={{ color: config.reviewCardTextColor }}>
            {isExpanded ? review.text : truncateText(review.text)}
          </p>
          {review.text.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm mt-2 hover:underline"
              style={{
                color: config.reviewCardShowMoreColor,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color =
                  config.reviewCardShowMoreHoverColor;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = config.reviewCardShowMoreColor;
              }}
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
            style={{
              backgroundColor: bgColor,
              color: config.reviewAvatarTextColor || "#ffffff",
            }}
          >
            {initial}
          </div>
          <div>
            <p
              className="font-medium"
              style={{ color: config.reviewCardAuthorNameColor }}
            >
              {review.author_name}
            </p>
            <p
              className="text-sm"
              style={{ color: config.reviewCardSourceColor }}
            >
              Google Review
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
