import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

interface Book {
  _id: string;
  id: string;
  title: string;
  author: string;
  authorId: string;
  published: number;
  pages: number;
  isbn: string;
  categoryId: string;
  statusId: string;
  description: string;
  coverUrl?: string;
  comments?: Array<{
    id: string;
    title: string;
  }>;
  similarBooks?: Array<{
    id: string;
    title: string;
    author: string;
  }>;
}

export class BookDetailViewElement extends LitElement {
  @property({ attribute: "book-id" })
  bookId?: string;

  @state()
  book?: Book;

  @state()
  loading = false;

  @state()
  error?: string;

  connectedCallback() {
    super.connectedCallback();
    if (this.bookId) {
      this.loadBookData();
    }
  }

  async loadBookData() {
    this.loading = true;
    this.error = undefined;
    
    try {
      const response = await fetch(`/api/books/${this.bookId}`);
      if (!response.ok) throw new Error('Failed to load book');
      this.book = await response.json();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      this.loading = false;
    }
  }

  mapStatusId(statusId: string): string {
    switch(statusId) {
      case 'status1': return 'read';
      case 'status2': return 'reading';
      case 'status3': return 'to-read';
      default: return statusId;
    }
  }

  getStatusText(statusId: string) {
    switch(statusId) {
      case 'status1': return 'Read';
      case 'status2': return 'Currently Reading';
      case 'status3': return 'To Be Read';
      default: return '';
    }
  }

  getCategoryName(categoryId: string): string {
    switch(categoryId) {
      case 'category1': return 'Fiction';
      case 'category2': return 'History';
      case 'category3': return 'Science';
      default: return categoryId;
    }
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">Loading book...</div>`;
    }

    if (this.error) {
      return html`<div class="error">Error: ${this.error}</div>`;
    }

    if (!this.book) {
      return html`<div class="empty">Book not found</div>`;
    }

    return html`
      <main>
        <div class="page-header">
          <h2>${this.book.title}</h2>
          <nav class="breadcrumb">
            <ul>
              <li><a href="/app">Home</a></li>
              <li><a href="/app/books">Books</a></li>
              <li>${this.book.title}</li>
            </ul>
          </nav>
        </div>
        
        <div class="book-detail-grid">
          <div class="book-cover-section">
            <div class="book-cover large" style="${this.book.coverUrl ? `background-image: url(${this.book.coverUrl}); background-size: cover; background-position: center;` : ''}"></div>
            <div class="book-actions">
              <button class="btn primary">Update Status</button>
              <button class="btn secondary">Add to List</button>
            </div>
          </div>
          
          <div class="book-info-section">
            <h3 class="book-title">${this.book.title}</h3>
            <p class="book-author">By <a href="/app/authors/${this.book.authorId}">${this.book.author}</a></p>
            <div class="book-metadata">
              <div class="metadata-item">
                <span class="label">Published:</span>
                <span class="value">${this.book.published}</span>
              </div>
              <div class="metadata-item">
                <span class="label">Pages:</span>
                <span class="value">${this.book.pages}</span>
              </div>
              <div class="metadata-item">
                <span class="label">ISBN:</span>
                <span class="value">${this.book.isbn}</span>
              </div>
              <div class="metadata-item">
                <span class="label">Category:</span>
                <span class="value"><a href="/app/categories/${this.book.categoryId}">${this.getCategoryName(this.book.categoryId)}</a></span>
              </div>
              <div class="metadata-item">
                <span class="label">Status:</span>
                <span class="value status-${this.mapStatusId(this.book.statusId)}">${this.getStatusText(this.book.statusId)}</span>
              </div>
            </div>
            
            <div class="book-description">
              <h4>Description</h4>
              <p>${this.book.description}</p>
            </div>
          </div>
          
          <aside class="book-sidebar">
            <section class="sidebar-card">
              <h4>Related Information</h4>
              <ul class="related-links">
                <li><a href="/app/authors/${this.book.authorId}">Author: ${this.book.author}</a></li>
                <li><a href="/app/categories/${this.book.categoryId}">Category: ${this.getCategoryName(this.book.categoryId)}</a></li>
              </ul>
            </section>
            
            ${this.book.comments && this.book.comments.length ? html`
              <section class="sidebar-card">
                <h4>My Comments</h4>
                <ul class="comment-list">
                  ${this.book.comments.map(comment => html`
                    <li><a href="/app/books/${this.bookId}/comments/${comment.id}">${comment.title}</a></li>
                  `)}
                </ul>
              </section>
            ` : ''}
            
            ${this.book.similarBooks && this.book.similarBooks.length ? html`
              <section class="sidebar-card">
                <h4>Similar Books</h4>
                <div class="mini-book-list">
                  ${this.book.similarBooks.map(book => html`
                    <mini-book-element href="/app/books/${book.id}" author="${book.author}">
                      ${book.title}
                    </mini-book-element>
                  `)}
                </div>
              </section>
            ` : ''}
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
      margin-bottom: 1rem;
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

    .book-detail-grid {
      display: grid;
      grid-template-columns: 200px 1fr 250px;
      gap: 2rem;
      margin-top: 2rem;
    }

    .book-cover-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .book-cover.large {
      width: 100%;
      height: 300px;
      background-color: var(--color-accent-light);
      border-radius: 8px;
    }

    .book-actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .btn {
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
      font-size: 0.875rem;
    }

    .btn.primary {
      background-color: var(--color-primary, #007bff);
      color: white;
    }

    .btn.secondary {
      background-color: var(--color-secondary, #6c757d);
      color: white;
    }

    .book-info-section {
      padding: 0 1rem;
    }

    .book-title {
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
    }

    .book-author {
      margin-bottom: 1.5rem;
      font-size: 1.125rem;
    }

    .book-author a {
      color: var(--color-link);
      text-decoration: none;
    }

    .book-metadata {
      margin-bottom: 2rem;
    }

    .metadata-item {
      display: flex;
      margin-bottom: 0.5rem;
    }

    .metadata-item .label {
      font-weight: 600;
      min-width: 100px;
    }

    .metadata-item .value a {
      color: var(--color-link);
      text-decoration: none;
    }

    .status-read {
      color: #2e7d32;
      font-weight: 600;
    }

    .status-reading {
      color: #f57f17;
      font-weight: 600;
    }

    .status-to-read {
      color: #1565c0;
      font-weight: 600;
    }

    .book-description h4 {
      margin-bottom: 1rem;
    }

    .book-description p {
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .book-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .sidebar-card {
      background-color: var(--color-background-card);
      padding: 1rem;
      border-radius: 8px;
      box-shadow: var(--shadow-light);
    }

    .sidebar-card h4 {
      margin-bottom: 1rem;
    }

    .related-links, .comment-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .related-links li, .comment-list li {
      margin-bottom: 0.5rem;
    }

    .related-links a, .comment-list a {
      color: var(--color-link);
      text-decoration: none;
    }

    .mini-book-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .loading, .error, .empty {
      padding: 2rem;
      text-align: center;
    }

    .error {
      color: var(--color-error, #d32f2f);
    }

    @media (max-width: 1024px) {
      .book-detail-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .book-cover-section {
        flex-direction: row;
        align-items: flex-start;
      }
      
      .book-cover.large {
        width: 200px;
        height: 300px;
        flex-shrink: 0;
      }
      
      .book-actions {
        flex: 1;
        margin-left: 1rem;
      }
    }

    @media (max-width: 768px) {
      .book-cover-section {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      
      .book-actions {
        margin-left: 0;
        width: 200px;
      }
    }
  `;
}