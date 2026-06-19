import type { Song } from "./types";

export const STORAGE_KEY_VOLUME = "music-player-volume";

export const DEFAULT_VOLUME = 0.7;

const RACHMANINOFF_COVER =
	"assets/music/cover/Rachmaninov Piano Concerto No  2  Tchaikovsky Piano Concerto No  1.webp";
const UTADA_COVER = "assets/music/cover/109951163081242244.webp";

export const LOCAL_PLAYLIST: Song[] = [
	{
		id: 1,
		title: "Piano Concerto No. 2 in C minor, Op. 18 - I. Moderato",
		artist: "Sergey Rachmaninoff / Sviatoslav Richter",
		cover: RACHMANINOFF_COVER,
		url: "assets/music/url/01 - Sergey Vassilievich Rachmaninoff Piano Concerto No. 2 in C minor, Op. 18 - I. Moderato.flac",
		duration: 0,
	},
	{
		id: 2,
		title: "Piano Concerto No. 2 in C minor, Op. 18 - II. Adagio sostenuto",
		artist: "Sergey Rachmaninoff / Sviatoslav Richter",
		cover: RACHMANINOFF_COVER,
		url: "assets/music/url/02 - Sergey Vassilievich Rachmaninoff Piano Concerto No. 2 in C minor, Op. 18 - II. Adagio sostenuto.flac",
		duration: 0,
	},
	{
		id: 3,
		title: "Piano Concerto No. 2 in C minor, Op. 18 - III. Allegro scherzando",
		artist: "Sergey Rachmaninoff / Sviatoslav Richter",
		cover: RACHMANINOFF_COVER,
		url: "assets/music/url/03 - Sergey Vassilievich Rachmaninoff Piano Concerto No. 2 in C minor, Op. 18 - III. Allegro scherzando.flac",
		duration: 0,
	},
	{
		id: 4,
		title:
			"Piano Concerto No. 1 in B flat minor, Op. 23 - I. Allegro non troppo e molto maestoso",
		artist: "Piotr Ilyich Tchaikovsky / Sviatoslav Richter",
		cover: RACHMANINOFF_COVER,
		url: "assets/music/url/04 - Piotr Ilyich Tchaikovsky Piano Concerto No. 1 in B flat minor, Op. 23 - I. Allegro non troppo e molto maestoso  Allegro con spirito.flac",
		duration: 0,
	},
	{
		id: 5,
		title:
			"Piano Concerto No. 1 in B flat minor, Op. 23 - II. Andantino semplice",
		artist: "Piotr Ilyich Tchaikovsky / Sviatoslav Richter",
		cover: RACHMANINOFF_COVER,
		url: "assets/music/url/05 - Piotr Ilyich Tchaikovsky Piano Concerto No. 1 in B flat minor, Op. 23 - II. Andantino semplice  Prestissimo  Tempo I.flac",
		duration: 0,
	},
	{
		id: 6,
		title:
			"Piano Concerto No. 1 in B flat minor, Op. 23 - III. Allegro con fuoco",
		artist: "Piotr Ilyich Tchaikovsky / Sviatoslav Richter",
		cover: RACHMANINOFF_COVER,
		url: "assets/music/url/06 - Piotr Ilyich Tchaikovsky Piano Concerto No. 1 in B flat minor, Op. 23 - III. Allegro con fuoco  Molto meno mosso  Allegro vivo.flac",
		duration: 0,
	},
	{
		id: 7,
		title: "初恋 (2022 Remastering)",
		artist: "宇多田ヒカル",
		cover: UTADA_COVER,
		url: "assets/music/url/宇多田ヒカル - 初恋 (2022 Remastering).mp3",
		duration: 0,
	},
	{
		id: 8,
		title: "桜流し",
		artist: "宇多田ヒカル",
		cover: UTADA_COVER,
		url: "assets/music/url/宇多田ヒカル - 桜流し.mp3",
		duration: 0,
	},
	{
		id: 9,
		title: "Dazbee",
		artist: "Dazbee",
		cover: "assets/music/cover/dazbee.webp",
		url: "assets/music/url/dazbee.mp3",
		duration: 0,
	},
	{
		id: 10,
		title: "Hitori",
		artist: "Kaya",
		cover: "assets/music/cover/hitori.webp",
		url: "assets/music/url/hitori.mp3",
		duration: 0,
	},
	{
		id: 11,
		title: "xryx",
		artist: "Unknown",
		cover: "assets/music/cover/xryx.webp",
		url: "assets/music/url/xryx.mp3",
		duration: 0,
	},
	{
		id: 12,
		title: "cl",
		artist: "22/7",
		cover: "assets/music/cover/cl.webp",
		url: "assets/music/url/cl.mp3",
		duration: 0,
	},
];

export const DEFAULT_SONG: Song = {
	title: "Sample Song",
	artist: "Sample Artist",
	cover: "/favicon/favicon.ico",
	url: "",
	duration: 0,
	id: 0,
};

export const DEFAULT_METING_API =
	"https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r";
export const DEFAULT_METING_ID = "14164869977";
export const DEFAULT_METING_SERVER = "netease";
export const DEFAULT_METING_TYPE = "playlist";

export const ERROR_DISPLAY_DURATION = 3000;
export const SKIP_ERROR_DELAY = 1000;
