import type { TimelineItem } from "../components/features/timeline/types";

export const timelineData: TimelineItem[] = [
	{
		id: "current-study",
		title: "Studying Theoretical Physics",
		description:
			"Currently studying Theoretical Physics, focusing on topological physics.",
		type: "education",
		startDate: "2023-09-01",
		location: "Shanghai",
		organization: "Shanghaitech University",
		icon: "material-symbols:school",
		color: "#059669",
		featured: true,
	},
	{
		id: "mizuki-blog-project",
		title: "Mizuki Personal Blog Project",
		description:
			"A personal blog website developed using the Astro framework as a practical project for learning frontend technologies.",
		type: "project",
		startDate: "2024-06-01",
		endDate: "2024-08-01",
		skills: ["Astro", "TypeScript", "Tailwind CSS", "Git"],
		achievements: [
			"Mastered modern frontend development tech stack",
			"Learned responsive design and user experience optimization",
			"Completed the full process from design to deployment",
		],
		links: [
			{
				name: "GitHub Repository",
				url: "https://github.com/example/mizuki-blog",
				type: "project",
			},
			{
				name: "Live Demo",
				url: "https://mizuki-demo.example.com",
				type: "website",
			},
		],
		icon: "material-symbols:code",
		color: "#7C3AED",
		featured: true,
	},
	{
		id: "web-development-course",
		title: "Completed Web Development Online Course",
		description:
			"Completed a full-stack web development online course, systematically learning frontend and backend development technologies.",
		type: "achievement",
		startDate: "2024-01-15",
		endDate: "2024-05-30",
		organization: "Mooc Website",
		skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
		achievements: [
			"Received course completion certificate",
			"Completed 5 practical projects",
			"Mastered full-stack development fundamentals",
		],
		links: [
			{
				name: "Course Certificate",
				url: "https://certificates.example.com/web-dev",
				type: "certificate",
			},
		],
		icon: "material-symbols:verified",
		color: "#059669",
	},
	{
		id: "high-school-graduation",
		title: "High School Graduation",
		description:
			"Graduated from high school with excellent grades and was admitted to physics program at Shanghaitech University.",
		type: "education",
		startDate: "2010-09-01",
		endDate: "2023-06-30",
		location: "Beijing",
		organization: "High school affiliated to Peking University",
		icon: "material-symbols:school",
		color: "#2563EB",
	},
];
