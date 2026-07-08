export const ANSI_HTML_JS = `
var _ANSI_PALETTE = { 30: "#15161e", 31: "#f7768e", 32: "#9ece6a", 33: "#e0af68", 34: "#7aa2f7", 35: "#bb9af7", 36: "#7dcfff", 37: "#a9b1d6", 90: "#414868", 91: "#f7768e", 92: "#9ece6a", 93: "#e0af68", 94: "#7aa2f7", 95: "#bb9af7", 96: "#7dcfff", 97: "#c0caf5" };

function _escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function _ansiBuildTag(codes, text) {
  if (!text) return "";
  var css = [];
  var fg = -1, bg = -1;
  for (var i = 0; i < codes.length; i++) {
    var c = codes[i];
    if (c === 0) { fg = -1; bg = -1; css = []; }
    else if (c === 1) { css.push("font-weight:bold"); }
    else if (c === 4) { css.push("text-decoration:underline"); }
    else if (c >= 30 && c <= 37) { fg = c; }
    else if (c >= 40 && c <= 47) { bg = c; }
    else if (c >= 90 && c <= 97) { fg = c; }
    else if (c >= 100 && c <= 107) { bg = c; }
  }
  if (fg >= 0) css.push("color:" + (_ANSI_PALETTE[fg] || "#a9b1d6"));
  if (bg >= 0) css.push("background-color:" + (_ANSI_PALETTE[bg - 10] || "transparent"));
  if (css.length === 0) return _escapeHtml(text);
  return '<span style="' + css.join(";") + '">' + _escapeHtml(text) + '</span>';
}

function ansiToHtml(ansi) {
  if (!ansi) return "";
  var out = [];
  var currentCodes = [];
  var textBuf = "";
  var ESC = String.fromCharCode(27);
  var inCsi = false;
  var csiBuf = "";

  function flush() {
    if (textBuf) { out.push(_ansiBuildTag(currentCodes, textBuf)); textBuf = ""; }
  }

  for (var i = 0; i < ansi.length; i++) {
    var ch = ansi[i];
    if (inCsi) {
      if ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z')) {
        inCsi = false;
        if (ch === 'm') {
          flush();
          if (csiBuf === "" || csiBuf === "0") { currentCodes = []; }
          else {
            var parts = csiBuf.split(";");
            var valid = [];
            for (var p = 0; p < parts.length; p++) { var n = Number(parts[p]); if (!isNaN(n)) valid.push(n); }
            if (valid.indexOf(0) >= 0) { currentCodes = valid; }
            else { currentCodes = currentCodes.concat(valid); }
          }
        }
        csiBuf = "";
      } else {
        csiBuf += ch;
      }
      continue;
    }
    if (ch === ESC) {
      flush();
      inCsi = false;
      csiBuf = "";
      // Peek: if next char is '[' then enter CSI mode
      if (i + 1 < ansi.length && ansi[i + 1] === '[') {
        inCsi = true;
        csiBuf = "";
        i++;
      } else {
        // Non-CSI escape, skip until next ESC or end
        while (i + 1 < ansi.length && ansi[i + 1] !== ESC) i++;
      }
      continue;
    }
    if (ch === '\\r') { flush(); out.push('</div><div class="log-line">'); continue; }
    if (ch === '\\n') { flush(); out.push('</div><div class="log-line">'); continue; }
    textBuf += ch;
  }
  flush();
  return '<div class="log-line">' + out.join("") + '</div>';
}
`;
