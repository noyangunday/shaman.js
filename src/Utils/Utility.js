/*

This file is part of shaman.js

Copyright (C) 2014, VISUEM LTD

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom
the Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall
be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/

goog.provide('shaman.Utility');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*
*        utility functions
*
*    author-       noyan gunday
*    last edited-  14 May 2014
*
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.Utility = function ()
{
};

/*  A 32-bit buffer and 2 different (float and int) representations.
Used for bitwise hacks on floats. */
shaman.Utility.buffer32 = new ArrayBuffer(4);
shaman.Utility.ui32reg = new Uint32Array(shaman.Utility.buffer32);
shaman.Utility.f32reg = new Float32Array(shaman.Utility.buffer32);

shaman.Utility.GetShaderSource = function(id)
{
        var source = document.getElementById(id);
        var string = "";
        var node = source.firstChild;
        while (node)
        {
                if (node.nodeType == 3)
                {
                        string += node.textContent;
                }
                node = node.nextSibling;
        }
        return string;
};

shaman.Utility.RandRange = function(min, max)
{
        return Math.random() * (max - min) + min;
};

shaman.Utility.RandRangeInt = function(min, max)
{
        return Math.floor(Math.random() * (max - min + 1)) + min;
};

shaman.Utility.FlipCoin = function(heads, tails)
{
        var r = shaman.Utility.RandRangeInt(0, 1);
        return ((r === 0)?(heads):(tails));
};

shaman.Utility.GetTime = (function() {
        var p = window.performance || {};
        var n = p.now || p.mozNow || p.webkitNow || p.msNow || p.oNow;
        return (n) ? (n.bind(p)) : (function() {return Date.now();});
})();
