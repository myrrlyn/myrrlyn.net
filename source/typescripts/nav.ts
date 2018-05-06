import * as moment from "moment";

/**
 * Master list of Cookie objects.
 *
 * The index page is on a different path than the elements the index page lists,
 * so each listing must appear twice for synchronization.
 *
 * Each key must be named according to the cookie key and HTML ID which it
 * governs, following a snake- to camel- case transformation.
 */
let allCookies = {
	blogSeries: [
		new Cookie("blog-series", {
			path: "/blog",
		}),
		new Cookie("blog-series", {
			path: "/blog.html",
		}),
	],
	blogTag: [
		new Cookie("blog-tag", {
			path: "/blog",
		}),
		new Cookie("blog-tag", {
			path: "/blog.html",
		}),
	],
	oeuvreTag: [
		new Cookie("oeuvre-tag", {
			path: "/oeuvre",
		}),
		new Cookie("oeuvre-tag", {
			path: "/oeuvre.html",
		}),
	],
};

/**
 * Master navigator function to be called on page setup. Sets click hooks and
 * jQuery initialization.
 */
export function nav() {
	//  All nav.accordion elements get this treatment
	$("nav.accordion").accordion({
		heightStyle: "content",
	});

	let querySelected = false;
	let queryKey = search("tag");
	if (queryKey.length != 0) {
		$(`#${queryKey[queryKey.length - 1]}`).click();
		querySelected = true;
	}

	//  Read the cookies to click on the most recent headings
	Object.keys(allCookies).forEach(group => {
		let val = allCookies[group][0].read();

		//  If val is populated, it will be with the ID of an element to expand.
		if (val !== null && val !== "" && querySelected == false) {
			$(`#${val}`).click();
		}

		//  Register click handlers on all tag entries.
		let id = group
			//  Map camelCase to snake-Case
			.replace(/([A-Z])/, "-$&")
			//  Map snake-Case to snake-case
			.toLowerCase();
		$(`#${id} .ui-accordion-header`).click(function() {
			allCookies[group].forEach(c =>
				c.create($(`#${id} .ui-state-active`).attr("id")).update({
					expires: moment().utc().add(1, "day").toString(),
				})
			);
		});
	});
}
