import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

interface BookComment {
  id: string;
  title: string;
  date: string;
  rating: number;
  content: string;
  favoriteQuote?: string;
  book: {
    id: string;
    title: string;
    author: string;
  };
  otherReviews: Array<{
    id: string;
    bookId: string;
    title: string;
  }>;
}

export class CommentViewElement extends LitElement {
  @property({ attribute: "book-id" })
  bookId?: string;

  @property({ attribute: "comment-id" })
  commentId?: string;

  @state()
  comment?: BookComment;

  @state()
  loading = false;

  @state()
  error?: string;

  connectedCallback() {
    super.connectedCallback();
    if (this.bookId && this.commentId) {
      this.loadCommentData();
    }
  }

  async loadCommentData() {
    this.loading = true;
    this.error = undefined;
    
    try {
      const response = await fetch(`/api/books/${this.bookId}/comments/${this.commentId}`);
      if (!response.ok) throw new Error('Failed to load comment');
      this.comment = await response.json();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      this.loading = false;
    }
  }

  renderStars(rating: number) {
    return html`${Array(5).fill(0).map((_, i) => 
      i < rating ? '★' : '☆'
    ).join('')}`;
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">Loading review...</div>`;
    }

    if (this.error) {
      return html`<div class="error">Error: ${this.error}</div>`;
    }

    if (!this.comment) {
      return html`<div class="empty">Review not found</div>`;
    }

    return html`
      <main>
        <div class="page-header">
          <h2>${this.comment.title}</h2>
          <nav class="breadcrumb">
            <ul>
              <li><a href="/app">Home</a></li>
              <li><a href="/app/books/${this.bookId}">${this.comment.book.title}</a></li>
              <li>Comment</li>
            </ul>
          </nav>
        </div>
        
        <div class="content-grid">
          <div class="main-content">
            <article class="content-card review">
              <div class="review-header">
                <h3>Review</h3>
                <div class="review-meta">
                  <span class="review-date">Date: ${this.comment.date}</span>
                  <span class="review-rating">
                    Rating: <span class="stars">${this.renderStars(this.comment.rating)}</span> ${this.comment.rating}/5
                  </span>
                </div>
              </div>
              <div class="review-content">
                <p>${this.comment.content}</p>
                ${this.comment.favoriteQuote ? html`
                  <blockquote class="favorite-quote">
                    <p>"${this.comment.favoriteQuote}"</p>
                  </blockquote>
                ` : ''}
              </div>
            </article>
          </div>
          
          <aside class="sidebar">
            <section class="sidebar-card">
              <h3>Book Information</h3>
              <mini-book-element href="/app/books/${this.bookId}" author="${this.comment.book.author}">
                ${this.comment.book.title}
              </mini-book-element>
              <ul class="book-actions">
                <li><a href="/app/books/${this.bookId}" class="btn secondary">View Book Details</a></li>
              </ul>
            </section>
            
            <section class="sidebar-card">
              <h3>Other Reviews</h3>
              <ul class="review-list">
                ${this.comment.otherReviews.map(review => html`
                  <li><a href="/app/books/${review.bookId}/comments/${review.id}">${review.title}</a></li>
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

    .review-header {
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--color-border);
    }

    .review-header h3 {
      margin-bottom: 1rem;
    }

    .review-meta {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: var(--color-text-light);
    }

    .review-rating .stars {
      color: #ffd700;
      font-size: 1.1em;
    }

    .review-content p {
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .favorite-quote {
      background-color: #f8f9fa;
      border-left: 4px solid var(--color-accent);
      padding: 1rem 1.5rem;
      margin: 1.5rem 0;
      font-style: italic;
    }

    .favorite-quote p {
      margin: 0;
      font-size: 1.1rem;
      line-height: 1.5;
    }

    .sidebar-card h3 {
      margin-bottom: 1rem;
    }

    .book-actions {
      list-style: none;
      padding: 0;
      margin: 1rem 0 0 0;
    }

    .btn {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      text-decoration: none;
      border: 1px solid;
      text-align: center;
    }

    .btn.secondary {
      background-color: var(--color-background-secondary, #f8f9fa);
      color: var(--color-text);
      border-color: var(--color-border);
    }

    .btn:hover {
      opacity: 0.8;
    }

    .review-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .review-list li {
      margin-bottom: 0.5rem;
    }

    .review-list a {
      color: var(--color-link);
      text-decoration: none;
      display: block;
      padding: 0.25rem 0;
    }

    .review-list a:hover {
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
      
      .review-meta {
        font-size: 0.85rem;
      }
      
      .favorite-quote {
        padding: 0.75rem 1rem;
        margin: 1rem 0;
      }
    }

    @media (max-width: 480px) {
      main {
        padding: 1rem;
      }
      
      .page-header h2 {
        font-size: 1.25rem;
      }
      
      .review-header {
        margin-bottom: 1rem;
        padding-bottom: 0.75rem;
      }
    }
  `;
}