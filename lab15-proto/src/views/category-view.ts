import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  books: Array<{
    id: string;
    title: string;
    author: string;
    status: 'read' | 'reading' | 'to-read';
  }>;
  otherCategories: Array<{
    id: string;
    name: string;
  }>;
  popularAuthors: Array<{
    id: string;
    name: string;
  }>;
}

export class CategoryViewElement extends LitElement {
  @property()
  category?: string;

  @state()
  categoryData?: Category;

  @state()
  loading = false;

  @state()
  error?: string;

  connectedCallback() {
    super.connectedCallback();
    if (this.category) {
      this.loadCategoryData();
    }
  }

  async loadCategoryData() {
    this.loading = true;
    this.error = undefined;
    
    try {
      const response = await fetch(`/api/categories/${this.category}`);
      if (!response.ok) throw new Error('Failed to load category');
      this.categoryData = await response.json();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      this.loading = false;
    }
  }

  getStatusText(status: string) {
    switch(status) {
      case 'read': return 'Read';
      case 'reading': return 'Currently Reading';
      case 'to-read': return 'To Be Read';
      default: return '';
    }
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">Loading category...</div>`;
    }

    if (this.error) {
      return html`<div class="error">Error: ${this.error}</div>`;
    }

    if (!this.categoryData) {
      return html`<div class="empty">Category not found</div>`;
    }

    return html`
      <main>
        <div class="page-header">
          <h2>
            <svg class="icon">
              <use href="/icons/book-categories.svg#${this.categoryData.icon}" />
            </svg>
            Category: ${this.categoryData.name}
          </h2>
          <nav class="breadcrumb">
            <ul>
              <li><a href="/app">Home</a></li>
              <li><a href="/app/categories">Categories</a></li>
              <li>${this.categoryData.name}</li>
            </ul>
          </nav>
        </div>
        
        <div class="content-grid">
          <div class="main-content">
            <section class="content-card">
              <h3>About this Category</h3>
              <p>${this.categoryData.description}</p>
            </section>
            
            <section class="content-card category-icon">
              <h3>
                <svg class="icon">
                  <use href="/icons/book-categories.svg#${this.categoryData.icon}" />
                </svg>
                Books in this Category
              </h3>
              <div class="books-list">
                ${this.categoryData.books.map(book => html`
                  <div class="book-card">
                    <div class="book-cover"></div>
                    <h4><a href="/app/books/${book.id}">${book.title}</a></h4>
                    <p class="book-author">${book.author}</p>
                    <p class="book-status ${book.status}">${this.getStatusText(book.status)}</p>
                  </div>
                `)}
              </div>
            </section>
          </div>
          
          <aside class="sidebar">
            <section class="sidebar-card">
              <h3>Other Categories</h3>
              <ul class="category-list">
                ${this.categoryData.otherCategories.map(cat => html`
                  <li><a href="/app/categories/${cat.id}">${cat.name}</a></li>
                `)}
              </ul>
            </section>
            
            <section class="sidebar-card">
              <h3>Popular Authors</h3>
              <ul class="author-list">
                ${this.categoryData.popularAuthors.map(author => html`
                  <li><a href="/app/authors/${author.id}">${author.name}</a></li>
                `)}
              </ul>
            </section>
          </aside>
        </div>
      </main>
    `;
  }

  static styles = css`
    main {
      padding: 2rem;
    }

    .page-header h2 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    .breadcrumb ul {
      display: flex;
      gap: 1rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .breadcrumb a {
      color: var(--color-link);
      text-decoration: none;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
      margin-top: 2rem;
    }

    .content-card, .sidebar-card {
      background-color: var(--color-background-card);
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      box-shadow: var(--shadow-light);
    }

    .content-card h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .content-card p {
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .books-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }

    .book-card {
      text-align: center;
      padding: 1rem;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .book-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-medium, 0 4px 8px rgba(0,0,0,0.15));
    }

    .book-cover {
      width: 100%;
      height: 150px;
      background-color: var(--color-accent-light);
      margin-bottom: 1rem;
      border-radius: 4px;
    }

    .book-card h4 {
      margin-bottom: 0.5rem;
    }

    .book-card a {
      color: var(--color-link);
      text-decoration: none;
    }

    .book-card a:hover {
      text-decoration: underline;
    }

    .book-author {
      margin-bottom: 0.5rem;
      color: var(--color-text-light);
      font-size: 0.9rem;
    }

    .book-status {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
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

    .sidebar-card h3 {
      margin-bottom: 1rem;
    }

    .category-list, .author-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .category-list li, .author-list li {
      margin-bottom: 0.5rem;
    }

    .category-list a, .author-list a {
      color: var(--color-link);
      text-decoration: none;
      display: block;
      padding: 0.25rem 0;
    }

    .category-list a:hover, .author-list a:hover {
      text-decoration: underline;
    }

    .loading, .error, .empty {
      padding: 2rem;
      text-align: center;
    }

    .error {
      color: var(--color-error, #d32f2f);
    }

    @media (max-width: 768px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
      
      .books-list {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      main {
        padding: 1rem;
      }
      
      .page-header h2 {
        font-size: 1.25rem;
      }
    }
  `;
}