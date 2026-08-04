import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

const HTML_BLOCK_PATTERN = /<\/?(div|p|h[1-6]|ul|ol|li|iframe|section|article|table|blockquote|figure|img|span)\b/i;

// Only allow YouTube embeds through — iframes are otherwise stripped by
// DOMPurify's default config, and we don't want to open up arbitrary
// third-party iframe embedding just because the blog needs YouTube videos.
DOMPurify.addHook("uponSanitizeElement", (node, data) => {
    if (data.tagName === "iframe") {
        const el = node as unknown as { getAttribute?: (name: string) => string | null; remove: () => void };
        const src = el.getAttribute?.("src") || "";
        const isYouTube = /^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com)\//.test(src);
        if (!isYouTube) {
            el.remove();
        }
    }
});

/**
 * Older blog posts were authored as raw HTML (Tailwind-styled sections,
 * embedded YouTube iframes) and injected as-is. Newer ones are written as
 * Markdown in the admin editor's plain textarea. Detect which one we've got —
 * running already-HTML content through a Markdown parser corrupts it — then
 * always sanitize, since this is the only place post.content reaches the DOM.
 */
export function renderPostContent(content: string): string {
    const looksLikeHtml = HTML_BLOCK_PATTERN.test(content);
    const html = looksLikeHtml ? content : (marked.parse(content, { async: false }) as string);

    return DOMPurify.sanitize(html, {
        ADD_TAGS: ["iframe"],
        ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "target"],
    });
}
