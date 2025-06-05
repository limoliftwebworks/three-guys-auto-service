import React, { useState } from 'react';
import ColorSelectorInput from '../ColorSelectorInput';

interface ScheduleSectionProps {
  scheduleSection: {
    scheduleTitlePart1: string;
    scheduleTitlePart1Color: string;
    scheduleTitlePart2: string;
    scheduleTitlePart2Color: string;
    bookingTitle: string;
    bookingTitleColor: string;
    scheduleIconBgColor: string;
    scheduleIconColor: string;
    scheduleSectionTitle: string;
    scheduleSectionTitleColor: string;
    scheduleSectionBadgeColor: string;
    scheduleSectionBadgeTextColor: string;
    subtitle: string;
    backgroundColor: string;
    textColor: string;
    buttonText: string;
    buttonColor: string;
    imageUrl: string;
    bulletPoints: string[];
  };
  onChange: (newConfig: any) => void;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({ scheduleSection, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (field: string, value: any) => {
    onChange({
      ...scheduleSection,
      [field]: value
    });
  };

  const handleBulletPointChange = (index: number, value: string) => {
    const updatedPoints = [...scheduleSection.bulletPoints];
    updatedPoints[index] = value;
    handleChange('bulletPoints', updatedPoints);
  };

  const handleAddBulletPoint = () => {
    handleChange('bulletPoints', [
      ...scheduleSection.bulletPoints,
      'New benefit point'
    ]);
  };

  const handleRemoveBulletPoint = (index: number) => {
    const updatedPoints = [...scheduleSection.bulletPoints];
    updatedPoints.splice(index, 1);
    handleChange('bulletPoints', updatedPoints);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          handleChange('imageUrl', event.target.result as string);
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
        <h3 className="text-lg font-medium text-gray-900">Schedule Section</h3>
        <span>{expanded ? '▼' : '►'}</span>
      </div>
      
      {expanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Header Title
              </label>
              <input
                type="text"
                value={scheduleSection.scheduleSectionTitle}
                onChange={(e) => handleChange('scheduleSectionTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Section Header Text Color"
                value={scheduleSection.scheduleSectionTitleColor}
                onChange={(value) => handleChange('scheduleSectionTitleColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Section Badge Background"
                value={scheduleSection.scheduleSectionBadgeColor}
                onChange={(value) => handleChange('scheduleSectionBadgeColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Section Badge Text Color"
                value={scheduleSection.scheduleSectionBadgeTextColor}
                onChange={(value) => handleChange('scheduleSectionBadgeTextColor', value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title Part 1
              </label>
              <input
                type="text"
                value={scheduleSection.scheduleTitlePart1}
                onChange={(e) => handleChange('scheduleTitlePart1', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Title Part 1 Color"
                value={scheduleSection.scheduleTitlePart1Color}
                onChange={(value) => handleChange('scheduleTitlePart1Color', value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title Part 2
              </label>
              <input
                type="text"
                value={scheduleSection.scheduleTitlePart2}
                onChange={(e) => handleChange('scheduleTitlePart2', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Title Part 2 Color"
                value={scheduleSection.scheduleTitlePart2Color}
                onChange={(value) => handleChange('scheduleTitlePart2Color', value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Booking Title
              </label>
              <input
                type="text"
                value={scheduleSection.bookingTitle}
                onChange={(e) => handleChange('bookingTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Booking Title Color"
                value={scheduleSection.bookingTitleColor}
                onChange={(value) => handleChange('bookingTitleColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Icon Background Color"
                value={scheduleSection.scheduleIconBgColor}
                onChange={(value) => handleChange('scheduleIconBgColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Icon Color"
                value={scheduleSection.scheduleIconColor}
                onChange={(value) => handleChange('scheduleIconColor', value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={scheduleSection.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Background Color"
                value={scheduleSection.backgroundColor}
                onChange={(value) => handleChange('backgroundColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Text Color"
                value={scheduleSection.textColor}
                onChange={(value) => handleChange('textColor', value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={scheduleSection.buttonText}
                onChange={(e) => handleChange('buttonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Button Color"
                value={scheduleSection.buttonColor}
                onChange={(value) => handleChange('buttonColor', value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <div className="flex flex-col gap-2">
                {scheduleSection.imageUrl && (
                  <div className="relative w-full h-48 overflow-hidden rounded-md">
                    <img 
                      src={scheduleSection.imageUrl} 
                      alt="Schedule Section" 
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
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-md font-medium text-gray-900">Bullet Points</h4>
              <button
                type="button"
                onClick={handleAddBulletPoint}
                className="px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Point
              </button>
            </div>
            
            {scheduleSection.bulletPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => handleBulletPointChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter bullet point text"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveBulletPoint(index)}
                  className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleSection; 