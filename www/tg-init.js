window.addEventListener('DOMContentLoaded', () => {
  const tg = window.Telegram.WebApp;
  if (!tg) return;
  tg.ready();
  tg.expand();

  const applyTheme = () => {
    document.body.style.background = tg.themeParams?.bg_color || '#f5f5f5';
  };

  tg.onEvent('themeChanged', applyTheme);
  applyTheme();

  if (history.length > 1) {
    try {
      tg.BackButton.show();
      tg.BackButton.onClick(() => history.back());
    } catch (e) {
      // ignore if back button not supported
    }
  }
});
