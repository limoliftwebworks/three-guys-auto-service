/**
 * Ultra-aggressive dialog prevention utility
 * Completely prevents all "Leave site?" warnings and other confirmation dialogs
 */
(function() {
  // Only run once per page
  if (window.__dialogPreventionRunning) return;
  window.__dialogPreventionRunning = true;
  
  console.log("Ultra-aggressive dialog prevention activated");
  
  /**
   * Strategy 1: Override native browser method
   * Redefine window.onbeforeunload to always be null
   */
  Object.defineProperty(window, 'onbeforeunload', {
    configurable: true,
    enumerable: true,
    get: function() { return null; },
    set: function() { /* Ignore attempts to set */ }
  });
  
  /**
   * Strategy 2: Capture and disable all beforeunload events
   * Use a permanent event listener that prevents propagation
   */
  window.addEventListener('beforeunload', function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.returnValue = undefined;
    return undefined;
  }, { capture: true });
  
  /**
   * Strategy 3: Intercept any dialog checkboxes
   * Monitors the DOM for new dialog elements and auto-checks them
   */
  function checkAllDialogCheckboxes() {
    const dialogs = document.querySelectorAll('dialog, [role="dialog"]');
    dialogs.forEach(function(dialog) {
      // Check "prevent additional dialogs" checkbox
      const checkbox = dialog.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = true;
        console.log("Auto-checked dialog prevention checkbox");
      }
      
      // Find and auto-click any Leave buttons
      const buttons = dialog.querySelectorAll('button');
      Array.from(buttons).forEach(function(button) {
        if (button.textContent && 
            (button.textContent.includes('Leave') || 
             button.textContent.toLowerCase().includes('leave'))) {
          console.log("Auto-clicking Leave button", button.textContent);
          setTimeout(function() { button.click(); }, 100);
        }
      });
    });
  }
  
  /**
   * Strategy 4: Mutation Observer to catch new dialogs immediately
   */
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        setTimeout(checkAllDialogCheckboxes, 50); // Check after a brief delay
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
  
  /**
   * Strategy 5: Hide dialog elements with CSS
   */
  const style = document.createElement('style');
  style.textContent = `
    dialog:not([open]), dialog::backdrop {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
    }
    
    input[type="checkbox"][id^="prevent"] {
      opacity: 1 !important;
    }
    
    input[type="checkbox"][id^="prevent"]:checked {
      opacity: 1 !important;
    }
  `;
  document.head.appendChild(style);
  
  /**
   * Strategy 6: Listen for clicks on buttons to auto-accept
   */
  document.addEventListener('click', function(e) {
    const target = e.target;
    if (target.tagName === 'BUTTON') {
      const text = target.textContent || '';
      if (text.includes('Leave') || text.includes('leave') || 
          text.includes('Cancel') || text.includes('cancel')) {
        localStorage.setItem('user_confirmed_navigation', 'true');
        sessionStorage.setItem('prevent_dialogs', 'true');
      }
    }
  }, true);
  
  /**
   * Strategy 7: Run a periodic check for dialogs
   */
  setInterval(checkAllDialogCheckboxes, 500);
  
  // Set various storage flags to remember the prevention is active
  localStorage.setItem('dialogs_disabled', 'true');
  sessionStorage.setItem('dialogs_disabled', 'true');
  
  // Check immediately for any dialogs that may already exist
  checkAllDialogCheckboxes();
  
  console.log("Ultra-aggressive dialog prevention setup completed");
})(); 