import katex from "katex";
import { marked } from "marked";

interface MathSegment {
	token: string;
	html: string;
}

function isEscaped(source: string, index: number) {
	let slashCount = 0;
	for (let i = index - 1; i >= 0 && source[i] === "\\"; i--) {
		slashCount++;
	}
	return slashCount % 2 === 1;
}

function findClosingDelimiter(
	source: string,
	start: number,
	delimiter: "$" | "$$",
) {
	for (let i = start; i < source.length; i++) {
		if (
			source.startsWith(delimiter, i) &&
			!isEscaped(source, i) &&
			(delimiter === "$$" || source[i] !== "\n")
		) {
			return i;
		}
	}
	return -1;
}

function renderMath(source: string, displayMode: boolean) {
	try {
		return katex.renderToString(source.trim(), {
			displayMode,
			strict: "warn",
			throwOnError: false,
		});
	} catch {
		return `<code>${source}</code>`;
	}
}

function extractMathSegments(source: string) {
	let output = "";
	let index = 0;
	const segments: MathSegment[] = [];

	while (index < source.length) {
		if (source.startsWith("$$", index) && !isEscaped(source, index)) {
			const end = findClosingDelimiter(source, index + 2, "$$");
			if (end !== -1) {
				const token = `@@MATH_BLOCK_${segments.length}@@`;
				const formula = source.slice(index + 2, end);
				segments.push({
					token,
					html: renderMath(formula, true),
				});
				output += token;
				index = end + 2;
				continue;
			}
		}

		if (source[index] === "$" && !isEscaped(source, index)) {
			const end = findClosingDelimiter(source, index + 1, "$");
			if (end !== -1) {
				const token = `@@MATH_INLINE_${segments.length}@@`;
				const formula = source.slice(index + 1, end);
				segments.push({
					token,
					html: renderMath(formula, false),
				});
				output += token;
				index = end + 1;
				continue;
			}
		}

		output += source[index];
		index++;
	}

	return { markdown: output, segments };
}

export function renderMathMarkdown(source: string) {
	const { markdown, segments } = extractMathSegments(source);
	let html = marked.parse(markdown, {
		async: false,
		breaks: true,
		gfm: true,
	}) as string;

	for (const segment of segments) {
		html = html.replaceAll(segment.token, segment.html);
	}

	return html;
}
