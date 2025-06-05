import React, { useState } from 'react';
import ColorSelectorInput from '../ColorSelectorInput';

interface HeroSectionFormProps {
  heroSection: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    backgroundColor: string;
    textColor: string;
    buttonText: string;
    buttonUrl: string;
    buttonColor: string;
    overlayOpacity: number;
    height: string;
  };
  onChange: (newConfig: any) => void;
}

const HeroSectionForm: React.FC<HeroSectionFormProps> = ({ heroSection, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (field: string, value: any) => {
    onChange({
      ...heroSection,
      [field]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          handleChange('backgroundImage', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm mb-4 overflow-hidden">
      <div 
        className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium text-gray-900">Hero Section</h3>
        <span>{expanded ? '▼' : '►'}</span>
      </div>
      
      {expanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={heroSection.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <textarea
                value={heroSection.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background Image
              </label>
              <div className="flex flex-col gap-2">
                {heroSection.backgroundImage && (
                  <div className="relative w-full h-32 overflow-hidden rounded-md">
                    <img 
                      src={heroSection.backgroundImage} 
                      alt="Background" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            <div>
              <ColorSelectorInput
                label="Background Color"
                value={heroSection.backgroundColor}
                onChange={(value) => handleChange('backgroundColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Text Color"
                value={heroSection.textColor}
                onChange={(value) => handleChange('textColor', value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={heroSection.buttonText}
                onChange={(e) => handleChange('buttonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button URL
              </label>
              <input
                type="text"
                value={heroSection.buttonUrl}
                onChange={(e) => handleChange('buttonUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Button Color"
                value={heroSection.buttonColor}
                onChange={(value) => handleChange('buttonColor', value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Overlay Opacity ({heroSection.overlayOpacity}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={heroSection.overlayOpacity}
                onChange={(e) => handleChange('overlayOpacity', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height
              </label>
              <select
                value={heroSection.height}
                onChange={(e) => handleChange('height', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="fullscreen">Fullscreen</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSectionForm; 