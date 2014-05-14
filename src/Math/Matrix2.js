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

goog.provide('shaman.Matrix2');
goog.require('shaman.Matrix');
goog.require('shaman.Matrix3');
goog.require('shaman.Matrix4');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*
*        2x2 matrix class
*
*    author-       noyan gunday
*    last edited-  14 May 2014
*
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.Matrix2 = function(m11, m12, m21, m22)
{
        goog.base(this, 2);
        this.elements[0] = m11;
        this.elements[1] = m12;
        this.elements[2] = m21;
        this.elements[3] = m22;
};
goog.inherits(shaman.Matrix2, shaman.Matrix);

shaman.Matrix2.prototype.ToMatrix3 = function()
{
        return new shaman.Matrix3(this.elements[0], this.elements[1], 0.0, this.elements[2], this.elements[3], 0.0, 0.0, 0.0, 1.0);
};

shaman.Matrix2.prototype.ToMatrix4 = function()
{
        return new shaman.Matrix4(this.elements[0], this.elements[1], 0.0, 0.0, this.elements[2], this.elements[3], 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
};
