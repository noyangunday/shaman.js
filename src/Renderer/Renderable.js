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

goog.provide('shaman.Renderable');
goog.require('shaman.Vertex');
goog.require('shaman.Uniform');
goog.require('shaman.Buffer');
goog.require('shaman.Shader');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*
*        renderable class
*
*    author-       noyan gunday
*    last edited-  14 May 2014
*
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.Renderable = function()
{
        this.uniforms = [];
        this.vertex = [];
        this.vertex_size = 0;
        this.shader;
        this.index_buffer;
        this.vertex_buffer;
};

/*  add vertex attribute to shader */
shaman.Renderable.prototype.AddVertexAttribute = function(name, size, normalized)
{
        this.vertex.push(new shaman.Vertex(name, size, normalized));
        this.vertex_size += size * 4;
};

/*  add uniform to shader */
shaman.Renderable.prototype.AddUniform = function(name, type, data)
{
        this.uniforms.push(new shaman.Uniform(name, type, data));
};

shaman.Renderable.prototype.SetShader = function(shader)
{
        this.shader = shader;
        this.shader.FillUniformLocations(this.uniforms);
        this.shader.FillAttributeLocations(this.vertex);
};

shaman.Renderable.prototype.SetBuffers = function(ib, vb)
{
        this.index_buffer = ib;
        this.vertex_buffer = vb;
};

shaman.Renderable.prototype.GetShader = function()
{
        return this.shader;
};

shaman.Renderable.prototype.GetVertexBuffer = function()
{
        return this.vertex_buffer;
};

shaman.Renderable.prototype.GetIndexBuffer = function()
{
        return this.index_buffer;
};

shaman.Renderable.prototype.GetUniforms = function()
{
        return this.uniforms;
};

shaman.Renderable.prototype.GetVertex = function()
{
        return this.vertex;
};

shaman.Renderable.prototype.GetVertexSize = function()
{
        return this.vertex_size;
};
