/**
 * Utility to prevent reload warnings when publishing the site
 */

// Store the current state
let reloadWarningDisabled = false;

// Store the original beforeunload handler if it exists
let originalBeforeUnloadHandler: ((ev: BeforeUnloadEvent) => any) | null = null;

/**
 * Completely disables reload warnings 
 * @param {number} duration - Duration in milliseconds to disable the warning (defaults to 10 seconds)
 */
export const disableReloadWarning = (duration = 10000): (() => void) => {
  // Set the flag to true
  reloadWarningDisabled = true;
  
  // Save original handler if it exists and we haven't already saved it
  if (!originalBeforeUnloadHandler && window.onbeforeunload) {
    originalBeforeUnloadHandler = window.onbeforeunload;
  }
  
  // Remove both the onbeforeunload property and any event listeners
  window.onbeforeunload = null;
  
  // Create a temporary empty handler that returns undefined
  const emptyHandler = (e: BeforeUnloadEvent): undefined => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.returnValue = undefined; // Clear return value to prevent dialog
    return undefined;
  };
  
  // Replace any existing handlers with our empty one
  window.addEventListener('beforeunload', emptyHandler, { capture: true });
  
  // Also handle unload events
  window.addEventListener('unload', (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, { capture: true });
  
  // Find and check any "prevent additional dialogs" checkboxes
  const handleDialogs = () => {
    const dialogs = document.querySelectorAll('dialog, [role="dialog"]');
    dialogs.forEach(dialog => {
      // Check any "prevent additional dialogs" checkboxes
      const checkbox = dialog.querySelector('input[type="checkbox"]');
      if (checkbox) {
        (checkbox as HTMLInputElement).checked = true;
      }
      
      // Find and click leave/cancel buttons if needed
      const leaveButton = Array.from(dialog.querySelectorAll('button')).find(
        btn => btn.textContent?.includes('Leave')
      );
      
      if (leaveButton && document.body.hasAttribute('data-publishing')) {
        setTimeout(() => {
          try {
            (leaveButton as HTMLButtonElement).click();
          } catch (e) {
            console.error('Error auto-clicking leave button:', e);
          }
        }, 100);
      }
    });
  };
  
  // Create a MutationObserver to watch for dialog elements
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        setTimeout(handleDialogs, 100);
      }
    });
  });
  
  // Start observing the document
  observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: true,
    attributeFilter: ['open', 'style', 'class']
  });
  
  // Check for any existing dialogs
  handleDialogs();
  
  // Dispatch a custom event to notify any components that need to know
  document.dispatchEvent(new CustomEvent('reload-warning-disabled'));
  
  console.log('Reload warnings disabled for', duration, 'ms');
  
  // Re-enable after the specified duration
  const timerId = setTimeout(() => {
    // Reset the flag
    reloadWarningDisabled = false;
    
    // Remove our empty handler
    window.removeEventListener('beforeunload', emptyHandler);
    
    // Restore original handler if it existed
    if (originalBeforeUnloadHandler) {
      window.onbeforeunload = originalBeforeUnloadHandler;
    }
    
    // Stop observing
    observer.disconnect();
    
    // Dispatch event to notify components
    document.dispatchEvent(new CustomEvent('reload-warning-enabled'));
    
    console.log('Reload warnings re-enabled');
  }, duration);
  
  // Return a cleanup function
  return () => {
    clearTimeout(timerId);
    observer.disconnect();
  };
};

/**
 * Checks if reload warnings are currently disabled
 * @returns {boolean} True if warnings are disabled
 */
export const isReloadWarningDisabled = (): boolean => {
  return reloadWarningDisabled;
};

/**
 * Attaches the disableReloadWarning function to publish buttons and other exit actions
 */
export const attachToPublishButton = (): void => {
  if (typeof document === 'undefined') return;
  
  // Find all publish buttons and other navigation elements on the page
  const buttons = document.querySelectorAll(
    'button[type="submit"], button:contains("Publish"), button:contains("Save"), button[data-purpose="publish"], a[href], button.leave-button, .MuiButton-root'
  );
  
  // Attach the handler to each button
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Disable reload warning before any action
      disableReloadWarning(30000); // Longer duration (30 seconds)
    });
  });
  
  // Also attach to Leave button in dialogs if they exist
  const leaveButtons = document.querySelectorAll('button:contains("Leave")');
  leaveButtons.forEach(button => {
    button.addEventListener('click', () => {
      disableReloadWarning(30000);
    });
  });
  
  // Create a MutationObserver to watch for new dialog elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const element = node as Element;
            
            // Check if this is a dialog or contains one
            const dialogElement = element.querySelector('dialog') || 
                                 (element.tagName === 'DIALOG' ? element : null);
            
            if (dialogElement) {
              // Find Leave buttons within this dialog
              const leaveBtn = dialogElement.querySelector('button:contains("Leave")');
              if (leaveBtn) {
                leaveBtn.addEventListener('click', () => {
                  disableReloadWarning(30000);
                });
              }
              
              // Also apply to any checkboxes related to dialog prevention
              const preventDialogCheckbox = dialogElement.querySelector('input[type="checkbox"]');
              if (preventDialogCheckbox) {
                (preventDialogCheckbox as HTMLInputElement).checked = true;
              }
            }
          }
        });
      }
    });
  });
  
  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });
};

// Initialize when the document is loaded
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    attachToPublishButton();
    
    // Also disable reload warnings on page load to handle any existing dialogs
    disableReloadWarning(5000);
  });
}

/**
 * Disable all dialogs permanently (even more aggressive)
 */
export const disableAllDialogsPermanently = (): void => {
  // Clear any existing handlers
  window.onbeforeunload = null;
  
  // Block any future handlers from showing dialogs
  Object.defineProperty(window, 'onbeforeunload', {
    configurable: true,
    set: function(handler) {
      // Just ignore any attempts to set this
      console.log('Blocked attempt to set onbeforeunload');
    },
    get: function() {
      // Return null instead of any handler
      return null;
    }
  });
  
  // Add a permanent empty handler to capture and prevent any dialogs
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.returnValue = undefined;
    return undefined;
  }, { capture: true, passive: false });
  
  // Add a handler for clicks on any leave/cancel buttons
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' && 
        (target.textContent?.includes('Leave') || target.textContent?.includes('Cancel'))) {
      console.log('Leave/Cancel button clicked');
    }
  }, { capture: true });
  
  // Create function to check "prevent additional dialogs" checkboxes
  const checkPreventDialogs = () => {
    const dialogs = document.querySelectorAll('dialog, [role="dialog"]');
    dialogs.forEach(dialog => {
      const checkbox = dialog.querySelector('input[type="checkbox"]');
      if (checkbox) {
        (checkbox as HTMLInputElement).checked = true;
      }
    });
  };
  
  // Watch for dialog elements
  const observer = new MutationObserver(() => {
    setTimeout(checkPreventDialogs, 100);
  });
  
  // Start observing for dialog changes
  observer.observe(document.body, {
    childList: true, 
    subtree: true
  });
  
  // Check right away
  checkPreventDialogs();
  
  // Set flag that we've done this
  (window as any).__dialogsDisabledPermanently = true;
  
  console.log('All dialogs disabled permanently');
}; 