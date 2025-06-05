'use client';
import React, { useEffect, useState } from 'react';
import Home from '../page';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { StarIcon, ClockIcon, ArrowRightIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import ServiceReel from '@/components/ServiceReel';
import Image from 'next/image';
import { ConfigProvider } from '@/context/ConfigContext';
import localConfig from '@/config/localConfig';
import './preview.css';

// Helper to convert hex to rgba with alpha
function hexToRgba(hex: string, alpha: number) {
  let c = hex?.replace('#', '') || '000000';
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

export default function PreviewPage() {
  // State to hold the configuration
  const [config, setConfig] = useState(localConfig);
  // Add a force update mechanism
  const [forceUpdate, setForceUpdate] = useState(0);
  // Track whether the component has mounted on the client
  const [isMounted, setIsMounted] = useState(false);
  
  // Force component to re-render
  const triggerRerender = () => {
    setForceUpdate(prev => prev + 1);
  };
  
  // Set mounted state once component has mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    // Only run client-side code after mounting
    if (!isMounted) return;
    
    // First check for local session storage configuration (for preview)
    if (typeof window !== 'undefined') {
      // Function to apply theme colors from a config object
      const applyThemeColors = (configObj: any) => {
        if (configObj) {
          // Apply theme color if present
          if (configObj.themeColor) {
            document.documentElement.style.setProperty('--theme-color', configObj.themeColor);
            document.documentElement.style.setProperty('--theme-color-light', `${configObj.themeColor}22`);
          }
          
          // Apply InfoBar color if present - forcefully apply it to all matching elements 
          if (configObj.infoBar?.backgroundColor) {
            console.log('Applying InfoBar background color:', configObj.infoBar.backgroundColor);
            // Find all elements that might be the InfoBar and set their style directly
            setTimeout(() => {
              // This needs to happen after the component has rendered
              const possibleInfoBars = document.querySelectorAll('.backdrop-blur-sm');
              possibleInfoBars.forEach(element => {
                // Look for an element that matches the InfoBar structure
                if (element.classList.contains('hidden') && element.classList.contains('md:block')) {
                  console.log('Found InfoBar element, applying style');
                  (element as HTMLElement).style.background = configObj.infoBar.backgroundColor;
                }
              });
              
              // Force a re-render of the component
              triggerRerender();
            }, 100);
          }
        }
      };
      
      const previewConfig = sessionStorage.getItem('previewConfig');
      if (previewConfig) {
        try {
          const configObj = JSON.parse(previewConfig);
          setConfig(configObj);
          // Also set it as a global for the ConfigContext
          (window as any).__PREVIEW_CONFIG__ = configObj;
          
          // Apply theme colors
          applyThemeColors(configObj);
          
          // Dispatch event to trigger refresh
          document.dispatchEvent(new CustomEvent('preview-config-loaded'));
          return;
        } catch (e) {
          console.error('Error parsing preview config:', e);
        }
      }
      
      // Otherwise try to load from localStorage
      const savedConfig = localStorage.getItem('siteConfig');
      if (savedConfig) {
        try {
          const configObj = JSON.parse(savedConfig);
          setConfig(configObj);
          // Also set it as a global for the ConfigContext
          (window as any).__PREVIEW_CONFIG__ = configObj;
          
          // Apply theme colors
          applyThemeColors(configObj);
          
          // Also look for theme color in localStorage
          const savedThemeColor = localStorage.getItem('themeColor');
          if (savedThemeColor) {
            document.documentElement.style.setProperty('--theme-color', savedThemeColor);
            document.documentElement.style.setProperty('--theme-color-light', `${savedThemeColor}22`);
            
            // Update the config with this theme color
            configObj.themeColor = savedThemeColor;
            setConfig(configObj);
            (window as any).__PREVIEW_CONFIG__ = configObj;
          }
          
          // Dispatch event to trigger refresh
          document.dispatchEvent(new CustomEvent('preview-config-loaded'));
          return;
        } catch (e) {
          console.error('Error parsing saved config:', e);
        }
      }
      
      // Otherwise load from parent window if in iframe
      if (window.parent && window.parent !== window) {
        try {
          const parentConfig = (window.parent as any).config;
          if (parentConfig) {
            setConfig(parentConfig);
            (window as any).__PREVIEW_CONFIG__ = parentConfig;
            
            // Apply theme colors
            applyThemeColors(parentConfig);
            
            // Dispatch event to trigger refresh
            document.dispatchEvent(new CustomEvent('preview-config-loaded'));
            return;
          }
        } catch (e) {
          console.error('Error accessing parent config:', e);
        }
      }
    }
  }, [isMounted]);
  
  // Message handler for live updates from the parent window
  useEffect(() => {
    if (!isMounted) return;
    
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'configUpdate') {
        console.log('Received config update:', event.data.config);
        setConfig(event.data.config);
        // Also set it as a global for the ConfigContext
        (window as any).__PREVIEW_CONFIG__ = event.data.config;
        // Also update the __CURRENT_CONFIG__ global to ensure it's used everywhere
        (window as any).__CURRENT_CONFIG__ = event.data.config;
        
        // Apply theme color
        if (event.data.themeColor) {
          document.documentElement.style.setProperty('--theme-color', event.data.themeColor);
          document.documentElement.style.setProperty('--theme-color-light', `${event.data.themeColor}22`);
        }
        
        // Apply InfoBar color if present - force apply directly to DOM
        if (event.data.config?.infoBar?.backgroundColor) {
          console.log('Applying updated InfoBar background color:', event.data.config.infoBar.backgroundColor);
          
          // Find all elements that might be the InfoBar and set their style directly
          setTimeout(() => {
            // This needs to happen after the component has rendered
            const possibleInfoBars = document.querySelectorAll('.backdrop-blur-sm');
            possibleInfoBars.forEach(element => {
              // Look for an element that matches the InfoBar structure
              if (element.classList.contains('hidden') && element.classList.contains('md:block')) {
                console.log('Found InfoBar element, applying style');
                (element as HTMLElement).style.background = event.data.config.infoBar.backgroundColor;
              }
            });
            
            // Force a re-render of the component
            triggerRerender();
          }, 100);
        }
        
        // Dispatch event to trigger refresh
        document.dispatchEvent(new CustomEvent('preview-config-loaded'));
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isMounted]);
  
  // Don't render anything during SSR to prevent hydration mismatch
  if (!isMounted) {
    return <div suppressHydrationWarning>Loading preview...</div>;
  }
  
  return (
    <div className="preview-container" key={`preview-${forceUpdate}`} suppressHydrationWarning>
      <ConfigProvider config={config}>
        <Home />
      </ConfigProvider>
    </div>
  );
} 