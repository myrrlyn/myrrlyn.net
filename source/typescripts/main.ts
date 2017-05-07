$(document).ready(function() {
	//  This should only be called when the DOM is finished, obviously.
	bannerFetch.done(data => {
		//  Strip TES banners from the list
		setBanner(data.banners.filter(x => !x.type.includes("tes")), "/");
	});
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
