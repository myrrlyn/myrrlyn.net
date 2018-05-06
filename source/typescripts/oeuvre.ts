import { bannerFetch, setBanner } from "./banner";
import { nav } from "./nav";

$(document).ready(function() {
	bannerFetch().done(data => {
		//  Strip non-TES banners from the list
		setBanner(data.banners.filter(x => x.type.includes("tes")), "/oeuvre");
	});
	shuntBlurb();
	nav();
});

/**
 * Each page can include an #about-text element with supplementary information.
 * This element gets moved out of the main content rendering region and into the
 * information sidebar.
 */
function shuntBlurb() {
	let aboutText = $("#about-text").detach();
	if (aboutText) {
		$("#about-text-anchor").html(aboutText.html());
	}
}
