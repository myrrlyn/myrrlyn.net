#!/bin/bash

set -euo pipefail

bundle exec middleman build
rsync \
	-a \
	-i \
	-m \
	-z \
	--delete-delay \
	--progress \
	--inplace \
	-e ssh \
	build/ myrrlyn@droplet:/srv/http/myrrlyn/myrrlyn.net/build/
rm -r build/
