export const THEMES_JS = `
var THEMES = {
  "tokyo-night": {
    name: "Tokyo Night",
    dark: true,
    css: {
      "--bg": "#1a1b26",
      "--bg-sidebar": "#16171e",
      "--bg-topbar": "#16171e",
      "--bg-hover": "#292e42",
      "--bg-input": "#1a1b26",
      "--fg": "#a9b1d6",
      "--fg-bright": "#c0caf5",
      "--fg-dim": "#565f89",
      "--fg-muted": "#3b4261",
      "--accent": "#7aa2f7",
      "--accent-hover": "#89b4fa",
      "--red": "#f7768e",
      "--green": "#9ece6a",
      "--yellow": "#e0af68",
      "--cyan": "#7dcfff",
      "--purple": "#bb9af7",
      "--border": "#292e42",
      "--border-active": "#7aa2f7",
      "--scrollbar": "#3b4261",
      "--scrollbar-hover": "#565f89",
      "--log-bg": "#1a1b26",
      "--hl-error-bg": "rgba(247, 118, 142, 0.08)",
      "--hl-error-border": "#f7768e",
      "--hl-warn-bg": "rgba(224, 175, 104, 0.06)",
      "--hl-warn-border": "#e0af68",
      "--badge-running": "#9ece6a",
      "--badge-exited": "#565f89",
      "--active-bg": "#292e42",
    }
  },
  "solarized-light": {
    name: "Solarized Light",
    dark: false,
    css: {
      "--bg": "#fdf6e3",
      "--bg-sidebar": "#eee8d5",
      "--bg-topbar": "#eee8d5",
      "--bg-hover": "#e6dfcc",
      "--bg-input": "#fdf6e3",
      "--fg": "#586e75",
      "--fg-bright": "#002b36",
      "--fg-dim": "#93a1a1",
      "--fg-muted": "#c5c8c6",
      "--accent": "#268bd2",
      "--accent-hover": "#2aa1e6",
      "--red": "#dc322f",
      "--green": "#859900",
      "--yellow": "#b58900",
      "--cyan": "#2aa198",
      "--purple": "#6c71c4",
      "--border": "#d3cdb6",
      "--border-active": "#268bd2",
      "--scrollbar": "#d3cdb6",
      "--scrollbar-hover": "#93a1a1",
      "--log-bg": "#fdf6e3",
      "--hl-error-bg": "rgba(220, 50, 47, 0.08)",
      "--hl-error-border": "#dc322f",
      "--hl-warn-bg": "rgba(181, 137, 0, 0.08)",
      "--hl-warn-border": "#b58900",
      "--badge-running": "#859900",
      "--badge-exited": "#93a1a1",
      "--active-bg": "#e6dfcc",
    }
  }
};

var _activeTheme = signal(localStorage.getItem("forge-theme") || "tokyo-night");

function getTheme() {
  return THEMES[_activeTheme.value] || THEMES["tokyo-night"];
}

function applyTheme(themeId) {
  var theme = THEMES[themeId];
  if (!theme) return;
  _activeTheme.value = themeId;
  localStorage.setItem("forge-theme", themeId);
  var root = document.documentElement;
  var css = theme.css;
  for (var key in css) {
    if (css.hasOwnProperty(key)) root.style.setProperty(key, css[key]);
  }
}

function cycleTheme() {
  var keys = Object.keys(THEMES);
  var idx = keys.indexOf(_activeTheme.value);
  var next = keys[(idx + 1) % keys.length];
  applyTheme(next);
}

function initTheme() {
  applyTheme(_activeTheme.value);
}

// Also export xterm.js terminal themes
function getXtermTheme() {
  var t = getTheme();
  if (t.dark) {
    return {
      background: "#1a1b26", foreground: "#a9b1d6", cursor: "#c0caf5",
      selectionBackground: "#33467c", black: "#15161e", red: "#f7768e",
      green: "#9ece6a", yellow: "#e0af68", blue: "#7aa2f7", magenta: "#bb9af7",
      cyan: "#7dcfff", white: "#a9b1d6", brightBlack: "#414868", brightRed: "#f7768e",
      brightGreen: "#9ece6a", brightYellow: "#e0af68", brightBlue: "#7aa2f7",
      brightMagenta: "#bb9af7", brightCyan: "#7dcfff", brightWhite: "#c0caf5",
    };
  }
  return {
    background: "#fdf6e3", foreground: "#586e75", cursor: "#657b83",
    selectionBackground: "#d3cdb6", black: "#eee8d5", red: "#dc322f",
    green: "#859900", yellow: "#b58900", blue: "#268bd2", magenta: "#6c71c4",
    cyan: "#2aa198", white: "#586e75", brightBlack: "#93a1a1", brightRed: "#dc322f",
    brightGreen: "#859900", brightYellow: "#b58900", brightBlue: "#268bd2",
    brightMagenta: "#6c71c4", brightCyan: "#2aa198", brightWhite: "#002b36",
  };
}
`;
