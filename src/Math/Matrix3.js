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

goog.provide('shaman.Matrix3');
goog.require('shaman.Matrix');
goog.require('shaman.Matrix4');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        3x3 matrix class
 *
 *    author-       noyan gunday
 *    last edited-  14 May 2014
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.Matrix3 = function(m11, m12, m13, m21, m22, m23, m31, m32, m33)
{
        goog.base(this, 3);
        this.elements[0] = m11;
        this.elements[1] = m12;
        this.elements[2] = m13;
        this.elements[3] = m21;
        this.elements[4] = m22;
        this.elements[5] = m23;
        this.elements[6] = m31;
        this.elements[7] = m32;
        this.elements[8] = m33;
}
goog.inherits(shaman.Matrix3, shaman.Matrix);

shaman.Matrix3.prototype.to_matrix4 = function()
{
        return new shaman.Matrix4(this.elements[0], this.elements[1], this.elements[2], 0.0,
                                  this.elements[3], this.elements[4], this.elements[5], 0.0,
                                  this.elements[6], this.elements[7], this.elements[8], 0.0,
                                  0.0,              0.0,              0.0,              1.0);
}
