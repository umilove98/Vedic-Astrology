/**
 * Simple screen router with CSS transition-based navigation
 */
export class Router {
  constructor(appEl) {
    this.app = appEl;
    this.screens = {};
    this.current = null;
    this.data = {}; // shared data passed between screens
  }

  register(name, screen) {
    this.screens[name] = screen;
  }

  async navigateTo(name, extraData = {}) {
    Object.assign(this.data, extraData);

    // Exit current screen
    if (this.current && this.screens[this.current]) {
      const currentScreen = this.screens[this.current];
      const el = currentScreen.el;
      if (el) {
        el.classList.remove('active');
        el.classList.add('exit');
        if (currentScreen.onExit) await currentScreen.onExit();
        // Wait for exit transition
        await this.wait(400);
        el.remove();
      }
    }

    // Enter new screen
    const nextScreen = this.screens[name];
    if (!nextScreen) {
      console.error(`Screen "${name}" not found`);
      return;
    }

    this.current = name;
    const el = nextScreen.render(this.data);
    nextScreen.el = el;
    this.app.appendChild(el);

    // Trigger reflow before adding active class
    void el.offsetHeight;
    el.classList.add('active');

    if (nextScreen.onEnter) await nextScreen.onEnter(this.data);
  }

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
