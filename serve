#!/bin/sh

function start() {
	echo "Starting the TypeScript watcher"
	tsc --watch >"$(filename tsc.out log)" 2>"$(filename tsc.err log)" &
	echo $! > "$(filename tsc pid)"
	echo "Starting the Middleman server"
	bundle exec middleman serve >"$(filename mid.out log)" 2>"$(filename mid.err log)" &
	echo $! > "$(filename mid pid)"
}

function stop() {
	echo "Stopping the Middleman server"
	kill $(cat $(filename mid pid))
	rm "$(filename mid pid)"
	echo "Stopping the TypeScript watcher"
	kill $(cat $(filename tsc pid))
	rm "$(filename tsc pid)"
}

function filename() {
	echo "${1}-$(cat /etc/hostname).${2}"
}

case $1 in
	start)
		start
	;;
	stop)
		stop
	;;
	*)
		echo "Use start to turn on the servers or stop to stop them."
	;;
esac
