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

goog.provide('shaman.MathLib');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        additional mathematical functions
 *
 *    author-       noyan gunday
 *    last edited-  14 May 2014
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.MathLib = function()
{
}

shaman.MathLib.epsilon = 0.000001;

/*  fast float absolute value. basically removes sign bit of 32-bit float
    (IEEE 754) */
shaman.MathLib.fabs = function(val)
{
        Utility.f32reg[0] = val;
        Utility.ui32reg[0] &= 0x7FFFFFFF;
        return Utility.f32reg[0];
}

/*  fast square root estimation based on newton-raphson method
    (with chris lomont's optimization) */
shaman.MathLib.fsqrt = function(val)
{
        var half = val * 0.5;

        Utility.f32reg[0] = val;
        /*  first estimation */
        Utility.ui32reg[0] = 0x5F375A86 - (Utility.ui32reg[0] >> 1);
        /*  first iteration  */
        Utility.f32reg[0] *= (1.5 - half * Utility.f32reg[0] * Utility.f32reg[0]);
        /*  second iteration */
        Utility.f32reg[0] *= (1.5 - half * Utility.f32reg[0] * Utility.f32reg[0]);
        return 1.0 /    Utility.f32reg[0];
}

/*  returns the next power of two value after given value */
shaman.MathLib.npot = function(val)
{
        var power_of_two = val;

        power_of_two = power_of_two - 1;
        power_of_two = power_of_two | (power_of_two >> 1);
        power_of_two = power_of_two | (power_of_two >> 2);
        power_of_two = power_of_two | (power_of_two >> 4);
        power_of_two = power_of_two | (power_of_two >> 8);
        power_of_two = power_of_two | (power_of_two >> 16);
        return power_of_two + 1;
}

/*  converts a radian value to degrees */
shaman.MathLib.radian_to_degree = function(r)
{
        return r * 57.2957795131;
}

/*  converts a degree value to radians */
shaman.MathLib.degree_to_radian = function(d)
{
        return d * 0.0174532925;
}

/*  compares equality between two values */
shaman.MathLib.fequals = function(v1, v2, e)
{
        return (v1 + e >= v2) && (v1 - e <= v2);
}

/*  linearly interpolates between two values */
shaman.MathLib.lerp = function(from, to, time)
{
        return from + (to - from) * time;
}

/* clamps the value between [0 , 1] */
shaman.MathLib.saturate = function(val)
{
        return val > 1.0 ? 1.0 : (val < 0.0 ? 0.0 : val);
}

/* clamps the value between [min , max] */
shaman.MathLib.clamp = function(val,  min,  max)
{
        return val > max ? max : (val < min ? min : val);
}
