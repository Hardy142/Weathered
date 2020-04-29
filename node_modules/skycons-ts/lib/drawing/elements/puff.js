"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../constants");
var circle_1 = require("./circle");
function puff(ctx, time, cx, cy, rx, ry, radiusMin, radiusMax) {
    var c = Math.cos(time * constants_1.TAU);
    var s = Math.sin(time * constants_1.TAU);
    radiusMax -= radiusMin;
    circle_1.circle(ctx, cx - s * rx, cy + c * ry + radiusMax * 0.5, radiusMin + (1 - c * 0.5) * radiusMax);
}
exports.puff = puff;
