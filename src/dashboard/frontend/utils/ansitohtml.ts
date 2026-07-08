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

// Grep Console-style pattern highlighting
var _GREP_RULES = [
  { pattern: "\\\\bERROR\\\\b", style: "color:#f7768e;font-weight:bold" },
  { pattern: "\\\\bWARN(?:ING)?\\\\b", style: "color:#e0af68;font-weight:bold" },
  { pattern: "\\\\bINFO\\\\b", style: "color:#7dcfff" },
  { pattern: "\\\\bDEBUG\\\\b", style: "color:#565f89" },
  { pattern: "\\\\bTRACE\\\\b", style: "color:#565f89" },
  { pattern: "\\\\bException\\\\b", style: "color:#f7768e;font-weight:bold" },
  { pattern: "\\\\bCaused by:\\\\b", style: "color:#f7768e;font-weight:bold" },
  { pattern: "\\\\bError:\\\\b", style: "color:#f7768e;font-weight:bold" },
  { pattern: "\\\\bSELECT\\\\b", style: "color:#7aa2f7" },
  { pattern: "\\\\bINSERT\\\\b", style: "color:#7aa2f7" },
  { pattern: "\\\\bUPDATE\\\\b", style: "color:#7aa2f7" },
  { pattern: "\\\\bDELETE\\\\b", style: "color:#f7768e" },
  { pattern: "\\\\bFROM\\\\b", style: "color:#7aa2f7" },
  { pattern: "\\\\bWHERE\\\\b", style: "color:#7aa2f7" },
  { pattern: "\\\\bSET\\\\b", style: "color:#7aa2f7" },
  { pattern: "\\\\bORDER BY\\\\b", style: "color:#7aa2f7" },
  { pattern: "\\\\bVALUES\\\\b", style: "color:#7aa2f7" },
  { pattern: "\\\\btrue\\\\b", style: "color:#9ece6a" },
  { pattern: "\\\\bfalse\\\\b", style: "color:#f7768e" },
  { pattern: "\\\\bnull\\\\b", style: "color:#565f89" },
];

// Line-level highlighting: apply CSS class based on log level
function _lineLevelClass(line) {
  if (line.indexOf(" ERROR ") >= 0 || line.indexOf("Exception") >= 0 || line.indexOf(" Error:") >= 0) return " hl-error";
  if (line.indexOf(" WARN") >= 0) return " hl-warn";
  if (line.indexOf(" DEBUG ") >= 0 || line.indexOf(" TRACE ") >= 0) return " hl-debug";
  return "";
}

function _grepHighlight(html) {
  for (var r = 0; r < _GREP_RULES.length; r++) {
    var rule = _GREP_RULES[r];
    var pattern = rule.pattern;
    try {
      // Split by HTML tags, process only text segments
      var parts = html.split(/(<span[^>]*>|<\\/span>)/g);
      var result = "";
      for (var p = 0; p < parts.length; p++) {
        if (parts[p].length > 0 && parts[p].charAt(0) === '<') {
          result += parts[p];
        } else {
          result += parts[p].replace(new RegExp(pattern, "g"), '<span style="' + rule.style + '">$&</span>');
        }
      }
      html = result;
    } catch(e) {
      // Skip invalid regex
    }
  }
  return html;
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
    var lineClass = _lineLevelClass(line);
    var html = _ansiLineToHtml(line);
    html = _grepHighlight(html);
    out += '<div class="log-line' + lineClass + '">' + html + '</div>';
  }
  return out;
}
`;
