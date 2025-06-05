import React, { useState, useRef, useEffect } from 'react';
import * as Icons from './icons';

// Define icon categories for the dropdown
const iconCategories = [
  {
    name: "Business Icons",
    icons: [
      { name: "EmailIcon", component: Icons.EmailIcon },
      { name: "PhoneIcon", component: Icons.PhoneIcon },
      { name: "MessageIcon", component: Icons.MessageIcon },
      { name: "BriefcaseIcon", component: Icons.BriefcaseIcon },
      { name: "FileIcon", component: Icons.FileIcon },
      { name: "FolderIcon", component: Icons.FolderIcon },
      { name: "CalendarIcon", component: Icons.CalendarIcon },
      { name: "ChartIcon", component: Icons.ChartIcon },
      { name: "MoneyIcon", component: Icons.MoneyIcon },
      { name: "CreditCardIcon", component: Icons.CreditCardIcon },
      { name: "BankIcon", component: Icons.BankIcon },
      { name: "HandshakeIcon", component: Icons.HandshakeIcon },
      { name: "ClockIcon", component: Icons.ClockIcon },
      { name: "BuildingIcon", component: Icons.BuildingIcon },
      { name: "LocationIcon", component: Icons.LocationIcon },
      { name: "GlobeIcon", component: Icons.GlobeIcon }
    ]
  },
  {
    name: "Corporate Icons",
    icons: [
      { name: "CEOIcon", component: Icons.CEOIcon },
      { name: "CFOIcon", component: Icons.CFOIcon },
      { name: "CTOIcon", component: Icons.CTOIcon },
      { name: "HRIcon", component: Icons.HRIcon },
      { name: "MarketingIcon", component: Icons.MarketingIcon },
      { name: "SalesIcon", component: Icons.SalesIcon },
      { name: "CustomerServiceIcon", component: Icons.CustomerServiceIcon },
      { name: "ContractIcon", component: Icons.ContractIcon },
      { name: "KPIIcon", component: Icons.KPIIcon },
      { name: "TargetIcon", component: Icons.TargetIcon },
      { name: "LaunchIcon", component: Icons.LaunchIcon }
    ]
  },
  {
    name: "Basic Symbols",
    icons: [
      { name: "PlusIcon", component: Icons.PlusIcon },
      { name: "MinusIcon", component: Icons.MinusIcon },
      { name: "MultiplyIcon", component: Icons.MultiplyIcon },
      { name: "DivideIcon", component: Icons.DivideIcon },
      { name: "EqualsIcon", component: Icons.EqualsIcon },
      { name: "PercentIcon", component: Icons.PercentIcon },
      { name: "HashtagIcon", component: Icons.HashtagIcon },
      { name: "AtSymbolIcon", component: Icons.AtSymbolIcon },
      { name: "CheckmarkIcon", component: Icons.CheckmarkIcon },
      { name: "CrossIcon", component: Icons.CrossIcon }
    ]
  },
  {
    name: "Arrows & Direction",
    icons: [
      { name: "ArrowUpIcon", component: Icons.ArrowUpIcon },
      { name: "ArrowDownIcon", component: Icons.ArrowDownIcon },
      { name: "ArrowLeftIcon", component: Icons.ArrowLeftIcon },
      { name: "ArrowRightIcon", component: Icons.ArrowRightIcon },
      { name: "DoubleArrowRightIcon", component: Icons.DoubleArrowRightIcon },
      { name: "RefreshIcon", component: Icons.RefreshIcon },
      { name: "SyncIcon", component: Icons.SyncIcon }
    ]
  },
  {
    name: "UI Elements",
    icons: [
      { name: "SearchIcon", component: Icons.SearchIcon },
      { name: "GearIcon", component: Icons.GearIcon },
      { name: "LockIcon", component: Icons.LockIcon },
      { name: "UnlockIcon", component: Icons.UnlockIcon },
      { name: "MenuIcon", component: Icons.MenuIcon },
      { name: "MoreIcon", component: Icons.MoreIcon },
      { name: "HomeIcon", component: Icons.HomeIcon },
      { name: "InfoIcon", component: Icons.InfoIcon },
      { name: "WarningIcon", component: Icons.WarningIcon },
      { name: "AlertIcon", component: Icons.AlertIcon },
      { name: "QuestionIcon", component: Icons.QuestionIcon }
    ]
  },
  {
    name: "Red Icons",
    icons: [
      { name: "RedHeartIcon", component: Icons.RedHeartIcon },
      { name: "RedExclamationIcon", component: Icons.RedExclamationIcon },
      { name: "RedCrossIcon", component: Icons.RedCrossIcon },
      { name: "RedFlagIcon", component: Icons.RedFlagIcon },
      { name: "FireIcon", component: Icons.FireIcon }
    ]
  },
  {
    name: "Green Icons",
    icons: [
      { name: "GreenCircleIcon", component: Icons.GreenCircleIcon },
      { name: "CheckMarkIcon", component: Icons.CheckMarkIcon },
      { name: "RecycleIcon", component: Icons.RecycleIcon },
      { name: "LeafIcon", component: Icons.LeafIcon }
    ]
  },
  {
    name: "Blue Icons",
    icons: [
      { name: "BlueCircleIcon", component: Icons.BlueCircleIcon },
      { name: "BlueHeartIcon", component: Icons.BlueHeartIcon },
      { name: "WaterDropIcon", component: Icons.WaterDropIcon }
    ]
  },
  {
    name: "Yellow Icons",
    icons: [
      { name: "YellowCircleIcon", component: Icons.YellowCircleIcon },
      { name: "YellowTriangleIcon", component: Icons.YellowTriangleIcon },
      { name: "LightbulbYellowIcon", component: Icons.LightbulbYellowIcon },
      { name: "BellIcon", component: Icons.BellIcon }
    ]
  },
  {
    name: "Social Media Icons",
    icons: [
      // Facebook
      { name: "FacebookIcon", component: Icons.FacebookIcon },
      { name: "FacebookBlueIcon", component: Icons.FacebookBlueIcon },
      { name: "FacebookBlackIcon", component: Icons.FacebookBlackIcon },
      
      // Twitter/X
      { name: "TwitterIcon", component: Icons.TwitterIcon },
      { name: "TwitterBlueIcon", component: Icons.TwitterBlueIcon },
      { name: "TwitterBlackIcon", component: Icons.TwitterBlackIcon },
      { name: "XIcon", component: Icons.XIcon },
      
      // Instagram
      { name: "InstagramIcon", component: Icons.InstagramIcon },
      { name: "InstagramColorIcon", component: Icons.InstagramColorIcon },
      { name: "InstagramBlackIcon", component: Icons.InstagramBlackIcon },
      
      // LinkedIn
      { name: "LinkedInIcon", component: Icons.LinkedInIcon },
      { name: "LinkedInBlueIcon", component: Icons.LinkedInBlueIcon },
      { name: "LinkedInBlackIcon", component: Icons.LinkedInBlackIcon },
      
      // YouTube
      { name: "YouTubeIcon", component: Icons.YouTubeIcon },
      { name: "YouTubeRedIcon", component: Icons.YouTubeRedIcon },
      { name: "YouTubeBlackIcon", component: Icons.YouTubeBlackIcon },
      
      // Pinterest
      { name: "PinterestIcon", component: Icons.PinterestIcon },
      { name: "PinterestRedIcon", component: Icons.PinterestRedIcon },
      { name: "PinterestBlackIcon", component: Icons.PinterestBlackIcon }
    ]
  },
  {
    name: "Heroicons",
    icons: [
      { name: "HeroSolidHomeIcon", component: Icons.HeroSolidHomeIcon },
      { name: "HeroSolidUserIcon", component: Icons.HeroSolidUserIcon },
      { name: "HeroSolidDocumentIcon", component: Icons.HeroSolidDocumentIcon },
      { name: "HeroOutlineHomeIcon", component: Icons.HeroOutlineHomeIcon },
      { name: "HeroOutlineUserIcon", component: Icons.HeroOutlineUserIcon },
    ]
  },
  {
    name: "Material Design",
    icons: [
      { name: "MdHomeIcon", component: Icons.MdHomeIcon },
      { name: "MdAccountCircleIcon", component: Icons.MdAccountCircleIcon },
      { name: "MdShoppingCartIcon", component: Icons.MdShoppingCartIcon },
    ]
  }
];

