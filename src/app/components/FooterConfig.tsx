import React, { useState } from 'react';

interface FooterConfigProps {
  footerConfig: {
    backgroundColor: string;
    textColor: string;
    copyrightText: string;
    links: { text: string; url: string }[];
    socialLinks: { platform: string; url: string }[];
  };
  onChange: (newConfig: any) => void;
}

const FooterConfig: React.FC<FooterConfigProps> = ({ footerConfig, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (field: string, value: any) => {
    onChange({
      ...footerConfig,
      [field]: value
    });
  };

  const handleLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...footerConfig.links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    handleChange('links', updatedLinks);
  };

  const handleSocialLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...footerConfig.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    handleChange('socialLinks', updatedLinks);
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm mb-4 overflow-hidden">
      <div 
        className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium text-gray-900">Footer Configuration</h3>
        <span>{expanded ? '▼' : '►'}</span>
      </div>
      
      {expanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background Color
              </label>
              <input
                type="color"
                value={footerConfig.backgroundColor}
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
                value={footerConfig.textColor}
                onChange={(e) => handleChange('textColor', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Copyright Text
              </label>
              <input
                type="text"
                value={footerConfig.copyrightText}
                onChange={(e) => handleChange('copyrightText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Footer Links
              </label>
              {footerConfig.links.map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={link.text}
                    onChange={(e) => handleLinkChange(index, 'text', e.target.value)}
                    placeholder="Link Text"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                    placeholder="URL"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleChange('links', [...footerConfig.links, { text: '', url: '' }])}
                className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Link
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Social Links
              </label>
              {footerConfig.socialLinks.map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <select
                    value={link.platform}
                    onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Platform</option>
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="youtube">YouTube</option>
                  </select>
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                    placeholder="URL"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleChange('socialLinks', [...footerConfig.socialLinks, { platform: '', url: '' }])}
                className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Social Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterConfig; 