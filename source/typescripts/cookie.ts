/**
 * Persistent storage operations.
 *
 * Create, Update, and Destroy functions can return their own object. Read
 * returns the stored data.
 */
interface ICrud {
	/**
	 * Create a new record
	 */
	create(value: any): ICrud;
	/**
	 * Read a record from storage
	 */
	read(): any;
	/**
	 * Update a record
	 */
	update(value: any): ICrud;
	/**
	 * Delete a record
	 */
	destroy(): ICrud;
}

class Cookie implements ICrud{
	key: string;
	value: string = "";
	options: Object = {};

	/**
	 * Builds a new cookie acting on a specified key.
	 *
	 * @param {string} key The key on which this cookie acts.
	 * @param {Object} opts An optional list of key/value pairs.
	 */
	constructor(key: string, opts?: Object) {
		//  A key is required for the Cookie to be sensibly used.
		this.key = key;
		//  It is possible that a value will already exist in storage; if so,
		//  grab it.
		let tmp = this.getStorage();
		if (tmp !== "") {
			this.value = tmp;
		}
		//  If options are given from the start, use them.
		if (opts !== undefined) {
			this.options = opts;
		}
	}

	/**
	 * Stores the cookie in the browser.
	 */
	private setStorage() {
		document.cookie = this.toString();
		return this;
	}

	/**
	 * Scans browser storage for this cookie.
	 */
	private getStorage() {
		let ckey = `${this.key}=`;
		let cookies = document.cookie.split("; ");
		return cookies.reduce(function(prev, cur, idx, all) {
			while (cur.charAt(0) == ' ') {
				cur = cur.substring(1);
			}
			if (cur.indexOf(ckey) == 0) {
				return cur.substring(ckey.length, cur.length);
			}
			else {
				return "";
			}
		}, "");
	}

	/**
	 * Store some data at this cookie's key.
	 *
	 * @param {string} value Some data to be stored in the cookie.
	 */
	public create(value?: string) {
		if (value !== undefined) {
			this.value = value;
		}
		else {
			this.value = "";
		}
		return this.setStorage();
	}

	/**
	 * Read the cookie from browser storage.
	 *
	 * Browser storage is a series of key=val; pairs. The Cookie knows its own
	 * key, so this returns the val stored at that key. A return of "" indicates
	 * that the key was empty or non-existent.
	 */
	public read() {
		this.value = this.getStorage();
		return this.value;
	}

	/**
	 * Updates the cookie's options (not the cookie's data).
	 *
	 * Create and Update both consist of assigning to document.cookie, and since
	 * cookies store data and options separately, the C/U split is on payload
	 * rather than on action.
	 *
	 * @param {Object} opts A list of key/val pairs of options to set on the
	 * cookie.
	 */
	public update(opts: Object) {
		$.extend(this.options, opts);
		return this.setStorage();
	}

	/**
	 * Removes a cookie entirely from browser storage.
	 *
	 * This is a destructive method; the cookie data is destroyed internally as
	 * well as in the browser.
	 */
	public destroy() {
		this.value = "";
		this.update({
			expires: new Date(0),
		});
		return this.setStorage();
	}

	/**
	 * Serializes the cookie.
	 */
	public toString() {
		let str = `${this.key}=${this.value}`;
		Object.keys(this.options).forEach(key => {
			str += `;${key}=${this.options[key]}`;
		});
		return str;
	}
}
