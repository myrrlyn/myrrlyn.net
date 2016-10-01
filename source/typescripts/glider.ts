/**
 * This script handles retrieving a list of Glider forms from the server and
 * animating a grid of cells in the DOM to appear as a moving Glider from
 * Conway's Game of Life.
 *
 * The DOM structure has already been built by ERb, so this script does not need
 * to handle any DOM generation. See layouts/glider for the DOM structure.
 */

/**
 * Handle for JSON retrieval
 */
let gliderFetch = $.getJSON("/javascripts/glider.json");
/**
 * Handle for the animation timer.
 */
let gliderTimer = null;
/**
 * State tracker for the animation.
 */
let gliderState = 0;

$(document).ready(function() {
	gliderFetch.done(runGlider);
});

/**
 * Sets up the initial display and the timer for animation.
 *
 * @param jsonData The JSON retrieved from the server describing glider layouts.
 */
function runGlider(jsonData) {
	//  As soon as the JSON and DOM are loaded, turn on the glider's first form.
	setGlider("on", jsonData.glider[0]);
	//  Set up the timer. First invocation will be after timeout, not immediate.
	gliderTimer = window.setInterval(function(data) {
		//  Turn off the active cells
		setGlider("off", data.glider[gliderState]);
		//  Cycle to the next form...
		gliderState = (gliderState + 1) % data.glider.length;
		//  Turn on the glider.
		setGlider("on", data.glider[gliderState]);
	}, 1500, jsonData);
}

/**
 * Adjusts visible cells in the DOM
 *
 * @param state "on" to activate cells in the pattern, "off" to deactivate them.
 * @param glider The list of coordinate pairs describing which cells to touch.
 */
function setGlider(state: string, glider: {cells: number[][]}) {
	glider.cells.forEach(function(cell) {
		//  CSS measures from 1, but the coordinates measure from 0
		let c = cell[0] + 1;
		let r = cell[1] + 1;
		//  Alternatively, the ERb generator also puts 0-indexed .x-$x and .y-$y
		//  classes on div.dell, so that could also be the selection target.
		//  Doesn't really matter.
		let selector = `table.glider tr:nth-child(${r}) td:nth-child(${c}) div.cell`;
		if (state == "on") {
			$(selector).addClass("active");
		}
		else if (state == "off") {
			$(selector).removeClass("active");
		}
	})
}
