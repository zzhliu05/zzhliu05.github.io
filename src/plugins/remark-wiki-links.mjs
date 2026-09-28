import { readdirSync, readFileSync } from "node:fs";
import { basename, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { slug as githubSlug } from "github-slugger";
import { visit } from "unist-util-visit";
import { parse as parseYaml } from "yaml";

const postsDir = fileURLToPath(new URL("../content/posts/", import.meta.url));
const wikiLinkPattern = /\[\[([^\[\]\n]+)\]\]/g;
const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;

function addKey(index, key, url) {
	const normalized = key.trim().replace(/\.(md|mdx)$/i, "").toLowerCase();
	if (!normalized) return;
	if (index.has(normalized) && index.get(normalized) !== url) {
		index.set(normalized, null);
	} else if (!index.has(normalized)) {
		index.set(normalized, url);
	}
}

function createPostIndex(directory = postsDir) {
	const index = new Map();
	const stack = [directory];
	while (stack.length) {
		const current = stack.pop();
		for (const entry of readdirSync(current, { withFileTypes: true })) {
			if (entry.name.startsWith(".")) continue;
			const path = join(current, entry.name);
			if (entry.isDirectory()) {
				if (current === directory && entry.name === "template") continue;
				stack.push(path);
				continue;
			}
			if (!entry.isFile() || !/^\.(md|mdx)$/i.test(extname(entry.name))) continue;

			const source = readFileSync(path, "utf8");
			const frontmatter = frontmatterPattern.exec(source);
			if (!frontmatter) continue;
			const data = parseYaml(frontmatter[1]);
			if (!data || data.draft === true && process.env.NODE_ENV === "production") continue;

			const id = relative(directory, path).replaceAll("\\", "/").replace(/\.(md|mdx)$/i, "");
			const slug = typeof data.slug === "string"
				? data.slug
				: id.split("/").map((part) => githubSlug(part)).join("/").replace(/\/index$/, "");
			const url = `/posts/${slug.split("/").map(encodeURIComponent).join("/")}/`;
			addKey(index, id, url);
			addKey(index, basename(id), url);
			if (typeof data.title === "string") addKey(index, data.title, url);
			if (typeof data.alias === "string") addKey(index, data.alias, url);
		}
	}
	return index;
}

export function remarkWikiLinks({ directory = postsDir } = {}) {
	return (tree) => {
		const postIndex = createPostIndex(directory);
		const edits = [];
		visit(tree, (node, index, parent) => {
			if (node.type === "link" || node.type === "linkReference") return "skip";
			if (node.type !== "text" || !parent || index === undefined) return;
			const replacements = [];
			let cursor = 0;
			for (const match of node.value.matchAll(wikiLinkPattern)) {
				const [target, label] = match[1].split("|", 2).map((part) => part.trim());
				const url = postIndex.get(target.replace(/\.(md|mdx)$/i, "").toLowerCase());
				if (!url) continue;
				if (match.index > cursor) {
					replacements.push({ type: "text", value: node.value.slice(cursor, match.index) });
				}
				replacements.push({ type: "link", url, children: [{ type: "text", value: label || target }] });
				cursor = match.index + match[0].length;
			}
			if (!replacements.length) return;
			if (cursor < node.value.length) {
				replacements.push({ type: "text", value: node.value.slice(cursor) });
			}
			edits.push({ parent, index, replacements });
		});
		for (const { parent, index, replacements } of edits.reverse()) {
			parent.children.splice(index, 1, ...replacements);
		}
	};
}
