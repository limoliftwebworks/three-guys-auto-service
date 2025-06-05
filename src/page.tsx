import React, { useEffect, useState } from 'react';

const Page: React.FC = () => {
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const [localThemeColor, setLocalThemeColor] = useState('');

  useEffect(() => {
    setIsClientLoaded(true);
    
    // Disable all dialogs permanently
    if (typeof window !== 'undefined') {
      // Try to load our dialog prevention script
      try {
        const script = document.createElement('script');
        script.src = '/dialog-prevention.js';
        script.async = true;
        document.head.appendChild(script);
      } catch (err) {
        console.error('Error loading dialog prevention:', err);
      }
    }
    
    // Once client-side code is running, try to get the theme color from localStorage
    if (typeof window !== 'undefined') {
      const savedThemeColor = localStorage.getItem('themeColor');
      if (savedThemeColor) {
        setLocalThemeColor(savedThemeColor);
      }
    }
    
  }, []);

  return (
    <div>
      {/* Page content */}
    </div>
  );
};

export default Page; 