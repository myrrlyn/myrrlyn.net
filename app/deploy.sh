#!/bin/bash

set -euo pipefail

bundle exec middleman build
ssh droplet "rm -rv /srv/http/myrrlyn/myrrlyn.net/build"
echo "put -r build" | sftp droplet:/srv/http/myrrlyn/myrrlyn.net
rm -r build
