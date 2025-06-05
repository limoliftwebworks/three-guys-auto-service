"use client";

import React from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: string;
  type?: "text" | "email" | "tel" | "url";
  description?: string;
  multiline?: boolean;
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  icon,
  type = "text",
  description,
  multiline = false,
}: TextInputProps) {
  const inputClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </label>

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${inputClasses} min-h-[100px] resize-vertical`}
          rows={4}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}

      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
  );
}
