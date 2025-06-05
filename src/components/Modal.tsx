"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  bgColor = "#ffffff",
  textColor = "#374151",
  borderColor = "#e5e7eb",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        ></div>

        {/* Modal */}
        <div
          className="relative w-full max-w-lg p-6 mx-auto rounded-lg shadow-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
            color: textColor,
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3
              id="modal-title"
              className="text-lg font-medium"
              style={{ color: textColor }}
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              className="hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2"
              aria-label="Close"
              style={{ color: textColor }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
