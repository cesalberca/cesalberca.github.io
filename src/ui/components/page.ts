import { Inject } from '../../domain/types/inject.js'
import { TYPES } from '../../types.js'
import { StateManager } from '../../application/state/state-manager.js'
import { css, customElement, html, LitElement } from '/web_modules/lit-element.js'

@customElement('app-page')
export class Page extends LitElement {
  @Inject(TYPES.WINDOW)
  window!: Window

  @Inject(TYPES.STATE_MANAGER)
  stateManager!: StateManager

  onShouldReloadChange() {
    if (this.stateManager.state.shouldReload) {
      this.window.location.reload(true)
    }
  }

  static get styles() {
    return css`
      .page {
        padding: var(--large-size) var(--medium-size) var(--medium-size);
        min-height: 100vh;
      }

      .wrapper {
        margin: 0 auto;
        max-width: var(--body-width);
      }
    `
  }

  render() {
    return html`<div>
      <div class="page">
        <div class="wrapper">
          <slot />
        </div>
      </div>
      <app-footer></app-footer>
    </div>`
  }
}