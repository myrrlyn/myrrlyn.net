$(document).ready(function() {
	nav();
	bannerFetch.done(data => {
		//  Strip TES banners from the list
		setBanner(data.banners.filter(x => x.type && !x.type.includes("tes")), "/blog");
	});
})
