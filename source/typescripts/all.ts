$(document).ready(function() {
	$("#cookie-display").click(cookieDisplay);
	$("#cookie-wipe").click(cookieWipe);
});

/**
 * Handle displaying cookies upon request, for transparency.
 */
function cookieDisplay() {
	let cookieAnchor = $("#cookie-anchor");
	if (cookieAnchor !== undefined) {
		let cookies = document.cookie.split("; ");
		if (cookies.length == 1 && cookies[0] == "") {
			cookieAnchor.html("No cookies");
		}
		else {
			let disp = cookies.reduce(function(prev, cur, idx, all) {
				return `${prev}${cur}<br />`;
			}, "");
			cookieAnchor.html(disp);
		}
	}
}

/**
 * Erase cookies upon request.
 */
function cookieWipe() {
	//  Get the string of cookies and split into individual key=val pairs
	document.cookie.split("; ")
	//  Transform each pair into a Cookie acting on the key
		.map(data => new Cookie(data.split("=")[0]))
	//  And then destroy each Cookie
		.forEach(val => val.destroy());
}
