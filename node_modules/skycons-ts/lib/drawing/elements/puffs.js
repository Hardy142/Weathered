"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var puff_1 = require("./puff");
function puffs(ctx, time, cx, cy, rx, ry, radiusMin, radiusMax) {
    for (var i = 0; i < 5; ++i) {
        puff_1.puff(ctx, time + i / 5, cx, cy, rx, ry, radiusMin, radiusMax);
    }
}
exports.puffs = puffs;
