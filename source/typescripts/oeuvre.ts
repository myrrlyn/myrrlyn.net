$(document).ready(function() {
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
