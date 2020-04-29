"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function line(ctx, fromX, fromY, toX, toY) {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
}
exports.line = line;
