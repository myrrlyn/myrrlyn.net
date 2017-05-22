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
	read(): string;
	/**
	 * Update a record
	 */
	update(value: any): ICrud;
	/**
	 * Delete a record
	 */
	destroy(): ICrud;
}

/**
 * Manipulator for a specific cookie key.
 *
 * Each key in the cookie stash requires a separate object.
 */
class Cookie implements ICrud {
	/**
	 * The key on which this cookie operates.
	 */
	key: string;
	/**
	 * A string value to be stored at this Cookie's key. The empty string is a
	 * legal value to be stored, and will not cause the key to be removed.
	 */
	value: string = "";
	/**
	 * Browser options affecting the cookie. See cookie documentation for more.
	 */
	options: Object = {};

	/**
	 * Builds a new cookie acting on a specified key.
	 *
	 * @param key The key on which this cookie acts.
	 * @param opts An optional list of key/value pairs.
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
	 *
	 * Returns null if the key is not in storage, and a string (even an empty
	 * string) if it is.
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
				//  Don't clobber previous answer if the current query fails.
				return prev;
			}
		}, null);
	}

	/**
	 * Store some data at this cookie's key.
	 *
	 * @param value Some data to be stored in the cookie.
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
	 * key, so this returns the val stored at that key.
	 *
	 * Returns "" for a present but empty key (key=).
	 * Returns null for a key that is not present in the cookie stash.
	 */
	public read() {
		return this.value = this.getStorage();
	}

	/**
	 * Updates the cookie's options (not the cookie's data).
	 *
	 * Create and Update both consist of assigning to document.cookie, and since
	 * cookies store data and options separately, the C/U split is on payload
	 * rather than on action.
	 *
	 * @param opts A list of key/val pairs of options to set on the cookie.
	 */
	public update(opts: Object) {
		this.options = $.extend(this.options, opts);
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
	 *
	 * Note that this includes the cookie's options, which are not retrievable
	 * via the document.cookie object. The primary difference between this and
	 * read() is that read() returns the data in the browser's cookie storage,
	 * while this serializes the cookie from memory. The data it returns may not
	 * reflect actual storage.
	 */
	public toString() {
		let str = `${this.key}=${this.value}`;
		let self = this;
		str += Object.keys(this.options).reduce(function(prev, cur, idx, all) {
			return `${prev};${cur}=${self.options[cur]}`;
		}, "");
		return str;
	}
}

/**
 * Abstract base class for working with the Storage API.
 *
 * The concrete implementors are LocalStorage for access to the persistent
 * `localStorage`, and SessionStorage for access to the ephemeral
 * `sessionStorage`.
 */
class ClientStorage implements ICrud {
	/**
	 * Index key under which data is stored
	 */
	key: string;
	/**
	 * The actual value stored in the database. It can be a raw string or a JSON
	 * string.
	 */
	value: string = "";
	/**
	 * Collection of options defined on the value. Because the database only
	 * stores strings, metadata such as Cookie path/expiration are not natively
	 * possible. The options object holds metadata (accessed via `update()`)
	 * that serializes alongside the main value but is stripped from it upon
	 * deserialization.
	 */
	options: {
		expires: number,
		path: string,
	} = {
		expires: undefined,
		path: undefined,
	};
	/**
	 * Reference to the Storage API object powering this class.
	 */
	store?: Storage = null;

	/**
	 * Constructs a new Storage API governor over the given Storage using the
	 * given key.
	 *
	 * @param store Either `localStorage` for persistent access or
	 * `sessionStorage` for ephemeral access.
	 * @param key The index key this object governs.
	 */
	constructor(store: Storage, key: string) {
		this.key = key;
		this.store = store;
		//  Attempt to retrieve a value associated with our key.
		let tmp = this.getStorage();
		//  On failure, Storage.getItem() returns null, Storage[] returns
		//  undefined.
		if (tmp !== null && tmp !== undefined) {
			this.value = tmp;
			//  Attempt to strip metadata from the serialized form.
			try {
				this.extractOptions();
			}
			//  If it fails, then the stored item was not JSON. This is not an
			//  error.
			catch (err) {
				console.info(`Storage item { ${this.key} : ${this.value} } is not valid JSON.`);
			}
		}
		//  Self-destruct if the expiration time has passed.
		//  This does not affect object creation; it just wipes the stored value
		//  in this object's memory and in the Storage collection.
		if (this.options["expires"]) {
			let eol: number = this.options["expires"];
			if (eol < Date.now()) {
				this.destroy();
			}
		}
	}

