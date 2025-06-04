import { Book, Author, Category, Comment, Status } from "server/models";

export type Msg =
  // Books messages
  | ["books/load", {}]
  | ["books/loaded", { books: Book[] }]
  | ["book/select", { bookId: string }]
  | ["book/loaded", { book: Book }]
  | ["books/filter", { query: string; filters: any }]
  | ["books/filtered", { filteredBooks: Book[] }]
  | ["books/by-author", { authorId: string }]
  | ["books/by-category", { categoryId: string }]
  | ["books/by-status", { statusId: string }]
  
  // Authors messages
  | ["authors/load", {}]
  | ["authors/loaded", { authors: Author[] }]
  | ["author/select", { authorId: string }]
  | ["author/loaded", { author: Author }]
  
  // Categories messages
  | ["categories/load", {}]
  | ["categories/loaded", { categories: Category[] }]
  | ["category/select", { categoryId: string }]
  | ["category/loaded", { category: Category }]
  
  // Comments messages
  | ["comments/load", { bookId: string }]
  | ["comments/loaded", { comments: Comment[] }]
  | ["comment/select", { commentId: string }]
  | ["comment/loaded", { comment: Comment }]
  | ["comments/by-user", { userId: string }]
  
  // Statuses messages
  | ["statuses/load", {}]
  | ["statuses/loaded", { statuses: Status[] }]
  | ["status/by-type", { type: 'read' | 'reading' | 'to-read' }]
  
  // Loading and error states
  | ["loading/start", { operation: string }]
  | ["loading/end", { operation: string }]
  | ["error/set", { error: string }]
  | ["error/clear", {}];