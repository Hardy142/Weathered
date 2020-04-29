"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var icons_1 = require("./icons");
var Skycons = /** @class */ (function () {
    function Skycons(opts) {
        this.interval = null;
        this.list = [];
        this.opts = __assign({ color: "black", resizeClear: false }, opts);
    }
    Skycons.prototype.add = function (elementOrId, draw) {
        var canvas = this.getCanvas(elementOrId);
        if (!canvas) {
            return;
        }
        var ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        var obj = {
            context: ctx,
            drawing: icons_1.getIconDrawingFunctionByName(draw),
            element: canvas
        };
        this.list.push(obj);
        this.draw(obj, constants_1.KEYFRAME);
    };
    Skycons.prototype.set = function (elementOrId, draw) {
        var canvas = this.getCanvas(elementOrId);
        var obj = this.list.find(function (o) { return o.element === canvas; });
        if (obj) {
            obj.drawing = icons_1.getIconDrawingFunctionByName(draw);
            this.draw(obj, constants_1.KEYFRAME);
        }
        else {
            this.add(canvas, draw);
        }
    };
    Skycons.prototype.remove = function (elementOrId) {
        var canvas = this.getCanvas(elementOrId);
        var i = this.list.findIndex(function (o) { return o.element === canvas; });
        if (i >= 0) {
            this.list.splice(i, 1);
        }
    };
    Skycons.prototype.draw = function (obj, time) {
        var canvas = obj.context.canvas;
        if (this.opts.resizeClear) {
            canvas.width = canvas.width;
        }
        else {
            obj.context.clearRect(0, 0, canvas.width, canvas.height);
        }
        obj.context.lineCap = "round";
        obj.context.lineJoin = "round";
        obj.context.strokeStyle = this.opts.color;
        obj.context.fillStyle = this.opts.color;
        obj.drawing(obj.context, time);
    };
    Skycons.prototype.play = function () {
        var _this = this;
        this.pause();
        var loop = function () {
            var now = Date.now();
            _this.list.forEach(function (o) { return _this.draw(o, now); });
            _this.interval = requestAnimationFrame(loop);
        };
        this.interval = requestAnimationFrame(loop);
    };
    Skycons.prototype.pause = function () {
        if (this.interval) {
            cancelAnimationFrame(this.interval);
            this.interval = null;
        }
    };
    Skycons.prototype.getCanvas = function (elementOrId) {
        if (typeof elementOrId === "string") {
            return document.getElementById(elementOrId);
        }
        else {
            return elementOrId;
        }
    };
    return Skycons;
}());
exports.Skycons = Skycons;
