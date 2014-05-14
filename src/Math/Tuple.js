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

goog.provide('shaman.Tuple');
goog.require('shaman.MathLib')

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        tuple class
 *
 *    author-       noyan gunday
 *    last edited-  14 May 2014
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.Tuple = function(n)
{
        this.elements = new Array(n);
        this.size = n;
}

/*  returns float array of tuples */
shaman.Tuple.prototype.get_array = function()
{
        return this.elements;
}

/* returns i-th element of tuple */
shaman.Tuple.prototype.get = function(i)
{
        return this.elements[i];
}

/* returns the size of tuple */
shaman.Tuple.prototype.get_size = function()
{
        return size;
}

/* sets i-th element of tuple */
shaman.Tuple.prototype.set = function(i, val)
{
        this.elements[i] = val;
}

/* copies another tuple into this one */
shaman.Tuple.prototype.copy = function(t)
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = t.get(i);
        }
}

/* copies an array's elements into tuple */
shaman.Tuple.prototype.copy_array = function(array)
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = array[i];
        }
}

/* resets tuple this.elements */
shaman.Tuple.prototype.zero = function()
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = 0;
        }
}

/* negates tuple this.elements */
shaman.Tuple.prototype.negate = function()
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = -this.elements[i];
        }
}

/* tuple-tuple addition */
shaman.Tuple.prototype.add = function(t1, t2)
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = t1.get(i) + t2.get(i);
        }
}

/* tuple-scalar addition */
shaman.Tuple.prototype.add_s = function(t, s)
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = t.get(i) + s;
        }
}

/* tuple-tuple subtraction */
shaman.Tuple.prototype.sub = function(t1, t2)
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = t1.get(i) - t2.get(i);
        }
}

/* tuple-scalar subtraction */
shaman.Tuple.prototype.sub_s = function(t, s)
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = t.get(i) - s;
        }
}

/* tuple-scalar multiplication */
shaman.Tuple.prototype.mul_s = function(t, s)
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = t.get(i) * s;
        }
}

/* equality comparison */
shaman.Tuple.prototype.equals = function(t)
{
        for (var i = 0; i < this.elements.length; i++)
        {
                if (!shaman.MathLib.fequals(this.elements[i], t.get(i), shaman.MathLib.epsilon))
                {
                        return false;
                }
        }
        return true;
}

/* returns a tuple with greater this.elements of two tuples */
shaman.Tuple.prototype.ceil = function(t1, t2)
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = Math.max(t1.get(i), t2.get(i));
        }
}

/* returns a tuple with lesser elements of two tuples */
shaman.Tuple.prototype.floor = function(t1, t2)
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = Math.min(t1.get(i), t2.get(i));
        }
}

/* clamps tuple's elements between [min, max] */
shaman.Tuple.prototype.clamp = function(min, max)
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = shaman.MathLib.clamp(this.elements[i], min, max);
        }
}

/* clamps tuple's elements between [0, 1] */
shaman.Tuple.prototype.saturate = function()
{
        for (var i = 0; i < this.elements.length; i++)
        {
                this.elements[i] = shaman.MathLib.saturate(this.elements[i]);
        }
}
