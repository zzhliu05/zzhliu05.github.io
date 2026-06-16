import type { SidebarLayoutConfig } from "../types/config";

export const sidebarLayoutConfig: SidebarLayoutConfig = {
	properties: [
		{
			type: "profile",
			position: "top",
			class: "onload-animation",
			animationDelay: 0,
		},
		{
			type: "tags",
			position: "top",
			class: "onload-animation",
			animationDelay: 50,
			responsive: {
				collapseThreshold: 20,
			},
		},
		{
			type: "categories",
			position: "sticky",
			class: "onload-animation",
			animationDelay: 100,
			responsive: {
				collapseThreshold: 5,
			},
		},
		{
			type: "card-toc",
			position: "sticky",
			class: "onload-animation",
			animationDelay: 150,
		},
		{
			type: "site-stats",
			position: "sticky",
			class: "onload-animation",
			animationDelay: 200,
		},
		{
			type: "calendar",
			position: "sticky",
			class: "onload-animation",
			animationDelay: 250,
		},
	],
	components: {
		left: ["profile", "tags"],
		right: ["categories", "card-toc", "site-stats", "calendar"],
		drawer: ["profile", "categories", "tags", "site-stats"],
	},
	defaultAnimation: {
		enable: true,
		baseDelay: 0,
		increment: 50,
	},
	responsive: {
		breakpoints: {
			mobile: 768,
			tablet: 1280,
			desktop: 1280,
		},
	},
};
