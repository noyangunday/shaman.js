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

        /* used to avoid blind binding */
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
}

shaman.Renderer.SOLID = 0;
shaman.Renderer.WIREFRAME = 1;

shaman.Renderer.prototype.clear_screen = function()
{
         this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT);
}

/*  returns webgl context */
shaman.Renderer.prototype.get_context = function()
{
         return this.context;
}

shaman.Renderer.prototype.get_viewport_width = function()
{
         return this.viewport.width;
}

shaman.Renderer.prototype.get_viewport_height = function()
{
         return this.viewport.height;
}

/*  returns a texture from image path */
shaman.Renderer.prototype.get_texture = function(image_path)
{
         var texture;

         if (this.textures[image_path] !== undefined)
         {
                 return this.textures[image_path];
         }
         texture = new shaman.Texture(this);
         texture.update(image_path);
         this.textures[image_path] = texture;
         return texture;
}

/*  creates an returns a shader from source */
shaman.Renderer.prototype.create_shader = function(vs_source, fs_source)
{
         var shader;

         shader = new shaman.Shader(this);
         shader.build(vs_source, fs_source);
         return shader;
}

/*  creates an returns a vertex buffer from data */
shaman.Renderer.prototype.create_vertex_buffer = function(data)
{
         var buffer;

         buffer = new shaman.Buffer(this, Buffer.VERTEX_BUFFER);
         buffer.update(data)
         return buffer;
}

/*  creates an returns an index buffer from data */
shaman.Renderer.prototype.create_index_buffer = function(data)
{
         var buffer;

         buffer = new shaman.Buffer(this, Buffer.INDEX_BUFFER);
         buffer.update(data)
         return buffer;
}

/*  binds a texture to specified texture unit */
shaman.Renderer.prototype.bind_texture = function(tex_unit, texture)
{
         if (this.tex_units[tex_unit] !== texture)
         {
                 this.tex_units[tex_unit] = texture;
                 this.context.activeTexture(this.context.TEXTURE0 + tex_unit);
                 texture.bind();
         }
}

/*  binds a shader */
shaman.Renderer.prototype.bind_shader = function(shader)
{
         if (this.active_shader !== shader)
         {
                 this.active_shader = shader;
                 shader.bind();
         }
}

/*  binds a buffer */
shaman.Renderer.prototype.bind_buffer = function(buffer)
{
         if (this.active_buffers[buffer.get_buffer_type()] !== buffer)
         {
                 this.active_buffers[buffer.get_buffer_type()] = buffer;
                 buffer.bind();
         }
}

shaman.Renderer.prototype.bind_uniforms = function(uniforms)
{
         var data;
         var type;

         for (var i = 0; i < uniforms.length; i++)
         {
                 type = uniforms[i].get_type();
                 if (type > Uniform.FLOAT)
                 {
                         data = new Float32Array(uniforms[i].get_data().get_array());
                 }
                 else if (type === Uniform.FLOAT)
                 {
                         data = uniforms[i].get_data().get(0);
                 }
                 switch(uniforms[i].get_type())
                 {
                         case Uniform.SAMPLER:
                                 this.context.uniform1i(uniforms[i].get_location(), uniforms[i].get_data());
                                 break;
                         case Uniform.FLOAT:
                                 this.context.uniform1f(uniforms[i].get_location(), data);
                                 break;
                         case Uniform.VECTOR2:
                                 this.context.uniform2fv(uniforms[i].get_location(), data);
                                 break;
                         case Uniform.VECTOR3:
                                 this.context.uniform3fv(uniforms[i].get_location(), data);
                                 break;
                         case Uniform.VECTOR4:
                                 this.context.uniform4fv(uniforms[i].get_location(), data);
                                 break;
                         case Uniform.MATRIX2:
                                 this.context.uniformMatrix2fv(uniforms[i].get_location(), false, data);
                                 break;
                         case Uniform.MATRIX3:
                                 this.context.uniformMatrix3fv(uniforms[i].get_location(), false, data);
                                 break;
                         case Uniform.MATRIX4:
                                 this.context.uniformMatrix4fv(uniforms[i].get_location(), false, data);
                                 break;
                         default:
                 }
         }
}

shaman.Renderer.prototype.bind_vertex = function(vertex, vertex_size)
{
         var location;
         var offset = 0;

         for (var i = 0; i < vertex.length; i++)
         {
                 location = vertex[i].get_location();
                 this.context.enableVertexAttribArray(location);
                 this.context.vertexAttribPointer(location, vertex[i].get_size(), this.context.FLOAT, false, vertex_size, offset);
                 offset += vertex[i].get_size() * 4;
         }
 }

/*  draws renderable */
shaman.Renderer.prototype.draw_renderable = function(renderable, mode)
{
         var index_buffer = renderable.get_index_buffer();
         var draw_mode = (mode !== undefined) ? (this.draw_modes[mode]) : (this.context.LINE_LOOP);

         this.bind_buffer(index_buffer);
         this.bind_buffer(renderable.get_vertex_buffer());
         this.bind_shader(renderable.get_shader());
         this.bind_uniforms(renderable.get_uniforms());
         this.bind_vertex(renderable.get_vertex(), renderable.get_vertex_size());
         this.context.drawElements(draw_mode, index_buffer.get_size(), this.context.UNSIGNED_SHORT, 0);
}
