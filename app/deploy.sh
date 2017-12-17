#!/bin/bash

if [[ ! -d build ]]; then
	echo "This should only be run by middleman build!"
	exit 1
fi

parallel -q -j $(parallel --num-cpu-cores) "\
if [[ -f {} ]]; then \
	keybase sign -i {} -d \
	| sed s/'\. '/.\n/g \
	| fold -w 72 -s \
	> {}.kbs; \
	gpg -a -b --output {}.asc {}; \
fi" ::: build/**/* build/*

if [[ "${MIDDLEMAN_DEPLOY}" -eq 1 ]]; then
	echo "put -r build" | sftp droplet:/srv/http/myrrlyn/myrrlyn.net
	rm -r build
fi
