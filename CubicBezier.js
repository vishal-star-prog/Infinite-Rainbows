// Infinite Rainbows
// This code is adapted from Infinite Rainbows,
// a generative animation by [Marius Watz](http://mariuswatz.com/).
// The original Actionscript version was commissioned by
// [POKE](http://pokelondon.com) as part of Good Things Should Never End,
// an online brand experience for Orange UK.

// Marius Watz and Poke have generously given permission
// for this p5.js port started by Daniel Shiffman for use
// on the YouTube channel "Coding Rainbow."

// This work is licensed under a Creative Commons
// Attribution-NonCommercial 4.0 International License
// http://creativecommons.org/licenses/by-nc/4.0/).

// Still in progress!


function drawBeziers(mc, intPoints) {
  var n, id;

  n = (intPoints.length - 1) / 3;
  id = 0;
  for (var j = 0; j < n; j++) {
    id = 3 * j;
    drawBezierMidpoint(mc, intPoints[id], intPoints[id + 1], intPoints[id + 2], intPoints[id + 3]);
  }
}

/**
 * Taken from http://www.timotheegroleau.com/Flash/articles/cubic_bezier_in_flash.htm
 * By Timothee Groleau, with much respect
 */
function drawBezierMidpoint(mc, P0, P1, P2, P3) {
  // calculates the useful base points
  var PA = getPointOnSegment(P0, P1, 3 / 4);
  var PB = getPointOnSegment(P3, P2, 3 / 4);

  // get 1/16 of the [P3, P0] segment
  var dx = (P3.x - P0.x) / 16;
  var dy = (P3.y - P0.y) / 16;

  // calculates control point 1
  var Pc_1 = getPointOnSegment(P0, P1, 3 / 8);

  // calculates control point 2
  var Pc_2 = getPointOnSegment(PA, PB, 3 / 8);
  Pc_2.x -= dx;
  Pc_2.y -= dy;

  // calculates control point 3
  var Pc_3 = getPointOnSegment(PB, PA, 3 / 8);
  Pc_3.x += dx;
  Pc_3.y += dy;

  // calculates control point 4
  var Pc_4 = getPointOnSegment(P3, P2, 3 / 8);

  // calculates the 3 anchor points
  var Pa_1 = getMiddle(Pc_1, Pc_2);
  var Pa_2 = getMiddle(PA, PB);
  var Pa_3 = getMiddle(Pc_3, Pc_4);

  // draw the four quadratic subsegments
  mc.curveTo(Pc_1.x, Pc_1.y, Pa_1.x, Pa_1.y);
  mc.curveTo(Pc_2.x, Pc_2.y, Pa_2.x, Pa_2.y);
  mc.curveTo(Pc_3.x, Pc_3.y, Pa_3.x, Pa_3.y);
  mc.curveTo(Pc_4.x, Pc_4.y, P3.x, P3.y);
}

function getPointOnSegment(P0, P1, ratio) {
  return {
    x: (P0.x + ((P1.x - P0.x) * ratio)),
    y: (P0.y + ((P1.y - P0.y) * ratio))
  };
}


function getMiddle(P0, P1) {
  return {
    x: ((P0.x + P1.x) / 2),
    y: ((P0.y + P1.y) / 2)
  };
}
