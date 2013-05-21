Easr
====

Easr: CSS-based JavaScript Animation Library

Leverages the CSS3 animation sub-system for use in JavaScript. All animation types and easings that are supported in CSS are supported in Easr.


Usage
=======

1. Create as many animations as desired...

<pre><code>
    // Parameters (From,To,Duration in ms, Delay, Easr.AnimationType, easing function, repeat count, repeat forever, auto-reverse)                                       
    var animation = new Easr.Animation(0, 600, 1000, 0, Easr.AnimationType.Integer, "ease-in-out", 1, true, true);

    //Once created the animation begins immediately and the current value be fetched at any time.
    var currentValue = animation.Value;
</code></pre> 


2. Stopping an animation

Because the underlying system is CSS animations that repeat forever will indeed repeat forever so to stop them call stop() on the animation and if you wish to start it again call start().



License
=======
The MIT License (MIT)

Copyright (c) 2013 Azad Ratzki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

