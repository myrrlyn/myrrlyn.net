#!/bin/bash

if [[ -f $1 ]]; then
	keybase sign -i $1 -d \
	| sed s/'\. '/.\\n/g \
	| fold -w 72 -s \
	> $1.kbs;
	gpg -a -b --output $1.asc $1;
fi
