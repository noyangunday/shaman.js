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

goog.provide('shaman.Uniform');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*
*        shader uniform class
*
*    author-       noyan gunday
*    last edited-  15 May 2014
*
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.Uniform = function(name, type, data)
{
        this.location = -1;
        this.name = name;
        this.type = type;
        this.data = data;
};

shaman.Uniform.SAMPLER = 0;
shaman.Uniform.FLOAT = 1;
shaman.Uniform.VECTOR2 = 2;
shaman.Uniform.VECTOR3 = 3;
shaman.Uniform.VECTOR4 = 4;
shaman.Uniform.MATRIX2 = 5;
shaman.Uniform.MATRIX3 = 6;
shaman.Uniform.MATRIX4 = 7;

/*  set location of uniform in shader */
shaman.Uniform.prototype.SetLocation = function(new_location)
{
        this.location = new_location;
};

/*  returns location of uniform in shader */
shaman.Uniform.prototype.GetLocation = function()
{
        return this.location
};

/*  name of uniform in shader */
shaman.Uniform.prototype.GetName = function()
{
        return this.name;
};

/*  type of uniform data */
shaman.Uniform.prototype.GetType = function()
{
        return this.type;
};

/*  data to feed uniform */
shaman.Uniform.prototype.GetData = function()
{
        return this.data;
};
