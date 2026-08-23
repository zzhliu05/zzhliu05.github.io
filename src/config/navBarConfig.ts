import type { NavBarConfig } from "../types/config";
import { LinkPreset } from "../types/config";

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "GitHub",
			url: "https://github.com/zzhliu05",
			external: true,
			icon: "fa7-brands:github",
		},
	],
};
