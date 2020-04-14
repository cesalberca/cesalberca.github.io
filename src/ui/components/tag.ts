import { css, customElement, LitElement, html } from '/web_modules/lit-element.js'
import { general } from '../styles/general.js'

@customElement('app-tag')
export class Tag extends LitElement {
  static get styles() {
    return [
      general,
      css`
        .tag {
          color: var(--white-color);
          background-color: var(--black-dark-color);
          padding: var(--base);
          border-radius: 5px;
          line-height: 1;
        }
      `
    ]
  }

  render() {
    return html` <span class="tag"><slot></slot></span>`
  }
}
