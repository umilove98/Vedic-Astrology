/**
 * Simple screen router with CSS transition-based navigation + back support
 */
export class Router {
  constructor(appEl) {
    this.app = appEl;
    this.screens = {};
    this.current = null;
    this.history = [];
    this.data = {};
    this.transitioning = false; // prevent double navigation

    window.addEventListener('popstate', (e) => {
      if (e.state?.screen) {
        this._goTo(e.state.screen);
      }
    });
  }

  register(name, screen) {
    this.screens[name] = screen;
  }

  async navigateTo(name, extraData = {}) {
    if (this.transitioning || name === this.current) return;
    Object.assign(this.data, extraData);
    if (this.current) {
      this.history.push(this.current);
    }
    window.history.pushState({ screen: name }, '', '');
    await this._goTo(name);
  }

  async goBack() {
    if (this.transitioning || this.history.length === 0) return;
    const prev = this.history.pop();
    window.history.back();
    await this._goTo(prev);
  }

  canGoBack() {
    return this.history.length > 0;
  }

  async _goTo(name) {
    if (this.transitioning) return;
    this.transitioning = true;

    try {
      // Remove ALL existing screens from DOM (clean slate)
      const existingScreens = this.app.querySelectorAll('.screen');
      for (const el of existingScreens) {
        el.classList.remove('active');
        el.classList.add('exit');
      }

      // Notify current screen of exit
      if (this.current && this.screens[this.current]?.onExit) {
        await this.screens[this.current].onExit();
      }

      await this.wait(350);

      // Remove all old screen elements
      for (const el of this.app.querySelectorAll('.screen')) {
        el.remove();
      }

      // Enter new screen
      const nextScreen = this.screens[name];
      if (!nextScreen) return;

      this.current = name;
      const el = nextScreen.render(this.data);
      nextScreen.el = el;
      this.app.appendChild(el);

      // Add back button if not welcome screen
      if (this.history.length > 0 && name !== 'welcome') {
        this._injectBackButton(el);
      }

      void el.offsetHeight;
      el.classList.add('active');

      // Transition complete — unlock before onEnter so screens can navigate
      this.transitioning = false;

      if (nextScreen.onEnter) await nextScreen.onEnter(this.data);
    } finally {
      this.transitioning = false;
    }
  }

  _injectBackButton(screenEl) {
    const btn = document.createElement('button');
    btn.className = 'back-btn';
    btn.innerHTML = '← ✦ 별자리를 되짚다';
    btn.addEventListener('click', () => this.goBack());
    screenEl.prepend(btn);
  }

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
