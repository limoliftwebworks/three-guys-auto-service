import { useEffect } from 'react';
import { disableReloadWarning } from './preventReloadWarning';

/**
 * React hook to prevent the "Leave site?" dialog and other browser confirmations
 * 
 * Usage:
 * ```
 * function MyComponent() {
 *   usePreventDialogs();
 *   // rest of component
 * }
 * ```
 */
export function usePreventDialogs(options = { duration: 0, checkboxes: true, autoClick: false }) {
  useEffect(() => {
    // Function to check the "Prevent this page from creating additional dialogs" checkbox
    const checkPreventDialogsCheckbox = () => {
      // Find any dialogs
      const dialogs = document.querySelectorAll('dialog, [role="dialog"]');
      
      // Process each dialog
      dialogs.forEach(dialog => {
        // Find and check the "prevent additional dialogs" checkbox
        const checkbox = dialog.querySelector('input[type="checkbox"]');
        if (checkbox && options.checkboxes) {
          (checkbox as HTMLInputElement).checked = true;
        }
        
        // Find Leave button
        if (options.autoClick) {
          const leaveButton = Array.from(dialog.querySelectorAll('button')).find(
            btn => btn.textContent?.includes('Leave')
          );
          
          if (leaveButton) {
            setTimeout(() => {
              try {
                (leaveButton as HTMLButtonElement).click();
              } catch (e) {
                console.error('Error auto-clicking leave button:', e);
              }
            }, 100);
          }
        }
      });
    };
    
    // Observe for dialog changes and check them
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          // Check after a short delay to ensure the dialog is fully rendered
          setTimeout(checkPreventDialogsCheckbox, 100);
        }
      });
    });
    
    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['open', 'style', 'class', 'role']
    });
    
    // Disable reload warnings for the specified duration (0 = permanent)
    if (options.duration > 0) {
      disableReloadWarning(options.duration);
    } else if (options.duration === 0) {
      // Disable permanently by repeatedly disabling
      const interval = setInterval(() => {
        disableReloadWarning(30000);
      }, 25000); // Refresh before the previous one expires
      
      return () => {
        clearInterval(interval);
        observer.disconnect();
      };
    }
    
    // Check for any already-open dialogs
    checkPreventDialogsCheckbox();
    
    // Clean up
    return () => {
      observer.disconnect();
    };
  }, [options.duration, options.checkboxes, options.autoClick]);
}

/**
 * Helper function to manually check all dialog prevention checkboxes
 */
export function checkAllDialogPreventionCheckboxes() {
  const dialogs = document.querySelectorAll('dialog, [role="dialog"]');
  dialogs.forEach(dialog => {
    const checkbox = dialog.querySelector('input[type="checkbox"]');
    if (checkbox) {
      (checkbox as HTMLInputElement).checked = true;
    }
  });
}

/**
 * Set to true when a dialog action has been taken that should persist
 */
export function setGlobalDialogPreference(prevent = true) {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('prevent_dialogs', prevent ? 'true' : 'false');
  }
  
  // Also check existing checkboxes
  if (prevent) {
    checkAllDialogPreventionCheckboxes();
  }
}

/**
 * Get the user's preferred dialog prevention setting
 */
export function getGlobalDialogPreference(): boolean {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem('prevent_dialogs') === 'true';
  }
  return false;
} 