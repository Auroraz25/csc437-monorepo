// src/views/home-view.ts
import { css, html, LitElement } from "lit";

export class HomeViewElement extends LitElement {
  render() {
    return html`
      <main>
        <section class="search-section">
          <div class="search-box">
            <input type="text" placeholder="Search books..." />
            <button type="submit">Search</button>
          </div>
        </section>

        <div class="content-grid">
          <section class="book-section">
            <h2>
              <svg class="icon">
                <use href="/icons/book-categories.svg#icon-book" />
              </svg>
              Browse Books
            </h2>
            <div>
              <book-list src="/api/books" authenticated></book-list>
            </div>
          </section>

          <aside class="sidebar">
            <section class="category-icon">
              <h2>
                <svg class="icon">
                  <use href="/icons/book-categories.svg#icon-fiction" />
                </svg>
                Browse by Category
              </h2>
              <ul class="category-list">
                <li><a href="/app/categories/fiction">Fiction</a></li>
                <li><a href="/app/categories/history">History</a></li>
                <li><a href="/app/categories/science">Science</a></li>
              </ul>
            </section>

            <section class="author-icon">
              <h2>
                <svg class="icon">
                  <use href="/icons/book-categories.svg#icon-author" />
                </svg>
                Browse by Author
              </h2>
              <ul class="author-list">
                <li><a href="/app/authors/f-scott-fitzgerald">F. Scott Fitzgerald</a></li>
                <li><a href="/app/authors/harper-lee">Harper Lee</a></li>
              </ul>
            </section>

            <section class="status-icon">
              <h2>
                <svg class="icon">
                  <use href="/icons/book-categories.svg#icon-status" />
                </svg>
                Browse by Reading Status
              </h2>
              <ul class="status-list">
                <li><a href="/app/status/read">Read</a></li>
                <li><a href="/app/status/currently-reading">Currently Reading</a></li>
                <li><a href="/app/status/to-be-read">To Be Read</a></li>
              </ul>
            </section>
          </aside>
        </div>
      </main>

      <footer>
        <div class="footer-content">
          <p>My Book Collection - Created for CSC437</p>
          <nav class="footer-nav">
            <ul>
              <li><a href="/app/about">About</a></li>
              <li><a href="/app/privacy">Privacy</a></li>
              <li><a href="/app/contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    `;
  }

  static styles = css`
    main {
      flex: 1;
      padding: 2rem;
    }

    .search-section {
      margin-bottom: 2rem;
    }

    .search-box {
      display: flex;
      gap: 1rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .search-box input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid var(--color-border, #ddd);
      border-radius: 4px;
      font-size: 1rem;
    }

    .search-box button {
      padding: 0.75rem 1.5rem;
      background-color: var(--color-primary, #007bff);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    .search-box button:hover {
      background-color: var(--color-primary-hover, #0056b3);
    }

    .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .book-section h2,
    .sidebar h2 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      color: var(--color-text-primary, #333);
    }

    .icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    .sidebar section {
      background-color: var(--color-background-secondary, #f8f9fa);
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
    }

    .category-list,
    .author-list,
    .status-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .category-list li,
    .author-list li,
    .status-list li {
      margin-bottom: 0.5rem;
    }

    .category-list a,
    .author-list a,
    .status-list a {
      color: var(--color-link, #007bff);
      text-decoration: none;
      padding: 0.25rem 0;
      display: block;
    }

    .category-list a:hover,
    .author-list a:hover,
    .status-list a:hover {
      text-decoration: underline;
    }

    footer {
      background-color: var(--color-background-footer, #333);
      color: var(--color-text-inverted, white);
      padding: 1.5rem 2rem;
      margin-top: auto;
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-nav ul {
      display: flex;
      list-style: none;
      gap: 1.5rem;
      margin: 0;
      padding: 0;
    }

    .footer-nav a {
      color: var(--color-text-inverted, white);
      text-decoration: none;
    }

    .footer-nav a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
      
      .footer-content {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `;
}