import React, { useState } from 'react';
import ColorSelectorInput from '../ColorSelectorInput';

interface ServiceDetail {
  title: string;
  description: string;
  icon: string;
}

interface ServicePageConfigProps {
  servicePage: {
    pageTitle: string;
    pageDescription: string;
    headerImage: string;
    backgroundColor: string;
    textColor: string;
    servicesTitle: string;
    servicesSubtitle: string;
    serviceDetails: ServiceDetail[];
    ctaTitle: string;
    ctaText: string;
    ctaButtonText: string;
    ctaButtonColor: string;
    heroBadgeIconColor: string;
    // Hero background element colors
    heroBlurredCircle1Color: string;
    heroBlurredCircle2Color: string;
    heroPatternColor: string;
    heroLightBeam1Color: string;
    heroLightBeam2Color: string;
    // Service categories gradient fields
    serviceCategoriesBgColorFrom: string;
    serviceCategoriesBgColorTo: string;
    serviceCategoryCardGradientFrom: string;
    serviceCategoryCardGradientTo: string;
  };
  onChange: (newConfig: any) => void;
}

const ServicePageConfig: React.FC<ServicePageConfigProps> = ({ servicePage, onChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeDetailIndex, setActiveDetailIndex] = useState<number | null>(null);

  const handleChange = (field: string, value: any) => {
    onChange({
      ...servicePage,
      [field]: value
    });
  };

  const handleDetailChange = (index: number, field: keyof ServiceDetail, value: string) => {
    const updatedDetails = [...servicePage.serviceDetails];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    handleChange('serviceDetails', updatedDetails);
  };

  const handleAddDetail = () => {
    handleChange('serviceDetails', [
      ...servicePage.serviceDetails,
      { title: 'New Service Detail', description: 'Description of the service detail', icon: 'star' }
    ]);
    // Open the new item for editing
    setActiveDetailIndex(servicePage.serviceDetails.length);
  };

  const handleRemoveDetail = (index: number) => {
    const updatedDetails = [...servicePage.serviceDetails];
    updatedDetails.splice(index, 1);
    handleChange('serviceDetails', updatedDetails);
    // Reset active item if the removed one was active
    if (activeDetailIndex === index) {
      setActiveDetailIndex(null);
    } else if (activeDetailIndex !== null && activeDetailIndex > index) {
      // Adjust active index if an item before it was removed
      setActiveDetailIndex(activeDetailIndex - 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          handleChange('headerImage', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // List of available icons
  const iconOptions = [
    { value: 'star', label: 'Star' },
    { value: 'check', label: 'Check' },
    { value: 'wrench', label: 'Wrench' },
    { value: 'truck', label: 'Truck' },
    { value: 'shield', label: 'Shield' },
    { value: 'clock', label: 'Clock' },
    { value: 'heart', label: 'Heart' },
    { value: 'cog', label: 'Cog' }
  ];

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm mb-4 overflow-hidden">
      <div 
        className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium text-gray-900">Service Page Configuration</h3>
        <span>{expanded ? '▼' : '►'}</span>
      </div>
      
      {expanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Page Title
              </label>
              <input
                type="text"
                value={servicePage.pageTitle}
                onChange={(e) => handleChange('pageTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Page Description
              </label>
              <textarea
                value={servicePage.pageDescription}
                onChange={(e) => handleChange('pageDescription', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Background Color"
                value={servicePage.backgroundColor}
                onChange={(value) => handleChange('backgroundColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Text Color"
                value={servicePage.textColor}
                onChange={(value) => handleChange('textColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Hero Badge Icon Color"
                value={servicePage.heroBadgeIconColor}
                onChange={(value) => handleChange('heroBadgeIconColor', value)}
              />
            </div>

            <div className="md:col-span-2">
              <h4 className="font-medium text-gray-800 mb-3 border-b pb-2">Hero Background Elements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <ColorSelectorInput
                    label="Left Blurred Circle Color"
                    value={servicePage.heroBlurredCircle1Color}
                    onChange={(value) => handleChange('heroBlurredCircle1Color', value)}
                  />
                </div>
                <div>
                  <ColorSelectorInput
                    label="Right Blurred Circle Color"
                    value={servicePage.heroBlurredCircle2Color}
                    onChange={(value) => handleChange('heroBlurredCircle2Color', value)}
                  />
                </div>
                <div>
                  <ColorSelectorInput
                    label="Pattern Dot Color"
                    value={servicePage.heroPatternColor}
                    onChange={(value) => handleChange('heroPatternColor', value)}
                  />
                </div>
                <div>
                  <ColorSelectorInput
                    label="Top Light Beam Color"
                    value={servicePage.heroLightBeam1Color}
                    onChange={(value) => handleChange('heroLightBeam1Color', value)}
                  />
                </div>
                <div>
                  <ColorSelectorInput
                    label="Bottom Light Beam Color"
                    value={servicePage.heroLightBeam2Color}
                    onChange={(value) => handleChange('heroLightBeam2Color', value)}
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-medium text-gray-800 mb-3 border-b pb-2">Service Categories Section Gradients</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <ColorSelectorInput
                    label="Service Categories Gradient From"
                    value={servicePage.serviceCategoriesBgColorFrom}
                    onChange={(value) => handleChange('serviceCategoriesBgColorFrom', value)}
                  />
                </div>
                <div>
                  <ColorSelectorInput
                    label="Service Categories Gradient To"
                    value={servicePage.serviceCategoriesBgColorTo}
                    onChange={(value) => handleChange('serviceCategoriesBgColorTo', value)}
                  />
                </div>
                <div>
                  <ColorSelectorInput
                    label="Service Card Gradient From"
                    value={servicePage.serviceCategoryCardGradientFrom}
                    onChange={(value) => handleChange('serviceCategoryCardGradientFrom', value)}
                  />
                </div>
                <div>
                  <ColorSelectorInput
                    label="Service Card Gradient To"
                    value={servicePage.serviceCategoryCardGradientTo}
                    onChange={(value) => handleChange('serviceCategoryCardGradientTo', value)}
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Header Image
              </label>
              <div className="flex flex-col gap-2">
                {servicePage.headerImage && (
                  <div className="relative w-full h-48 overflow-hidden rounded-md">
                    <img 
                      src={servicePage.headerImage} 
                      alt="Header" 
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Services Section Title
              </label>
              <input
                type="text"
                value={servicePage.servicesTitle}
                onChange={(e) => handleChange('servicesTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Services Section Subtitle
              </label>
              <input
                type="text"
                value={servicePage.servicesSubtitle}
                onChange={(e) => handleChange('servicesSubtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Service Details Section */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-md font-medium text-gray-900">Service Details</h4>
              <button
                type="button"
                onClick={handleAddDetail}
                className="px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Service Detail
              </button>
            </div>
            
            {servicePage.serviceDetails.map((detail, index) => (
              <div key={index} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="p-3 bg-gray-50 flex justify-between items-center cursor-pointer"
                  onClick={() => setActiveDetailIndex(activeDetailIndex === index ? null : index)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      {detail.title || `Detail #${index + 1}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveDetail(index);
                      }}
                      className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                    <span>{activeDetailIndex === index ? '▼' : '►'}</span>
                  </div>
                </div>
                
                {activeDetailIndex === index && (
                  <div className="p-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={detail.title}
                          onChange={(e) => handleDetailChange(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Icon
                        </label>
                        <select
                          value={detail.icon}
                          onChange={(e) => handleDetailChange(index, 'icon', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          {iconOptions.map((icon) => (
                            <option key={icon.value} value={icon.value}>
                              {icon.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={detail.description}
                          onChange={(e) => handleDetailChange(index, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h4 className="text-md font-medium text-gray-900 mb-3">Call to Action Section</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CTA Title
                </label>
                <input
                  type="text"
                  value={servicePage.ctaTitle}
                  onChange={(e) => handleChange('ctaTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CTA Text
                </label>
                <textarea
                  value={servicePage.ctaText}
                  onChange={(e) => handleChange('ctaText', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={servicePage.ctaButtonText}
                  onChange={(e) => handleChange('ctaButtonText', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <ColorSelectorInput
                  label="Button Color"
                  value={servicePage.ctaButtonColor}
                  onChange={(value) => handleChange('ctaButtonColor', value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePageConfig; 