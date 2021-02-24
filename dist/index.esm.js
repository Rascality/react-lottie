import React from 'react';
import lottiePlayer from 'lottie-web';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var Lottie = /** @class */ (function (_super) {
    __extends(Lottie, _super);
    function Lottie() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultLottieConfig = {
            renderer: 'svg',
            loop: false,
            autoplay: true,
        };
        _this.setAnimationPlayingState = function (state) {
            switch (state) {
                case 'playing': {
                    _this.triggerPlayBasedOnSegments();
                    return;
                }
                case 'stopped': {
                    _this.animationItem.stop();
                    return;
                }
                case 'paused': {
                    _this.animationItem.pause();
                    return;
                }
                default: {
                    throw new Error('Playing state not specified.');
                }
            }
        };
        _this.setContainerRef = function (element) {
            _this.containerRef = element;
        };
        return _this;
    }
    Lottie.prototype.componentDidMount = function () {
        var _a = this.props, configFromProps = _a.config, animationRef = _a.animationRef, lottieEventListeners = _a.lottieEventListeners;
        this.config = __assign(__assign(__assign({}, this.defaultLottieConfig), configFromProps), { container: this.containerRef });
        this.animationItem = lottiePlayer.loadAnimation(this.config);
        if (animationRef) {
            animationRef.current = this.animationItem;
        }
        this.addEventListeners(lottieEventListeners);
        this.configureAnimationItem();
    };
    Lottie.prototype.UNSAFE_componentWillUpdate = function (nextProps) {
        //TODO: to be refactored
        var animationDataChanged = this.config.animationData !==
            nextProps.config.animationData;
        var animationPathChanged = this.config.path !== nextProps.config.path;
        if (animationDataChanged || animationPathChanged) {
            this.removeEventListeners(this.props.lottieEventListeners);
            this.animationItem.destroy();
            this.config = __assign(__assign({}, this.config), nextProps.config);
            this.animationItem = lottiePlayer.loadAnimation(this.config);
            this.addEventListeners(nextProps.lottieEventListeners);
        }
    };
    Lottie.prototype.componentDidUpdate = function () {
        this.configureAnimationItem();
    };
    Lottie.prototype.componentWillUnmount = function () {
        this.removeEventListeners(this.props.lottieEventListeners);
        this.animationItem.destroy();
        this.config.animationData = null;
        this.config.path = null;
        this.animationItem = null;
    };
    Lottie.prototype.configureAnimationItem = function () {
        var _a = this.props, playingState = _a.playingState, speed = _a.speed, direction = _a.direction;
        this.setAnimationPlayingState(playingState);
        this.animationItem.setSpeed(speed);
        this.animationItem.setDirection(direction);
    };
    Lottie.prototype.triggerPlayBasedOnSegments = function () {
        var segments = this.props.segments;
        if (segments) {
            this.animationItem.playSegments(segments);
        }
        else {
            this.animationItem.play();
        }
    };
    Lottie.prototype.addEventListeners = function (reactLottieEvents) {
        var _this = this;
        reactLottieEvents.forEach(function (_a) {
            var name = _a.name, callback = _a.callback;
            _this.animationItem.addEventListener(name, callback);
        });
    };
    Lottie.prototype.removeEventListeners = function (reactLottieEvents) {
        var _this = this;
        reactLottieEvents.forEach(function (_a) {
            var name = _a.name, callback = _a.callback;
            _this.animationItem.removeEventListener(name, callback);
        });
    };
    Lottie.prototype.render = function () {
        var _a = this.props, width = _a.width, height = _a.height, style = _a.style, className = _a.className;
        var lottieStyle = __assign({ width: width, height: height }, style);
        return React.createElement("div", { className: className, ref: this.setContainerRef, style: lottieStyle });
    };
    Lottie.defaultProps = {
        lottieEventListeners: [],
        playingState: 'playing',
        speed: 1,
        height: '100%',
        width: '100%',
    };
    return Lottie;
}(React.PureComponent));

export { Lottie };
