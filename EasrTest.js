///<reference path="Easr.ts" />
var EasrTest;
(function (EasrTest) {
    var context = null;
    var lineAnimation = null;
    var humpAnimation = null;
    var redColorAnimation = null;
    var greenColorAnimation = null;
    var blueColorAnimation = null;
    var slider = null;
    function init() {
        var slider = document.getElementById("slider");
        slider.onchange = function () {
            var val = (slider).value;
            humpAnimation.stop();
            console.log(val);
            humpAnimation = new Easr.Animation(0, 50, val, 0, Easr.AnimationType.Integer, "ease-in-out", 1, true, true);
        };
        context = (document.getElementsByTagName("canvas")[0]).getContext("2d");
        //Setup initial animations
        lineAnimation = new Easr.Animation(0, 620, 1000, 0, Easr.AnimationType.Integer, "ease-in-out", 1, true, true);
        humpAnimation = new Easr.Animation(0, 50, 250, 0, Easr.AnimationType.Integer, "ease-in-out", 1, true, true);
        redColorAnimation = new Easr.Animation("rgba(255,0,0,1.0)", "rgba(0,255,0,1.0)", 100, 0, Easr.AnimationType.Color, "ease-in-out", 1, true, true);
        greenColorAnimation = new Easr.Animation("rgba(0,255,0,1.0)", "rgba(0,0,255,1.0)", 100, 0, Easr.AnimationType.Color, "ease-in-out", 1, true, true);
        blueColorAnimation = new Easr.Animation("rgba(0,0,255,1.0)", "rgba(0,0,0,1.0)", 100, 0, Easr.AnimationType.Color, "ease-in-out", 1, true, true);
        //Start render loop
        window.requestAnimationFrame(draw);
        //Clear the frame every second
        setTimeout(function () {
            setInterval(function () {
                context.fillStyle = "rgba(0,0,0,1.0)";
                context.fillRect(0, 0, 640, 480);
            }, 1000);
        }, 1000);
    }
    EasrTest.init = init;
    //Draw loop
    function draw() {
        context.fillStyle = redColorAnimation.Value;
        context.fillRect(lineAnimation.Value, 100 + humpAnimation.Value, 20, 20);
        context.fillStyle = greenColorAnimation.Value;
        context.fillRect(lineAnimation.Value, 200 + humpAnimation.Value, 20, 20);
        context.fillStyle = blueColorAnimation.Value;
        context.fillRect(lineAnimation.Value, 300 + humpAnimation.Value, 20, 20);
        window.requestAnimationFrame(draw);
    }
})(EasrTest || (EasrTest = {}));
window.onload = function () {
    EasrTest.init();
};
