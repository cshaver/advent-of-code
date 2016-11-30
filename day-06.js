'use strict';

/*
--- Day 6: Probably a Fire Hazard ---

Because your neighbors keep defeating you in the holiday house decorating contest year after year, you've decided to deploy one million lights in a 1000x1000 grid.

Furthermore, because you've been especially nice this year, Santa has mailed you instructions on how to display the ideal lighting configuration.

Lights in your grid are numbered from 0 to 999 in each direction; the lights at each corner are at 0,0, 0,999, 999,999, and 999,0. The instructions include whether to turn on, turn off, or toggle various inclusive ranges given as coordinate pairs. Each coordinate pair represents opposite corners of a rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore refers to 9 lights in a 3x3 square. The lights all start turned off.

To defeat your neighbors this year, all you have to do is set up your lights by doing the instructions Santa sent you in order.

For example:

turn on 0,0 through 999,999 would turn on (or leave on) every light.
toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that were on, and turning on the ones that were off.
turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights.
After following the instructions, how many lights are lit?
*/

function lightingInstructions(input) {
  var grid = [];

  function on(x, y) {
    // console.log('turn on', x, y);
    grid[x][y] = true;
  }

  function toggle(x, y) {
    // console.log('toggle', x, y);
    grid[x][y] = !grid[x][y];
  }

  function off(x, y) {
    // console.log('turn off', x, y);
    grid[x][y] = false;
  }

  function lights(begin, end, fn, input) {
    console.log(input, begin, end, fn.name);
    var xmin = begin[0];
    var xmax = end[0];
    var ymin = begin[1];
    var ymax = end[1];

    for (var x = xmin; x <= xmax; x++) {
      for (var y = ymin; y <= ymax; y++) {
        // console.log(x, y);
        fn(x, y);
      }
    }
  }

  // set up the all-off grid
  for (var i = 0; i < 1000; i++) {
    grid.push([]);
    for (var j = 0; j < 1000; j++) {
      grid[i].push(false);
    }
  }

  // decipher the inputs
  // input = input.split('\\n').slice(0, 10);
  input = input.split('\\n');

  for (var i = 0; i < input.length; i++) {
    var directions = input[i].split(' through ');
    var end = directions[directions.length-1].split(',');

    directions = directions[directions.length-2].split(' ');
    var begin = directions[directions.length-1].split(',');
    var type = directions.length === 3 ? (directions[0] + directions[1]) : directions[0];

    var fn;

    switch (type) {
      case 'turnon':
        fn = on;
        break;
      case 'turnoff':
        fn = off;
        break;
      case 'toggle':
      default:
        fn = toggle;
        break;
    }

    lights(begin, end, fn, input[i]);
  }

  console.log(grid);

  // reduce to count
  return grid.reduce(function(prev, curr) {
    return prev += curr.reduce(function(prev, curr) {
      return prev += curr ? 1 : 0;
    }, 0);
  }, 0);
}

/*
--- Part Two ---

*/


// function partTwo(input) {

// }

hookUpButton(lightingInstructions, 6, 1, false);
// hookUpButton(partTwo, 0, 2, true);
