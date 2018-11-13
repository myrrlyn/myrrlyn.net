import * as moment from "moment";

$(document).ready(function() {
	setPanels();
	setTheme();
	$("#cookie-display").click(cookieDisplay);
	$("#cookie-wipe").click(cookieWipe);
	$("#sig-pgp").click(() => showSig("pgp"));
	$("#sig-keybase").click(() => showSig("keybase"));
	$("#decorator-toggle").click(togglePanels);
	$("#theme-toggle").click(toggleTheme);
});

/**
 * Handle displaying cookies upon request, for transparency.
 */
function cookieDisplay() {
	let cookieAnchor = $("#cookie-anchor");
	if (cookieAnchor !== undefined) {
		//  If the anchor is populated, empty it and exit.
		if (cookieAnchor.html() !== "&nbsp;") {
			cookieAnchor.html("&nbsp;");
			return;
		}
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

/**
 * Generates the filename of a detached signature file for a given resource.
 *
 * HTML pages are accessible without extension, so this will optionally append a
 * ".html" suffix to the path before looking for the signature.
 * @param path The path for which a signature is to be found.
 * @param kind The signature kind. Must be "pgp" or "keybase".
 * @param add_html Whether to add ".html" to an unsuffixed path. Default true.
 */
function getSig(
	path: any,
	kind: string,
	add_html: boolean = true
): string | null {
	let ext = path.match(/\..*$/);
	if (path.endsWith("/")) {
		path += "index";
	}
	if (add_html && (ext == null || ext[0] == "")) {
		path += ".html";
	}
	switch (kind) {
	case "keybase":
		return path + ".kbs";
	case "pgp":
		return path + ".asc";
	default:
		return null;
	}
}

/**
 * Retrieves a signature from the server and inserts it into the DOM.
 * @param sig The signature type to retrieve.
 */
function showSig(sig: string) {
	$.ajax({
		url: getSig(document.location.pathname, sig),
		success: (data) => {
			let anchor = $("#sig-anchor");
			if (anchor !== undefined) {
				anchor.html(data);
			}
		},
	});
}

/**
 * Sets display properties on <body> to manage rendering of the side panels.
 */
function setPanels() {
	let vis = new Cookie("panel-vis").update({ path: "/", expires: moment().utc().add(1, "month").toString() });
	//  If the cookie doesn't exist, use visible as the default.
	let state = vis.read() || "shown";
	if (state == "hidden") {
		$("body").addClass("hide-panels");
	}
	setPanelButton(state);
	vis.create(state);
}

function togglePanels() {
	let vis = new Cookie("panel-vis").update({ path: "/", expires: moment().utc().add(1, "month").toString() });
	let state = vis.read() || "shown";
	if (state == "shown") {
		state = "hidden";
		$("body").addClass("hide-panels");
	}
	else {
		state = "shown";
		$("body").removeClass("hide-panels");
	}
	setPanelButton(state);
	vis.create(state);
}

function setPanelButton(state: string) {
	if (state == "hidden") {
		$("#decorator-toggle").text("Show the outer panels");
	}
	else if (state == "shown") {
		$("#decorator-toggle").text("Hide the outer panels");
	}
}

function setTheme() {
	let store = new Cookie("theme").update({ path: "/", expires: moment().utc().add(1, "month").toString() });
	var theme = store.read() || "";

	if (theme.trim() != "") {
		$("body").addClass(theme);
	}

	let btn_text;
	switch (theme) {
		case "dark": btn_text = "light"; break;
		default: btn_text = "dark"; break;
	}
	$("#theme-toggle").text(`Set ${btn_text} style`);
}

function toggleTheme() {
	let store = new Cookie("theme").update({ path: "/", expires: moment().utc().add(1, "month").toString() });
	let theme = store.read();

	if (theme.trim() != "") {
		$("body").removeClass(theme);
	}

	switch (store.read()) {
		case "dark": theme = ""; break;
		default: theme = "dark"; break;
	}
	store.create(theme);
	setTheme();
}
