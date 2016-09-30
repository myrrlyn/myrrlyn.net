class BannerImg {
	name: string;
	freq: number = 1;
	position: {x: string, y: string,} = { x: "center", y: "center", };
	type: string[] = [];

	/**
	 * Constructs a new BannerImg from the given name.
	 *
	 * Additional properties should be added in their respective methods, not as
	 * constructor parameters. The setters allow for method chaining, and can be
	 * called directly on the constructor.
	 *
	 * @param name The basename of the image file (i.e. NAME in images/NAME.jpg)
	 */
	constructor(name: string) {
		this.name = name;
	}

	/**
	 * Builds a BannerImg object from a JSON serialization
	 */
	public static from_json(json: {
		name: string,
		freq?: number,
		position?: string[],
		type?: string[],
	}): BannerImg {
		let tmp = new BannerImg(json.name);
		if (json.freq) {
			tmp.setFreq(json.freq);
		}
		if (json.position) {
			tmp.setPosition({
				x: json.position[0],
				y: json.position[1],
			});
		}
		if (json.type) {
			tmp.setType(json.type);
		}
		return tmp;
	}

	/**
	 * Set the relative frequency at which this banner occurs.
	 *
	 * @param freq Any number (defaults to 1). Setting it less than 1 makes it
	 * occur less often than default; setting it greater than one makes it occur
	 * more often than default.
	 */
	public setFreq(freq?: number): BannerImg {
		this.freq = freq || 1;
		return this;
	}

	/**
	 * Set the CSS position information for the banner.
	 *
	 * @param pos An object with two key/val pairs. "x" and "y" keys accept
	 * values that are appropriate CSS position values.
	 * (top, left, right, bottom, center)
	 */
	public setPosition(pos?: {x: string, y: string}): BannerImg {
		function exists(obj: Object): boolean {
			return (obj !== undefined && obj !== null);
		}
		if (exists(pos)) {
			if (exists(pos.x)) {
				this.position.x = pos.x;
			}
			if (exists(pos.y)) {
				this.position.y = pos.y;
			}
		}
		return this;
	}

	/**
	 * Get the CSS position string for the banner.
	 */
	public getPosition(): string {
		return `${this.position.x} ${this.position.y}`;
	}

	/**
	 * Set the type metadata (used for category filtering).
	 *
	 * @param {string[]} info Optional list of tags describing the banner.
	 */
	public setType(info?: string[]) {
		this.type = this.type.concat(info || []);
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
	 *
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
//  Exporting the jqxhr object as a global variable allows the banner selection
//  logic to be attached as a callback.
let bannerFetch = $.getJSON("/javascripts/banners.json", function(json) {
	//  Because this is happening asynchronously the mapping has to be done
	//  inside a callback function. Since we need the data to be available
	//  in the global scope, bannersMain is declared above and populated
	//  here.
	bannersMain = json.banners.map(data => {
		BannerImg.from_json(data)
	});
});

/**
 * Selects a random BannerImg from the list, with respect to each BannerImg's
 * relative probability of occurrence.
 * @param {BannerImg[]} list The list of banners being scanned.
 */
function randomBanner(list: BannerImg[]): BannerImg {
	//  [0 ... 1.0)
	let randomThrow = Math.random();
	//  Start from the right-most banner
	let banner = list[list.length - 1];
	//  A crawl across a number line is the exact purpose for which reduce was
	//  originally made; I've been abusing it shamelessly on all the other
	//  invocations.
	//  I map the banners array down to only contain the relative frequencies,
	//  since that's the crawl domain, and then reduce from the right to
	//  determine when a match has been made.
	//
	//  The crawl starts from the right because... just trust me on this.
	//  [0 ... rand ... [marker 1)) means that the current banner has not yet
	//  reached the random value, so try the next one.
	//  [ 0 ... [marker ... rand ... 1)) means that the current banner has
	//  reached the random value, so stop changing out banners.
	list.map(function(banner, idx, list) {
			return banner.getFreq(list);
	}).reduceRight(function(prev, cur, idx, all) {
		//  Move the marker down the numberline
		let next = prev - cur;
		//  If randomThrow is still farther down than the marker, change banners
		//  When randomThrow is above the marker, we're set.
		if (randomThrow < next) {
			banner = list[idx - 1];
		}
		return next;
	}, 1.0);
	return banner;
}

/**
 * Looks up a BannerImg from a list, given a search query. Returns null if
 * a matching BannerImg could not be found.
 *
 * @param {string} name The name of the banner to look up
 * @param {BannerImg[]} list The list of BannerImgs in which to look
 */
function deserializeBanner(name: string, list: BannerImg[]): BannerImg {
	//  Folding across the whole array is still pretty quick, so not having an
	//  early return on match isn't terribly awful.
	return list.reduce(function(prev, cur, idx, all) {
		if (cur.name == name) {
			return cur;
		}
		else {
			return prev;
		}
	}, null);
}

/**
 * Deploys a BannerImg to the DOM, by setting <header>'s background-image CSS.
 */
function deployBanner(banner: BannerImg) {
	if (banner !== null) {
		$("header").css({
			"background-image": banner.getCssUrl(),
			"background-position": banner.getPosition(),
		});
	}
}
