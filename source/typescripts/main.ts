/**
 * Grab a Cookie object for working with the banner
 */
let bannerCookie = new Cookie("banner", {
	path: "/",
});

/**
 * List of all banner images available for use.
 */
let bannersMain: BannerImg[] = [];
let bannerFetch = $.getJSON("/javascripts/banners.json");

$(document).ready(function() {
	//  This should only be called when the DOM is finished, obviously.
	bannerFetch.done(setBanner);
	//  Set text expansion/collapse rules
	$("p.cover").click(function() {
		//  Inside the handler, `this` refers to the object receiving the event.
		//  next() gives access to the paragraph following the p.cover that was
		//  clicked, without having to give more specific identifiers in the
		//  DOM elements.
		$(this).next().toggle();
	});
	$("button#cover-toggle").click(function() {
		$("p.cover").click();
	});
});

/**
 * Set the banner, either from a cookie or from a new draw.
 */
function setBanner(jsonData) {
	bannersMain = jsonData.banners.map(data => {
		return BannerImg.from_json(data);
	});
	//  This will be null if the cookie does not exist (new visitors or if the
	//  cookie expired and was destroyed).
	let bannerStore = bannerCookie.read();
	//  deserializeBanner safely handles null inputs, so null-checks are not
	//  required here.
	let oldBanner = deserializeBanner(bannerStore, bannersMain);
	//  If the deserializer returns a valid image, we're set.
	if (oldBanner !== null) {
		deployBanner(oldBanner);
	}
	//  Otherwise, start banner selection from scratch.
	else {
		//  TODO: Create other lists and permit choosing among them.
		let newBanner = randomBanner(bannersMain);
		//  Use the ever-handy MomentJS library to come up with a timestamp an
		//  hour in the future.
		let newExpiry = moment().utc().add(1, "hour").toString();
		//  Write to the banenr cookie with the new name and expiration time.
		bannerCookie.create(newBanner.name).update({expires: newExpiry});
		//  Set the CSS to actually use the newly chosen banner.
		deployBanner(newBanner);
	}
}
