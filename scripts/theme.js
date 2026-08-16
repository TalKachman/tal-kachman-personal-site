(() => {
  const storageKey = 'tal-kachman-theme';
  const root = document.documentElement;
  const systemPreference = window.matchMedia('(prefers-color-scheme: light)');

  function readStoredTheme() {
    try {
      const storedTheme = window.localStorage.getItem(storageKey);
      return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null;
    } catch {
      return null;
    }
  }

  function preferredTheme() {
    return readStoredTheme() || (systemPreference.matches ? 'light' : 'dark');
  }

  function updateToggle(toggle) {
    const currentTheme = root.dataset.theme;
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    toggle.textContent = nextTheme === 'light' ? 'Light' : 'Dark';
    toggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
  }

  function applyTheme(theme, persist = false) {
    root.dataset.theme = theme;

    if (persist) {
      try {
        window.localStorage.setItem(storageKey, theme);
      } catch {
        // The selected theme still applies for this page if storage is unavailable.
      }
    }

    document.querySelectorAll('[data-theme-toggle]').forEach(updateToggle);
  }

  applyTheme(preferredTheme());

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-theme-toggle]').forEach((toggle) => {
      updateToggle(toggle);
      toggle.addEventListener('click', () => {
        applyTheme(root.dataset.theme === 'light' ? 'dark' : 'light', true);
      });
    });
  });

  systemPreference.addEventListener('change', () => {
    if (!readStoredTheme()) applyTheme(preferredTheme());
  });
})();
