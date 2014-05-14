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

goog.provide('shaman.Renderer');
goog.require('shaman.Buffer');
goog.require('shaman.Renderable');
goog.require('shaman.Texture');
goog.require('shaman.Shader');
goog.require('shaman.Uniform');
goog.require('shaman.Vertex');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*
*        webgl renderer class
*
*    author-       noyan gunday
*    last edited-  15 May 2014
*
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
shaman.Renderer = function(viewport)
{
        this.context = viewport.getContext("webgl", {alpha:false}) || viewport.getContext("experimental-webgl", {alpha:false});
        this.viewport = viewport;
        /* to avoid blind binding */
        this.tex_units = [];
        this.active_buffers = [];
        this.active_shader;
        this.textures = [];
        this.draw_modes = [this.context.TRIANGLES, this.context.LINE_LOOP];
        this.context.clearColor(0.0, 0.0, 0.0, 1.0);
        this.context.viewport(0, 0, viewport.width, viewport.height);
        this.context.enable(this.context.DEPTH_TEST);
        this.context.depthFunc(this.context.LEQUAL);
        this.context.enable(this.context.BLEND);
        this.context.blendFunc(this.context.SRC_ALPHA, this.context.ONE_MINUS_SRC_ALPHA);
};

shaman.Renderer.SOLID = 0;
shaman.Renderer.WIREFRAME = 1;

shaman.Renderer.prototype.ClearBuffers = function()
{
        this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
};

/*  returns webgl context */
shaman.Renderer.prototype.GetContext = function()
{
        return this.context;
};

shaman.Renderer.prototype.GetViewportWidth = function()
{
        return this.viewport.width;
};

shaman.Renderer.prototype.GetViewportHeight = function()
{
        return this.viewport.height;
};

/*  returns a texture from image path */
shaman.Renderer.prototype.GetTexture = function(image_path)
{
        var texture;
        if (this.textures[image_path] !== undefined)
        {
                return this.textures[image_path];
        }
        texture = new shaman.Texture(this);
        texture.Update(image_path);
        this.textures[image_path] = texture;
        return texture;
};

/*  creates an returns a shader from source */
shaman.Renderer.prototype.CreateShader = function(vs_source, fs_source)
{
        var shader;
        shader = new shaman.Shader(this);
        shader.Build(vs_source, fs_source);
        return shader;
};

/*  creates an returns a vertex buffer from data */
shaman.Renderer.prototype.CreateVertexBuffer = function(data)
{
        var buffer;
        buffer = new shaman.Buffer(this, Buffer.VERTEX_BUFFER);
        buffer.Update(data)
        return buffer;
};

/*  creates an returns an index buffer from data */
shaman.Renderer.prototype.CreateIndexBuffer = function(data)
{
        var buffer;
        buffer = new shaman.Buffer(this, Buffer.INDEX_BUFFER);
        buffer.Update(data)
        return buffer;
};

/*  binds a texture to specified texture unit */
shaman.Renderer.prototype.BindTexture = function(tex_unit, texture)
{
        if (this.tex_units[tex_unit] !== texture)
        {
                this.tex_units[tex_unit] = texture;
                this.context.activeTexture(this.context.TEXTURE0 + tex_unit);
                texture.bind();
        }
};

/*  binds a shader */
shaman.Renderer.prototype.BindShader = function(shader)
{
        if (this.active_shader !== shader)
        {
                this.active_shader = shader;
                shader.Bind();
        }
};

/*  binds a buffer */
shaman.Renderer.prototype.BindBuffer = function(buffer)
{
        if (this.active_buffers[buffer.get_buffer_type()] !== buffer)
        {
                this.active_buffers[buffer.get_buffer_type()] = buffer;
                buffer.Bind();
        }
};

shaman.Renderer.prototype.BindUniforms = function(uniforms)
{
        var data;
        var type;
        for (var i = 0; i < uniforms.length; i++)
        {
                type = uniforms[i].GetType();
                if (type > Uniform.FLOAT)
                {
                        data = new Float32Array(uniforms[i].GetData().GetArray());
                }
                else if (type === Uniform.FLOAT)
                {
                        data = uniforms[i].GetData().Get(0);
                }
                switch(uniforms[i].get_type())
                {
                case Uniform.SAMPLER:
                        this.context.uniform1i(uniforms[i].GetLocation(), uniforms[i].GetData());
                        break;
                case Uniform.FLOAT:
                        this.context.uniform1f(uniforms[i].GetLocation(), data);
                        break;
                case Uniform.VECTOR2:
                        this.context.uniform2fv(uniforms[i].GetLocation(), data);
                        break;
                case Uniform.VECTOR3:
                        this.context.uniform3fv(uniforms[i].GetLocation(), data);
                        break;
                case Uniform.VECTOR4:
                        this.context.uniform4fv(uniforms[i].GetLocation(), data);
                        break;
                case Uniform.MATRIX2:
                        this.context.uniformMatrix2fv(uniforms[i].GetLocation(), false, data);
                        break;
                case Uniform.MATRIX3:
                        this.context.uniformMatrix3fv(uniforms[i].GetLocation(), false, data);
                        break;
                case Uniform.MATRIX4:
                        this.context.uniformMatrix4fv(uniforms[i].GetLocation(), false, data);
                        break;
                default:
                }
        }
};

shaman.Renderer.prototype.BindVertex = function(vertex, vertex_size)
{
        var location;
        var offset = 0;
        for (var i = 0; i < vertex.length; i++)
        {
                location = vertex[i].GetLocation();
                this.context.enableVertexAttribArray(location);
                this.context.vertexAttribPointer(location, vertex[i].GetSize(), this.context.FLOAT, false, vertex_size, offset);
                offset += vertex[i].GetSize() * 4;
        }
};

/*  draws renderable */
shaman.Renderer.prototype.DrawRenderable = function(renderable, mode)
{
        var index_buffer = renderable.GetIndexBuffer();
        var draw_mode = (mode !== undefined) ? (this.draw_modes[mode]) : (this.context.LINE_LOOP);

        this.BindBuffer(index_buffer);
        this.BindBuffer(renderable.GetVertexBuffer());
        this.BindShader(renderable.GetShader());
        this.BindUniform(renderable.GetUniforms());
        this.BindVertex(renderable.GetVertex(), renderable.GetVertexSize());
        this.context.drawElements(draw_mode, index_buffer.GetSize(), this.context.UNSIGNED_SHORT, 0);
};
