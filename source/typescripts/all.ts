//  Grab a Cookie object for working with the banner
let bannerCookie = new Cookie("banner", {
	path: "/",
});

$(document).ready(function() {
	setBanner();
});

//  Set the banner, either from a cookie or from a new draw.
function setBanner() {
	//  The browser will automatically destroy expired cookies, so read() will
	//  return "" for a new visitor or after the expiration time.
	let bannerStore = bannerCookie.read();
	//  Deserializing "" will return null, since no banner will match that.
	let oldBanner = deserializeBanner(bannerStore, bannersMain);
	if (oldBanner !== null) {
		deployBanner(oldBanner);
	}
	else {
		selectBanner();
	}
	function selectBanner() {
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
