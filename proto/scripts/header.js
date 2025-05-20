import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Observer } from "@calpoly/mustang";

namespace Auth {
  export interface User {
    authenticated: boolean;
    username?: string;
    token?: string;
  }

  export interface Model {
    user?: User;
  }
}

const Events = {
  relay(event: Event, name: string, detail: any[]) {
    event.stopPropagation();
    const customEvent = new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail
    });
    (event.target as HTMLElement).dispatchEvent(customEvent);
  }
};

export class HeaderElement extends LitElement {
  static initializeOnce() {
    console.log("Header initialized");
  }

  _authObserver = new Observer<Auth.Model>(this, "bookshelf:auth");

  @state()
  loggedIn = false;

  @state()
  userid?: string;

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe((auth: Auth.Model) => {
      const { user } = auth;

      if (user && user.authenticated) {
        this.loggedIn = true;
        this.userid = user.username;
      } else {
        this.loggedIn = false;
        this.userid = undefined;
      }
    });
  }

  renderSignOutButton() {
    return html`
      <button
        @click=${(e: UIEvent) => {
          Events.relay(e, "auth:message", ["auth/signout"]);
        }}
        class="sign-out-btn"
      >
        Sign Out
      </button>
    `;
  }

  renderSignInButton() {
    return html`
      <a href="/login.html" class="sign-in-link">
        Sign In…
      </a>
    `;
  }

  render() {
    return html`
      <header>
        <div class="logo">
          <a href="/">Bookshelf</a>
        </div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/books.html">Books</a></li>
            <li><a href="/authors.html">Authors</a></li>
          </ul>
        </nav>
        <div class="user-section">
          ${this.loggedIn 
            ? html`<span>Hello, ${this.userid || "reader"}</span> ${this.renderSignOutButton()}` 
            : this.renderSignInButton()
          }
        </div>
      </header>
    `;
  }

  static styles = css`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
    }
    
    .logo a {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
      text-decoration: none;
    }
    
    nav ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    nav ul li {
      margin-left: 1rem;
    }
    
    nav ul li a {
      color: #333;
      text-decoration: none;
    }
    
    nav ul li a:hover {
      text-decoration: underline;
    }
    
    .user-section {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .sign-out-btn {
      background-color: #f44336;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .sign-in-link {
      color: #2196F3;
      text-decoration: none;
    }
  `;
}