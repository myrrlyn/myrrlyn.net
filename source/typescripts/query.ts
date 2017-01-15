/**
 * Crawls the URL's query-string section looking for instances of a key.
 *
 * Returns an array of any matching values.
 */
function search(key: string): string[] {
	let qstring = document.location.search;
	if (qstring[0] == "?") {
		return qstring
			//  Kill the leading ?
			.substring(1)
			//  Split from k1=v1&k2=v2 into ["k1=v1", "k2=v2"]
			.split("&")
			//  Transform "k=v" into [k, v]
			.map(pair => pair.split("="))
			//  Discard key/val pairs that don't match our search key
			.filter(pair => pair[0] == key)
			//  Throw away the key half
			.map(pair => pair[1])
			//  Throw away all but the last value
			// .reduce((prev, cur, idx) => prev = cur)
	}
	else {
		return [];
	}
}
