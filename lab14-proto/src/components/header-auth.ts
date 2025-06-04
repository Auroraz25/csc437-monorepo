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

export class HeaderAuthElement extends LitElement {
  _authObserver = new Observer<Auth.Model>(this, "bookshelf:auth");

  @state()
  loggedIn = false;

  @state()
  username?: string;

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe((auth: Auth.Model) => {
      const { user } = auth;

      if (user && user.authenticated) {
        this.loggedIn = true;
        this.username = user.username;
      } else {
        this.loggedIn = false;
        this.username = undefined;
      }
    });
  }

  renderLoggedOut() {
    return html`
      <div class="auth-buttons">
        <a href="/login.html" class="login-button">Log In</a>
        <a href="/newuser.html" class="signup-button">Sign Up</a>
      </div>
    `;
  }

  renderLoggedIn() {
    return html`
      <div class="user-profile">
        <span class="user-greeting">Welcome, ${this.username || "Reader"}</span>
        <button 
          @click=${(e: MouseEvent) => {
            Events.relay(e, "auth:message", ["auth/signout"]);
          }}
          class="logout-button"
        >
          Log Out
        </button>
      </div>
    `;
  }

  render() {
    return this.loggedIn ? this.renderLoggedIn() : this.renderLoggedOut();
  }

  static styles = css`
    :host {
      display: block;
    }
    
    .auth-buttons {
      display: flex;
      gap: 10px;
    }
    
    .login-button, 
    .signup-button {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      text-decoration: none;
      font-size: 14px;
      transition: background-color 0.3s;
    }
    
    .login-button {
      background-color: var(--color-background-accent, #4a90e2);
      color: white;
    }
    
    .login-button:hover {
      background-color: var(--color-background-muted, #357abd);
    }
    
    .signup-button {
      background-color: var(--color-secondary, #6c757d);
      color: white;
    }
    
    .signup-button:hover {
      background-color: #5a6268;
    }
    
    .user-profile {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .user-greeting {
      color: var(--color-text-inverted, white);
    }
    
    .logout-button {
      background-color: var(--color-danger, #d9534f);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
    }
    
    .logout-button:hover {
      background-color: #c9302c;
    }
  `;
}