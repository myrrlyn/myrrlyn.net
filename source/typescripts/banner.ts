class BannerImg {
	name: string;
	freq: number;
	position: [string, string];
	type: string[];

	/**
	 * @param name The basename of the image file (i.e. NAME in images/NAME.jpg)
	 */
	constructor(name: string) {
		this.name = name;
		this.freq = 1;
		this.position = ["center", "center"];
	}

	/**
	 * Set the relative frequency at which this banner occurs.
	 * @param {number} weight Any number (defaults to 1). Setting it less than
	 * 1 makes occur less often than default; setting it greater than one makes
	 * it occur more often than default.
	 */
	public setFreq(freq: number): BannerImg {
		this.freq = freq;
		return this;
	}

	/**
	 * Set the CSS position information for the banner.
	 * @param {string} x A CSS horizontal position string ("left", "center", "right")
	 * @param {string} y A CSS vertical position string ("top", "center", "bottom")
	 */
	public setPosition(x?: string, y?: string): BannerImg {
		if (x !== undefined && x !== "") {
			this.position[0] = x;
		}
		if (y !== undefined && y !== "") {
			this.position[1] = y;
		}
		return this;
	}

	/**
	 * Set the type metadata (used for category filtering)
	 */
	public setType(info: string[]) {
		this.type = info;
	}

	/**
	 * Resolves the banner object to a CSS url() string.
	 */
	public getCssUrl(): string {
		return `url("/images/${this.name}")`;
	}

	/**
	 * Calculates the relative frequency of this banner object in a list of
	 * banner objects.
	 * @param {BannerImg[]} list The list of banner objects for which the
	 * relative frequency is calculated. This is not an intrinsic property, as
	 * the actual frequency of a banner's occurrence is dependent on its peers.
	 */
	public getFreq(list: BannerImg[]): number {
		let totalFreqs = 0;
		list.forEach(banner => {
			totalFreqs += banner.freq;
		});
		return this.freq / totalFreqs;
	}
}

/**
 * List of all banner images available for use.
 */
let bannersMain: BannerImg[] = [];
//  Fetch banner information from server
//  TypeScript can't help us with this, so BE SURE this matches the JSON file.
$.getJSON("/javascripts/banners.json", function(bannerJson) {
	//  Since this is happening asynchronously, we can't use a direct assignment
	//  to bannersMain via map() to transform the JSON data into BannerImg
	//  objects.
	bannerJson.banners.forEach(function(data, _, banners) {
		let banner = new BannerImg(data.name);
		if (data.freq !== undefined) {
			banner.setFreq(data.freq);
		}
		if (data.pos !== undefined) {
			banner.setPosition(data.pos);
		}
		if (data.type !== undefined) {
			banner.setType(data.type);
		}
		bannersMain.push(banner);
	});
});

/**
 * Selects a random BannerImg from the list, with respect to each BannerImg's
 * relative probability of occurrence.
 * @param {BannerImg[]} list The list of banners being scanned.
 */
function randomBanner(list: BannerImg[]): BannerImg {
	let randomThrow = Math.random();
	let banner = list[list.length - 1];
	list.map(function(banner, _, list) {
			return banner.getFreq(list);
	}).reduceRight(function(prev, cur, idx, all) {
		let next = prev - cur;
		if (randomThrow < next) {
			banner = list[idx - 1];
		}
		return next;
	}, 1.0);
	return banner;
}

/**
 * Deploys a BannerImg to the DOM, by setting <header>'s background-image CSS.
 */
function deployBanner(banner: BannerImg) {
	$("header").css({
		"background-image": banner.getCssUrl(),
	});
}
