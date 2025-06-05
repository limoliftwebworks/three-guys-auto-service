import React from 'react';
import * as Icons from './index';

interface IconDemoProps {
  className?: string;
}

// Helper function to filter icons by their name pattern
const filterIconsByCategory = (iconEntries: [string, React.FC<any>][], categoryPattern: string) => {
  return iconEntries.filter(([name]) => name.includes(categoryPattern));
};

export const IconsDemo: React.FC<IconDemoProps> = ({ className = '' }) => {
  // Get all icon components from the imported Icons object
  const iconEntries = Object.entries(Icons);
  
  // Categorize icons
  const businessIcons = iconEntries.filter(([name]) => 
    !name.includes('Monochrome') && 
    !name.includes('Colored') && 
    !name.includes('Red') && 
    !name.includes('Blue') && 
    !name.includes('Green') && 
    !name.includes('Yellow') && 
    !name.includes('Purple') && 
    !name.includes('Orange') && 
    !name.includes('Brown') && 
    !name.includes('Black') && 
    !name.includes('White') &&
    !name.includes('Corporate') &&
    !name.includes('CEO') &&
    !name.includes('Department')
  );
  
  // Color-based icons
  const redIcons = filterIconsByCategory(iconEntries, 'Red');
  const blueIcons = filterIconsByCategory(iconEntries, 'Blue');
  const greenIcons = filterIconsByCategory(iconEntries, 'Green');
  const yellowIcons = filterIconsByCategory(iconEntries, 'Yellow');
  const purpleIcons = filterIconsByCategory(iconEntries, 'Purple');
  const orangeIcons = filterIconsByCategory(iconEntries, 'Orange');
  const brownIcons = filterIconsByCategory(iconEntries, 'Brown');
  const blackWhiteIcons = [...filterIconsByCategory(iconEntries, 'Black'), ...filterIconsByCategory(iconEntries, 'White')];
  
  // Monochrome icons (basic symbols, arrows, etc.)
  const monochromeIcons = iconEntries.filter(([name]) => 
    name.includes('Symbol') || 
    name.includes('Arrow') || 
    name.includes('Circle') ||
    name.includes('Square') ||
    name.includes('Triangle') ||
    name.includes('Plus') ||
    name.includes('Minus') ||
    name.includes('Multiply') ||
    name.includes('Divide')
  );
  
  // Corporate icons
  const corporateIcons = iconEntries.filter(([name]) => 
    name.includes('Corporate') || 
    name.includes('CEO') || 
    name.includes('CFO') ||
    name.includes('Department') ||
    name.includes('HR') ||
    name.includes('Manager') ||
    name.includes('Team') ||
    name.includes('Office')
  );

  // Create a mapping of categories to their icon arrays
  const categories = [
    { name: "Business Icons", icons: businessIcons },
    { name: "Corporate Icons", icons: corporateIcons },
    { name: "Monochrome Icons", icons: monochromeIcons },
    { name: "Red Icons", icons: redIcons },
    { name: "Blue Icons", icons: blueIcons },
    { name: "Green Icons", icons: greenIcons },
    { name: "Yellow Icons", icons: yellowIcons },
    { name: "Purple Icons", icons: purpleIcons },
    { name: "Orange Icons", icons: orangeIcons },
    { name: "Brown Icons", icons: brownIcons },
    { name: "Black & White Icons", icons: blackWhiteIcons },
  ];

  return (
    <div className={`${className} p-6`}>
      <h1 className="text-2xl font-bold mb-6">Business Icons Library</h1>
      <p className="mb-6">
        These icons can be used directly in your components. Each icon is a React component that renders
        as a text element, making it easy to style with CSS.
      </p>
      
      {categories.map(category => (
        <div key={category.name} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {category.icons.map(([name, IconComponent]) => (
              <div key={name} className="border rounded-md p-4 flex items-center">
                <div className="mr-4 text-3xl">
                  <IconComponent />
                </div>
                <div>
                  <p className="font-medium">{name}</p>
                  <code className="text-sm text-gray-600">{`<${name} />`}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Usage Examples</h2>
        <div className="mb-4">
          <p className="mb-2 font-medium">Basic Usage</p>
          <code className="block bg-white p-2 rounded">
            {`import { EmailIcon, PhoneIcon } from 'src/components/icons';\n\n<EmailIcon />\n<PhoneIcon />`}
          </code>
        </div>
        <div className="mb-4">
          <p className="mb-2 font-medium">With Custom Styling</p>
          <code className="block bg-white p-2 rounded">
            {`<EmailIcon className="text-blue-500 text-2xl" />`}
          </code>
        </div>
        <div>
          <p className="mb-2 font-medium">With Tailwind Hover Effects</p>
          <code className="block bg-white p-2 rounded">
            {`<EmailIcon className="text-gray-600 hover:text-blue-500 transition-colors cursor-pointer" />`}
          </code>
        </div>
      </div>
    </div>
  );
};

export default IconsDemo; 