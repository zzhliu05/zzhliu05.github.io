export type ProblemStatus = "open" | "thinking" | "resolved";

export interface ProblemNote {
	id: string;
	title: string;
	date: string;
	status: ProblemStatus;
	tags?: string[];
	question: string;
	thought?: string;
	answer?: string;
	relatedPosts?: {
		title: string;
		url: string;
	}[];
}

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

export const problemNotes: ProblemNote[] = [
	{
		id: "pier-wave-neumann-condition",
		title: "桥墩边界为什么对应 Neumann 条件？",
		date: "2026-08-29",
		status: "thinking",
		tags: ["流体力学", "边界条件"],
		question:
			"浅水波遇到圆柱形桥墩时，无穿透边界条件如何转化为水面高度的法向导数条件？",
		thought:
			"线性化方程把速度势或水平速度与水面高度梯度联系起来，因此边界上的法向速度为零会变成相应标量场的法向导数为零。",
		relatedPosts: [
			{
				title: "平面水波中的桥墩",
				url: "/posts/pier_wave/",
			},
		],
	},
	{
		id: "bose-partition-counting",
		title: "整数拆分为什么等价于 Bose 谐振子计数？",
		date: "2026-08-29",
		status: "resolved",
		tags: ["统计力学", "数论"],
		question:
			"把总能量写成不同频率模式的占据数之和时，为什么得到的正好是整数拆分问题？",
		answer:
			"每个频率模式的占据数记录整数 n 出现的次数，Bose 统计不区分粒子顺序，因此只保留各整数出现的重数，正是整数拆分的数据。",
		relatedPosts: [
			{
				title: "全同Bose谐振子与Hardy-Ramanujan公式",
				url: "/posts/Bose-Ramanujan/",
			},
		],
	},
];

export function getProblemNotes() {
	return [...problemNotes].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);
}

export function getProblemTags() {
	return Array.from(
		new Set(problemNotes.flatMap((note) => note.tags ?? [])),
	).sort((a, b) => a.localeCompare(b, "zh-CN"));
}
