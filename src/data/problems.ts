import { type CollectionEntry, getCollection } from "astro:content";

export type ProblemStatus = "open" | "thinking" | "resolved";

export const problemStatusMeta: Record<
	ProblemStatus,
	{ label: string; icon: string }
> = {
	open: {
		label: "待整理",
		icon: "material-symbols:radio-button-unchecked",
	},
	thinking: {
		label: "思考中",
		icon: "material-symbols:psychology-outline-rounded",
	},
	resolved: {
		label: "已解决",
		icon: "material-symbols:task-alt-rounded",
	},
};

export type ProblemEntry = CollectionEntry<"problems">;

export async function getProblemNotes() {
	const notes = await getCollection("problems", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	return notes.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function getProblemTags(notes: ProblemEntry[]) {
	return Array.from(
		new Set(notes.flatMap((note) => note.data.tags ?? [])),
	).sort((a, b) => a.localeCompare(b, "zh-CN"));
}
