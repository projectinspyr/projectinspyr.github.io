export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Removes the [[ ]] and {{ }} highlight markers used in /content. */
export function plain(text: string) {
  return text.replace(/\[\[|\]\]|\{\{|\}\}/g, "");
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:");
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
