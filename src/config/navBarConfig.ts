import type { NavBarConfig } from "../types/config";
import { LinkPreset } from "../types/config";

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Diary,
		LinkPreset.Timeline,
		{
			name: "音乐",
			url: "/music/",
			icon: "material-symbols:library-music-outline-rounded",
		},
		{
			name: "GitHub",
			url: "https://github.com/zzhliu05",
			external: true,
			icon: "fa7-brands:github",
		},
	],
};
