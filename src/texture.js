import GLBound from './gl-bound';

/**
 * A gl-bound texture
 * Supports most (all?) of the texture binding options.
 * Also generates mipmaps if the texture requires it.
 *
 * @class
 * @param  {context} gl   A WebGL context
 * @param  {Object} info  Texture parameters
 * @param  {Images} image An image to use as the texture
 */
class Texture extends GLBound {

  constructor(gl, info, image) {
    super(gl);
    this.info = info;
    var map = {
      'MipMapLinearLinear': gl.LINEAR_MIPMAP_LINEAR,
      'Linear': gl.LINEAR,
      'MipMapLinearNearest': gl.LINEAR_MIPMAP_NEAREST,
      'MipMapNearestLinear': gl.NEAREST_MIPMAP_LINEAR,
      'Repeat': gl.REPEAT,
      'ClampToEdge': gl.CLAMP_TO_EDGE
    };
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, map[info.minFilter]);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, map[info.magFilter]);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, map[info.wrapS]);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, map[info.wrapT]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    if(/MipMap/.test(info.minFilter))
    {
      gl.generateMipmap(gl.TEXTURE_2D);
    }

    gl.bindTexture(gl.TEXTURE_2D, null);

    this.texture = texture;
  }

  /**
   * Bind the texture to a particular texture index
   *
   * @param  {Number} index Texture index to bind to
   * @return {void}
   */
  use(index) {
    var gl = this._gl;
    index = index || 0;
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.activeTexture(gl.TEXTURE0 + index);
  }

  /**
   * NYI: TODO
   *
   * @return {void}
   */
  dispose() {
    // TODO: Figure out when this should be called.
    // noop;
  }
}

export default Texture;
