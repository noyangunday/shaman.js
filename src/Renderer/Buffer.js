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

goog.provide('shaman.Buffer');
goog.require('shaman.Renderer');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*
*        webgl buffer class
*
*    author-       noyan gunday
*    last edited-  14 May 2014
*
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.Buffer = function(renderer, type, usage)
{
        this.context = renderer.GetContext();
        this.renderer = renderer;
        this.buffer = this.context.createBuffer();
        this.target = [this.context.ARRAY_BUFFER, this.context.ELEMENT_ARRAY_BUFFER][type];
        this.usage = usage || this.context.STATIC_DRAW;
        this.size = 0,
        this.buffer_type = type;
};

Buffer.VERTEX_BUFFER = 0;
Buffer.INDEX_BUFFER = 1;

/*  returns type of the buffer */
shaman.Buffer.prototype.GetBufferType = function()
{
        return this.buffer_type;
};

/*  returns buffer object */
shaman.Buffer.prototype.GetBufferObject = function()
{
        return this.buffer;
};

shaman.Buffer.prototype.GetSize = function()
{
        return this.size;
};

/*  update buffer data */
shaman.Buffer.prototype.Update = function(data)
{
        this.renderer.BindBuffer(this);
        var array = (this.buffer_type === Buffer.VERTEX_BUFFER) ? (new Float32Array(data)) : (new Uint16Array(data));
        this.context.bufferData(this.target, array, this.usage);
        this.size = data.length;
};

/*  bind buffer for execution */
shaman.Buffer.prototype.Bind = function()
{
        this.context.bindBuffer(this.target, this.buffer);
};
