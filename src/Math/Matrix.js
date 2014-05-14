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

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*
*        square matrix base class
*
*    author-       noyan gunday
*    last edited-  14 May 2014
*
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.Matrix = function(dim)
{
        goog.base(this, dim * dim);
        this.dim = dim;
};
goog.inherits(shaman.Matrix, shaman.Tuple)

/* returns element in i,j */
shaman.Matrix.prototype.GetIJ = function(i, j)
{
        return this.elements[i * this.dim + j];
};

/* sets element in i,j */
shaman.Matrix.prototype.SetIJ  = function(i, j, val)
{
        this.elements[i * this.dim + j] = val;
};

/* matrix-matrix multiplication */
shaman.Matrix.prototype.Mul = function(m1, m2)
{
        var temp = new shaman.Matrix(this.dim);
        temp.Zero();
        for (var i = 0; i < this.dim; i++)
        {
                for (var j = 0; j < this.dim; j++)
                {
                        for (var n = 0; n < this.dim; n++)
                        {
                                temp.SetIJ(i, j, temp.GetIJ(i, j) + m1.GetIJ(i, n) * m2.GetIJ(n, j));
                        }
                }
        }
        this.copy(temp);
};

/* makes identity matrix */
shaman.Matrix.prototype.Identity = function()
{
        this.Zero();
        for (var i = 0; i < this.dim; i++)
        {
                this.SetIJ(i, i, 1.0);
        }
};

/* returns the transpose of matrix */
shaman.Matrix.prototype.Transpose = function()
{
        var temp = new shaman.Matrix(this.dim);
        for (var i = 0; i < this.dim; i++)
        {
                for (var j = 0; j < this.dim; j++)
                {
                        temp.SetIJ(i, j, this.get_ij(j, i));
                }
        }
        this.copy(temp);
};
