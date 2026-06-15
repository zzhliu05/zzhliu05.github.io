const PARALLAX_FACTOR_DESKTOP = 0.22;
const PARALLAX_FACTOR_MOBILE = 0.12;
const MAX_OFFSET_RATIO = 0.28;

export function initBannerParallax(): void {
	if (window.__bannerParallaxCleanup) {
		window.__bannerParallaxCleanup();
	}

	const banner = document.getElementById("banner-wrapper");
	if (!banner) {
		return;
	}

	const reducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	);
	let ticking = false;

	const update = () => {
		const isEnabled =
			document.body.classList.contains("enable-banner") &&
			document.body.classList.contains("fullscreen-banner") &&
			!reducedMotion.matches;

		if (!isEnabled) {
			banner.style.setProperty("--banner-parallax-y", "0px");
			ticking = false;
			return;
		}

		const factor =
			window.innerWidth >= 768
				? PARALLAX_FACTOR_DESKTOP
				: PARALLAX_FACTOR_MOBILE;
		const maxOffset = window.innerHeight * MAX_OFFSET_RATIO;
		const offset = Math.min(window.scrollY * factor, maxOffset);

		banner.style.setProperty("--banner-parallax-y", `${offset}px`);
		ticking = false;
	};

	const requestUpdate = () => {
		if (!ticking) {
			window.requestAnimationFrame(update);
			ticking = true;
		}
	};

	window.addEventListener("scroll", requestUpdate, { passive: true });
	window.addEventListener("resize", requestUpdate, { passive: true });
	reducedMotion.addEventListener("change", requestUpdate);
	document.addEventListener("swup:page:view", requestUpdate);

	window.__bannerParallaxCleanup = () => {
		window.removeEventListener("scroll", requestUpdate);
		window.removeEventListener("resize", requestUpdate);
		reducedMotion.removeEventListener("change", requestUpdate);
		document.removeEventListener("swup:page:view", requestUpdate);
		banner.style.removeProperty("--banner-parallax-y");
	};

	requestUpdate();
}

declare global {
	interface Window {
		__bannerParallaxCleanup?: () => void;
	}
}
