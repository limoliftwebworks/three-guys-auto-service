/**
 * Utility to prevent "Leave site?" dialogs and other confirmation popups
 */

let dialogPreventionActive = false;

/**
 * Disable all dialogs and confirmations when navigating or refreshing
 */
export function disableAllDialogs() {
  // Only run this function once
  if (dialogPreventionActive) return;
  dialogPreventionActive = true;

  // Create a function to auto-check the "prevent additional dialogs" checkbox
  const checkPreventDialogsCheckbox = () => {
    // Find any dialogs
    const dialogs = document.querySelectorAll('dialog, [role="dialog"]');
    dialogs.forEach(dialog => {
      // Find and check the "prevent additional dialogs" checkbox
      const checkbox = dialog.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = true;
      }
    });
  };

  // Insert a checkbox suppression script
  const injectCss = () => {
    const style = document.createElement('style');
    style.textContent = `
      input[type="checkbox"][id^="prevent"] {
        pointer-events: none;
        opacity: 0.5;
      }
      input[type="checkbox"][id^="prevent"]:checked {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  };

  // Completely disable beforeunload warnings
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.returnValue = undefined;
    return undefined;
  }, { capture: true });

  // Handle clicking the "Leave" button automatically
  document.addEventListener('click', (e) => {
    // Check if the clicked element is a "Leave" button
    if (e.target && e.target.textContent && 
        (e.target.textContent.includes('Leave') || 
        e.target.textContent.includes('leave'))) {
      
      // Make sure nothing blocks navigation
      window.onbeforeunload = null;
      sessionStorage.setItem('prevent_dialogs', 'true');
    }
  }, { capture: true });

  // Check for any warnings when the DOM changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // Only check for new elements
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        setTimeout(checkPreventDialogsCheckbox, 50);
      }
    });
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Check for any already open dialogs
  checkPreventDialogsCheckbox();
  
  // Add CSS
  injectCss();
  
  // Set a flag in storage
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('dialogsDisabled', 'true');
  }

  console.log('All dialogs disabled');
}

// Auto-initialize when imported
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', disableAllDialogs);
  
  // Also try to run immediately in case DOM is already loaded
  if (document.readyState !== 'loading') {
    disableAllDialogs();
  }
} 