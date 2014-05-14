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

goog.provide('shaman.Matrix4');
goog.require('shaman.Matrix');
goog.require('shaman.MathLib');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*
*        4x4 matrix class
*
*    author-       noyan gunday
*    last edited-  14 May 2014
*
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.Matrix4 = function(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44)
{
        goog.base(this, 4);
        this.elements[0] = m11;
        this.elements[1] = m12;
        this.elements[2] = m13;
        this.elements[3] = m14;
        this.elements[4] = m21;
        this.elements[5] = m22;
        this.elements[6] = m23;
        this.elements[7] = m24;
        this.elements[8] = m31;
        this.elements[9] = m32;
        this.elements[10] = m33;
        this.elements[11] = m34;
        this.elements[12] = m41;
        this.elements[13] = m42;
        this.elements[14] = m43;
        this.elements[15] = m44;
};
goog.inherits(shaman.Matrix4, shaman.Matrix);

/* creates perspective projection matrix */
shaman.Matrix4.prototype.MakePerspective = function(field_of_view, aspect_ratio, near_plane, far_plane)
{
        var top = near_plane * Math.tan(shaman.MathLib.DegreeToRadian(field_of_view * 0.5));
        var bottom = -top;
        var left = bottom * aspect_ratio;
        var right = top * aspect_ratio;

        this.Zero();
        this.elements[0] = (2.0 * near_plane) / (right - left);
        this.elements[2] = (right + left) / (right - left);
        this.elements[5] = (2.0 * near_plane) / (top - bottom);
        this.elements[6] = (top + bottom) / (top - bottom);
        this.elements[10] = (far_plane + near_plane) / (near_plane - far_plane);
        this.elements[11] = (2.0 * far_plane * near_plane) / (near_plane - far_plane);
        this.elements[14] = -1.0;
};

/* creates orthographic projection matrix */
shaman.Matrix4.prototype.MakeOrtho = function(left_plane, right_plane, bottom_plane, top_plane, near_plane, far_plane)
{
        this.Identity();
        this.elements[0] = 2.0 / (right_plane - left_plane);
        this.elements[3] = -(right_plane + left_plane) / (right_plane - left_plane);
        this.elements[5] = 2.0 / (top_plane - bottom_plane);
        this.elements[7] = -(top_plane + bottom_plane) / (top_plane - bottom_plane);
        this.elements[10] = 2.0 / (near_plane - far_plane);
        this.elements[11] = -(far_plane + near_plane) / (far_plane - near_plane);
};

/* creates translation matrix */
shaman.Matrix4.prototype.MakeTranslation = function(translation)
{
        this.Identity();
        this.elements[3] = translation.get(0);
        this.elements[7] = translation.get(1);
        this.elements[11] = translation.get(2);
};

/* creates scale matrix */
shaman.Matrix4.prototype.MakeScale = function(scale)
{
        this.Identity();
        this.elements[0] = scale.get(0);
        this.elements[5] = scale.get(1);
        this.elements[10] = scale.get(2);
};

/*  create rotation matrix */
shaman.Matrix4.prototype.MakeRotation = function(angle)
{
        this.Identity();
        this.elements[0] = Math.cos(shaman.MathLib.degree_to_radian(angle));
        this.elements[1] = -Math.sin(shaman.MathLib.degree_to_radian(angle));
        this.elements[4] = Math.sin(shaman.MathLib.degree_to_radian(angle));
        this.elements[5] = Math.cos(shaman.MathLib.degree_to_radian(angle));
};
