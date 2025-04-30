export function setupDarkModeForComponents() {
  const darkModeToggle = document.getElementById('darkModeToggle') as HTMLInputElement;
  
  // Check if dark mode was previously enabled (from localStorage)
  const storedDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Apply initial dark mode if needed
  if (storedDarkMode) {
    document.body.classList.add('dark-mode');
    if (darkModeToggle) {
      darkModeToggle.checked = true;
    }
  }
  
  // Add event listener to toggle
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', (e) => {
      const isDarkMode = (e.target as HTMLInputElement).checked;
      
      // Apply or remove dark mode class to the body
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      
      // Store preference in localStorage
      localStorage.setItem('darkMode', isDarkMode.toString());
      
      // Dispatch custom event for components to respond
      document.dispatchEvent(new CustomEvent('darkModeChanged', {
        detail: { isDarkMode }
      }));
    });
  }
}
