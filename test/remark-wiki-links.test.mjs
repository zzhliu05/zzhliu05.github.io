import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { remarkWikiLinks } from "../src/plugins/remark-wiki-links.mjs";

test("wikilinks resolve posts without changing code, math, or existing links", () => {
	const directory = mkdtempSync(join(tmpdir(), "blog-wikilinks-"));
	try {
		mkdirSync(join(directory, "notes"));
		writeFileSync(join(directory, "notes", "Alpha.md"), '---\ntitle: "First Article"\nalias: first\n---\n');
		const tree = {
			type: "root",
			children: [{
				type: "paragraph",
				children: [
					{ type: "text", value: "[[Alpha]] [[First Article|Read this]] [[first]] [[missing]]" },
					{ type: "link", url: "/existing/", children: [{ type: "text", value: "[[Alpha]]" }] },
					{ type: "inlineCode", value: "[[Alpha]]" },
					{ type: "math", value: "[[Alpha]]" },
				],
			}],
		};
		remarkWikiLinks({ directory })(tree);
		const nodes = tree.children[0].children;
		const links = nodes.filter((node) => node.type === "link");
		assert.deepEqual(links.slice(0, 3).map((node) => [node.url, node.children[0].value]), [
			["/posts/notes/alpha/", "Alpha"],
			["/posts/notes/alpha/", "Read this"],
			["/posts/notes/alpha/", "first"],
		]);
		assert.equal(nodes.find((node) => node.type === "text" && node.value.includes("missing")).value.trim(), "[[missing]]");
		assert.equal(links[3].children[0].value, "[[Alpha]]");
		assert.equal(nodes.find((node) => node.type === "inlineCode").value, "[[Alpha]]");
		assert.equal(nodes.find((node) => node.type === "math").value, "[[Alpha]]");
	} finally {
		rmSync(directory, { recursive: true, force: true });
	}
});
