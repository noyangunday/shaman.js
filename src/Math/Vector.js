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

goog.provide('shaman.Vector');
goog.require('shaman.Tuple');
goog.require('shaman.MathLib');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*
*        vector base
*
*    author-       noyan gunday
*    last edited-  14 May 2014
*
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.Vector = function(n)
{
        goog.base(this, n);
};
goog.inherits(shaman.Vector, shaman.Tuple);

/* scale vector1 by vector2 */
shaman.Vector.prototype.Scale = function(v1, v2)
{
        for (var i = 0; i < this.size; i++)
        {
                this.elements[i] = v1.Get(i) * v2.Get(i);
        }
};

/* vector-matrix multiplication */
shaman.Vector.prototype.Mul = function(v, m)
{
        var temp = new shaman.Vector(this.size);
        for (var i = 0; i < this.size; i++)
        {
                for (var j = 0; j < this.size; j++)
                {
                        temp.Set(i, temp.Get(i) + m.GetIJ(i, j) * v.Get(j));
                }
        }
        this.copy(temp);
};

/* length of vector */
shaman.Vector.prototype.len = function()
{
        return shaman.MathLib.Fsqrt(this.Len2());
};

/* square length of vector */
shaman.Vector.prototype.Len2 = function()
{
        var l = 0.0;
        for (var i = 0; i < this.size; i++)
        {
                l += this.elements[i] * this.elements[i];
        }
        return l;
};

/* dot product */
shaman.Vector.prototype.Dot = function(v)
{
        var d = 0.0;
        for (var i = 0; i < this.size; i++)
        {
                d += this.elements[i] * v.Get(i);
        }
        return d;
};

/* normalizes the vector */
shaman.Vector.prototype.Normalize = function()
{
        var inv_length = 1.0 / this.Len();
        for (var i = 0; i < this.size; i++)
        {
                this.elements[i] = this.elements[i] * inv_length;
        }
};

/* linearly interpolates between two vectors */
shaman.Vector.prototype.Lerp = function(from, to, time)
{
        var temp = new shaman.Vector(this.size);
        temp.Sub(to, from);
        temp.MulS(temp, time);
        this.Add(from, temp);
};

/* returns the mid point of two vectors */
shaman.Vector.prototype.Center = function(v1, v2)
{
        this.Add(v1, v2);
        this.DivS(this, 2.0);
};

/* reflects vector1 about vector1 and normal */
shaman.Vector.prototype.Reflect = function(v1, v2, n)
{
        var dot2 = v1.Dot(n) * 2.0;
        this.MulS(normal, dot2);
        this.Sub(v2, this);
};

/* distance between two vectors */
shaman.Vector.prototype.Distance = function(v)
{
        var temp = new shaman.Vector(this.size);
        temp.Sub(this, v);
        return temp.Len();
};
