/**
 * Array of Cookie objects that will write to the correct storage locations.
 *
 * /oeuvre.html is a different path than /oeuvre, and so cookies for each path
 * cannot be read by the other. Loop across this array to write all the
 * necessary cookie stores.
 *
 * Since this uses a common tag, any Cookie object can read the tag if it is
 * present at its location. Picking a specific Cookie to read is a no-op.
 */
let oeuvreCookies = [
	new Cookie("oeuvre-tag", {
		path: "/oeuvre",
	}),
	new Cookie("oeuvre-tag", {
		path: "/oeuvre.html",
	}),
];

$(document).ready(function() {
	shuntBlurb();
	nav();
});

/**
 * Sets up the navigation pane to have jQuery governance and handles interfacing
 * with the cookies.
 */
function nav() {
	$("nav.accordion").accordion({
		heightStyle: "content",
	});

	let oeuvreTag = oeuvreCookies[0].read();
	if (oeuvreTag !== null || oeuvreTag !== "") {
		$(`#${oeuvreTag}`).click();
	}

	/**
	 * Whenever a tag is clicked and opened, write that tag to cookie storage
	 * for all paths that use this template.
	 */
	$(".ui-accordion-header").click(function() {
		oeuvreCookies.forEach(c =>
			c.create($(".ui-state-active").attr("id")).update({
				expires: moment().utc().add(1, "hour").toString(),
			})
		);
	});
}

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
