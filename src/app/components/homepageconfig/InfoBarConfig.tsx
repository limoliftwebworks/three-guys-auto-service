import React, { useState } from 'react';
import ColorSelectorInput from '../ColorSelectorInput';

interface InfoBarItem {
  icon: string;
  text: string;
  link?: string;
}

interface InfoBarConfigProps {
  infoBar: {
    backgroundColor: string;
    textColor: string;
    items: InfoBarItem[];
  };
  onChange: (newConfig: any) => void;
}

const InfoBarConfig: React.FC<InfoBarConfigProps> = ({ infoBar, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (field: string, value: any) => {
    onChange({
      ...infoBar,
      [field]: value
    });
  };

  const handleItemChange = (index: number, field: keyof InfoBarItem, value: string) => {
    const updatedItems = [...infoBar.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    handleChange('items', updatedItems);
  };

  const handleAddItem = () => {
    handleChange('items', [
      ...infoBar.items,
      { icon: 'phone', text: 'New info item', link: '' }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...infoBar.items];
    updatedItems.splice(index, 1);
    handleChange('items', updatedItems);
  };

  // List of available icons
  const iconOptions = [
    { value: 'phone', label: 'Phone' },
    { value: 'email', label: 'Email' },
    { value: 'location', label: 'Location' },
    { value: 'clock', label: 'Clock' },
    { value: 'calendar', label: 'Calendar' },
    { value: 'info', label: 'Info' },
    { value: 'star', label: 'Star' }
  ];

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm mb-4 overflow-hidden">
      <div 
        className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium text-gray-900">Info Bar</h3>
        <span>{expanded ? '▼' : '►'}</span>
      </div>
      
      {expanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <ColorSelectorInput
                label="Background Color"
                value={infoBar.backgroundColor}
                onChange={(value) => handleChange('backgroundColor', value)}
              />
            </div>

            <div>
              <ColorSelectorInput
                label="Text Color"
                value={infoBar.textColor}
                onChange={(value) => handleChange('textColor', value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-900 mb-3">Info Items</h4>
            
            {infoBar.items.map((item, index) => (
              <div key={index} className="mb-4 border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-medium text-gray-700">Item #{index + 1}</h5>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon
                    </label>
                    <select
                      value={item.icon}
                      onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon.value} value={icon.value}>
                          {icon.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Text
                    </label>
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => handleItemChange(index, 'text', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link (optional)
                    </label>
                    <input
                      type="text"
                      value={item.link || ''}
                      onChange={(e) => handleItemChange(index, 'link', e.target.value)}
                      placeholder="e.g. tel:+123456789 or mailto:example@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={handleAddItem}
              className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Info Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBarConfig; 