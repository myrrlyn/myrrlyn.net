dest = "/srv/http/myrrlyn/myrrlyn.net/build"
rsync_args = "-a -i -m -z --delete-delay --progress --inplace -e ssh"
target = "droplet"

build:
	bundle exec middleman build

deploy: build
	rsync {{rsync_args}} build/ myrrlyn@{{target}}:{{dest}}
	rm -r build/

serve:
	bundle exec middleman serve

update:
	bundle update
