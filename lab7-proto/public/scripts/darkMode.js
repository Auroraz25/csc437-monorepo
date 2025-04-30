/**
 * Dark Mode Switch Implementation
 * This module handles the dark mode toggle functionality
 */

// Check if dark mode was previously enabled
function initDarkMode() {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply saved preference
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
      const darkModeToggle = document.getElementById('darkModeToggle');
      if (darkModeToggle) {
        darkModeToggle.checked = true;
      }
    }
  }
  
  // Function to relay change events as custom events
  function relayEvent(event) {
    // Stop propagation of the original event
    event.stopPropagation();
    
    // Extract the state of the checkbox
    const isDarkMode = event.target.checked;
    
    // Create and dispatch a custom event with the state in detail
    const customEvent = new CustomEvent('darkmode:toggle', {
      bubbles: true,
      detail: { isDarkMode }
    });
    
    document.body.dispatchEvent(customEvent);
  }
  
  // Function to handle the custom darkmode:toggle event
  function handleDarkModeToggle(event) {
    const isDarkMode = event.detail.isDarkMode;
    
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
  }
  
  // Initialize dark mode functionality
  export function setupDarkMode() {
    // Apply saved preference on page load
    initDarkMode();
    
    // Add event listener to the dark mode toggle
    const darkModeSwitch = document.querySelector('.dark-mode-switch');
    if (darkModeSwitch) {
      darkModeSwitch.addEventListener('change', relayEvent);
    }
    
    // Add event listener to body for the custom event
    document.body.addEventListener('darkmode:toggle', handleDarkModeToggle);
  }
  
  // Default export for easy importing
  export default { setupDarkMode };