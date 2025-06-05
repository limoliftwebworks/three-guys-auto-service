import React, { useState } from 'react';
import ColorSelectorInput from '../ColorSelectorInput';

interface ServicesSectionProps {
  servicesSection: {
    // Section Header
    servicesBadgeText: string;
    servicesBadgeColor: string;
    servicesBadgeTextColor: string;
    servicesTitle: string;
    servicesHighlightText: string;
    servicesTitleColor: string;
    servicesHighlightColor: string;
    servicesHighlightUnderlineColor: string;
    
    // Services Description
    servicesDescription: string;
    servicesDescriptionColor: string;
    
    // Services Button
    servicesButtonText: string;
    servicesButtonUrl: string;
    servicesButtonStartColor: string;
    servicesButtonEndColor: string;
    servicesButtonTextColor: string;
    
    // Services Section Background
    servicesBgColor: string;
    
    // Service Reel Configuration
    serviceReelCardBgColor: string;
    serviceReelCardBorderColor: string;
    serviceReelCardHoverShadowColor: string;
    serviceReelIconColor: string;
    serviceReelTitleColor: string;
    serviceReelTitleHoverColor: string;
    serviceReelDescriptionColor: string;
    serviceReelDescriptionHoverColor: string;
    serviceReelMobileIndicatorColor: string;
    serviceReelMobileInactiveColor: string;
    serviceReelGradientFromColor: string;
    serviceReelGradientToColor: string;
  };
  onChange: (newConfig: any) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ servicesSection, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (field: string, value: any) => {
    onChange({
      ...servicesSection,
      [field]: value
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm mb-4 overflow-hidden">
      <div 
        className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium text-gray-900">Services Section</h3>
        <span>{expanded ? '▼' : '►'}</span>
      </div>
      
      {expanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <h3 className="text-lg font-medium text-gray-900 col-span-2 mb-2">Section Header</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Badge Text
              </label>
              <input
                type="text"
                value={servicesSection.servicesBadgeText}
                onChange={(e) => handleChange('servicesBadgeText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Badge Background Color"
                value={servicesSection.servicesBadgeColor}
                onChange={(value) => handleChange('servicesBadgeColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Badge Text Color"
                value={servicesSection.servicesBadgeTextColor}
                onChange={(value) => handleChange('servicesBadgeTextColor', value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={servicesSection.servicesTitle}
                onChange={(e) => handleChange('servicesTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Title Color"
                value={servicesSection.servicesTitleColor}
                onChange={(value) => handleChange('servicesTitleColor', value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Highlight Text
              </label>
              <input
                type="text"
                value={servicesSection.servicesHighlightText}
                onChange={(e) => handleChange('servicesHighlightText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Highlight Color"
                value={servicesSection.servicesHighlightColor}
                onChange={(value) => handleChange('servicesHighlightColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Highlight Underline Color"
                value={servicesSection.servicesHighlightUnderlineColor}
                onChange={(value) => handleChange('servicesHighlightUnderlineColor', value)}
              />
            </div>

            <h3 className="text-lg font-medium text-gray-900 col-span-2 mt-4 mb-2">Service Cards</h3>

            <div>
              <ColorSelectorInput
                label="Card Background Color"
                value={servicesSection.serviceReelCardBgColor}
                onChange={(value) => handleChange('serviceReelCardBgColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Card Border Color"
                value={servicesSection.serviceReelCardBorderColor}
                onChange={(value) => handleChange('serviceReelCardBorderColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Card Shadow Color"
                value={servicesSection.serviceReelCardHoverShadowColor}
                onChange={(value) => handleChange('serviceReelCardHoverShadowColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Icon Color"
                value={servicesSection.serviceReelIconColor}
                onChange={(value) => handleChange('serviceReelIconColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Title Color"
                value={servicesSection.serviceReelTitleColor}
                onChange={(value) => handleChange('serviceReelTitleColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Title Hover Color"
                value={servicesSection.serviceReelTitleHoverColor}
                onChange={(value) => handleChange('serviceReelTitleHoverColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Description Color"
                value={servicesSection.serviceReelDescriptionColor}
                onChange={(value) => handleChange('serviceReelDescriptionColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Description Hover Color"
                value={servicesSection.serviceReelDescriptionHoverColor}
                onChange={(value) => handleChange('serviceReelDescriptionHoverColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Mobile Indicator Color"
                value={servicesSection.serviceReelMobileIndicatorColor}
                onChange={(value) => handleChange('serviceReelMobileIndicatorColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Mobile Inactive Color"
                value={servicesSection.serviceReelMobileInactiveColor}
                onChange={(value) => handleChange('serviceReelMobileInactiveColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Left Gradient Color"
                value={servicesSection.serviceReelGradientFromColor}
                onChange={(value) => handleChange('serviceReelGradientFromColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Right Gradient Color"
                value={servicesSection.serviceReelGradientToColor}
                onChange={(value) => handleChange('serviceReelGradientToColor', value)}
              />
            </div>

            <h3 className="text-lg font-medium text-gray-900 col-span-2 mt-4 mb-2">Section Content</h3>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={servicesSection.servicesDescription}
                onChange={(e) => handleChange('servicesDescription', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Description Color"
                value={servicesSection.servicesDescriptionColor}
                onChange={(value) => handleChange('servicesDescriptionColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Section Background"
                value={servicesSection.servicesBgColor}
                onChange={(value) => handleChange('servicesBgColor', value)}
              />
            </div>

            <h3 className="text-lg font-medium text-gray-900 col-span-2 mt-4 mb-2">Button</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={servicesSection.servicesButtonText}
                onChange={(e) => handleChange('servicesButtonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button URL
              </label>
              <input
                type="text"
                value={servicesSection.servicesButtonUrl}
                onChange={(e) => handleChange('servicesButtonUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Button Start Color"
                value={servicesSection.servicesButtonStartColor}
                onChange={(value) => handleChange('servicesButtonStartColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Button End Color"
                value={servicesSection.servicesButtonEndColor}
                onChange={(value) => handleChange('servicesButtonEndColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Button Text Color"
                value={servicesSection.servicesButtonTextColor}
                onChange={(value) => handleChange('servicesButtonTextColor', value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesSection; 