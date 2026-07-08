export const CSS_STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace;
    background: var(--bg);
    color: var(--fg);
    height: 100vh;
    overflow: hidden;
  }

  /* Screen reader only utility */
  .sr-only {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
  }

  /* Skip navigation link */
  .skip-link {
    position: absolute; top: -40px; left: 0; z-index: 10000;
    background: var(--accent); color: var(--bg); padding: 8px 16px;
    font-size: 14px; font-weight: 600; text-decoration: none;
    border-radius: 0 0 4px 0;
    transition: top 0.15s;
  }
  .skip-link:focus { top: 0; }

  /* Global focus indicators */
  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  button:focus-visible, [role="tab"]:focus-visible, [role="button"]:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  input:focus-visible, textarea:focus-visible, select:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 0;
  }

  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Live region for announcements */
  .aria-live-region {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
  }

  #app { display: contents; }

  /* Desktop app: title bar region for macOS hidden inset traffic lights */
  body.forge-desktop #topbar {
    padding-left: var(--traffic-light-clearance, 80px);
    -webkit-app-region: drag;
  }
  body.forge-desktop #topbar button,
  body.forge-desktop #topbar .topbar-logo {
    -webkit-app-region: no-drag;
  }
  body.forge-desktop #main-titlebar {
    height: 0;
  }

  /* Top bar — always visible, contains sidebar toggle */
  #app-layout {
    display: flex; flex-direction: column; height: 100vh; width: 100vw;
  }
  #app-body {
    display: flex; flex: 1; min-height: 0; overflow: hidden;
  }
  #topbar {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 12px; background: var(--bg-sidebar);
    border-bottom: 1px solid var(--border); flex-shrink: 0;
    height: 36px;
  }
  .topbar-toggle {
    background: none; border: none; color: var(--fg-dim); cursor: pointer;
    padding: 3px; display: flex; align-items: center; border-radius: 4px;
  }
  .topbar-toggle:hover { color: var(--accent); background: var(--active-bg); }
  .topbar-toggle.active { color: var(--accent); background: var(--bg-hover); }
  .topbar-toggle-right svg { transform: scaleX(-1); }
  .topbar-logo { width: 18px; height: 18px; border-radius: 3px; }
  .topbar-title { font-size: 13px; font-weight: 600; color: var(--accent); }

  #sidebar {
    width: 260px;
    min-width: 260px;
    background: var(--bg-sidebar);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
  }

  #topbar .spacer { flex: 1; }

  #auto-follow-btn {
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 4px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--fg-dim);
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
  }
  #auto-follow-btn.active { background: var(--badge-running); border-color: var(--green); color: #fff; }

  .tab-bar {
    display: flex;
    border-bottom: 1px solid var(--border);
    background: var(--bg-sidebar);
  }
  .tab-btn {
    flex: 1;
    padding: 8px 0;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    color: var(--fg-dim);
    cursor: pointer;
    border: none;
    background: transparent;
    border-bottom: 2px solid transparent;
    transition: all 0.15s;
  }
  .tab-btn:hover { color: var(--fg); }
  .tab-btn.active { color: var(--accent); border-bottom-color: var(--accent); }

  #terminals-panel, #chats-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 0;
  }

  .terminals-toolbar {
    display: flex;
    justify-content: flex-end;
    padding: 4px 8px 0;
  }
  .auto-follow-btn {
    background: none;
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--fg-dim);
    cursor: pointer;
    padding: 2px 6px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    transition: color 0.15s, border-color 0.15s;
  }
  .auto-follow-btn:hover { color: var(--fg); border-color: var(--fg-muted); }
  .auto-follow-btn.active { color: #fff; border-color: var(--green); background: var(--badge-running); }

  #session-list, #chat-list {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
  }

  .chat-search-wrap {
    position: relative;
    margin: 8px;
  }
  .chat-search-icon {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
  #chat-search {
    padding: 6px 28px 6px 28px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--fg-bright);
    font-size: 12px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.15s;
  }
  #chat-search:focus { border-color: var(--accent); }
  #chat-search::placeholder { color: var(--fg-muted); }
  .chat-search-clear {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--fg-dim);
    cursor: pointer;
    font-size: 11px;
    padding: 2px 4px;
    line-height: 1;
    border-radius: 3px;
  }
  .chat-search-clear:hover { color: var(--fg-bright); background: var(--active-bg); }
  .chat-search-status {
    padding: 6px 12px;
    color: var(--fg-dim);
    font-size: 11px;
  }

  .chat-source-toggle {
    display: flex;
    margin: 8px 8px 0;
    gap: 0;
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
  }
  .chat-source-btn {
    flex: 1;
    padding: 4px 0;
    background: var(--bg);
    border: none;
    color: var(--fg-dim);
    font-size: 11px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .chat-source-btn:hover { background: var(--active-bg); color: var(--fg-bright); }
  .chat-source-btn.active { background: var(--active-bg); color: var(--accent); font-weight: 600; }

  /* Drag handles */
  .drag-handle {
    flex-shrink: 0; width: 12px; display: flex; align-items: center;
    justify-content: center; color: var(--fg-muted); cursor: grab;
    opacity: 0; transition: opacity 0.15s, color 0.15s;
    padding: 2px 0;
  }
  .drag-handle:active { cursor: grabbing; }

  .session-item {
    padding: 10px 8px 10px 4px;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 4px;
    transition: background 0.15s;
    display: flex;
    align-items: center;
    gap: 6px;
    position: relative;
  }
  .session-item:hover .drag-handle { opacity: 1; }
  .session-item:hover .drag-handle:hover { color: var(--fg-dim); }
  .session-item:hover { background: var(--bg); }
  .session-item.active { background: var(--active-bg); }

  /* Session drag feedback */
  .session-item.dragging { opacity: 0.4; }
  .session-item.drop-before::before {
    content: ''; position: absolute; top: -2px; left: 8px; right: 8px;
    height: 2px; background: var(--accent); border-radius: 1px;
    box-shadow: 0 0 6px var(--accent)44;
  }
  .session-item.drop-after::after {
    content: ''; position: absolute; bottom: -2px; left: 8px; right: 8px;
    height: 2px; background: var(--accent); border-radius: 1px;
    box-shadow: 0 0 6px var(--accent)44;
  }

  /* Group drag feedback */
  .terminal-group-wrapper { position: relative; }
  .terminal-group-wrapper.dragging { opacity: 0.4; }
  .terminal-group-wrapper.drop-before::before {
    content: ''; position: absolute; top: -2px; left: 4px; right: 4px;
    height: 2px; background: var(--accent); border-radius: 1px; z-index: 10;
    box-shadow: 0 0 6px var(--accent)44;
  }
  .terminal-group-wrapper.drop-after::after {
    content: ''; position: absolute; bottom: -2px; left: 4px; right: 4px;
    height: 2px; background: var(--accent); border-radius: 1px; z-index: 10;
    box-shadow: 0 0 6px var(--accent)44;
  }

  .chat-project-group .drag-handle.group-drag-handle { opacity: 0; }
  .chat-project-group:hover .drag-handle.group-drag-handle { opacity: 1; }
  .chat-project-group:hover .drag-handle.group-drag-handle:hover { color: var(--fg-dim); }

  .session-item .status-dot {
    width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
  }
  .session-item .status-dot.running { background: var(--green); box-shadow: 0 0 4px var(--green)88; }
  .session-item .status-dot.exited { background: var(--fg-dim); }

  .session-item .done-icon {
    width: 18px; height: 18px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; cursor: default;
  }

  .session-item .blocked-icon {
    width: 18px; height: 18px; border-radius: 50%;
    background: var(--accent); color: var(--bg);
    font-size: 12px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; cursor: default;
    animation: dot-pulse 2s ease-in-out infinite;
  }

  @keyframes dot-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .session-item .session-info { flex: 1; min-width: 0; }
  .session-item .session-cmd {
    font-size: 13px; font-weight: 500; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis; color: var(--fg-bright);
    display: flex; align-items: center; gap: 6px;
  }
  .session-item .session-cmd .ram { font-size: 11px; color: var(--cyan); font-weight: 400; flex-shrink: 0; }
  .session-item .session-cmd .delegate-badge {
    font-size: 9px; font-weight: 500; padding: 1px 5px; border-radius: 3px;
    flex-shrink: 0; letter-spacing: 0.3px; line-height: 1.3;
  }
  .session-item .session-cmd .delegate-badge.oneshot {
    background: var(--active-bg); color: var(--fg-dim);
  }
  .session-item .session-cmd .delegate-badge.interactive {
    background: rgba(122, 162, 247, 0.15); color: var(--accent);
  }
  .session-item .session-meta {
    font-size: 11px; color: var(--fg-dim); font-family: monospace;
    display: flex; align-items: center; gap: 6px;
  }

  .session-item .close-btn {
    flex-shrink: 0; width: 20px; height: 20px; border-radius: 4px;
    border: none; background: transparent; color: var(--fg-dim);
    font-size: 14px; cursor: pointer; display: flex;
    align-items: center; justify-content: center; opacity: 0; transition: all 0.15s;
  }
  .session-item:hover .close-btn { opacity: 1; }
  .session-item .close-btn:focus-visible { opacity: 1; }
  .session-item .close-btn:hover { background: var(--red)22; color: var(--red); }

  .session-actions {
    position: relative; flex-shrink: 0;
  }
  .session-dots-btn {
    width: 20px; height: 20px; border-radius: 4px;
    border: none; background: transparent; color: var(--fg-dim);
    font-size: 14px; cursor: pointer; display: flex;
    align-items: center; justify-content: center; opacity: 0; transition: all 0.15s;
    line-height: 1;
  }
  .session-item:hover .session-dots-btn { opacity: 1; }
  .session-dots-btn:focus-visible { opacity: 1; }
  .session-dots-btn:hover { background: var(--active-bg); color: var(--fg-bright); }

  .session-menu {
    position: absolute; right: 0; top: 22px; z-index: 100;
    background: var(--bg); border: 1px solid var(--border); border-radius: 6px;
    padding: 4px; min-width: 120px; box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  }
  .session-menu-item {
    display: flex; align-items: center; gap: 6px;
    width: 100%; padding: 6px 8px; border: none; background: none;
    color: var(--fg); font-size: 12px; cursor: pointer; border-radius: 4px;
    text-align: left;
  }
  .session-menu-item:hover { background: var(--active-bg); color: var(--fg-bright); }
  .session-menu-item svg { flex-shrink: 0; }

  .session-name-text {
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    cursor: default; border-radius: 3px; padding: 0 2px; margin: -1px -2px;
  }
  .session-rename-input {
    background: none; border: none; border-bottom: 1px solid var(--accent)44;
    color: var(--fg-bright); font-size: 13px; font-weight: 500; font-family: inherit;
    padding: 0; margin: 0; line-height: inherit;
    outline: none; width: 100%; min-width: 0;
    caret-color: var(--accent); border-radius: 0;
  }
  .session-rename-input:focus {
    border-bottom-color: var(--accent);
  }

  .chat-item {
    padding: 8px 12px; border-radius: 6px; cursor: pointer;
    margin-bottom: 4px; transition: background 0.15s;
  }
  .chat-item:hover { background: var(--bg); }
  .chat-item.active { background: var(--active-bg); }
  .chat-item .chat-msg {
    font-size: 12px; color: var(--fg-bright); white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;
  }
  .chat-item .chat-meta {
    font-size: 11px; color: var(--fg-dim); display: flex;
    align-items: center; gap: 6px; margin-top: 2px;
  }
  .chat-item .close-btn {
    float: right; width: 18px; height: 18px; border-radius: 4px;
    border: none; background: transparent; color: var(--fg-dim);
    font-size: 13px; cursor: pointer; opacity: 0; transition: all 0.15s;
    display: inline-flex; align-items: center; justify-content: center;
  }
  .chat-item:hover .close-btn { opacity: 1; }
  .chat-item .close-btn:focus-visible { opacity: 1; }
  .chat-item .close-btn:hover { background: var(--red)22; color: var(--red); }

  .chat-project-group {
    font-size: 11px; font-weight: 600; color: var(--fg);
    padding: 8px 12px 6px; letter-spacing: 0.3px;
    display: flex; align-items: center; gap: 6px;
    cursor: pointer; user-select: none;
    border-bottom: 1px solid var(--border); margin-bottom: 4px;
    background: var(--bg); border-radius: 4px;
  }
  .chat-project-group:hover { background: var(--bg-hover); }
  .chat-project-group .chevron {
    font-size: 9px; color: var(--fg-dim); transition: transform 0.15s;
    flex-shrink: 0; width: 12px; text-align: center;
  }
  .chat-project-group .chevron.collapsed { transform: rotate(-90deg); }
  .chat-project-group .group-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .chat-project-group .group-stats {
    font-weight: 400; color: var(--fg-dim); font-size: 10px; flex-shrink: 0;
  }

  .chat-project-group .group-action-btn {
    flex-shrink: 0; width: 20px; height: 20px; border-radius: 4px;
    border: none; background: transparent; color: var(--fg-dim);
    font-size: 14px; cursor: pointer; display: flex;
    align-items: center; justify-content: center; opacity: 0; transition: all 0.15s;
    padding: 0; line-height: 1;
  }
  .chat-project-group:hover .group-action-btn { opacity: 1; }
  .chat-project-group .group-action-btn:focus-visible { opacity: 1; }
  .chat-project-group .group-action-btn:hover { background: var(--active-bg); color: var(--accent); }

  .group-copy-btn .check-icon { display: none; color: var(--green); font-size: 10px; white-space: nowrap; }
  .group-copy-btn .copy-icon { display: inline; }
  .group-copy-btn.copied .check-icon { display: inline; }
  .group-copy-btn.copied .copy-icon { display: none; }
  .group-copy-btn.copied { color: var(--green); opacity: 1; }

  .group-popover-anchor { display: flex; align-items: center; }

  .group-popover {
    position: absolute; top: 100%; right: 0; margin-top: 4px; z-index: 100;
    background: var(--bg-hover); border: 1px solid var(--border); border-radius: 6px;
    padding: 4px; min-width: 140px; box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  }
  .group-popover-item {
    display: flex; align-items: center; gap: 8px;
    width: 100%; padding: 6px 10px; border: none; background: transparent;
    color: var(--fg); font-size: 12px; cursor: pointer; border-radius: 4px;
    text-align: left; white-space: nowrap;
  }
  .group-popover-item:hover { background: var(--active-bg); color: var(--fg-bright); }
  .group-popover-item .agent-icon { flex-shrink: 0; }
  .group-popover-item .agent-icon.claude { color: var(--purple); }
  .group-popover-item .agent-icon.codex { color: var(--green); }
  .group-popover-item .agent-icon.gemini { color: var(--accent); }
  .group-popover-item .agent-icon.cursor { color: var(--yellow); }
  .group-popover-item .agent-icon.windsurf { color: #2ac3de; }
  .group-popover-item .agent-icon.copilot { color: var(--fg-bright); }
  .group-popover-item .agent-icon.deep-agents { color: #ff9e64; }
  .group-popover-divider { height: 1px; background: var(--active-bg); margin: 4px 6px; }

  #main {
    flex: 1; display: flex; flex-direction: column; height: 100%; min-width: 0; overflow: hidden;
  }

  #terminal-header {
    padding: 10px 16px; border-bottom: 1px solid var(--border);
    font-size: 13px; color: var(--fg-dim);
    display: flex; align-items: center; justify-content: space-between;
  }
  #terminal-header .session-label { color: var(--accent); font-weight: 500; }
  #terminal-header .header-time { font-size: 11px; color: var(--fg-dim); }

  .delegate-prompt-banner {
    padding: 10px 16px; border-bottom: 1px solid var(--border);
    background: var(--bg-hover);
  }
  .delegate-prompt-header {
    display: flex; align-items: center; gap: 8px; margin-bottom: 6px;
  }
  .delegate-agent-badge {
    font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 4px;
    display: inline-flex; align-items: center;
  }
  .delegate-agent-badge svg { width: 12px; height: 12px; }
  .delegate-mode-badge {
    font-size: 10px; font-weight: 500; padding: 1px 6px; border-radius: 3px;
    background: var(--active-bg); color: var(--fg-dim); text-transform: uppercase; letter-spacing: 0.5px;
  }
  .delegate-prompt-text {
    font-size: 13px; color: var(--fg-bright); line-height: 1.5;
    padding: 8px 12px; background: var(--bg-hover); border-radius: 6px;
    border-left: 3px solid var(--accent); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  .claude-badge {
    font-size: 11px; font-weight: 500; padding: 2px 8px; border-radius: 4px;
    margin-left: 8px; display: inline-flex; align-items: center; gap: 4px;
  }
  .claude-badge.waiting { background: rgba(122, 162, 247, 0.15); color: var(--accent); }
  .claude-badge.working { background: var(--badge-running); color: var(--green); }
  .claude-badge.permission { background: rgba(224, 175, 104, 0.15); color: var(--yellow); }

  .pulse-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--green);
    animation: pulse 1.5s ease-in-out infinite;
  }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

  #terminal-container { flex: 1; padding: 8px; min-height: 0; overflow: hidden; }

  #terminal-status-bar {
    display: flex; align-items: center; gap: 8px;
    padding: 4px 12px; border-top: 1px solid var(--border); background: var(--bg-sidebar);
    font-size: 11px; color: var(--fg-dim); font-family: monospace;
  }
  #terminal-status-bar .status-bar-item { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  #terminal-status-bar .status-bar-spacer { flex: 1; }
  #terminal-status-bar .status-badge {
    padding: 1px 6px; border-radius: 3px; font-size: 10px; font-weight: 500;
  }
  #terminal-status-bar .status-badge.running { background: var(--badge-running); color: var(--green); }
  #terminal-status-bar .status-badge.exited { background: var(--active-bg); color: var(--fg-dim); }
  #terminal-status-bar .activity-active { color: var(--green); font-size: 11px; }
  #terminal-status-bar .activity-idle { color: var(--fg-dim); font-size: 11px; }

  /* Voice input */
  .voice-btn {
    background: none; border: none; color: var(--fg-dim); cursor: pointer;
    padding: 2px 4px; display: flex; align-items: center; border-radius: 3px;
    transition: color 0.15s, background 0.15s;
  }
  .voice-btn:hover { color: var(--accent); background: var(--active-bg); }
  .voice-btn.recording { color: var(--red); background: rgba(247, 118, 142, 0.15); }
  .voice-btn.recording:hover { color: var(--red); background: rgba(247, 118, 142, 0.2); }
  .voice-btn.transcribing { color: var(--yellow); }
  .voice-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  @keyframes voice-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
  .voice-btn.recording svg { animation: voice-pulse 1s ease-in-out infinite; }
  @keyframes voice-spin { to { transform: rotate(360deg); } }
  .voice-spinner-svg { animation: voice-spin 1s linear infinite; transform-origin: center; }
  .voice-recording-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--red);
    margin-right: 4px; animation: voice-pulse 1s ease-in-out infinite;
  }
  .voice-error-msg {
    color: var(--red); font-size: 11px; margin-right: 8px;
    animation: voice-error-fade 4s ease-out forwards;
  }
  @keyframes voice-error-fade { 0% { opacity: 1; } 80% { opacity: 1; } 100% { opacity: 0; } }
  .voice-download-label {
    font-size: 10px; color: var(--yellow); margin-left: 4px; white-space: nowrap;
  }

  /* Voice download modal progress bar */
  .voice-progress-track {
    width: 100%; height: 6px; background: var(--active-bg); border-radius: 3px;
    overflow: hidden; margin-top: 4px;
  }
  .voice-progress-bar {
    height: 100%; background: linear-gradient(90deg, var(--accent), var(--green));
    border-radius: 3px; transition: width 0.3s ease;
  }
  .voice-progress-label {
    font-size: 11px; color: var(--fg-dim); margin-top: 6px; text-align: center;
  }

  /* Partial transcription preview during chunked recording */
  .voice-partial-text {
    font-size: 11px; color: var(--fg-dim); max-width: 200px; overflow: hidden;
    text-overflow: ellipsis; white-space: nowrap; margin-right: 6px;
  }

  #activity-log {
    max-height: 200px; overflow-y: auto; border-top: 1px solid var(--border);
    background: var(--bg-sidebar); font-size: 12px;
  }
  #activity-log-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 6px 12px; cursor: pointer; user-select: none;
    color: var(--fg-dim); font-size: 11px; font-weight: 600;
    border-top: 1px solid var(--border); background: var(--bg-sidebar);
  }
  #activity-log-header:hover { color: var(--fg); }
  .activity-event {
    padding: 4px 12px; display: flex; align-items: center; gap: 8px;
    color: var(--fg);
  }
  .activity-event .activity-icon { width: 16px; text-align: center; flex-shrink: 0; }
  .activity-event .activity-name { font-weight: 500; color: var(--fg-bright); }
  .activity-event .activity-detail { color: var(--fg-dim); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .activity-event .activity-time { color: var(--fg-muted); font-size: 10px; flex-shrink: 0; }
  .activity-event.error { color: var(--red); }

  /* Terminal split layout */
  .terminal-split { display: flex; flex: 1; min-height: 0; overflow: hidden; }
  .terminal-split-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .terminal-split-main #terminal-container { flex: 1; }

  /* Status bar button */
  .status-bar-btn {
    background: none; border: 1px solid var(--border); border-radius: 3px;
    color: var(--fg-dim); cursor: pointer; padding: 1px 5px;
    display: flex; align-items: center; margin-right: 4px;
  }
  .status-bar-btn:hover { color: var(--accent); border-color: var(--accent); }
  .status-bar-btn.active { color: var(--accent); background: var(--bg-hover); border-color: var(--accent); }

  /* Multi-line editor */
  .multiline-editor {
    border-top: 1px solid var(--border); background: var(--bg-sidebar);
    display: flex; flex-direction: column;
  }
  .multiline-editor-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 4px 12px; font-size: 11px; color: var(--fg-dim);
  }
  .multiline-editor-hint { font-size: 10px; color: var(--fg-dim); }
  .multiline-editor-textarea {
    background: var(--bg); color: var(--fg); border: none; outline: none;
    font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', Menlo, monospace;
    font-size: 14px; padding: 8px 12px; resize: none;
    min-height: 60px; max-height: 200px; line-height: 1.5;
  }
  .multiline-editor-textarea::placeholder { color: var(--fg-muted); }
  .multiline-editor-textarea:focus { background: var(--bg-hover); }

  /* Changes Panel */
  .cr-panel {
    width: 420px; min-width: 320px; max-width: 50vw;
    background: var(--bg-sidebar); border-left: 1px solid var(--border);
    display: flex; flex-direction: column; overflow: hidden;
  }
  .cr-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 8px 12px; border-bottom: 1px solid var(--border);
  }
  .cr-title { font-size: 13px; font-weight: 600; color: var(--fg-bright); }
  .cr-close {
    background: none; border: none; color: var(--fg-dim); cursor: pointer;
    font-size: 14px; padding: 2px 4px; border-radius: 3px;
  }
  .cr-close:hover { color: var(--red); background: var(--active-bg); }

  .cr-branch-bar {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 12px; border-bottom: 1px solid var(--border);
    font-size: 12px;
  }
  .cr-branch-icon { color: var(--accent); flex-shrink: 0; }
  .cr-branch-name { color: var(--accent); font-weight: 500; font-family: monospace; }
  .cr-ahead { color: var(--green); font-size: 11px; }
  .cr-behind { color: var(--red); font-size: 11px; }
  .cr-stats { color: var(--fg-dim); font-size: 11px; margin-left: auto; }

  .cr-filter-bar {
    display: flex; align-items: center; gap: 4px;
    padding: 6px 12px; border-bottom: 1px solid var(--border);
  }
  .cr-filter-btn {
    background: none; border: 1px solid var(--border); border-radius: 4px;
    color: var(--fg-dim); cursor: pointer; padding: 2px 8px; font-size: 11px;
  }
  .cr-filter-btn:hover { color: var(--fg); border-color: var(--fg-muted); }
  .cr-filter-btn.active { color: var(--accent); border-color: var(--accent); background: var(--bg-hover); }
  .cr-filter-spacer { flex: 1; }

  /* Generic small button */
  .cr-btn {
    background: none; border: 1px solid var(--border); border-radius: 3px;
    color: var(--fg-dim); cursor: pointer; padding: 1px 6px; font-size: 11px;
    white-space: nowrap;
  }
  .cr-btn:hover { color: var(--fg); border-color: var(--fg-muted); }
  .cr-btn:disabled { opacity: 0.4; cursor: default; }
  .cr-btn-stage { color: var(--green); border-color: var(--green)44; }
  .cr-btn-stage:hover { background: var(--green)22; }
  .cr-btn-unstage { color: var(--yellow); border-color: var(--yellow)44; }
  .cr-btn-unstage:hover { background: var(--yellow)22; }
  .cr-btn-discard { color: var(--red); border-color: var(--red)44; }
  .cr-btn-discard:hover { background: var(--red)22; }
  .cr-btn-stage-all { color: var(--green); }
  .cr-btn-unstage-all { color: var(--yellow); }
  .cr-btn-refresh { font-size: 14px; padding: 0 4px; }
  .cr-spin { display: inline-block; animation: cr-spin 0.5s linear; }
  @keyframes cr-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .cr-btn-commit {
    background: var(--accent)22; color: var(--accent); border-color: var(--accent)44;
    padding: 4px 12px; font-size: 12px; font-weight: 500;
  }
  .cr-btn-commit:hover { background: var(--accent)33; }
  .cr-btn-commit:disabled { opacity: 0.4; }
  .cr-btn-stash { color: var(--purple); border-color: var(--purple)44; }
  .cr-btn-stash:hover { background: var(--purple)22; }

  /* File list */
  .cr-file-list {
    flex: 1; overflow-y: auto;
  }
  .cr-file-list::-webkit-scrollbar { width: 6px; }
  .cr-file-list::-webkit-scrollbar-thumb { background: var(--active-bg); border-radius: 3px; }
  .cr-file-header {
    display: flex; align-items: center; gap: 6px;
    padding: 5px 12px; cursor: pointer; font-size: 12px;
    border-bottom: 1px solid var(--bg);
  }
  .cr-file-header:hover { background: var(--bg-hover); }
  .cr-file-chevron { color: var(--fg-dim); font-size: 9px; width: 12px; flex-shrink: 0; }
  .cr-file-status { font-weight: 600; font-family: monospace; font-size: 11px; width: 14px; flex-shrink: 0; text-align: center; }
  .cr-file-path { color: var(--fg); font-family: monospace; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .cr-new-badge, .cr-del-badge, .cr-rename-badge {
    font-size: 9px; padding: 1px 5px; border-radius: 3px;
    font-weight: 600; text-transform: uppercase; flex-shrink: 0;
  }
  .cr-new-badge { background: var(--green)22; color: var(--green); border: 1px solid var(--green)44; }
  .cr-del-badge { background: var(--red)22; color: var(--red); border: 1px solid var(--red)44; }
  .cr-rename-badge { background: var(--cyan)22; color: var(--cyan); border: 1px solid var(--cyan)44; }
  .cr-file-spacer { flex: 1; }
  .cr-empty-files { padding: 20px 12px; color: var(--fg-muted); font-size: 12px; text-align: center; }

  /* Diff viewer */
  .cr-diff {
    background: var(--bg); border-bottom: 1px solid var(--border);
    overflow-x: auto; font-family: monospace; font-size: 11px;
    max-height: 300px; overflow-y: auto;
  }
  .cr-diff::-webkit-scrollbar { width: 6px; height: 6px; }
  .cr-diff::-webkit-scrollbar-thumb { background: var(--active-bg); border-radius: 3px; }
  .cr-diff-inner { min-width: fit-content; }
  .cr-diff-line { display: flex; min-height: 18px; line-height: 18px; min-width: 100%; }
  .cr-diff-num {
    width: 40px; min-width: 40px; text-align: right; padding-right: 8px;
    color: var(--fg-muted); user-select: none; flex-shrink: 0;
  }
  .cr-diff-content {
    flex: 1; white-space: pre; padding-right: 8px;
  }
  .cr-diff-added { background: var(--green)15; color: var(--green); }
  .cr-diff-added .cr-diff-num { color: var(--green)66; }
  .cr-diff-removed { background: var(--red)15; color: var(--red); }
  .cr-diff-removed .cr-diff-num { color: var(--red)66; }
  .cr-diff-hunk { color: var(--accent); background: var(--accent)10; padding: 2px 0; }
  .cr-diff-meta { color: var(--fg-dim); }
  .cr-diff-loading { padding: 8px 12px; color: var(--fg-dim); font-size: 11px; }

  /* Commit section */
  .cr-commit-section {
    padding: 8px 12px; border-top: 1px solid var(--border);
  }
  .cr-commit-input {
    width: 100%; background: var(--bg); border: 1px solid var(--border);
    border-radius: 4px; padding: 6px 10px; color: var(--fg-bright);
    font-size: 12px; font-family: monospace; outline: none;
    resize: vertical; min-height: 42px;
  }
  .cr-commit-input:focus { border-color: var(--accent); }
  .cr-commit-input::placeholder { color: var(--fg-muted); }
  .cr-commit-actions {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 6px;
  }
  .cr-commit-staged { font-size: 11px; color: var(--fg-dim); }
  .cr-commit-result {
    margin-top: 4px; font-size: 11px; padding: 4px 8px;
    border-radius: 3px;
  }
  .cr-commit-result.success { background: var(--green)22; color: var(--green); }
  .cr-commit-result.error { background: var(--red)22; color: var(--red); }

  /* Stash bar */
  .cr-stash-bar {
    display: flex; gap: 6px; padding: 6px 12px; border-top: 1px solid var(--border);
  }

  .cr-loading, .cr-error, .cr-empty {
    padding: 20px 12px; color: var(--fg-dim); font-size: 12px; text-align: center;
  }
  .cr-error { color: var(--red); }
  .cr-retry {
    display: block; margin: 8px auto; background: none;
    border: 1px solid var(--border); border-radius: 4px;
    color: var(--accent); cursor: pointer; padding: 4px 12px; font-size: 12px;
  }

  #chat-viewer {
    flex: 1; overflow-y: auto; padding: 16px;
    display: flex; flex-direction: column; gap: 12px;
  }
  .chat-bubble {
    max-width: 85%; padding: 10px 14px; border-radius: 10px;
    font-size: 13px; line-height: 1.5; white-space: pre-wrap; word-break: break-word;
  }
  .chat-bubble.human { align-self: flex-end; background: var(--active-bg); color: var(--fg-bright); border-bottom-right-radius: 4px; }
  .chat-bubble.assistant { align-self: flex-start; background: var(--bg-hover); color: var(--fg); border-bottom-left-radius: 4px; }
  .chat-bubble.system {
    align-self: center; background: transparent; color: var(--fg-muted);
    border: 1px dashed var(--border); font-size: 11px; max-width: 95%;
    padding: 6px 12px; font-family: monospace; opacity: 0.7; cursor: pointer;
  }
  .chat-bubble.system:hover { opacity: 1; border-color: var(--fg-muted); }
  .chat-bubble.system .system-summary { display: flex; align-items: center; gap: 6px; }
  .chat-bubble.system .system-chevron { font-size: 8px; transition: transform 0.15s; }
  .chat-bubble.system .system-chevron.open { transform: rotate(90deg); }
  .chat-bubble.system .system-full {
    display: none; margin-top: 6px; padding-top: 6px;
    border-top: 1px dashed var(--border); white-space: pre-wrap; word-break: break-word;
    max-height: 200px; overflow-y: auto; font-size: 10px; color: var(--fg-dim);
  }
  .chat-bubble.system .system-full.visible { display: block; }
  .chat-bubble .tool-block {
    background: var(--bg); border: 1px solid var(--border); border-radius: 4px;
    padding: 6px 8px; margin: 4px 0; font-family: monospace; font-size: 12px;
    color: var(--accent);
  }
  .chat-header-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 16px; border-bottom: 1px solid var(--border);
  }
  .chat-header-bar .continue-btn {
    background: var(--accent); border: none; border-radius: 4px;
    color: var(--bg); padding: 5px 12px; font-size: 12px; font-weight: 600;
    cursor: pointer;
  }
  .chat-header-bar .continue-btn:hover { background: var(--accent-hover); }

  #empty-state {
    flex: 1; display: flex; align-items: center; justify-content: center;
    color: var(--fg-dim); font-size: 14px; flex-direction: column; gap: 8px;
  }
  #empty-state .hint { font-size: 12px; color: var(--fg-muted); }

  #connection-status {
    padding: 8px 16px; border-top: 1px solid var(--border);
    font-size: 11px; display: flex; align-items: center; gap: 6px;
  }
  #connection-status .dot { width: 6px; height: 6px; border-radius: 50%; }
  #connection-status .dot.connected { background: var(--green); }
  #connection-status .dot.disconnected { background: var(--red); }

  #session-list::-webkit-scrollbar, #chat-list::-webkit-scrollbar, #activity-log::-webkit-scrollbar, #chat-viewer::-webkit-scrollbar { width: 4px; }
  #session-list::-webkit-scrollbar-track, #chat-list::-webkit-scrollbar-track, #activity-log::-webkit-scrollbar-track, #chat-viewer::-webkit-scrollbar-track { background: transparent; }
  #session-list::-webkit-scrollbar-thumb, #chat-list::-webkit-scrollbar-thumb, #activity-log::-webkit-scrollbar-thumb, #chat-viewer::-webkit-scrollbar-thumb { background: var(--active-bg); border-radius: 2px; }

  .modal-overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.6); display: flex;
    align-items: center; justify-content: center; z-index: 1000;
  }
  .modal-box {
    background: var(--bg-hover); border: 1px solid var(--border); border-radius: 8px;
    padding: 20px 24px; min-width: 320px; max-width: 440px; width: 90vw;
  }
  .modal-box h3 { font-size: 14px; color: var(--fg-bright); margin-bottom: 8px; font-weight: 600; }
  .modal-box p { font-size: 12px; color: var(--fg-dim); margin-bottom: 16px; }
  .modal-actions { display: flex; justify-content: flex-end; gap: 8px; }
  .modal-actions button {
    padding: 6px 14px; border-radius: 4px; font-size: 12px;
    cursor: pointer; border: 1px solid var(--border); font-weight: 500;
  }
  .modal-actions .modal-cancel {
    background: transparent; color: var(--fg); border-color: var(--fg-muted);
  }
  .modal-actions .modal-cancel:hover { background: var(--active-bg); }
  .modal-actions .modal-delete {
    background: var(--red)22; color: var(--red); border-color: var(--red)44;
  }
  .modal-actions .modal-delete:hover { background: var(--red)33; }
  .modal-actions .modal-create {
    background: var(--accent)22; color: var(--accent); border-color: var(--accent)44;
  }
  .modal-actions .modal-create:hover { background: var(--accent)33; }
  .modal-field { margin-bottom: 12px; }
  .modal-field label { display: block; font-size: 11px; color: var(--fg-dim); margin-bottom: 4px; font-weight: 500; }
  .modal-field input {
    width: 100%; background: var(--bg); border: 1px solid var(--border);
    border-radius: 4px; padding: 6px 10px; color: var(--fg-bright);
    font-size: 12px; outline: none; font-family: monospace;
  }
  .modal-field input:focus { border-color: var(--accent); }
  .modal-field input::placeholder { color: var(--fg-muted); }

  /* CWD input row with browse button */
  .cwd-input-row { display: flex; gap: 6px; align-items: center; }
  .cwd-input-row input { flex: 1; }
  .cwd-browse-btn {
    background: var(--active-bg); border: 1px solid var(--scrollbar); border-radius: 4px;
    color: var(--accent); cursor: pointer; padding: 5px 8px; display: flex;
    align-items: center; flex-shrink: 0; transition: all 0.15s;
  }
  .cwd-browse-btn:hover, .cwd-browse-btn.active { background: var(--bg-hover); border-color: var(--accent); }
  .cwd-error { color: var(--red); font-size: 11px; margin-top: 4px; }

  /* Broadcast modal */
  .broadcast-modal { max-width: 500px; }
  .broadcast-textarea {
    width: 100%; background: var(--bg); border: 1px solid var(--border);
    border-radius: 4px; padding: 8px 10px; color: var(--fg-bright);
    font-size: 12px; font-family: monospace; outline: none;
    resize: vertical; min-height: 60px;
  }
  .broadcast-textarea:focus { border-color: var(--accent); }
  .broadcast-textarea::placeholder { color: var(--fg-muted); }
  .broadcast-checkbox-label {
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; color: var(--fg); cursor: pointer;
  }
  .broadcast-checkbox-label input[type="checkbox"] {
    accent-color: var(--accent);
  }
  .broadcast-mode-tabs {
    display: flex; gap: 0; border: 1px solid var(--border); border-radius: 4px; overflow: hidden;
  }
  .broadcast-mode-btn {
    flex: 1; padding: 5px 8px; background: var(--bg); border: none;
    color: var(--fg-dim); font-size: 11px; cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .broadcast-mode-btn:not(:last-child) { border-right: 1px solid var(--border); }
  .broadcast-mode-btn:hover { background: var(--active-bg); color: var(--fg-bright); }
  .broadcast-mode-btn.active { background: var(--active-bg); color: var(--accent); font-weight: 600; }
  .broadcast-tag-list { display: flex; flex-wrap: wrap; gap: 4px; }
  .broadcast-tag {
    padding: 3px 8px; border-radius: 4px; font-size: 11px;
    background: var(--bg); border: 1px solid var(--border); color: var(--fg);
    cursor: pointer; transition: all 0.15s;
  }
  .broadcast-tag:hover { border-color: var(--accent); color: var(--accent); }
  .broadcast-tag.active { background: var(--accent)22; border-color: var(--accent); color: var(--accent); }
  .broadcast-session-list {
    max-height: 180px; overflow-y: auto; border: 1px solid var(--border);
    border-radius: 4px; background: var(--bg);
  }
  .broadcast-session-row {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 10px; cursor: pointer; font-size: 12px;
    transition: background 0.1s;
  }
  .broadcast-session-row:hover { background: var(--active-bg); }
  .broadcast-session-row input[type="checkbox"] { accent-color: var(--accent); flex-shrink: 0; }
  .broadcast-session-name { color: var(--fg-bright); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .broadcast-session-id { color: var(--fg-muted); font-size: 10px; font-family: monospace; }
  .broadcast-target-summary {
    padding: 6px 0; font-size: 11px; color: var(--fg-dim);
  }
  .broadcast-hint { font-size: 11px; color: var(--fg-muted); padding: 4px 0; }
  .broadcast-sent {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 24px 0; font-size: 14px; color: var(--green);
  }
  .broadcast-sent-icon {
    display: flex; align-items: center; justify-content: center;
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--green)22; font-size: 16px; font-weight: bold;
  }
  .topbar-toggle.hidden { display: none; }

  /* Folder tree browser (ForkLift-style) */
  .folder-tree {
    background: #13141c; border: 1px solid var(--border); border-radius: 6px;
    margin-bottom: 12px; overflow: hidden;
  }
  .ft-header {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 8px; border-bottom: 1px solid var(--border);
    background: var(--bg); min-height: 30px;
  }
  .ft-header-path {
    font-size: 11px; color: var(--accent); font-family: monospace;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;
  }
  .ft-header-icon { color: var(--accent); display: flex; align-items: center; }
  .ft-header-name {
    font-size: 12px; color: var(--fg-bright); font-weight: 600; flex: 1;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .ft-header-count { font-size: 10px; color: var(--fg-dim); white-space: nowrap; }
  .ft-back-btn {
    background: none; border: 1px solid var(--scrollbar); border-radius: 4px;
    color: var(--accent); cursor: pointer; padding: 2px 5px; display: flex;
    align-items: center; flex-shrink: 0;
  }
  .ft-back-btn:hover { background: var(--active-bg); }
  .ft-back-btn:disabled { opacity: 0.3; cursor: default; }
  .ft-scroll {
    max-height: 260px; overflow-y: auto; padding: 4px 0;
  }
  .ft-scroll::-webkit-scrollbar { width: 6px; }
  .ft-scroll::-webkit-scrollbar-track { background: transparent; }
  .ft-scroll::-webkit-scrollbar-thumb { background: var(--active-bg); border-radius: 3px; }
  .ft-scroll::-webkit-scrollbar-thumb:hover { background: var(--scrollbar); }

  .ft-row {
    display: flex; align-items: center; gap: 4px;
    padding: 3px 8px; cursor: pointer; user-select: none;
    font-size: 12px; color: var(--fg-bright); border-radius: 4px;
    margin: 0 4px; min-height: 24px;
  }
  .ft-row:hover { background: var(--bg-hover); }
  .ft-selected { background: #264f78 !important; color: #fff; }
  .ft-selected .ft-folder-icon { color: var(--cyan); }

  .ft-chevron-wrap {
    width: 14px; height: 14px; display: flex;
    align-items: center; justify-content: center; flex-shrink: 0;
  }
  .ft-chevron { color: var(--fg-dim); transition: transform 0.12s; }
  .ft-chevron.open { color: var(--accent); }

  .ft-row-body {
    display: flex; align-items: center; gap: 4px; flex: 1;
    overflow: hidden;
  }
  .ft-folder-icon { color: var(--accent); flex-shrink: 0; }

  .ft-name {
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
    font-size: 12px; line-height: 1;
  }

  .ft-loading, .ft-empty {
    font-size: 11px; color: var(--fg-dim); padding: 4px 8px;
  }

  #new-terminal-btn {
    font-size: 16px; line-height: 1; padding: 2px 6px; border-radius: 4px;
    border: 1px solid var(--border); background: transparent; color: var(--fg-dim);
    cursor: pointer; transition: all 0.15s;
  }
  #new-terminal-btn:hover { background: var(--active-bg); color: var(--accent); border-color: var(--accent); }

  .hidden { display: none !important; }

  @keyframes spin { to { transform: rotate(360deg); } }
  .chat-spinner {
    display: inline-block; width: 12px; height: 12px;
    border: 2px solid var(--border); border-top-color: var(--accent);
    border-radius: 50%; animation: spin 0.6s linear infinite;
  }

  /* Split Pane Layout */
  .split-pane-layout {
    flex: 1; display: flex; flex-direction: column;
    min-height: 0; min-width: 0; overflow: hidden;
  }
  .split-pane { position: relative; }
  .split-pane-focused { box-shadow: inset 0 0 0 1px var(--accent)33; }

  /* Pane Tab Bar */
  .pane-tab-bar {
    display: flex; align-items: center; gap: 4px;
    padding: 0 8px; background: var(--bg-sidebar);
    border-bottom: 1px solid var(--border);
    font-size: 11px; color: var(--fg-dim);
    height: 26px; flex-shrink: 0;
    cursor: pointer; user-select: none;
  }
  .pane-tab-focused {
    background: var(--bg-hover);
    border-bottom-color: var(--accent);
  }
  .pane-tab-label {
    flex: 1; overflow: hidden; text-overflow: ellipsis;
    white-space: nowrap; color: var(--fg-dim); font-size: 11px;
  }
  .pane-tab-focused .pane-tab-label { color: var(--accent); font-weight: 500; }
  .pane-tab-actions { display: flex; gap: 1px; flex-shrink: 0; }
  .pane-tab-btn {
    background: none; border: none; color: var(--fg-dim); cursor: pointer;
    padding: 2px 3px; display: flex; align-items: center;
    border-radius: 3px; opacity: 0; transition: all 0.15s;
    font-size: 13px; line-height: 1;
  }
  .pane-tab-bar:hover .pane-tab-btn { opacity: 1; }
  .pane-tab-btn:focus-visible { opacity: 1; }
  .pane-tab-btn:hover { color: var(--accent); background: var(--active-bg); }
  .pane-tab-close:hover { color: var(--red); background: var(--red)22; }

  /* Pane Terminal */
  .pane-terminal-wrap {
    flex: 1; min-height: 0; display: flex;
    flex-direction: column; overflow: hidden;
  }
  .pane-terminal-xterm {
    flex: 1; padding: 4px; min-height: 0; overflow: hidden;
  }
  .log-view {
    flex: 1; min-height: 0; overflow-y: auto;
    background: var(--bg); color: var(--fg);
    font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', Menlo, monospace;
    font-size: 14px; padding: 8px 12px;
  }
  .log-line {
    white-space: pre-wrap; word-break: break-all;
    min-height: 1.2em;
  }
  .log-line.hl-error { background: var(--hl-error-bg); border-left: 3px solid var(--red); padding-left: 9px; }
  .log-line.hl-warn { background: var(--hl-warn-bg); border-left: 3px solid var(--yellow); padding-left: 9px; }
  .log-line.hl-debug { opacity: 0.55; }

  /* Pane Empty State */
  .pane-empty {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 8px; color: var(--fg-muted);
  }
  .pane-empty-text { font-size: 13px; color: var(--fg-dim); }
  .pane-empty-hint { font-size: 11px; color: var(--fg-muted); }
  .pane-empty-dragover {
    background: var(--accent)0a;
    box-shadow: inset 0 0 0 2px var(--accent)44;
  }
  .pane-empty-dragover .pane-empty-text { color: var(--accent); }

  /* Drag-to-split drop zone overlay */
  .pane-drop-overlay {
    background: var(--accent)18;
    border: 2px solid var(--accent)66;
    border-radius: 4px;
    transition: opacity 0.1s;
  }

  /* Split Dividers */
  .split-divider {
    flex-shrink: 0; z-index: 10; position: relative;
    transition: background 0.15s;
  }
  .split-divider-h {
    width: 3px; cursor: col-resize; background: var(--active-bg);
  }
  .split-divider-v {
    height: 3px; cursor: row-resize; background: var(--active-bg);
  }
  .split-divider:hover, .split-divider.dragging { background: var(--accent); }
  .split-divider::after {
    content: ''; position: absolute;
  }
  .split-divider-h::after {
    top: 0; bottom: 0; left: -3px; right: -3px;
  }
  .split-divider-v::after {
    left: 0; right: 0; top: -3px; bottom: -3px;
  }

  /* Settings modal */
  .settings-modal { max-width: 520px; max-height: 85vh; overflow-y: auto; }
  .settings-modal code {
    font-size: 11px; background: var(--bg); padding: 2px 6px;
    border-radius: 3px; color: var(--accent); font-family: monospace;
  }
  .settings-section { margin-bottom: 16px; }
  .settings-section-title {
    font-size: 11px; color: var(--accent); font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.05em;
    margin-bottom: 8px; padding-bottom: 4px;
    border-bottom: 1px solid var(--border);
  }
  .settings-source {
    font-size: 9px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.05em; margin-left: 6px;
    padding: 1px 4px; border-radius: 3px; background: var(--bg);
  }
  .settings-hint {
    font-size: 10px; color: var(--fg-dim); margin-top: 2px;
  }
  .settings-save-msg {
    font-size: 11px; color: var(--green); margin-right: auto;
    display: flex; align-items: center;
  }
  .settings-modal .modal-field input:disabled {
    opacity: 0.5; cursor: not-allowed;
  }
  .settings-modal .modal-field input[type="number"] {
    -moz-appearance: textfield;
  }
  .settings-modal .modal-field input[type="number"]::-webkit-inner-spin-button,
  .settings-modal .modal-field input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none; margin: 0;
  }

  /* Floating attention indicator */
  .floating-attention {
    position: fixed; bottom: 24px; right: 24px; z-index: 1000;
    display: flex; align-items: center; gap: 8px;
    padding: 8px 14px; border-radius: 20px;
    background: var(--bg-hover); border: 1px solid var(--accent);
    color: var(--fg-bright); cursor: pointer; font-family: inherit; font-size: inherit;
    box-shadow: 0 0 12px var(--accent)44, 0 4px 16px #00000066;
    animation: attention-glow 2s ease-in-out infinite;
    transition: transform 0.15s, box-shadow 0.15s;
    font-size: 13px; font-weight: 500;
    user-select: none;
  }
  .floating-attention:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px var(--accent)88, 0 6px 20px #00000088;
  }
  .floating-attention-icon {
    width: 22px; height: 22px; border-radius: 50%;
    background: var(--accent); color: var(--bg);
    font-size: 14px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .floating-attention-count {
    position: absolute; top: -6px; right: -6px;
    min-width: 18px; height: 18px; border-radius: 9px;
    background: var(--red); color: #fff;
    font-size: 11px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    padding: 0 4px;
  }
  @keyframes attention-glow {
    0%, 100% { box-shadow: 0 0 12px var(--accent)44, 0 4px 16px #00000066; }
    50% { box-shadow: 0 0 20px var(--accent)77, 0 4px 16px #00000066; }
  }
`;
