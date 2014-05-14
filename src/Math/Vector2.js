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

goog.provide('shaman.Vector2');
goog.require('shaman.Vector');
goog.require('shaman.MathLib');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*
*        2d vector class
*
*    author-       noyan gunday
*    last edited-  14 May 2014
*
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.Vector2 = function(x, y)
{
        goog.base(this, 2);
        this.elements[0] = x;
        this.elements[1] = y;
};
goog.inherits(shaman.Vector2, shaman.Vector)

shaman.Vector2.prototype.SetValues = function(x, y)
{
        this.elements[0] = x;
        this.elements[1] = y;
};

/* perpendicular dot product */
shaman.Vector2.prototype.PerpDot = function(v)
{
        return this.elements[0] * v.Get(1) - this.elements[1] * v.Get(0);
};

/* angle between two vectors */
shaman.Vector2.prototype.Angle = function(v)
{
        return shaman.MathLib.RadianToDegree(-Math.atan2(this.PerpDot(v), this.Dot(v)));
};

/* rotates the vector about origin */
shaman.Vector2.prototype.Rotate = function(d)
{
        var radian = shaman.MathLib.DegreeToRadian(d),
        t0 = this.elements[0],
        c = Math.cos(radian),
        s = Math.sin(radian);

        this.elements[0] = t0 * c + this.elements[1] * -s;
        this.elements[1] = t0 * s + this.elements[1] * c;
};

/* rotates the vector about a custom pivot */
shaman.Vector2.prototype.RotateAbout = function(d, p)
{
        this.elements[0] = this.elements[0] - p.Get(0);
        this.elements[1] = this.elements[1] - p.Get(1);
        this.Rotate(d);
        this.elements[0] = this.elements[0] + p.Get(0);
        this.elements[1] = this.elements[1] + p.Get(1);
};
