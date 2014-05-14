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

goog.provide('shaman.Texture');
goog.require('shaman.Renderer');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*
*        webgl texture class
*
*    author-       noyan gunday
*    last edited-  15 May 2014
*
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.Texture = function(renderer)
{
        this.renderer = renderer;
        this.context = this.renderer.GetContext();
        this.texture = this.context.createTexture();
};

shaman.Texture.prototype.GetTextureObject = function()
{
        return this.texture;
};

/*  update texture */
shaman.Texture.prototype.Update = function(image_path)
{
        var image = new Image();
        image.texture = this;
        image.onload = function() {
                image.texture.renderer.BindTexture(0, image.texture);
                //image.texture.context.pixelStorei(image.texture.context.UNPACK_FLIP_Y_WEBGL, true);
                image.texture.context.texImage2D(image.texture.context.TEXTURE_2D, 0, image.texture.context.RGBA, image.texture.context.RGBA, image.texture.context.UNSIGNED_BYTE, image);
                image.texture.context.texParameteri(image.texture.context.TEXTURE_2D, image.texture.context.TEXTURE_MIN_FILTER, image.texture.context.LINEAR_MIPMAP_LINEAR);
                image.texture.context.texParameteri(image.texture.context.TEXTURE_2D, image.texture.context.TEXTURE_MAG_FILTER, image.texture.context.LINEAR);
                image.texture.context.texParameteri(image.texture.context.TEXTURE_2D, image.texture.context.TEXTURE_WRAP_S, image.texture.context.CLAMP_TO_EDGE);
                image.texture.context.texParameteri(image.texture.context.TEXTURE_2D, image.texture.context.TEXTURE_WRAP_T, image.texture.context.CLAMP_TO_EDGE);
                image.texture.context.generateMipmap(image.texture.context.TEXTURE_2D);
        }
        image.src = image_path;
};

/*  bind texture */
shaman.Texture.prototype.Bind = function()
{
        this.context.bindTexture(this.context.TEXTURE_2D, this.texture);
};
