var GLBuffer = function(gl, target, usage) {
  GLBound.call(this, gl);
  this.target = target || gl.ARRAY_BUFFER; // probably shouldn't default this.
  this.usage = usage || gl.STATIC_DRAW;
  this.glBuf = null;
  this.values = null;
  return this;
};
inherits(GLBuffer, GLBound);

GLBuffer.prototype.bindBuffer = function() {
  if(!this.values) {
    console.warn('trying to update a buffer with no values.');
    return false;
  }
  if(!this.glBuf) {
    this.glBuf = this._gl.createBuffer();
  }
  this._gl.bindBuffer(this.target, this.glBuf);
  return this;
};

GLBuffer.prototype.unbindBuffer = function() {
  // this._gl.bindBuffer(this.target, 0);  // apparently this makes webgl cranky
  return this;
};

GLBuffer.prototype.update = function() {
  this.bindBuffer();
  // if I do it this way, does it break?
  // if it works, will updating the underlying buffer
  // update the buffer without needing to call gl.bufferData again??
  this._gl.bufferData(this.target, this.values, this.usage);
  return this; // .unbindBuffer(); // apparently this makes webgl angry.
};

GLBuffer.prototype.setValues = function(values, offset) {
  if(!this.values) {
    this.values = values;
  } else {
    this.values.set(values, offset);
  }
  return this.update();
};

GLBuffer.prototype.updateBuffer = function(values) {
  this.values = values;
  return this.update();
};

imv.GL = imv.GL || {};
imv.GL.Buffer = GLBuffer;