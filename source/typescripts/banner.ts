type BannerJson = {
	name: string,
	freq?: number,
	position?: string,
	type?: string[],
	caption?: string,
}

/**
 * Represents a banner image and associated metadata.
 */
class BannerImg {
	/**
	 * The filename of the banner image.
	 */
	name: string;
	/**
	 * Affects the probability that the banner will be chosen.
	 */
	freq: number = 1;
	/**
	 * CSS position tuple.
	 */
	position: { x: string, y: string, } = { x: "center", y: "center", };
	/**
	 * List of keywords describing the image.
	 *
	 * May be used for sorting or filtering in the future.
	 */
	type: string[] = [];
	/**
	 * Caption for the banner image.
	 */
	caption?: string;

	/**
	 * Constructs a new BannerImg from the given name.
	 *
	 * Additional properties should be added in their respective methods, not as
	 * constructor parameters. The setters allow for method chaining, and can be
	 * called directly on the constructor.
	 *
	 * @param name The name and extension of the image file
	 */
	constructor(name: string) {
		this.name = name;
	}

	/**
	 * Builds a BannerImg object from a JSON serialization
	 *
	 * See data/banners.toml for a description of the spec used.
	 */
	public static from_json(json: BannerJson): BannerImg {
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
		if (json.caption) {
			tmp.setCaption(json.caption);
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
	 * @param info Optional list of tags describing the banner.
	 */
	public setType(info?: string[]) {
		this.type = this.type.concat(info || []);
	}

	/**
	 * Sets the caption, if one is provided.
	 *
	 * @param caption A description of the banner picture
	 */
	public setCaption(caption?: string) {
		if (caption) {
			this.caption = caption;
		}
		else {
			this.caption = null;
		}
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
	 * @param list The list of banner objects for which the relative frequency
	 * is calculated. This is not an intrinsic property, as the actual frequency
	 * of a banner's occurrence is dependent on its peers.
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
 * Selects a random BannerImg from the list, with respect to each BannerImg's
 * relative probability of occurrence.
 *
 * @param list The list of banners being scanned.
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
 * @param name The name of the banner to look up from the list
 * @param list The list of BannerImgs in which to look up the name
 */
function deserializeBanner(name: string, list: BannerImg[]): BannerImg {
	//  Return null if either parameter fails to exist
	if (!name || !list) {
		return null;
	}
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
 *
 * @param banner Some banner to be deployed
 */
function deployBanner(banner: BannerImg) {
	if (banner !== null) {
		$("header").css({
			"background-image": banner.getCssUrl(),
			"background-position": banner.getPosition(),
		});
		if (banner.caption) {
			$("header").attr("title", banner.caption);
		}
	}
}

/**
 * Asynchronous data retrieval handle.
 */
let bannerFetch = $.getJSON("/javascripts/banners.json");

/**
 * Set the banner, either from a cookie or from a new draw.
 */
function setBanner(jsonData: BannerJson[], path?: string) {
	let banners = jsonData.map(bjson => BannerImg.from_json(bjson));
	let pathTrue;
	if (!path) {
		pathTrue = "/";
	}
	else {
		pathTrue = path;
	}
	let cookieDir = new Cookie(`banner_${path}`, {
		path: pathTrue,
	});
	let cookiePage = new Cookie(`banner_${path}`, {
		path: pathTrue + ".html",
	});
	//  This will be null if the cookie does not exist (new visitors or if the
	//  cookie expired and was destroyed).
	let bannerStore;
	if (document.location.pathname == pathTrue + ".html") {
		bannerStore = cookiePage.read();
	}
	else {
		bannerStore = cookieDir.read();
	}
	//  deserializeBanner safely handles null inputs, so null-checks are not
	//  required here.
	let oldBanner = deserializeBanner(bannerStore, banners);
	//  If the deserializer returns a valid image, we're set.
	if (oldBanner !== null) {
		deployBanner(oldBanner);
	}
	//  Otherwise, start banner selection from scratch.
	else {
		//  TODO: Create other lists and permit choosing among them.
		let newBanner = randomBanner(banners);
		//  Use the ever-handy MomentJS library to come up with a timestamp an
		//  hour in the future.
		let newExpiry = moment().utc().add(1, "hour").toString();
		//  Write to the banner cookie with the new name and expiration time.
		cookieDir.create(newBanner.name).update({expires: newExpiry});
		cookiePage.create(newBanner.name).update({expires: newExpiry});
		//  Set the CSS to actually use the newly chosen banner.
		deployBanner(newBanner);
	}
}
