#!/bin/bash

if [[ ! -d build ]]; then
	echo "This should only be run by middleman build!"
	exit 1
fi

function sign () {
	echo "Signing ${1}"
	# Reformat keybase signatures to use multiple lines. This does not affect
	# signature consumption.
	keybase sign -i "${1}" -d \
	| sed s/'\. '/'.\n'/g \
	| fold -w 72 -s \
	> "${1}.kbs"
	gpg -a -b --output "${1}.asc" "${1}"
}

for file in build/**/*; do
	if [[ -f "${file}" ]]; then
		sign "${file}"
	fi
done

for file in build/*; do
	if [[ -f "${file}" ]]; then
		sign "${file}"
	fi
done

if [[ "${MIDDLEMAN_DEPLOY}" -eq 1 ]]; then
	echo "put -r build" | sftp droplet:/srv/http/myrrlyn/myrrlyn.net
	rm -r build
fi
