// src/components/bookshelf-header.ts
import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class BookshelfHeaderElement extends LitElement {
  render() {
    return html`
      <header>
        <div class="logo">
          <svg class="icon">
            <use href="/icons/book-categories.svg#icon-book" />
          </svg>
          <h1>My Book Collection</h1>
        </div>
        
        <nav class="main-nav">
          <ul>
            <li><a href="/app">Home</a></li>
            <li><a href="/app/books">All Books</a></li>
            <li><a href="/app/categories">Categories</a></li>
            <li><a href="/app/authors">Authors</a></li>
          </ul>
        </nav>
        
        <div class="user-controls">
          <label class="dark-mode-switch">
            <input type="checkbox" id="darkModeToggle" autocomplete="off">
            Dark Mode
          </label>
          <header-auth></header-auth>
        </div>
      </header>
    `;
  }

  static styles = css`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: var(--color-background-header, #333);
      color: var(--color-text-inverted, white);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo h1 {
      margin: 0;
      font-size: 1.5rem;
    }

    .main-nav ul {
      display: flex;
      list-style: none;
      gap: 1.5rem;
      margin: 0;
      padding: 0;
    }

    .main-nav a {
      color: var(--color-text-inverted, white);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .main-nav a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .user-controls {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .dark-mode-switch {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: var(--color-text-inverted, white);
    }

    .dark-mode-switch input[type="checkbox"] {
      margin-right: 0.5rem;
    }

    .icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  `;
}