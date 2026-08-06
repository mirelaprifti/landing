/**
 * Build-time TypeScript highlighter for the API reference.
 *
 * Emits the site-wide GitHub color scheme via tok-* classes (globals.css)
 * instead of Shiki's per-token inline dual-theme styles. On large docgen
 * pages this halves the HTML weight: only keywords/strings/numbers/comments
 * get a span, and a class attribute is far smaller than two inline colors.
 */

const TS_KEYWORDS = new Set([
	"import",
	"from",
	"export",
	"const",
	"let",
	"var",
	"function",
	"return",
	"if",
	"else",
	"throw",
	"new",
	"type",
	"interface",
	"extends",
	"implements",
	"readonly",
	"typeof",
	"keyof",
	"in",
	"out",
	"as",
	"async",
	"await",
	"yield",
	"declare",
	"namespace",
	"never",
	"unknown",
	"any",
	"void",
	"null",
	"undefined",
	"true",
	"false",
	"this",
]);

const TOKEN_PATTERN =
	/(\/\/.*$|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(\d[\w.]*)\b|\b([A-Za-z_$][\w$]*)\b/gm;

function escapeHtml(s: string): string {
	return s
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
}

/** Highlight TypeScript source, returning HTML for use with set:html. */
export function highlightTokHtml(code: string): string {
	let out = "";
	let last = 0;
	for (const m of code.matchAll(TOKEN_PATTERN)) {
		const index = m.index ?? 0;
		if (index > last) out += escapeHtml(code.slice(last, index));
		const [full, comment, str, num, word] = m;
		if (comment) {
			out += `<span class="tok-comment">${escapeHtml(comment)}</span>`;
		} else if (str) {
			out += `<span class="tok-string">${escapeHtml(str)}</span>`;
		} else if (num) {
			out += `<span class="tok-constant">${escapeHtml(num)}</span>`;
		} else if (word && TS_KEYWORDS.has(word)) {
			out += `<span class="tok-keyword">${escapeHtml(word)}</span>`;
		} else {
			out += escapeHtml(full);
		}
		last = index + full.length;
	}
	if (last < code.length) out += escapeHtml(code.slice(last));
	return out;
}
