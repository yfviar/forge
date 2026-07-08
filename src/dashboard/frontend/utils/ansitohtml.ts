export const ANSI_HTML_JS = `
var _ANSI_PALETTE = { 30: "#15161e", 31: "#f7768e", 32: "#9ece6a", 33: "#e0af68", 34: "#7aa2f7", 35: "#bb9af7", 36: "#7dcfff", 37: "#a9b1d6", 90: "#414868", 91: "#f7768e", 92: "#9ece6a", 93: "#e0af68", 94: "#7aa2f7", 95: "#bb9af7", 96: "#7dcfff", 97: "#c0caf5" };

function _escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function _ansiLineToHtml(line) {
  if (!line) return "";
  var out = "";
  var codes = [];
  var i = 0;
  while (i < line.length) {
    var ch = line[i];
    // Check for CSI sequence: ESC [
    if (ch === String.fromCharCode(27) && i + 1 < line.length && line[i + 1] === '[') {
      i += 2;
      // Read CSI parameter bytes until terminal character
      var csiStart = i;
      while (i < line.length && (line[i] < 'A' || line[i] > 'Z') && (line[i] < 'a' || line[i] > 'z')) i++;
      var term = i < line.length ? line[i] : '';
      if (term) i++;
      if (term === 'm') {
        // SGR sequence — parse parameters
        var buf = line.substring(csiStart, i - 1);
        if (buf === "" || buf === "0") { codes = []; }
        else {
          var parts = buf.split(";");
          for (var p = 0; p < parts.length; p++) {
            var n = Number(parts[p]);
            if (!isNaN(n)) {
              if (n === 0) codes = [];
              else codes.push(n);
            }
          }
        }
      }
      // Non-SGR CSI sequences are silently skipped
      continue;
    }
    // Build style for current codes
    var css = [];
    var fg = -1, bg = -1;
    for (var c = 0; c < codes.length; c++) {
      var code = codes[c];
      if (code === 1) css.push("font-weight:bold");
      else if (code === 4) css.push("text-decoration:underline");
      else if (code >= 30 && code <= 37) fg = code;
      else if (code >= 40 && code <= 47) bg = code;
      else if (code >= 90 && code <= 97) fg = code;
      else if (code >= 100 && code <= 107) bg = code;
    }
    if (fg >= 0) css.push("color:" + (_ANSI_PALETTE[fg] || "#a9b1d6"));
    if (bg >= 0) css.push("background-color:" + (_ANSI_PALETTE[bg - 10] || "transparent"));
    if (css.length > 0) {
      out += '<span style="' + css.join(";") + '">' + _escapeHtml(ch) + '</span>';
    } else {
      out += _escapeHtml(ch);
    }
    i++;
  }
  return out;
}

var _ansiPending = "";

function ansiToHtml(data) {
  if (!data) return "";
  _ansiPending += data;
  // Only process complete lines (ending with \\n)
  var newlineIdx = _ansiPending.lastIndexOf('\\n');
  if (newlineIdx < 0) return ""; // no complete line yet
  
  var lines = _ansiPending.substring(0, newlineIdx + 1).split('\\n');
  _ansiPending = _ansiPending.substring(newlineIdx + 1);
  
  var out = "";
  for (var l = 0; l < lines.length; l++) {
    var line = lines[l];
    if (!line && line !== '0') continue; // skip empty
    // Strip \\r from line endings and any remaining control chars
    while (line.length > 0 && line.charCodeAt(line.length - 1) === 13) line = line.substring(0, line.length - 1);
    if (!line) continue;
    // Strip OSC sequences (ESC ] ... BEL)
    line = line.replace(/\\x1b\\][^\\x07]*\\x07/g, '');
    var html = _ansiLineToHtml(line);
    out += '<div class="log-line">' + html + '</div>';
  }
  return out;
}
`;
