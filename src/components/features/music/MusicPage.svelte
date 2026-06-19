<script lang="ts">
import { onDestroy, onMount } from "svelte";
import Icon from "@iconify/svelte";
import { LOCAL_PLAYLIST } from "@components/widgets/music-player/constants";
import type { Song } from "@components/widgets/music-player/types";
import type { MusicPlayerState } from "@/stores/musicPlayerStore";
import { musicPlayerStore } from "@/stores/musicPlayerStore";

interface Props {
	title: string;
	subtitle: string;
}

let { title, subtitle }: Props = $props();
let playerState: MusicPlayerState = $state(musicPlayerStore.getState());

function withRootPath(path: string) {
	if (!path) {
		return "";
	}
	if (
		path.startsWith("/") ||
		path.startsWith("http://") ||
		path.startsWith("https://") ||
		path.startsWith("data:")
	) {
		return path;
	}
	return `/${path}`;
}

function formatDuration(seconds: number) {
	if (!seconds) {
		return "--:--";
	}
	const minute = Math.floor(seconds / 60);
	const second = Math.floor(seconds % 60)
		.toString()
		.padStart(2, "0");
	return `${minute}:${second}`;
}

const playlist: Song[] = LOCAL_PLAYLIST.map((song) => ({
	...song,
	cover: withRootPath(song.cover),
	url: withRootPath(song.url),
}));
const featuredSong = playlist[0];
const totalDuration = playlist.reduce((sum, song) => sum + song.duration, 0);

let unsubscribe: (() => void) | undefined;

onMount(() => {
	unsubscribe = musicPlayerStore.subscribe((state) => {
		playerState = state;
	});
	musicPlayerStore.initialize();
});

onDestroy(() => {
	unsubscribe?.();
});

function isCurrent(index: number) {
	return playerState.currentIndex === index;
}

function isCurrentPlaying(index: number) {
	return isCurrent(index) && playerState.isPlaying;
}

function playSong(index: number) {
	if (isCurrentPlaying(index)) {
		musicPlayerStore.pause();
		return;
	}
	if (isCurrent(index)) {
		musicPlayerStore.play();
		return;
	}
	musicPlayerStore.playIndex(index);
}
</script>

