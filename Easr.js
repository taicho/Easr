// The MIT License (MIT)
// Copyright (c) 2013 Azad Ratzki
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
var Easr;
(function (Easr) {
    var currentNumber = -1;
    (function (AnimationType) {
        AnimationType._map = [];
        AnimationType._map[0] = "Integer";
        AnimationType.Integer = 0;
        AnimationType._map[1] = "Decimal";
        AnimationType.Decimal = 1;
        AnimationType._map[2] = "Color";
        AnimationType.Color = 2;
    })(Easr.AnimationType || (Easr.AnimationType = {}));
    var AnimationType = Easr.AnimationType;
    var Functions;
    (function (Functions) {
        function createCssAnimation(animation) {
            currentNumber++;
            var style = document.createElement("style");
            style.type = "text/css";
            style.id = "easrStyle" + currentNumber.toString();
            var fromToString = "";
            switch(animation.Type) {
                case AnimationType.Color:
                    fromToString = "from { background:  ?from;} to {background: ?to;}".replace("?from", animation.From).replace("?to", animation.To);
                    break;
                case AnimationType.Decimal:
                    fromToString = "from { width:  ?frompx;} to {width: ?topx;}".replace("?from", animation.From).replace("?to", animation.To);
                    break;
                case AnimationType.Integer:
                    fromToString = "from { width:  ?frompx;} to {width: ?topx;}".replace("?from", animation.From).replace("?to", animation.To);
                    break;
            }
            var cssAnimationName = "easr" + currentNumber.toString();
            var cssAnimationString = "@keyframes ?animationName { ?fromTo } @-webkit-keyframes ?animationName { ?fromTo }".replace(/\?animationName/g, cssAnimationName).replace(/\?number/g, currentNumber.toString()).replace(/\?fromTo/g, fromToString);
            document.getElementsByTagName("head")[0].appendChild(style);
            var fakeDiv = document.createElement("div");
            fakeDiv.id = "easrDiv" + currentNumber.toString();
            var className = "#" + fakeDiv.id;
            document.getElementsByTagName("body")[0].appendChild(fakeDiv);
            var divAnimationString = "?className { visibility: hidden; animation: ?animationName ?durations ?easing ?delays ?iteration ?autoReverse forwards; -webkit-animation: ?animationName ?durations ?easing ?delays ?iteration ?autoReverse forwards; }";
            divAnimationString = divAnimationString.replace(/\?className/g, className);
            divAnimationString = divAnimationString.replace(/\?animationName/g, cssAnimationName);
            divAnimationString = divAnimationString.replace(/\?duration/g, (animation.Duration / 1000).toString());
            divAnimationString = divAnimationString.replace(/\?easing/g, animation.Easing);
            divAnimationString = divAnimationString.replace(/\?delay/g, (animation.Delay / 1000).toString());
            divAnimationString = divAnimationString.replace(/\?iteration/g, animation.Forever ? "infinite" : animation.Iterations.toString());
            divAnimationString = divAnimationString.replace(/\?autoReverse/g, animation.AutoReverse ? "alternate" : "normal");
            style.innerHTML = cssAnimationString + " " + divAnimationString;
            return fakeDiv;
        }
        Functions.createCssAnimation = createCssAnimation;
    })(Functions || (Functions = {}));
    var Animation = (function () {
        function Animation(From, To, Duration, Delay, Type, Easing, Iterations, Forever, AutoReverse) {
            if (typeof Delay === "undefined") { Delay = 0; }
            if (typeof Type === "undefined") { Type = AnimationType.Integer; }
            if (typeof Easing === "undefined") { Easing = "linear"; }
            if (typeof Iterations === "undefined") { Iterations = 1; }
            if (typeof Forever === "undefined") { Forever = false; }
            if (typeof AutoReverse === "undefined") { AutoReverse = false; }
            this.From = From;
            this.To = To;
            this.Duration = Duration;
            this.Delay = Delay;
            this.Type = Type;
            this.Easing = Easing;
            this.Iterations = Iterations;
            this.Forever = Forever;
            this.AutoReverse = AutoReverse;
            this.Node = Functions.createCssAnimation(this);
        }
        Object.defineProperty(Animation.prototype, "Value", {
            get: function () {
                if(this.Type == AnimationType.Color) {
                    return window.getComputedStyle(this.Node).getPropertyValue("background-color");
                } else {
                    var val = window.getComputedStyle(this.Node).getPropertyValue("width").replace("px", "");
                    if(val >= this.To) {
                        val = this.To;
                    }
                    if(this.Type == AnimationType.Integer) {
                        val = Math.floor(val);
                    }
                    return val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Animation.prototype.stop = function () {
            var style = document.getElementById("easrStyle" + this.Node.id.replace("easrDiv", ""));
            style.parentElement.removeChild(style);
        };
        Animation.prototype.start = function () {
            this.Node = Functions.createCssAnimation(this);
        };
        return Animation;
    })();
    Easr.Animation = Animation;    
    function startCallbackAnimation(callBack, From, To, Duration, Delay, Type, Easing, Iterations, Forever, AutoReverse) {
        if (typeof Delay === "undefined") { Delay = 0; }
        if (typeof Type === "undefined") { Type = AnimationType.Integer; }
        if (typeof Easing === "undefined") { Easing = "linear"; }
        if (typeof Iterations === "undefined") { Iterations = 1; }
        if (typeof Forever === "undefined") { Forever = false; }
        if (typeof AutoReverse === "undefined") { AutoReverse = false; }
        var animation = new Animation(From, To, Duration, Delay, Type, Easing, Iterations, Forever, AutoReverse);
        var loop = function () {
            callBack(animation);
            window.requestAnimationFrame(loop);
        };
        window.requestAnimationFrame(loop);
        return animation;
    }
    Easr.startCallbackAnimation = startCallbackAnimation;
})(Easr || (Easr = {}));
