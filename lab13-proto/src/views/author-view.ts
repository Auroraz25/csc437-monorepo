import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

interface Author {
  id: string;
  name: string;
  nationality: string;
  birthYear: number;
  deathYear?: number;
  bio: string[];
  books: Array<{
    id: string;
    title: string;
    status: 'read' | 'reading' | 'to-read';
  }>;
  relatedAuthors: Array<{
    id: string;
    name: string;
  }>;
}

export class AuthorViewElement extends LitElement {
  @property({ attribute: "author-id" })
  authorId?: string;

  @state()
  author?: Author;

  @state()
  loading = false;

  @state()
  error?: string;

  connectedCallback() {
    super.connectedCallback();
    if (this.authorId) {
      this.loadAuthorData();
    }
  }

  async loadAuthorData() {
    this.loading = true;
    this.error = undefined;
    
    try {
      const response = await fetch(`/api/authors/${this.authorId}`);
      if (!response.ok) throw new Error('Failed to load author');
      this.author = await response.json();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      this.loading = false;
    }
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">Loading author...</div>`;
    }

    if (this.error) {
      return html`<div class="error">Error: ${this.error}</div>`;
    }

    if (!this.author) {
      return html`<div class="empty">Author not found</div>`;
    }

    return html`
      <main>
        <div class="page-header">
          <h2>
            <svg class="icon">
              <use href="/icons/book-categories.svg#icon-author" />
            </svg>
            ${this.author.name}
          </h2>
          <nav class="breadcrumb">
            <ul>
              <li><a href="/app">Home</a></li>
              <li><a href="/app/authors">Authors</a></li>
              <li>${this.author.name}</li>
            </ul>
          </nav>
        </div>
        
        <div class="content-grid">
          <div class="main-content">
            <section class="content-card author-profile">
              <div class="author-header">
                <div class="author-photo"></div>
                <div class="author-info">
                  <h3>Author Details</h3>
                  <p><strong>Name:</strong> ${this.author.name}</p>
                  <p><strong>Nationality:</strong> ${this.author.nationality}</p>
                  <p><strong>Birth Year:</strong> ${this.author.birthYear}</p>
                  ${this.author.deathYear ? html`
                    <p><strong>Death Year:</strong> ${this.author.deathYear}</p>
                  ` : ''}
                </div>
              </div>
            </section>
            
          </div>
          

        </div>
      </main>
    `;
  }

  getStatusText(status: string) {
    switch(status) {
      case 'read': return 'Read';
      case 'reading': return 'Currently Reading';
      case 'to-read': return 'To Be Read';
      default: return '';
    }
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

    .author-header {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .author-photo {
      width: 100px;
      height: 120px;
      background-color: var(--color-accent-light);
      border-radius: 4px;
    }

    .author-info h3 {
      margin-bottom: 1rem;
    }

    .author-info p {
      margin-bottom: 0.5rem;
    }

    .author-bio p {
      margin-bottom: 1rem;
      line-height: 1.6;
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

    .book-status {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
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

    .notes-list, .author-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .notes-list li, .author-list li {
      margin-bottom: 0.5rem;
    }

    .notes-list a, .author-list a {
      color: var(--color-link);
      text-decoration: none;
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
      
      .author-header {
        flex-direction: column;
        text-align: center;
      }
      
      .books-list {
        grid-template-columns: 1fr;
      }
    }
  `;
}