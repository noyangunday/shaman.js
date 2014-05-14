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

goog.provide('shaman.Vector3');
goog.require('shaman.Vector');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        3d vector class
 *
 *    author-       noyan gunday
 *    last edited-  14 May 2014
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.Vector3 = function(x, y, z)
{
        goog.base(this, 3);
        this.elements[0] = x;
        this.elements[1] = y;
        this.elements[2] = z;
}
goog.inherits(shaman.Vector3, shaman.Vector)

shaman.Vector3.prototype.set_values = function(x, y, z)
{
        this.elements[0] = x;
        this.elements[1] = y;
        this.elements[2] = z;
}

/* cross product */
shaman.Vector3.prototype.cross = function(v1, v2)
{
        var temp = new shaman.Vector3(v1.get(1) * v2.get(2) - v1.get(2) * v2.get(1),
                                      v1.get(2) * v2.get(0) - v1.get(0) * v2.get(2),
                                      v1.get(0) * v2.get(1) - v1.get(1) * v2.get(0));

        this.copy(temp);
}
