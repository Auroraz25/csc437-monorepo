import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

export class LoginFormElement extends LitElement {
  @state()
  formData = {};

  @property()
  api;

  @property()
  redirect = "/";

  @state()
  error;

  get canSubmit() {
    return Boolean(this.api && this.formData.username && this.formData.password);
  }

  render() {
    return html`
      <form
        @change=${this.handleChange}
        @submit=${this.handleSubmit}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            Login
          </button>
        </slot>
        ${this.error ? html`<p class="error">${this.error}</p>` : ''}
      </form>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    
    form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    ::slotted(label) {
      display: block;
      margin-bottom: 15px;
    }

    ::slotted(label span) {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    ::slotted(input) {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 16px;
    }

    ::slotted(input:focus) {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.25);
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-top: 10px;
    }

    button:hover:not(:disabled) {
      background-color: #45a049;
    }

    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    .error {
      color: #e74c3c;
      padding: 12px;
      border: 1px solid #e74c3c;
      border-radius: 4px;
      background-color: rgba(231, 76, 60, 0.1);
      margin-top: 10px;
    }
  `;

  handleChange(event) {
    const target = event.target;
    const name = target?.name;
    const value = target?.value;

    this.formData = { ...this.formData, [name]: value };
  }

  handleSubmit(submitEvent) {
    submitEvent.preventDefault();

    if (this.canSubmit) {
      fetch(this.api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.formData)
      })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Login failed");
        }
        return res.json();
      })
      .then((json) => {
        const { token } = json;
        const customEvent = new CustomEvent('auth:message', {
          bubbles: true,
          composed: true,
          detail: ['auth/signin', { token, redirect: this.redirect }]
        });
        this.dispatchEvent(customEvent);
      })
      .catch((error) => {
        this.error = error.message;
      });
    }
  }
}