dest = "/srv/http/myrrlyn/myrrlyn.net/build"
rsync_args = "-a -i -m -z --delete-delay --progress --inplace -e ssh"
target = "droplet"

# Build strips all non-tracked files in build/, such as signature files
build:
	tsc
	gsed -i 's:^import .*$::' source/javascripts/*.js
	gsed -i 's:^ *export ::' source/javascripts/*.js
	bundle exec middleman build

clean:
	rm -r build/

deploy: sign
	rsync {{rsync_args}} build/ myrrlyn@{{target}}:{{dest}}

serve:
	bundle exec middleman serve

sign: build
	app/sign.sh

update:
	bundle update
