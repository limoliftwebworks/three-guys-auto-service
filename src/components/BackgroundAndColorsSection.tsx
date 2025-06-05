import React from "react";
import IconConfigField from "./IconConfigField";
import { formatImagePath, getImageFilename } from "@/utils/pathUtils";
import ColorSelectorInput from "@/app/components/ColorSelectorInput";

interface BackgroundAndColorsSectionProps {
  backgroundImage: string;
  icon: string;
  iconColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  onBackgroundImageChange: (value: string) => void;
  onIconChange: (value: string) => void;
  onIconColorChange: (value: string) => void;
  onBackgroundColorChange: (value: string) => void;
  onTextColorChange: (value: string) => void;
  onBorderColorChange: (value: string) => void;
  expanded?: boolean;
  onToggleExpand?: () => void;
  title?: string;
}

const BackgroundAndColorsSection: React.FC<BackgroundAndColorsSectionProps> = ({
  backgroundImage,
  icon,
  iconColor,
  backgroundColor,
  textColor,
  borderColor,
  onBackgroundImageChange,
  onIconChange,
  onIconColorChange,
  onBackgroundColorChange,
  onTextColorChange,
  onBorderColorChange,
  expanded = true,
  onToggleExpand,
  title = "Background & Colors",
}) => {
  // Handler for background image change with path formatting
  const handleBackgroundImageChange = (value: string) => {
    // Format the path correctly
    const cleanValue = value.trim();
    onBackgroundImageChange(formatImagePath(cleanValue));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <button
        className="flex items-center w-full text-left gap-2 mb-2 focus:outline-none"
        onClick={onToggleExpand}
        type="button"
      >
        <h2 className="text-xl font-semibold">
          <span className="mr-2">{title}</span>
        </h2>
        {onToggleExpand && (
          <span
            className={`ml-2 text-blue-500 transform transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          >
            {expanded ? "▲" : "▼"}
          </span>
        )}
      </button>

      {expanded && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Background Image
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={getImageFilename(backgroundImage)}
              onChange={(e) => handleBackgroundImageChange(e.target.value)}
              placeholder="back1.png"
            />
            <span className="text-xs text-gray-500 mt-1 block">
              Just enter the filename, not the full path
            </span>
          </div>

          {/* Icon selector field */}
          <IconConfigField label="Icon" value={icon} onChange={onIconChange} />

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Icon Color
              </label>
              <ColorSelectorInput
                label="Icon Color"
                value={iconColor}
                onChange={onIconColorChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Background Color
              </label>
              <ColorSelectorInput
                label="Background Color"
                value={backgroundColor}
                onChange={onBackgroundColorChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Text Color
              </label>
              <ColorSelectorInput
                label="Text Color"
                value={textColor}
                onChange={onTextColorChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Border Color
              </label>
              <ColorSelectorInput
                label="Border Color"
                value={borderColor}
                onChange={onBorderColorChange}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BackgroundAndColorsSection;
