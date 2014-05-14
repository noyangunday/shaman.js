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

goog.provide('shaman.Vertex');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *
 *        vertex attribute class
 *
 *    author-       noyan gunday
 *    last edited-  15 May 2014
 *
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.Vertex = function(name, size, normalized)
{
        this.location = -1;
        this.name = name;
        this.size = size;
        this.normalized = normalized;
}

/*  set location of vertex attribute in shader */
shaman.Vertex.prototype.set_location = function(new_location)
{
        this.location = new_location;
}

/*  returns location of vertex attribute in shader */
shaman.Vertex.prototype.get_location = function()
{
        return this.location
}

/*  vertex attribute's name in shader */
shaman.Vertex.prototype.get_name = function()
{
        return this.name;
}

/*  number of elements */
shaman.Vertex.prototype.get_size = function()
{
        return this.size;
}

/*  is client data normalized? */
shaman.Vertex.prototype.is_normalized = function()
{
        return this.normalized;
}