<div class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32">
	<div class="card-base z-10 relative w-full overflow-hidden">
		<section class="music-hero relative min-h-[20rem] px-6 sm:px-9 py-8">
			<div
				class="absolute inset-0 bg-cover bg-center opacity-35 blur-xl scale-110"
				style={`background-image: url('${featuredSong?.cover ?? ""}')`}
			></div>
			<div
				class="absolute inset-0 bg-gradient-to-br from-[var(--card-bg)] via-[var(--card-bg)]/85 to-[var(--primary)]/15"
			></div>

			<div class="relative z-10 flex flex-col md:flex-row items-start md:items-end gap-6">
				<div
					class="w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/10 shrink-0"
				>
					{#if featuredSong?.cover}
						<img
							src={featuredSong.cover}
							alt={featuredSong.title}
							class="w-full h-full object-cover"
							loading="eager"
						/>
					{:else}
						<div
							class="w-full h-full flex items-center justify-center text-5xl text-black/20 dark:text-white/20"
						>
							<Icon icon="material-symbols:music-note-rounded" />
						</div>
					{/if}
				</div>

				<div class="flex-1 min-w-0 pb-1">
					<div
						class="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/12 text-[var(--primary)] px-3 py-1 text-sm font-medium mb-4"
					>
						<Icon icon="material-symbols:headphones-rounded" />
						Music Collection
					</div>
					<h1 class="text-4xl md:text-5xl font-bold text-black/90 dark:text-white/90 mb-3">
						{title}
					</h1>
					<p class="text-base md:text-lg text-black/60 dark:text-white/60 mb-6 max-w-2xl">
						{subtitle}
					</p>

					<div class="flex flex-wrap items-center gap-3 text-sm">
						<div class="music-stat">
							<Icon icon="material-symbols:queue-music-rounded" />
							<span>{playlist.length} 首</span>
						</div>
						<div class="music-stat">
							<Icon icon="material-symbols:schedule-rounded" />
							<span>{formatDuration(totalDuration)}</span>
						</div>
						<button class="music-action" type="button" on:click={() => playSong(0)}>
							<Icon icon={isCurrentPlaying(0) ? "material-symbols:pause-rounded" : "material-symbols:play-arrow-rounded"} />
							{isCurrentPlaying(0) ? "暂停" : "播放第一首"}
						</button>
					</div>
				</div>
			</div>
		</section>

		<section class="px-4 sm:px-7 py-6">
			<div class="flex items-center justify-between px-2 mb-4">
				<h2 class="text-xl font-bold text-black/90 dark:text-white/90 flex items-center gap-2">
					<Icon
						icon="material-symbols:library-music-outline-rounded"
						class="text-[var(--primary)]"
					/>
					播放列表
				</h2>
				<span class="text-sm text-black/45 dark:text-white/45">
					{playlist.length} tracks
				</span>
			</div>

			<div class="flex flex-col gap-3">
				{#each playlist as song, index}
					<article
						class="music-track group"
						class:is-active={isCurrent(index)}
					>
						<button
							type="button"
							class="track-index"
							aria-label={`${isCurrentPlaying(index) ? "暂停" : "播放"} ${song.title}`}
							on:click={() => playSong(index)}
						>
							{#if isCurrentPlaying(index)}
								<Icon icon="material-symbols:pause-rounded" class="text-xl" />
							{:else}
								<span class="group-hover:hidden">
									{String(index + 1).padStart(2, "0")}
								</span>
								<Icon
									icon="material-symbols:play-arrow-rounded"
									class="hidden group-hover:block text-xl"
								/>
							{/if}
						</button>

						<button
							type="button"
							class="track-cover"
							aria-label={`播放 ${song.title}`}
							on:click={() => playSong(index)}
						>
							{#if song.cover}
								<img
									src={song.cover}
									alt={song.title}
									class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
									loading="lazy"
								/>
							{:else}
								<Icon icon="material-symbols:music-note-rounded" />
							{/if}
						</button>

						<button
							type="button"
							class="min-w-0 flex-1 text-left"
							on:click={() => playSong(index)}
						>
							<h3
								class="font-bold text-black/85 dark:text-white/85 truncate group-hover:text-[var(--primary)] transition-colors"
							>
								{song.title}
							</h3>
							<p class="text-sm text-black/50 dark:text-white/50 truncate">
								{song.artist}
							</p>
						</button>

						<div class="hidden sm:block text-sm text-black/40 dark:text-white/40 tabular-nums">
							{isCurrent(index) && playerState.duration
								? formatDuration(playerState.duration)
								: formatDuration(song.duration)}
						</div>

						<button
							type="button"
							class="track-link"
							aria-label={`${isCurrentPlaying(index) ? "暂停" : "播放"} ${song.title}`}
							on:click={() => playSong(index)}
						>
							<Icon icon={isCurrentPlaying(index) ? "material-symbols:pause-rounded" : "material-symbols:play-arrow-rounded"} />
						</button>
					</article>
				{/each}
			</div>
		</section>
	</div>
</div>

<style>
	.music-stat {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		height: 2.25rem;
		padding: 0 0.8rem;
		border-radius: 999px;
		background: color-mix(in oklch, var(--btn-regular-bg) 80%, transparent);
		color: color-mix(in oklch, currentColor 65%, transparent);
	}

	.music-action {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		height: 2.25rem;
		padding: 0 0.9rem;
		border-radius: 999px;
		background: var(--primary);
		color: white;
		font-weight: 700;
		transition:
			transform 180ms ease,
			filter 180ms ease;
	}

	.music-action:hover {
		filter: brightness(1.05);
		transform: translateY(-1px);
	}

	.music-track {
		display: grid;
		grid-template-columns: 2.5rem 3.5rem minmax(0, 1fr) auto auto;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem;
		border: 1px solid color-mix(in oklch, var(--line-divider) 80%, transparent);
		border-radius: 1rem;
		background: color-mix(in oklch, var(--card-bg) 94%, transparent);
		transition:
			transform 220ms ease,
			box-shadow 220ms ease,
			border-color 220ms ease,
			background-color 220ms ease;
	}

	.music-track:hover,
	.music-track.is-active {
		transform: translateY(-0.25rem);
		border-color: color-mix(in oklch, var(--primary) 35%, var(--line-divider));
		box-shadow: 0 1rem 2rem rgb(0 0 0 / 0.08);
		background: color-mix(in oklch, var(--card-bg) 88%, var(--primary) 6%);
	}

	.track-index,
	.track-cover,
	.track-link {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.track-index {
		color: color-mix(in oklch, currentColor 45%, transparent);
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}

	.track-cover {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 0.85rem;
		overflow: hidden;
		background: var(--btn-regular-bg);
		color: var(--primary);
	}

	.track-link {
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 0.75rem;
		color: color-mix(in oklch, currentColor 50%, transparent);
		transition:
			background-color 180ms ease,
			color 180ms ease,
			transform 180ms ease;
	}

	.track-link:hover {
		background: var(--btn-plain-bg-hover);
		color: var(--primary);
		transform: translateX(0.125rem);
	}

	@media (max-width: 640px) {
		.music-track {
			grid-template-columns: 2rem 3rem minmax(0, 1fr) auto;
			gap: 0.75rem;
			padding: 0.65rem;
		}

		.track-cover {
			width: 3rem;
			height: 3rem;
			border-radius: 0.75rem;
		}
	}
</style>