interface IconSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const IconSelector: React.FC<IconSelectorProps> = ({ value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find the currently selected icon component
  const selectedIconName = value.replace(/<|>|\/|\s|className=".*?"|classname=".*?"/g, '');
  const allIcons = iconCategories.flatMap(category => category.icons);
  const selectedIcon = allIcons.find(icon => selectedIconName.includes(icon.name));

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle icon selection
  const handleIconSelect = (iconName: string) => {
    onChange(`<${iconName} className="w-full h-full" />`);
    setIsOpen(false);
    setSelectedCategory(null);
    setSearchTerm('');
  };

  // Filter icons based on search term
  const filteredIcons = searchTerm
    ? allIcons.filter(icon => icon.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected icon display / dropdown trigger */}
      <div 
        className="border rounded p-2 flex items-center justify-between cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {selectedIcon ? (
            <>
              <span className="text-2xl mr-2">
                <selectedIcon.component />
              </span>
              <span>{selectedIcon.name}</span>
            </>
          ) : (
            <span className="text-gray-500">Select an icon...</span>
          )}
        </div>
        <span className="text-gray-400">
          {isOpen ? <Icons.ArrowUpIcon /> : <Icons.ArrowDownIcon />}
        </span>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-80 overflow-y-auto">
          {/* Search bar */}
          <div className="p-2 border-b sticky top-0 bg-white">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Search results */}
          {searchTerm && (
            <div className="p-2">
              <div className="grid grid-cols-2 gap-2">
                {filteredIcons.map((icon) => (
                  <div
                    key={icon.name}
                    className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleIconSelect(icon.name)}
                  >
                    <div className="text-2xl mr-2">
                      <icon.component />
                    </div>
                    <span className="text-sm truncate">{icon.name}</span>
                  </div>
                ))}
              </div>
              {filteredIcons.length === 0 && (
                <div className="p-2 text-center text-gray-500">No icons found</div>
              )}
            </div>
          )}

          {/* Categories */}
          {!searchTerm && (
            <>
              {selectedCategory ? (
                <>
                  {/* Back button */}
                  <div 
                    className="p-2 border-b flex items-center cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedCategory(null)}
                  >
                    <Icons.ArrowLeftIcon />
                    <span className="ml-2">Back to categories</span>
                  </div>
                  
                  {/* Icon grid for selected category */}
                  <div className="p-2">
                    <h3 className="font-semibold mb-2">{selectedCategory}</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {iconCategories
                        .find(category => category.name === selectedCategory)?.icons
                        .map((icon) => (
                          <div
                            key={icon.name}
                            className="flex flex-col items-center p-2 rounded hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleIconSelect(icon.name)}
                          >
                            <div className="text-2xl mb-1">
                              <icon.component />
                            </div>
                            <span className="text-xs text-center truncate">{icon.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Category list */
                <div>
                  {iconCategories.map((category) => (
                    <div
                      key={category.name}
                      className="p-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <span>{category.name}</span>
                      <span className="text-gray-400">
                        <Icons.ArrowRightIcon />
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default IconSelector; 