	/**
	 * Looks up the value under our key in the Storage collection.
	 *
	 * Returns null if there is no value; returns a string otherwise.
	 */
	private getStorage(): string {
		try {
			return this.store.getItem(this.key);
		}
		catch (err) {
			console.error("Base class ClientStorage cannot be used directly!");
			return null;
		}
	}

	/**
	 * Serializes this object into JSON, if possible, and stores it.
	 *
	 * If the object's value is not valid JSON, then it will be stored raw
	 * without any metadata.
	 */
	private setStorage(): ClientStorage {
		let val: Object = null;
		//  Attempt to parse our value.
		try {
			if (this.value === "") {
				this.value = "{}";
			}
			val = JSON.parse(this.value);
		}
		//  If it cannot be parsed, that is okay. Store it and return.
		catch (err) {
			console.info(`Storage item { ${this.key} : ${this.value} } is not valid JSON, and cannot be stored with attributes.`);
			try {
				this.store.setItem(this.key, this.value);
			}
			catch (err) {
				console.error("Base class ClientStorage cannot be used directly!");
			}
			return this;
		}
		//  If it can be parsed, extend the value object with the options object
		val = $.extend(val, this.options);
		try {
			//  And store the combination.
			this.store.setItem(this.key, JSON.stringify(val));
		}
		catch (err) {
			console.error("Base class ClientStorage cannot be used directly!");
		}
		return this;
	}

	/**
	 * Extracts metadata fields from a serialized ClientStorage string, leaving
	 * the remaining fields untouched.
	 *
	 * If the current value string is not JSON, it is not modified.
	 */
	private extractOptions() {
		try {
			let tmp = JSON.parse(this.value);
			//  Migrate all known metadata from the serialized value into the
			//  options struct.
			Object.keys(this.options).forEach(opt => {
				if (tmp.hasOwnProperty(opt)) {
					this.options[opt] = tmp[opt];
					tmp[opt] = undefined;
				}
			});
			this.value = JSON.stringify(tmp);
		}
		catch (err) {
			console.info(`Storage item { ${this.key} : ${this.value} } is not valid JSON, and cannot have attributes retrieved.`);
		}
	}

	/**
	 * Writes an object into the Storage under this object's key.
	 */
	public create(value: any): ClientStorage {
		if (value === undefined || value === null) {
			this.value = "";
		}
		else {
			try {
				this.value = JSON.stringify(value);
			}
			catch (err) {
				console.info(`${value} is not valid JSON; storing raw.`);
				this.value = value.toString();
			}
		}
		return this.setStorage();
	}

	/**
	 * Read a string out of the backing Storage.
	 */
	public read(): string {
		let ret = this.getStorage();
		try {
			this.value = JSON.parse(ret);
			this.extractOptions();
			return JSON.stringify(this.value);
		}
		catch (err) {
			console.debug(`Storage item { ${this.key} : ${this.value} } is not valid JSON.`)
			return ret;
		}
	}

	/**
	 * Modify metadata attributes of the object.
	 *
	 * This method is only usable when the base stored value is already JSON.
	 */
	public update(opts: Object): ClientStorage {
		this.options = $.extend(this.options, opts);
		this.setStorage();
		return this;
	}

	/**
	 * Wipes the database entry and this object.
	 */
	public destroy(): ClientStorage {
		this.store.removeItem(this.key);
		this.value = "";
		Object.keys(this.options).forEach(opt => {
			this.options[opt] = undefined;
		});
		return this;
	}
}

/**
 * Storage API class for accessing the persistent storage.
 */
class LocalStorage extends ClientStorage implements ICrud {
	constructor(key: string, opts?: {}) {
		super(window.localStorage, key);
		this.update(opts);
	}

	public makeSession(): SessionStorage {
		let ret: SessionStorage = new SessionStorage(this.key);
		ret.create(this.value).update(this.options);
		this.destroy();
		return ret;
	}
}

/**
 * Storage API class for accessing the ephemeral storage.
 */
class SessionStorage extends ClientStorage implements ICrud {
	constructor(key: string, opts?: {}) {
		super(window.sessionStorage, key);
		this.update(opts);
	}

	public makeLocal(): LocalStorage {
		let ret: LocalStorage = new LocalStorage(this.key);
		ret.create(this.value).update(this.options);
		this.destroy();
		return ret;
	}
}
