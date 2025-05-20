import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class MiniBookElement extends LitElement {
  @property()
  href: string = "#";
  
  @property()
  author: string = "";
  
  @property({ attribute: 'book-status' })
  bookStatus?: 'read' | 'reading' | 'to-read';
  
  @property({ type: Boolean, attribute: 'show-status' })
  showStatus = false;
  
  @property({ type: Boolean })
  darkMode = false;
  
  constructor() {
    super();
    this.darkMode = document.body.classList.contains('dark-mode');
    this.listenForDarkModeChanges();
  }
  
  listenForDarkModeChanges() {
    document.addEventListener('darkModeChanged', ((e: CustomEvent) => {
      this.darkMode = e.detail.isDarkMode;
      this.requestUpdate();
    }) as EventListener);
  }

  render() {
    return html`
      <div class="mini-book-card ${this.darkMode ? 'dark-mode' : ''}">
        <div class="mini-book-cover"></div>
        <div class="mini-book-info">
          <h5><a href="${this.href}"><slot>Book Title</slot></a></h5>
          <p>${this.author}</p>
          ${this.showStatus && this.bookStatus ? html`
            <p class="book-status ${this.bookStatus}">${this.getStatusText()}</p>
          ` : ''}
        </div>
      </div>
    `;
  }

  getStatusText() {
    switch(this.bookStatus) {
      case 'read': return 'Read';
      case 'reading': return 'Currently Reading';
      case 'to-read': return 'To Be Read';
      default: return '';
    }
  }

  static styles = css`
    :host {
      display: block;
      font-family: 'Source Sans 3', 'Segoe UI', sans-serif;
    }
    
    .mini-book-card {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #ddd;
      background-color: white;
      padding: 0.5rem;
      border-radius: 0.25rem;
    }
    
    .mini-book-cover {
      width: 60px;
      height: 80px;
      background-color: #a3cceb;
      border-radius: 0.25rem;
      flex-shrink: 0;
    }
    
    .mini-book-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    h5 {
      margin: 0 0 0.25rem 0;
      font-size: 1.125rem;
      font-weight: 600;
    }
    
    p {
      margin: 0;
      font-size: 0.875rem;
      color: #666;
    }
    
    a {
      color: #3498db;
      text-decoration: none;
    }
    
    a:hover {
      color: #2980b9;
      text-decoration: underline;
    }
    
    .book-status {
      display: inline-block;
      margin-top: 0.25rem;
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      width: fit-content;
    }
    
    .read {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    
    .reading {
      background-color: #fff8e1;
      color: #f57f17;
    }
    
    .to-read {
      background-color: #e3f2fd;
      color: #1565c0;
    }
    
    .dark-mode {
      background-color: #2c2c2c;
      color: #e0e0e0;
      border-color: #444;
    }
    
    .dark-mode p {
      color: #b0b0b0;
    }
    
    .dark-mode a {
      color: #5dade2;
    }
    
    .dark-mode a:hover {
      color: #7fc4f0;
    }
    
    .dark-mode .read {
      background-color: rgba(46, 125, 50, 0.2);
      color: #81c784;
    }
    
    .dark-mode .reading {
      background-color: rgba(245, 127, 23, 0.2);
      color: #ffb74d;
    }
    
    .dark-mode .to-read {
      background-color: rgba(21, 101, 192, 0.2);
      color: #64b5f6;
    }
  `;
}