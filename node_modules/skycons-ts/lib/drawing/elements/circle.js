"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../constants");
function circle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, constants_1.TAU, false);
    ctx.fill();
}
exports.circle = circle;
