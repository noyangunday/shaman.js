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

goog.provide('shaman.Shader');
goog.require('shaman.Renderer');
goog.require('shaman.Uniform');
goog.require('shaman.Vertex');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*
*        webgl shader class
*
*    author-       noyan gunday
*    last edited-  15 May 2014
*
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.Shader = function(renderer)
{
        this.linked = false;
        this.context = renderer.GetContext();
        this.program = this.context.createProgram();
};

/*  build shader */
shaman.Shader.prototype.Build = function(vs_source, fs_source)
{
        var vs = this.context.createShader(this.context.VERTEX_SHADER);
        var fs = this.context.createShader(this.context.FRAGMENT_SHADER);

        if (this.linked)
        {
                this.context.deleteProgram(program);
        }

        this.context.shaderSource(vs, vs_source);
        this.context.compileShader(vs);
        this.context.attachShader(this.program, vs);
        //console.log(this.context.getShaderInfoLog(vs));

        this.context.shaderSource(fs, fs_source);
        this.context.compileShader(fs);
        this.context.attachShader(this.program, fs);
        //console.log(this.context.getShaderInfoLog(fs));

        this.context.linkProgram(this.program);
        this.linked = true;
};

/*  bind shader */
shaman.Shader.prototype.Bind = function()
{
        this.context.useProgram(this.program);
};

shaman.Shader.prototype.FillUniformLocations = function(uniforms)
{
        for (var i = 0; i < uniforms.length; i++)
        {
                uniforms[i].SetLocation(this.context.getUniformLocation(this.program, uniforms[i].get_name()));
        }
};

shaman.Shader.prototype.FillAttributeLocations = function(vertex)
{
        for (var i = 0; i < vertex.length; i++)
        {
                vertex[i].SetLocation(this.context.getAttribLocation(this.program, vertex[i].get_name()));
        }
};
