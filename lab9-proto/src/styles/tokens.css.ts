import { css } from "lit";

const styles = css`
  :host {
    /* Colors */
    --color-accent: #3498db;
    --color-accent-dark: #2980b9;
    --color-accent-light: #a3cceb;
    --color-accent-inverted: #f39c12;
    
    --color-background-page: #f5f5f0;
    --color-background-header: #2c3e50;
    --color-background-card: white;
    --color-background-footer: var(--color-background-header);
    
    --color-text: #333333;
    --color-text-light: #666666;
    --color-text-heading: #2c3e50;
    --color-text-inverted: white;
    --color-content-card: white;
    --color-link: var(--color-accent);
    --color-link-inverted: var(--color-accent-light);
    --color-link-hover: var(--color-accent-dark);
    
    --color-border: #dddddd;
    --color-border-accent: var(--color-accent);
    
    /* Typography */
    --font-family-body: 'Source Sans 3', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    --font-family-heading: 'Libre Baskerville', Georgia, 'Times New Roman', serif;
    
    --font-size-base: 16px;
    --font-size-small: 0.875rem;
    --font-size-body: 1rem;
    --font-size-medium: 1.125rem;
    --font-size-large: 1.5rem;
    
    --font-weight-normal: 400;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    
    --line-height-tight: 1.2;
    --line-height-normal: 1.6;
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    
    /* Layout */
    --border-radius-sm: 3px;
    --border-radius-md: 5px;
    
    /* Borders */
    --border-width-thin: 1px;
    
    /* Shadows */
    --shadow-light: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

export default { styles };