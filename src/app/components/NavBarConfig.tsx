import React, { useState } from 'react';

interface NavBarConfigProps {
  navBarConfig: {
    backgroundColor: string;
    textColor: string;
    logo: string;
    siteTitle: string;
    siteTitleGradientFrom: string;
    siteTitleGradientTo: string;
    navLinks: { path: string; label: string }[];
    scheduleButtonText: string;
    scheduleButtonColor: string;
    activeTabColor: string;
  };
  onChange: (newConfig: any) => void;
}

const NavBarConfig: React.FC<NavBarConfigProps> = ({ navBarConfig, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (field: string, value: any) => {
    onChange({
      ...navBarConfig,
      [field]: value
    });
  };

  const handleNavLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...navBarConfig.navLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    handleChange('navLinks', updatedLinks);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          handleChange('logo', event.target.result as string);
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
        <h3 className="text-lg font-medium text-gray-900">Navigation Bar Configuration</h3>
        <span>{expanded ? '▼' : '►'}</span>
      </div>
      
      {expanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background Color
              </label>
              <input
                type="color"
                value={navBarConfig.backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text Color
              </label>
              <input
                type="color"
                value={navBarConfig.textColor}
                onChange={(e) => handleChange('textColor', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Title
              </label>
              <input
                type="text"
                value={navBarConfig.siteTitle}
                onChange={(e) => handleChange('siteTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo
              </label>
              <div className="flex items-center gap-4">
                {navBarConfig.logo && (
                  <img src={navBarConfig.logo} alt="Logo" className="h-12 w-auto" />
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
                Title Gradient From
              </label>
              <input
                type="color"
                value={navBarConfig.siteTitleGradientFrom}
                onChange={(e) => handleChange('siteTitleGradientFrom', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title Gradient To
              </label>
              <input
                type="color"
                value={navBarConfig.siteTitleGradientTo}
                onChange={(e) => handleChange('siteTitleGradientTo', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Schedule Button Text
              </label>
              <input
                type="text"
                value={navBarConfig.scheduleButtonText}
                onChange={(e) => handleChange('scheduleButtonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Schedule Button Color
              </label>
              <input
                type="color"
                value={navBarConfig.scheduleButtonColor}
                onChange={(e) => handleChange('scheduleButtonColor', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Active Tab Color
              </label>
              <input
                type="color"
                value={navBarConfig.activeTabColor}
                onChange={(e) => handleChange('activeTabColor', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Navigation Links
            </label>
            {navBarConfig.navLinks.map((link, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => handleNavLinkChange(index, 'label', e.target.value)}
                  placeholder="Label"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="text"
                  value={link.path}
                  onChange={(e) => handleNavLinkChange(index, 'path', e.target.value)}
                  placeholder="Path"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newLinks = [...navBarConfig.navLinks];
                    newLinks.splice(index, 1);
                    handleChange('navLinks', newLinks);
                  }}
                  className="px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleChange('navLinks', [...navBarConfig.navLinks, { path: '', label: '' }])}
              className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBarConfig; 