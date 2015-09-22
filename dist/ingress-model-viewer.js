(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.IMV = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.2.1
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


(function(_global) {
  "use strict";

  var shim = {};
  if (typeof(exports) === 'undefined') {
    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      shim.exports = {};
      define(function() {
        return shim.exports;
      });
    } else {
      // gl-matrix lives in a browser, define its namespaces in global
      shim.exports = typeof(window) !== 'undefined' ? window : _global;
    }
  }
  else {
    // gl-matrix lives in commonjs, define its namespaces in exports
    shim.exports = exports;
  }

  (function(exports) {
    /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matricies
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

if(typeof(exports) !== 'undefined') {
    exports.glMatrix = glMatrix;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */

var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec2 = vec2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */

var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    var z = (GLMAT_RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/*
* Rotate a 3D vector around the x-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
	  //Translate point to the origin
	  p[0] = a[0] - b[0];
	  p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];

	  //perform rotation
	  r[0] = p[0];
	  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
	  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

	  //translate to correct position
	  out[0] = r[0] + b[0];
	  out[1] = r[1] + b[1];
	  out[2] = r[2] + b[2];

  	return out;
};

/*
* Rotate a 3D vector around the y-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateY = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  	r[1] = p[1];
  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/*
* Rotate a 3D vector around the z-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateZ = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  	r[2] = p[2];
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec3 = vec3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */

var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = GLMAT_RANDOM();
    out[1] = GLMAT_RANDOM();
    out[2] = GLMAT_RANDOM();
    out[3] = GLMAT_RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec4 = vec4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x2 Matrix
 * @name mat2
 */

var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
};

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
};

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix 
 * @param {mat2} D the diagonal matrix 
 * @param {mat2} U the upper triangular matrix 
 * @param {mat2} a the input matrix to factorize
 */

mat2.LDU = function (L, D, U, a) { 
    L[2] = a[2]/a[0]; 
    U[0] = a[0]; 
    U[1] = a[1]; 
    U[3] = a[3] - L[2] * U[1]; 
    return [L, D, U];       
}; 

if(typeof(exports) !== 'undefined') {
    exports.mat2 = mat2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */

var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;


/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
};

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2d.frob = function (a) { 
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
}; 

if(typeof(exports) !== 'undefined') {
    exports.mat2d = mat2d;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */

var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};


if(typeof(exports) !== 'undefined') {
    exports.mat3 = mat3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */

var mat4 = {};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};


if(typeof(exports) !== 'undefined') {
    exports.mat4 = mat4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class Quaternion
 * @name quat
 */

var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {        
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    
    return out;
};

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if ( fTrace > 0.0 ) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5/fRoot;  // 1/(4w)
        out[0] = (m[7]-m[5])*fRoot;
        out[1] = (m[2]-m[6])*fRoot;
        out[2] = (m[3]-m[1])*fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if ( m[4] > m[0] )
          i = 1;
        if ( m[8] > m[i*3+i] )
          i = 2;
        var j = (i+1)%3;
        var k = (i+2)%3;
        
        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[k*3+j] - m[j*3+k]) * fRoot;
        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }
    
    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.quat = quat;
}
;













  })(shim.exports);
})(this);

},{}],2:[function(require,module,exports){
(function (global){
/*! java-deserializer 19-08-2015 */

!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.JavaDeserializer=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}function e(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=a("./stream-reader"),h=d(g),i=44269,j=5,k=112,l=113,m=114,n=116,o=117,p=119,q=120,r=8257536,s=function(){function a(b){e(this,a),this.buffer=b,this.stream=new h["default"](b),this.repr=null,this.refs=[],this._checkMagic()}return f(a,[{key:"_checkMagic",value:function(){if(this.stream.readUint16()!==i)throw"invalid magic number!";if(this.stream.readUint16()!==j)throw"invalid version!"}},{key:"_readClassDescription",value:function(){var a="BCDFIJSZ",b=this.stream.readUint8(),c={};if(b!==k){if(b===l){var d=this.stream.readUint32()-r;return this.refs[d]}if(b!==m)return void console.log("I don't know how to handle this type yet: "+b);c.name=this.stream.readUtf8String(),c.versionId=[this.stream.readUint32(),this.stream.readUint32()],c.handle=this.refs.length,c.flags=this.stream.readUint8();for(var e=[],f=this.stream.readUint16(),g=0;f>g;g++){var h={};h.type=this.stream.readUint8(),h.name=this.stream.readUtf8String(),-1===a.indexOf(String.fromCharCode(h.type))&&console.log("this is not a primitive type: "+h.type),e.push(h)}return c.fields=e,c.annotation=this.stream.readUint8(),c.annotation!==q&&console.log("I don't know what to do with this: "+c.annotation),c.superClass=this._readClassDescription(),this.refs.push(c),c}}},{key:"_readArray",value:function(){var a,b,c={},d=this._readClassDescription();c.description=d,c.handle=this.refs.length,b=this.stream.readUint32();var e=d.name;if("[F"===e)c.elements=this.stream.readFloat32Array(b);else if("[S"===e)c.elements=this.stream.readUint16Array(b);else for(c.elements=[],a=0;b>a;a++){var f=this._readChunk();c.elements.push(f)}return this.refs.push(c),c}},{key:"_readBlockData",value:function(){var a=this.stream.readUint8();return this.stream.readUint8Array(a)}},{key:"_readChunk",value:function(){var a=this.stream.readUint8(),b=null;switch(a){case o:b=this._readArray();break;case p:b=this._readBlockData();break;case n:b=this.stream.readUtf8String();break;default:console.log("unhandled type")}return b}},{key:"getContents",value:function(){if(this.repr)return this.repr;for(this.repr=[];this.stream.getPosition()<this.stream.getLength();)this.repr.push(this._readChunk());return this.repr}}]),a}();s.VERSION="0.2.0",c["default"]=s,b.exports=c["default"]},{"./stream-reader":2}],2:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),f=function(){function a(b){d(this,a),this.buffer=b,this.dataview=new DataView(b),this.currentOffset=0}return e(a,[{key:"getLength",value:function(){return this.dataview.byteLength}},{key:"getPosition",value:function(){return this.currentOffset}},{key:"readUint32",value:function(){var a=this.dataview.getUint32(this.currentOffset);return this.currentOffset+=4,a}},{key:"readUint16",value:function(){var a=this.dataview.getUint16(this.currentOffset);return this.currentOffset+=2,a}},{key:"readUint8",value:function(){var a=this.dataview.getUint8(this.currentOffset);return this.currentOffset++,a}},{key:"readInt32",value:function(){var a=this.dataview.getInt32(this.currentOffset);return this.currentOffset+=4,a}},{key:"readInt16",value:function(){var a=this.dataview.getInt16(this.currentOffset);return this.currentOffset+=2,a}},{key:"readInt8",value:function(){var a=this.dataview.getInt8(this.currentOffset);return this.currentOffset++,a}},{key:"readFloat32",value:function(){var a=this.dataview.getFloat32(this.currentOffset);return this.currentOffset+=4,a}},{key:"readUtf8String",value:function(){for(var a=this.readUint16(),b="",c=0;a>c;c++)b+=String.fromCharCode(this.readUint8());return b}},{key:"readFloat32Array",value:function(a){for(var b=new Float32Array(a),c=0;a>c;c++)b[c]=this.readFloat32();return b}},{key:"readUint16Array",value:function(a){for(var b=new Uint16Array(a),c=0;a>c;c++)b[c]=this.readUint16();return b}},{key:"readUint8Array",value:function(a){var b=new Uint8Array(this.buffer,this.currentOffset,a);return this.currentOffset+=a,b}}]),a}();c["default"]=f,b.exports=c["default"]},{}]},{},[1])(1)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
/*! libtga 13-08-2015 */

!function(a,b){if("function"==typeof define&&define.amd)define(["exports","module"],b);else if("undefined"!=typeof exports&&"undefined"!=typeof module)b(exports,module);else{var c={exports:{}};b(c.exports,c),a.libtga=c.exports}}(this,function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var d=18,e=0,f=1,g=2,h=3,i=8,j=15,k=48,l=192,m=2,n=1,o=2,p=1,q=function s(a){c(this,s),this.dataview=new DataView(a),this.header=s.readHeader(this.dataview),this.width=this.header.imageSpec.width,this.height=this.header.imageSpec.height,this.compressed=!!(this.header.imageType&i),this.imageId=s.readImageId(this.dataview,this.header),this.colorMap=s.readColorMap(this.dataview,this.header),this.imageData=s.readImage(this)};q.HEADER_SIZE=d,q.IMAGE_TYPE_NONE=e,q.IMAGE_TYPE_COLORMAPPED=f,q.IMAGE_TYPE_TRUECOLOR=g,q.IMAGE_TYPE_GREYSCALE=h,q.IMAGE_RUNLENGTH_ENCODED=i,q.readHeader=function(a){var b={idLength:a.getUint8(0,!0),mapType:a.getUint8(1,!0),imageType:a.getUint8(2,!0),colorMapSpec:q.readColorMapSpec(a,3),imageSpec:q.readImageSpec(a,8)};return b},q.readColorMapSpec=function(a,b){var c=a.getUint8(b+4,!0),d={firstEntry:a.getUint16(b,!0),length:a.getUint16(b+2,!0),entrySizeBits:c,entrySizeBytes:Math.floor((c+7)/8)};return d},q.readImageSpec=function(a,b){var c=a.getUint8(b+9),d={xOrigin:a.getUint16(b,!0),yOrigin:a.getUint16(b+2,!0),width:a.getUint16(b+4,!0),height:a.getUint16(b+6,!0),pixelDepth:a.getUint8(b+8),descriptor:c,attributeBits:c&j,origin:(c&k)>>4,interleave:(c&l)>>6};return d},q.readImageId=function(a,b){return new Uint8Array(a.buffer,d,b.idLength)},q.readColorMap=function(a,b){if(b.colorMapSpec.length<=0)return null;var c=new Uint8ClampedArray(4*b.colorMapSpec.length),e=null,f=d+b.idLength;switch(b.colorMapSpec.entrySizeBits){case 8:e=q.readPixel8;break;case 16:e=q.readPixel15;break;case 15:e=q.readPixel16;break;case 24:e=q.readPixel24;break;case 32:e=q.readPixel32;break;default:throw"Unsupported pixel depth"}for(var g=0;g<b.colorMapSpec.length;g++)e(a,f,g,c,g);return c},q.readPixel8=function(a,b,c,d,e){var f=a.getUint8(b+c);d[4*e+2]=f,d[4*e+1]=f,d[4*e+0]=f,d[4*e+3]=255},q.readPixel15=function(a,b,c,d,e){var f=a.getUint16(b+2*c,!0);d[4*e+2]=(31&f)<<3,d[4*e+1]=(f>>5&31)<<3,d[4*e+0]=(f>>10&31)<<3,d[4*e+3]=255},q.readPixel16=function(a,b,c,d,e){var f=a.getUint16(b+2*c,!0);d[4*e+2]=(31&f)<<3,d[4*e+1]=(f>>5&31)<<3,d[4*e+0]=(f>>10&31)<<3,d[4*e+3]=128==(128&f)?255:0},q.readPixel24=function(a,b,c,d,e){d[4*e+2]=a.getUint8(b+3*c+0),d[4*e+1]=a.getUint8(b+3*c+1),d[4*e+0]=a.getUint8(b+3*c+2),d[4*e+3]=255},q.readPixel32=function(a,b,c,d,e){d[4*e+2]=a.getUint8(b+4*c+0),d[4*e+1]=a.getUint8(b+4*c+1),d[4*e+0]=a.getUint8(b+4*c+2),d[4*e+3]=255},q.readMappedPixel8=function(a,b,c,d,e,f,g){var h=a.getUint8(d+e)+c;f[4*g+0]=b[4*h+0],f[4*g+1]=b[4*h+1],f[4*g+2]=b[4*h+2],f[4*g+3]=b[4*h+3]},q.readMappedPixel15=function(a,b,c,d,e,f,g){var h=a.getUint16(d+2*e,!0)+c;f[4*g+0]=b[4*h+0],f[4*g+1]=b[4*h+1],f[4*g+2]=b[4*h+2],f[4*g+3]=b[4*h+3]},q.readMappedPixel16=function(a,b,c,d,e,f,g){var h=a.getUint16(d+2*e,!0)+c;f[4*g+0]=b[4*h+0],f[4*g+1]=b[4*h+1],f[4*g+2]=b[4*h+2],f[4*g+3]=b[4*h+3]},q.readMappedPixel24=function(a,b,c,d,e,f,g){var h=a.getUint16(d+2*e,!0)+c;f[4*g+0]=b[4*h+0],f[4*g+1]=b[4*h+1],f[4*g+2]=b[4*h+2],f[4*g+3]=b[4*h+3]},q.readMappedPixel32=function(a,b,c,d,e,f,g){var h=a.getUint16(d+2*e,!0)+c;f[4*g+0]=b[4*h+0],f[4*g+1]=b[4*h+1],f[4*g+2]=b[4*h+2],f[4*g+3]=b[4*h+3]},q.readRLEImage=function(){throw"NYI"},q.readColormappedImage=function(a){var b=a.dataview,c=a.header,e=a.colorMap,f=c.imageSpec.width,g=c.imageSpec.height,h=new Uint8ClampedArray(f*g*4),i=c.imageSpec.pixelDepth,j=d+c.idLength+c.colorMapSpec.length*c.colorMapSpec.entrySizeBytes,k=c.colorMapSpec.firstEntry,l=null,r=(c.imageSpec.origin&m)===o?1:-1,s=(c.imageSpec.origin&n)===p?-1:1;if(!e)throw"Image is described as color-mapped, but has no map";switch(i){case 8:l=q.readMappedPixel8;break;case 16:l=q.readMappedPixel15;break;case 15:l=q.readMappedPixel16;break;case 24:l=q.readMappedPixel24;break;case 32:l=q.readMappedPixel32;break;default:throw"Unsupported pixel depth"}var t,u,v,w;r>0?(t=0,u=g):(t=g-1,u=-1),s>0?(v=0,w=f):(v=f-1,w=-1);for(var x,y=0,z=t;z!=u;z+=r){x=0;for(var A=v;A!=w;A+=s)l(b,e,k,j,z*f+A,h,y*f+x++);y++}return h},q.readTruecolorImage=function(a){var b=a.header,c=a.dataview,e=b.imageSpec.width,f=b.imageSpec.height,g=new Uint8ClampedArray(e*f*4),h=b.imageSpec.pixelDepth,i=d+b.idLength+b.colorMapSpec.length*b.colorMapSpec.entrySizeBytes,j=null,k=(b.imageSpec.origin&m)===o?1:-1,l=(b.imageSpec.origin&n)===p?-1:1;switch(h){case 8:j=q.readPixel8;break;case 16:j=q.readPixel15;break;case 15:j=q.readPixel16;break;case 24:j=q.readPixel24;break;case 32:j=q.readPixel32;break;default:throw"Unsupported pixel depth"}var r,s,t,u;k>0?(r=0,s=f):(r=f-1,s=-1),l>0?(t=0,u=e):(t=e-1,u=-1);for(var v,w=0,x=r;x!=s;x+=k){v=0;for(var y=t;y!=u;y+=l)j(c,i,x*e+y,g,w*e+v++);w++}return g},q.readImage=function(a){if(a.header.compressed)return q.readRLEImage(a);if(0===a.header.mapType)return q.readTruecolorImage(a);if(1===a.header.mapType)return q.readColormappedImage(a);throw"Unsupported map type"};var r={readFile:function(a){return new q(a)},loadFile:function(a,b){var c=new XMLHttpRequest;c.open("GET",a),c.responseType="arraybuffer",c.onload=function(){b(null,new q(this.response))},c.onerror=function(a){b(a,null)},c.send()},TGA:q,VERSION:"0.3.1"};b.exports=r});

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _easing = require('./easing');

var _easing2 = _interopRequireDefault(_easing);

/**
 * Simple class for hooking up animations to drawables.
 *
 * Animations refers specifically to things like moving objects/cameras around.
 * Animations handled by the existing shaders should be implemented that way, instead.
 */

var Animation = (function () {

  /**
   * Create an animation for a drawable
   *
   * @chainable
   * @param  {Drawable} drawable  The object ot animate
   * @param  {Number}  duration   Duration of one cycle of the animation
   * @param  {Function} transform Animation callback
   *                              Parameter: Number t
   *                              Will be executed in the context of the drawable (i.e. this === drawable)
   * @param  {Function} timing    Timing function (i.e. easing)  Defaults. to Ease.linear
   * @param  {Boolean}  loop      Whether or not to loop the animation
   * @return {this}               The animation
   */

  function Animation(drawable, duration, transform, timing, loop) {
    _classCallCheck(this, Animation);

    var self = this;
    this.elapsed = 0;
    this.drawable = drawable;
    this.duration = duration;
    this.transform = transform;
    this.timing = timing || _easing2['default'].linear;
    this.loop = loop;
    this.oldUpdate = null;
    function onUpdate(delta) {
      self.elapsed += delta;
      // if we're done with the animation
      if (self.elapsed > self.duration && !self.loop) {
        self.stop();
      } else {
        var t = self.timing(self.elapsed / self.duration % 1);
        // jshint, pls, I know what I'm doing.
        self.transform.call(this, t); // jshint ignore:line
      }
      if (self.oldUpdate) {
        return self.oldUpdate.call(this, delta); // jshint ignore:line
      } else {
          return true;
        }
    }
    this.onUpdate = onUpdate;
    this.running = false;
    return this;
  }

  /**
   * Starts the animation
   *
   * @chainable
   * @return {this}
   */

  _createClass(Animation, [{
    key: 'start',
    value: function start() {
      if (!this.running) {
        this.oldUpdate = this.drawable.onUpdate;
        this.drawable.onUpdate = this.onUpdate;
        this.running = true;
      }
      return this;
    }

    /**
     * Stops the animation, and resets the elasped time to 0
     *
     * @chainable
     * @return {this}
     */
  }, {
    key: 'stop',
    value: function stop() {
      this.elapsed = 0;
      return this.pause();
    }

    /**
     * Pauses the running animation
     *
     * @chainable
     * @return {this}
     */
  }, {
    key: 'pause',
    value: function pause() {
      if (this.running) {
        this.drawable.onUpdate = this.oldUpdate;
        this.running = false;
      }
      return this;
    }
  }]);

  return Animation;
})();

exports['default'] = Animation;
module.exports = exports['default'];
},{"./easing":5}],5:[function(require,module,exports){
/**
 * Easing functions
 *
 * Adapted from https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ease = function Ease() {
  _classCallCheck(this, Ease);

  throw "Ease cannot be instantiated.";
}

/**
 * @method linear
 * @param {Number} t
 * @static
 * @return {Number}
 **/
;

Ease.linear = function (t) {
  return t;
};

/**
 * Identical to linear.
 * @method none
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.none = Ease.linear;

/**
 * Mimics the simple -100 to 100 easing in Flash Pro.
 * @method get
 * @param {Number} amount A value from -1 (ease in) to 1 (ease out) indicating the strength and direction of the ease.
 * @static
 * @return {Function}
 **/
Ease.get = function (amount) {
  if (amount < -1) {
    amount = -1;
  }
  if (amount > 1) {
    amount = 1;
  }
  return function (t) {
    if (amount === 0) {
      return t;
    }
    if (amount < 0) {
      return t * (t * -amount + 1 + amount);
    }
    return t * ((2 - t) * amount + (1 - amount));
  };
};

/**
 * Configurable exponential ease.
 * @method getPowIn
 * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
 * @static
 * @return {Function}
 **/
Ease.getPowIn = function (pow) {
  return function (t) {
    return Math.pow(t, pow);
  };
};

/**
 * Configurable exponential ease.
 * @method getPowOut
 * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
 * @static
 * @return {Function}
 **/
Ease.getPowOut = function (pow) {
  return function (t) {
    return 1 - Math.pow(1 - t, pow);
  };
};

/**
 * Configurable exponential ease.
 * @method getPowInOut
 * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
 * @static
 * @return {Function}
 **/
Ease.getPowInOut = function (pow) {
  return function (t) {
    if ((t *= 2) < 1) {
      return 0.5 * Math.pow(t, pow);
    }
    return 1 - 0.5 * Math.abs(Math.pow(2 - t, pow));
  };
};

/**
 * @method quadIn
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.quadIn = Ease.getPowIn(2);
/**
 * @method quadOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.quadOut = Ease.getPowOut(2);
/**
 * @method quadInOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.quadInOut = Ease.getPowInOut(2);

/**
 * @method cubicIn
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.cubicIn = Ease.getPowIn(3);
/**
 * @method cubicOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.cubicOut = Ease.getPowOut(3);
/**
 * @method cubicInOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.cubicInOut = Ease.getPowInOut(3);

/**
 * @method quartIn
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.quartIn = Ease.getPowIn(4);
/**
 * @method quartOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.quartOut = Ease.getPowOut(4);
/**
 * @method quartInOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.quartInOut = Ease.getPowInOut(4);

/**
 * @method quintIn
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.quintIn = Ease.getPowIn(5);
/**
 * @method quintOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.quintOut = Ease.getPowOut(5);
/**
 * @method quintInOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.quintInOut = Ease.getPowInOut(5);

/**
 * @method sineIn
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.sineIn = function (t) {
  return 1 - Math.cos(t * Math.PI / 2);
};

/**
 * @method sineOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.sineOut = function (t) {
  return Math.sin(t * Math.PI / 2);
};

/**
 * @method sineInOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.sineInOut = function (t) {
  return -0.5 * (Math.cos(Math.PI * t) - 1);
};

/**
 * Configurable "back in" ease.
 * @method getBackIn
 * @param {Number} amount The strength of the ease.
 * @static
 * @return {Function}
 **/
Ease.getBackIn = function (amount) {
  return function (t) {
    return t * t * ((amount + 1) * t - amount);
  };
};

/**
 * @method backIn
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.backIn = Ease.getBackIn(1.7);

/**
 * Configurable "back out" ease.
 * @method getBackOut
 * @param {Number} amount The strength of the ease.
 * @static
 * @return {Function}
 **/
Ease.getBackOut = function (amount) {
  return function (t) {
    return --t * t * ((amount + 1) * t + amount) + 1;
  };
};

/**
 * @method backOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.backOut = Ease.getBackOut(1.7);

/**
 * Configurable "back in out" ease.
 * @method getBackInOut
 * @param {Number} amount The strength of the ease.
 * @static
 * @return {Function}
 **/
Ease.getBackInOut = function (amount) {
  amount *= 1.525;
  return function (t) {
    if ((t *= 2) < 1) {
      return 0.5 * (t * t * ((amount + 1) * t - amount));
    }
    return 0.5 * ((t -= 2) * t * ((amount + 1) * t + amount) + 2);
  };
};

/**
 * @method backInOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.backInOut = Ease.getBackInOut(1.7);

/**
 * @method circIn
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.circIn = function (t) {
  return -(Math.sqrt(1 - t * t) - 1);
};

/**
 * @method circOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.circOut = function (t) {
  return Math.sqrt(1 - --t * t);
};

/**
 * @method circInOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.circInOut = function (t) {
  if ((t *= 2) < 1) {
    return -0.5 * (Math.sqrt(1 - t * t) - 1);
  }
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
};

/**
 * @method bounceIn
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.bounceIn = function (t) {
  return 1 - Ease.bounceOut(1 - t);
};

/**
 * @method bounceOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.bounceOut = function (t) {
  if (t < 1 / 2.75) {
    return 7.5625 * t * t;
  } else if (t < 2 / 2.75) {
    return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
  } else if (t < 2.5 / 2.75) {
    return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
  } else {
    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  }
};

/**
 * @method bounceInOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.bounceInOut = function (t) {
  if (t < 0.5) {
    return Ease.bounceIn(t * 2) * 0.5;
  }
  return Ease.bounceOut(t * 2 - 1) * 0.5 + 0.5;
};

/**
 * Configurable elastic ease.
 * @method getElasticIn
 * @param {Number} amplitude
 * @param {Number} period
 * @static
 * @return {Function}
 **/
Ease.getElasticIn = function (amplitude, period) {
  var pi2 = Math.PI * 2;
  return function (t) {
    if (t === 0 || t === 1) {
      return t;
    }
    var s = period / pi2 * Math.asin(1 / amplitude);
    return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
  };
};

/**
 * @method elasticIn
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.elasticIn = Ease.getElasticIn(1, 0.3);

/**
 * Configurable elastic ease.
 * @method getElasticOut
 * @param {Number} amplitude
 * @param {Number} period
 * @static
 * @return {Function}
 **/
Ease.getElasticOut = function (amplitude, period) {
  var pi2 = Math.PI * 2;
  return function (t) {
    if (t === 0 || t === 1) {
      return t;
    }
    var s = period / pi2 * Math.asin(1 / amplitude);
    return amplitude * Math.pow(2, -10 * t) * Math.sin((t - s) * pi2 / period) + 1;
  };
};

/**
 * @method elasticOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.elasticOut = Ease.getElasticOut(1, 0.3);

/**
 * Configurable elastic ease.
 * @method getElasticInOut
 * @param {Number} amplitude
 * @param {Number} period
 * @static
 * @return {Function}
 **/
Ease.getElasticInOut = function (amplitude, period) {
  var pi2 = Math.PI * 2;
  return function (t) {
    var s = period / pi2 * Math.asin(1 / amplitude);
    if ((t *= 2) < 1) {
      return -0.5 * (amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
    }
    return amplitude * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * pi2 / period) * 0.5 + 1;
  };
};

/**
 * @method elasticInOut
 * @param {Number} t
 * @static
 * @return {Number}
 **/
Ease.elasticInOut = Ease.getElasticInOut(1, 0.3 * 1.5);

exports["default"] = Ease;
module.exports = exports["default"];
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.loadResource = loadResource;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _libtga = require('libtga');

var _libtga2 = _interopRequireDefault(_libtga);

/**
 * Loads a resource via xhr or Image
 * @param  {String}   url      href of the resource to fetch
 * @param  {String}   type     One of XHMLHttpRequest's supported responseType
 *                             values (arraybuffer, blob, document, json, text)
 *                             or 'image' or 'image.co' (for a cross-origin image)
 * @param  {Function} callback Callback to execute on success or failure.  Takes
 *                             err, value as parameters.  Value will be null if err
 *                             is not null
 * @return {void}
 */

function loadResource(url, type, callback) {
  if (type === 'image' || type === 'image.co') {
    if (/\.tga$/.test(url)) {
      _libtga2['default'].loadFile(url, function (err, tga) {
        if (err) {
          callback(err, null);
          return;
        }
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var imageData = context.createImageData(tga.width, tga.height);
        imageData.data.set(tga.imageData);
        canvas.height = tga.height;
        canvas.width = tga.width;
        context.putImageData(imageData, 0, 0);
        var image = new Image();
        image.onload = function () {
          callback(null, this);
        };
        image.onerror = function (e) {
          callback(e, null);
        };
        image.src = canvas.toDataURL();
      });
    } else {
      var i = new Image();
      // cross-origin image:
      if (type === 'image.co') {
        i.crossOrigin = 'anoymous';
      }
      i.onload = function () {
        callback(null, this);
      };
      i.onerror = function (e) {
        callback(e, null);
      };
      i.src = url;
    }
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = type;
    xhr.onload = function () {
      callback(null, this.response);
    };
    xhr.onerror = function (e) {
      callback(e, null);
    };

    xhr.send();
  }
}

/**
 * An AssetLoader manages loading one or more assets.  It handles debouncing of
 * of multiple requests for the same asset, etc.
 */

var AssetLoader = (function () {

  /**
   * Noop.
   */

  function AssetLoader() {
    _classCallCheck(this, AssetLoader);

    this._callbacks = {};
    this._assets = {};
  }

  /**
   * Loads a single asset.
   *
   * If the asset is already loaded, the callback is immediately invoked.
   * @see loadResource
   */

  _createClass(AssetLoader, [{
    key: 'loadAsset',
    value: function loadAsset(url, type, callback) {
      var _this = this;

      var name = '_' + encodeURIComponent(url);
      if (this._assets[name]) {
        // TODO: bounce this out of the current execution
        callback(null, this._assets[name]);
        return;
      }
      this._callbacks[name] = this._callbacks[name] || [];
      this._callbacks[name].push(callback);
      if (!this._assets.hasOwnProperty(name)) {
        this._assets[name] = false;
        loadResource(url, type, function (err, value) {
          if (!err) {
            _this._assets[name] = value;
          }
          var cb;
          while (cb = _this._callbacks[name].shift()) {
            cb(err, value);
          }
        });
      }
    }

    /**
     * Load a set of assets in parallel
     * @param  {Array}   urls      Array of urls of resources
     * @param  {Array}   types     Array of types of resources
     * @param  {Function} callback Callback to invoke for each resource
     * @return {void}
     * @see  loadResource
     */
  }, {
    key: 'loadAssetGroup',
    value: function loadAssetGroup(urls, types, callback) {
      if (urls.length !== types.length) {
        throw 'Incompatible types: types.length = ' + types.length + '; urls.length = ' + urls.length;
      }
      var len = urls.length,
          results = new Array(len);
      var onEach = function onEach(idx, err, value) {
        if (err) {
          callback(err, null);
          return;
        }
        results[idx] = value;
        var i,
            r = true;
        for (i = 0; i < len; i++) {
          r = r && results[i];
        }
        if (r) {
          callback(null, results);
        }
      };
      for (var i = 0; i < urls.length; i++) {
        this.loadAsset(urls[i], types[i], onEach.bind(undefined, i));
      }
    }

    /**
     * Directly retrieve an asset from the cache
     * @param  {String} name The cache key
     * @return {mixed}       The cached asset, if it exists.
     */
  }, {
    key: 'getAsset',
    value: function getAsset(name) {
      return this._assets[name];
    }
  }]);

  return AssetLoader;
})();

exports['default'] = AssetLoader;
},{"libtga":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBound = require('./gl-bound');

var _glBound2 = _interopRequireDefault(_glBound);

var _assetLoader = require('./asset-loader');

var _assetLoader2 = _interopRequireDefault(_assetLoader);

var _meshFile = require('./mesh/file');

var _meshFile2 = _interopRequireDefault(_meshFile);

var _texture = require('./texture');

var _texture2 = _interopRequireDefault(_texture);

var _program = require('./program');

var _program2 = _interopRequireDefault(_program);

var _programGlowramp = require('./program/glowramp');

var _programGlowramp2 = _interopRequireDefault(_programGlowramp);

var _programOpaque = require('./program/opaque');

var _programOpaque2 = _interopRequireDefault(_programOpaque);

var _programs = {
  'Glowramp': _programGlowramp2['default'],
  'Opaque': _programOpaque2['default']
};

function areLoading(n, e) {
  if (e === 0) {
    n++;
  }
  return n;
}

function areLoaded(n, e) {
  if (e > 0) {
    n++;
  }
  return n;
}

function areError(n, e) {
  if (e < 0) {
    n++;
  }
  return n;
}

function simpleMerge(left, right) {
  left = left || {};
  for (var i in right) {
    left[i] = right[i];
  }
  return left;
}

function mergeManifests(base, add) {
  var keys = ['texture', 'mesh', 'program', 'rawProgram'];
  keys.forEach(function (key) {
    if (key in add) {
      base[key] = simpleMerge(base[key], add[key]);
    }
  });
  return base;
}

/**
 * Utility function to get some info on loading states.
 * @param  {Array} queue  List of status codes, one per request
 * @return {Object}       Short summary of the state of the queue.
 */
function summarize(queue) {
  return {
    total: queue.length,
    loading: queue.reduce(areLoading, 0),
    loaded: queue.reduce(areLoaded, 0),
    error: queue.reduce(areError, 0)
  };
}

/**
 * An AssetManager manages all the various types of assets that need to be bound to
 * to a gl context.  It uses an AssetLoader to handle the loading and caching of the
 * asset sources, and also maintains a parallel cache of the bound resources.
 */

var AssetManager = (function (_GLBound) {
  _inherits(AssetManager, _GLBound);

  /**
   * Constructs an asset loader.
   * @param  {context} gl      A 3d context from a canvas
   * @param  {Object} manifest A mapping of key:value pairs for the following types:
   *                           texture, mesh, program, rawProgram
   */

  function AssetManager(gl, manifest) {
    _classCallCheck(this, AssetManager);

    _get(Object.getPrototypeOf(AssetManager.prototype), 'constructor', this).call(this, gl);
    this.manifest = manifest;
    this.loader = new _assetLoader2['default']();
    this.textures = {};
    this.meshes = {};
    this.programs = {};
    this.queues = {
      texture: [],
      mesh: [],
      program: []
    };
    this.stats = {
      texture: {},
      mesh: {},
      program: {},
      rawProgram: {}
    };
    this.complete = null;
    this.path = '/assets/';
  }

  /**
   * Merges in another manifest to the existing asset manifest
   *
   * Additional manifests should be merged in before loading.
   * @param {Object} manifest @see constructor
   */

  _createClass(AssetManager, [{
    key: 'addAssets',
    value: function addAssets(manifest) {
      this.manifest = mergeManifests(this.manifest, manifest);
    }

    /**
     * Adds a bound texture to the texture cache, under a given internal name
     * @param {String} name     Texture internal name
     * @param {Texture} texture A bound Texture
     */
  }, {
    key: 'addTexture',
    value: function addTexture(name, texture) {
      this.textures[name] = texture;
    }

    /**
     * Adds a bound mesh to the mesh cache, under a given internal name
     * @param {String} name Mesh internal name
     * @param {Mesh} mesh   A bound mesh
     */
  }, {
    key: 'addMesh',
    value: function addMesh(name, mesh) {
      this.meshes[name] = mesh;
    }

    /**
     * Adds a bound program to the program cache, under a given internal name
     * @param {String} name     Program internal name
     * @param {Program} program A bound Program
     */
  }, {
    key: 'addProgram',
    value: function addProgram(name, program) {
      this.programs[name] = program;
    }

    /**
     * Gets a bound texture directly from the cache.
     * @param  {String} name Texture internal name
     * @return {Texture}     The bound texture, or undefined if it does not
     *                       exist or is not yet loaded.
     */
  }, {
    key: 'getTexture',
    value: function getTexture(name) {
      var texture = this.textures[name];
      if (texture) {
        this.stats.texture[name] = (this.stats.texture[name] || 0) + 1;
      }
      return texture;
    }

    /**
     * Gets a bound mesh directly from the cache.
     * @param  {String} name Mesh internal name
     * @return {Mesh}        The bound mesh, or undefined if it does not
     *                       exist or is not yet loaded.
     */
  }, {
    key: 'getMesh',
    value: function getMesh(name) {
      var mesh = this.meshes[name];
      if (mesh) {
        this.stats.mesh[name] = (this.stats.mesh[name] || 0) + 1;
      }
      return mesh;
    }

    /**
     * Gets a bound program directly from the cache.
     * @param  {String} name Program internal name
     * @return {Program}     The bound program, or undefined if it does not
     *                       exist or is not yet loaded.
     */
  }, {
    key: 'getProgram',
    value: function getProgram(name) {
      var prog = this.programs[name];
      if (prog) {
        if (this.stats.rawProgram.hasOwnProperty(name)) {
          this.stats.rawProgram[name]++;
        } else {
          this.stats.program[name] = (this.stats.program[name] || 0) + 1;
        }
      }
      return prog;
    }

    /**
     * Loads all remote resources found in the manifest, and creates any static programs
     * included in the manifest's rawPrograms section, if it exists.
     * @param  {Function} callback Callback invoked upon completion
     * @return {Function}          Returns a function that can be called to get information
     *                             on loading status. @see getStatus
     */
  }, {
    key: 'loadAll',
    value: function loadAll(callback) {
      var i,
          asset,
          manifest = this.manifest;
      this.complete = callback;
      for (i in manifest.texture) {
        if (manifest.texture.hasOwnProperty(i) && !(i in this.textures)) {
          this.textures[i] = null;
          asset = manifest.texture[i];
          this.loader.loadAsset((!asset['static'] ? this.path : '') + asset.path, 'image', this._handleTexture.bind(this, this.queues.texture.length, i, asset));
          this.queues.texture.push(0);
        }
      }
      for (i in manifest.mesh) {
        if (manifest.mesh.hasOwnProperty(i) && !(i in this.meshes)) {
          this.meshes[i] = null;
          asset = manifest.mesh[i];
          this.loader.loadAsset((!asset['static'] ? this.path : '') + asset.path, 'arraybuffer', this._handleMesh.bind(this, this.queues.mesh.length, i, asset));
          this.queues.mesh.push(0);
        }
      }
      for (i in manifest.program) {
        if (manifest.program.hasOwnProperty(i) && !(i in this.programs)) {
          this.programs[i] = null;
          asset = manifest.program[i];
          this.loader.loadAssetGroup([(!asset['static'] ? this.path : '') + asset.vertex, (!asset['static'] ? this.path : '') + asset.fragment], ['text', 'text'], this._handleProgram.bind(this, this.queues.program.length, i, asset));
          this.queues.program.push(0);
        }
      }
      for (i in manifest.rawProgram) {
        if (manifest.rawProgram.hasOwnProperty(i) && !(i in this.programs)) {
          this.stats.rawProgram[i] = 0;
          this._createProgram(i, manifest.rawProgram[i]);
        }
      }

      return this.getStatus.bind(this);
    }

    /**
     * Returns a small summary of all the loader queues for all assets.
     * @return {Object} A summary of each queue. @see summarize
     */
  }, {
    key: 'getStatus',
    value: function getStatus() {
      return {
        texture: summarize(this.queues.texture),
        mesh: summarize(this.queues.mesh),
        program: summarize(this.queues.program)
      };
    }

    /**
     * Generates a compact manifest containing only the resources that have been
     * actually be fetched from the cache, after loading.  Useful to reduce loading
     * time for scenes that only use a few resources.
     * @return {Object} A manifest containing only the resources that were actually used
     *                  after loading.
     */
  }, {
    key: 'generateManifest',
    value: function generateManifest() {
      var manifest = {},
          keys = ['texture', 'mesh', 'rawProgram', 'program'];
      keys.forEach((function (section) {
        manifest[section] = {};
        for (var i in this.stats[section]) {
          if (this.stats[section].hasOwnProperty(i) && this.stats[section][i] > 0) {
            manifest[section][i] = this.manifest[section][i];
          }
        }
      }).bind(this));
      return manifest;
    }
  }, {
    key: '_isComplete',
    value: function _isComplete() {
      var status = this.getStatus();
      if (this.complete && status.texture.loading === 0 && status.mesh.loading === 0 && status.program.loading === 0) {
        this.complete();
      }
    }
  }, {
    key: '_handleTexture',
    value: function _handleTexture(idx, name, info, err, value) {
      if (err) {
        this.queues.texture[idx] = -1;
        console.error(err);
        throw 'Could not load ' + name;
      }

      this.addTexture(name, new _texture2['default'](this._gl, info, value));
      this.queues.texture[idx] = 1;
      this._isComplete();
    }
  }, {
    key: '_handleMesh',
    value: function _handleMesh(idx, name, info, err, value) {
      if (err) {
        this.queues.mesh[idx] = -1;
        console.error(err);
        throw 'Could not load ' + name;
      }

      this.addMesh(name, new _meshFile2['default'](this._gl, value));
      this.queues.mesh[idx] = 1;
      this._isComplete();
    }
  }, {
    key: '_createProgram',
    value: function _createProgram(name, info) {
      var Klass = _program2['default'];
      if (info.program in _programs) {
        Klass = _programs[info.program];
      }
      this.addProgram(name, new Klass(this._gl, info.vertex, info.fragment));
    }
  }, {
    key: '_handleProgram',
    value: function _handleProgram(idx, name, info, err, vals) {
      if (err) {
        this.queues.program[idx] = -1;
        console.error(err);
        throw 'Could not load ' + name;
      }

      var Klass = _program2['default'];
      if (info.program in _programs) {
        Klass = _programs[info.program];
      }
      this.addProgram(name, new Klass(this._gl, vals[0], vals[1]));
      this.queues.program[idx] = 1;
      this._isComplete();
    }
  }]);

  return AssetManager;
})(_glBound2['default']);

exports['default'] = AssetManager;
module.exports = exports['default'];
},{"./asset-loader":6,"./gl-bound":32,"./mesh/file":38,"./program":45,"./program/glowramp":46,"./program/opaque":47,"./texture":50}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _glMatrix = require('gl-matrix');

/**
 * A Camera is a class to manage view of the scene.
 */

var Camera = (function () {

  /**
   * Creates a camera
   *
   * @chainable
   * @return {this}
   */

  function Camera(width, height) {
    _classCallCheck(this, Camera);

    this.position = _glMatrix.vec3.create();
    this.view = _glMatrix.mat4.create();
    this.project = _glMatrix.mat4.create();
    this.viewProject = _glMatrix.mat4.create();
    this.hFoV = Math.PI / 4;
    this.near = 0.1;
    this.far = 100;
    this.width = width;
    this.height = height;
    this.focus = _glMatrix.vec3.create();
    this.up = _glMatrix.vec3.fromValues(0, 1, 0);
    return this._updateProjection()._updateView();
  }

  /**
   * Generates a view matrix, as if the camera is looking at the specified point.
   *
   * @chainable
   * @param  {vec3} point   The point to look at
   * @return {this}
   */

  _createClass(Camera, [{
    key: 'lookAt',
    value: function lookAt(point) {
      _glMatrix.vec3.copy(this.focus, point);
      return this._updateView();
    }

    /**
     * Moves the camera's position in some direction
     *
     * Maintains the camera's current focus.
     *
     * @chainable
     * @param  {vec3} vec   The vector to translate by
     * @return {this}
     */
  }, {
    key: 'translate',
    value: function translate(vec) {
      _glMatrix.vec3.translate(this.position, this.position, vec);
      return this._updateView();
    }

    /**
     * Sets the camera's position
     *
     * @chainable
     * @param {vec3} position Camera position
     */
  }, {
    key: 'setPosition',
    value: function setPosition(position) {
      _glMatrix.vec3.copy(this.position, position);
      return this._updateView();
    }

    /**
     * Set the viewport dimensions and update the projection matrix
     *
     * @chainable
     * @param {Number} width  Viewport width
     * @param {Number} height Viewport height
     * @return {this}
     */
  }, {
    key: 'setDimensions',
    value: function setDimensions(width, height) {
      this.width = width;
      this.height = height;
      return this._updateProjection();
    }

    /**
     * Set the horizontal field of view
     *
     * @chainable
     * @param {Number} fov Field of view, in radians
     * @return {this}
     */
  }, {
    key: 'setFieldOfView',
    value: function setFieldOfView(fov) {
      this.hFoV = fov;
      return this._updateProjection();
    }

    /**
     * Sets the far clip distance
     *
     * @chainable
     * @param {Number} far Max viewable distance
     */
  }, {
    key: 'setFar',
    value: function setFar(far) {
      this.far = far;
      return this._updateProjection();
    }

    /**
     * Updates the camera's view matrix from all parameters.
     *
     * @chainable
     * @return {this}
     */
  }, {
    key: '_updateView',
    value: function _updateView() {
      _glMatrix.mat4.lookAt(this.view, this.position, this.focus, this.up);
      return this;
    }

    /**
     * Update the camera's projection matrix
     *
     * @chainable
     * @return {this}
     */
  }, {
    key: '_updateProjection',
    value: function _updateProjection() {
      _glMatrix.mat4.perspective(this.project, this.hFoV, this.width / this.height, this.near, this.far);
      return this;
    }
  }]);

  return Camera;
})();

exports['default'] = Camera;
module.exports = exports['default'];
},{"gl-matrix":1}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _glMatrix = require('gl-matrix');

/**
 * A bunch of useful constants.
 * @type {Object}
 */
var Constants = {
  /**
   * Short list of team colors by internal name.
   * @type {Object}
   */
  teamColors: {
    RESISTANCE: _glMatrix.vec4.fromValues(0, 0.7607843137254902, 1, 1.0),
    ENLIGHTENED: _glMatrix.vec4.fromValues(0.1568627450980392, 0.9568627450980393, 0.1568627450980392, 1.0),
    NEUTRAL: _glMatrix.vec4.fromValues(0.9764705882352941, 0.9764705882352941, 0.9764705882352941, 1.0),
    LOKI: _glMatrix.vec4.fromValues(1, 0.1568627450980392, 0.1568627450980392, 1.0)
  },
  /**
   * Quality and level colors, by internal name.
   * @type {Object}
   */
  qualityColors: {
    EXTREMELY_RARE: _glMatrix.vec4.fromValues(0.9803921568627451, 0.39215686274509803, 0.39215686274509803, 1.0),
    VERY_RARE: _glMatrix.vec4.fromValues(0.9568627450980393, 0.5215686274509804, 0.9254901960784314, 1.0),
    MORE_RARE: _glMatrix.vec4.fromValues(0.7647058823529411, 0, 1, 1.0),
    RARE: _glMatrix.vec4.fromValues(0.6666666666666666, 0.5372549019607843, 0.984313725490196, 1.0),
    LESS_COMMON: _glMatrix.vec4.fromValues(0.45098039215686275, 0.6588235294117647, 1, 1.0),
    COMMON: _glMatrix.vec4.fromValues(0.5098039215686274, 0.9529411764705882, 0.7058823529411765, 1.0),
    VERY_COMMON: _glMatrix.vec4.fromValues(0.6980392156862745, 0.6980392156862745, 0.6980392156862745, 1.0),
    L1: _glMatrix.vec4.fromValues(0.996078431372549, 0.807843137254902, 0.35294117647058826, 1.0),
    L2: _glMatrix.vec4.fromValues(1, 0.6509803921568628, 0.18823529411764706, 1.0),
    L3: _glMatrix.vec4.fromValues(1, 0.45098039215686275, 0.08235294117647059, 1.0),
    L4: _glMatrix.vec4.fromValues(0.8941176470588236, 0, 0, 1.0),
    L5: _glMatrix.vec4.fromValues(0.9921568627450981, 0.1607843137254902, 0.5725490196078431, 1.0),
    L6: _glMatrix.vec4.fromValues(0.9215686274509803, 0.14901960784313725, 0.803921568627451, 1.0),
    L7: _glMatrix.vec4.fromValues(0.7568627450980392, 0.1411764705882353, 0.8784313725490196, 1.0),
    L8: _glMatrix.vec4.fromValues(0.5882352941176471, 0.15294117647058825, 0.9568627450980393, 1.0)
  },
  /**
   * Color constants for anomaly markers.
   * @type {Object}
   */
  anomalyColors: {
    1: _glMatrix.vec4.fromValues(1.0, 0.5686274509803921, 0.21176470588235294, 1.0),
    2: _glMatrix.vec4.fromValues(1.0, 0.3215686274509804, 0.9058823529411765, 1.0),
    3: _glMatrix.vec4.fromValues(0.6196078431372549, 0.35294117647058826, 1.0, 1.0),
    4: _glMatrix.vec4.fromValues(0.8431372549019608, 0.27058823529411763, 0.27058823529411763, 1.0),
    5: _glMatrix.vec4.fromValues(1.0, 0.9450980392156862, 0.0, 1.0),
    6: _glMatrix.vec4.fromValues(0.6509803921568628, 1.0, 0.9019607843137255, 1.0),
    7: _glMatrix.vec4.fromValues(0.5725490196078431, 0.5803921568627451, 0.592156862745098, 1.0)
  },
  /**
   * Glow colors for the various artifact<color>Glow decorations for shard portals and
   * target portals, by series.
   * @type {Object}
   */
  artifactGlowColors: {
    Helios: {
      Red: _glMatrix.vec4.fromValues(0.92, 0.51, 0.14, 1.0),
      Purple: _glMatrix.vec4.fromValues(1.0, 0.87, 0.55, 1.0),
      Target: _glMatrix.vec4.fromValues(1.0, 0.72, 0.0, 1.0)
    },
    Amar: {
      Target: _glMatrix.vec4.fromValues(0.62, 0.22, 0.62, 1.0),
      Red: _glMatrix.vec4.fromValues(0.79, 0.11, 0.49, 1.0),
      Purple: _glMatrix.vec4.fromValues(0.58, 0.17, 1.0, 1.0)
    },
    Jarvis: {
      Target: _glMatrix.vec4.fromValues(0.62, 0.22, 0.62, 1.0),
      Red: _glMatrix.vec4.fromValues(0.79, 0.11, 0.49, 1.0),
      Purple: _glMatrix.vec4.fromValues(0.58, 0.17, 1.0, 1.0)
    },
    Shonin: {
      Red: _glMatrix.vec4.fromValues(0.78, 0.84, 1.0, 1.0),
      Purple: _glMatrix.vec4.fromValues(0.25, 0.81, 1.0, 1.0),
      Target: _glMatrix.vec4.fromValues(0.70, 0.70, 0.70, 1.0)
    },
    Lightman: {
      Red: _glMatrix.vec4.fromValues(1.0, 0.44, 0.45, 1.0),
      Purple: _glMatrix.vec4.fromValues(1.0, 0.24, 0.25, 1.0),
      Target: _glMatrix.vec4.fromValues(0.74, 0.0, 0.02, 1.0)
    }
  },
  /**
   * Constants for xm glow colors (for item xm cores)
   * @type {Object}
   */
  xmColors: {
    coreGlow: _glMatrix.vec4.fromValues(0.92, 0.7, 0.89, 1.0),
    coreGlowAlt: _glMatrix.vec4.fromValues(0.6, 0.4, 0.6, 0.8),
    coreGlowAda: _glMatrix.vec4.fromValues(0, 0.7607843137254902, 1, 1.0),
    coreGlowJarvis: _glMatrix.vec4.fromValues(0.1568627450980392, 0.9568627450980393, 0.1568627450980392, 1.0)
  },
  /**
   * Mesh internal name constants.
   * @type {Object}
   */
  Mesh: {
    Inventory: {
      Xmp: 'XmpMesh',
      XmpXm: 'XmpXMMesh',
      Ultrastrike: 'UltrastrikeMesh',
      UltrastrikeXm: 'UltrastrikeXMMesh',
      ResShield: 'ResShieldMesh',
      ResShieldXm: 'ResShieldXMMesh',
      PowerCube: 'PowerCubeMesh',
      PowerCubeXm: 'PowerCubeXmMesh',
      LinkAmp: 'LinkAmpMesh',
      LinkAmpXm: 'LinkAmpXmMesh',
      HeatSink: 'HeatSinkMesh',
      HeatSinkXm: 'HeatSinkXmMesh',
      MultiHack: 'MultiHackMesh',
      MultiHackXm: 'MultiHackXmMesh',
      ForceAmp: 'ForceAmpMesh',
      ForceAmpXm: 'ForceAmpXmMesh',
      Turret: 'TurretMesh',
      TurretXm: 'TurretXmMesh',
      FlipCardAda: 'FlipCardMeshAda',
      FlipCardJarvis: 'FlipCardMeshJarvis',
      FlipCardXm: 'FlipCardXmMesh',
      Resonator: 'ResonatorMesh',
      ResonatorXm: 'ResonatorXMMesh',
      Capsule: 'CapsuleMesh',
      InterestCapsule: 'InterestCapsuleMesh',
      CapsuleXm: 'CapsuleXmMesh',
      ExtraShield: 'ExtraShieldMesh',
      MediaCube: 'MediaCubeMesh',
      MediaPlaneMesh: 'MediaPlaneMesh'
    },
    Resource: {
      Xmp: 'XmpResourceUnitMesh',
      PortalKeyResourceUnit: 'PortalKeyResourceUnit',
      Ultrastrike: 'UltrastrikeResourceUnitMesh',
      PowerCube: 'PowerCubeResourceUnitMesh',
      LinkAmp: 'LinkAmpResourceUnitMesh',
      HeatSink: 'HeatSinkResourceUnitMesh',
      MultiHack: 'MultiHackResourceUnitMesh',
      ForceAmp: 'ForceAmpResourceUnitMesh',
      Turret: 'TurretResourceUnitMesh',
      FlipCardAda: 'FlipCardResourceUnitMeshAda',
      FlipCardJarvis: 'FlipCardResourceUnitMeshJarvis',
      Resonator: 'ResonatorResourceUnitMesh',
      PortalShield: 'PortalShieldResourceUnitMesh',
      Capsule: 'CapsuleResourceUnitMesh',
      InterestCapsule: 'InterestCapsuleResourceUnitMesh',
      ExtraShield: 'ExtraShieldResourceUnitMesh'
    },
    Player: {
      Player: 'PlayerMesh',
      PlayerEdge: 'PlayerMeshEdge',
      PlayerReflection: 'PlayerMeshReflection',
      PlayerGlow: 'PlayerMeshGlow',
      BreadCrumb: 'BreadCrumbMesh',
      Compass: 'CompassMesh'
    },
    Ornament: {
      MeetupPoint: 'OrnamentMeetupPointMesh',
      FinishPoint: 'OrnamentFinishPointMesh',
      Cluster: 'OrnamentClusterMesh',
      Volatile: 'OrnamentVolatileMesh'
    },
    World: {
      Shield: 'PortalShieldMesh',
      Portal: 'TexturedPortalMesh',
      Waypoint: 'TexturedScannerFTMesh',
      Resonator: 'ResonatorUnitLowResMesh',
      XmpRing: 'XmpRingMesh',
      UltraStrikeRing: 'UltraStrikeRingMesh',
      UltraStrikeColumn: 'UltraStrikeColumnMesh',
      ArtifactsRedGlow: 'ArtifactsRedGlow',
      ArtifactsGreenGlow: 'ArtifactsGreenGlow',
      ArtifactsPurpleGlow: 'ArtifactsPurpleGlow',
      ArtifactsTargetGlow: 'ArtifactsTargetGlow',
      SingleResonator: 'SingleResonatorMesh',
      OrnamentMeetupPoint: 'OrnamentMeetupPointMesh',
      OrnamentFinishPoint: 'OrnamentFinishPointMesh',
      OrnamentCluster: 'OrnamentClusterMesh',
      OrnamentVolatile: 'OrnamentVolatileMesh'
    }
  },
  /**
   * Program internal name constants.
   * @type {Object}
   */
  Program: {
    Bicolored: 'bicolor_textured',
    Textured: 'textured',
    RegionTextured: 'region_textured',
    Glowramp: 'portal_scanner',
    Xm: 'xm',
    ShieldEffect: 'shield',
    Atmosphere: 'atmosphere',
    Link: 'LinkShader',
    SphericalLink: 'link3d',
    ParticlePortal: 'particle_portals'
  },
  /**
   * Texture internal name constants.
   * @type {Object}
   */
  Texture: {
    FlipCard: 'FlipCardTexture',
    Xm: 'ObjectXMTexture',
    Glowramp: 'GlowrampTexture',
    Media: 'MediaCubeTexture',
    Waypoint: 'FtWaypointTexture',
    ShieldEffect: 'PortalShieldTexture',
    ColorGlow: 'ColorGlowTexture',
    TargetGlow: 'TargetGlowTexture',
    PortalLink: 'PortalLinkTexture',
    ResonatorLink: 'ResonatorLinkTexture',
    OrnamentMeetupPoint: 'OrnamentMeetupPointTexture',
    OrnamentFinishPoint: 'OrnamentFinishPointTexture',
    OrnamentCluster: 'OrnamentClusterTexture',
    OrnamentVolatile: 'OrnamentVolatileTexture',
    Particle: 'ParticleTexture'
  }
};

exports['default'] = Constants;
module.exports = exports['default'];
},{"gl-matrix":1}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _glMatrix = require('gl-matrix');

/**
 * Base class for all "drawable" things.
 *
 * Requires, at the very least, a program to run.
 */

var Drawable = (function () {

  /**
   * Given a mesh internal name and a program internal name, construct
   * a Drawable
   * @param  {String} programName Program internal name
   * @param  {String} meshName    Mesh internal Name
   */

  function Drawable(programName, meshName) {
    _classCallCheck(this, Drawable);

    this.programName = programName;
    this.meshName = meshName;
    this.mesh = null;
    this.program = null;
    this.uniforms = {};
    this.drawfn = this._draw.bind(this);
    this.elapsed = 0;
    this.ready = false;
    this.viewProject = _glMatrix.mat4.create();
    this._position = _glMatrix.vec3.create();
    this._rotation = _glMatrix.quat.create();
    this._scale = _glMatrix.vec3.fromValues(1, 1, 1);
    this._model = _glMatrix.mat4.create();
    this.local = _glMatrix.mat4.create();
    this.world = _glMatrix.mat4.create();
    this.uniforms.u_modelViewProject = _glMatrix.mat4.create();
    this.children = [];
  }

  /**
   * Initializer for the drawable
   *
   * Hooks up the drawable to all its gl-bound resources
   *
   * @param  {AssetManager} manager AssetManager containing the managed resources for this
   *                                drawable.
   * @return {boolean}              Returns true if the assets are successfully found and initialized,
   *                                false (and generates a warning) otherwise.
   */

  _createClass(Drawable, [{
    key: 'init',
    value: function init(manager) {
      if (this.meshName) {
        this.mesh = manager.getMesh(this.meshName);
        if (!this.mesh) {
          console.warn('missing mesh ' + this.meshName);
          return false;
        }
      }
      if (this.programName) {
        this.program = manager.getProgram(this.programName);
        if (!this.program) {
          console.warn('missing program ' + this.programName);
          return false;
        }
      }
      this.ready = true;
      return true;
    }

    /**
     * Sets the specific draw function for this drawable
     *
     * @chainable
     * @param {Function} fn The draw function to use when drawable this object
     * @return {this}
     */
  }, {
    key: 'setDrawFn',
    value: function setDrawFn(fn) {
      this.drawfn = fn;
      return this;
    }

    /**
     * Executes a draw call for this object
     *
     * Issues a warning if the drawable has not yet been initialized with `init`
     * @return {void}
     */
  }, {
    key: 'draw',
    value: function draw() {
      if (!this.ready) {
        console.warn('drawable is not initialized');
        return false;
      }
      if (this.program) {
        this.program.use(this.drawfn);
      }
    }

    /**
     * Sets a uniform on the drawable
     *
     * @chainable
     * @param {String} name  Name of the drawable to set
     * @param {mixed} value  Value to set on the drawable.
     * @returns {this}
     */
  }, {
    key: 'setUniform',
    value: function setUniform(name, value) {
      this.uniforms[name] = value;
      return this;
    }

    /**
     * Updates the elapsed time for this object.
     *
     * Also executes any periodic updates that have been applied to the drawable
     * (i.e. animations).  If this function returns a falsey value, it signals that the
     * animation has ended, and that the object should be removed from the draw loop.
     *
     * @param  {Number} delta Amount of time that has elapsed since the last draw call
     * @return {boolean}      Return false if the object should be removed from the
     *                        return loop.
     */
  }, {
    key: 'updateTime',
    value: function updateTime(delta) {
      this.elapsed += delta;
      if (this.onUpdate) {
        return this.onUpdate(delta, this.elapsed);
      }
      return true;
    }

    /**
     * Update the internal u_modelViewProject uniform
     * by applying world and local transforms to the model
     * matrix.  Then, propagate the new local transform to all the children
     * by way of their world transforms.
     */
  }, {
    key: 'updateMatrix',
    value: function updateMatrix() {
      var _this = this;

      _glMatrix.mat4.fromRotationTranslation(this.local, this._rotation, this._position);
      _glMatrix.mat4.scale(this.local, this.local, this._scale);
      _glMatrix.mat4.multiply(this._model, this.world, this.local);
      _glMatrix.mat4.multiply(this.uniforms.u_modelViewProject, this.viewProject, this._model);
      this.children.forEach(function (child) {
        child.updateWorld(_this.local);
      });
    }

    /**
     * Updates the model's "world" transform.
     * @param  {mat4} world   A world transform
     */
  }, {
    key: 'updateWorld',
    value: function updateWorld(world) {
      this.world = world;
      this.updateMatrix();
    }

    /**
     * Update the internal viewProject matrix (projection * view matrices)
     * @param  {mat4} viewProject Projection matrix multiplied by view matrix
     */
  }, {
    key: 'updateView',
    value: function updateView(viewProject) {
      this.viewProject = viewProject;
      this.updateMatrix();
    }

    /**
     * Sets the model transform to a given matrix
     * @param {mat4} mat Matrix to use
     */
  }, {
    key: 'setMatrix',
    value: function setMatrix(mat) {
      this._model = mat;
      this.updateMatrix();
    }

    /**
     * Translate a model along some vector
     * @param  {vec3} vec   The vector
     */
  }, {
    key: 'translate',
    value: function translate(vec) {
      _glMatrix.vec3.add(this._position, this._position, vec);
      this.updateMatrix();
    }

    /**
     * Scale a model by some vector
     * @param  {vec3} vec   The vector
     */
  }, {
    key: 'scale',
    value: function scale(vec) {
      _glMatrix.vec3.add(this._scale, this._scale, vec);
      this.updateMatrix();
    }

    /**
     * Sets the scale of the local transform
     * @param {vec3} vec The scale to set to.
     */
  }, {
    key: 'setScale',
    value: function setScale(vec) {
      _glMatrix.vec3.copy(this._scale, vec);
      this.updateMatrix();
    }

    /**
     * Rotate a model with a quaternion
     * @param  {quat} quat   The quaternion
     */
  }, {
    key: 'rotateQuat',
    value: function rotateQuat(quat) {
      quat.add(this._rotation, this._rotation, quat);
      this.updateMatrix();
    }

    /**
     * Translate the model along the X axis
     * @param  {float} dist  Distance to translate
     */
  }, {
    key: 'translateX',
    value: function translateX(dist) {
      this.translate(_glMatrix.vec3.fromValues(dist, 0, 0));
    }

    /**
     * Translate the model along the Y axis
     * @param  {float} dist  Distance to translate
     */
  }, {
    key: 'translateY',
    value: function translateY(dist) {
      this.translate(_glMatrix.vec3.fromValues(0, dist, 0));
    }

    /**
     * Translate the model along the Z axis
     * @param  {float} dist  Distance to translate
     */
  }, {
    key: 'translateZ',
    value: function translateZ(dist) {
      this.translate(_glMatrix.vec3.fromValues(0, 0, dist));
    }

    /**
     * Scale all dimensions by the same value
     * @param  {Number} f The amount to _scale
     */
  }, {
    key: 'scalarScale',
    value: function scalarScale(f) {
      this.scale(_glMatrix.vec3.fromValues(f, f, f));
    }

    /**
     * Sets the local scale to some scalar value (for x, y, and z)
     * @param {Number} f Amount to set the scale to.
     */
  }, {
    key: 'setScalarScale',
    value: function setScalarScale(f) {
      this.setScale(_glMatrix.vec3.fromValues(f, f, f));
    }

    /**
     * NYI
     * @return {void}
     */
  }, {
    key: 'dispose',
    value: function dispose() {
      // noop;
    }
  }, {
    key: '_draw',
    value: function _draw(locations, uniforms) {
      for (var i in this.uniforms) {
        if (this.uniforms.hasOwnProperty(i) && i in uniforms) {
          uniforms[i](this.uniforms[i]);
        }
      }
      this.mesh.draw(locations);
    }
  }]);

  return Drawable;
})();

exports['default'] = Drawable;
module.exports = exports['default'];
},{"gl-matrix":1}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _drawable = require('../drawable');

var _drawable2 = _interopRequireDefault(_drawable);

var _meshSphere = require('../mesh/sphere');

var _meshSphere2 = _interopRequireDefault(_meshSphere);

var _glMatrix = require('gl-matrix');

var PROGRAM = _constants2['default'].Program.Atmosphere;

/**
 * This is a modified version of the atmosphere program from:
 * https://github.com/dataarts/webgl-globe/blob/master/globe/globe.js
 */

var AtmosphereDrawable = (function (_Drawable) {
  _inherits(AtmosphereDrawable, _Drawable);

  /**
   * Initializer
   * @param  {Number} radius      Radius of the world.
   *                              This should match the radius of the world mesh the
   *                              atmosphere is being rendered over.
   * @param  {Number} vSlices     Number of vertical slices for the sphere mesh
   * @param  {Number} hSlices     Number of horizontal slices for the sphere mesh
   * @param  {Number} scaleFactor The percent to scale the mesh
   * @return {void}
   */

  function AtmosphereDrawable(radius, vSlices, hSlices, scaleFactor) {
    _classCallCheck(this, AtmosphereDrawable);

    _get(Object.getPrototypeOf(AtmosphereDrawable.prototype), 'constructor', this).call(this, PROGRAM, null);
    this.radius = radius;
    this.vSlices = vSlices;
    this.hSlices = hSlices;
    this.uniforms.u_normalMatrix = _glMatrix.mat3.create();
    this.scaleFactor = scaleFactor || 1.1;
    this.setScalarScale(this.scaleFactor);
  }

  /**
   * Updates the view matrices of the model
   *
   * @chainable
   * @see    src/drawable/model.js#updateView
   * @param  {mat4} viewProject   combined projection matrix multiplied by view matrix.
   * @return {this}
   */

  _createClass(AtmosphereDrawable, [{
    key: 'updateView',
    value: function updateView(viewProject) {
      _get(Object.getPrototypeOf(AtmosphereDrawable.prototype), 'updateView', this).call(this, viewProject);
      var invert = _glMatrix.mat4.invert(_glMatrix.mat4.create(), viewProject),
          transpose = _glMatrix.mat4.transpose(_glMatrix.mat4.create(), invert);
      this.uniforms.u_normalMatrix = _glMatrix.mat3.fromMat4(_glMatrix.mat3.create(), transpose);
      return this;
    }

    /**
     * Initializes the drawable
     *
     * @see    src/drawable.js
     * @param  {AssetManager} manager The AssetManager containing the required assets.
     * @return {boolean}
     */
  }, {
    key: 'init',
    value: function init(manager) {
      this.mesh = new _meshSphere2['default'](manager._gl, this.radius, this.vSlices, this.hSlices);
      return _get(Object.getPrototypeOf(AtmosphereDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return AtmosphereDrawable;
})(_drawable2['default']);

exports['default'] = AtmosphereDrawable;
module.exports = exports['default'];
},{"../constants":9,"../drawable":10,"../mesh/sphere":42,"gl-matrix":1}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _textured = require('./textured');

var _textured2 = _interopRequireDefault(_textured);

var _glMatrix = require('gl-matrix');

var PROGRAM = _constants2['default'].Program.Bicolored;

/**
 * Default quality color.
 * @type {vec4}
 */
var defaultColor0 = _glMatrix.vec4.clone(_constants2['default'].qualityColors.VERY_RARE);

/**
 * Default glow color
 * @type {vec4}
 */
var defaultColor1 = _glMatrix.vec4.clone(_constants2['default'].xmColors.coreGlow);

/**
 * This is used for items and other renderables that have two visible colors
 *
 * The specifics of it are basically: if the texture has an opacity less than 0.5,
 * the texture color is blended with u_color0
 * Otherwise, it's the texture color blended with u_color1
 *
 * Or something like that.
 */

var BicoloredDrawable = (function (_TexturedDrawable) {
  _inherits(BicoloredDrawable, _TexturedDrawable);

  /**
   * Initialized a bi-colored drawable
   * @param  {String} meshName    Internal name of the mesh for this drawable
   * @param  {String} textureName Internal name of the texture for this drawble
   */

  function BicoloredDrawable(meshName, textureName) {
    _classCallCheck(this, BicoloredDrawable);

    _get(Object.getPrototypeOf(BicoloredDrawable.prototype), 'constructor', this).call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_color0 = _glMatrix.vec4.clone(defaultColor0);
    this.uniforms.u_color1 = _glMatrix.vec4.clone(defaultColor1);
  }

  return BicoloredDrawable;
})(_textured2['default']);

exports['default'] = BicoloredDrawable;
module.exports = exports['default'];
},{"../constants":9,"./textured":25,"gl-matrix":1}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _textured = require('./textured');

var _textured2 = _interopRequireDefault(_textured);

var _glMatrix = require('gl-matrix');

var PROGRAM = _constants2['default'].Program.Glowramp;

/**
 * Default base color for the glowramp drawable
 * @type {vec4}
 */
var defaultBaseColor = _glMatrix.vec4.clone(_constants2['default'].teamColors.NEUTRAL);

/**
 * A "glowramp" refers to the usage of the red, green, and blue channels to create
 * a "glowing" texture.
 */

var GlowrampDrawable = (function (_TexturedDrawable) {
  _inherits(GlowrampDrawable, _TexturedDrawable);

  /**
   * Creates a glowramp drawable
   * @param  {String} meshName    Internal name of the mesh
   * @param  {String} textureName Internal name of the texture
   */

  function GlowrampDrawable(meshName, textureName) {
    _classCallCheck(this, GlowrampDrawable);

    _get(Object.getPrototypeOf(GlowrampDrawable.prototype), 'constructor', this).call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_baseColor = _glMatrix.vec4.clone(defaultBaseColor);
    this.uniforms.u_rotation = 0;
    this.uniforms.u_rampTarget = 0;
    this.uniforms.u_alpha = 0.6;
  }

  /**
   * Updates default glowramp variables (rotation, ramp target, elapsed time
   * and alpha)
   * @param  {Number} tick Time delta since last tick
   * @return {Boolean}     @see src/drawable.js#updateTime
   */

  _createClass(GlowrampDrawable, [{
    key: 'updateTime',
    value: function updateTime(tick) {
      var ret = _get(Object.getPrototypeOf(GlowrampDrawable.prototype), 'updateTime', this).call(this, tick);
      var inc = this.elapsed / 5000;
      this.uniforms.u_rotation = inc;
      this.uniforms.u_rampTarget = Math.sin(Math.PI / 2 * (inc - Math.floor(inc)));
      this.uniforms.u_alpha = Math.sin(inc) * 0.05 + 0.75;
      return ret;
    }
  }]);

  return GlowrampDrawable;
})(_textured2['default']);

exports['default'] = GlowrampDrawable;
module.exports = exports['default'];
},{"../constants":9,"./textured":25,"gl-matrix":1}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _bicolored = require('./bicolored');

var _bicolored2 = _interopRequireDefault(_bicolored);

var _xm = require('./xm');

var _xm2 = _interopRequireDefault(_xm);

var _textured = require('./textured');

var _textured2 = _interopRequireDefault(_textured);

/**
 * This file constructs the drawable primitives for many of the inventory items.
 */

var Inventory = {};
var meshes = _constants2['default'].Mesh.Inventory;
var textures = _constants2['default'].Texture;

/**
 * Creates the outer "shell" for an xm item.
 * @param  {String} name Internal name of the mesh
 * @return {itembase}    A BicoloredDrawable with the specified mesh name
 *                       and the flipcard texture
 */
function createShell(name) {
  var itembase = (function (_BicoloredDrawable) {
    _inherits(itembase, _BicoloredDrawable);

    function itembase() {
      _classCallCheck(this, itembase);

      _get(Object.getPrototypeOf(itembase.prototype), 'constructor', this).call(this, meshes[name], textures.FlipCard);
    }

    return itembase;
  })(_bicolored2['default']);

  return itembase;
}

/**
 * Creates the xm "core" of an item
 * @param  {String} name Internal name of the xm mesh
 * @return {xmbase}      An XmDrawable with the specified mesh name
 *                       and the Xm texture.
 */
function createCore(name) {
  var xmbase = (function (_XmDrawable) {
    _inherits(xmbase, _XmDrawable);

    function xmbase() {
      _classCallCheck(this, xmbase);

      _get(Object.getPrototypeOf(xmbase.prototype), 'constructor', this).call(this, meshes[name], textures.Xm);
    }

    return xmbase;
  })(_xm2['default']);

  return xmbase;
}

/**
 * Creates a media item
 * @param  {String} name Media mesh internal name
 * @return {media}       A TexturedDrawable with the Textured program,
 *                       the specified mesh, and the flipcard texture.
 */
function createMedia(name) {
  var media = (function (_TexturedDrawable) {
    _inherits(media, _TexturedDrawable);

    function media() {
      _classCallCheck(this, media);

      _get(Object.getPrototypeOf(media.prototype), 'constructor', this).call(this, _constants2['default'].Program.Textured, meshes[name], _constants2['default'].Texture.FlipCard);
    }

    return media;
  })(_textured2['default']);

  return media;
}

for (var i in meshes) {
  if (/^Media/.test(i)) {
    if (i === 'MediaPlane') {
      continue;
    }
    Inventory[i] = createMedia(i);
  } else {
    if (/Xm$/.test(i)) {
      Inventory[i] = createCore(i);
    } else {
      Inventory[i] = createShell(i);
    }
  }
}

exports['default'] = Inventory;
module.exports = exports['default'];
},{"../constants":9,"./bicolored":12,"./textured":25,"./xm":27}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _textured = require('./textured');

var _textured2 = _interopRequireDefault(_textured);

var _glMatrix = require('gl-matrix');

/**
 * The LinkDrawable represents the base class for link-type drawables.
 */

var LinkDrawable = (function (_TexturedDrawable) {
  _inherits(LinkDrawable, _TexturedDrawable);

  /**
   * Constructs a link drawable witth the given program and texture.
   * @param  {String} programName Internal name of the program to use
   * @param  {String} textureName Internal name of the texture to use
   */

  function LinkDrawable(programName, textureName) {
    _classCallCheck(this, LinkDrawable);

    _get(Object.getPrototypeOf(LinkDrawable.prototype), 'constructor', this).call(this, programName, null, textureName);
    this.uniforms.u_cameraFwd = _glMatrix.vec3.fromValues(0, 0, -1);
    this.uniforms.u_elapsedTime = 0;
  }

  /**
   * Updates the camera transforms for the link drawables
   * @param  {mat4} viewProject Combined view and project matrix
   * @param  {mat4} view        View Matrix
   * @param  {mat4} project     Projection matrix
   * @return {void}
   */

  _createClass(LinkDrawable, [{
    key: 'updateView',
    value: function updateView(viewProject, camera) {
      _get(Object.getPrototypeOf(LinkDrawable.prototype), 'updateView', this).call(this, viewProject, camera);
      if (camera) {
        var rot = _glMatrix.mat3.fromMat4(_glMatrix.mat3.create(), camera.view);
        var q = _glMatrix.quat.fromMat3(_glMatrix.quat.create(), rot);
        var fwd = _glMatrix.vec3.transformQuat(_glMatrix.vec3.create(), _glMatrix.vec3.fromValues(0, 0, -1), q);
        _glMatrix.vec3.normalize(fwd, fwd);
        this.uniforms.u_cameraFwd = fwd;
      }
    }

    /**
     * Updates default periodic uniforms for links
     * @param  {Number} delta Time delta since last draw
     * @return {Boolean}      @see src/drawable.js#updateTime
     */
  }, {
    key: 'updateTime',
    value: function updateTime(delta) {
      var ret = _get(Object.getPrototypeOf(LinkDrawable.prototype), 'updateTime', this).call(this, delta);
      this.uniforms.u_elapsedTime = this.elapsed / 1000 % 300.0 * 0.1;
      return ret;
    }
  }]);

  return LinkDrawable;
})(_textured2['default']);

exports['default'] = LinkDrawable;
module.exports = exports['default'];
},{"./textured":25,"gl-matrix":1}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _textured = require('./textured');

var _textured2 = _interopRequireDefault(_textured);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _glMatrix = require('gl-matrix');

var PROGRAM = _constants2['default'].Program.RegionTextured;

/**
 * An OrnamentDrawable is a TextuedDrawable that draws an ornament on
 * a unit plane.
 */

var OrnamentDrawable = (function (_TexturedDrawable) {
  _inherits(OrnamentDrawable, _TexturedDrawable);

  /**
   * Constructs an ornament
   * @param  {String} meshName    Internal name of the ornament mesh
   * @param  {String} textureName Internal name of the texture
   */

  function OrnamentDrawable(meshName, textureName) {
    _classCallCheck(this, OrnamentDrawable);

    _get(Object.getPrototypeOf(OrnamentDrawable.prototype), 'constructor', this).call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_texCoordBase = _glMatrix.vec2.fromValues(0, 0);
    this.uniforms.u_texCoordExtent = _glMatrix.vec2.fromValues(1, 1);
    this.uniforms.u_color = _glMatrix.vec4.clone(_constants2['default'].teamColors.LOKI);
  }

  return OrnamentDrawable;
})(_textured2['default']);

exports['default'] = OrnamentDrawable;
module.exports = exports['default'];
},{"../constants":9,"./textured":25,"gl-matrix":1}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _particle = require('./particle');

var _particle2 = _interopRequireDefault(_particle);

var _meshParticlePortal = require('../mesh/particle-portal');

var _meshParticlePortal2 = _interopRequireDefault(_meshParticlePortal);

var _glMatrix = require('gl-matrix');

var PROGRAM = _constants2['default'].Program.ParticlePortal;
var MAX_SYSTEMS = 40;

var ParticlePortalDrawable = (function (_ParticleDrawable) {
  _inherits(ParticlePortalDrawable, _ParticleDrawable);

  function ParticlePortalDrawable(color, height, count, spread, distance) {
    _classCallCheck(this, ParticlePortalDrawable);

    _get(Object.getPrototypeOf(ParticlePortalDrawable.prototype), 'constructor', this).call(this, PROGRAM);
    var modColor = _glMatrix.vec4.clone(color);
    modColor[3] = count;
    // uniforms should be flattened arrays.
    // Since they're expected to contain up to 40 systems, we'll need to create
    // arrays of 40 * 4 elements each.
    this.uniforms.u_color = new Float32Array(MAX_SYSTEMS * 4);
    this.uniforms.u_position = new Float32Array(MAX_SYSTEMS * 4);
    this.uniforms.u_params = new Float32Array(MAX_SYSTEMS * 4);
    // fill in the first 4 slots.
    _glMatrix.vec4.copy(this.uniforms.u_color, modColor);
    _glMatrix.vec4.copy(this.uniforms.u_position, _glMatrix.vec4.fromValues(0, 0, 0, height));
    _glMatrix.vec4.copy(this.uniforms.u_params, _glMatrix.vec4.fromValues(0, distance, spread, 1));
  }

  /**
   * Update the view, and uniforms pertaining to the view
   * @param  {mat4} viewProject   Camera's combine view and projection matrix
   * @param  {Camera} camera      The camera
   */

  _createClass(ParticlePortalDrawable, [{
    key: 'updateView',
    value: function updateView(viewProject, camera) {
      _get(Object.getPrototypeOf(ParticlePortalDrawable.prototype), 'updateView', this).call(this, viewProject, camera);
      if (camera) {
        var dist = _glMatrix.vec3.length(camera.position);
        var scale = Math.pow(dist, 0.2);
        this.uniforms.u_params[3] = scale;
      }
    }

    /**
     * Update the time for the system
     * @param  {Number} delta Time since last tick
     * @return {Boolean}      Results of onUpdate
     */
  }, {
    key: 'updateTime',
    value: function updateTime(delta) {
      var ret = _get(Object.getPrototypeOf(ParticlePortalDrawable.prototype), 'updateTime', this).call(this, delta);
      this.uniforms.u_params[0] = this.elapsed / 100000 * this.uniforms.u_params[1];
      return ret;
    }

    /**
     * Initialize the portal particle mesh
     * @param  {AssetManager} manager AssetManager containing the remaining assets
     * @return {Boolean}              Success/failure
     */
  }, {
    key: 'init',
    value: function init(manager) {
      this.mesh = new _meshParticlePortal2['default'](manager._gl);
      return _get(Object.getPrototypeOf(ParticlePortalDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return ParticlePortalDrawable;
})(_particle2['default']);

exports['default'] = ParticlePortalDrawable;
module.exports = exports['default'];
},{"../constants":9,"../mesh/particle-portal":39,"./particle":18,"gl-matrix":1}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _textured = require('./textured');

var _textured2 = _interopRequireDefault(_textured);

var _glMatrix = require('gl-matrix');

var TEXTURE = _constants2['default'].Texture.Particle;

/**
 * A ParticleDrawable represents the base class for particles
 *
 * @extends {TexturedDrawable}
 */

var ParticleDrawable = (function (_TexturedDrawable) {
  _inherits(ParticleDrawable, _TexturedDrawable);

  function ParticleDrawable(programName) {
    _classCallCheck(this, ParticleDrawable);

    _get(Object.getPrototypeOf(ParticleDrawable.prototype), 'constructor', this).call(this, programName, null, TEXTURE);
    this.uniforms.u_cameraPos = _glMatrix.vec3.fromValues(0, 0, 0);
  }

  _createClass(ParticleDrawable, [{
    key: 'updateView',
    value: function updateView(viewProject, camera) {
      _get(Object.getPrototypeOf(ParticleDrawable.prototype), 'updateView', this).call(this, viewProject, camera);
      if (camera) {
        _glMatrix.vec3.copy(this.uniforms.u_cameraPos, camera.position);
      }
    }
  }]);

  return ParticleDrawable;
})(_textured2['default']);

exports['default'] = ParticleDrawable;
module.exports = exports['default'];
},{"../constants":9,"./textured":25,"gl-matrix":1}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

var _meshPortalLink = require('../mesh/portal-link');

var _meshPortalLink2 = _interopRequireDefault(_meshPortalLink);

/**
 * A LinkDrawable that represents a link from one portal to another
 * @extends {LinkDrawable}
 */

var PortalLinkDrawable = (function (_LinkDrawable) {
  _inherits(PortalLinkDrawable, _LinkDrawable);

  /**
   * Construct a portal link
   * @param  {vec2} start          X, Z of origin portal
   * @param  {vec2} end            X, Z of destination portal
   * @param  {vec4} color          Color of link
   * @param  {Number} startPercent Percent health of the origin portal
   * @param  {Number} endPercent   Percent health of the destination portal
   */

  function PortalLinkDrawable(start, end, color, startPercent, endPercent) {
    _classCallCheck(this, PortalLinkDrawable);

    _get(Object.getPrototypeOf(PortalLinkDrawable.prototype), 'constructor', this).call(this, _constants2['default'].Program.Link, _constants2['default'].Texture.PortalLink);
    this.start = start;
    this.end = end;
    this.color = color;
    this.startPercent = startPercent;
    this.endPercent = endPercent;
  }

  /**
   * Construct the PortalLinkMesh for this link
   * @param  {AssetManager} manager AssetManager to look up the program and texture
   * @return {Boolean}              Success/failure
   */

  _createClass(PortalLinkDrawable, [{
    key: 'init',
    value: function init(manager) {
      this.mesh = new _meshPortalLink2['default'](manager._gl, this.start, this.end, this.color, this.startPercent, this.endPercent);
      return _get(Object.getPrototypeOf(PortalLinkDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return PortalLinkDrawable;
})(_link2['default']);

exports['default'] = PortalLinkDrawable;
module.exports = exports['default'];
},{"../constants":9,"../mesh/portal-link":40,"./link":15}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

var _meshResonatorLink = require('../mesh/resonator-link');

var _meshResonatorLink2 = _interopRequireDefault(_meshResonatorLink);

/**
 * A ResonatorLinkDrawable is a LinkDrawable that represents a link
 * between a portal and a resonator
 */

var ResonatorLinkDrawable = (function (_LinkDrawable) {
  _inherits(ResonatorLinkDrawable, _LinkDrawable);

  /**
   * Construct a portal link resonator
   * @param  {vec2} portalPosition     X,Z of the portal (usually 0,0)
   * @param  {Number} slot             Slot (0-7)
   * @param  {Number} distance         Usually 0-40
   * @param  {vec4} color              Color of the resonator link (TODO: make this disco)
   * @param  {Number} resonatorPercent Percent health of the resonator
   */

  function ResonatorLinkDrawable(portalPosition, slot, distance, color, resonatorPercent) {
    _classCallCheck(this, ResonatorLinkDrawable);

    _get(Object.getPrototypeOf(ResonatorLinkDrawable.prototype), 'constructor', this).call(this, _constants2['default'].Program.Link, _constants2['default'].Texture.ResonatorLink);
    this.portalPosition = portalPosition;
    this.slot = slot;
    this.distance = distance;
    this.color = color;
    this.resonatorPercent = resonatorPercent;
  }

  /**
   * Creates a ResonatorLinkMesh with the given params, and initializes the
   * texture/program
   * @param  {AssetManager} manager AssetManager containing the required program/texture
   * @return {Boolean}              Success/failure
   */

  _createClass(ResonatorLinkDrawable, [{
    key: 'init',
    value: function init(manager) {
      this.mesh = new _meshResonatorLink2['default'](manager._gl, this.portalPosition, this.slot, this.distance, this.color, this.resonatorPercent);
      return _get(Object.getPrototypeOf(ResonatorLinkDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return ResonatorLinkDrawable;
})(_link2['default']);

exports['default'] = ResonatorLinkDrawable;
module.exports = exports['default'];
},{"../constants":9,"../mesh/resonator-link":41,"./link":15}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _bicolored = require('./bicolored');

var _bicolored2 = _interopRequireDefault(_bicolored);

var Resource = {};
var meshes = _constants2['default'].Mesh.Resource;

/**
 * Creates a resource drawable
 * @param  {String} name InternalName
 * @return {itembase}    A BicoloredDrawable representing this resource item
 */
function createResource(name) {
  var itembase = (function (_BicoloredDrawable) {
    _inherits(itembase, _BicoloredDrawable);

    function itembase() {
      _classCallCheck(this, itembase);

      _get(Object.getPrototypeOf(itembase.prototype), 'constructor', this).call(this, meshes[name], _constants2['default'].Texture.FlipCard);
    }

    return itembase;
  })(_bicolored2['default']);

  return itembase;
}

for (var i in meshes) {
  Resource[name] = createResource(i);
}

exports['default'] = Resource;
module.exports = exports['default'];
},{"../constants":9,"./bicolored":12}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _textured = require('./textured');

var _textured2 = _interopRequireDefault(_textured);

var _glMatrix = require('gl-matrix');

var PROGRAM = _constants2['default'].Program.ShieldEffect;

// these defaults are whack.  Need to find the real
// functions used to update these, too
// As of 1.62.0, that was in ...ingress.common.scanner.b.a.d
// The baksmali is a little jacked up, though.
var defaultColor = _glMatrix.vec4.clone(_constants2['default'].teamColors.NEUTRAL);
var defaultRampTargetInv = _glMatrix.vec2.fromValues(0.5, 1.3);
var defaultContributions = _glMatrix.vec3.fromValues(0.5, 0.5, 0.5);

/**
 * Represents the shield idle effect
 *
 * Note: This probably should actually be generalized differently...
 * Apparently all three shield effects use the same texture and mesh, but have
 * different programs and variables.
 *
 * So, perhaps a better way would be to have the base class hardcode the texture
 * and mesh internal names, and then the derived classes pick a program and handle
 * the variables.
 */

var ShieldEffectDrawable = (function (_TexturedDrawable) {
  _inherits(ShieldEffectDrawable, _TexturedDrawable);

  /**
   * Constructs a shield effect
   * @param  {String} meshName    Mesh internal name
   * @param  {String} textureName Texture internal name
   */

  function ShieldEffectDrawable(meshName, textureName) {
    _classCallCheck(this, ShieldEffectDrawable);

    _get(Object.getPrototypeOf(ShieldEffectDrawable.prototype), 'constructor', this).call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_color = _glMatrix.vec4.clone(defaultColor);
    this.uniforms.u_rampTargetInvWidth = _glMatrix.vec2.clone(defaultRampTargetInv);
    this.uniforms.u_contributionsAndAlpha = _glMatrix.vec3.clone(defaultContributions);
  }

  /**
   * Updates the default uniforms
   *
   * Note: these are nothing like what's in the apk, just some functions that
   * happen to look kinda sorta nice
   * @param  {Number} delta Time since last frame
   * @return {Boolean}      Returns true to continue the animation.
   */

  _createClass(ShieldEffectDrawable, [{
    key: 'updateTime',
    value: function updateTime(delta) {
      var ret = _get(Object.getPrototypeOf(ShieldEffectDrawable.prototype), 'updateTime', this).call(this, delta);
      var inc = this.elapsed / 10000;
      // this is so shitty, but again, this java decompiler really doesn't like the file.
      // This is nothing close to what's 'supposed' to happen in these uniforms, just a hack
      // that's kinda sorta like the actual thing.
      this.uniforms.u_rampTargetInvWidth[0] = -(inc - Math.floor(inc));
      this.uniforms.u_rampTargetInvWidth[1] = Math.sin((inc - Math.floor(inc)) * Math.PI / 2);
      // u_contributionsAndAlpha?
      return ret;
    }
  }]);

  return ShieldEffectDrawable;
})(_textured2['default']);

exports['default'] = ShieldEffectDrawable;
module.exports = exports['default'];
},{"../constants":9,"./textured":25,"gl-matrix":1}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

var _meshSphericalPortalLink = require('../mesh/spherical-portal-link');

var _meshSphericalPortalLink2 = _interopRequireDefault(_meshSphericalPortalLink);

/**
 * Represents a portal link that follows the surface of a sphere.
 *
 * Hooray for custom shaders, etc!
 */

var SphericalPortalLinkDrawable = (function (_LinkDrawable) {
  _inherits(SphericalPortalLinkDrawable, _LinkDrawable);

  /**
   * Construct a spherical portal link
   * @param  {Number} sphereRadius Radius of the sphere
   * @param  {vec2} start          Lat,lng of the origin portal
   * @param  {vec2} end            Lat,lng of the destination portal
   * @param  {vec4} color          Color of the link
   * @param  {Number} startPercent Percent health of the origin portal
   * @param  {Number} endPercent   Percent health of the destination portal
   */

  function SphericalPortalLinkDrawable(sphereRadius, start, end, color, startPercent, endPercent) {
    _classCallCheck(this, SphericalPortalLinkDrawable);

    _get(Object.getPrototypeOf(SphericalPortalLinkDrawable.prototype), 'constructor', this).call(this, _constants2['default'].Program.SphericalLink, _constants2['default'].Texture.PortalLink);
    this.radius = sphereRadius;
    this.start = start;
    this.end = end;
    this.color = color;
    this.startPercent = startPercent;
    this.endPercent = endPercent;
    this.uniforms.u_model = this._model;
  }

  /**
   * Constructs a mesh for the link, then initializes the remaining assets.
   * @param  {AssetManager} manager AssetManager containing the program/texture
   * @return {Boolean}              Success/failure
   */

  _createClass(SphericalPortalLinkDrawable, [{
    key: 'init',
    value: function init(manager) {
      this.mesh = new _meshSphericalPortalLink2['default'](manager._gl, this.radius, this.start, this.end, this.color, this.startPercent, this.endPercent);
      return _get(Object.getPrototypeOf(SphericalPortalLinkDrawable.prototype), 'init', this).call(this, manager);
    }
  }, {
    key: 'updateView',
    value: function updateView(viewProject, camera) {
      _get(Object.getPrototypeOf(SphericalPortalLinkDrawable.prototype), 'updateView', this).call(this, viewProject, camera);
      this.uniforms.u_model = this._model;
    }
  }]);

  return SphericalPortalLinkDrawable;
})(_link2['default']);

exports['default'] = SphericalPortalLinkDrawable;
module.exports = exports['default'];
},{"../constants":9,"../mesh/spherical-portal-link":43,"./link":15}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _textured = require('./textured');

var _textured2 = _interopRequireDefault(_textured);

var _meshSphere = require('../mesh/sphere');

var _meshSphere2 = _interopRequireDefault(_meshSphere);

var PROGRAM = _constants2['default'].Program.Textured;

/**
 * A sphere with a texture mapped to it
 */

var TexturedSphereDrawable = (function (_TexturedDrawable) {
  _inherits(TexturedSphereDrawable, _TexturedDrawable);

  /**
   * Construct a textured sphere
   * @param  {String} textureName Internal name of the texture to use
   * @param  {Number} radius      Radius of the sphere
   * @param  {Number} vSlices     Number of vertical slices
   * @param  {Number} hSlices     Number of horizontal slices
   */

  function TexturedSphereDrawable(textureName, radius, vSlices, hSlices) {
    _classCallCheck(this, TexturedSphereDrawable);

    _get(Object.getPrototypeOf(TexturedSphereDrawable.prototype), 'constructor', this).call(this, PROGRAM, null, textureName);
    this.radius = radius;
    this.vSlices = vSlices;
    this.hSlices = hSlices;
  }

  /**
   * Create a sphere mesh and initialize the other resources
   * @param  {AssetManager} manager AssetManager containing the texture/program
   * @return {Boolean}              Success/failure
   */

  _createClass(TexturedSphereDrawable, [{
    key: 'init',
    value: function init(manager) {
      this.mesh = new _meshSphere2['default'](manager._gl, this.radius, this.vSlices, this.hSlices);
      return _get(Object.getPrototypeOf(TexturedSphereDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return TexturedSphereDrawable;
})(_textured2['default']);

exports['default'] = TexturedSphereDrawable;
module.exports = exports['default'];
},{"../constants":9,"../mesh/sphere":42,"./textured":25}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _drawable = require('../drawable');

var _drawable2 = _interopRequireDefault(_drawable);

/**
 * A TexturedDrawable is a Drawable with a specific texture
 */

var TexturedDrawable = (function (_Drawable) {
  _inherits(TexturedDrawable, _Drawable);

  /**
   * Construct a textured drawable, given a program, mesh, and texture
   * @param  {String} programName Program internal name
   * @param  {String} meshName    Mesh internal name
   * @param  {String} textureName Texture internal name
   */

  function TexturedDrawable(programName, meshName, textureName) {
    _classCallCheck(this, TexturedDrawable);

    _get(Object.getPrototypeOf(TexturedDrawable.prototype), 'constructor', this).call(this, programName, meshName);
    this.textureName = textureName;
    this.texture = null;
  }

  /**
   * Draw the textured object
   */

  _createClass(TexturedDrawable, [{
    key: 'draw',
    value: function draw() {
      this.texture.use(0);
      this.uniforms.u_texture = 0;
      _get(Object.getPrototypeOf(TexturedDrawable.prototype), 'draw', this).call(this);
    }

    /**
     * Initialize the texture, then initialize other resources
     * @param  {AssetManager} manager AssetManager containing the texture and other resources
     * @return {Boolean}              Success/failure
     */
  }, {
    key: 'init',
    value: function init(manager) {
      if (this.textureName) {
        this.texture = manager.getTexture(this.textureName);
        if (!this.texture) {
          console.warn('missing texture ' + this.textureName);
          return false;
        }
      }
      return _get(Object.getPrototypeOf(TexturedDrawable.prototype), 'init', this).call(this, manager);
    }
  }]);

  return TexturedDrawable;
})(_drawable2['default']);

exports['default'] = TexturedDrawable;
module.exports = exports['default'];
},{"../drawable":10}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _glowramp = require('./glowramp');

var _glowramp2 = _interopRequireDefault(_glowramp);

var _bicolored = require('./bicolored');

var _bicolored2 = _interopRequireDefault(_bicolored);

var _shieldEffect = require('./shield-effect');

var _shieldEffect2 = _interopRequireDefault(_shieldEffect);

var _ornament = require('./ornament');

var _ornament2 = _interopRequireDefault(_ornament);

/**
 * Various world drawables
 *
 * Includes Portal, ShieldEffect, waypoints, resonators, and artifact glows
 * @type {Object}
 */
var World = {};
var meshes = _constants2['default'].Mesh.World;
var textures = _constants2['default'].Texture;

function makeGlowramp(mesh, texture) {
  var glowrampbase = (function (_GlowrampDrawable) {
    _inherits(glowrampbase, _GlowrampDrawable);

    function glowrampbase() {
      _classCallCheck(this, glowrampbase);

      _get(Object.getPrototypeOf(glowrampbase.prototype), 'constructor', this).call(this, mesh, texture);
    }

    return glowrampbase;
  })(_glowramp2['default']);

  return glowrampbase;
}

function makeBicolored(mesh, texture) {
  var bicoloredbase = (function (_BicoloredDrawable) {
    _inherits(bicoloredbase, _BicoloredDrawable);

    function bicoloredbase() {
      _classCallCheck(this, bicoloredbase);

      _get(Object.getPrototypeOf(bicoloredbase.prototype), 'constructor', this).call(this, mesh, texture);
    }

    return bicoloredbase;
  })(_bicolored2['default']);

  return bicoloredbase;
}

function makeShieldEffect(mesh, texture) {
  var shieldeffectbase = (function (_ShieldEffectDrawable) {
    _inherits(shieldeffectbase, _ShieldEffectDrawable);

    function shieldeffectbase() {
      _classCallCheck(this, shieldeffectbase);

      _get(Object.getPrototypeOf(shieldeffectbase.prototype), 'constructor', this).call(this, mesh, texture);
    }

    return shieldeffectbase;
  })(_shieldEffect2['default']);

  return shieldeffectbase;
}

function makeOrnament(mesh, texture) {
  var ornamentbase = (function (_OrnamentDrawable) {
    _inherits(ornamentbase, _OrnamentDrawable);

    function ornamentbase() {
      _classCallCheck(this, ornamentbase);

      _get(Object.getPrototypeOf(ornamentbase.prototype), 'constructor', this).call(this, mesh, texture);
    }

    return ornamentbase;
  })(_ornament2['default']);

  return ornamentbase;
}

World.Portal = makeGlowramp(meshes.Portal, textures.Glowramp);
World.Waypoint = makeGlowramp(meshes.Waypoint, textures.Waypoint);
World.ArtifactsRedGlow = makeGlowramp(meshes.ArtifactsRedGlow, textures.ColorGlow);
World.ArtifactsGreenGlow = makeGlowramp(meshes.ArtifactsGreenGlow, textures.ColorGlow);
World.ArtifactsPurpleGlow = makeGlowramp(meshes.ArtifactsPurpleGlow, textures.ColorGlow);
World.ArtifactsTargetGlow = makeGlowramp(meshes.ArtifactsTargetGlow, textures.TargetGlow);

World.Shield = makeShieldEffect(meshes.Shield, textures.ShieldEffect);
World.Resonator = makeBicolored(meshes.Resonator, textures.FlipCard);

World.OrnamentMeetupPoint = makeOrnament(meshes.OrnamentMeetupPoint, textures.OrnamentMeetupPoint);
World.OrnamentFinishPoint = makeOrnament(meshes.OrnamentFinishPoint, textures.OrnamentFinishPoint);
World.OrnamentCluster = makeOrnament(meshes.OrnamentCluster, textures.OrnamentCluster);
World.OrnamentVolatile = makeOrnament(meshes.OrnamentVolatile, textures.OrnamentVolatile);

exports['default'] = World;
module.exports = exports['default'];
},{"../constants":9,"./bicolored":12,"./glowramp":13,"./ornament":16,"./shield-effect":22}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _textured = require('./textured');

var _textured2 = _interopRequireDefault(_textured);

var _glMatrix = require('gl-matrix');

var PROGRAM = _constants2['default'].Program.Xm;
var defaultTeamColor = _glMatrix.vec4.clone(_constants2['default'].xmColors.coreGlow);
var defaultAltColor = _glMatrix.vec4.clone(_constants2['default'].xmColors.coreGlowAlt);

/**
 * An XmDrawable is a drawable representing the animate "xm core" of inventory items
 */

var XmDrawable = (function (_TexturedDrawable) {
  _inherits(XmDrawable, _TexturedDrawable);

  /**
   * Construct an xm core
   * @param  {String} meshName    Mesh internal name
   * @param  {String} textureName Texture internal name
   * @param  {vec4} teamColor     Color of the xm glow.
   * @return {[type]}             [description]
   */

  function XmDrawable(meshName, textureName, teamColor) {
    _classCallCheck(this, XmDrawable);

    _get(Object.getPrototypeOf(XmDrawable.prototype), 'constructor', this).call(this, PROGRAM, meshName, textureName);
    this.uniforms.u_elapsedTime = 0;
    this.uniforms.u_teamColor = _glMatrix.vec4.clone(teamColor || defaultTeamColor);
    this.uniforms.u_altColor = _glMatrix.vec4.clone(defaultAltColor);
  }

  /**
   * Animates the xm core
   * @param  {Number} delta Time since last frame
   * @return {Boolean}      Returns true to continue the animation.
   */

  _createClass(XmDrawable, [{
    key: 'updateTime',
    value: function updateTime(delta) {
      var ret = _get(Object.getPrototypeOf(XmDrawable.prototype), 'updateTime', this).call(this, delta);
      this.uniforms.u_elapsedTime = this.elapsed / 1000 % 300.0 * 0.1;
      return ret;
    }
  }]);

  return XmDrawable;
})(_textured2['default']);

exports['default'] = XmDrawable;
module.exports = exports['default'];
},{"../constants":9,"./textured":25,"gl-matrix":1}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _assetManager = require('./asset-manager');

var _assetManager2 = _interopRequireDefault(_assetManager);

var _rendererObject = require('./renderer/object');

var _rendererObject2 = _interopRequireDefault(_rendererObject);

var _utils = require('./utils');

var _drawableWorld = require('./drawable/world');

var _drawableWorld2 = _interopRequireDefault(_drawableWorld);

var _drawableResource = require('./drawable/resource');

var _drawableResource2 = _interopRequireDefault(_drawableResource);

var _drawableInventory = require('./drawable/inventory');

var _drawableInventory2 = _interopRequireDefault(_drawableInventory);

var _entityInventory = require('./entity/inventory');

var _entityInventory2 = _interopRequireDefault(_entityInventory);

var _entityPortal = require('./entity/portal');

var _entityPortal2 = _interopRequireDefault(_entityPortal);

var _camera = require('./camera');

var _camera2 = _interopRequireDefault(_camera);

var _glMatrix = require('gl-matrix');

/**
 * The Engine provides nearly all the mechanics for actually drawing things to a canvas.
 *
 * Also includes a few simple functions for demoing various entities/drawables.  This
 * will probably go away in a future release.
 */

var Engine = (function () {

  /**
   * Constructs an engine, given a canvas to render on and a list of assets to seed
   * its AssetManager with.
   * @param  {HTMLCanvas} canvas       A Canvas element
   * @param  {Object} assets           A manifest to pass to the internal AssetManager
   *                                   @see  AssetManager
   * @param  {Boolean} enableSnapshots If set to true, the canvas will preserve its drawing
   *                                   buffer, to allow for accurate .toDataURL calls.
   *                                   This will have a performance impact.
   */

  function Engine(canvas, assets, enableSnapshots) {
    _classCallCheck(this, Engine);

    this.canvas = canvas;
    var opt = {};
    if (enableSnapshots) {
      opt.preserveDrawingBuffer = true;
    }
    var gl = canvas.getContext('webgl', opt) || canvas.getContext('experimental-webgl', opt);
    if (!gl) {
      throw 'Could not initialize webgl';
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl = gl;
    this.camera = new _camera2['default'](canvas.width, canvas.height);
    this.camera.setPosition(_glMatrix.vec3.fromValues(0.0, 20.0, 25.0)).lookAt(_glMatrix.vec3.fromValues(0.0, 10.0, 0.0));

    // this should be in radians, not degrees.
    this.assetManager = new _assetManager2['default'](this.gl, assets);
    this.objectRenderer = new _rendererObject2['default'](this.gl, this.assetManager);
    this.start = this.last = null;
    this.paused = false;
    this.cleared = false;
    this.frame = null;
  }

  /**
   * Resize the canvas and viewport to new dimensions
   * @param  {Number} width  Width, in pixels
   * @param  {Number} height Heigh, in pixels
   * @return {void}
   */

  _createClass(Engine, [{
    key: 'resize',
    value: function resize(width, height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.camera.setDimensions(width, height);
      this.gl.viewport(0, 0, width, height);
    }

    /**
     * Updates the current drawing viewport to the canvas' current dimensions
     * @return {void}
     */
  }, {
    key: 'updateView',
    value: function updateView() {
      this.objectRenderer.updateView(this.camera);
    }

    /**
     * Stops the render loop, if it's running.
     * @return {void}
     */
  }, {
    key: 'stop',
    value: function stop() {
      this.paused = true;
      this.cleared = false;
      if (this.frame) {
        window.cancelAnimationFrame(this.frame);
      }
    }

    /**
     * Adds one of each inventory item, and a portal, to the scene
     * @return {void}
     */
  }, {
    key: 'demoEntities',
    value: function demoEntities() {
      var x = -5,
          y = 0,
          z = 4;
      var i, item;
      for (i in _entityInventory2['default']) {
        item = new _entityInventory2['default'][i](this);
        if (item) {
          item.translate(_glMatrix.vec3.fromValues(x, y, z));
          x++;
          if (x > 5) {
            x = -5;
            z--;
          }
          console.log('added ' + i);
        }
      }
      var portal = new _entityPortal2['default'](this);
      portal.translate(_glMatrix.vec3.fromValues(x, y, z));
    }

    /**
     * Adds one of each drawable to the scene
     * @return {void}
     */
  }, {
    key: 'demo',
    value: function demo() {
      var x = -5,
          y = 0,
          z = 4;
      var i, item;
      for (i in _drawableInventory2['default']) {
        item = new _drawableInventory2['default'][i]();
        if (item) {
          _glMatrix.mat4.translate(item.world, item.world, _glMatrix.vec3.fromValues(x, y, z));
          x++;
          if (x > 5) {
            x = -5;
            z--;
          }
          this.objectRenderer.addDrawable(item);
          console.log('added ' + i);
        }
      }

      for (i in _drawableResource2['default']) {
        item = new _drawableResource2['default'][i]();
        if (item) {
          _glMatrix.mat4.translate(item.world, item.world, _glMatrix.vec3.fromValues(x, y, z));
          x++;
          if (x > 5) {
            x = -5;
            z--;
          }
          this.objectRenderer.addDrawable(item);
          console.log('added ' + i);
        }
      }

      for (i in _drawableWorld2['default']) {
        item = new _drawableWorld2['default'][i]();
        if (item) {
          _glMatrix.mat4.translate(item.world, item.world, _glMatrix.vec3.fromValues(x, y, z));
          x++;
          if (x > 5) {
            x = -5;
            z--;
          }
          this.objectRenderer.addDrawable(item);
          console.log('added ' + i);
        }
      }
    }

    /**
     * Draw a single frame, with a specified time since last draw
     * @param  {Number} delta Time since last render
     * @return {void}
     */
  }, {
    key: 'draw',
    value: function draw(delta) {
      var gl = this.gl;
      // default setup stuff:
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      (0, _utils.resetGL)(gl);
      //gl.enable(gl.BLEND);
      //gl.depthMask(false);

      // render passes:
      this.objectRenderer.render();

      // run animations
      this.objectRenderer.updateTime(delta);
    }

    /**
     * Start the render loop.
     * @param  {Number} tick Time since last tick (optional)
     * @return {void}
     */
  }, {
    key: 'render',
    value: function render(tick) {
      if (this.paused) {
        this.cleared = true;
        this.paused = false;
        return;
      }
      var delta = 0;
      if (!this.start) {
        this.start = tick;
        this.last = tick;
      } else {
        delta = tick - this.last;
        this.last = tick;
      }
      this.draw(delta);
      // queue up next frame:
      this.frame = window.requestAnimationFrame(this.render.bind(this));
    }

    /**
     * Preloads all assets
     * @param  {Function} callback Callback to invoke on completion
     * @return {void}
     */
  }, {
    key: 'preload',
    value: function preload(callback) {
      this.assetManager.loadAll(callback);
    }
  }]);

  return Engine;
})();

exports['default'] = Engine;
module.exports = exports['default'];
},{"./asset-manager":7,"./camera":8,"./drawable/inventory":14,"./drawable/resource":21,"./drawable/world":26,"./entity/inventory":30,"./entity/portal":31,"./renderer/object":49,"./utils":51,"gl-matrix":1}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _glMatrix = require('gl-matrix');

// TODO: Deprecate

var Entity = (function () {
  function Entity(engine) {
    _classCallCheck(this, Entity);

    this.drawables = {};
    this.transform = _glMatrix.mat4.create();
    this.engine = engine;
  }

  _createClass(Entity, [{
    key: 'addDrawable',
    value: function addDrawable(name, drawable) {
      // add dispose if this already exists.
      this.removeDrawable(name);
      this.drawables[name] = drawable;
      this.engine.objectRenderer.addDrawable(drawable);
    }
  }, {
    key: 'removeDrawable',
    value: function removeDrawable(name, destroy) {
      // dispose stuffs.
      if (this.drawables[name]) {
        this.engine.objectRenderer.removeDrawable(this.drawables[name], destroy);
      }
    }
  }, {
    key: 'applyTransform',
    value: function applyTransform() {
      for (var i in this.drawables) {
        this.drawables[i].setMatrix(this.transform);
      }
    }
  }, {
    key: 'translate',
    value: function translate(vec) {
      _glMatrix.mat4.translate(this.transform, this.transform, vec);
      this.applyTransform();
    }
  }, {
    key: 'rotate',
    value: function rotate(quat) {
      var rotate = _glMatrix.mat4.create();
      _glMatrix.mat4.fromQuat(rotate, quat);
      _glMatrix.mat4.multiply(this.transform, this.transform, rotate);
      this.applyTransform();
    }
  }, {
    key: 'setAnimation',
    value: function setAnimation(animate) {
      for (var i in this.drawables) {
        this.drawables[i].onUpdate = animate;
      }
    }
  }]);

  return Entity;
})();

exports['default'] = Entity;
module.exports = exports['default'];
},{"gl-matrix":1}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.createItemEntity = createItemEntity;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _entity = require('../entity');

var _entity2 = _interopRequireDefault(_entity);

var _drawableInventory = require('../drawable/inventory');

var _drawableInventory2 = _interopRequireDefault(_drawableInventory);

var _glMatrix = require('gl-matrix');

// TODO: Deprecate in favor of a proper scene graph
var InventoryItems = {};

var simple = {
  Xmp: 'L8',
  Ultrastrike: 'L8',
  ResShield: 'VERY_RARE',
  PowerCube: 'L8',
  LinkAmp: 'EXTREMELY_RARE',
  HeatSink: 'VERY_RARE',
  MultiHack: 'VERY_RARE',
  ForceAmp: 'RARE',
  Turret: 'RARE',
  Resonator: 'L8',
  Capsule: 'RARE'
};

function createItemEntity(name, color) {
  var entitybase = (function (_Entity) {
    _inherits(entitybase, _Entity);

    function entitybase(engine) {
      _classCallCheck(this, entitybase);

      _get(Object.getPrototypeOf(entitybase.prototype), 'constructor', this).call(this, engine);
      this.addDrawable(name, new _drawableInventory2['default'][name]());
      this.addDrawable(name + 'Xm', new _drawableInventory2['default'][name + 'Xm']());
      this.drawables[name].uniforms.u_color0 = _glMatrix.vec4.clone(color);
    }

    return entitybase;
  })(_entity2['default']);

  return entitybase;
}

for (var i in simple) {
  InventoryItems[i] = createItemEntity(i, _constants2['default'].qualityColors[simple[i]]);
}

var FlipCardAda = (function (_Entity2) {
  _inherits(FlipCardAda, _Entity2);

  function FlipCardAda(engine) {
    _classCallCheck(this, FlipCardAda);

    _get(Object.getPrototypeOf(FlipCardAda.prototype), 'constructor', this).call(this, engine);
    this.addDrawable('FlipCardAda', new _drawableInventory2['default'].FlipCardAda());
    this.addDrawable('FlipCardXm', new _drawableInventory2['default'].FlipCardXm());
    this.drawables.FlipCardXm.uniforms.u_teamColor = _glMatrix.vec4.clone(_constants2['default'].teamColors.RESISTANCE);
    this.drawables.FlipCardAda.uniforms.u_color1 = _glMatrix.vec4.clone(_constants2['default'].teamColors.RESISTANCE);
    this.drawables.FlipCardAda.uniforms.u_color0 = _glMatrix.vec4.clone(_constants2['default'].qualityColors.VERY_RARE);
  }

  return FlipCardAda;
})(_entity2['default']);

InventoryItems.FlipCardAda = FlipCardAda;

var FlipCardJarvis = (function (_Entity3) {
  _inherits(FlipCardJarvis, _Entity3);

  function FlipCardJarvis(engine) {
    _classCallCheck(this, FlipCardJarvis);

    _get(Object.getPrototypeOf(FlipCardJarvis.prototype), 'constructor', this).call(this, engine);
    this.addDrawable('FlipCardJarvis', new _drawableInventory2['default'].FlipCardJarvis());
    this.addDrawable('FlipCardXm', new _drawableInventory2['default'].FlipCardXm());
    this.drawables.FlipCardXm.uniforms.u_teamColor = _glMatrix.vec4.clone(_constants2['default'].teamColors.ENLIGHTENED);
    this.drawables.FlipCardJarvis.uniforms.u_color1 = _glMatrix.vec4.clone(_constants2['default'].teamColors.ENLIGHTENED);
    this.drawables.FlipCardJarvis.uniforms.u_color0 = _glMatrix.vec4.clone(_constants2['default'].qualityColors.VERY_RARE);
  }

  return FlipCardJarvis;
})(_entity2['default']);

InventoryItems.FlipCardJarvis = FlipCardJarvis;

var ExtraShield = (function (_Entity4) {
  _inherits(ExtraShield, _Entity4);

  function ExtraShield(engine) {
    _classCallCheck(this, ExtraShield);

    _get(Object.getPrototypeOf(ExtraShield.prototype), 'constructor', this).call(this, engine);
    this.addDrawable('ExtraShield', new _drawableInventory2['default'].ExtraShield());
    this.addDrawable('ResShieldXm', new _drawableInventory2['default'].ResShieldXm());
    this.drawables.ExtraShield.uniforms.u_color0 = _glMatrix.vec4.clone(_constants2['default'].qualityColors.VERY_RARE);
  }

  return ExtraShield;
})(_entity2['default']);

InventoryItems.ExtraShield = ExtraShield;

var InterestCapsule = (function (_Entity5) {
  _inherits(InterestCapsule, _Entity5);

  function InterestCapsule(engine) {
    _classCallCheck(this, InterestCapsule);

    _get(Object.getPrototypeOf(InterestCapsule.prototype), 'constructor', this).call(this, engine);
    this.addDrawable('InterestCapsule', new _drawableInventory2['default'].InterestCapsule());
    this.addDrawable('CapsuleXm', new _drawableInventory2['default'].CapsuleXm());
    this.drawables.InterestCapsule.uniforms.u_color0 = _glMatrix.vec4.clone(_constants2['default'].qualityColors.VERY_RARE);
  }

  return InterestCapsule;
})(_entity2['default']);

InventoryItems.InterestCapsule = InterestCapsule;

exports['default'] = InventoryItems;
},{"../constants":9,"../drawable/inventory":14,"../entity":29,"gl-matrix":1}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _entity = require('../entity');

var _entity2 = _interopRequireDefault(_entity);

var _drawableWorld = require('../drawable/world');

var _drawableWorld2 = _interopRequireDefault(_drawableWorld);

var _drawableResonatorLink = require('../drawable/resonator-link');

var _drawableResonatorLink2 = _interopRequireDefault(_drawableResonatorLink);

var _glMatrix = require('gl-matrix');

// TODO: Deprecate in favor of a proper scene graph

var PortalEntity = (function (_Entity) {
  _inherits(PortalEntity, _Entity);

  function PortalEntity(engine) {
    _classCallCheck(this, PortalEntity);

    _get(Object.getPrototypeOf(PortalEntity.prototype), 'constructor', this).call(this, engine);
    this.addDrawable('Portal', new _drawableWorld2['default'].Portal());
    // why 6? I dunno, ask Niantic
    _glMatrix.mat4.scale(this.drawables.Portal.local, this.drawables.Portal.local, _glMatrix.vec3.fromValues(6, 6, 6));
    this.setColor(_glMatrix.vec4.clone(_constants2['default'].teamColors.LOKI));
  }

  _createClass(PortalEntity, [{
    key: 'setColor',
    value: function setColor(color) {
      this.color = _glMatrix.vec4.clone(color);
      this.drawables.Portal.uniforms.u_baseColor = this.color;
      if (this.drawables.Shield) {
        this.drawables.Shield.uniforms.u_color = this.color;
      }
      if (this.drawables.ArtifactsGreenGlow) {
        this.drawables.ArtifactsGreenGlow.u_baseColor = this.color;
      }
      /*for(var i = 0; i < 8; i++) {
        this._redrawLink(i);sd
      }*/
    }
  }, {
    key: 'addResonator',
    value: function addResonator(level, slot, range, percent) {
      if (percent === undefined) {
        percent = 1.0;
      }
      if (+slot < 0 || +slot > 8) {
        throw new Error('slot out of bounds for resonator');
      }
      if (!(level in _constants2['default'].qualityColors)) {
        throw new Error('level must be one of ' + Object.keys(_constants2['default'].qualityColors).join(' '));
      }
      range = range === undefined ? 40 : range;
      var resonatorName = 'Resonator' + +slot;
      var linkName = 'Link' + +slot;
      var theta = slot / 8 * 2 * Math.PI;
      var resonator = new _drawableWorld2['default'].Resonator();
      var x = range * Math.cos(theta);
      var y = range * Math.sin(theta);
      var link = new _drawableResonatorLink2['default']([0, 0], slot, range, _glMatrix.vec4.clone(this.color), 1.0);
      resonator.uniforms.u_color0 = _glMatrix.vec4.clone(_constants2['default'].qualityColors[level]);
      resonator.local = _glMatrix.mat4.clone(this.drawables.Portal.local);
      //link.local = mat4.clone(this.drawables.Portal.local);
      _glMatrix.mat4.translate(resonator.local, resonator.local, _glMatrix.vec3.fromValues(x / 6, 0, y / 6));
      resonator.updateMatrix();
      link.updateMatrix();
      // keep the portal sorted last (this is a terrible way of doing this.)
      this.addDrawable(linkName, link);
      this.addDrawable(resonatorName, resonator);
      this.addDrawable('Portal', this.drawables.Portal);
    }
  }, {
    key: 'removeResonator',
    value: function removeResonator(slot) {
      if (+slot < 0 || +slot > 8) {
        throw new Error('slot out of bounds for resonator');
      }
      var name = 'Resonator' + +slot;
      var resonator = this.drawables[name] || null;
      if (resonator) {
        this.removeDrawable(name);
        this._removeResonatorLink(slot);
        this.addDrawable('Portal', this.drawables.Portal);
      }
    }
  }, {
    key: 'addShield',
    value: function addShield() {
      if (!('Shield' in this.drawables)) {
        this.addDrawable('Shield', new _drawableWorld2['default'].Shield());
        // why 12? I don't know.
        _glMatrix.mat4.scale(this.drawables.Shield.local, this.drawables.Shield.local, _glMatrix.vec3.fromValues(12, 12, 12));
        this.drawables.Shield.updateMatrix();
      }
      this.drawables.Shield.uniforms.u_color = this.color;
      this.applyTransform();
    }
  }, {
    key: 'addArtifact',
    value: function addArtifact(artifact, name) {
      var rotate = function rotate(delta /*, elapsed*/) {
        _glMatrix.mat4.rotateY(this.model, this.model, delta / 1000);
        this.updateMatrix();
        return true;
      };
      if (!(name in this.drawables)) {
        this.addDrawable(name, artifact);
      }
      this.drawables[name].onUpdate = rotate;
      this.applyTransform();
    }
  }, {
    key: 'addGlowMarker',
    value: function addGlowMarker(name, color) {
      var n = 'Artifacts' + name + 'Glow';
      if (!(n in this.drawables)) {
        this.addDrawable(n, new _drawableWorld2['default'][n]());
      }
      this.drawables[n].uniforms.u_baseColor = _glMatrix.vec4.clone(color);
    }
  }]);

  return PortalEntity;
})(_entity2['default']);

exports['default'] = PortalEntity;
module.exports = exports['default'];
},{"../constants":9,"../drawable/resonator-link":20,"../drawable/world":26,"../entity":29,"gl-matrix":1}],32:[function(require,module,exports){
/**
 * Base class for all things bound to a gl context.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLBound =

/**
 * Binds to a gl context
 * @param  {context} gl  A webgl context
 */
function GLBound(gl) {
  _classCallCheck(this, GLBound);

  this._gl = gl;
};

exports["default"] = GLBound;
module.exports = exports["default"];
},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBuffer = require('./gl-buffer');

var _glBuffer2 = _interopRequireDefault(_glBuffer);

/**
 * A GLAttribute is a GLBuffer that represents vertex attributes
 *
 * @extends {GLBuffer}
 */

var GLAttribute = (function (_GLBuffer) {
  _inherits(GLAttribute, _GLBuffer);

  /**
   * Construct a vertex attribute buffer
   *
   * @chainable
   * @param  {context} gl             WebGLContext
   * @param  {Array} attributes       An array of VertexAttributes
   * @param  {ArrayBuffer} values     Values to fill the buffer with
   * @param  {enum} usage             Usage @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.5
   * @return {this}
   */

  function GLAttribute(gl, attributes, values, usage) {
    _classCallCheck(this, GLAttribute);

    usage = usage || gl.STATIC_DRAW;
    _get(Object.getPrototypeOf(GLAttribute.prototype), 'constructor', this).call(this, gl, gl.ARRAY_BUFFER, usage);
    this.attributes = attributes;
    this.values = values;
    this.size = this.count = null;
    this._validate = false;
    this.size = 0;
    this.width = 0;
    for (var i = 0, a; i < this.attributes.length; i++) {
      a = this.attributes[i];
      this.size += 4 * a.size; // 4 because float is 4 bytes.
      this.width += a.size;
    }
    return this;
  }

  /**
   * Confirms that the underlying buffer's length is an even multiple
   * of total size of the attributes for the buffer
   *
   * Issues a warning if not.
   */

  _createClass(GLAttribute, [{
    key: 'validate',
    value: function validate() {
      if (this._validate) {
        if (this.values.length % this.width !== 0) {
          console.warn('values array length is not an even multiple of the total size of the attributes');
        }
      }
    }

    /**
     * Update the values in the buffer and pushes the buffer to the gpu
     *
     * @chainable
     * @param  {ArrayBuffer} values New values to write to the buffer
     * @return {this}
     */
  }, {
    key: 'updateValues',
    value: function updateValues(values) {
      this.values = values;
      this.validate();
      return this.update();
    }

    /**
     * Given a set of program locations, set up the attribute pointers
     *
     * @chainable
     * @param  {Object} locations Map of attribute names to program locations
     * @return {this}
     */
  }, {
    key: 'draw',
    value: function draw(locations) {
      var gl = this._gl;
      var a,
          s = 0;
      if (!this.glBuf) {
        this.update();
      } else {
        this.bindBuffer();
      }
      for (var i = 0; i < this.attributes.length; i++) {
        a = this.attributes[i];
        if (!(a.name in locations)) {
          // I don't know if I should suppress this, but if I
          // don't, it generates one warning per frame.
          //console.warn('Program is missing attribute ' + a.name);
          continue;
        }
        gl.enableVertexAttribArray(locations[a.name]);
        gl.vertexAttribPointer(locations[a.name], a.size, gl.FLOAT, false, this.size, s);
        s += 4 * a.size;
      }
      return this; //.unbindBuffer();  // maybe?
    }

    /**
     * Perform some operation on each set of values for some attribute
     *
     * @chainable
     * @param  {Number}   attributeIndex Index of the attribute to select
     * @param  {Function} callback       Callback
     * @return {this}
     */
  }, {
    key: 'eachAttribute',
    value: function eachAttribute(attributeIndex, callback) {
      var offset = 0,
          size,
          i;
      if (attributeIndex >= 0 && attributeIndex < this.attributes.length) {
        for (i = 0; i < attributeIndex; i++) {
          offset += this.attributes[i].size;
        }
        size = this.attributes[attributeIndex].size;
        for (i = offset; i < this.values.length; i += this.width) {
          callback(this.values.subarray(i, i + size));
        }
      }
      return this;
    }
  }]);

  return GLAttribute;
})(_glBuffer2['default']);

exports['default'] = GLAttribute;
module.exports = exports['default'];
},{"./gl-buffer":34}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBound = require('../gl-bound');

var _glBound2 = _interopRequireDefault(_glBound);

/**
 * A GLBuffer is a buffer of some sort that will be passed to the gpu
 *
 * @extends {GLBound}
 */

var GLBuffer = (function (_GLBound) {
  _inherits(GLBuffer, _GLBound);

  /**
   * Construct a gl-bound buffer
   *
   * @chainable
   * @param  {context} gl    WebGL context
   * @param  {enum} target   gl target  @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.5
   * @param  {enum} usage    gl usage @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.5
   * @return {this}          the GLBuffer
   */

  function GLBuffer(gl, target, usage) {
    _classCallCheck(this, GLBuffer);

    _get(Object.getPrototypeOf(GLBuffer.prototype), 'constructor', this).call(this, gl);
    this.target = target || gl.ARRAY_BUFFER; // probably shouldn't default this.
    this.usage = usage || gl.STATIC_DRAW;
    this.glBuf = null;
    this.values = null;
    return this;
  }

  /**
   * Binds the buffer to the gpu
   *
   * @chainable
   * @return {this}
   */

  _createClass(GLBuffer, [{
    key: 'bindBuffer',
    value: function bindBuffer() {
      if (!this.values) {
        console.warn('trying to update a buffer with no values.');
        return false;
      }
      if (!this.glBuf) {
        this.glBuf = this._gl.createBuffer();
      }
      this._gl.bindBuffer(this.target, this.glBuf);
      return this;
    }

    /**
     * Unbinds the buffer (NPI)
     *
     * @chainable
     * @return {this}
     */
  }, {
    key: 'unbindBuffer',
    value: function unbindBuffer() {
      // this._gl.bindBuffer(this.target, 0);  // apparently this makes webgl cranky
      return this;
    }

    /**
     * Update the buffer data on the gpu
     *
     * @chainable
     * @return {this}
     */
  }, {
    key: 'update',
    value: function update() {
      this.bindBuffer();
      // if I do it this way, does it break?
      // if it works, will updating the underlying buffer
      // update the buffer without needing to call gl.bufferData again??
      this._gl.bufferData(this.target, this.values, this.usage);
      return this; // .unbindBuffer(); // apparently this makes webgl angry.
    }

    /**
     * Sets the buffer contents
     *
     * @chainable
     * @param {ArrayBuffer} values Values to store in the buffer
     * @param {Number} offset      Offset to write the values
     * @return {this}
     */
  }, {
    key: 'setValues',
    value: function setValues(values, offset) {
      if (!this.values) {
        this.values = values;
      } else {
        this.values.set(values, offset);
      }
      this.update();
      return this;
    }

    /**
     * Deletes a chunk of a buffer
     *
     * @chainable
     * @param  {Number} start Start of deletion
     * @param  {Number} end   End of deletion
     * @return {this}
     */
  }, {
    key: 'deleteWithin',
    value: function deleteWithin(start, end) {
      if (!this.values) {
        console.warn('Trying to splice a buffer that has no values.');
        return false;
      }
      var nValues = end - start;
      var empty = new this.values.constructor(nValues);
      this.values.set(this.values.subarray(end), start);
      this.values.set(empty, this.values.length - nValues);
      this.update();
      return this;
    }

    /**
     * Do something with each elemnt of the buffer
     *
     * @chainable
     * @param  {Function} callback The callback (values returned will overwrite
     *                             the contents of the buffer at that offset)
     * @param  {Number}   start    Offset to start
     * @param  {Number}   end      Offset to end
     * @return {this}
     */
  }, {
    key: 'map',
    value: function map(callback, start, end) {
      start = start === undefined ? 0 : start;
      end = end === undefined ? this.values.length : end;
      for (var i = start; i < end; i++) {
        this.values[i] = callback(this.values[i], i);
      }
      return this;
    }

    /**
     * Update a buffer's values, and also update the buffer on the gpu
     *
     * @chainable
     * @param  {ArrayBuffer} values New values to fill the buffer with
     * @return {this}
     */
  }, {
    key: 'updateBuffer',
    value: function updateBuffer(values) {
      this.values = values;
      return this.update();
    }
  }]);

  return GLBuffer;
})(_glBound2['default']);

exports['default'] = GLBuffer;
module.exports = exports['default'];
},{"../gl-bound":32}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBuffer = require('./gl-buffer');

var _glBuffer2 = _interopRequireDefault(_glBuffer);

/**
 * A GLIndex is a GLBuffer representing an index buffer of some kind
 *
 * @extends {GLBuffer}
 */

var GLIndex = (function (_GLBuffer) {
  _inherits(GLIndex, _GLBuffer);

  /**
   * Construct an index buffer
   *
   * @chainable
   * @param  {context} gl           WebGL context
   * @param  {ArrayBuffer} values   Values to initialize the buffer with
   * @param  {enum} drawMode        Draw mode @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.11
   * @param  {enum} usage           Usage @see https://www.khronos.org/registry/webgl/specs/1.0/#5.14.5
   * @return {this}
   */

  function GLIndex(gl, values, drawMode, usage) {
    _classCallCheck(this, GLIndex);

    usage = usage || gl.STATIC_DRAW;
    _get(Object.getPrototypeOf(GLIndex.prototype), 'constructor', this).call(this, gl, gl.ELEMENT_ARRAY_BUFFER, usage);
    this.mode = drawMode;
    this.values = values;
    this.count = null;
    return this;
  }

  /**
   * Perform a draw call using this index buffer.
   *
   * @chainable
   * @return {this}
   */

  _createClass(GLIndex, [{
    key: 'draw',
    value: function draw() {
      var gl = this._gl;
      if (!this.glBuf) {
        this.update();
      } else {
        this.bindBuffer();
      }
      gl.drawElements(this.mode, this.values.length, gl.UNSIGNED_SHORT, 0);
      return this;
    }
  }]);

  return GLIndex;
})(_glBuffer2['default']);

exports['default'] = GLIndex;
module.exports = exports['default'];
},{"./gl-buffer":34}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _engine = require('./engine');

var _engine2 = _interopRequireDefault(_engine);

var _assetLoader = require('./asset-loader');

var _drawable = require('./drawable');

var _drawable2 = _interopRequireDefault(_drawable);

var _drawableInventory = require('./drawable/inventory');

var _drawableInventory2 = _interopRequireDefault(_drawableInventory);

var _drawableWorld = require('./drawable/world');

var _drawableWorld2 = _interopRequireDefault(_drawableWorld);

var _drawablePortalLink = require('./drawable/portal-link');

var _drawablePortalLink2 = _interopRequireDefault(_drawablePortalLink);

var _drawableResonatorLink = require('./drawable/resonator-link');

var _drawableResonatorLink2 = _interopRequireDefault(_drawableResonatorLink);

var _drawableSphericalPortalLink = require('./drawable/spherical-portal-link');

var _drawableSphericalPortalLink2 = _interopRequireDefault(_drawableSphericalPortalLink);

var _drawableAtmosphere = require('./drawable/atmosphere');

var _drawableAtmosphere2 = _interopRequireDefault(_drawableAtmosphere);

var _drawableTexturedSphere = require('./drawable/textured-sphere');

var _drawableTexturedSphere2 = _interopRequireDefault(_drawableTexturedSphere);

var _drawableParticlePortal = require('./drawable/particle-portal');

var _drawableParticlePortal2 = _interopRequireDefault(_drawableParticlePortal);

var _entityInventory = require('./entity/inventory');

var _entityInventory2 = _interopRequireDefault(_entityInventory);

var _entityPortal = require('./entity/portal');

var _entityPortal2 = _interopRequireDefault(_entityPortal);

var _orbitControls = require('./orbit-controls');

var _orbitControls2 = _interopRequireDefault(_orbitControls);

var _utils = require('./utils');

var _animationEasing = require('./animation/easing');

var _animationEasing2 = _interopRequireDefault(_animationEasing);

var _animationAnimation = require('./animation/animation');

var _animationAnimation2 = _interopRequireDefault(_animationAnimation);

exports['default'] = {
  Constants: _constants2['default'],
  Engine: _engine2['default'],
  Utilities: {
    loadResource: _assetLoader.loadResource,
    resetGL: _utils.resetGL,
    setParams: _utils.setParams,
    disco: _utils.disco,
    generateArtifacts: _utils.generateArtifacts,
    Ease: _animationEasing2['default'],
    Animation: _animationAnimation2['default']
  },
  Drawables: {
    Inventory: _drawableInventory2['default'],
    World: _drawableWorld2['default'],
    ResonatorLink: _drawableResonatorLink2['default'],
    PortalLink: _drawablePortalLink2['default'],
    SphericalPortalLink: _drawableSphericalPortalLink2['default'],
    Atmosphere: _drawableAtmosphere2['default'],
    TexturedSphere: _drawableTexturedSphere2['default'],
    ParticlePortal: _drawableParticlePortal2['default'],
    Drawable: _drawable2['default']
  },
  Entities: {
    World: {
      Portal: _entityPortal2['default']
    },
    Inventory: _entityInventory2['default']
  },
  Controls: {
    Orbit: _orbitControls2['default']
  },
  VERSION: '0.21.0'
};
module.exports = exports['default'];
},{"./animation/animation":4,"./animation/easing":5,"./asset-loader":6,"./constants":9,"./drawable":10,"./drawable/atmosphere":11,"./drawable/inventory":14,"./drawable/particle-portal":17,"./drawable/portal-link":19,"./drawable/resonator-link":20,"./drawable/spherical-portal-link":23,"./drawable/textured-sphere":24,"./drawable/world":26,"./engine":28,"./entity/inventory":30,"./entity/portal":31,"./orbit-controls":44,"./utils":51}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBound = require('./gl-bound');

var _glBound2 = _interopRequireDefault(_glBound);

var MODE_TRIANGLES = 'triangles';
var MODE_LINES = 'lines';

/**
 * Base class for all meshes
 *
 * @extends {GLBound}
 */

var Mesh = (function (_GLBound) {
  _inherits(Mesh, _GLBound);

  /**
   * Initializes a mesh
   * @param  {context} gl              A webgl context
   * @param  {Float32Array} attributes A typed array of vertex attributes
   * @param  {Uint16Array} faces       A typed array of face indices
   * @param  {Uint16Array} lines       A typed array of line indices
   */

  function Mesh(gl, attributes, faces, lines) {
    _classCallCheck(this, Mesh);

    _get(Object.getPrototypeOf(Mesh.prototype), 'constructor', this).call(this, gl);
    this.attributes = attributes;
    this.faces = faces;
    this.lines = lines;
    this.mode = MODE_TRIANGLES;
    this.bounds = null;
    this.center = null;
  }

  /**
   * Given a set of locations from the currently-active shader, draw this mesh
   * @param  {Object} locations A hash of locations by name
   */

  _createClass(Mesh, [{
    key: 'draw',
    value: function draw(locations) {
      this.attributes.draw(locations);
      if (this.mode === MODE_TRIANGLES) {
        this.faces.draw();
      } else if (this.mode === MODE_LINES) {
        this.lines.draw();
      }
    }

    /**
     * Calculate the bounding box of the mesh
     * @param  {Number} coordAttribute Index of the attribute representing vertex position
     * @return {Object}                An object consisting of two arrays of the same length
     *                                 as the coordinate attribute, representing min and max
     *                                 coordinates.
     */
  }, {
    key: 'boundingBox',
    value: function boundingBox(coordAttribute) {
      if (!this.bounds) {
        coordAttribute = coordAttribute === undefined ? 0 : coordAttribute;
        var bounds = {
          max: null,
          min: null
        };
        this.attributes.eachAttribute(coordAttribute, function (arr) {
          if (Array.prototype.reduce.call(arr, function (s, a) {
            return s + a;
          }, 0) === 0) {
            return;
          }
          if (bounds.max) {
            bounds.max = bounds.max.map(function (e, i) {
              return Math.max(e, arr[i]);
            });
          } else {
            bounds.max = Array.prototype.slice.call(arr);
          }
          if (bounds.min) {
            bounds.min = bounds.min.map(function (e, i) {
              return Math.min(e, arr[i]);
            });
          } else {
            bounds.min = Array.prototype.slice.call(arr);
          }
        });
        this.bounds = bounds;
      }
      return this.bounds;
    }

    // TODO: fixme
  }, {
    key: 'centerOfMass',
    value: function centerOfMass(coordAttribute) {
      if (!this.center) {
        coordAttribute = coordAttribute === undefined ? 0 : coordAttribute;
        var sum = null,
            count = 0;
        this.attributes.eachAttribute(coordAttribute, function (arr) {
          if (Array.prototype.reduce.call(arr, function (s, a) {
            return s + a;
          }, 0) === 0) {
            return;
          }
          count++;
          if (sum) {
            sum = sum.map(function (e, i) {
              return e + arr[i];
            });
          } else {
            sum = Array.prototype.slice.call(arr);
          }
        });
        sum.map(function (e) {
          return e / count;
        });
        this.center = sum;
      }
      return this.center;
    }

    /**
     * Calculate the center of the bounding box.
     * @param  {Number} coordAttribute Index of the attribute represention vertex position.
     * @return {mixed}                 A vector of the same size as the position attribute,
     *                                 representing the center of the bounding box.
     */
  }, {
    key: 'boundingBoxCenter',
    value: function boundingBoxCenter(coordAttribute) {
      if (!this.bounds) {
        this.boundingBox(coordAttribute);
      }
      return this.bounds.max.map((function (e, i) {
        return (e - this.bounds.min[i]) / 2;
      }).bind(this));
    }
  }]);

  return Mesh;
})(_glBound2['default']);

Mesh.MODE_LINES = MODE_LINES;
Mesh.MODE_TRIANGLES = MODE_TRIANGLES;

exports['default'] = Mesh;
module.exports = exports['default'];
},{"./gl-bound":32}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mesh = require('../mesh');

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = require('../vertex-attribute');

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glGlIndex = require('../gl/gl-index');

var _glGlIndex2 = _interopRequireDefault(_glGlIndex);

var _glGlAttribute = require('../gl/gl-attribute');

var _glGlAttribute2 = _interopRequireDefault(_glGlAttribute);

var _javaDeserializer = require('java-deserializer');

var _javaDeserializer2 = _interopRequireDefault(_javaDeserializer);

function parseAttributes(buf) {
  var v = new DataView(buf.buffer, buf.byteOffset, buf.byteLength),
      c = 0;
  var n = v.getUint32(c),
      type,
      size,
      len,
      j,
      name;
  c += 4;
  var attributes = [];
  for (var i = 0; i < n; i++) {
    type = v.getUint32(c);
    if (type != 0x01 && type != 0x10) {
      console.warn('unknown type ' + type);
    }
    c += 4;
    size = v.getUint32(c);
    c += 4;
    len = v.getUint16(c);
    c += 2;
    name = '';
    for (j = 0; j < len; j++) {
      name += String.fromCharCode(v.getUint8(c + j));
    }
    c += len;
    attributes.push(new _vertexAttribute2['default'](name, size));
  }
  return attributes;
}

/**
 * A FileMesh is a Mesh that is loaded from a serialzied Java object,
 * as found in the apk.
 *
 * @extends {Mesh}
 */

var FileMesh = (function (_Mesh) {
  _inherits(FileMesh, _Mesh);

  /**
   * Construct the Mesh from the given file
   * @param  {context} gl           WebGL context
   * @param  {ArrayBuffer} arraybuf ArrayBuffer representing the entire .obj file
   */

  function FileMesh(gl, arraybuf) {
    _classCallCheck(this, FileMesh);

    var jd = new _javaDeserializer2['default'](arraybuf);
    var blocks = jd.getContents();

    // should be Float32Array
    var values = blocks[0].elements;

    // should be ArrayBuffer
    var attributeData = blocks[3];

    // array of VertexAttributes
    var spec = parseAttributes(attributeData);

    // should be Uint16Array
    var faces = new _glGlIndex2['default'](gl, blocks[1].elements, gl.TRIANGLES);
    var attributes = new _glGlAttribute2['default'](gl, spec, values);

    // should be Uint16Array
    var lines = new _glGlIndex2['default'](gl, blocks[2].elements, gl.LINES);

    _get(Object.getPrototypeOf(FileMesh.prototype), 'constructor', this).call(this, gl, attributes, faces, lines);
  }

  return FileMesh;
})(_mesh2['default']);

exports['default'] = FileMesh;
module.exports = exports['default'];
},{"../gl/gl-attribute":33,"../gl/gl-index":35,"../mesh":37,"../vertex-attribute":52,"java-deserializer":2}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mesh = require('../mesh');

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = require('../vertex-attribute');

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glGlIndex = require('../gl/gl-index');

var _glGlIndex2 = _interopRequireDefault(_glGlIndex);

var _glGlAttribute = require('../gl/gl-attribute');

var _glGlAttribute2 = _interopRequireDefault(_glGlAttribute);

// const MAX_SYSTEMS = 40;
var NUM_PARTICLES_PER_SYSTEM = 96;
var NUM_VERTICES_PER_PARTICLE = 4;
var NUM_INDICES_PER_FACE = 6;
var TOTAL_VERTEX_SIZE = 3 + 2 + 1 + 1 + 1 + 1;
var U = [0.0, 0.0, 1.0, 1.0];
var V = [1.0, 0.0, 1.0, 0.0];

var seeds = [];
for (var i = 0; i < NUM_PARTICLES_PER_SYSTEM; i++) {
  seeds.push({
    x: Math.random() - 0.5,
    y: 0.4 * Math.random() - 0.2,
    z: Math.random() - 0.5,
    a_scale: 10.0 * (0.1 + 0.9 * Math.random()),
    a_speed: 6.0 * (0.5 + 0.5 * Math.random())
  });
}

/**
 * A ParticlePortalMesh is a Mesh that represents a single system or portal particles.
 *
 * @extends {Mesh}
 */

var ParticlePortalMesh = (function (_Mesh) {
  _inherits(ParticlePortalMesh, _Mesh);

  /**
   * Construct a system of portal particles
   * @param  {context} gl     WebGL context
   */

  function ParticlePortalMesh(gl) {
    _classCallCheck(this, ParticlePortalMesh);

    var attributes = [];
    attributes.push(new _vertexAttribute2['default']('a_position', 3));
    attributes.push(new _vertexAttribute2['default']('a_texCoord0', 2));
    attributes.push(new _vertexAttribute2['default']('a_scale', 1));
    attributes.push(new _vertexAttribute2['default']('a_speed', 1));
    attributes.push(new _vertexAttribute2['default']('a_portalIndex', 1));
    attributes.push(new _vertexAttribute2['default']('a_index', 1));
    var values = new Float32Array(NUM_PARTICLES_PER_SYSTEM * NUM_VERTICES_PER_PARTICLE * TOTAL_VERTEX_SIZE);
    var seed,
        i,
        j,
        idx = 0;
    for (i = 0; i < NUM_PARTICLES_PER_SYSTEM; i++) {
      seed = seeds[i];
      for (j = 0; j < NUM_VERTICES_PER_PARTICLE; j++) {
        values[idx * TOTAL_VERTEX_SIZE + 0] = seed.x;
        values[idx * TOTAL_VERTEX_SIZE + 1] = seed.y;
        values[idx * TOTAL_VERTEX_SIZE + 2] = seed.z;
        values[idx * TOTAL_VERTEX_SIZE + 3] = U[j];
        values[idx * TOTAL_VERTEX_SIZE + 4] = V[j];
        values[idx * TOTAL_VERTEX_SIZE + 5] = seed.a_scale;
        values[idx * TOTAL_VERTEX_SIZE + 6] = seed.a_speed;
        values[idx * TOTAL_VERTEX_SIZE + 7] = 0;
        values[idx * TOTAL_VERTEX_SIZE + 8] = i;
        idx++;
      }
    }

    var faces = new Uint16Array(NUM_PARTICLES_PER_SYSTEM * NUM_INDICES_PER_FACE);
    var indices = [0, 1, 2, 1, 3, 2];
    idx = 0;
    var f = 0;
    for (i = 0; i < NUM_PARTICLES_PER_SYSTEM; i++) {
      for (j = 0; j < NUM_INDICES_PER_FACE; j++) {
        faces[f + j] = idx + indices[j];
      }
      f += 6;
      idx += 4;
    }
    _get(Object.getPrototypeOf(ParticlePortalMesh.prototype), 'constructor', this).call(this, gl, new _glGlAttribute2['default'](gl, attributes, values), new _glGlIndex2['default'](gl, faces, gl.TRIANGLES));
  }

  return ParticlePortalMesh;
})(_mesh2['default']);

exports['default'] = ParticlePortalMesh;
module.exports = exports['default'];
},{"../gl/gl-attribute":33,"../gl/gl-index":35,"../mesh":37,"../vertex-attribute":52}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mesh = require('../mesh');

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = require('../vertex-attribute');

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glGlIndex = require('../gl/gl-index');

var _glGlIndex2 = _interopRequireDefault(_glGlIndex);

var _glGlAttribute = require('../gl/gl-attribute');

var _glGlAttribute2 = _interopRequireDefault(_glGlAttribute);

var _glMatrix = require('gl-matrix');

// TODO: Parameterize this concept a little better
// this has potential to be a really flexible and powerful way of
// making, essentially, extruded geometry.

// 9 sets of 6 points, breaking the link into 8 pieces, each providing 6 faces, something like that?
var _len = 9,
    _size = _len * 6,
    _chunkSize = 12;
var c = new Array(_len),
    d = new Array(_len),
    e = new Array(_len);

var baseColor = _glMatrix.vec4.fromValues(0.46, 0.18, 0.18, 1.0);
var baseOffset = _glMatrix.vec4.create();

function clampedSin(f) {
  return Math.sin(Math.PI * Math.max(Math.min(1.0, f), 0) / 2);
}

for (var i = 0; i < _len; i++) {
  var f = i / 8.0;
  c[i] = f;
  e[i] = 3.0 + -1.5 * Math.pow(clampedSin(2.0 * Math.abs(f - 0.5)), 4);
  d[i] = clampedSin(1.0 - 2.0 * Math.abs(f - 0.5));
}

function fillChunk(buf, index, x, y, z, u, v, normal, f6, color) {
  var off = index * _chunkSize;
  buf[off + 0] = x;
  buf[off + 1] = y;
  buf[off + 2] = z;
  buf[off + 3] = f6;
  buf[off + 4] = u;
  buf[off + 5] = v;
  buf[off + 6] = normal[0];
  buf[off + 7] = normal[2];
  buf[off + 8] = color[0];
  buf[off + 9] = color[1];
  buf[off + 10] = color[2];
  buf[off + 11] = color[3];
}

function _generateLinkAttributes(start, end, color, startPercent, endPercent) {
  startPercent = startPercent === undefined ? 1 : Math.max(Math.min(startPercent, 1), 0);
  endPercent = endPercent === undefined ? 1 : Math.max(Math.min(endPercent, 1), 0);
  var values = new Float32Array(_size * _chunkSize);
  var length = Math.sqrt((end[0] - start[0]) * (end[0] - start[0]) + (end[1] - start[1]) * (end[1] - start[1]));
  var yMin = baseOffset[1],
      yMax = yMin + Math.min(30.0, 0.08 * length),
      avgPercent = (startPercent + endPercent) / 2.0,
      f6 = 0.01 * length,
      f7 = 0.1 + avgPercent * 0.3;
  var vec = _glMatrix.vec3.fromValues(end[0], 0, end[1]);
  _glMatrix.vec3.subtract(vec, vec, _glMatrix.vec3.fromValues(start[0], 0, start[1]));
  var up = _glMatrix.vec3.fromValues(0, 1, 0);
  var right = _glMatrix.vec3.cross(_glMatrix.vec3.create(), vec, up);
  _glMatrix.vec3.normalize(right, right);
  var step = _len * 2;
  for (var i = 0; i < _len; i++) {
    var f8 = c[i],
        f9 = startPercent + f8 * (endPercent - startPercent),
        f10 = 0.6 + 0.35 * f9,
        f12 = f8 * f6,
        f13 = start[0] + f8 * vec[0],
        f14 = start[1] + f8 * vec[2],
        f15 = yMin + d[i] * (yMax - yMin),
        f16 = e[i];
    var cl = _glMatrix.vec4.lerp(_glMatrix.vec4.create(), baseColor, color, 0.25 + f9 * 0.75);
    cl[3] = f10;
    fillChunk(values, i * 2, f13 + f16 * right[0], f15, f14 + f16 * right[2], 0, f12, up, f7, cl);
    fillChunk(values, i * 2 + 1, f13 - f16 * right[0], f15, f14 - f16 * right[2], 0.5, f12, up, f7, cl);
    fillChunk(values, step + i * 2, f13, f15 + f16, f14, 0, f12, right, f7, cl);
    fillChunk(values, step + i * 2 + 1, f13, f15 - f16, f14, 0.5, f12, right, f7, cl);
    fillChunk(values, 2 * step + i * 2, f13, f15 - f16, f14, 0.5, f12, right, f7, cl);
    fillChunk(values, 2 * step + i * 2 + 1, f13, 0, f14, 1.0, f12, right, f7, cl);
  }
  return values;
}

function _generateFaces(vertexOffset) {
  var ind = new Uint16Array(144),
      iOff = 0;
  for (var i = 0; i < 3; i++) {

    for (var j = 0; j < _len - 1; j++) {

      ind[iOff + 0] = vertexOffset + 1;
      ind[iOff + 1] = vertexOffset + 0;
      ind[iOff + 2] = vertexOffset + 2;
      ind[iOff + 3] = vertexOffset + 1;
      ind[iOff + 4] = vertexOffset + 2;
      ind[iOff + 5] = vertexOffset + 3;
      vertexOffset += 2;
      iOff += 6;
    }
    vertexOffset += 2;
  }

  return ind;
}

/**
 * A PortalLinkMesh represents the mesh for a single portal link.
 *
 * @extends {Mesh}
 */

var PortalLinkMesh = (function (_Mesh) {
  _inherits(PortalLinkMesh, _Mesh);

  /**
   * Programatically constructs the mesh for a link between two points
   * @param  {context} gl          WebGL context
   * @param  {vec2} start          X,Z of the origin point
   * @param  {vec2} end            X,Z of the destination point
   * @param  {vec4} color          Color of the link
   * @param  {Number} startPercent Origin point percentage
   * @param  {Number} endPercent   Destination point percentage
   */

  function PortalLinkMesh(gl, start, end, color, startPercent, endPercent) {
    _classCallCheck(this, PortalLinkMesh);

    var buf = _generateLinkAttributes(start, end, color, startPercent, endPercent);
    var ind = _generateFaces(0);
    var attributes = [];
    attributes.push(new _vertexAttribute2['default']('a_position', 4));
    attributes.push(new _vertexAttribute2['default']('a_texCoord0', 4));
    attributes.push(new _vertexAttribute2['default']('a_color', 4));
    var attribute = new _glGlAttribute2['default'](gl, attributes, buf, gl.DYNAMIC_DRAW);
    var faces = new _glGlIndex2['default'](gl, ind, gl.TRIANGLES);
    _get(Object.getPrototypeOf(PortalLinkMesh.prototype), 'constructor', this).call(this, gl, attribute, faces);
  }

  return PortalLinkMesh;
})(_mesh2['default']);

exports['default'] = PortalLinkMesh;
module.exports = exports['default'];
},{"../gl/gl-attribute":33,"../gl/gl-index":35,"../mesh":37,"../vertex-attribute":52,"gl-matrix":1}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mesh = require('../mesh');

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = require('../vertex-attribute');

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glGlIndex = require('../gl/gl-index');

var _glGlIndex2 = _interopRequireDefault(_glGlIndex);

var _glGlAttribute = require('../gl/gl-attribute');

var _glGlAttribute2 = _interopRequireDefault(_glGlAttribute);

var _glMatrix = require('gl-matrix');

// TODO: Parameterize this concept a little better
// this has potential to be a really flexible and powerful way of
// making, essentially, extruded geometry.

// 5 sets of 4 points, breaking the link into 4 pieces, each providing 4 faces
// chunksize is size of each element in the packed vertex array, in bytes
var _len = 5,
    _size = _len * 4,
    _chunkSize = 12;
var j = new Array(_len),
    k = new Array(_len),
    l = new Array(_len);

function clampedSin(f) {
  return Math.sin(Math.PI * Math.max(Math.min(1.0, f), 0) / 2);
}

for (var i = 0; i < _len; i++) {
  var f = i / 4.0;
  j[i] = f;
  l[i] = 3.5 * Math.max(1.0 - Math.pow(clampedSin(2.0 * Math.abs(f - 0.5)), 4.0), 0.2);
  k[i] = clampedSin(1.0 - 2.0 * Math.abs(f - 0.5));
}

var baseColor = _glMatrix.vec4.fromValues(0.78, 0.31, 0.31, 1.0);
var resonatorMidOffset = 0;
var portalBaseOffset = 0;
var up = _glMatrix.vec3.fromValues(0, 1, 0);

function fillChunk(buf, index, x, y, z, u, v, normal, f6, color) {
  var off = index * _chunkSize;
  buf[off + 0] = x;
  buf[off + 1] = y;
  buf[off + 2] = z;
  buf[off + 3] = f6;
  buf[off + 4] = u;
  buf[off + 5] = v;
  buf[off + 6] = normal[0];
  buf[off + 7] = normal[2];
  buf[off + 8] = color[0];
  buf[off + 9] = color[1];
  buf[off + 10] = color[2];
  buf[off + 11] = color[3];
}

function _generateLinkAttributes(portal, resonator, color, resonatorPercent) {
  resonatorPercent = resonatorPercent === undefined ? 1 : Math.max(Math.min(resonatorPercent, 1), 0);
  var values = new Float32Array(_size * _chunkSize);
  var dist = Math.sqrt((resonator[0] - portal[0]) * (resonator[0] - portal[0]) + (resonator[1] - portal[1]) * (resonator[1] - portal[1]));
  var f4 = 2 / 30 * dist,
      f5 = 0.9 + 0.1 * resonatorPercent,
      f6 = 0.65 + 0.35 * resonatorPercent,
      f8 = 0.1 + 0.3 * resonatorPercent;
  var cl = _glMatrix.vec4.lerp(_glMatrix.vec4.create(), baseColor, color, 0.1 + resonatorPercent * 0.85);
  cl[3] = 0.75 + 0.25 * resonatorPercent * cl[3];
  var vec = _glMatrix.vec3.fromValues(resonator[0], 0, resonator[1]);
  _glMatrix.vec3.subtract(vec, vec, _glMatrix.vec3.fromValues(portal[0], 0, portal[1]));
  var right = _glMatrix.vec3.cross(_glMatrix.vec3.create(), vec, up);
  _glMatrix.vec3.normalize(right, right);
  var step = _len * 2;
  var f10 = 5.0 * (portal[0] + portal[1] - Math.floor(portal[0] + portal[1]));
  for (var i = 0; i < _len; i++) {
    var f11 = j[i],
        f12 = portal[0] + f11 * vec[0],
        f13 = portal[1] + f11 * vec[2],
        f14 = portalBaseOffset + f11 * (resonatorMidOffset - portalBaseOffset) + f5 * k[i],
        f15 = f6 * l[i],
        f16 = f11 * f4;
    fillChunk(values, i * 2 + 0, f12 + f15 * right[0], f14, f13 + f15 * right[2], 0.0, f16 + f10, up, f8, cl);
    fillChunk(values, i * 2 + 1, f12 - f15 * right[0], f14, f13 - f15 * right[2], 1.0, f16 + f10, up, f8, cl);
    fillChunk(values, step + i * 2 + 0, f12, f14 + f15, f13, 0.0, f16 + f10, right, f8, cl);
    fillChunk(values, step + i * 2 + 1, f12, f14 - f15, f13, 1.0, f16 + f10, right, f8, cl);
  }
  return values;
}

function _generateFaces(vertexOffset) {
  var ind = new Uint16Array(48),
      iOff = 0;

  for (i = 0; i < 2; i++) {
    for (var i2 = 0; i2 < _len - 1; i2++) {
      ind[iOff + 0] = vertexOffset + 1;
      ind[iOff + 1] = vertexOffset + 0;
      ind[iOff + 2] = vertexOffset + 2;
      ind[iOff + 3] = vertexOffset + 1;
      ind[iOff + 4] = vertexOffset + 2;
      ind[iOff + 5] = vertexOffset + 3;
      vertexOffset += 2;
      iOff += 6;
    }
    vertexOffset += 2;
  }

  return ind;
}

/**
 * A ResonatorLinkMesh is a Mesh that represents a single link between a portal and a resonator
 *
 * TODO: Make disco
 *
 * @extends {Mesh}
 */

var ResonatorLinkMesh = (function (_Mesh) {
  _inherits(ResonatorLinkMesh, _Mesh);

  /**
   * Construct a resonator link mesh
   * @param  {context} gl              WebGL context
   * @param  {vec2} portalPosition     X,Z of the portal
   * @param  {Number} slot             Resonator slot (0-7)
   * @param  {Number} distance         Distance from the portal
   * @param  {vec4} color              Color of the resonator link
   * @param  {Number} resonatorPercent Percent health of the resonator
   */

  function ResonatorLinkMesh(gl, portalPosition, slot, distance, color, resonatorPercent) {
    _classCallCheck(this, ResonatorLinkMesh);

    var theta = slot / 8 * 2 * Math.PI;
    var end = _glMatrix.vec2.create();
    var relative = _glMatrix.vec2.fromValues(distance * Math.cos(theta), distance * Math.sin(theta));
    _glMatrix.vec2.add(end, portalPosition, relative);
    var buf = _generateLinkAttributes(portalPosition, end, color, resonatorPercent);
    var ind = _generateFaces(0);
    var attributes = [];
    attributes.push(new _vertexAttribute2['default']('a_position', 4));
    attributes.push(new _vertexAttribute2['default']('a_texCoord0', 4));
    attributes.push(new _vertexAttribute2['default']('a_color', 4));
    var attribute = new _glGlAttribute2['default'](gl, attributes, buf, gl.DYNAMIC_DRAW);
    var faces = new _glGlIndex2['default'](gl, ind, gl.TRIANGLES);
    _get(Object.getPrototypeOf(ResonatorLinkMesh.prototype), 'constructor', this).call(this, gl, attribute, faces);
  }

  return ResonatorLinkMesh;
})(_mesh2['default']);

exports['default'] = ResonatorLinkMesh;
module.exports = exports['default'];
},{"../gl/gl-attribute":33,"../gl/gl-index":35,"../mesh":37,"../vertex-attribute":52,"gl-matrix":1}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mesh = require('../mesh');

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = require('../vertex-attribute');

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glGlIndex = require('../gl/gl-index');

var _glGlIndex2 = _interopRequireDefault(_glGlIndex);

var _glGlAttribute = require('../gl/gl-attribute');

var _glGlAttribute2 = _interopRequireDefault(_glGlAttribute);

var _glMatrix = require('gl-matrix');

// part of doing away with the THREE.js dependency
// means giving up a lot of helper code for doing things
// like this.
//
// Needless to say, this borrows heavily from THREE.SphereGeometry
// https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/SphereGeometry.js
function createSphere(radius, phiSlices, thetaSlices) {
  var i,
      j,
      u,
      v,
      vec,
      v1,
      v2,
      v3,
      v4,
      verticesRow,
      faces,
      phi = Math.PI * 2,
      theta = Math.PI,

  // size is 8 for vec3 a_position + vec2 a_texCoord + vec3 a_normal
  values = new Float32Array((phiSlices + 1) * (thetaSlices + 1) * 8),
      faceArray = [],
      vertices = [],
      aIdx = 0,
      attributes = [];
  phiSlices = Math.max(3, phiSlices || 8);
  thetaSlices = Math.max(2, thetaSlices || 6);

  for (i = 0; i <= phiSlices; i++) {
    verticesRow = [];
    for (j = 0; j <= thetaSlices; j++) {
      u = j / phiSlices;
      v = i / thetaSlices;
      vec = _glMatrix.vec3.fromValues(-radius * Math.cos(u * phi) * Math.sin(v * theta), radius * Math.cos(v * theta), radius * Math.sin(u * phi) * Math.sin(v * theta));

      values[aIdx * 8 + 0] = vec[0];
      values[aIdx * 8 + 1] = vec[1];
      values[aIdx * 8 + 2] = vec[2];
      values[aIdx * 8 + 3] = u;
      values[aIdx * 8 + 4] = v;
      // normalized:
      _glMatrix.vec3.normalize(vec, vec);
      values[aIdx * 8 + 5] = vec[0];
      values[aIdx * 8 + 6] = vec[1];
      values[aIdx * 8 + 7] = vec[2];

      verticesRow.push(aIdx++);
    }
    vertices.push(verticesRow);
  }

  for (i = 0; i < phiSlices; i++) {
    for (j = 0; j < thetaSlices; j++) {
      v1 = vertices[i][j + 1];
      v2 = vertices[i][j];
      v3 = vertices[i + 1][j];
      v4 = vertices[i + 1][j + 1];

      if (Math.abs(values[v1 * 8 + 1]) === radius) {
        faceArray.push.apply(faceArray, [v1, v3, v4]);
        values[v1 * 8 + 3] = (values[v1 * 8 + 3] + values[v2 * 8 + 3]) / 2;
      } else if (Math.abs(values[v3 * 8 + 1]) === radius) {
        faceArray.push.apply(faceArray, [v1, v2, v3]);
        values[v3 * 8 + 3] = (values[v3 * 8 + 3] + values[v4 * 8 + 3]) / 2;
      } else {
        faceArray.push.apply(faceArray, [v1, v2, v4]);
        faceArray.push.apply(faceArray, [v2, v3, v4]);
      }
    }
  }

  faces = new Uint16Array(faceArray.length);
  faceArray.forEach(function (v, i) {
    faces[i] = v;
  });
  attributes.push(new _vertexAttribute2['default']('a_position', 3));
  attributes.push(new _vertexAttribute2['default']('a_texCoord0', 2));
  attributes.push(new _vertexAttribute2['default']('a_normal', 3));
  return {
    values: values,
    faces: faces,
    attributes: attributes
  };
}

/**
 * A SphereMesh is a Mesh that is a sphere, made of a number of quads determined
 * by the number of horizontal and vertical slices involved in its construction
 *
 * @extends {Mesh}
 */

var SphereMesh = (function (_Mesh) {
  _inherits(SphereMesh, _Mesh);

  /**
   * Construct a sphere
   * @param  {context} gl     WebGL context
   * @param  {Number} radius  Radius of the sphere
   * @param  {Number} vSlices Number of vertical slices
   * @param  {Number} hSlices Number of horizontal slices
   */

  function SphereMesh(gl, radius, vSlices, hSlices) {
    _classCallCheck(this, SphereMesh);

    var parsed = createSphere(radius, vSlices, hSlices);
    var attributes = new _glGlAttribute2['default'](gl, parsed.attributes, parsed.values);
    var faces = new _glGlIndex2['default'](gl, parsed.faces, gl.TRIANGLES);
    _get(Object.getPrototypeOf(SphereMesh.prototype), 'constructor', this).call(this, gl, attributes, faces);
  }

  return SphereMesh;
})(_mesh2['default']);

exports['default'] = SphereMesh;
module.exports = exports['default'];
},{"../gl/gl-attribute":33,"../gl/gl-index":35,"../mesh":37,"../vertex-attribute":52,"gl-matrix":1}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mesh = require('../mesh');

var _mesh2 = _interopRequireDefault(_mesh);

var _vertexAttribute = require('../vertex-attribute');

var _vertexAttribute2 = _interopRequireDefault(_vertexAttribute);

var _glGlIndex = require('../gl/gl-index');

var _glGlIndex2 = _interopRequireDefault(_glGlIndex);

var _glGlAttribute = require('../gl/gl-attribute');

var _glGlAttribute2 = _interopRequireDefault(_glGlAttribute);

var _glMatrix = require('gl-matrix');

var _chunkSize = 13;
var baseColor = _glMatrix.vec4.fromValues(0.46, 0.18, 0.18, 1.0);
var baseOffset = _glMatrix.vec4.create();

function clampedSin(f) {
  return Math.sin(Math.PI * Math.max(Math.min(1.0, f), 0) / 2);
}

function getBearing(start, end) {
  var s = start[0],
      e = end[0],
      dl = end[1] - start[1];
  var y = Math.sin(dl) * Math.cos(e),
      x = Math.cos(s) * Math.sin(e) - Math.sin(s) * Math.cos(e) * Math.cos(dl);

  return (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
}

function dest(p, bearing, angle) {
  var lat = Math.asin(Math.sin(p[0]) * Math.cos(angle) + Math.cos(p[0]) * Math.sin(angle) * Math.cos(bearing)),
      lon = p[1] + Math.atan2(Math.sin(bearing) * Math.sin(angle) * Math.cos(p[0]), Math.cos(angle) - Math.sin(p[0]) * Math.sin(lat));

  lon = (lon + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
  return _glMatrix.vec2.fromValues(lat, lon);
}

function buildMatrix(s, e, radius) {
  var mat = _glMatrix.mat4.create();
  _glMatrix.mat4.rotateY(mat, mat, s[1]);
  _glMatrix.mat4.rotateZ(mat, mat, s[0] - Math.PI / 2);
  _glMatrix.mat4.rotateY(mat, mat, -getBearing(s, e));
  _glMatrix.mat4.translate(mat, mat, [0, radius, 0]);
  return mat;
}

function getRadialDistance(s, e) {
  var dLat = e[0] - s[0],
      dLon = e[1] - s[1];

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(s[0]) * Math.cos(e[0]) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRadians(point) {
  return _glMatrix.vec2.fromValues(point[0] * Math.PI / 180, point[1] * Math.PI / 180);
}

function fillChunk(buf, index, pos, uv, normal, f6, color) {
  var off = index * _chunkSize;
  _glMatrix.vec3.normalize(normal, normal);
  buf[off + 0] = pos[0];
  buf[off + 1] = pos[1];
  buf[off + 2] = pos[2];
  buf[off + 3] = f6;
  buf[off + 4] = uv[0];
  buf[off + 5] = uv[1];
  buf[off + 6] = normal[0];
  buf[off + 7] = normal[1];
  buf[off + 8] = normal[2];
  buf[off + 9] = color[0];
  buf[off + 10] = color[1];
  buf[off + 11] = color[2];
  buf[off + 12] = color[3];
}

// start and end should probably be in radians?
function _generateLinkAttributes(radius, start, end, color, startPercent, endPercent) {
  var s = toRadians(start);
  var e = toRadians(end);
  var angle = getRadialDistance(s, e);
  var bearing = getBearing(s, e);
  var length = angle * radius;
  var segments = Math.max(Math.floor(angle / Math.PI * 50) + 1, 8); // 50 segments for a half-circle sounds good, I guess.
  startPercent = startPercent === undefined ? 1 : Math.max(Math.min(startPercent, 1), 0);
  endPercent = endPercent === undefined ? 1 : Math.max(Math.min(endPercent, 1), 0);
  var values = new Float32Array(segments * _chunkSize * 6);
  var yMin = baseOffset[1],
      yMax = yMin + Math.min(radius * 0.01, 0.08 * length),
      avgPercent = (startPercent + endPercent) / 2.0,
      f6 = 0.01 * length,
      f7 = 0.1 + avgPercent * 0.3,
      up = _glMatrix.vec3.fromValues(0, 1, 0),
      right = _glMatrix.vec3.fromValues(0, 0, 1);
  var step = segments * 2;
  for (var i = 0; i < segments; i++) {
    var f8 = i / (segments - 1),
        f9 = startPercent + f8 * (endPercent - startPercent),
        f10 = 0.6 + 0.35 * f9,

    // v as in "uv" as in texcoords
    v = f8 * f6,

    // "current" point in progression
    curr = f8 === 0 ? s : dest(s, bearing, angle * f8),

    // "next" point in the progression
    next = dest(s, bearing, angle * (f8 + 1 / (segments - 1))),
        transform = buildMatrix(curr, next, radius),

    // "height" of the centerpoint of the link.
    h = _glMatrix.vec3.fromValues(0, yMin + (3.0 + -1.5 * Math.pow(clampedSin(2.0 * Math.abs(f8 - 0.5)), 4)) * (yMax - yMin), 0),

    // "radius" of the link
    w = radius * 0.01 * clampedSin(1.0 - 2.0 * Math.abs(f8 - 0.5)),
        wUp = _glMatrix.vec3.fromValues(0, w, 0),
        wRight = _glMatrix.vec3.fromValues(0, 0, w),
        cl = _glMatrix.vec4.lerp(_glMatrix.vec4.create(), baseColor, color, 0.25 + f9 * 0.75);
    cl[3] = f10;

    // top horizontal segment
    // right point
    fillChunk(values, i * 2, _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), _glMatrix.vec3.add(_glMatrix.vec3.create(), h, wRight), transform), _glMatrix.vec2.fromValues(0, v), _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), up, transform), f7, cl);
    // left point
    fillChunk(values, i * 2 + 1, _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), _glMatrix.vec3.subtract(_glMatrix.vec3.create(), h, wRight), transform), _glMatrix.vec2.fromValues(0.5, v), _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), up, transform), f7, cl);

    // top vertical segment
    fillChunk(values, step + i * 2, _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), _glMatrix.vec3.add(_glMatrix.vec3.create(), h, wUp), transform), _glMatrix.vec2.fromValues(0, v), _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), right, transform), f7, cl);
    fillChunk(values, step + i * 2 + 1, _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), _glMatrix.vec3.subtract(_glMatrix.vec3.create(), h, wUp), transform), _glMatrix.vec2.fromValues(0.5, v), _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), right, transform), f7, cl);

    // bottom vertical segment
    fillChunk(values, 2 * step + i * 2, _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), _glMatrix.vec3.subtract(_glMatrix.vec3.create(), h, wUp), transform), _glMatrix.vec2.fromValues(0.5, v), _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), right, transform), f7, cl);
    fillChunk(values, 2 * step + i * 2 + 1, _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), _glMatrix.vec3.fromValues(0, 0, 0), transform), _glMatrix.vec2.fromValues(1.0, v), _glMatrix.vec3.transformMat4(_glMatrix.vec3.create(), right, transform), f7, cl);
  }
  return values;
}

function _generateFaces(vertexOffset, segments) {
  var ind = new Uint16Array(6 * (segments - 1) * 3),
      iOff = 0;
  for (var i = 0; i < 3; i++) {

    for (var j = 0; j < segments - 1; j++) {

      ind[iOff + 0] = vertexOffset + 1;
      ind[iOff + 1] = vertexOffset + 0;
      ind[iOff + 2] = vertexOffset + 2;
      ind[iOff + 3] = vertexOffset + 1;
      ind[iOff + 4] = vertexOffset + 2;
      ind[iOff + 5] = vertexOffset + 3;
      vertexOffset += 2;
      iOff += 6;
    }
    vertexOffset += 2;
  }

  return ind;
}

/**
 * A SphereicalPortalLinkMesh is a Mesh that represents a portal link betwen two portals
 * on the surface of a sphere
 *
 * @extends {Mesh}
 */

var SphericalPortalLinkMesh = (function (_Mesh) {
  _inherits(SphericalPortalLinkMesh, _Mesh);

  /**
   * Construct a spherical portal link
   * @param  {context} gl          WebGL context
   * @param  {Number} sphereRadius Radius of the sphere
   * @param  {vec2} start          lat,lng of the origin point
   * @param  {vec2} end            lat,lng of the destionation point
   * @param  {vec4} color          Color of the link
   * @param  {Number} startPercent Origin portal health percentage
   * @param  {Number} endPercent   Destination portal health percentage
   */

  function SphericalPortalLinkMesh(gl, sphereRadius, start, end, color, startPercent, endPercent) {
    _classCallCheck(this, SphericalPortalLinkMesh);

    var buf = _generateLinkAttributes(sphereRadius, start, end, color, startPercent, endPercent);
    var len = buf.length,
        segments = Math.floor(len / _chunkSize / 6);
    var ind = _generateFaces(0, segments);
    var attributes = [];
    attributes.push(new _vertexAttribute2['default']('a_position', 4));
    attributes.push(new _vertexAttribute2['default']('a_texCoord0', 2));
    attributes.push(new _vertexAttribute2['default']('a_normal', 3));
    attributes.push(new _vertexAttribute2['default']('a_color', 4));
    var attribute = new _glGlAttribute2['default'](gl, attributes, buf, gl.DYNAMIC_DRAW);
    var faces = new _glGlIndex2['default'](gl, ind, gl.TRIANGLES);
    _get(Object.getPrototypeOf(SphericalPortalLinkMesh.prototype), 'constructor', this).call(this, gl, attribute, faces);
    return this;
  }

  return SphericalPortalLinkMesh;
})(_mesh2['default']);

exports['default'] = SphericalPortalLinkMesh;
module.exports = exports['default'];
},{"../gl/gl-attribute":33,"../gl/gl-index":35,"../mesh":37,"../vertex-attribute":52,"gl-matrix":1}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('./utils');

var _glMatrix = require('gl-matrix');

var PI_HALF = Math.PI / 2.0;
var MIN_LOG_DIST = 5.0;

function cloneTouch(touch) {
  return { identifier: touch.identifier, x: touch.clientX, y: touch.clientY };
}

function getTouchIndex(touches, touch) {
  for (var i = 0; i < touches.length; i++) {
    if (touches[i].identifier == touch.identifier) {
      return i;
    }
  }
  return -1;
}

/**
 * Camera controls for controlling a camera that orbits a fixed point,
 * with variable position and depth.
 *
 * This is a port of the THREE.js OrbitControls found with the webgl globe.
 */

var OrbitControls = (function () {

  /**
   * Constructs an orbiting camera control.
   * @param  {HTMLElement} element  Target element to bind listeners to
   * @param  {Number} distance Starting distance from origin
   * @param  {Object} options  Hash of options for configuration
   */

  function OrbitControls(element, camera, distance, options) {
    _classCallCheck(this, OrbitControls);

    options = options || {};
    this.element = element;
    this.camera = camera;
    this.distance = distance || 2;
    this.distanceTarget = this.distance;
    var params = {
      zoomDamp: 0.5,
      distanceScale: 0.5,
      distanceMax: 1000,
      distanceMin: 1,
      touchScale: 0.1,
      wheelScale: 0.01,
      friction: 0.2,
      target: _glMatrix.vec3.create(),
      allowZoom: true
    };
    this.options = (0, _utils.setParams)(params, options);
    this.camera.lookAt(this.options.target);
    this.mouse = { x: 0, y: 0 };
    this.mouseOnDown = { x: 0, y: 0 };
    this.rotation = { x: 0, y: 0 };
    this.target = { x: Math.PI * 3 / 2, y: Math.PI / 6.0 };
    this.targetOnDown = { x: 0, y: 0 };
    this.overRenderer = false;
    // Pre-bind all these handlers so we can unbind the listeners later.
    this.mouseMove = this._onMouseMove.bind(this);
    this.mouseUp = this._onMouseUp.bind(this);
    this.mouseOut = this._onMouseOut.bind(this);
    this.mouseDown = this._onMouseDown.bind(this);
    this.mouseWheel = this._onMouseWheel.bind(this);

    this.touches = [];
    this.touchDelta = 0;
    this.touchMove = this._onTouchMove.bind(this);
    this.touchEnd = this._onTouchEnd.bind(this);
    this.touchLeave = this._onTouchLeave.bind(this);
    this.touchStart = this._onTouchStart.bind(this);
    this.mouseOver = (function () {
      this.overRenderer = true;
    }).bind(this);
    this.mouseOut = (function () {
      this.overRenderer = false;
    }).bind(this);
    this.enabled = false;
  }

  /**
   * Unbinds all listeners and disables the controls
   */

  _createClass(OrbitControls, [{
    key: 'disable',
    value: function disable() {
      this.element.removeEventListener('mousedown', this.mouseDown, false);
      this.element.removeEventListener('mousemove', this.mouseMove, false);
      this.element.removeEventListener('mouseup', this.mouseUp, false);
      this.element.removeEventListener('mouseout', this.mouseOut, false);
      this.element.removeEventListener('touchstart', this.touchStart, false);
      this.element.removeEventListener('touchmove', this.touchMove, false);
      this.element.removeEventListener('touchend', this.touchEnd, false);
      this.element.removeEventListener('touchleave', this.touchLeave, false);
      this.element.removeEventListener('mousewheel', this.mouseWheel, false);
      this.element.removeEventListener('mouseover', this.mouseOver, false);
      this.element.removeEventListener('mouseout', this.mouseOut, false);
      this.enabled = false;
    }

    /**
     * Binds all listeners and enables the controls
     */
  }, {
    key: 'enable',
    value: function enable() {
      this.element.addEventListener('mousedown', this.mouseDown, false);
      if (this.options.allowZoom) {
        this.element.addEventListener('mousewheel', this.mouseWheel, false);
      }
      this.element.addEventListener('touchstart', this.touchStart, false);
      this.element.addEventListener('mouseover', this.mouseOver, false);
      this.element.addEventListener('mouseout', this.mouseOut, false);
      this.enabled = true;
    }

    /**
     * Update the given camera matrix with new position information, etc
     * @param  {mat4} view   A view matrix
     */
  }, {
    key: 'updateView',
    value: function updateView() {
      var dx = this.target.x - this.rotation.x,
          dy = this.target.y - this.rotation.y,
          dz = this.distanceTarget - this.distance,
          cameraPosition = _glMatrix.vec3.create();
      if (Math.abs(dx) > 0.00001 || Math.abs(dy) > 0.00001 || Math.abs(dz) > 0.00001) {
        this.rotation.x += dx * this.options.friction;
        this.rotation.y += dy * this.options.friction;
        this.distance += dz * this.options.distanceScale;

        cameraPosition[0] = this.distance * Math.sin(this.rotation.x) * Math.cos(this.rotation.y) + this.options.target[0];
        cameraPosition[1] = this.distance * Math.sin(this.rotation.y) + this.options.target[1];
        cameraPosition[2] = this.distance * Math.cos(this.rotation.x) * Math.cos(this.rotation.y) + this.options.target[2];

        this.camera.setPosition(cameraPosition);
      }
    }
  }, {
    key: '_updateTargets',
    value: function _updateTargets() {
      var scale = this.distance < MIN_LOG_DIST ? this.distance : Math.log(this.distance);
      var zoomDamp = scale / this.options.zoomDamp;

      this.target.x = this.targetOnDown.x + (this.mouse.x - this.mouseOnDown.x) * 0.005 * zoomDamp;
      this.target.y = this.targetOnDown.y + (this.mouse.y - this.mouseOnDown.y) * 0.005 * zoomDamp;

      this.target.y = this.target.y > PI_HALF ? PI_HALF : this.target.y;
      this.target.y = this.target.y < -PI_HALF ? -PI_HALF : this.target.y;
    }
  }, {
    key: '_onMouseDown',
    value: function _onMouseDown(ev) {
      ev.preventDefault();
      this.element.addEventListener('mousemove', this.mouseMove, false);
      this.element.addEventListener('mouseup', this.mouseUp, false);
      this.element.addEventListener('mouseout', this.mouseOut, false);

      this.mouseOnDown.x = -ev.clientX;
      this.mouseOnDown.y = ev.clientY;
      this.targetOnDown.x = this.target.x;
      this.targetOnDown.y = this.target.y;

      this.element.style.cursor = 'move';
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove(ev) {
      this.mouse.x = -ev.clientX;
      this.mouse.y = ev.clientY;
      this._updateTargets();
    }
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(ev) {
      this._onMouseOut(ev);
      this.element.style.cursor = 'auto';
    }
  }, {
    key: '_onMouseOut',
    value: function _onMouseOut() {
      this.element.removeEventListener('mousemove', this.mouseMove, false);
      this.element.removeEventListener('mouseup', this.mouseUp, false);
      this.element.removeEventListener('mouseout', this.mouseOut, false);
    }
  }, {
    key: '_onMouseWheel',
    value: function _onMouseWheel(ev) {
      if (this.overRenderer) {
        this._zoom(ev.wheelDeltaY * this.options.wheelScale * (this.distance < MIN_LOG_DIST ? this.distance : Math.log(this.distance)));
      }
      return true;
    }
  }, {
    key: '_onTouchStart',
    value: function _onTouchStart(ev) {
      ev.preventDefault();
      if (this.touches.length === 0) {
        this.element.addEventListener('touchmove', this.touchMove, false);
        this.element.addEventListener('touchend', this.touchEnd, false);
        this.element.addEventListener('touchleave', this.touchLeave, false);
      }

      for (var i = 0; i < ev.changedTouches.length; i++) {
        this.touches.push(cloneTouch(ev.changedTouches[i]));
      }

      if (this.touches.length === 1) {
        this.mouseOnDown.x = -this.touches[0].x;
        this.mouseOnDown.y = this.touches[0].y;

        this.targetOnDown.x = this.target.x;
        this.targetOnDown.y = this.target.y;
      } else if (this.touches.length === 2 && this.options.allowZoom) {
        var x = Math.abs(this.touches[0].x - this.touches[1].x);
        var y = Math.abs(this.touches[0].y - this.touches[1].y);

        this.touchDelta = Math.sqrt(x * x + y * y);
      }

      this.element.style.cursor = 'move';
    }
  }, {
    key: '_onTouchMove',
    value: function _onTouchMove(ev) {
      var changed = ev.changedTouches,
          l = changed.length;
      for (var i = 0; i < l; i++) {
        var idx = getTouchIndex(this.touches, changed[i]);
        if (idx >= 0) {
          this.touches.splice(idx, 1, cloneTouch(changed[i]));
        } else {
          console.log('could not find event ', changed[i]);
        }
      }

      if (this.touches.length === 1) {
        this.mouse.x = -this.touches[0].x;
        this.mouse.y = this.touches[0].y;
        this.updateTargets();
      } else if (this.touches.length === 2 && this.options.allowZoom) {
        var x = this.touches[0].x - this.touches[1].x;
        var y = this.touches[0].y - this.touches[1].y;

        var newDelta = Math.sqrt(x * x + y * y);
        this._zoom((newDelta - this.touchDelta) * this.options.touchScale);
        this.touchDelta = newDelta;
      }
    }
  }, {
    key: '_removeTouches',
    value: function _removeTouches(ev) {
      var changed = ev.changedTouches,
          l = changed.length;
      for (var i = 0; i < l; i++) {
        var idx = getTouchIndex(this.touches, changed[i]);
        if (idx >= 0) {
          this.touches.splice(idx, 1);
        }
      }
      if (this.touches.length === 0) {
        this.element.removeEventListener('touchmove', this.touchMove, false);
        this.element.removeEventListener('touchend', this.touchEnd, false);
        this.element.removeEventListener('touchleave', this.touchLeave, false);
      } else if (this.touches.length === 1) {
        this.mouseOnDown.x = -this.touches[0].x;
        this.mouseOnDown.y = this.touches[0].y;

        this.targetOnDown.x = this.target.x;
        this.targetOnDown.y = this.target.y;
      }
    }
  }, {
    key: '_onTouchEnd',
    value: function _onTouchEnd(ev) {
      this._removeTouches(ev);
      this.element.style.cursor = 'auto';
    }
  }, {
    key: '_onTouchLeave',
    value: function _onTouchLeave(ev) {
      this._removeTouches(ev);
    }

    //?
  }, {
    key: '_onTouchCancel',
    value: function _onTouchCancel(ev) {
      this._removeTouches(ev);
    }
  }, {
    key: '_zoom',
    value: function _zoom(delta) {
      this.distanceTarget -= delta;
      this.distanceTarget = Math.min(this.distanceTarget, this.options.distanceMax);
      this.distanceTarget = Math.max(this.distanceTarget, this.options.distanceMin);
    }
  }]);

  return OrbitControls;
})();

exports['default'] = OrbitControls;
module.exports = exports['default'];
},{"./utils":51,"gl-matrix":1}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.fixPrecision = fixPrecision;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBound = require('./gl-bound');

var _glBound2 = _interopRequireDefault(_glBound);

/**
 * Fixes an issue with shaders where the shader doesn't set a precision,
 * leading it to have a mismatch with its counterpart
 *
 * I.e. the vertex shader might set a precision, but the fragment shader
 * does not, leading to precision mismatch errors.
 * @param  {String} shader The shader to check/fix
 * @return {String}        The fixed shader, or the original if it needed
 *                         no patching.
 */

function fixPrecision(shader) {
  if (/precision mediump float/g.test(shader)) {
    return shader;
  } else {
    var lines = shader.split("\n");
    lines.splice(1, 0, "#ifdef GL_ES", "precision mediump float;", "#endif");
    return lines.join("\n");
  }
}

// Taken from PhiloGL's program class:
//Returns a Magic Uniform Setter
function getUniformSetter(gl, program, info, isArray) {
  var name = info.name,
      loc = gl.getUniformLocation(program, name),
      type = info.type,
      matrix = false,
      vector = true,
      glFunction,
      typedArray;

  if (info.size > 1 && isArray) {
    switch (type) {
      case gl.FLOAT:
        glFunction = gl.uniform1fv;
        typedArray = Float32Array;
        vector = false;
        break;
      case gl.INT:case gl.BOOL:case gl.SAMPLER_2D:case gl.SAMPLER_CUBE:
        glFunction = gl.uniform1iv;
        typedArray = Uint16Array;
        vector = false;
        break;
    }
  }

  if (vector) {
    switch (type) {
      case gl.FLOAT:
        glFunction = gl.uniform1f;
        break;
      case gl.FLOAT_VEC2:
        glFunction = gl.uniform2fv;
        typedArray = isArray ? Float32Array : new Float32Array(2);
        break;
      case gl.FLOAT_VEC3:
        glFunction = gl.uniform3fv;
        typedArray = isArray ? Float32Array : new Float32Array(3);
        break;
      case gl.FLOAT_VEC4:
        glFunction = gl.uniform4fv;
        typedArray = isArray ? Float32Array : new Float32Array(4);
        break;
      case gl.INT:case gl.BOOL:case gl.SAMPLER_2D:case gl.SAMPLER_CUBE:
        glFunction = gl.uniform1i;
        break;
      case gl.INT_VEC2:case gl.BOOL_VEC2:
        glFunction = gl.uniform2iv;
        typedArray = isArray ? Uint16Array : new Uint16Array(2);
        break;
      case gl.INT_VEC3:case gl.BOOL_VEC3:
        glFunction = gl.uniform3iv;
        typedArray = isArray ? Uint16Array : new Uint16Array(3);
        break;
      case gl.INT_VEC4:case gl.BOOL_VEC4:
        glFunction = gl.uniform4iv;
        typedArray = isArray ? Uint16Array : new Uint16Array(4);
        break;
      case gl.FLOAT_MAT2:
        matrix = true;
        glFunction = gl.uniformMatrix2fv;
        break;
      case gl.FLOAT_MAT3:
        matrix = true;
        glFunction = gl.uniformMatrix3fv;
        break;
      case gl.FLOAT_MAT4:
        matrix = true;
        glFunction = gl.uniformMatrix4fv;
        break;
    }
  }

  //TODO(nico): Safari 5.1 doesn't have Function.prototype.bind.
  //remove this check when they implement it.
  if (glFunction.bind) {
    glFunction = glFunction.bind(gl);
  } else {
    var target = glFunction;
    glFunction = function () {
      target.apply(gl, arguments);
    };
  }

  //Set a uniform array
  if (isArray && typedArray) {
    return function (val) {
      glFunction(loc, new typedArray(val)); // jshint ignore:line
    };

    //Set a matrix uniform
  } else if (matrix) {
      return function (val) {
        glFunction(loc, false, val);
      };

      //Set a vector/typed array uniform
    } else if (typedArray) {
        return function (val) {
          typedArray.set(val.toFloat32Array ? val.toFloat32Array() : val);
          glFunction(loc, typedArray);
        };

        //Set a primitive-valued uniform
      } else {
          return function (val) {
            glFunction(loc, val);
          };
        }

  // FIXME: Unreachable code
  throw "Unknown type: " + type;
}

/**
 * Represents a shader program consisting of a vertex shader and a fragment
 * shader.
 * @extends {GLBound}
 */

var Program = (function (_GLBound) {
  _inherits(Program, _GLBound);

  /**
   * Constructs a program from the given vertex and fragment shader strings.
   *
   * Manages the shader's attributes and uniforms.
   * @param  {context} gl      Webgl context
   * @param  {String} vertex   Vertex shader
   * @param  {String} fragment Fragment shader
   */

  function Program(gl, vertex, fragment) {
    _classCallCheck(this, Program);

    _get(Object.getPrototypeOf(Program.prototype), "constructor", this).call(this, gl);
    this.program = null;
    this.vertexSource = fixPrecision(vertex);
    this.fragmentSource = fragment;
    this.attributes = {};
    this.uniforms = {};
  }

  /**
   * Initialize the shader
   *
   * Parses out shader parameters, compiles the shader, and binds it to
   * the context.
   */

  _createClass(Program, [{
    key: "init",
    value: function init() {
      var gl = this._gl,
          vertex,
          fragment;
      vertex = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertex, this.vertexSource);
      gl.compileShader(vertex);
      if (!gl.getShaderParameter(vertex, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(vertex));
        console.error('could not compile vertex shader: ' + this.vertexSource);
        throw 'Vertex shader compile error!';
      }
      fragment = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragment, this.fragmentSource);
      gl.compileShader(fragment);
      if (!gl.getShaderParameter(fragment, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(fragment));
        console.error('could not compile fragment shader: ' + this.fragmentSource);
        throw 'Fragment shader compile error!';
      }

      this.program = gl.createProgram();
      gl.attachShader(this.program, vertex);
      gl.attachShader(this.program, fragment);

      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        // TODO: verbose like above
        throw 'Could not link program';
      }
      gl.useProgram(this.program);

      this._setupLocations();
    }

    /**
     * Use the program with the given draw function
     * @param  {Function} fn Function to handle the actual drawing.
     *                       The programs attributes and uniforms will
     *                       be passed to the draw function for use.
     */
  }, {
    key: "use",
    value: function use(fn) {
      var gl = this._gl;
      if (!this.program) {
        this.init();
      } else {
        gl.useProgram(this.program);
      }
      fn(this.attributes, this.uniforms);
      //gl.useProgram(0);
    }
  }, {
    key: "_setupLocations",
    value: function _setupLocations() {
      var gl = this._gl,
          program = this.program;
      // this is taken partly from PhiloGL's Program class.
      //fill attribute locations
      var len = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES),
          info,
          name;
      for (var i = 0; i < len; i++) {
        info = gl.getActiveAttrib(program, i);
        this.attributes[info.name] = gl.getAttribLocation(program, info.name);
      }

      //create uniform setters
      len = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (i = 0; i < len; i++) {
        info = gl.getActiveUniform(program, i);
        name = info.name;
        //if array name then clean the array brackets
        name = name[name.length - 1] == ']' ? name.substr(0, name.length - 3) : name;
        this.uniforms[name] = getUniformSetter(gl, program, info, info.name != name);
      }
    }
  }]);

  return Program;
})(_glBound2["default"]);

exports["default"] = Program;
},{"./gl-bound":32}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _program = require('../program');

var _program2 = _interopRequireDefault(_program);

var _utils = require('../utils');

/**
 * A GlowrampProgram is a program meant for drawing
 * transparent glowramp drawables
 *
 * @extends {Program}
 */

var GlowrampProgram = (function (_Program) {
  _inherits(GlowrampProgram, _Program);

  /**
   * Constructs a Glowramp program given vertex and fragment shader sources
   * @param  {context} gl      WebGL context
   * @param  {String} vertex   Vertex shader source
   * @param  {String} fragment Fragment shader source
   */

  function GlowrampProgram(gl, vertex, fragment) {
    _classCallCheck(this, GlowrampProgram);

    _get(Object.getPrototypeOf(GlowrampProgram.prototype), 'constructor', this).call(this, gl, vertex, fragment);
  }

  /**
   * Use this program to draw
   *
   * Sets up the proper blending modes, etc
   * @param  {Function} fn The draw function
   */

  _createClass(GlowrampProgram, [{
    key: 'use',
    value: function use(fn) {
      if (!this.program) {
        this.init();
      }
      var gl = this._gl;
      gl.useProgram(this.program);
      // init stuffs.
      gl.disable(gl.CULL_FACE);
      gl.enable(gl.BLEND);
      gl.depthMask(false);
      gl.blendEquation(gl.FUNC_ADD);
      //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      fn(this.attributes, this.uniforms);

      (0, _utils.resetGL)(gl);
      //gl.useProgram(0);
    }
  }]);

  return GlowrampProgram;
})(_program2['default']);

exports['default'] = GlowrampProgram;
module.exports = exports['default'];
},{"../program":45,"../utils":51}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _program = require('../program');

var _program2 = _interopRequireDefault(_program);

var _utils = require('../utils');

/**
 * And OpaqueProgram is a Program used to draw opaque drawables
 *
 * @extends {Program}
 */

var OpaqueProgram = (function (_Program) {
  _inherits(OpaqueProgram, _Program);

  /**
   * Construct an opaque program given vertex and fragment shader
   * sources.
   * @param  {context} gl      WebGL context
   * @param  {String} vertex   Vertex shader source
   * @param  {String} fragment Fragment shader source
   */

  function OpaqueProgram(gl, vertex, fragment) {
    _classCallCheck(this, OpaqueProgram);

    _get(Object.getPrototypeOf(OpaqueProgram.prototype), 'constructor', this).call(this, gl, vertex, fragment);
  }

  /**
   * Use this program to draw.
   *
   * Sets up the proper culling for drawing opaque objects
   * @param  {Function} fn The draw function
   */

  _createClass(OpaqueProgram, [{
    key: 'use',
    value: function use(fn) {
      if (!this.program) {
        this.init();
      }
      var gl = this._gl;
      gl.useProgram(this.program);
      // init stuffs.
      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.CULL_FACE);
      gl.frontFace(gl.CCW);
      gl.cullFace(gl.BACK);
      gl.depthMask(true);

      fn(this.attributes, this.uniforms);

      (0, _utils.resetGL)(gl);
      //gl.useProgram(0);
    }
  }]);

  return OpaqueProgram;
})(_program2['default']);

exports['default'] = OpaqueProgram;
module.exports = exports['default'];
},{"../program":45,"../utils":51}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBound = require('./gl-bound');

var _glBound2 = _interopRequireDefault(_glBound);

var _glMatrix = require('gl-matrix');

/**
 * ... In retrospect, I'm not sure exactly the purpose this class serves
 * It seems that ObjectRenderer inherits from this class, but it's also
 * the only renderer that's currently used.
 * TODO: Revisit this
 * @extends {GLBound}
 */

var Renderer = (function (_GLBound) {
  _inherits(Renderer, _GLBound);

  /**
   * Construct a renderer given a context and a manager
   * @param  {context} gl           A WebGL context
   * @param  {AssetManager} manager An AssetManager to manage GL-bound
   *                                resources
   */

  function Renderer(gl, manager) {
    _classCallCheck(this, Renderer);

    _get(Object.getPrototypeOf(Renderer.prototype), 'constructor', this).call(this, gl);
    this.manager = manager;
    this.viewProject = _glMatrix.mat4.create();
    this.view = _glMatrix.mat4.create();
    this.project = _glMatrix.mat4.create();
    this.elapsed = 0;
  }

  /**
   * Update the internal view and projection matrices
   * @param  {mat4} view    View matrix
   * @param  {mat4} project Projection matrix
   */

  _createClass(Renderer, [{
    key: 'updateView',
    value: function updateView(camera) {
      this.view = camera.view;
      this.project = camera.project;
      _glMatrix.mat4.multiply(this.viewProject, this.project, this.view);
    }

    /**
     * Actually controls the render loop?
     */
  }, {
    key: 'render',
    value: function render() {
      console.warn("base class renders nothing.");
    }

    /**
     * Updates the internal counter of elapsed time.
     * @param  {Number} delta Time elapsed since last render call
     */
  }, {
    key: 'updateTime',
    value: function updateTime(delta) {
      this.elapsed += delta;
    }
  }]);

  return Renderer;
})(_glBound2['default']);

exports['default'] = Renderer;
module.exports = exports['default'];
},{"./gl-bound":32,"gl-matrix":1}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _renderer = require('../renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _drawable = require('../drawable');

var _drawable2 = _interopRequireDefault(_drawable);

// TODO rework this.

var ObjectRenderer = (function (_Renderer) {
  _inherits(ObjectRenderer, _Renderer);

  function ObjectRenderer(gl, manager) {
    _classCallCheck(this, ObjectRenderer);

    _get(Object.getPrototypeOf(ObjectRenderer.prototype), 'constructor', this).call(this, gl, manager);
    this.drawables = [];
  }

  _createClass(ObjectRenderer, [{
    key: 'addDrawable',
    value: function addDrawable(drawable) {
      var _this = this;

      if (!drawable instanceof _drawable2['default']) {
        throw 'Drawables must always inherit from the base Drawable';
      }
      if (!drawable.init(this.manager)) {
        console.warn('could not initialize drawable: ', drawable);
        return false;
      }
      if (drawable.updateView) {
        drawable.updateView(this.viewProject, null);
      }
      this.drawables.push(drawable);
      drawable.children.forEach(function (c) {
        _this.addDrawable(c);
      });
    }
  }, {
    key: 'removeDrawable',
    value: function removeDrawable(drawable, destroy) {
      for (var i = 0; i < this.drawables.length; i++) {
        if (this.drawables[i] === drawable) {
          this.drawables.splice(i, 1);
          if (destroy) {
            drawable.dispose();
            return true;
          } else {
            return drawable;
          }
        }
      }
      return false;
    }
  }, {
    key: 'addEntity',
    value: function addEntity(entity) {
      for (var i in entity.drawables) {
        this.addDrawable(entity.drawables[i]);
      }
    }
  }, {
    key: 'updateView',
    value: function updateView(camera) {
      _get(Object.getPrototypeOf(ObjectRenderer.prototype), 'updateView', this).call(this, camera);
      var i,
          len = this.drawables.length;
      for (i = 0; i < len; i++) {
        if (this.drawables[i].updateView) {
          this.drawables[i].updateView(this.viewProject, camera);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var i,
          len = this.drawables.length;
      for (i = 0; i < len; i++) {
        this.drawables[i].draw();
      }
    }
  }, {
    key: 'updateTime',
    value: function updateTime(delta) {
      _get(Object.getPrototypeOf(ObjectRenderer.prototype), 'updateTime', this).call(this, delta);
      var i,
          len = this.drawables.length;
      for (i = 0; i < len; i++) {
        // if these return false, remove them from the render loop:
        if (!this.drawables[i].updateTime(delta)) {
          this.drawables.splice(i, 1);
          i--;
          len--;
        }
      }
    }
  }]);

  return ObjectRenderer;
})(_renderer2['default']);

exports['default'] = ObjectRenderer;
module.exports = exports['default'];
},{"../drawable":10,"../renderer":48}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _glBound = require('./gl-bound');

var _glBound2 = _interopRequireDefault(_glBound);

/**
 * A gl-bound texture
 * Supports most (all?) of the texture binding options.
 * Also generates mipmaps if the texture requires it.
 */

var Texture = (function (_GLBound) {
  _inherits(Texture, _GLBound);

  /**
   * Constructs a gl-bound texture, sets all the proper parameters, and binds
   * it to the context
   * @param  {context} gl   A WebGL context
   * @param  {Object} info  Texture parameters
   * @param  {Images} image An image to use as the texture
   */

  function Texture(gl, info, image) {
    _classCallCheck(this, Texture);

    _get(Object.getPrototypeOf(Texture.prototype), 'constructor', this).call(this, gl);
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
    if (/MipMap/.test(info.minFilter)) {
      gl.generateMipmap(gl.TEXTURE_2D);
    }

    gl.bindTexture(gl.TEXTURE_2D, null);

    this.texture = texture;
  }

  /**
   * Bind the texture to a particular texture index
   * @param  {Number} index Texture index to bind to
   */

  _createClass(Texture, [{
    key: 'use',
    value: function use(index) {
      var gl = this._gl;
      index = index || 0;
      gl.bindTexture(gl.TEXTURE_2D, this.texture);
      gl.activeTexture(gl.TEXTURE0 + index);
    }

    /**
     * NYI: TODO
     */
  }, {
    key: 'dispose',
    value: function dispose() {
      // TODO: Figure out when this should be called.
      // noop;
    }
  }]);

  return Texture;
})(_glBound2['default']);

exports['default'] = Texture;
module.exports = exports['default'];
},{"./gl-bound":32}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.resetGL = resetGL;
exports.setParams = setParams;
exports.disco = disco;
exports.generateArtifacts = generateArtifacts;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _drawableTextured = require('./drawable/textured');

var _drawableTextured2 = _interopRequireDefault(_drawableTextured);

/**
 * Reset the GL state to some base state
 * @param  {context} gl A WebGL context
 */

function resetGL(gl) {
  gl.lineWidth(1.0);
  gl.enable(gl.CULL_FACE);
  gl.frontFace(gl.CCW);
  gl.cullFace(gl.BACK);
  gl.enable(gl.DEPTH_TEST);
  gl.blendEquation(gl.FUNC_ADD);
  //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.disable(gl.BLEND);
  gl.depthMask(true);
}

/**
 * Set parameters base on some base set of defaults
 * @param {Object} base  Parameter definition with defaults
 * @param {Object} opts  Options (overrides)
 * @param {Boolean} deep Do deep copying on objects.
 */

function setParams(base, opts, deep) {
  for (var i in base) {
    if (base.hasOwnProperty(i) && opts.hasOwnProperty(i)) {
      if (deep && typeof base[i] == 'object' && typeof opts[i] == 'object') {
        base[i] = setParams(base[i], opts[i], deep);
      } else {
        base[i] = opts[i];
      }
    }
  }
  return base;
}

/**
 * Disco portal animation
 * @param  {Number} delta   Time since last frame
 * @param  {Number} elapsed Total time elapsed
 * @return {Boolean}        Returns true to continue animation
 */

function disco(delta, elapsed) {
  var inc = elapsed / 1000;
  this.uniforms.u_baseColor[0] = Math.sin(inc);
  this.uniforms.u_baseColor[1] = Math.sin(inc + 2 * Math.PI / 3);
  this.uniforms.u_baseColor[2] = Math.sin(inc + 4 * Math.PI / 3);
  return true;
}

function makeArtifact(meshName, textureName) {
  var artifact = (function (_TexturedDrawable) {
    _inherits(artifact, _TexturedDrawable);

    function artifact() {
      _classCallCheck(this, artifact);

      _get(Object.getPrototypeOf(artifact.prototype), 'constructor', this).call(this, _constants2['default'].Program.Textured, meshName, textureName);
    }

    return artifact;
  })(_drawableTextured2['default']);

  return artifact;
}

/**
 * Generate a set of artifacts
 * @param  {String}  series    Series name
 *                             Should match the internal name of the resources
 * @param  {Number}  num       Number of artifacts in the series
 * @param  {Boolean} hasFrozen Whether or not the series also includes frozen
 *                             variants
 * @return {Object}            Object containing artifact drawable classes
 *                             for each artifact.
 */

function generateArtifacts(series, num, hasFrozen) {
  var i,
      meshName,
      textureName = 'Artifact' + series + 'Texture';

  var artifacts = {};

  for (i = 1; i <= num; i++) {
    meshName = series + i;
    artifacts['' + i] = makeArtifact(meshName, textureName);
  }
  if (hasFrozen) {
    for (i = 1; i <= num; i++) {
      meshName = series + 'Frozen' + i;
      artifacts['Frozen' + i] = makeArtifact(meshName, textureName);
    }
  }

  return artifacts;
}
},{"./constants":9,"./drawable/textured":25}],52:[function(require,module,exports){
/**
 * A vertex attribute
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VertexAttribute =
/**
 * A vertex attribute
 * @param  {String} name Name of the attribute
 * @param  {Number} size Size of the attribute (in bytes)
 */
function VertexAttribute(name, size) {
  _classCallCheck(this, VertexAttribute);

  this.name = name;
  this.size = size;
};

exports["default"] = VertexAttribute;
module.exports = exports["default"];
},{}]},{},[36])(36)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0cml4L2Rpc3QvZ2wtbWF0cml4LmpzIiwibm9kZV9tb2R1bGVzL2phdmEtZGVzZXJpYWxpemVyL2Rpc3QvamF2YS1kZXNlcmlhbGl6ZXIubWluLmpzIiwibm9kZV9tb2R1bGVzL2xpYnRnYS9kaXN0L2xpYnRnYS5taW4uanMiLCJzcmMvYW5pbWF0aW9uL2FuaW1hdGlvbi5qcyIsInNyYy9hbmltYXRpb24vZWFzaW5nLmpzIiwic3JjL2Fzc2V0LWxvYWRlci5qcyIsInNyYy9hc3NldC1tYW5hZ2VyLmpzIiwic3JjL2NhbWVyYS5qcyIsInNyYy9jb25zdGFudHMuanMiLCJzcmMvZHJhd2FibGUuanMiLCJzcmMvZHJhd2FibGUvYXRtb3NwaGVyZS5qcyIsInNyYy9kcmF3YWJsZS9iaWNvbG9yZWQuanMiLCJzcmMvZHJhd2FibGUvZ2xvd3JhbXAuanMiLCJzcmMvZHJhd2FibGUvaW52ZW50b3J5LmpzIiwic3JjL2RyYXdhYmxlL2xpbmsuanMiLCJzcmMvZHJhd2FibGUvb3JuYW1lbnQuanMiLCJzcmMvZHJhd2FibGUvcGFydGljbGUtcG9ydGFsLmpzIiwic3JjL2RyYXdhYmxlL3BhcnRpY2xlLmpzIiwic3JjL2RyYXdhYmxlL3BvcnRhbC1saW5rLmpzIiwic3JjL2RyYXdhYmxlL3Jlc29uYXRvci1saW5rLmpzIiwic3JjL2RyYXdhYmxlL3Jlc291cmNlLmpzIiwic3JjL2RyYXdhYmxlL3NoaWVsZC1lZmZlY3QuanMiLCJzcmMvZHJhd2FibGUvc3BoZXJpY2FsLXBvcnRhbC1saW5rLmpzIiwic3JjL2RyYXdhYmxlL3RleHR1cmVkLXNwaGVyZS5qcyIsInNyYy9kcmF3YWJsZS90ZXh0dXJlZC5qcyIsInNyYy9kcmF3YWJsZS93b3JsZC5qcyIsInNyYy9kcmF3YWJsZS94bS5qcyIsInNyYy9lbmdpbmUuanMiLCJzcmMvZW50aXR5LmpzIiwic3JjL2VudGl0eS9pbnZlbnRvcnkuanMiLCJzcmMvZW50aXR5L3BvcnRhbC5qcyIsInNyYy9nbC1ib3VuZC5qcyIsInNyYy9nbC9nbC1hdHRyaWJ1dGUuanMiLCJzcmMvZ2wvZ2wtYnVmZmVyLmpzIiwic3JjL2dsL2dsLWluZGV4LmpzIiwic3JjL2luZ3Jlc3MtbW9kZWwtdmlld2VyLmpzIiwic3JjL21lc2guanMiLCJzcmMvbWVzaC9maWxlLmpzIiwic3JjL21lc2gvcGFydGljbGUtcG9ydGFsLmpzIiwic3JjL21lc2gvcG9ydGFsLWxpbmsuanMiLCJzcmMvbWVzaC9yZXNvbmF0b3ItbGluay5qcyIsInNyYy9tZXNoL3NwaGVyZS5qcyIsInNyYy9tZXNoL3NwaGVyaWNhbC1wb3J0YWwtbGluay5qcyIsInNyYy9vcmJpdC1jb250cm9scy5qcyIsInNyYy9wcm9ncmFtLmpzIiwic3JjL3Byb2dyYW0vZ2xvd3JhbXAuanMiLCJzcmMvcHJvZ3JhbS9vcGFxdWUuanMiLCJzcmMvcmVuZGVyZXIuanMiLCJzcmMvcmVuZGVyZXIvb2JqZWN0LmpzIiwic3JjL3RleHR1cmUuanMiLCJzcmMvdXRpbHMuanMiLCJzcmMvdmVydGV4LWF0dHJpYnV0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4cElBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IGdsLW1hdHJpeCAtIEhpZ2ggcGVyZm9ybWFuY2UgbWF0cml4IGFuZCB2ZWN0b3Igb3BlcmF0aW9uc1xuICogQGF1dGhvciBCcmFuZG9uIEpvbmVzXG4gKiBAYXV0aG9yIENvbGluIE1hY0tlbnppZSBJVlxuICogQHZlcnNpb24gMi4yLjFcbiAqL1xuXG4vKiBDb3B5cmlnaHQgKGMpIDIwMTMsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbmFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICAgIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkVcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuXG4oZnVuY3Rpb24oX2dsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgc2hpbSA9IHt9O1xuICBpZiAodHlwZW9mKGV4cG9ydHMpID09PSAndW5kZWZpbmVkJykge1xuICAgIGlmKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICBzaGltLmV4cG9ydHMgPSB7fTtcbiAgICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHNoaW0uZXhwb3J0cztcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBnbC1tYXRyaXggbGl2ZXMgaW4gYSBicm93c2VyLCBkZWZpbmUgaXRzIG5hbWVzcGFjZXMgaW4gZ2xvYmFsXG4gICAgICBzaGltLmV4cG9ydHMgPSB0eXBlb2Yod2luZG93KSAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBfZ2xvYmFsO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICAvLyBnbC1tYXRyaXggbGl2ZXMgaW4gY29tbW9uanMsIGRlZmluZSBpdHMgbmFtZXNwYWNlcyBpbiBleHBvcnRzXG4gICAgc2hpbS5leHBvcnRzID0gZXhwb3J0cztcbiAgfVxuXG4gIChmdW5jdGlvbihleHBvcnRzKSB7XG4gICAgLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuXG5pZighR0xNQVRfRVBTSUxPTikge1xuICAgIHZhciBHTE1BVF9FUFNJTE9OID0gMC4wMDAwMDE7XG59XG5cbmlmKCFHTE1BVF9BUlJBWV9UWVBFKSB7XG4gICAgdmFyIEdMTUFUX0FSUkFZX1RZUEUgPSAodHlwZW9mIEZsb2F0MzJBcnJheSAhPT0gJ3VuZGVmaW5lZCcpID8gRmxvYXQzMkFycmF5IDogQXJyYXk7XG59XG5cbmlmKCFHTE1BVF9SQU5ET00pIHtcbiAgICB2YXIgR0xNQVRfUkFORE9NID0gTWF0aC5yYW5kb207XG59XG5cbi8qKlxuICogQGNsYXNzIENvbW1vbiB1dGlsaXRpZXNcbiAqIEBuYW1lIGdsTWF0cml4XG4gKi9cbnZhciBnbE1hdHJpeCA9IHt9O1xuXG4vKipcbiAqIFNldHMgdGhlIHR5cGUgb2YgYXJyYXkgdXNlZCB3aGVuIGNyZWF0aW5nIG5ldyB2ZWN0b3JzIGFuZCBtYXRyaWNpZXNcbiAqXG4gKiBAcGFyYW0ge1R5cGV9IHR5cGUgQXJyYXkgdHlwZSwgc3VjaCBhcyBGbG9hdDMyQXJyYXkgb3IgQXJyYXlcbiAqL1xuZ2xNYXRyaXguc2V0TWF0cml4QXJyYXlUeXBlID0gZnVuY3Rpb24odHlwZSkge1xuICAgIEdMTUFUX0FSUkFZX1RZUEUgPSB0eXBlO1xufVxuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy5nbE1hdHJpeCA9IGdsTWF0cml4O1xufVxuXG52YXIgZGVncmVlID0gTWF0aC5QSSAvIDE4MDtcblxuLyoqXG4qIENvbnZlcnQgRGVncmVlIFRvIFJhZGlhblxuKlxuKiBAcGFyYW0ge051bWJlcn0gQW5nbGUgaW4gRGVncmVlc1xuKi9cbmdsTWF0cml4LnRvUmFkaWFuID0gZnVuY3Rpb24oYSl7XG4gICAgIHJldHVybiBhICogZGVncmVlO1xufVxuO1xuLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuLyoqXG4gKiBAY2xhc3MgMiBEaW1lbnNpb25hbCBWZWN0b3JcbiAqIEBuYW1lIHZlYzJcbiAqL1xuXG52YXIgdmVjMiA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcsIGVtcHR5IHZlYzJcbiAqXG4gKiBAcmV0dXJucyB7dmVjMn0gYSBuZXcgMkQgdmVjdG9yXG4gKi9cbnZlYzIuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDIpO1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzIgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIGNsb25lXG4gKiBAcmV0dXJucyB7dmVjMn0gYSBuZXcgMkQgdmVjdG9yXG4gKi9cbnZlYzIuY2xvbmUgPSBmdW5jdGlvbihhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDIpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzIgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjMn0gYSBuZXcgMkQgdmVjdG9yXG4gKi9cbnZlYzIuZnJvbVZhbHVlcyA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoMik7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWMyIHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBzb3VyY2UgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuc2V0ID0gZnVuY3Rpb24ob3V0LCB4LCB5KSB7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5hZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdmVjdG9yIGIgZnJvbSB2ZWN0b3IgYVxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5zdWJ0cmFjdCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5zdWJ0cmFjdH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLnN1YiA9IHZlYzIuc3VidHJhY3Q7XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLm11bHRpcGx5ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAqIGJbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzIubXVsID0gdmVjMi5tdWx0aXBseTtcblxuLyoqXG4gKiBEaXZpZGVzIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuZGl2aWRlID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAvIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAvIGJbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLmRpdmlkZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLmRpdiA9IHZlYzIuZGl2aWRlO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5taW4gPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG9mIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIubWF4ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIGEgdmVjMiBieSBhIHNjYWxhciBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWMyJ3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi5zY2FsZUFuZEFkZCA9IGZ1bmN0aW9uKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgKGJbMF0gKiBzY2FsZSk7XG4gICAgb3V0WzFdID0gYVsxXSArIChiWzFdICogc2NhbGUpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG52ZWMyLmRpc3RhbmNlID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHgqeCArIHkqeSk7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5kaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMyLmRpc3QgPSB2ZWMyLmRpc3RhbmNlO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzInc1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xudmVjMi5zcXVhcmVkRGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdO1xuICAgIHJldHVybiB4KnggKyB5Knk7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5zcXVhcmVkRGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5zcXJEaXN0ID0gdmVjMi5zcXVhcmVkRGlzdGFuY2U7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqL1xudmVjMi5sZW5ndGggPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkpO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIubGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzIubGVuID0gdmVjMi5sZW5ndGg7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAqL1xudmVjMi5zcXVhcmVkTGVuZ3RoID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIHJldHVybiB4KnggKyB5Knk7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5zcXVhcmVkTGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzIuc3FyTGVuID0gdmVjMi5zcXVhcmVkTGVuZ3RoO1xuXG4vKipcbiAqIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB2ZWN0b3IgdG8gbmVnYXRlXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIubmVnYXRlID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gLWFbMF07XG4gICAgb3V0WzFdID0gLWFbMV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTm9ybWFsaXplIGEgdmVjMlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdmVjdG9yIHRvIG5vcm1hbGl6ZVxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgdmFyIGxlbiA9IHgqeCArIHkqeTtcbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAvL1RPRE86IGV2YWx1YXRlIHVzZSBvZiBnbG1faW52c3FydCBoZXJlP1xuICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKiBsZW47XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBsZW47XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWMyJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xudmVjMi5kb3QgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdO1xufTtcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjMidzXG4gKiBOb3RlIHRoYXQgdGhlIGNyb3NzIHByb2R1Y3QgbXVzdCBieSBkZWZpbml0aW9uIHByb2R1Y2UgYSAzRCB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzIuY3Jvc3MgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICB2YXIgeiA9IGFbMF0gKiBiWzFdIC0gYVsxXSAqIGJbMF07XG4gICAgb3V0WzBdID0gb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSB6O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMidzXG4gKlxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLmxlcnAgPSBmdW5jdGlvbiAob3V0LCBhLCBiLCB0KSB7XG4gICAgdmFyIGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdO1xuICAgIG91dFswXSA9IGF4ICsgdCAqIChiWzBdIC0gYXgpO1xuICAgIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IFtzY2FsZV0gTGVuZ3RoIG9mIHRoZSByZXN1bHRpbmcgdmVjdG9yLiBJZiBvbW1pdHRlZCwgYSB1bml0IHZlY3RvciB3aWxsIGJlIHJldHVybmVkXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIucmFuZG9tID0gZnVuY3Rpb24gKG91dCwgc2NhbGUpIHtcbiAgICBzY2FsZSA9IHNjYWxlIHx8IDEuMDtcbiAgICB2YXIgciA9IEdMTUFUX1JBTkRPTSgpICogMi4wICogTWF0aC5QSTtcbiAgICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHNjYWxlO1xuICAgIG91dFsxXSA9IE1hdGguc2luKHIpICogc2NhbGU7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0MlxuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0Mn0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi50cmFuc2Zvcm1NYXQyID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bMl0gKiB5O1xuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVszXSAqIHk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0MmRcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDJkfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzJ9IG91dFxuICovXG52ZWMyLnRyYW5zZm9ybU1hdDJkID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bMl0gKiB5ICsgbVs0XTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bM10gKiB5ICsgbVs1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQzXG4gKiAzcmQgdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xuICpcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0M30gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAqL1xudmVjMi50cmFuc2Zvcm1NYXQzID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bM10gKiB5ICsgbVs2XTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNF0gKiB5ICsgbVs3XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQ0XG4gKiAzcmQgdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcwJ1xuICogNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gKi9cbnZlYzIudHJhbnNmb3JtTWF0NCA9IGZ1bmN0aW9uKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSwgXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzEyXTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVsxM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzJzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzIuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWMycyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxuICogQHJldHVybnMge0FycmF5fSBhXG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMi5mb3JFYWNoID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ZWMgPSB2ZWMyLmNyZWF0ZSgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGEsIHN0cmlkZSwgb2Zmc2V0LCBjb3VudCwgZm4sIGFyZykge1xuICAgICAgICB2YXIgaSwgbDtcbiAgICAgICAgaWYoIXN0cmlkZSkge1xuICAgICAgICAgICAgc3RyaWRlID0gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFvZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGNvdW50KSB7XG4gICAgICAgICAgICBsID0gTWF0aC5taW4oKGNvdW50ICogc3RyaWRlKSArIG9mZnNldCwgYS5sZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbCA9IGEubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgICAgICAgdmVjWzBdID0gYVtpXTsgdmVjWzFdID0gYVtpKzFdO1xuICAgICAgICAgICAgZm4odmVjLCB2ZWMsIGFyZyk7XG4gICAgICAgICAgICBhW2ldID0gdmVjWzBdOyBhW2krMV0gPSB2ZWNbMV07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBhO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzJ9IHZlYyB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG52ZWMyLnN0ciA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuICd2ZWMyKCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnKSc7XG59O1xuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy52ZWMyID0gdmVjMjtcbn1cbjtcbi8qIENvcHlyaWdodCAoYykgMjAxMywgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuICovXG5cbi8qKlxuICogQGNsYXNzIDMgRGltZW5zaW9uYWwgVmVjdG9yXG4gKiBAbmFtZSB2ZWMzXG4gKi9cblxudmFyIHZlYzMgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWMzXG4gKlxuICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxuICovXG52ZWMzLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSgzKTtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzMgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIGNsb25lXG4gKiBAcmV0dXJucyB7dmVjM30gYSBuZXcgM0QgdmVjdG9yXG4gKi9cbnZlYzMuY2xvbmUgPSBmdW5jdGlvbihhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDMpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjM30gYSBuZXcgM0QgdmVjdG9yXG4gKi9cbnZlYzMuZnJvbVZhbHVlcyA9IGZ1bmN0aW9uKHgsIHksIHopIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoMyk7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIG91dFsyXSA9IHo7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzMgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5jb3B5ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMyB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5zZXQgPSBmdW5jdGlvbihvdXQsIHgsIHksIHopIHtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuYWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuc3VidHJhY3QgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuc3VidHJhY3R9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5zdWIgPSB2ZWMzLnN1YnRyYWN0O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5tdWx0aXBseSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLm11bCA9IHZlYzMubXVsdGlwbHk7XG5cbi8qKlxuICogRGl2aWRlcyB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLmRpdmlkZSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLyBiWzJdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5kaXZpZGV9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5kaXYgPSB2ZWMzLmRpdmlkZTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMubWluID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5taW4oYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5taW4oYVsxXSwgYlsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5taW4oYVsyXSwgYlsyXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLm1heCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pO1xuICAgIG91dFsyXSA9IE1hdGgubWF4KGFbMl0sIGJbMl0pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNjYWxlcyBhIHZlYzMgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnNjYWxlID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGI7XG4gICAgb3V0WzFdID0gYVsxXSAqIGI7XG4gICAgb3V0WzJdID0gYVsyXSAqIGI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWRkcyB0d28gdmVjMydzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYiBieSBiZWZvcmUgYWRkaW5nXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuc2NhbGVBbmRBZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIsIHNjYWxlKSB7XG4gICAgb3V0WzBdID0gYVswXSArIChiWzBdICogc2NhbGUpO1xuICAgIG91dFsxXSA9IGFbMV0gKyAoYlsxXSAqIHNjYWxlKTtcbiAgICBvdXRbMl0gPSBhWzJdICsgKGJbMl0gKiBzY2FsZSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbnZlYzMuZGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdLFxuICAgICAgICB6ID0gYlsyXSAtIGFbMl07XG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuZGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5kaXN0ID0gdmVjMy5kaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbnZlYzMuc3F1YXJlZERpc3RhbmNlID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICAgICAgeiA9IGJbMl0gLSBhWzJdO1xuICAgIHJldHVybiB4KnggKyB5KnkgKyB6Kno7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5zcXVhcmVkRGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5zcXJEaXN0ID0gdmVjMy5zcXVhcmVkRGlzdGFuY2U7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqL1xudmVjMy5sZW5ndGggPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6KTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLmxlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWMzLmxlbiA9IHZlYzMubGVuZ3RoO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gKi9cbnZlYzMuc3F1YXJlZExlbmd0aCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl07XG4gICAgcmV0dXJuIHgqeCArIHkqeSArIHoqejtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnNxdWFyZWRMZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5zcXJMZW4gPSB2ZWMzLnNxdWFyZWRMZW5ndGg7XG5cbi8qKlxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBuZWdhdGVcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5uZWdhdGUgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSAtYVswXTtcbiAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICBvdXRbMl0gPSAtYVsyXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBOb3JtYWxpemUgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMubm9ybWFsaXplID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl07XG4gICAgdmFyIGxlbiA9IHgqeCArIHkqeSArIHoqejtcbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAvL1RPRE86IGV2YWx1YXRlIHVzZSBvZiBnbG1faW52c3FydCBoZXJlP1xuICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKiBsZW47XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBsZW47XG4gICAgICAgIG91dFsyXSA9IGFbMl0gKiBsZW47XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xudmVjMy5kb3QgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl07XG59O1xuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMuY3Jvc3MgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSxcbiAgICAgICAgYnggPSBiWzBdLCBieSA9IGJbMV0sIGJ6ID0gYlsyXTtcblxuICAgIG91dFswXSA9IGF5ICogYnogLSBheiAqIGJ5O1xuICAgIG91dFsxXSA9IGF6ICogYnggLSBheCAqIGJ6O1xuICAgIG91dFsyXSA9IGF4ICogYnkgLSBheSAqIGJ4O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLmxlcnAgPSBmdW5jdGlvbiAob3V0LCBhLCBiLCB0KSB7XG4gICAgdmFyIGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdLFxuICAgICAgICBheiA9IGFbMl07XG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gICAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gICAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheik7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy5yYW5kb20gPSBmdW5jdGlvbiAob3V0LCBzY2FsZSkge1xuICAgIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuXG4gICAgdmFyIHIgPSBHTE1BVF9SQU5ET00oKSAqIDIuMCAqIE1hdGguUEk7XG4gICAgdmFyIHogPSAoR0xNQVRfUkFORE9NKCkgKiAyLjApIC0gMS4wO1xuICAgIHZhciB6U2NhbGUgPSBNYXRoLnNxcnQoMS4wLXoqeikgKiBzY2FsZTtcblxuICAgIG91dFswXSA9IE1hdGguY29zKHIpICogelNjYWxlO1xuICAgIG91dFsxXSA9IE1hdGguc2luKHIpICogelNjYWxlO1xuICAgIG91dFsyXSA9IHogKiBzY2FsZTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBtYXQ0LlxuICogNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge21hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbnZlYzMudHJhbnNmb3JtTWF0NCA9IGZ1bmN0aW9uKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdO1xuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzldICogeiArIG1bMTNdO1xuICAgIG91dFsyXSA9IG1bMl0gKiB4ICsgbVs2XSAqIHkgKyBtWzEwXSAqIHogKyBtWzE0XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBtYXQzLlxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0NH0gbSB0aGUgM3gzIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG52ZWMzLnRyYW5zZm9ybU1hdDMgPSBmdW5jdGlvbihvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXTtcbiAgICBvdXRbMF0gPSB4ICogbVswXSArIHkgKiBtWzNdICsgeiAqIG1bNl07XG4gICAgb3V0WzFdID0geCAqIG1bMV0gKyB5ICogbVs0XSArIHogKiBtWzddO1xuICAgIG91dFsyXSA9IHggKiBtWzJdICsgeSAqIG1bNV0gKyB6ICogbVs4XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBxdWF0XG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHtxdWF0fSBxIHF1YXRlcm5pb24gdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xudmVjMy50cmFuc2Zvcm1RdWF0ID0gZnVuY3Rpb24ob3V0LCBhLCBxKSB7XG4gICAgLy8gYmVuY2htYXJrczogaHR0cDovL2pzcGVyZi5jb20vcXVhdGVybmlvbi10cmFuc2Zvcm0tdmVjMy1pbXBsZW1lbnRhdGlvbnNcblxuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdLFxuICAgICAgICBxeCA9IHFbMF0sIHF5ID0gcVsxXSwgcXogPSBxWzJdLCBxdyA9IHFbM10sXG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHF1YXQgKiB2ZWNcbiAgICAgICAgaXggPSBxdyAqIHggKyBxeSAqIHogLSBxeiAqIHksXG4gICAgICAgIGl5ID0gcXcgKiB5ICsgcXogKiB4IC0gcXggKiB6LFxuICAgICAgICBpeiA9IHF3ICogeiArIHF4ICogeSAtIHF5ICogeCxcbiAgICAgICAgaXcgPSAtcXggKiB4IC0gcXkgKiB5IC0gcXogKiB6O1xuXG4gICAgLy8gY2FsY3VsYXRlIHJlc3VsdCAqIGludmVyc2UgcXVhdFxuICAgIG91dFswXSA9IGl4ICogcXcgKyBpdyAqIC1xeCArIGl5ICogLXF6IC0gaXogKiAtcXk7XG4gICAgb3V0WzFdID0gaXkgKiBxdyArIGl3ICogLXF5ICsgaXogKiAtcXggLSBpeCAqIC1xejtcbiAgICBvdXRbMl0gPSBpeiAqIHF3ICsgaXcgKiAtcXogKyBpeCAqIC1xeSAtIGl5ICogLXF4O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKlxuKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB4LWF4aXNcbiogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXG4qIEBwYXJhbSB7dmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcbiogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4qIEBwYXJhbSB7TnVtYmVyfSBjIFRoZSBhbmdsZSBvZiByb3RhdGlvblxuKiBAcmV0dXJucyB7dmVjM30gb3V0XG4qL1xudmVjMy5yb3RhdGVYID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBjKXtcbiAgIHZhciBwID0gW10sIHI9W107XG5cdCAgLy9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuXHQgIHBbMF0gPSBhWzBdIC0gYlswXTtcblx0ICBwWzFdID0gYVsxXSAtIGJbMV07XG4gIFx0cFsyXSA9IGFbMl0gLSBiWzJdO1xuXG5cdCAgLy9wZXJmb3JtIHJvdGF0aW9uXG5cdCAgclswXSA9IHBbMF07XG5cdCAgclsxXSA9IHBbMV0qTWF0aC5jb3MoYykgLSBwWzJdKk1hdGguc2luKGMpO1xuXHQgIHJbMl0gPSBwWzFdKk1hdGguc2luKGMpICsgcFsyXSpNYXRoLmNvcyhjKTtcblxuXHQgIC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cblx0ICBvdXRbMF0gPSByWzBdICsgYlswXTtcblx0ICBvdXRbMV0gPSByWzFdICsgYlsxXTtcblx0ICBvdXRbMl0gPSByWzJdICsgYlsyXTtcblxuICBcdHJldHVybiBvdXQ7XG59O1xuXG4vKlxuKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB5LWF4aXNcbiogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXG4qIEBwYXJhbSB7dmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcbiogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4qIEBwYXJhbSB7TnVtYmVyfSBjIFRoZSBhbmdsZSBvZiByb3RhdGlvblxuKiBAcmV0dXJucyB7dmVjM30gb3V0XG4qL1xudmVjMy5yb3RhdGVZID0gZnVuY3Rpb24ob3V0LCBhLCBiLCBjKXtcbiAgXHR2YXIgcCA9IFtdLCByPVtdO1xuICBcdC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cbiAgXHRwWzBdID0gYVswXSAtIGJbMF07XG4gIFx0cFsxXSA9IGFbMV0gLSBiWzFdO1xuICBcdHBbMl0gPSBhWzJdIC0gYlsyXTtcbiAgXG4gIFx0Ly9wZXJmb3JtIHJvdGF0aW9uXG4gIFx0clswXSA9IHBbMl0qTWF0aC5zaW4oYykgKyBwWzBdKk1hdGguY29zKGMpO1xuICBcdHJbMV0gPSBwWzFdO1xuICBcdHJbMl0gPSBwWzJdKk1hdGguY29zKGMpIC0gcFswXSpNYXRoLnNpbihjKTtcbiAgXG4gIFx0Ly90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuICBcdG91dFswXSA9IHJbMF0gKyBiWzBdO1xuICBcdG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuICBcdG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuICBcbiAgXHRyZXR1cm4gb3V0O1xufTtcblxuLypcbiogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgei1heGlzXG4qIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuKiBAcGFyYW0ge3ZlYzN9IGEgVGhlIHZlYzMgcG9pbnQgdG8gcm90YXRlXG4qIEBwYXJhbSB7dmVjM30gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxuKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgYW5nbGUgb2Ygcm90YXRpb25cbiogQHJldHVybnMge3ZlYzN9IG91dFxuKi9cbnZlYzMucm90YXRlWiA9IGZ1bmN0aW9uKG91dCwgYSwgYiwgYyl7XG4gIFx0dmFyIHAgPSBbXSwgcj1bXTtcbiAgXHQvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gIFx0cFswXSA9IGFbMF0gLSBiWzBdO1xuICBcdHBbMV0gPSBhWzFdIC0gYlsxXTtcbiAgXHRwWzJdID0gYVsyXSAtIGJbMl07XG4gIFxuICBcdC8vcGVyZm9ybSByb3RhdGlvblxuICBcdHJbMF0gPSBwWzBdKk1hdGguY29zKGMpIC0gcFsxXSpNYXRoLnNpbihjKTtcbiAgXHRyWzFdID0gcFswXSpNYXRoLnNpbihjKSArIHBbMV0qTWF0aC5jb3MoYyk7XG4gIFx0clsyXSA9IHBbMl07XG4gIFxuICBcdC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cbiAgXHRvdXRbMF0gPSByWzBdICsgYlswXTtcbiAgXHRvdXRbMV0gPSByWzFdICsgYlsxXTtcbiAgXHRvdXRbMl0gPSByWzJdICsgYlsyXTtcbiAgXG4gIFx0cmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzNzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzMuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWMzcyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxuICogQHJldHVybnMge0FycmF5fSBhXG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjMy5mb3JFYWNoID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ZWMgPSB2ZWMzLmNyZWF0ZSgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGEsIHN0cmlkZSwgb2Zmc2V0LCBjb3VudCwgZm4sIGFyZykge1xuICAgICAgICB2YXIgaSwgbDtcbiAgICAgICAgaWYoIXN0cmlkZSkge1xuICAgICAgICAgICAgc3RyaWRlID0gMztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFvZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGNvdW50KSB7XG4gICAgICAgICAgICBsID0gTWF0aC5taW4oKGNvdW50ICogc3RyaWRlKSArIG9mZnNldCwgYS5sZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbCA9IGEubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgICAgICAgdmVjWzBdID0gYVtpXTsgdmVjWzFdID0gYVtpKzFdOyB2ZWNbMl0gPSBhW2krMl07XG4gICAgICAgICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgICAgICAgIGFbaV0gPSB2ZWNbMF07IGFbaSsxXSA9IHZlY1sxXTsgYVtpKzJdID0gdmVjWzJdO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYTtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWMzfSB2ZWMgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xudmVjMy5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAndmVjMygnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnKSc7XG59O1xuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy52ZWMzID0gdmVjMztcbn1cbjtcbi8qIENvcHlyaWdodCAoYykgMjAxMywgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuICovXG5cbi8qKlxuICogQGNsYXNzIDQgRGltZW5zaW9uYWwgVmVjdG9yXG4gKiBAbmFtZSB2ZWM0XG4gKi9cblxudmFyIHZlYzQgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWM0XG4gKlxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICovXG52ZWM0LmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjNCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gY2xvbmVcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAqL1xudmVjNC5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoNCk7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzQgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAqL1xudmVjNC5mcm9tVmFsdWVzID0gZnVuY3Rpb24oeCwgeSwgeiwgdykge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICBvdXRbM10gPSB3O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWM0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBzb3VyY2UgdmVjdG9yXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNCB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuc2V0ID0gZnVuY3Rpb24ob3V0LCB4LCB5LCB6LCB3KSB7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIG91dFsyXSA9IHo7XG4gICAgb3V0WzNdID0gdztcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuYWRkID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSArIGJbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuc3VidHJhY3QgPSBmdW5jdGlvbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdIC0gYlszXTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuc3VidHJhY3R9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5zdWIgPSB2ZWM0LnN1YnRyYWN0O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5tdWx0aXBseSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gKiBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0Lm11bCA9IHZlYzQubXVsdGlwbHk7XG5cbi8qKlxuICogRGl2aWRlcyB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LmRpdmlkZSA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLyBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gLyBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5kaXZpZGV9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5kaXYgPSB2ZWM0LmRpdmlkZTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQubWluID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5taW4oYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5taW4oYVsxXSwgYlsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5taW4oYVsyXSwgYlsyXSk7XG4gICAgb3V0WzNdID0gTWF0aC5taW4oYVszXSwgYlszXSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0Lm1heCA9IGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pO1xuICAgIG91dFsyXSA9IE1hdGgubWF4KGFbMl0sIGJbMl0pO1xuICAgIG91dFszXSA9IE1hdGgubWF4KGFbM10sIGJbM10pO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNjYWxlcyBhIHZlYzQgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LnNjYWxlID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGI7XG4gICAgb3V0WzFdID0gYVsxXSAqIGI7XG4gICAgb3V0WzJdID0gYVsyXSAqIGI7XG4gICAgb3V0WzNdID0gYVszXSAqIGI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWRkcyB0d28gdmVjNCdzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYiBieSBiZWZvcmUgYWRkaW5nXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQuc2NhbGVBbmRBZGQgPSBmdW5jdGlvbihvdXQsIGEsIGIsIHNjYWxlKSB7XG4gICAgb3V0WzBdID0gYVswXSArIChiWzBdICogc2NhbGUpO1xuICAgIG91dFsxXSA9IGFbMV0gKyAoYlsxXSAqIHNjYWxlKTtcbiAgICBvdXRbMl0gPSBhWzJdICsgKGJbMl0gKiBzY2FsZSk7XG4gICAgb3V0WzNdID0gYVszXSArIChiWzNdICogc2NhbGUpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG52ZWM0LmRpc3RhbmNlID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICAgICAgeiA9IGJbMl0gLSBhWzJdLFxuICAgICAgICB3ID0gYlszXSAtIGFbM107XG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnogKyB3KncpO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuZGlzdGFuY2V9XG4gKiBAZnVuY3Rpb25cbiAqL1xudmVjNC5kaXN0ID0gdmVjNC5kaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbnZlYzQuc3F1YXJlZERpc3RhbmNlID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICAgICAgeiA9IGJbMl0gLSBhWzJdLFxuICAgICAgICB3ID0gYlszXSAtIGFbM107XG4gICAgcmV0dXJuIHgqeCArIHkqeSArIHoqeiArIHcqdztcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LnNxdWFyZWREaXN0YW5jZX1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0LnNxckRpc3QgPSB2ZWM0LnNxdWFyZWREaXN0YW5jZTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG52ZWM0Lmxlbmd0aCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl0sXG4gICAgICAgIHcgPSBhWzNdO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6ICsgdyp3KTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0Lmxlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG52ZWM0LmxlbiA9IHZlYzQubGVuZ3RoO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gKi9cbnZlYzQuc3F1YXJlZExlbmd0aCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl0sXG4gICAgICAgIHcgPSBhWzNdO1xuICAgIHJldHVybiB4KnggKyB5KnkgKyB6KnogKyB3Knc7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5zcXVhcmVkTGVuZ3RofVxuICogQGZ1bmN0aW9uXG4gKi9cbnZlYzQuc3FyTGVuID0gdmVjNC5zcXVhcmVkTGVuZ3RoO1xuXG4vKipcbiAqIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gbmVnYXRlXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbnZlYzQubmVnYXRlID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gLWFbMF07XG4gICAgb3V0WzFdID0gLWFbMV07XG4gICAgb3V0WzJdID0gLWFbMl07XG4gICAgb3V0WzNdID0gLWFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTm9ybWFsaXplIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIG5vcm1hbGl6ZVxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0Lm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdLFxuICAgICAgICB3ID0gYVszXTtcbiAgICB2YXIgbGVuID0geCp4ICsgeSp5ICsgeip6ICsgdyp3O1xuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICAgICAgb3V0WzBdID0gYVswXSAqIGxlbjtcbiAgICAgICAgb3V0WzFdID0gYVsxXSAqIGxlbjtcbiAgICAgICAgb3V0WzJdID0gYVsyXSAqIGxlbjtcbiAgICAgICAgb3V0WzNdID0gYVszXSAqIGxlbjtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICovXG52ZWM0LmRvdCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXSArIGFbM10gKiBiWzNdO1xufTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50IGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5sZXJwID0gZnVuY3Rpb24gKG91dCwgYSwgYiwgdCkge1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdLFxuICAgICAgICBhdyA9IGFbM107XG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gICAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gICAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheik7XG4gICAgb3V0WzNdID0gYXcgKyB0ICogKGJbM10gLSBhdyk7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC5yYW5kb20gPSBmdW5jdGlvbiAob3V0LCBzY2FsZSkge1xuICAgIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuXG4gICAgLy9UT0RPOiBUaGlzIGlzIGEgcHJldHR5IGF3ZnVsIHdheSBvZiBkb2luZyB0aGlzLiBGaW5kIHNvbWV0aGluZyBiZXR0ZXIuXG4gICAgb3V0WzBdID0gR0xNQVRfUkFORE9NKCk7XG4gICAgb3V0WzFdID0gR0xNQVRfUkFORE9NKCk7XG4gICAgb3V0WzJdID0gR0xNQVRfUkFORE9NKCk7XG4gICAgb3V0WzNdID0gR0xNQVRfUkFORE9NKCk7XG4gICAgdmVjNC5ub3JtYWxpemUob3V0LCBvdXQpO1xuICAgIHZlYzQuc2NhbGUob3V0LCBvdXQsIHNjYWxlKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWM0IHdpdGggYSBtYXQ0LlxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xudmVjNC50cmFuc2Zvcm1NYXQ0ID0gZnVuY3Rpb24ob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl0sIHcgPSBhWzNdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdICogdztcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHogKyBtWzEzXSAqIHc7XG4gICAgb3V0WzJdID0gbVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdICogdztcbiAgICBvdXRbM10gPSBtWzNdICogeCArIG1bN10gKiB5ICsgbVsxMV0gKiB6ICsgbVsxNV0gKiB3O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzQgd2l0aCBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge3F1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG52ZWM0LnRyYW5zZm9ybVF1YXQgPSBmdW5jdGlvbihvdXQsIGEsIHEpIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXSxcbiAgICAgICAgcXggPSBxWzBdLCBxeSA9IHFbMV0sIHF6ID0gcVsyXSwgcXcgPSBxWzNdLFxuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjXG4gICAgICAgIGl4ID0gcXcgKiB4ICsgcXkgKiB6IC0gcXogKiB5LFxuICAgICAgICBpeSA9IHF3ICogeSArIHF6ICogeCAtIHF4ICogeixcbiAgICAgICAgaXogPSBxdyAqIHogKyBxeCAqIHkgLSBxeSAqIHgsXG4gICAgICAgIGl3ID0gLXF4ICogeCAtIHF5ICogeSAtIHF6ICogejtcblxuICAgIC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcbiAgICBvdXRbMF0gPSBpeCAqIHF3ICsgaXcgKiAtcXggKyBpeSAqIC1xeiAtIGl6ICogLXF5O1xuICAgIG91dFsxXSA9IGl5ICogcXcgKyBpdyAqIC1xeSArIGl6ICogLXF4IC0gaXggKiAtcXo7XG4gICAgb3V0WzJdID0gaXogKiBxdyArIGl3ICogLXF6ICsgaXggKiAtcXkgLSBpeSAqIC1xeDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBQZXJmb3JtIHNvbWUgb3BlcmF0aW9uIG92ZXIgYW4gYXJyYXkgb2YgdmVjNHMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYSB0aGUgYXJyYXkgb2YgdmVjdG9ycyB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpZGUgTnVtYmVyIG9mIGVsZW1lbnRzIGJldHdlZW4gdGhlIHN0YXJ0IG9mIGVhY2ggdmVjNC4gSWYgMCBhc3N1bWVzIHRpZ2h0bHkgcGFja2VkXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IE51bWJlciBvZiBlbGVtZW50cyB0byBza2lwIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gY291bnQgTnVtYmVyIG9mIHZlYzJzIHRvIGl0ZXJhdGUgb3Zlci4gSWYgMCBpdGVyYXRlcyBvdmVyIGVudGlyZSBhcnJheVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCB2ZWN0b3IgaW4gdGhlIGFycmF5XG4gKiBAcGFyYW0ge09iamVjdH0gW2FyZ10gYWRkaXRpb25hbCBhcmd1bWVudCB0byBwYXNzIHRvIGZuXG4gKiBAcmV0dXJucyB7QXJyYXl9IGFcbiAqIEBmdW5jdGlvblxuICovXG52ZWM0LmZvckVhY2ggPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZlYyA9IHZlYzQuY3JlYXRlKCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oYSwgc3RyaWRlLCBvZmZzZXQsIGNvdW50LCBmbiwgYXJnKSB7XG4gICAgICAgIHZhciBpLCBsO1xuICAgICAgICBpZighc3RyaWRlKSB7XG4gICAgICAgICAgICBzdHJpZGUgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIW9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoY291bnQpIHtcbiAgICAgICAgICAgIGwgPSBNYXRoLm1pbigoY291bnQgKiBzdHJpZGUpICsgb2Zmc2V0LCBhLmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsID0gYS5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoaSA9IG9mZnNldDsgaSA8IGw7IGkgKz0gc3RyaWRlKSB7XG4gICAgICAgICAgICB2ZWNbMF0gPSBhW2ldOyB2ZWNbMV0gPSBhW2krMV07IHZlY1syXSA9IGFbaSsyXTsgdmVjWzNdID0gYVtpKzNdO1xuICAgICAgICAgICAgZm4odmVjLCB2ZWMsIGFyZyk7XG4gICAgICAgICAgICBhW2ldID0gdmVjWzBdOyBhW2krMV0gPSB2ZWNbMV07IGFbaSsyXSA9IHZlY1syXTsgYVtpKzNdID0gdmVjWzNdO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYTtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWM0fSB2ZWMgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xudmVjNC5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAndmVjNCgnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgYVszXSArICcpJztcbn07XG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLnZlYzQgPSB2ZWM0O1xufVxuO1xuLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuLyoqXG4gKiBAY2xhc3MgMngyIE1hdHJpeFxuICogQG5hbWUgbWF0MlxuICovXG5cbnZhciBtYXQyID0ge307XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpZGVudGl0eSBtYXQyXG4gKlxuICogQHJldHVybnMge21hdDJ9IGEgbmV3IDJ4MiBtYXRyaXhcbiAqL1xubWF0Mi5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoNCk7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDIgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IGEgbWF0cml4IHRvIGNsb25lXG4gKiBAcmV0dXJucyB7bWF0Mn0gYSBuZXcgMngyIG1hdHJpeFxuICovXG5tYXQyLmNsb25lID0gZnVuY3Rpb24oYSkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBtYXQyIHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gKi9cbm1hdDIuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IGEgbWF0MiB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAqL1xubWF0Mi5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNwb3NlIHRoZSB2YWx1ZXMgb2YgYSBtYXQyXG4gKlxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDJ9IG91dFxuICovXG5tYXQyLnRyYW5zcG9zZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcbiAgICBpZiAob3V0ID09PSBhKSB7XG4gICAgICAgIHZhciBhMSA9IGFbMV07XG4gICAgICAgIG91dFsxXSA9IGFbMl07XG4gICAgICAgIG91dFsyXSA9IGExO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICAgIG91dFsxXSA9IGFbMl07XG4gICAgICAgIG91dFsyXSA9IGFbMV07XG4gICAgICAgIG91dFszXSA9IGFbM107XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEludmVydHMgYSBtYXQyXG4gKlxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDJ9IG91dFxuICovXG5tYXQyLmludmVydCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sXG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgICAgICBkZXQgPSBhMCAqIGEzIC0gYTIgKiBhMTtcblxuICAgIGlmICghZGV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBkZXQgPSAxLjAgLyBkZXQ7XG4gICAgXG4gICAgb3V0WzBdID0gIGEzICogZGV0O1xuICAgIG91dFsxXSA9IC1hMSAqIGRldDtcbiAgICBvdXRbMl0gPSAtYTIgKiBkZXQ7XG4gICAgb3V0WzNdID0gIGEwICogZGV0O1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgYWRqdWdhdGUgb2YgYSBtYXQyXG4gKlxuICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0Mn0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDJ9IG91dFxuICovXG5tYXQyLmFkam9pbnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICAvLyBDYWNoaW5nIHRoaXMgdmFsdWUgaXMgbmVzc2VjYXJ5IGlmIG91dCA9PSBhXG4gICAgdmFyIGEwID0gYVswXTtcbiAgICBvdXRbMF0gPSAgYVszXTtcbiAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICBvdXRbMl0gPSAtYVsyXTtcbiAgICBvdXRbM10gPSAgYTA7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDJcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAqL1xubWF0Mi5kZXRlcm1pbmFudCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBhWzNdIC0gYVsyXSAqIGFbMV07XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIG1hdDInc1xuICpcbiAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0Mn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAqL1xubWF0Mi5tdWx0aXBseSA9IGZ1bmN0aW9uIChvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdO1xuICAgIHZhciBiMCA9IGJbMF0sIGIxID0gYlsxXSwgYjIgPSBiWzJdLCBiMyA9IGJbM107XG4gICAgb3V0WzBdID0gYTAgKiBiMCArIGEyICogYjE7XG4gICAgb3V0WzFdID0gYTEgKiBiMCArIGEzICogYjE7XG4gICAgb3V0WzJdID0gYTAgKiBiMiArIGEyICogYjM7XG4gICAgb3V0WzNdID0gYTEgKiBiMiArIGEzICogYjM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQyLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbm1hdDIubXVsID0gbWF0Mi5tdWx0aXBseTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0MiBieSB0aGUgZ2l2ZW4gYW5nbGVcbiAqXG4gKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDJ9IG91dFxuICovXG5tYXQyLnJvdGF0ZSA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sXG4gICAgICAgIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKTtcbiAgICBvdXRbMF0gPSBhMCAqICBjICsgYTIgKiBzO1xuICAgIG91dFsxXSA9IGExICogIGMgKyBhMyAqIHM7XG4gICAgb3V0WzJdID0gYTAgKiAtcyArIGEyICogYztcbiAgICBvdXRbM10gPSBhMSAqIC1zICsgYTMgKiBjO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNjYWxlcyB0aGUgbWF0MiBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjMlxuICpcbiAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJ9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7dmVjMn0gdiB0aGUgdmVjMiB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gKiovXG5tYXQyLnNjYWxlID0gZnVuY3Rpb24ob3V0LCBhLCB2KSB7XG4gICAgdmFyIGEwID0gYVswXSwgYTEgPSBhWzFdLCBhMiA9IGFbMl0sIGEzID0gYVszXSxcbiAgICAgICAgdjAgPSB2WzBdLCB2MSA9IHZbMV07XG4gICAgb3V0WzBdID0gYTAgKiB2MDtcbiAgICBvdXRbMV0gPSBhMSAqIHYwO1xuICAgIG91dFsyXSA9IGEyICogdjE7XG4gICAgb3V0WzNdID0gYTMgKiB2MTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgbWF0MlxuICpcbiAqIEBwYXJhbSB7bWF0Mn0gbWF0IG1hdHJpeCB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XG4gKi9cbm1hdDIuc3RyID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gJ21hdDIoJyArIGFbMF0gKyAnLCAnICsgYVsxXSArICcsICcgKyBhWzJdICsgJywgJyArIGFbM10gKyAnKSc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXQyXG4gKlxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBtYXRyaXggdG8gY2FsY3VsYXRlIEZyb2Jlbml1cyBub3JtIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBGcm9iZW5pdXMgbm9ybVxuICovXG5tYXQyLmZyb2IgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybihNYXRoLnNxcnQoTWF0aC5wb3coYVswXSwgMikgKyBNYXRoLnBvdyhhWzFdLCAyKSArIE1hdGgucG93KGFbMl0sIDIpICsgTWF0aC5wb3coYVszXSwgMikpKVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIEwsIEQgYW5kIFUgbWF0cmljZXMgKExvd2VyIHRyaWFuZ3VsYXIsIERpYWdvbmFsIGFuZCBVcHBlciB0cmlhbmd1bGFyKSBieSBmYWN0b3JpemluZyB0aGUgaW5wdXQgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJ9IEwgdGhlIGxvd2VyIHRyaWFuZ3VsYXIgbWF0cml4IFxuICogQHBhcmFtIHttYXQyfSBEIHRoZSBkaWFnb25hbCBtYXRyaXggXG4gKiBAcGFyYW0ge21hdDJ9IFUgdGhlIHVwcGVyIHRyaWFuZ3VsYXIgbWF0cml4IFxuICogQHBhcmFtIHttYXQyfSBhIHRoZSBpbnB1dCBtYXRyaXggdG8gZmFjdG9yaXplXG4gKi9cblxubWF0Mi5MRFUgPSBmdW5jdGlvbiAoTCwgRCwgVSwgYSkgeyBcbiAgICBMWzJdID0gYVsyXS9hWzBdOyBcbiAgICBVWzBdID0gYVswXTsgXG4gICAgVVsxXSA9IGFbMV07IFxuICAgIFVbM10gPSBhWzNdIC0gTFsyXSAqIFVbMV07IFxuICAgIHJldHVybiBbTCwgRCwgVV07ICAgICAgIFxufTsgXG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLm1hdDIgPSBtYXQyO1xufVxuO1xuLyogQ29weXJpZ2h0IChjKSAyMDEzLCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5cblJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sXG5hcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBcbiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBcbkRJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBDT1BZUklHSFQgSE9MREVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SXG5BTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbihJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbkxPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbihJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG5TT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS4gKi9cblxuLyoqXG4gKiBAY2xhc3MgMngzIE1hdHJpeFxuICogQG5hbWUgbWF0MmRcbiAqIFxuICogQGRlc2NyaXB0aW9uIFxuICogQSBtYXQyZCBjb250YWlucyBzaXggZWxlbWVudHMgZGVmaW5lZCBhczpcbiAqIDxwcmU+XG4gKiBbYSwgYywgdHgsXG4gKiAgYiwgZCwgdHldXG4gKiA8L3ByZT5cbiAqIFRoaXMgaXMgYSBzaG9ydCBmb3JtIGZvciB0aGUgM3gzIG1hdHJpeDpcbiAqIDxwcmU+XG4gKiBbYSwgYywgdHgsXG4gKiAgYiwgZCwgdHksXG4gKiAgMCwgMCwgMV1cbiAqIDwvcHJlPlxuICogVGhlIGxhc3Qgcm93IGlzIGlnbm9yZWQgc28gdGhlIGFycmF5IGlzIHNob3J0ZXIgYW5kIG9wZXJhdGlvbnMgYXJlIGZhc3Rlci5cbiAqL1xuXG52YXIgbWF0MmQgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDJkXG4gKlxuICogQHJldHVybnMge21hdDJkfSBhIG5ldyAyeDMgbWF0cml4XG4gKi9cbm1hdDJkLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg2KTtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAxO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDJkIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQyZH0gYSBtYXRyaXggdG8gY2xvbmVcbiAqIEByZXR1cm5zIHttYXQyZH0gYSBuZXcgMngzIG1hdHJpeFxuICovXG5tYXQyZC5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoNik7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDJkIHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gKi9cbm1hdDJkLmNvcHkgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXQgYSBtYXQyZCB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICovXG5tYXQyZC5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEludmVydHMgYSBtYXQyZFxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyZH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDJkfSBvdXRcbiAqL1xubWF0MmQuaW52ZXJ0ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGFhID0gYVswXSwgYWIgPSBhWzFdLCBhYyA9IGFbMl0sIGFkID0gYVszXSxcbiAgICAgICAgYXR4ID0gYVs0XSwgYXR5ID0gYVs1XTtcblxuICAgIHZhciBkZXQgPSBhYSAqIGFkIC0gYWIgKiBhYztcbiAgICBpZighZGV0KXtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgIG91dFswXSA9IGFkICogZGV0O1xuICAgIG91dFsxXSA9IC1hYiAqIGRldDtcbiAgICBvdXRbMl0gPSAtYWMgKiBkZXQ7XG4gICAgb3V0WzNdID0gYWEgKiBkZXQ7XG4gICAgb3V0WzRdID0gKGFjICogYXR5IC0gYWQgKiBhdHgpICogZGV0O1xuICAgIG91dFs1XSA9IChhYiAqIGF0eCAtIGFhICogYXR5KSAqIGRldDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDJkXG4gKlxuICogQHBhcmFtIHttYXQyZH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge051bWJlcn0gZGV0ZXJtaW5hbnQgb2YgYVxuICovXG5tYXQyZC5kZXRlcm1pbmFudCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBhWzNdIC0gYVsxXSAqIGFbMl07XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIG1hdDJkJ3NcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0MmR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICovXG5tYXQyZC5tdWx0aXBseSA9IGZ1bmN0aW9uIChvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdLCBhNCA9IGFbNF0sIGE1ID0gYVs1XSxcbiAgICAgICAgYjAgPSBiWzBdLCBiMSA9IGJbMV0sIGIyID0gYlsyXSwgYjMgPSBiWzNdLCBiNCA9IGJbNF0sIGI1ID0gYls1XTtcbiAgICBvdXRbMF0gPSBhMCAqIGIwICsgYTIgKiBiMTtcbiAgICBvdXRbMV0gPSBhMSAqIGIwICsgYTMgKiBiMTtcbiAgICBvdXRbMl0gPSBhMCAqIGIyICsgYTIgKiBiMztcbiAgICBvdXRbM10gPSBhMSAqIGIyICsgYTMgKiBiMztcbiAgICBvdXRbNF0gPSBhMCAqIGI0ICsgYTIgKiBiNSArIGE0O1xuICAgIG91dFs1XSA9IGExICogYjQgKyBhMyAqIGI1ICsgYTU7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQyZC5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG5tYXQyZC5tdWwgPSBtYXQyZC5tdWx0aXBseTtcblxuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXQyZCBieSB0aGUgZ2l2ZW4gYW5nbGVcbiAqXG4gKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICovXG5tYXQyZC5yb3RhdGUgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdLCBhNCA9IGFbNF0sIGE1ID0gYVs1XSxcbiAgICAgICAgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgIG91dFswXSA9IGEwICogIGMgKyBhMiAqIHM7XG4gICAgb3V0WzFdID0gYTEgKiAgYyArIGEzICogcztcbiAgICBvdXRbMl0gPSBhMCAqIC1zICsgYTIgKiBjO1xuICAgIG91dFszXSA9IGExICogLXMgKyBhMyAqIGM7XG4gICAgb3V0WzRdID0gYTQ7XG4gICAgb3V0WzVdID0gYTU7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIHRoZSBtYXQyZCBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjMlxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQyZH0gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICogQHBhcmFtIHt2ZWMyfSB2IHRoZSB2ZWMyIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gKiovXG5tYXQyZC5zY2FsZSA9IGZ1bmN0aW9uKG91dCwgYSwgdikge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sIGE0ID0gYVs0XSwgYTUgPSBhWzVdLFxuICAgICAgICB2MCA9IHZbMF0sIHYxID0gdlsxXTtcbiAgICBvdXRbMF0gPSBhMCAqIHYwO1xuICAgIG91dFsxXSA9IGExICogdjA7XG4gICAgb3V0WzJdID0gYTIgKiB2MTtcbiAgICBvdXRbM10gPSBhMyAqIHYxO1xuICAgIG91dFs0XSA9IGE0O1xuICAgIG91dFs1XSA9IGE1O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zbGF0ZXMgdGhlIG1hdDJkIGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMyXG4gKlxuICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJkfSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gKiBAcGFyYW0ge3ZlYzJ9IHYgdGhlIHZlYzIgdG8gdHJhbnNsYXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gKiovXG5tYXQyZC50cmFuc2xhdGUgPSBmdW5jdGlvbihvdXQsIGEsIHYpIHtcbiAgICB2YXIgYTAgPSBhWzBdLCBhMSA9IGFbMV0sIGEyID0gYVsyXSwgYTMgPSBhWzNdLCBhNCA9IGFbNF0sIGE1ID0gYVs1XSxcbiAgICAgICAgdjAgPSB2WzBdLCB2MSA9IHZbMV07XG4gICAgb3V0WzBdID0gYTA7XG4gICAgb3V0WzFdID0gYTE7XG4gICAgb3V0WzJdID0gYTI7XG4gICAgb3V0WzNdID0gYTM7XG4gICAgb3V0WzRdID0gYTAgKiB2MCArIGEyICogdjEgKyBhNDtcbiAgICBvdXRbNV0gPSBhMSAqIHYwICsgYTMgKiB2MSArIGE1O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBtYXQyZFxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IGEgbWF0cml4IHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtYXRyaXhcbiAqL1xubWF0MmQuc3RyID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gJ21hdDJkKCcgKyBhWzBdICsgJywgJyArIGFbMV0gKyAnLCAnICsgYVsyXSArICcsICcgKyBcbiAgICAgICAgICAgICAgICAgICAgYVszXSArICcsICcgKyBhWzRdICsgJywgJyArIGFbNV0gKyAnKSc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXQyZFxuICpcbiAqIEBwYXJhbSB7bWF0MmR9IGEgdGhlIG1hdHJpeCB0byBjYWxjdWxhdGUgRnJvYmVuaXVzIG5vcm0gb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IEZyb2Jlbml1cyBub3JtXG4gKi9cbm1hdDJkLmZyb2IgPSBmdW5jdGlvbiAoYSkgeyBcbiAgICByZXR1cm4oTWF0aC5zcXJ0KE1hdGgucG93KGFbMF0sIDIpICsgTWF0aC5wb3coYVsxXSwgMikgKyBNYXRoLnBvdyhhWzJdLCAyKSArIE1hdGgucG93KGFbM10sIDIpICsgTWF0aC5wb3coYVs0XSwgMikgKyBNYXRoLnBvdyhhWzVdLCAyKSArIDEpKVxufTsgXG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLm1hdDJkID0gbWF0MmQ7XG59XG47XG4vKiBDb3B5cmlnaHQgKGMpIDIwMTMsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbmFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICAgIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIFxuICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG5USElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbkFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG5XQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIFxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLiAqL1xuXG4vKipcbiAqIEBjbGFzcyAzeDMgTWF0cml4XG4gKiBAbmFtZSBtYXQzXG4gKi9cblxudmFyIG1hdDMgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDNcbiAqXG4gKiBAcmV0dXJucyB7bWF0M30gYSBuZXcgM3gzIG1hdHJpeFxuICovXG5tYXQzLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg5KTtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDE7XG4gICAgb3V0WzVdID0gMDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb3BpZXMgdGhlIHVwcGVyLWxlZnQgM3gzIHZhbHVlcyBpbnRvIHRoZSBnaXZlbiBtYXQzLlxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgM3gzIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhICAgdGhlIHNvdXJjZSA0eDQgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gKi9cbm1hdDMuZnJvbU1hdDQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzRdO1xuICAgIG91dFs0XSA9IGFbNV07XG4gICAgb3V0WzVdID0gYVs2XTtcbiAgICBvdXRbNl0gPSBhWzhdO1xuICAgIG91dFs3XSA9IGFbOV07XG4gICAgb3V0WzhdID0gYVsxMF07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBtYXQzIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQzfSBhIG1hdHJpeCB0byBjbG9uZVxuICogQHJldHVybnMge21hdDN9IGEgbmV3IDN4MyBtYXRyaXhcbiAqL1xubWF0My5jbG9uZSA9IGZ1bmN0aW9uKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEdMTUFUX0FSUkFZX1RZUEUoOSk7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDMgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5jb3B5ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IGEgbWF0MyB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMTtcbiAgICBvdXRbNV0gPSAwO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFRyYW5zcG9zZSB0aGUgdmFsdWVzIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My50cmFuc3Bvc2UgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gICAgaWYgKG91dCA9PT0gYSkge1xuICAgICAgICB2YXIgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTEyID0gYVs1XTtcbiAgICAgICAgb3V0WzFdID0gYVszXTtcbiAgICAgICAgb3V0WzJdID0gYVs2XTtcbiAgICAgICAgb3V0WzNdID0gYTAxO1xuICAgICAgICBvdXRbNV0gPSBhWzddO1xuICAgICAgICBvdXRbNl0gPSBhMDI7XG4gICAgICAgIG91dFs3XSA9IGExMjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzNdO1xuICAgICAgICBvdXRbMl0gPSBhWzZdO1xuICAgICAgICBvdXRbM10gPSBhWzFdO1xuICAgICAgICBvdXRbNF0gPSBhWzRdO1xuICAgICAgICBvdXRbNV0gPSBhWzddO1xuICAgICAgICBvdXRbNl0gPSBhWzJdO1xuICAgICAgICBvdXRbN10gPSBhWzVdO1xuICAgICAgICBvdXRbOF0gPSBhWzhdO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5pbnZlcnQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSwgYTExID0gYVs0XSwgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSwgYTIxID0gYVs3XSwgYTIyID0gYVs4XSxcblxuICAgICAgICBiMDEgPSBhMjIgKiBhMTEgLSBhMTIgKiBhMjEsXG4gICAgICAgIGIxMSA9IC1hMjIgKiBhMTAgKyBhMTIgKiBhMjAsXG4gICAgICAgIGIyMSA9IGEyMSAqIGExMCAtIGExMSAqIGEyMCxcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgICAgIGRldCA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSArIGEwMiAqIGIyMTtcblxuICAgIGlmICghZGV0KSB7IFxuICAgICAgICByZXR1cm4gbnVsbDsgXG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgIG91dFswXSA9IGIwMSAqIGRldDtcbiAgICBvdXRbMV0gPSAoLWEyMiAqIGEwMSArIGEwMiAqIGEyMSkgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGExMiAqIGEwMSAtIGEwMiAqIGExMSkgKiBkZXQ7XG4gICAgb3V0WzNdID0gYjExICogZGV0O1xuICAgIG91dFs0XSA9IChhMjIgKiBhMDAgLSBhMDIgKiBhMjApICogZGV0O1xuICAgIG91dFs1XSA9ICgtYTEyICogYTAwICsgYTAyICogYTEwKSAqIGRldDtcbiAgICBvdXRbNl0gPSBiMjEgKiBkZXQ7XG4gICAgb3V0WzddID0gKC1hMjEgKiBhMDAgKyBhMDEgKiBhMjApICogZGV0O1xuICAgIG91dFs4XSA9IChhMTEgKiBhMDAgLSBhMDEgKiBhMTApICogZGV0O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5hZGpvaW50ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sXG4gICAgICAgIGExMCA9IGFbM10sIGExMSA9IGFbNF0sIGExMiA9IGFbNV0sXG4gICAgICAgIGEyMCA9IGFbNl0sIGEyMSA9IGFbN10sIGEyMiA9IGFbOF07XG5cbiAgICBvdXRbMF0gPSAoYTExICogYTIyIC0gYTEyICogYTIxKTtcbiAgICBvdXRbMV0gPSAoYTAyICogYTIxIC0gYTAxICogYTIyKTtcbiAgICBvdXRbMl0gPSAoYTAxICogYTEyIC0gYTAyICogYTExKTtcbiAgICBvdXRbM10gPSAoYTEyICogYTIwIC0gYTEwICogYTIyKTtcbiAgICBvdXRbNF0gPSAoYTAwICogYTIyIC0gYTAyICogYTIwKTtcbiAgICBvdXRbNV0gPSAoYTAyICogYTEwIC0gYTAwICogYTEyKTtcbiAgICBvdXRbNl0gPSAoYTEwICogYTIxIC0gYTExICogYTIwKTtcbiAgICBvdXRbN10gPSAoYTAxICogYTIwIC0gYTAwICogYTIxKTtcbiAgICBvdXRbOF0gPSAoYTAwICogYTExIC0gYTAxICogYTEwKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAqL1xubWF0My5kZXRlcm1pbmFudCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sXG4gICAgICAgIGExMCA9IGFbM10sIGExMSA9IGFbNF0sIGExMiA9IGFbNV0sXG4gICAgICAgIGEyMCA9IGFbNl0sIGEyMSA9IGFbN10sIGEyMiA9IGFbOF07XG5cbiAgICByZXR1cm4gYTAwICogKGEyMiAqIGExMSAtIGExMiAqIGEyMSkgKyBhMDEgKiAoLWEyMiAqIGExMCArIGExMiAqIGEyMCkgKyBhMDIgKiAoYTIxICogYTEwIC0gYTExICogYTIwKTtcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0d28gbWF0MydzXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHttYXQzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLm11bHRpcGx5ID0gZnVuY3Rpb24gKG91dCwgYSwgYikge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLFxuICAgICAgICBhMTAgPSBhWzNdLCBhMTEgPSBhWzRdLCBhMTIgPSBhWzVdLFxuICAgICAgICBhMjAgPSBhWzZdLCBhMjEgPSBhWzddLCBhMjIgPSBhWzhdLFxuXG4gICAgICAgIGIwMCA9IGJbMF0sIGIwMSA9IGJbMV0sIGIwMiA9IGJbMl0sXG4gICAgICAgIGIxMCA9IGJbM10sIGIxMSA9IGJbNF0sIGIxMiA9IGJbNV0sXG4gICAgICAgIGIyMCA9IGJbNl0sIGIyMSA9IGJbN10sIGIyMiA9IGJbOF07XG5cbiAgICBvdXRbMF0gPSBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjA7XG4gICAgb3V0WzFdID0gYjAwICogYTAxICsgYjAxICogYTExICsgYjAyICogYTIxO1xuICAgIG91dFsyXSA9IGIwMCAqIGEwMiArIGIwMSAqIGExMiArIGIwMiAqIGEyMjtcblxuICAgIG91dFszXSA9IGIxMCAqIGEwMCArIGIxMSAqIGExMCArIGIxMiAqIGEyMDtcbiAgICBvdXRbNF0gPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTEgKyBiMTIgKiBhMjE7XG4gICAgb3V0WzVdID0gYjEwICogYTAyICsgYjExICogYTEyICsgYjEyICogYTIyO1xuXG4gICAgb3V0WzZdID0gYjIwICogYTAwICsgYjIxICogYTEwICsgYjIyICogYTIwO1xuICAgIG91dFs3XSA9IGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMTtcbiAgICBvdXRbOF0gPSBiMjAgKiBhMDIgKyBiMjEgKiBhMTIgKyBiMjIgKiBhMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHtAbGluayBtYXQzLm11bHRpcGx5fVxuICogQGZ1bmN0aW9uXG4gKi9cbm1hdDMubXVsID0gbWF0My5tdWx0aXBseTtcblxuLyoqXG4gKiBUcmFuc2xhdGUgYSBtYXQzIGJ5IHRoZSBnaXZlbiB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQzfSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gKiBAcGFyYW0ge3ZlYzJ9IHYgdmVjdG9yIHRvIHRyYW5zbGF0ZSBieVxuICogQHJldHVybnMge21hdDN9IG91dFxuICovXG5tYXQzLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKG91dCwgYSwgdikge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLFxuICAgICAgICBhMTAgPSBhWzNdLCBhMTEgPSBhWzRdLCBhMTIgPSBhWzVdLFxuICAgICAgICBhMjAgPSBhWzZdLCBhMjEgPSBhWzddLCBhMjIgPSBhWzhdLFxuICAgICAgICB4ID0gdlswXSwgeSA9IHZbMV07XG5cbiAgICBvdXRbMF0gPSBhMDA7XG4gICAgb3V0WzFdID0gYTAxO1xuICAgIG91dFsyXSA9IGEwMjtcblxuICAgIG91dFszXSA9IGExMDtcbiAgICBvdXRbNF0gPSBhMTE7XG4gICAgb3V0WzVdID0gYTEyO1xuXG4gICAgb3V0WzZdID0geCAqIGEwMCArIHkgKiBhMTAgKyBhMjA7XG4gICAgb3V0WzddID0geCAqIGEwMSArIHkgKiBhMTEgKyBhMjE7XG4gICAgb3V0WzhdID0geCAqIGEwMiArIHkgKiBhMTIgKyBhMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdDMgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqL1xubWF0My5yb3RhdGUgPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSwgYTExID0gYVs0XSwgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSwgYTIxID0gYVs3XSwgYTIyID0gYVs4XSxcblxuICAgICAgICBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICBvdXRbMF0gPSBjICogYTAwICsgcyAqIGExMDtcbiAgICBvdXRbMV0gPSBjICogYTAxICsgcyAqIGExMTtcbiAgICBvdXRbMl0gPSBjICogYTAyICsgcyAqIGExMjtcblxuICAgIG91dFszXSA9IGMgKiBhMTAgLSBzICogYTAwO1xuICAgIG91dFs0XSA9IGMgKiBhMTEgLSBzICogYTAxO1xuICAgIG91dFs1XSA9IGMgKiBhMTIgLSBzICogYTAyO1xuXG4gICAgb3V0WzZdID0gYTIwO1xuICAgIG91dFs3XSA9IGEyMTtcbiAgICBvdXRbOF0gPSBhMjI7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2NhbGVzIHRoZSBtYXQzIGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMyXG4gKlxuICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0M30gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMyfSB2IHRoZSB2ZWMyIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAqKi9cbm1hdDMuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdO1xuXG4gICAgb3V0WzBdID0geCAqIGFbMF07XG4gICAgb3V0WzFdID0geCAqIGFbMV07XG4gICAgb3V0WzJdID0geCAqIGFbMl07XG5cbiAgICBvdXRbM10gPSB5ICogYVszXTtcbiAgICBvdXRbNF0gPSB5ICogYVs0XTtcbiAgICBvdXRbNV0gPSB5ICogYVs1XTtcblxuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIGZyb20gYSBtYXQyZCBpbnRvIGEgbWF0M1xuICpcbiAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDJkfSBhIHRoZSBtYXRyaXggdG8gY29weVxuICogQHJldHVybnMge21hdDN9IG91dFxuICoqL1xubWF0My5mcm9tTWF0MmQgPSBmdW5jdGlvbihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gMDtcblxuICAgIG91dFszXSA9IGFbMl07XG4gICAgb3V0WzRdID0gYVszXTtcbiAgICBvdXRbNV0gPSAwO1xuXG4gICAgb3V0WzZdID0gYVs0XTtcbiAgICBvdXRbN10gPSBhWzVdO1xuICAgIG91dFs4XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuKiBDYWxjdWxhdGVzIGEgM3gzIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBxdWF0ZXJuaW9uXG4qXG4qIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiogQHBhcmFtIHtxdWF0fSBxIFF1YXRlcm5pb24gdG8gY3JlYXRlIG1hdHJpeCBmcm9tXG4qXG4qIEByZXR1cm5zIHttYXQzfSBvdXRcbiovXG5tYXQzLmZyb21RdWF0ID0gZnVuY3Rpb24gKG91dCwgcSkge1xuICAgIHZhciB4ID0gcVswXSwgeSA9IHFbMV0sIHogPSBxWzJdLCB3ID0gcVszXSxcbiAgICAgICAgeDIgPSB4ICsgeCxcbiAgICAgICAgeTIgPSB5ICsgeSxcbiAgICAgICAgejIgPSB6ICsgeixcblxuICAgICAgICB4eCA9IHggKiB4MixcbiAgICAgICAgeXggPSB5ICogeDIsXG4gICAgICAgIHl5ID0geSAqIHkyLFxuICAgICAgICB6eCA9IHogKiB4MixcbiAgICAgICAgenkgPSB6ICogeTIsXG4gICAgICAgIHp6ID0geiAqIHoyLFxuICAgICAgICB3eCA9IHcgKiB4MixcbiAgICAgICAgd3kgPSB3ICogeTIsXG4gICAgICAgIHd6ID0gdyAqIHoyO1xuXG4gICAgb3V0WzBdID0gMSAtIHl5IC0geno7XG4gICAgb3V0WzNdID0geXggLSB3ejtcbiAgICBvdXRbNl0gPSB6eCArIHd5O1xuXG4gICAgb3V0WzFdID0geXggKyB3ejtcbiAgICBvdXRbNF0gPSAxIC0geHggLSB6ejtcbiAgICBvdXRbN10gPSB6eSAtIHd4O1xuXG4gICAgb3V0WzJdID0genggLSB3eTtcbiAgICBvdXRbNV0gPSB6eSArIHd4O1xuICAgIG91dFs4XSA9IDEgLSB4eCAtIHl5O1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuKiBDYWxjdWxhdGVzIGEgM3gzIG5vcm1hbCBtYXRyaXggKHRyYW5zcG9zZSBpbnZlcnNlKSBmcm9tIHRoZSA0eDQgbWF0cml4XG4qXG4qIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiogQHBhcmFtIHttYXQ0fSBhIE1hdDQgdG8gZGVyaXZlIHRoZSBub3JtYWwgbWF0cml4IGZyb21cbipcbiogQHJldHVybnMge21hdDN9IG91dFxuKi9cbm1hdDMubm9ybWFsRnJvbU1hdDQgPSBmdW5jdGlvbiAob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sIGEyMSA9IGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcbiAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV0sXG5cbiAgICAgICAgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLFxuICAgICAgICBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsXG4gICAgICAgIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMCxcbiAgICAgICAgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLFxuICAgICAgICBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsXG4gICAgICAgIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMixcbiAgICAgICAgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLFxuICAgICAgICBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsXG4gICAgICAgIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMCxcbiAgICAgICAgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLFxuICAgICAgICBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsXG4gICAgICAgIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMixcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgICAgIGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICAgIGlmICghZGV0KSB7IFxuICAgICAgICByZXR1cm4gbnVsbDsgXG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgIG91dFswXSA9IChhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDkpICogZGV0O1xuICAgIG91dFsxXSA9IChhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcpICogZGV0O1xuICAgIG91dFsyXSA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xuXG4gICAgb3V0WzNdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzRdID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzVdID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XG5cbiAgICBvdXRbNl0gPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcbiAgICBvdXRbN10gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgICBvdXRbOF0gPSAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldDtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBtYXQzXG4gKlxuICogQHBhcmFtIHttYXQzfSBtYXQgbWF0cml4IHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtYXRyaXhcbiAqL1xubWF0My5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAnbWF0MygnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgXG4gICAgICAgICAgICAgICAgICAgIGFbM10gKyAnLCAnICsgYVs0XSArICcsICcgKyBhWzVdICsgJywgJyArIFxuICAgICAgICAgICAgICAgICAgICBhWzZdICsgJywgJyArIGFbN10gKyAnLCAnICsgYVs4XSArICcpJztcbn07XG5cbi8qKlxuICogUmV0dXJucyBGcm9iZW5pdXMgbm9ybSBvZiBhIG1hdDNcbiAqXG4gKiBAcGFyYW0ge21hdDN9IGEgdGhlIG1hdHJpeCB0byBjYWxjdWxhdGUgRnJvYmVuaXVzIG5vcm0gb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IEZyb2Jlbml1cyBub3JtXG4gKi9cbm1hdDMuZnJvYiA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuKE1hdGguc3FydChNYXRoLnBvdyhhWzBdLCAyKSArIE1hdGgucG93KGFbMV0sIDIpICsgTWF0aC5wb3coYVsyXSwgMikgKyBNYXRoLnBvdyhhWzNdLCAyKSArIE1hdGgucG93KGFbNF0sIDIpICsgTWF0aC5wb3coYVs1XSwgMikgKyBNYXRoLnBvdyhhWzZdLCAyKSArIE1hdGgucG93KGFbN10sIDIpICsgTWF0aC5wb3coYVs4XSwgMikpKVxufTtcblxuXG5pZih0eXBlb2YoZXhwb3J0cykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy5tYXQzID0gbWF0Mztcbn1cbjtcbi8qIENvcHlyaWdodCAoYykgMjAxMywgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gXG4gICAgYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG5cblRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbldBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgXG5ESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuICovXG5cbi8qKlxuICogQGNsYXNzIDR4NCBNYXRyaXhcbiAqIEBuYW1lIG1hdDRcbiAqL1xuXG52YXIgbWF0NCA9IHt9O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgbWF0NFxuICpcbiAqIEByZXR1cm5zIHttYXQ0fSBhIG5ldyA0eDQgbWF0cml4XG4gKi9cbm1hdDQuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDE2KTtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMTtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAxO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbWF0NCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIG1hdHJpeFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gYSBtYXRyaXggdG8gY2xvbmVcbiAqIEByZXR1cm5zIHttYXQ0fSBhIG5ldyA0eDQgbWF0cml4XG4gKi9cbm1hdDQuY2xvbmUgPSBmdW5jdGlvbihhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBHTE1BVF9BUlJBWV9UWVBFKDE2KTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICBvdXRbOV0gPSBhWzldO1xuICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICBvdXRbMTFdID0gYVsxMV07XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBtYXQ0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuY29weSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIG91dFs5XSA9IGFbOV07XG4gICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgIG91dFsxMV0gPSBhWzExXTtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogU2V0IGEgbWF0NCB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5pZGVudGl0eSA9IGZ1bmN0aW9uKG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAxO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDE7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogVHJhbnNwb3NlIHRoZSB2YWx1ZXMgb2YgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnRyYW5zcG9zZSA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcbiAgICBpZiAob3V0ID09PSBhKSB7XG4gICAgICAgIHZhciBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICAgICAgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgICAgIGEyMyA9IGFbMTFdO1xuXG4gICAgICAgIG91dFsxXSA9IGFbNF07XG4gICAgICAgIG91dFsyXSA9IGFbOF07XG4gICAgICAgIG91dFszXSA9IGFbMTJdO1xuICAgICAgICBvdXRbNF0gPSBhMDE7XG4gICAgICAgIG91dFs2XSA9IGFbOV07XG4gICAgICAgIG91dFs3XSA9IGFbMTNdO1xuICAgICAgICBvdXRbOF0gPSBhMDI7XG4gICAgICAgIG91dFs5XSA9IGExMjtcbiAgICAgICAgb3V0WzExXSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTJdID0gYTAzO1xuICAgICAgICBvdXRbMTNdID0gYTEzO1xuICAgICAgICBvdXRbMTRdID0gYTIzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICAgIG91dFsxXSA9IGFbNF07XG4gICAgICAgIG91dFsyXSA9IGFbOF07XG4gICAgICAgIG91dFszXSA9IGFbMTJdO1xuICAgICAgICBvdXRbNF0gPSBhWzFdO1xuICAgICAgICBvdXRbNV0gPSBhWzVdO1xuICAgICAgICBvdXRbNl0gPSBhWzldO1xuICAgICAgICBvdXRbN10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzhdID0gYVsyXTtcbiAgICAgICAgb3V0WzldID0gYVs2XTtcbiAgICAgICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgICAgICBvdXRbMTFdID0gYVsxNF07XG4gICAgICAgIG91dFsxMl0gPSBhWzNdO1xuICAgICAgICBvdXRbMTNdID0gYVs3XTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTFdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEludmVydHMgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmludmVydCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLCBhMTEgPSBhWzVdLCBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLCBhMjEgPSBhWzldLCBhMjIgPSBhWzEwXSwgYTIzID0gYVsxMV0sXG4gICAgICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdLFxuXG4gICAgICAgIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMCxcbiAgICAgICAgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwLFxuICAgICAgICBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTAsXG4gICAgICAgIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMSxcbiAgICAgICAgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExLFxuICAgICAgICBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTIsXG4gICAgICAgIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMCxcbiAgICAgICAgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwLFxuICAgICAgICBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzAsXG4gICAgICAgIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMSxcbiAgICAgICAgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxLFxuICAgICAgICBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzIsXG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgICAgICBkZXQgPSBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG5cbiAgICBpZiAoIWRldCkgeyBcbiAgICAgICAgcmV0dXJuIG51bGw7IFxuICAgIH1cbiAgICBkZXQgPSAxLjAgLyBkZXQ7XG5cbiAgICBvdXRbMF0gPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcbiAgICBvdXRbMV0gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgICBvdXRbMl0gPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcbiAgICBvdXRbM10gPSAoYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzKSAqIGRldDtcbiAgICBvdXRbNF0gPSAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNV0gPSAoYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNl0gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgICBvdXRbN10gPSAoYTIwICogYjA1IC0gYTIyICogYjAyICsgYTIzICogYjAxKSAqIGRldDtcbiAgICBvdXRbOF0gPSAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldDtcbiAgICBvdXRbOV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcbiAgICBvdXRbMTBdID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XG4gICAgb3V0WzExXSA9IChhMjEgKiBiMDIgLSBhMjAgKiBiMDQgLSBhMjMgKiBiMDApICogZGV0O1xuICAgIG91dFsxMl0gPSAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldDtcbiAgICBvdXRbMTNdID0gKGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzE0XSA9IChhMzEgKiBiMDEgLSBhMzAgKiBiMDMgLSBhMzIgKiBiMDApICogZGV0O1xuICAgIG91dFsxNV0gPSAoYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwKSAqIGRldDtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5hZGpvaW50ID0gZnVuY3Rpb24ob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sIGExMSA9IGFbNV0sIGExMiA9IGFbNl0sIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sIGEyMSA9IGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcbiAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV07XG5cbiAgICBvdXRbMF0gID0gIChhMTEgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMSAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpICsgYTMxICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikpO1xuICAgIG91dFsxXSAgPSAtKGEwMSAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIxICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzEgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSk7XG4gICAgb3V0WzJdICA9ICAoYTAxICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgLSBhMTEgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMSAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcbiAgICBvdXRbM10gID0gLShhMDEgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSAtIGExMSAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpICsgYTIxICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICAgIG91dFs0XSAgPSAtKGExMCAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIwICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgKyBhMzAgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSk7XG4gICAgb3V0WzVdICA9ICAoYTAwICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjAgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMCAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpKTtcbiAgICBvdXRbNl0gID0gLShhMDAgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSAtIGExMCAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMwICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICAgIG91dFs3XSAgPSAgKGEwMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTEwICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgb3V0WzhdICA9ICAoYTEwICogKGEyMSAqIGEzMyAtIGEyMyAqIGEzMSkgLSBhMjAgKiAoYTExICogYTMzIC0gYTEzICogYTMxKSArIGEzMCAqIChhMTEgKiBhMjMgLSBhMTMgKiBhMjEpKTtcbiAgICBvdXRbOV0gID0gLShhMDAgKiAoYTIxICogYTMzIC0gYTIzICogYTMxKSAtIGEyMCAqIChhMDEgKiBhMzMgLSBhMDMgKiBhMzEpICsgYTMwICogKGEwMSAqIGEyMyAtIGEwMyAqIGEyMSkpO1xuICAgIG91dFsxMF0gPSAgKGEwMCAqIChhMTEgKiBhMzMgLSBhMTMgKiBhMzEpIC0gYTEwICogKGEwMSAqIGEzMyAtIGEwMyAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTEzIC0gYTAzICogYTExKSk7XG4gICAgb3V0WzExXSA9IC0oYTAwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSkgLSBhMTAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSArIGEyMCAqIChhMDEgKiBhMTMgLSBhMDMgKiBhMTEpKTtcbiAgICBvdXRbMTJdID0gLShhMTAgKiAoYTIxICogYTMyIC0gYTIyICogYTMxKSAtIGEyMCAqIChhMTEgKiBhMzIgLSBhMTIgKiBhMzEpICsgYTMwICogKGExMSAqIGEyMiAtIGExMiAqIGEyMSkpO1xuICAgIG91dFsxM10gPSAgKGEwMCAqIChhMjEgKiBhMzIgLSBhMjIgKiBhMzEpIC0gYTIwICogKGEwMSAqIGEzMiAtIGEwMiAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTIyIC0gYTAyICogYTIxKSk7XG4gICAgb3V0WzE0XSA9IC0oYTAwICogKGExMSAqIGEzMiAtIGExMiAqIGEzMSkgLSBhMTAgKiAoYTAxICogYTMyIC0gYTAyICogYTMxKSArIGEzMCAqIChhMDEgKiBhMTIgLSBhMDIgKiBhMTEpKTtcbiAgICBvdXRbMTVdID0gIChhMDAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSAtIGExMCAqIChhMDEgKiBhMjIgLSBhMDIgKiBhMjEpICsgYTIwICogKGEwMSAqIGExMiAtIGEwMiAqIGExMSkpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge051bWJlcn0gZGV0ZXJtaW5hbnQgb2YgYVxuICovXG5tYXQ0LmRldGVybWluYW50ID0gZnVuY3Rpb24gKGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XSxcblxuICAgICAgICBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsXG4gICAgICAgIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMCxcbiAgICAgICAgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwLFxuICAgICAgICBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTEsXG4gICAgICAgIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSxcbiAgICAgICAgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyLFxuICAgICAgICBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsXG4gICAgICAgIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMCxcbiAgICAgICAgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwLFxuICAgICAgICBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzEsXG4gICAgICAgIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSxcbiAgICAgICAgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgIHJldHVybiBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIG1hdDQnc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7bWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5tdWx0aXBseSA9IGZ1bmN0aW9uIChvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XTtcblxuICAgIC8vIENhY2hlIG9ubHkgdGhlIGN1cnJlbnQgbGluZSBvZiB0aGUgc2Vjb25kIG1hdHJpeFxuICAgIHZhciBiMCAgPSBiWzBdLCBiMSA9IGJbMV0sIGIyID0gYlsyXSwgYjMgPSBiWzNdOyAgXG4gICAgb3V0WzBdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFsxXSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbMl0gPSBiMCphMDIgKyBiMSphMTIgKyBiMiphMjIgKyBiMyphMzI7XG4gICAgb3V0WzNdID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgYjAgPSBiWzRdOyBiMSA9IGJbNV07IGIyID0gYls2XTsgYjMgPSBiWzddO1xuICAgIG91dFs0XSA9IGIwKmEwMCArIGIxKmExMCArIGIyKmEyMCArIGIzKmEzMDtcbiAgICBvdXRbNV0gPSBiMCphMDEgKyBiMSphMTEgKyBiMiphMjEgKyBiMyphMzE7XG4gICAgb3V0WzZdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFs3XSA9IGIwKmEwMyArIGIxKmExMyArIGIyKmEyMyArIGIzKmEzMztcblxuICAgIGIwID0gYls4XTsgYjEgPSBiWzldOyBiMiA9IGJbMTBdOyBiMyA9IGJbMTFdO1xuICAgIG91dFs4XSA9IGIwKmEwMCArIGIxKmExMCArIGIyKmEyMCArIGIzKmEzMDtcbiAgICBvdXRbOV0gPSBiMCphMDEgKyBiMSphMTEgKyBiMiphMjEgKyBiMyphMzE7XG4gICAgb3V0WzEwXSA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXRbMTFdID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgYjAgPSBiWzEyXTsgYjEgPSBiWzEzXTsgYjIgPSBiWzE0XTsgYjMgPSBiWzE1XTtcbiAgICBvdXRbMTJdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFsxM10gPSBiMCphMDEgKyBiMSphMTEgKyBiMiphMjEgKyBiMyphMzE7XG4gICAgb3V0WzE0XSA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXRbMTVdID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgbWF0NC5tdWx0aXBseX1cbiAqIEBmdW5jdGlvblxuICovXG5tYXQ0Lm11bCA9IG1hdDQubXVsdGlwbHk7XG5cbi8qKlxuICogVHJhbnNsYXRlIGEgbWF0NCBieSB0aGUgZ2l2ZW4gdmVjdG9yXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICogQHBhcmFtIHt2ZWMzfSB2IHZlY3RvciB0byB0cmFuc2xhdGUgYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC50cmFuc2xhdGUgPSBmdW5jdGlvbiAob3V0LCBhLCB2KSB7XG4gICAgdmFyIHggPSB2WzBdLCB5ID0gdlsxXSwgeiA9IHZbMl0sXG4gICAgICAgIGEwMCwgYTAxLCBhMDIsIGEwMyxcbiAgICAgICAgYTEwLCBhMTEsIGExMiwgYTEzLFxuICAgICAgICBhMjAsIGEyMSwgYTIyLCBhMjM7XG5cbiAgICBpZiAoYSA9PT0gb3V0KSB7XG4gICAgICAgIG91dFsxMl0gPSBhWzBdICogeCArIGFbNF0gKiB5ICsgYVs4XSAqIHogKyBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMV0gKiB4ICsgYVs1XSAqIHkgKyBhWzldICogeiArIGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsyXSAqIHggKyBhWzZdICogeSArIGFbMTBdICogeiArIGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVszXSAqIHggKyBhWzddICogeSArIGFbMTFdICogeiArIGFbMTVdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGEwMCA9IGFbMF07IGEwMSA9IGFbMV07IGEwMiA9IGFbMl07IGEwMyA9IGFbM107XG4gICAgICAgIGExMCA9IGFbNF07IGExMSA9IGFbNV07IGExMiA9IGFbNl07IGExMyA9IGFbN107XG4gICAgICAgIGEyMCA9IGFbOF07IGEyMSA9IGFbOV07IGEyMiA9IGFbMTBdOyBhMjMgPSBhWzExXTtcblxuICAgICAgICBvdXRbMF0gPSBhMDA7IG91dFsxXSA9IGEwMTsgb3V0WzJdID0gYTAyOyBvdXRbM10gPSBhMDM7XG4gICAgICAgIG91dFs0XSA9IGExMDsgb3V0WzVdID0gYTExOyBvdXRbNl0gPSBhMTI7IG91dFs3XSA9IGExMztcbiAgICAgICAgb3V0WzhdID0gYTIwOyBvdXRbOV0gPSBhMjE7IG91dFsxMF0gPSBhMjI7IG91dFsxMV0gPSBhMjM7XG5cbiAgICAgICAgb3V0WzEyXSA9IGEwMCAqIHggKyBhMTAgKiB5ICsgYTIwICogeiArIGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYTAxICogeCArIGExMSAqIHkgKyBhMjEgKiB6ICsgYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhMDIgKiB4ICsgYTEyICogeSArIGEyMiAqIHogKyBhWzE0XTtcbiAgICAgICAgb3V0WzE1XSA9IGEwMyAqIHggKyBhMTMgKiB5ICsgYTIzICogeiArIGFbMTVdO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNjYWxlcyB0aGUgbWF0NCBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjM1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byBzY2FsZVxuICogQHBhcmFtIHt2ZWMzfSB2IHRoZSB2ZWMzIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqKi9cbm1hdDQuc2NhbGUgPSBmdW5jdGlvbihvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdLCB6ID0gdlsyXTtcblxuICAgIG91dFswXSA9IGFbMF0gKiB4O1xuICAgIG91dFsxXSA9IGFbMV0gKiB4O1xuICAgIG91dFsyXSA9IGFbMl0gKiB4O1xuICAgIG91dFszXSA9IGFbM10gKiB4O1xuICAgIG91dFs0XSA9IGFbNF0gKiB5O1xuICAgIG91dFs1XSA9IGFbNV0gKiB5O1xuICAgIG91dFs2XSA9IGFbNl0gKiB5O1xuICAgIG91dFs3XSA9IGFbN10gKiB5O1xuICAgIG91dFs4XSA9IGFbOF0gKiB6O1xuICAgIG91dFs5XSA9IGFbOV0gKiB6O1xuICAgIG91dFsxMF0gPSBhWzEwXSAqIHo7XG4gICAgb3V0WzExXSA9IGFbMTFdICogejtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdDQgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEBwYXJhbSB7dmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQucm90YXRlID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkLCBheGlzKSB7XG4gICAgdmFyIHggPSBheGlzWzBdLCB5ID0gYXhpc1sxXSwgeiA9IGF4aXNbMl0sXG4gICAgICAgIGxlbiA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopLFxuICAgICAgICBzLCBjLCB0LFxuICAgICAgICBhMDAsIGEwMSwgYTAyLCBhMDMsXG4gICAgICAgIGExMCwgYTExLCBhMTIsIGExMyxcbiAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxuICAgICAgICBiMDAsIGIwMSwgYjAyLFxuICAgICAgICBiMTAsIGIxMSwgYjEyLFxuICAgICAgICBiMjAsIGIyMSwgYjIyO1xuXG4gICAgaWYgKE1hdGguYWJzKGxlbikgPCBHTE1BVF9FUFNJTE9OKSB7IHJldHVybiBudWxsOyB9XG4gICAgXG4gICAgbGVuID0gMSAvIGxlbjtcbiAgICB4ICo9IGxlbjtcbiAgICB5ICo9IGxlbjtcbiAgICB6ICo9IGxlbjtcblxuICAgIHMgPSBNYXRoLnNpbihyYWQpO1xuICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgIHQgPSAxIC0gYztcblxuICAgIGEwMCA9IGFbMF07IGEwMSA9IGFbMV07IGEwMiA9IGFbMl07IGEwMyA9IGFbM107XG4gICAgYTEwID0gYVs0XTsgYTExID0gYVs1XTsgYTEyID0gYVs2XTsgYTEzID0gYVs3XTtcbiAgICBhMjAgPSBhWzhdOyBhMjEgPSBhWzldOyBhMjIgPSBhWzEwXTsgYTIzID0gYVsxMV07XG5cbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGVsZW1lbnRzIG9mIHRoZSByb3RhdGlvbiBtYXRyaXhcbiAgICBiMDAgPSB4ICogeCAqIHQgKyBjOyBiMDEgPSB5ICogeCAqIHQgKyB6ICogczsgYjAyID0geiAqIHggKiB0IC0geSAqIHM7XG4gICAgYjEwID0geCAqIHkgKiB0IC0geiAqIHM7IGIxMSA9IHkgKiB5ICogdCArIGM7IGIxMiA9IHogKiB5ICogdCArIHggKiBzO1xuICAgIGIyMCA9IHggKiB6ICogdCArIHkgKiBzOyBiMjEgPSB5ICogeiAqIHQgLSB4ICogczsgYjIyID0geiAqIHogKiB0ICsgYztcblxuICAgIC8vIFBlcmZvcm0gcm90YXRpb24tc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzBdID0gYTAwICogYjAwICsgYTEwICogYjAxICsgYTIwICogYjAyO1xuICAgIG91dFsxXSA9IGEwMSAqIGIwMCArIGExMSAqIGIwMSArIGEyMSAqIGIwMjtcbiAgICBvdXRbMl0gPSBhMDIgKiBiMDAgKyBhMTIgKiBiMDEgKyBhMjIgKiBiMDI7XG4gICAgb3V0WzNdID0gYTAzICogYjAwICsgYTEzICogYjAxICsgYTIzICogYjAyO1xuICAgIG91dFs0XSA9IGEwMCAqIGIxMCArIGExMCAqIGIxMSArIGEyMCAqIGIxMjtcbiAgICBvdXRbNV0gPSBhMDEgKiBiMTAgKyBhMTEgKiBiMTEgKyBhMjEgKiBiMTI7XG4gICAgb3V0WzZdID0gYTAyICogYjEwICsgYTEyICogYjExICsgYTIyICogYjEyO1xuICAgIG91dFs3XSA9IGEwMyAqIGIxMCArIGExMyAqIGIxMSArIGEyMyAqIGIxMjtcbiAgICBvdXRbOF0gPSBhMDAgKiBiMjAgKyBhMTAgKiBiMjEgKyBhMjAgKiBiMjI7XG4gICAgb3V0WzldID0gYTAxICogYjIwICsgYTExICogYjIxICsgYTIxICogYjIyO1xuICAgIG91dFsxMF0gPSBhMDIgKiBiMjAgKyBhMTIgKiBiMjEgKyBhMjIgKiBiMjI7XG4gICAgb3V0WzExXSA9IGEwMyAqIGIyMCArIGExMyAqIGIyMSArIGEyMyAqIGIyMjtcblxuICAgIGlmIChhICE9PSBvdXQpIHsgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgbGFzdCByb3dcbiAgICAgICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFggYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQucm90YXRlWCA9IGZ1bmN0aW9uIChvdXQsIGEsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCksXG4gICAgICAgIGExMCA9IGFbNF0sXG4gICAgICAgIGExMSA9IGFbNV0sXG4gICAgICAgIGExMiA9IGFbNl0sXG4gICAgICAgIGExMyA9IGFbN10sXG4gICAgICAgIGEyMCA9IGFbOF0sXG4gICAgICAgIGEyMSA9IGFbOV0sXG4gICAgICAgIGEyMiA9IGFbMTBdLFxuICAgICAgICBhMjMgPSBhWzExXTtcblxuICAgIGlmIChhICE9PSBvdXQpIHsgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgcm93c1xuICAgICAgICBvdXRbMF0gID0gYVswXTtcbiAgICAgICAgb3V0WzFdICA9IGFbMV07XG4gICAgICAgIG91dFsyXSAgPSBhWzJdO1xuICAgICAgICBvdXRbM10gID0gYVszXTtcbiAgICAgICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIH1cblxuICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICBvdXRbNF0gPSBhMTAgKiBjICsgYTIwICogcztcbiAgICBvdXRbNV0gPSBhMTEgKiBjICsgYTIxICogcztcbiAgICBvdXRbNl0gPSBhMTIgKiBjICsgYTIyICogcztcbiAgICBvdXRbN10gPSBhMTMgKiBjICsgYTIzICogcztcbiAgICBvdXRbOF0gPSBhMjAgKiBjIC0gYTEwICogcztcbiAgICBvdXRbOV0gPSBhMjEgKiBjIC0gYTExICogcztcbiAgICBvdXRbMTBdID0gYTIyICogYyAtIGExMiAqIHM7XG4gICAgb3V0WzExXSA9IGEyMyAqIGMgLSBhMTMgKiBzO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWSBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5yb3RhdGVZID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKSxcbiAgICAgICAgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXSxcbiAgICAgICAgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgICAgIG91dFs0XSAgPSBhWzRdO1xuICAgICAgICBvdXRbNV0gID0gYVs1XTtcbiAgICAgICAgb3V0WzZdICA9IGFbNl07XG4gICAgICAgIG91dFs3XSAgPSBhWzddO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSA9IGEwMCAqIGMgLSBhMjAgKiBzO1xuICAgIG91dFsxXSA9IGEwMSAqIGMgLSBhMjEgKiBzO1xuICAgIG91dFsyXSA9IGEwMiAqIGMgLSBhMjIgKiBzO1xuICAgIG91dFszXSA9IGEwMyAqIGMgLSBhMjMgKiBzO1xuICAgIG91dFs4XSA9IGEwMCAqIHMgKyBhMjAgKiBjO1xuICAgIG91dFs5XSA9IGEwMSAqIHMgKyBhMjEgKiBjO1xuICAgIG91dFsxMF0gPSBhMDIgKiBzICsgYTIyICogYztcbiAgICBvdXRbMTFdID0gYTAzICogcyArIGEyMyAqIGM7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBaIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LnJvdGF0ZVogPSBmdW5jdGlvbiAob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpLFxuICAgICAgICBhMDAgPSBhWzBdLFxuICAgICAgICBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdLFxuICAgICAgICBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLFxuICAgICAgICBhMTEgPSBhWzVdLFxuICAgICAgICBhMTIgPSBhWzZdLFxuICAgICAgICBhMTMgPSBhWzddO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgICAgICBvdXRbOF0gID0gYVs4XTtcbiAgICAgICAgb3V0WzldICA9IGFbOV07XG4gICAgICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICAgICAgb3V0WzExXSA9IGFbMTFdO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSA9IGEwMCAqIGMgKyBhMTAgKiBzO1xuICAgIG91dFsxXSA9IGEwMSAqIGMgKyBhMTEgKiBzO1xuICAgIG91dFsyXSA9IGEwMiAqIGMgKyBhMTIgKiBzO1xuICAgIG91dFszXSA9IGEwMyAqIGMgKyBhMTMgKiBzO1xuICAgIG91dFs0XSA9IGExMCAqIGMgLSBhMDAgKiBzO1xuICAgIG91dFs1XSA9IGExMSAqIGMgLSBhMDEgKiBzO1xuICAgIG91dFs2XSA9IGExMiAqIGMgLSBhMDIgKiBzO1xuICAgIG91dFs3XSA9IGExMyAqIGMgLSBhMDMgKiBzO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHF1YXRlcm5pb24gcm90YXRpb24gYW5kIHZlY3RvciB0cmFuc2xhdGlvblxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgdmVjKTtcbiAqICAgICB2YXIgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XG4gKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xuICogICAgIG1hdDQubXVsdGlwbHkoZGVzdCwgcXVhdE1hdCk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3ZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQuZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24gPSBmdW5jdGlvbiAob3V0LCBxLCB2KSB7XG4gICAgLy8gUXVhdGVybmlvbiBtYXRoXG4gICAgdmFyIHggPSBxWzBdLCB5ID0gcVsxXSwgeiA9IHFbMl0sIHcgPSBxWzNdLFxuICAgICAgICB4MiA9IHggKyB4LFxuICAgICAgICB5MiA9IHkgKyB5LFxuICAgICAgICB6MiA9IHogKyB6LFxuXG4gICAgICAgIHh4ID0geCAqIHgyLFxuICAgICAgICB4eSA9IHggKiB5MixcbiAgICAgICAgeHogPSB4ICogejIsXG4gICAgICAgIHl5ID0geSAqIHkyLFxuICAgICAgICB5eiA9IHkgKiB6MixcbiAgICAgICAgenogPSB6ICogejIsXG4gICAgICAgIHd4ID0gdyAqIHgyLFxuICAgICAgICB3eSA9IHcgKiB5MixcbiAgICAgICAgd3ogPSB3ICogejI7XG5cbiAgICBvdXRbMF0gPSAxIC0gKHl5ICsgenopO1xuICAgIG91dFsxXSA9IHh5ICsgd3o7XG4gICAgb3V0WzJdID0geHogLSB3eTtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IHh5IC0gd3o7XG4gICAgb3V0WzVdID0gMSAtICh4eCArIHp6KTtcbiAgICBvdXRbNl0gPSB5eiArIHd4O1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0geHogKyB3eTtcbiAgICBvdXRbOV0gPSB5eiAtIHd4O1xuICAgIG91dFsxMF0gPSAxIC0gKHh4ICsgeXkpO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSB2WzBdO1xuICAgIG91dFsxM10gPSB2WzFdO1xuICAgIG91dFsxNF0gPSB2WzJdO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG5tYXQ0LmZyb21RdWF0ID0gZnVuY3Rpb24gKG91dCwgcSkge1xuICAgIHZhciB4ID0gcVswXSwgeSA9IHFbMV0sIHogPSBxWzJdLCB3ID0gcVszXSxcbiAgICAgICAgeDIgPSB4ICsgeCxcbiAgICAgICAgeTIgPSB5ICsgeSxcbiAgICAgICAgejIgPSB6ICsgeixcblxuICAgICAgICB4eCA9IHggKiB4MixcbiAgICAgICAgeXggPSB5ICogeDIsXG4gICAgICAgIHl5ID0geSAqIHkyLFxuICAgICAgICB6eCA9IHogKiB4MixcbiAgICAgICAgenkgPSB6ICogeTIsXG4gICAgICAgIHp6ID0geiAqIHoyLFxuICAgICAgICB3eCA9IHcgKiB4MixcbiAgICAgICAgd3kgPSB3ICogeTIsXG4gICAgICAgIHd6ID0gdyAqIHoyO1xuXG4gICAgb3V0WzBdID0gMSAtIHl5IC0geno7XG4gICAgb3V0WzFdID0geXggKyB3ejtcbiAgICBvdXRbMl0gPSB6eCAtIHd5O1xuICAgIG91dFszXSA9IDA7XG5cbiAgICBvdXRbNF0gPSB5eCAtIHd6O1xuICAgIG91dFs1XSA9IDEgLSB4eCAtIHp6O1xuICAgIG91dFs2XSA9IHp5ICsgd3g7XG4gICAgb3V0WzddID0gMDtcblxuICAgIG91dFs4XSA9IHp4ICsgd3k7XG4gICAgb3V0WzldID0genkgLSB3eDtcbiAgICBvdXRbMTBdID0gMSAtIHh4IC0geXk7XG4gICAgb3V0WzExXSA9IDA7XG5cbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGZydXN0dW0gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7TnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSByaWdodCBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0LmZydXN0dW0gPSBmdW5jdGlvbiAob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICAgIHZhciBybCA9IDEgLyAocmlnaHQgLSBsZWZ0KSxcbiAgICAgICAgdGIgPSAxIC8gKHRvcCAtIGJvdHRvbSksXG4gICAgICAgIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSAobmVhciAqIDIpICogcmw7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAobmVhciAqIDIpICogdGI7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IChyaWdodCArIGxlZnQpICogcmw7XG4gICAgb3V0WzldID0gKHRvcCArIGJvdHRvbSkgKiB0YjtcbiAgICBvdXRbMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzExXSA9IC0xO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAoZmFyICogbmVhciAqIDIpICogbmY7XG4gICAgb3V0WzE1XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtudW1iZXJ9IGZvdnkgVmVydGljYWwgZmllbGQgb2YgdmlldyBpbiByYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gYXNwZWN0IEFzcGVjdCByYXRpby4gdHlwaWNhbGx5IHZpZXdwb3J0IHdpZHRoL2hlaWdodFxuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xubWF0NC5wZXJzcGVjdGl2ZSA9IGZ1bmN0aW9uIChvdXQsIGZvdnksIGFzcGVjdCwgbmVhciwgZmFyKSB7XG4gICAgdmFyIGYgPSAxLjAgLyBNYXRoLnRhbihmb3Z5IC8gMiksXG4gICAgICAgIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSBmIC8gYXNwZWN0O1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gZjtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICBvdXRbMTFdID0gLTE7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9ICgyICogZmFyICogbmVhcikgKiBuZjtcbiAgICBvdXRbMTVdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBvcnRob2dvbmFsIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSByaWdodCBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5tYXQ0Lm9ydGhvID0gZnVuY3Rpb24gKG91dCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcbiAgICB2YXIgbHIgPSAxIC8gKGxlZnQgLSByaWdodCksXG4gICAgICAgIGJ0ID0gMSAvIChib3R0b20gLSB0b3ApLFxuICAgICAgICBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgb3V0WzBdID0gLTIgKiBscjtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IC0yICogYnQ7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gMiAqIG5mO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAobGVmdCArIHJpZ2h0KSAqIGxyO1xuICAgIG91dFsxM10gPSAodG9wICsgYm90dG9tKSAqIGJ0O1xuICAgIG91dFsxNF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBsb29rLWF0IG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBleWUgcG9zaXRpb24sIGZvY2FsIHBvaW50LCBhbmQgdXAgYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7dmVjM30gZXllIFBvc2l0aW9uIG9mIHRoZSB2aWV3ZXJcbiAqIEBwYXJhbSB7dmVjM30gY2VudGVyIFBvaW50IHRoZSB2aWV3ZXIgaXMgbG9va2luZyBhdFxuICogQHBhcmFtIHt2ZWMzfSB1cCB2ZWMzIHBvaW50aW5nIHVwXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbm1hdDQubG9va0F0ID0gZnVuY3Rpb24gKG91dCwgZXllLCBjZW50ZXIsIHVwKSB7XG4gICAgdmFyIHgwLCB4MSwgeDIsIHkwLCB5MSwgeTIsIHowLCB6MSwgejIsIGxlbixcbiAgICAgICAgZXlleCA9IGV5ZVswXSxcbiAgICAgICAgZXlleSA9IGV5ZVsxXSxcbiAgICAgICAgZXlleiA9IGV5ZVsyXSxcbiAgICAgICAgdXB4ID0gdXBbMF0sXG4gICAgICAgIHVweSA9IHVwWzFdLFxuICAgICAgICB1cHogPSB1cFsyXSxcbiAgICAgICAgY2VudGVyeCA9IGNlbnRlclswXSxcbiAgICAgICAgY2VudGVyeSA9IGNlbnRlclsxXSxcbiAgICAgICAgY2VudGVyeiA9IGNlbnRlclsyXTtcblxuICAgIGlmIChNYXRoLmFicyhleWV4IC0gY2VudGVyeCkgPCBHTE1BVF9FUFNJTE9OICYmXG4gICAgICAgIE1hdGguYWJzKGV5ZXkgLSBjZW50ZXJ5KSA8IEdMTUFUX0VQU0lMT04gJiZcbiAgICAgICAgTWF0aC5hYnMoZXlleiAtIGNlbnRlcnopIDwgR0xNQVRfRVBTSUxPTikge1xuICAgICAgICByZXR1cm4gbWF0NC5pZGVudGl0eShvdXQpO1xuICAgIH1cblxuICAgIHowID0gZXlleCAtIGNlbnRlcng7XG4gICAgejEgPSBleWV5IC0gY2VudGVyeTtcbiAgICB6MiA9IGV5ZXogLSBjZW50ZXJ6O1xuXG4gICAgbGVuID0gMSAvIE1hdGguc3FydCh6MCAqIHowICsgejEgKiB6MSArIHoyICogejIpO1xuICAgIHowICo9IGxlbjtcbiAgICB6MSAqPSBsZW47XG4gICAgejIgKj0gbGVuO1xuXG4gICAgeDAgPSB1cHkgKiB6MiAtIHVweiAqIHoxO1xuICAgIHgxID0gdXB6ICogejAgLSB1cHggKiB6MjtcbiAgICB4MiA9IHVweCAqIHoxIC0gdXB5ICogejA7XG4gICAgbGVuID0gTWF0aC5zcXJ0KHgwICogeDAgKyB4MSAqIHgxICsgeDIgKiB4Mik7XG4gICAgaWYgKCFsZW4pIHtcbiAgICAgICAgeDAgPSAwO1xuICAgICAgICB4MSA9IDA7XG4gICAgICAgIHgyID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZW4gPSAxIC8gbGVuO1xuICAgICAgICB4MCAqPSBsZW47XG4gICAgICAgIHgxICo9IGxlbjtcbiAgICAgICAgeDIgKj0gbGVuO1xuICAgIH1cblxuICAgIHkwID0gejEgKiB4MiAtIHoyICogeDE7XG4gICAgeTEgPSB6MiAqIHgwIC0gejAgKiB4MjtcbiAgICB5MiA9IHowICogeDEgLSB6MSAqIHgwO1xuXG4gICAgbGVuID0gTWF0aC5zcXJ0KHkwICogeTAgKyB5MSAqIHkxICsgeTIgKiB5Mik7XG4gICAgaWYgKCFsZW4pIHtcbiAgICAgICAgeTAgPSAwO1xuICAgICAgICB5MSA9IDA7XG4gICAgICAgIHkyID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZW4gPSAxIC8gbGVuO1xuICAgICAgICB5MCAqPSBsZW47XG4gICAgICAgIHkxICo9IGxlbjtcbiAgICAgICAgeTIgKj0gbGVuO1xuICAgIH1cblxuICAgIG91dFswXSA9IHgwO1xuICAgIG91dFsxXSA9IHkwO1xuICAgIG91dFsyXSA9IHowO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0geDE7XG4gICAgb3V0WzVdID0geTE7XG4gICAgb3V0WzZdID0gejE7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSB4MjtcbiAgICBvdXRbOV0gPSB5MjtcbiAgICBvdXRbMTBdID0gejI7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IC0oeDAgKiBleWV4ICsgeDEgKiBleWV5ICsgeDIgKiBleWV6KTtcbiAgICBvdXRbMTNdID0gLSh5MCAqIGV5ZXggKyB5MSAqIGV5ZXkgKyB5MiAqIGV5ZXopO1xuICAgIG91dFsxNF0gPSAtKHowICogZXlleCArIHoxICogZXlleSArIHoyICogZXlleik7XG4gICAgb3V0WzE1XSA9IDE7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gbWF0IG1hdHJpeCB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XG4gKi9cbm1hdDQuc3RyID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gJ21hdDQoJyArIGFbMF0gKyAnLCAnICsgYVsxXSArICcsICcgKyBhWzJdICsgJywgJyArIGFbM10gKyAnLCAnICtcbiAgICAgICAgICAgICAgICAgICAgYVs0XSArICcsICcgKyBhWzVdICsgJywgJyArIGFbNl0gKyAnLCAnICsgYVs3XSArICcsICcgK1xuICAgICAgICAgICAgICAgICAgICBhWzhdICsgJywgJyArIGFbOV0gKyAnLCAnICsgYVsxMF0gKyAnLCAnICsgYVsxMV0gKyAnLCAnICsgXG4gICAgICAgICAgICAgICAgICAgIGFbMTJdICsgJywgJyArIGFbMTNdICsgJywgJyArIGFbMTRdICsgJywgJyArIGFbMTVdICsgJyknO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIEZyb2Jlbml1cyBub3JtIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZlxuICogQHJldHVybnMge051bWJlcn0gRnJvYmVuaXVzIG5vcm1cbiAqL1xubWF0NC5mcm9iID0gZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4oTWF0aC5zcXJ0KE1hdGgucG93KGFbMF0sIDIpICsgTWF0aC5wb3coYVsxXSwgMikgKyBNYXRoLnBvdyhhWzJdLCAyKSArIE1hdGgucG93KGFbM10sIDIpICsgTWF0aC5wb3coYVs0XSwgMikgKyBNYXRoLnBvdyhhWzVdLCAyKSArIE1hdGgucG93KGFbNl0sIDIpICsgTWF0aC5wb3coYVs2XSwgMikgKyBNYXRoLnBvdyhhWzddLCAyKSArIE1hdGgucG93KGFbOF0sIDIpICsgTWF0aC5wb3coYVs5XSwgMikgKyBNYXRoLnBvdyhhWzEwXSwgMikgKyBNYXRoLnBvdyhhWzExXSwgMikgKyBNYXRoLnBvdyhhWzEyXSwgMikgKyBNYXRoLnBvdyhhWzEzXSwgMikgKyBNYXRoLnBvdyhhWzE0XSwgMikgKyBNYXRoLnBvdyhhWzE1XSwgMikgKSlcbn07XG5cblxuaWYodHlwZW9mKGV4cG9ydHMpICE9PSAndW5kZWZpbmVkJykge1xuICAgIGV4cG9ydHMubWF0NCA9IG1hdDQ7XG59XG47XG4vKiBDb3B5cmlnaHQgKGMpIDIwMTMsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcbmFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICAgIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIFxuICAgIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG5USElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbkFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG5XQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIFxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLiAqL1xuXG4vKipcbiAqIEBjbGFzcyBRdWF0ZXJuaW9uXG4gKiBAbmFtZSBxdWF0XG4gKi9cblxudmFyIHF1YXQgPSB7fTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IHF1YXRcbiAqXG4gKiBAcmV0dXJucyB7cXVhdH0gYSBuZXcgcXVhdGVybmlvblxuICovXG5xdWF0LmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBuZXcgR0xNQVRfQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFNldHMgYSBxdWF0ZXJuaW9uIHRvIHJlcHJlc2VudCB0aGUgc2hvcnRlc3Qgcm90YXRpb24gZnJvbSBvbmVcbiAqIHZlY3RvciB0byBhbm90aGVyLlxuICpcbiAqIEJvdGggdmVjdG9ycyBhcmUgYXNzdW1lZCB0byBiZSB1bml0IGxlbmd0aC5cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb24uXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGluaXRpYWwgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIGRlc3RpbmF0aW9uIHZlY3RvclxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LnJvdGF0aW9uVG8gPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRtcHZlYzMgPSB2ZWMzLmNyZWF0ZSgpO1xuICAgIHZhciB4VW5pdFZlYzMgPSB2ZWMzLmZyb21WYWx1ZXMoMSwwLDApO1xuICAgIHZhciB5VW5pdFZlYzMgPSB2ZWMzLmZyb21WYWx1ZXMoMCwxLDApO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG91dCwgYSwgYikge1xuICAgICAgICB2YXIgZG90ID0gdmVjMy5kb3QoYSwgYik7XG4gICAgICAgIGlmIChkb3QgPCAtMC45OTk5OTkpIHtcbiAgICAgICAgICAgIHZlYzMuY3Jvc3ModG1wdmVjMywgeFVuaXRWZWMzLCBhKTtcbiAgICAgICAgICAgIGlmICh2ZWMzLmxlbmd0aCh0bXB2ZWMzKSA8IDAuMDAwMDAxKVxuICAgICAgICAgICAgICAgIHZlYzMuY3Jvc3ModG1wdmVjMywgeVVuaXRWZWMzLCBhKTtcbiAgICAgICAgICAgIHZlYzMubm9ybWFsaXplKHRtcHZlYzMsIHRtcHZlYzMpO1xuICAgICAgICAgICAgcXVhdC5zZXRBeGlzQW5nbGUob3V0LCB0bXB2ZWMzLCBNYXRoLlBJKTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZG90ID4gMC45OTk5OTkpIHtcbiAgICAgICAgICAgIG91dFswXSA9IDA7XG4gICAgICAgICAgICBvdXRbMV0gPSAwO1xuICAgICAgICAgICAgb3V0WzJdID0gMDtcbiAgICAgICAgICAgIG91dFszXSA9IDE7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmVjMy5jcm9zcyh0bXB2ZWMzLCBhLCBiKTtcbiAgICAgICAgICAgIG91dFswXSA9IHRtcHZlYzNbMF07XG4gICAgICAgICAgICBvdXRbMV0gPSB0bXB2ZWMzWzFdO1xuICAgICAgICAgICAgb3V0WzJdID0gdG1wdmVjM1syXTtcbiAgICAgICAgICAgIG91dFszXSA9IDEgKyBkb3Q7XG4gICAgICAgICAgICByZXR1cm4gcXVhdC5ub3JtYWxpemUob3V0LCBvdXQpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogU2V0cyB0aGUgc3BlY2lmaWVkIHF1YXRlcm5pb24gd2l0aCB2YWx1ZXMgY29ycmVzcG9uZGluZyB0byB0aGUgZ2l2ZW5cbiAqIGF4ZXMuIEVhY2ggYXhpcyBpcyBhIHZlYzMgYW5kIGlzIGV4cGVjdGVkIHRvIGJlIHVuaXQgbGVuZ3RoIGFuZFxuICogcGVycGVuZGljdWxhciB0byBhbGwgb3RoZXIgc3BlY2lmaWVkIGF4ZXMuXG4gKlxuICogQHBhcmFtIHt2ZWMzfSB2aWV3ICB0aGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgdmlld2luZyBkaXJlY3Rpb25cbiAqIEBwYXJhbSB7dmVjM30gcmlnaHQgdGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIGxvY2FsIFwicmlnaHRcIiBkaXJlY3Rpb25cbiAqIEBwYXJhbSB7dmVjM30gdXAgICAgdGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIGxvY2FsIFwidXBcIiBkaXJlY3Rpb25cbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5zZXRBeGVzID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBtYXRyID0gbWF0My5jcmVhdGUoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbihvdXQsIHZpZXcsIHJpZ2h0LCB1cCkge1xuICAgICAgICBtYXRyWzBdID0gcmlnaHRbMF07XG4gICAgICAgIG1hdHJbM10gPSByaWdodFsxXTtcbiAgICAgICAgbWF0cls2XSA9IHJpZ2h0WzJdO1xuXG4gICAgICAgIG1hdHJbMV0gPSB1cFswXTtcbiAgICAgICAgbWF0cls0XSA9IHVwWzFdO1xuICAgICAgICBtYXRyWzddID0gdXBbMl07XG5cbiAgICAgICAgbWF0clsyXSA9IC12aWV3WzBdO1xuICAgICAgICBtYXRyWzVdID0gLXZpZXdbMV07XG4gICAgICAgIG1hdHJbOF0gPSAtdmlld1syXTtcblxuICAgICAgICByZXR1cm4gcXVhdC5ub3JtYWxpemUob3V0LCBxdWF0LmZyb21NYXQzKG91dCwgbWF0cikpO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgcXVhdCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHF1YXRlcm5pb25cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdGVybmlvbiB0byBjbG9uZVxuICogQHJldHVybnMge3F1YXR9IGEgbmV3IHF1YXRlcm5pb25cbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LmNsb25lID0gdmVjNC5jbG9uZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHF1YXQgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAqIEByZXR1cm5zIHtxdWF0fSBhIG5ldyBxdWF0ZXJuaW9uXG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5mcm9tVmFsdWVzID0gdmVjNC5mcm9tVmFsdWVzO1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBxdWF0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgc291cmNlIHF1YXRlcm5pb25cbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LmNvcHkgPSB2ZWM0LmNvcHk7XG5cbi8qKlxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgcXVhdCB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0gdyBXIGNvbXBvbmVudFxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuc2V0ID0gdmVjNC5zZXQ7XG5cbi8qKlxuICogU2V0IGEgcXVhdCB0byB0aGUgaWRlbnRpdHkgcXVhdGVybmlvblxuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LmlkZW50aXR5ID0gZnVuY3Rpb24ob3V0KSB7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBTZXRzIGEgcXVhdCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhbmQgcm90YXRpb24gYXhpcyxcbiAqIHRoZW4gcmV0dXJucyBpdC5cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7dmVjM30gYXhpcyB0aGUgYXhpcyBhcm91bmQgd2hpY2ggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSBpbiByYWRpYW5zXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiovXG5xdWF0LnNldEF4aXNBbmdsZSA9IGZ1bmN0aW9uKG91dCwgYXhpcywgcmFkKSB7XG4gICAgcmFkID0gcmFkICogMC41O1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICBvdXRbMF0gPSBzICogYXhpc1swXTtcbiAgICBvdXRbMV0gPSBzICogYXhpc1sxXTtcbiAgICBvdXRbMl0gPSBzICogYXhpc1syXTtcbiAgICBvdXRbM10gPSBNYXRoLmNvcyhyYWQpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIEFkZHMgdHdvIHF1YXQnc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3F1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5hZGQgPSB2ZWM0LmFkZDtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBxdWF0J3NcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0Lm11bHRpcGx5ID0gZnVuY3Rpb24ob3V0LCBhLCBiKSB7XG4gICAgdmFyIGF4ID0gYVswXSwgYXkgPSBhWzFdLCBheiA9IGFbMl0sIGF3ID0gYVszXSxcbiAgICAgICAgYnggPSBiWzBdLCBieSA9IGJbMV0sIGJ6ID0gYlsyXSwgYncgPSBiWzNdO1xuXG4gICAgb3V0WzBdID0gYXggKiBidyArIGF3ICogYnggKyBheSAqIGJ6IC0gYXogKiBieTtcbiAgICBvdXRbMV0gPSBheSAqIGJ3ICsgYXcgKiBieSArIGF6ICogYnggLSBheCAqIGJ6O1xuICAgIG91dFsyXSA9IGF6ICogYncgKyBhdyAqIGJ6ICsgYXggKiBieSAtIGF5ICogYng7XG4gICAgb3V0WzNdID0gYXcgKiBidyAtIGF4ICogYnggLSBheSAqIGJ5IC0gYXogKiBiejtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHF1YXQubXVsdGlwbHl9XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5tdWwgPSBxdWF0Lm11bHRpcGx5O1xuXG4vKipcbiAqIFNjYWxlcyBhIHF1YXQgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3F1YXR9IG91dFxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuc2NhbGUgPSB2ZWM0LnNjYWxlO1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgWCBheGlzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkIGFuZ2xlIChpbiByYWRpYW5zKSB0byByb3RhdGVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5yb3RhdGVYID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgcmFkICo9IDAuNTsgXG5cbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSwgYXcgPSBhWzNdLFxuICAgICAgICBieCA9IE1hdGguc2luKHJhZCksIGJ3ID0gTWF0aC5jb3MocmFkKTtcblxuICAgIG91dFswXSA9IGF4ICogYncgKyBhdyAqIGJ4O1xuICAgIG91dFsxXSA9IGF5ICogYncgKyBheiAqIGJ4O1xuICAgIG91dFsyXSA9IGF6ICogYncgLSBheSAqIGJ4O1xuICAgIG91dFszXSA9IGF3ICogYncgLSBheCAqIGJ4O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgWSBheGlzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkIGFuZ2xlIChpbiByYWRpYW5zKSB0byByb3RhdGVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5yb3RhdGVZID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgcmFkICo9IDAuNTsgXG5cbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSwgYXcgPSBhWzNdLFxuICAgICAgICBieSA9IE1hdGguc2luKHJhZCksIGJ3ID0gTWF0aC5jb3MocmFkKTtcblxuICAgIG91dFswXSA9IGF4ICogYncgLSBheiAqIGJ5O1xuICAgIG91dFsxXSA9IGF5ICogYncgKyBhdyAqIGJ5O1xuICAgIG91dFsyXSA9IGF6ICogYncgKyBheCAqIGJ5O1xuICAgIG91dFszXSA9IGF3ICogYncgLSBheSAqIGJ5O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgWiBheGlzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0fSBhIHF1YXQgdG8gcm90YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gcmFkIGFuZ2xlIChpbiByYWRpYW5zKSB0byByb3RhdGVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5yb3RhdGVaID0gZnVuY3Rpb24gKG91dCwgYSwgcmFkKSB7XG4gICAgcmFkICo9IDAuNTsgXG5cbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSwgYXcgPSBhWzNdLFxuICAgICAgICBieiA9IE1hdGguc2luKHJhZCksIGJ3ID0gTWF0aC5jb3MocmFkKTtcblxuICAgIG91dFswXSA9IGF4ICogYncgKyBheSAqIGJ6O1xuICAgIG91dFsxXSA9IGF5ICogYncgLSBheCAqIGJ6O1xuICAgIG91dFsyXSA9IGF6ICogYncgKyBhdyAqIGJ6O1xuICAgIG91dFszXSA9IGF3ICogYncgLSBheiAqIGJ6O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIFcgY29tcG9uZW50IG9mIGEgcXVhdCBmcm9tIHRoZSBYLCBZLCBhbmQgWiBjb21wb25lbnRzLlxuICogQXNzdW1lcyB0aGF0IHF1YXRlcm5pb24gaXMgMSB1bml0IGluIGxlbmd0aC5cbiAqIEFueSBleGlzdGluZyBXIGNvbXBvbmVudCB3aWxsIGJlIGlnbm9yZWQuXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgVyBjb21wb25lbnQgb2ZcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqL1xucXVhdC5jYWxjdWxhdGVXID0gZnVuY3Rpb24gKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdO1xuXG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIG91dFsyXSA9IHo7XG4gICAgb3V0WzNdID0gLU1hdGguc3FydChNYXRoLmFicygxLjAgLSB4ICogeCAtIHkgKiB5IC0geiAqIHopKTtcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gcXVhdCdzXG4gKlxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3F1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5kb3QgPSB2ZWM0LmRvdDtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHF1YXQnc1xuICpcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICogQHBhcmFtIHtxdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3F1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5sZXJwID0gdmVjNC5sZXJwO1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgc3BoZXJpY2FsIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7cXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHtxdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LnNsZXJwID0gZnVuY3Rpb24gKG91dCwgYSwgYiwgdCkge1xuICAgIC8vIGJlbmNobWFya3M6XG4gICAgLy8gICAgaHR0cDovL2pzcGVyZi5jb20vcXVhdGVybmlvbi1zbGVycC1pbXBsZW1lbnRhdGlvbnNcblxuICAgIHZhciBheCA9IGFbMF0sIGF5ID0gYVsxXSwgYXogPSBhWzJdLCBhdyA9IGFbM10sXG4gICAgICAgIGJ4ID0gYlswXSwgYnkgPSBiWzFdLCBieiA9IGJbMl0sIGJ3ID0gYlszXTtcblxuICAgIHZhciAgICAgICAgb21lZ2EsIGNvc29tLCBzaW5vbSwgc2NhbGUwLCBzY2FsZTE7XG5cbiAgICAvLyBjYWxjIGNvc2luZVxuICAgIGNvc29tID0gYXggKiBieCArIGF5ICogYnkgKyBheiAqIGJ6ICsgYXcgKiBidztcbiAgICAvLyBhZGp1c3Qgc2lnbnMgKGlmIG5lY2Vzc2FyeSlcbiAgICBpZiAoIGNvc29tIDwgMC4wICkge1xuICAgICAgICBjb3NvbSA9IC1jb3NvbTtcbiAgICAgICAgYnggPSAtIGJ4O1xuICAgICAgICBieSA9IC0gYnk7XG4gICAgICAgIGJ6ID0gLSBiejtcbiAgICAgICAgYncgPSAtIGJ3O1xuICAgIH1cbiAgICAvLyBjYWxjdWxhdGUgY29lZmZpY2llbnRzXG4gICAgaWYgKCAoMS4wIC0gY29zb20pID4gMC4wMDAwMDEgKSB7XG4gICAgICAgIC8vIHN0YW5kYXJkIGNhc2UgKHNsZXJwKVxuICAgICAgICBvbWVnYSAgPSBNYXRoLmFjb3MoY29zb20pO1xuICAgICAgICBzaW5vbSAgPSBNYXRoLnNpbihvbWVnYSk7XG4gICAgICAgIHNjYWxlMCA9IE1hdGguc2luKCgxLjAgLSB0KSAqIG9tZWdhKSAvIHNpbm9tO1xuICAgICAgICBzY2FsZTEgPSBNYXRoLnNpbih0ICogb21lZ2EpIC8gc2lub207XG4gICAgfSBlbHNlIHsgICAgICAgIFxuICAgICAgICAvLyBcImZyb21cIiBhbmQgXCJ0b1wiIHF1YXRlcm5pb25zIGFyZSB2ZXJ5IGNsb3NlIFxuICAgICAgICAvLyAgLi4uIHNvIHdlIGNhbiBkbyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uXG4gICAgICAgIHNjYWxlMCA9IDEuMCAtIHQ7XG4gICAgICAgIHNjYWxlMSA9IHQ7XG4gICAgfVxuICAgIC8vIGNhbGN1bGF0ZSBmaW5hbCB2YWx1ZXNcbiAgICBvdXRbMF0gPSBzY2FsZTAgKiBheCArIHNjYWxlMSAqIGJ4O1xuICAgIG91dFsxXSA9IHNjYWxlMCAqIGF5ICsgc2NhbGUxICogYnk7XG4gICAgb3V0WzJdID0gc2NhbGUwICogYXogKyBzY2FsZTEgKiBiejtcbiAgICBvdXRbM10gPSBzY2FsZTAgKiBhdyArIHNjYWxlMSAqIGJ3O1xuICAgIFxuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGludmVyc2Ugb2YgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgaW52ZXJzZSBvZlxuICogQHJldHVybnMge3F1YXR9IG91dFxuICovXG5xdWF0LmludmVydCA9IGZ1bmN0aW9uKG91dCwgYSkge1xuICAgIHZhciBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM10sXG4gICAgICAgIGRvdCA9IGEwKmEwICsgYTEqYTEgKyBhMiphMiArIGEzKmEzLFxuICAgICAgICBpbnZEb3QgPSBkb3QgPyAxLjAvZG90IDogMDtcbiAgICBcbiAgICAvLyBUT0RPOiBXb3VsZCBiZSBmYXN0ZXIgdG8gcmV0dXJuIFswLDAsMCwwXSBpbW1lZGlhdGVseSBpZiBkb3QgPT0gMFxuXG4gICAgb3V0WzBdID0gLWEwKmludkRvdDtcbiAgICBvdXRbMV0gPSAtYTEqaW52RG90O1xuICAgIG91dFsyXSA9IC1hMippbnZEb3Q7XG4gICAgb3V0WzNdID0gYTMqaW52RG90O1xuICAgIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGNvbmp1Z2F0ZSBvZiBhIHF1YXRcbiAqIElmIHRoZSBxdWF0ZXJuaW9uIGlzIG5vcm1hbGl6ZWQsIHRoaXMgZnVuY3Rpb24gaXMgZmFzdGVyIHRoYW4gcXVhdC5pbnZlcnNlIGFuZCBwcm9kdWNlcyB0aGUgc2FtZSByZXN1bHQuXG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgY29uanVnYXRlIG9mXG4gKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gKi9cbnF1YXQuY29uanVnYXRlID0gZnVuY3Rpb24gKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIG91dFsyXSA9IC1hWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgcXVhdFxuICpcbiAqIEBwYXJhbSB7cXVhdH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0Lmxlbmd0aCA9IHZlYzQubGVuZ3RoO1xuXG4vKipcbiAqIEFsaWFzIGZvciB7QGxpbmsgcXVhdC5sZW5ndGh9XG4gKiBAZnVuY3Rpb25cbiAqL1xucXVhdC5sZW4gPSBxdWF0Lmxlbmd0aDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3F1YXR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICogQGZ1bmN0aW9uXG4gKi9cbnF1YXQuc3F1YXJlZExlbmd0aCA9IHZlYzQuc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHF1YXQuc3F1YXJlZExlbmd0aH1cbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LnNxckxlbiA9IHF1YXQuc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBOb3JtYWxpemUgYSBxdWF0XG4gKlxuICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3F1YXR9IGEgcXVhdGVybmlvbiB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0Lm5vcm1hbGl6ZSA9IHZlYzQubm9ybWFsaXplO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBxdWF0ZXJuaW9uIGZyb20gdGhlIGdpdmVuIDN4MyByb3RhdGlvbiBtYXRyaXguXG4gKlxuICogTk9URTogVGhlIHJlc3VsdGFudCBxdWF0ZXJuaW9uIGlzIG5vdCBub3JtYWxpemVkLCBzbyB5b3Ugc2hvdWxkIGJlIHN1cmVcbiAqIHRvIHJlbm9ybWFsaXplIHRoZSBxdWF0ZXJuaW9uIHlvdXJzZWxmIHdoZXJlIG5lY2Vzc2FyeS5cbiAqXG4gKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAqIEBwYXJhbSB7bWF0M30gbSByb3RhdGlvbiBtYXRyaXhcbiAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAqIEBmdW5jdGlvblxuICovXG5xdWF0LmZyb21NYXQzID0gZnVuY3Rpb24ob3V0LCBtKSB7XG4gICAgLy8gQWxnb3JpdGhtIGluIEtlbiBTaG9lbWFrZSdzIGFydGljbGUgaW4gMTk4NyBTSUdHUkFQSCBjb3Vyc2Ugbm90ZXNcbiAgICAvLyBhcnRpY2xlIFwiUXVhdGVybmlvbiBDYWxjdWx1cyBhbmQgRmFzdCBBbmltYXRpb25cIi5cbiAgICB2YXIgZlRyYWNlID0gbVswXSArIG1bNF0gKyBtWzhdO1xuICAgIHZhciBmUm9vdDtcblxuICAgIGlmICggZlRyYWNlID4gMC4wICkge1xuICAgICAgICAvLyB8d3wgPiAxLzIsIG1heSBhcyB3ZWxsIGNob29zZSB3ID4gMS8yXG4gICAgICAgIGZSb290ID0gTWF0aC5zcXJ0KGZUcmFjZSArIDEuMCk7ICAvLyAyd1xuICAgICAgICBvdXRbM10gPSAwLjUgKiBmUm9vdDtcbiAgICAgICAgZlJvb3QgPSAwLjUvZlJvb3Q7ICAvLyAxLyg0dylcbiAgICAgICAgb3V0WzBdID0gKG1bN10tbVs1XSkqZlJvb3Q7XG4gICAgICAgIG91dFsxXSA9IChtWzJdLW1bNl0pKmZSb290O1xuICAgICAgICBvdXRbMl0gPSAobVszXS1tWzFdKSpmUm9vdDtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB8d3wgPD0gMS8yXG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgaWYgKCBtWzRdID4gbVswXSApXG4gICAgICAgICAgaSA9IDE7XG4gICAgICAgIGlmICggbVs4XSA+IG1baSozK2ldIClcbiAgICAgICAgICBpID0gMjtcbiAgICAgICAgdmFyIGogPSAoaSsxKSUzO1xuICAgICAgICB2YXIgayA9IChpKzIpJTM7XG4gICAgICAgIFxuICAgICAgICBmUm9vdCA9IE1hdGguc3FydChtW2kqMytpXS1tW2oqMytqXS1tW2sqMytrXSArIDEuMCk7XG4gICAgICAgIG91dFtpXSA9IDAuNSAqIGZSb290O1xuICAgICAgICBmUm9vdCA9IDAuNSAvIGZSb290O1xuICAgICAgICBvdXRbM10gPSAobVtrKjMral0gLSBtW2oqMytrXSkgKiBmUm9vdDtcbiAgICAgICAgb3V0W2pdID0gKG1baiozK2ldICsgbVtpKjMral0pICogZlJvb3Q7XG4gICAgICAgIG91dFtrXSA9IChtW2sqMytpXSArIG1baSozK2tdKSAqIGZSb290O1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgcXVhdGVuaW9uXG4gKlxuICogQHBhcmFtIHtxdWF0fSB2ZWMgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqL1xucXVhdC5zdHIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiAncXVhdCgnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgYVszXSArICcpJztcbn07XG5cbmlmKHR5cGVvZihleHBvcnRzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLnF1YXQgPSBxdWF0O1xufVxuO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4gIH0pKHNoaW0uZXhwb3J0cyk7XG59KSh0aGlzKTtcbiIsIi8qISBqYXZhLWRlc2VyaWFsaXplciAxOS0wOC0yMDE1ICovXHJcblxyXG4hZnVuY3Rpb24oYSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9YSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxhKTtlbHNle3ZhciBiO2I9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjp0aGlzLGIuSmF2YURlc2VyaWFsaXplcj1hKCl9fShmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbiBhKGIsYyxkKXtmdW5jdGlvbiBlKGcsaCl7aWYoIWNbZ10pe2lmKCFiW2ddKXt2YXIgaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFoJiZpKXJldHVybiBpKGcsITApO2lmKGYpcmV0dXJuIGYoZywhMCk7dmFyIGo9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitnK1wiJ1wiKTt0aHJvdyBqLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsan12YXIgaz1jW2ddPXtleHBvcnRzOnt9fTtiW2ddWzBdLmNhbGwoay5leHBvcnRzLGZ1bmN0aW9uKGEpe3ZhciBjPWJbZ11bMV1bYV07cmV0dXJuIGUoYz9jOmEpfSxrLGsuZXhwb3J0cyxhLGIsYyxkKX1yZXR1cm4gY1tnXS5leHBvcnRzfWZvcih2YXIgZj1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGc9MDtnPGQubGVuZ3RoO2crKyllKGRbZ10pO3JldHVybiBlfSh7MTpbZnVuY3Rpb24oYSxiLGMpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGQoYSl7cmV0dXJuIGEmJmEuX19lc01vZHVsZT9hOntcImRlZmF1bHRcIjphfX1mdW5jdGlvbiBlKGEsYil7aWYoIShhIGluc3RhbmNlb2YgYikpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX1PYmplY3QuZGVmaW5lUHJvcGVydHkoYyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgZj1mdW5jdGlvbigpe2Z1bmN0aW9uIGEoYSxiKXtmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKyl7dmFyIGQ9YltjXTtkLmVudW1lcmFibGU9ZC5lbnVtZXJhYmxlfHwhMSxkLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiBkJiYoZC53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsZC5rZXksZCl9fXJldHVybiBmdW5jdGlvbihiLGMsZCl7cmV0dXJuIGMmJmEoYi5wcm90b3R5cGUsYyksZCYmYShiLGQpLGJ9fSgpLGc9YShcIi4vc3RyZWFtLXJlYWRlclwiKSxoPWQoZyksaT00NDI2OSxqPTUsaz0xMTIsbD0xMTMsbT0xMTQsbj0xMTYsbz0xMTcscD0xMTkscT0xMjAscj04MjU3NTM2LHM9ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGIpe2UodGhpcyxhKSx0aGlzLmJ1ZmZlcj1iLHRoaXMuc3RyZWFtPW5ldyBoW1wiZGVmYXVsdFwiXShiKSx0aGlzLnJlcHI9bnVsbCx0aGlzLnJlZnM9W10sdGhpcy5fY2hlY2tNYWdpYygpfXJldHVybiBmKGEsW3trZXk6XCJfY2hlY2tNYWdpY1wiLHZhbHVlOmZ1bmN0aW9uKCl7aWYodGhpcy5zdHJlYW0ucmVhZFVpbnQxNigpIT09aSl0aHJvd1wiaW52YWxpZCBtYWdpYyBudW1iZXIhXCI7aWYodGhpcy5zdHJlYW0ucmVhZFVpbnQxNigpIT09ail0aHJvd1wiaW52YWxpZCB2ZXJzaW9uIVwifX0se2tleTpcIl9yZWFkQ2xhc3NEZXNjcmlwdGlvblwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGE9XCJCQ0RGSUpTWlwiLGI9dGhpcy5zdHJlYW0ucmVhZFVpbnQ4KCksYz17fTtpZihiIT09ayl7aWYoYj09PWwpe3ZhciBkPXRoaXMuc3RyZWFtLnJlYWRVaW50MzIoKS1yO3JldHVybiB0aGlzLnJlZnNbZF19aWYoYiE9PW0pcmV0dXJuIHZvaWQgY29uc29sZS5sb2coXCJJIGRvbid0IGtub3cgaG93IHRvIGhhbmRsZSB0aGlzIHR5cGUgeWV0OiBcIitiKTtjLm5hbWU9dGhpcy5zdHJlYW0ucmVhZFV0ZjhTdHJpbmcoKSxjLnZlcnNpb25JZD1bdGhpcy5zdHJlYW0ucmVhZFVpbnQzMigpLHRoaXMuc3RyZWFtLnJlYWRVaW50MzIoKV0sYy5oYW5kbGU9dGhpcy5yZWZzLmxlbmd0aCxjLmZsYWdzPXRoaXMuc3RyZWFtLnJlYWRVaW50OCgpO2Zvcih2YXIgZT1bXSxmPXRoaXMuc3RyZWFtLnJlYWRVaW50MTYoKSxnPTA7Zj5nO2crKyl7dmFyIGg9e307aC50eXBlPXRoaXMuc3RyZWFtLnJlYWRVaW50OCgpLGgubmFtZT10aGlzLnN0cmVhbS5yZWFkVXRmOFN0cmluZygpLC0xPT09YS5pbmRleE9mKFN0cmluZy5mcm9tQ2hhckNvZGUoaC50eXBlKSkmJmNvbnNvbGUubG9nKFwidGhpcyBpcyBub3QgYSBwcmltaXRpdmUgdHlwZTogXCIraC50eXBlKSxlLnB1c2goaCl9cmV0dXJuIGMuZmllbGRzPWUsYy5hbm5vdGF0aW9uPXRoaXMuc3RyZWFtLnJlYWRVaW50OCgpLGMuYW5ub3RhdGlvbiE9PXEmJmNvbnNvbGUubG9nKFwiSSBkb24ndCBrbm93IHdoYXQgdG8gZG8gd2l0aCB0aGlzOiBcIitjLmFubm90YXRpb24pLGMuc3VwZXJDbGFzcz10aGlzLl9yZWFkQ2xhc3NEZXNjcmlwdGlvbigpLHRoaXMucmVmcy5wdXNoKGMpLGN9fX0se2tleTpcIl9yZWFkQXJyYXlcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBhLGIsYz17fSxkPXRoaXMuX3JlYWRDbGFzc0Rlc2NyaXB0aW9uKCk7Yy5kZXNjcmlwdGlvbj1kLGMuaGFuZGxlPXRoaXMucmVmcy5sZW5ndGgsYj10aGlzLnN0cmVhbS5yZWFkVWludDMyKCk7dmFyIGU9ZC5uYW1lO2lmKFwiW0ZcIj09PWUpYy5lbGVtZW50cz10aGlzLnN0cmVhbS5yZWFkRmxvYXQzMkFycmF5KGIpO2Vsc2UgaWYoXCJbU1wiPT09ZSljLmVsZW1lbnRzPXRoaXMuc3RyZWFtLnJlYWRVaW50MTZBcnJheShiKTtlbHNlIGZvcihjLmVsZW1lbnRzPVtdLGE9MDtiPmE7YSsrKXt2YXIgZj10aGlzLl9yZWFkQ2h1bmsoKTtjLmVsZW1lbnRzLnB1c2goZil9cmV0dXJuIHRoaXMucmVmcy5wdXNoKGMpLGN9fSx7a2V5OlwiX3JlYWRCbG9ja0RhdGFcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuc3RyZWFtLnJlYWRVaW50OCgpO3JldHVybiB0aGlzLnN0cmVhbS5yZWFkVWludDhBcnJheShhKX19LHtrZXk6XCJfcmVhZENodW5rXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLnN0cmVhbS5yZWFkVWludDgoKSxiPW51bGw7c3dpdGNoKGEpe2Nhc2UgbzpiPXRoaXMuX3JlYWRBcnJheSgpO2JyZWFrO2Nhc2UgcDpiPXRoaXMuX3JlYWRCbG9ja0RhdGEoKTticmVhaztjYXNlIG46Yj10aGlzLnN0cmVhbS5yZWFkVXRmOFN0cmluZygpO2JyZWFrO2RlZmF1bHQ6Y29uc29sZS5sb2coXCJ1bmhhbmRsZWQgdHlwZVwiKX1yZXR1cm4gYn19LHtrZXk6XCJnZXRDb250ZW50c1wiLHZhbHVlOmZ1bmN0aW9uKCl7aWYodGhpcy5yZXByKXJldHVybiB0aGlzLnJlcHI7Zm9yKHRoaXMucmVwcj1bXTt0aGlzLnN0cmVhbS5nZXRQb3NpdGlvbigpPHRoaXMuc3RyZWFtLmdldExlbmd0aCgpOyl0aGlzLnJlcHIucHVzaCh0aGlzLl9yZWFkQ2h1bmsoKSk7cmV0dXJuIHRoaXMucmVwcn19XSksYX0oKTtzLlZFUlNJT049XCIwLjIuMFwiLGNbXCJkZWZhdWx0XCJdPXMsYi5leHBvcnRzPWNbXCJkZWZhdWx0XCJdfSx7XCIuL3N0cmVhbS1yZWFkZXJcIjoyfV0sMjpbZnVuY3Rpb24oYSxiLGMpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGQoYSxiKXtpZighKGEgaW5zdGFuY2VvZiBiKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShjLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBlPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShhLGIpe2Zvcih2YXIgYz0wO2M8Yi5sZW5ndGg7YysrKXt2YXIgZD1iW2NdO2QuZW51bWVyYWJsZT1kLmVudW1lcmFibGV8fCExLGQuY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIGQmJihkLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYSxkLmtleSxkKX19cmV0dXJuIGZ1bmN0aW9uKGIsYyxkKXtyZXR1cm4gYyYmYShiLnByb3RvdHlwZSxjKSxkJiZhKGIsZCksYn19KCksZj1mdW5jdGlvbigpe2Z1bmN0aW9uIGEoYil7ZCh0aGlzLGEpLHRoaXMuYnVmZmVyPWIsdGhpcy5kYXRhdmlldz1uZXcgRGF0YVZpZXcoYiksdGhpcy5jdXJyZW50T2Zmc2V0PTB9cmV0dXJuIGUoYSxbe2tleTpcImdldExlbmd0aFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZGF0YXZpZXcuYnl0ZUxlbmd0aH19LHtrZXk6XCJnZXRQb3NpdGlvblwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY3VycmVudE9mZnNldH19LHtrZXk6XCJyZWFkVWludDMyXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmRhdGF2aWV3LmdldFVpbnQzMih0aGlzLmN1cnJlbnRPZmZzZXQpO3JldHVybiB0aGlzLmN1cnJlbnRPZmZzZXQrPTQsYX19LHtrZXk6XCJyZWFkVWludDE2XCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmRhdGF2aWV3LmdldFVpbnQxNih0aGlzLmN1cnJlbnRPZmZzZXQpO3JldHVybiB0aGlzLmN1cnJlbnRPZmZzZXQrPTIsYX19LHtrZXk6XCJyZWFkVWludDhcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZGF0YXZpZXcuZ2V0VWludDgodGhpcy5jdXJyZW50T2Zmc2V0KTtyZXR1cm4gdGhpcy5jdXJyZW50T2Zmc2V0KyssYX19LHtrZXk6XCJyZWFkSW50MzJcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZGF0YXZpZXcuZ2V0SW50MzIodGhpcy5jdXJyZW50T2Zmc2V0KTtyZXR1cm4gdGhpcy5jdXJyZW50T2Zmc2V0Kz00LGF9fSx7a2V5OlwicmVhZEludDE2XCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmRhdGF2aWV3LmdldEludDE2KHRoaXMuY3VycmVudE9mZnNldCk7cmV0dXJuIHRoaXMuY3VycmVudE9mZnNldCs9MixhfX0se2tleTpcInJlYWRJbnQ4XCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmRhdGF2aWV3LmdldEludDgodGhpcy5jdXJyZW50T2Zmc2V0KTtyZXR1cm4gdGhpcy5jdXJyZW50T2Zmc2V0KyssYX19LHtrZXk6XCJyZWFkRmxvYXQzMlwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5kYXRhdmlldy5nZXRGbG9hdDMyKHRoaXMuY3VycmVudE9mZnNldCk7cmV0dXJuIHRoaXMuY3VycmVudE9mZnNldCs9NCxhfX0se2tleTpcInJlYWRVdGY4U3RyaW5nXCIsdmFsdWU6ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy5yZWFkVWludDE2KCksYj1cIlwiLGM9MDthPmM7YysrKWIrPVN0cmluZy5mcm9tQ2hhckNvZGUodGhpcy5yZWFkVWludDgoKSk7cmV0dXJuIGJ9fSx7a2V5OlwicmVhZEZsb2F0MzJBcnJheVwiLHZhbHVlOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj1uZXcgRmxvYXQzMkFycmF5KGEpLGM9MDthPmM7YysrKWJbY109dGhpcy5yZWFkRmxvYXQzMigpO3JldHVybiBifX0se2tleTpcInJlYWRVaW50MTZBcnJheVwiLHZhbHVlOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj1uZXcgVWludDE2QXJyYXkoYSksYz0wO2E+YztjKyspYltjXT10aGlzLnJlYWRVaW50MTYoKTtyZXR1cm4gYn19LHtrZXk6XCJyZWFkVWludDhBcnJheVwiLHZhbHVlOmZ1bmN0aW9uKGEpe3ZhciBiPW5ldyBVaW50OEFycmF5KHRoaXMuYnVmZmVyLHRoaXMuY3VycmVudE9mZnNldCxhKTtyZXR1cm4gdGhpcy5jdXJyZW50T2Zmc2V0Kz1hLGJ9fV0pLGF9KCk7Y1tcImRlZmF1bHRcIl09ZixiLmV4cG9ydHM9Y1tcImRlZmF1bHRcIl19LHt9XX0se30sWzFdKSgxKX0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1qYXZhLWRlc2VyaWFsaXplci5taW4uanMubWFwIiwiLyohIGxpYnRnYSAxMy0wOC0yMDE1ICovXHJcblxyXG4hZnVuY3Rpb24oYSxiKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtcImV4cG9ydHNcIixcIm1vZHVsZVwiXSxiKTtlbHNlIGlmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlKWIoZXhwb3J0cyxtb2R1bGUpO2Vsc2V7dmFyIGM9e2V4cG9ydHM6e319O2IoYy5leHBvcnRzLGMpLGEubGlidGdhPWMuZXhwb3J0c319KHRoaXMsZnVuY3Rpb24oYSxiKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBjKGEsYil7aWYoIShhIGluc3RhbmNlb2YgYikpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX12YXIgZD0xOCxlPTAsZj0xLGc9MixoPTMsaT04LGo9MTUsaz00OCxsPTE5MixtPTIsbj0xLG89MixwPTEscT1mdW5jdGlvbiBzKGEpe2ModGhpcyxzKSx0aGlzLmRhdGF2aWV3PW5ldyBEYXRhVmlldyhhKSx0aGlzLmhlYWRlcj1zLnJlYWRIZWFkZXIodGhpcy5kYXRhdmlldyksdGhpcy53aWR0aD10aGlzLmhlYWRlci5pbWFnZVNwZWMud2lkdGgsdGhpcy5oZWlnaHQ9dGhpcy5oZWFkZXIuaW1hZ2VTcGVjLmhlaWdodCx0aGlzLmNvbXByZXNzZWQ9ISEodGhpcy5oZWFkZXIuaW1hZ2VUeXBlJmkpLHRoaXMuaW1hZ2VJZD1zLnJlYWRJbWFnZUlkKHRoaXMuZGF0YXZpZXcsdGhpcy5oZWFkZXIpLHRoaXMuY29sb3JNYXA9cy5yZWFkQ29sb3JNYXAodGhpcy5kYXRhdmlldyx0aGlzLmhlYWRlciksdGhpcy5pbWFnZURhdGE9cy5yZWFkSW1hZ2UodGhpcyl9O3EuSEVBREVSX1NJWkU9ZCxxLklNQUdFX1RZUEVfTk9ORT1lLHEuSU1BR0VfVFlQRV9DT0xPUk1BUFBFRD1mLHEuSU1BR0VfVFlQRV9UUlVFQ09MT1I9ZyxxLklNQUdFX1RZUEVfR1JFWVNDQUxFPWgscS5JTUFHRV9SVU5MRU5HVEhfRU5DT0RFRD1pLHEucmVhZEhlYWRlcj1mdW5jdGlvbihhKXt2YXIgYj17aWRMZW5ndGg6YS5nZXRVaW50OCgwLCEwKSxtYXBUeXBlOmEuZ2V0VWludDgoMSwhMCksaW1hZ2VUeXBlOmEuZ2V0VWludDgoMiwhMCksY29sb3JNYXBTcGVjOnEucmVhZENvbG9yTWFwU3BlYyhhLDMpLGltYWdlU3BlYzpxLnJlYWRJbWFnZVNwZWMoYSw4KX07cmV0dXJuIGJ9LHEucmVhZENvbG9yTWFwU3BlYz1mdW5jdGlvbihhLGIpe3ZhciBjPWEuZ2V0VWludDgoYis0LCEwKSxkPXtmaXJzdEVudHJ5OmEuZ2V0VWludDE2KGIsITApLGxlbmd0aDphLmdldFVpbnQxNihiKzIsITApLGVudHJ5U2l6ZUJpdHM6YyxlbnRyeVNpemVCeXRlczpNYXRoLmZsb29yKChjKzcpLzgpfTtyZXR1cm4gZH0scS5yZWFkSW1hZ2VTcGVjPWZ1bmN0aW9uKGEsYil7dmFyIGM9YS5nZXRVaW50OChiKzkpLGQ9e3hPcmlnaW46YS5nZXRVaW50MTYoYiwhMCkseU9yaWdpbjphLmdldFVpbnQxNihiKzIsITApLHdpZHRoOmEuZ2V0VWludDE2KGIrNCwhMCksaGVpZ2h0OmEuZ2V0VWludDE2KGIrNiwhMCkscGl4ZWxEZXB0aDphLmdldFVpbnQ4KGIrOCksZGVzY3JpcHRvcjpjLGF0dHJpYnV0ZUJpdHM6YyZqLG9yaWdpbjooYyZrKT4+NCxpbnRlcmxlYXZlOihjJmwpPj42fTtyZXR1cm4gZH0scS5yZWFkSW1hZ2VJZD1mdW5jdGlvbihhLGIpe3JldHVybiBuZXcgVWludDhBcnJheShhLmJ1ZmZlcixkLGIuaWRMZW5ndGgpfSxxLnJlYWRDb2xvck1hcD1mdW5jdGlvbihhLGIpe2lmKGIuY29sb3JNYXBTcGVjLmxlbmd0aDw9MClyZXR1cm4gbnVsbDt2YXIgYz1uZXcgVWludDhDbGFtcGVkQXJyYXkoNCpiLmNvbG9yTWFwU3BlYy5sZW5ndGgpLGU9bnVsbCxmPWQrYi5pZExlbmd0aDtzd2l0Y2goYi5jb2xvck1hcFNwZWMuZW50cnlTaXplQml0cyl7Y2FzZSA4OmU9cS5yZWFkUGl4ZWw4O2JyZWFrO2Nhc2UgMTY6ZT1xLnJlYWRQaXhlbDE1O2JyZWFrO2Nhc2UgMTU6ZT1xLnJlYWRQaXhlbDE2O2JyZWFrO2Nhc2UgMjQ6ZT1xLnJlYWRQaXhlbDI0O2JyZWFrO2Nhc2UgMzI6ZT1xLnJlYWRQaXhlbDMyO2JyZWFrO2RlZmF1bHQ6dGhyb3dcIlVuc3VwcG9ydGVkIHBpeGVsIGRlcHRoXCJ9Zm9yKHZhciBnPTA7ZzxiLmNvbG9yTWFwU3BlYy5sZW5ndGg7ZysrKWUoYSxmLGcsYyxnKTtyZXR1cm4gY30scS5yZWFkUGl4ZWw4PWZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGY9YS5nZXRVaW50OChiK2MpO2RbNCplKzJdPWYsZFs0KmUrMV09ZixkWzQqZSswXT1mLGRbNCplKzNdPTI1NX0scS5yZWFkUGl4ZWwxNT1mdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmPWEuZ2V0VWludDE2KGIrMipjLCEwKTtkWzQqZSsyXT0oMzEmZik8PDMsZFs0KmUrMV09KGY+PjUmMzEpPDwzLGRbNCplKzBdPShmPj4xMCYzMSk8PDMsZFs0KmUrM109MjU1fSxxLnJlYWRQaXhlbDE2PWZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGY9YS5nZXRVaW50MTYoYisyKmMsITApO2RbNCplKzJdPSgzMSZmKTw8MyxkWzQqZSsxXT0oZj4+NSYzMSk8PDMsZFs0KmUrMF09KGY+PjEwJjMxKTw8MyxkWzQqZSszXT0xMjg9PSgxMjgmZik/MjU1OjB9LHEucmVhZFBpeGVsMjQ9ZnVuY3Rpb24oYSxiLGMsZCxlKXtkWzQqZSsyXT1hLmdldFVpbnQ4KGIrMypjKzApLGRbNCplKzFdPWEuZ2V0VWludDgoYiszKmMrMSksZFs0KmUrMF09YS5nZXRVaW50OChiKzMqYysyKSxkWzQqZSszXT0yNTV9LHEucmVhZFBpeGVsMzI9ZnVuY3Rpb24oYSxiLGMsZCxlKXtkWzQqZSsyXT1hLmdldFVpbnQ4KGIrNCpjKzApLGRbNCplKzFdPWEuZ2V0VWludDgoYis0KmMrMSksZFs0KmUrMF09YS5nZXRVaW50OChiKzQqYysyKSxkWzQqZSszXT0yNTV9LHEucmVhZE1hcHBlZFBpeGVsOD1mdW5jdGlvbihhLGIsYyxkLGUsZixnKXt2YXIgaD1hLmdldFVpbnQ4KGQrZSkrYztmWzQqZyswXT1iWzQqaCswXSxmWzQqZysxXT1iWzQqaCsxXSxmWzQqZysyXT1iWzQqaCsyXSxmWzQqZyszXT1iWzQqaCszXX0scS5yZWFkTWFwcGVkUGl4ZWwxNT1mdW5jdGlvbihhLGIsYyxkLGUsZixnKXt2YXIgaD1hLmdldFVpbnQxNihkKzIqZSwhMCkrYztmWzQqZyswXT1iWzQqaCswXSxmWzQqZysxXT1iWzQqaCsxXSxmWzQqZysyXT1iWzQqaCsyXSxmWzQqZyszXT1iWzQqaCszXX0scS5yZWFkTWFwcGVkUGl4ZWwxNj1mdW5jdGlvbihhLGIsYyxkLGUsZixnKXt2YXIgaD1hLmdldFVpbnQxNihkKzIqZSwhMCkrYztmWzQqZyswXT1iWzQqaCswXSxmWzQqZysxXT1iWzQqaCsxXSxmWzQqZysyXT1iWzQqaCsyXSxmWzQqZyszXT1iWzQqaCszXX0scS5yZWFkTWFwcGVkUGl4ZWwyND1mdW5jdGlvbihhLGIsYyxkLGUsZixnKXt2YXIgaD1hLmdldFVpbnQxNihkKzIqZSwhMCkrYztmWzQqZyswXT1iWzQqaCswXSxmWzQqZysxXT1iWzQqaCsxXSxmWzQqZysyXT1iWzQqaCsyXSxmWzQqZyszXT1iWzQqaCszXX0scS5yZWFkTWFwcGVkUGl4ZWwzMj1mdW5jdGlvbihhLGIsYyxkLGUsZixnKXt2YXIgaD1hLmdldFVpbnQxNihkKzIqZSwhMCkrYztmWzQqZyswXT1iWzQqaCswXSxmWzQqZysxXT1iWzQqaCsxXSxmWzQqZysyXT1iWzQqaCsyXSxmWzQqZyszXT1iWzQqaCszXX0scS5yZWFkUkxFSW1hZ2U9ZnVuY3Rpb24oKXt0aHJvd1wiTllJXCJ9LHEucmVhZENvbG9ybWFwcGVkSW1hZ2U9ZnVuY3Rpb24oYSl7dmFyIGI9YS5kYXRhdmlldyxjPWEuaGVhZGVyLGU9YS5jb2xvck1hcCxmPWMuaW1hZ2VTcGVjLndpZHRoLGc9Yy5pbWFnZVNwZWMuaGVpZ2h0LGg9bmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGYqZyo0KSxpPWMuaW1hZ2VTcGVjLnBpeGVsRGVwdGgsaj1kK2MuaWRMZW5ndGgrYy5jb2xvck1hcFNwZWMubGVuZ3RoKmMuY29sb3JNYXBTcGVjLmVudHJ5U2l6ZUJ5dGVzLGs9Yy5jb2xvck1hcFNwZWMuZmlyc3RFbnRyeSxsPW51bGwscj0oYy5pbWFnZVNwZWMub3JpZ2luJm0pPT09bz8xOi0xLHM9KGMuaW1hZ2VTcGVjLm9yaWdpbiZuKT09PXA/LTE6MTtpZighZSl0aHJvd1wiSW1hZ2UgaXMgZGVzY3JpYmVkIGFzIGNvbG9yLW1hcHBlZCwgYnV0IGhhcyBubyBtYXBcIjtzd2l0Y2goaSl7Y2FzZSA4Omw9cS5yZWFkTWFwcGVkUGl4ZWw4O2JyZWFrO2Nhc2UgMTY6bD1xLnJlYWRNYXBwZWRQaXhlbDE1O2JyZWFrO2Nhc2UgMTU6bD1xLnJlYWRNYXBwZWRQaXhlbDE2O2JyZWFrO2Nhc2UgMjQ6bD1xLnJlYWRNYXBwZWRQaXhlbDI0O2JyZWFrO2Nhc2UgMzI6bD1xLnJlYWRNYXBwZWRQaXhlbDMyO2JyZWFrO2RlZmF1bHQ6dGhyb3dcIlVuc3VwcG9ydGVkIHBpeGVsIGRlcHRoXCJ9dmFyIHQsdSx2LHc7cj4wPyh0PTAsdT1nKToodD1nLTEsdT0tMSkscz4wPyh2PTAsdz1mKToodj1mLTEsdz0tMSk7Zm9yKHZhciB4LHk9MCx6PXQ7eiE9dTt6Kz1yKXt4PTA7Zm9yKHZhciBBPXY7QSE9dztBKz1zKWwoYixlLGssaix6KmYrQSxoLHkqZit4KyspO3krK31yZXR1cm4gaH0scS5yZWFkVHJ1ZWNvbG9ySW1hZ2U9ZnVuY3Rpb24oYSl7dmFyIGI9YS5oZWFkZXIsYz1hLmRhdGF2aWV3LGU9Yi5pbWFnZVNwZWMud2lkdGgsZj1iLmltYWdlU3BlYy5oZWlnaHQsZz1uZXcgVWludDhDbGFtcGVkQXJyYXkoZSpmKjQpLGg9Yi5pbWFnZVNwZWMucGl4ZWxEZXB0aCxpPWQrYi5pZExlbmd0aCtiLmNvbG9yTWFwU3BlYy5sZW5ndGgqYi5jb2xvck1hcFNwZWMuZW50cnlTaXplQnl0ZXMsaj1udWxsLGs9KGIuaW1hZ2VTcGVjLm9yaWdpbiZtKT09PW8/MTotMSxsPShiLmltYWdlU3BlYy5vcmlnaW4mbik9PT1wPy0xOjE7c3dpdGNoKGgpe2Nhc2UgODpqPXEucmVhZFBpeGVsODticmVhaztjYXNlIDE2Omo9cS5yZWFkUGl4ZWwxNTticmVhaztjYXNlIDE1Omo9cS5yZWFkUGl4ZWwxNjticmVhaztjYXNlIDI0Omo9cS5yZWFkUGl4ZWwyNDticmVhaztjYXNlIDMyOmo9cS5yZWFkUGl4ZWwzMjticmVhaztkZWZhdWx0OnRocm93XCJVbnN1cHBvcnRlZCBwaXhlbCBkZXB0aFwifXZhciByLHMsdCx1O2s+MD8ocj0wLHM9Zik6KHI9Zi0xLHM9LTEpLGw+MD8odD0wLHU9ZSk6KHQ9ZS0xLHU9LTEpO2Zvcih2YXIgdix3PTAseD1yO3ghPXM7eCs9ayl7dj0wO2Zvcih2YXIgeT10O3khPXU7eSs9bClqKGMsaSx4KmUreSxnLHcqZSt2KyspO3crK31yZXR1cm4gZ30scS5yZWFkSW1hZ2U9ZnVuY3Rpb24oYSl7aWYoYS5oZWFkZXIuY29tcHJlc3NlZClyZXR1cm4gcS5yZWFkUkxFSW1hZ2UoYSk7aWYoMD09PWEuaGVhZGVyLm1hcFR5cGUpcmV0dXJuIHEucmVhZFRydWVjb2xvckltYWdlKGEpO2lmKDE9PT1hLmhlYWRlci5tYXBUeXBlKXJldHVybiBxLnJlYWRDb2xvcm1hcHBlZEltYWdlKGEpO3Rocm93XCJVbnN1cHBvcnRlZCBtYXAgdHlwZVwifTt2YXIgcj17cmVhZEZpbGU6ZnVuY3Rpb24oYSl7cmV0dXJuIG5ldyBxKGEpfSxsb2FkRmlsZTpmdW5jdGlvbihhLGIpe3ZhciBjPW5ldyBYTUxIdHRwUmVxdWVzdDtjLm9wZW4oXCJHRVRcIixhKSxjLnJlc3BvbnNlVHlwZT1cImFycmF5YnVmZmVyXCIsYy5vbmxvYWQ9ZnVuY3Rpb24oKXtiKG51bGwsbmV3IHEodGhpcy5yZXNwb25zZSkpfSxjLm9uZXJyb3I9ZnVuY3Rpb24oYSl7YihhLG51bGwpfSxjLnNlbmQoKX0sVEdBOnEsVkVSU0lPTjpcIjAuMy4xXCJ9O2IuZXhwb3J0cz1yfSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpYnRnYS5taW4uanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIF9lYXNpbmcgPSByZXF1aXJlKCcuL2Vhc2luZycpO1xuXG52YXIgX2Vhc2luZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9lYXNpbmcpO1xuXG4vKipcclxuICogU2ltcGxlIGNsYXNzIGZvciBob29raW5nIHVwIGFuaW1hdGlvbnMgdG8gZHJhd2FibGVzLlxyXG4gKlxyXG4gKiBBbmltYXRpb25zIHJlZmVycyBzcGVjaWZpY2FsbHkgdG8gdGhpbmdzIGxpa2UgbW92aW5nIG9iamVjdHMvY2FtZXJhcyBhcm91bmQuXHJcbiAqIEFuaW1hdGlvbnMgaGFuZGxlZCBieSB0aGUgZXhpc3Rpbmcgc2hhZGVycyBzaG91bGQgYmUgaW1wbGVtZW50ZWQgdGhhdCB3YXksIGluc3RlYWQuXHJcbiAqL1xuXG52YXIgQW5pbWF0aW9uID0gKGZ1bmN0aW9uICgpIHtcblxuICAvKipcclxuICAgKiBDcmVhdGUgYW4gYW5pbWF0aW9uIGZvciBhIGRyYXdhYmxlXHJcbiAgICpcclxuICAgKiBAY2hhaW5hYmxlXHJcbiAgICogQHBhcmFtICB7RHJhd2FibGV9IGRyYXdhYmxlICBUaGUgb2JqZWN0IG90IGFuaW1hdGVcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBkdXJhdGlvbiAgIER1cmF0aW9uIG9mIG9uZSBjeWNsZSBvZiB0aGUgYW5pbWF0aW9uXHJcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IHRyYW5zZm9ybSBBbmltYXRpb24gY2FsbGJhY2tcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhcmFtZXRlcjogTnVtYmVyIHRcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdpbGwgYmUgZXhlY3V0ZWQgaW4gdGhlIGNvbnRleHQgb2YgdGhlIGRyYXdhYmxlIChpLmUuIHRoaXMgPT09IGRyYXdhYmxlKVxyXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSB0aW1pbmcgICAgVGltaW5nIGZ1bmN0aW9uIChpLmUuIGVhc2luZykgIERlZmF1bHRzLiB0byBFYXNlLmxpbmVhclxyXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59ICBsb29wICAgICAgV2hldGhlciBvciBub3QgdG8gbG9vcCB0aGUgYW5pbWF0aW9uXHJcbiAgICogQHJldHVybiB7dGhpc30gICAgICAgICAgICAgICBUaGUgYW5pbWF0aW9uXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gQW5pbWF0aW9uKGRyYXdhYmxlLCBkdXJhdGlvbiwgdHJhbnNmb3JtLCB0aW1pbmcsIGxvb3ApIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQW5pbWF0aW9uKTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICAgIHRoaXMuZHJhd2FibGUgPSBkcmF3YWJsZTtcbiAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgdGhpcy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gICAgdGhpcy50aW1pbmcgPSB0aW1pbmcgfHwgX2Vhc2luZzJbJ2RlZmF1bHQnXS5saW5lYXI7XG4gICAgdGhpcy5sb29wID0gbG9vcDtcbiAgICB0aGlzLm9sZFVwZGF0ZSA9IG51bGw7XG4gICAgZnVuY3Rpb24gb25VcGRhdGUoZGVsdGEpIHtcbiAgICAgIHNlbGYuZWxhcHNlZCArPSBkZWx0YTtcbiAgICAgIC8vIGlmIHdlJ3JlIGRvbmUgd2l0aCB0aGUgYW5pbWF0aW9uXG4gICAgICBpZiAoc2VsZi5lbGFwc2VkID4gc2VsZi5kdXJhdGlvbiAmJiAhc2VsZi5sb29wKSB7XG4gICAgICAgIHNlbGYuc3RvcCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHQgPSBzZWxmLnRpbWluZyhzZWxmLmVsYXBzZWQgLyBzZWxmLmR1cmF0aW9uICUgMSk7XG4gICAgICAgIC8vIGpzaGludCwgcGxzLCBJIGtub3cgd2hhdCBJJ20gZG9pbmcuXG4gICAgICAgIHNlbGYudHJhbnNmb3JtLmNhbGwodGhpcywgdCk7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuICAgICAgfVxuICAgICAgaWYgKHNlbGYub2xkVXBkYXRlKSB7XG4gICAgICAgIHJldHVybiBzZWxmLm9sZFVwZGF0ZS5jYWxsKHRoaXMsIGRlbHRhKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMub25VcGRhdGUgPSBvblVwZGF0ZTtcbiAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyB0aGUgYW5pbWF0aW9uXHJcbiAgICpcclxuICAgKiBAY2hhaW5hYmxlXHJcbiAgICogQHJldHVybiB7dGhpc31cclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoQW5pbWF0aW9uLCBbe1xuICAgIGtleTogJ3N0YXJ0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICBpZiAoIXRoaXMucnVubmluZykge1xuICAgICAgICB0aGlzLm9sZFVwZGF0ZSA9IHRoaXMuZHJhd2FibGUub25VcGRhdGU7XG4gICAgICAgIHRoaXMuZHJhd2FibGUub25VcGRhdGUgPSB0aGlzLm9uVXBkYXRlO1xuICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyB0aGUgYW5pbWF0aW9uLCBhbmQgcmVzZXRzIHRoZSBlbGFzcGVkIHRpbWUgdG8gMFxyXG4gICAgICpcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3N0b3AnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgdGhpcy5lbGFwc2VkID0gMDtcbiAgICAgIHJldHVybiB0aGlzLnBhdXNlKCk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBQYXVzZXMgdGhlIHJ1bm5pbmcgYW5pbWF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQHJldHVybiB7dGhpc31cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAncGF1c2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcbiAgICAgICAgdGhpcy5kcmF3YWJsZS5vblVwZGF0ZSA9IHRoaXMub2xkVXBkYXRlO1xuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBbmltYXRpb247XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBBbmltYXRpb247XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIvKipcclxuICogRWFzaW5nIGZ1bmN0aW9uc1xyXG4gKlxyXG4gKiBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL0NyZWF0ZUpTL1R3ZWVuSlMvYmxvYi9tYXN0ZXIvc3JjL3R3ZWVuanMvRWFzZS5qc1xyXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBFYXNlID0gZnVuY3Rpb24gRWFzZSgpIHtcbiAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEVhc2UpO1xuXG4gIHRocm93IFwiRWFzZSBjYW5ub3QgYmUgaW5zdGFudGlhdGVkLlwiO1xufVxuXG4vKipcclxuICogQG1ldGhvZCBsaW5lYXJcclxuICogQHBhcmFtIHtOdW1iZXJ9IHRcclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqKi9cbjtcblxuRWFzZS5saW5lYXIgPSBmdW5jdGlvbiAodCkge1xuICByZXR1cm4gdDtcbn07XG5cbi8qKlxyXG4gKiBJZGVudGljYWwgdG8gbGluZWFyLlxyXG4gKiBAbWV0aG9kIG5vbmVcclxuICogQHBhcmFtIHtOdW1iZXJ9IHRcclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqKi9cbkVhc2Uubm9uZSA9IEVhc2UubGluZWFyO1xuXG4vKipcclxuICogTWltaWNzIHRoZSBzaW1wbGUgLTEwMCB0byAxMDAgZWFzaW5nIGluIEZsYXNoIFByby5cclxuICogQG1ldGhvZCBnZXRcclxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBBIHZhbHVlIGZyb20gLTEgKGVhc2UgaW4pIHRvIDEgKGVhc2Ugb3V0KSBpbmRpY2F0aW5nIHRoZSBzdHJlbmd0aCBhbmQgZGlyZWN0aW9uIG9mIHRoZSBlYXNlLlxyXG4gKiBAc3RhdGljXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gKiovXG5FYXNlLmdldCA9IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgaWYgKGFtb3VudCA8IC0xKSB7XG4gICAgYW1vdW50ID0gLTE7XG4gIH1cbiAgaWYgKGFtb3VudCA+IDEpIHtcbiAgICBhbW91bnQgPSAxO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAodCkge1xuICAgIGlmIChhbW91bnQgPT09IDApIHtcbiAgICAgIHJldHVybiB0O1xuICAgIH1cbiAgICBpZiAoYW1vdW50IDwgMCkge1xuICAgICAgcmV0dXJuIHQgKiAodCAqIC1hbW91bnQgKyAxICsgYW1vdW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHQgKiAoKDIgLSB0KSAqIGFtb3VudCArICgxIC0gYW1vdW50KSk7XG4gIH07XG59O1xuXG4vKipcclxuICogQ29uZmlndXJhYmxlIGV4cG9uZW50aWFsIGVhc2UuXHJcbiAqIEBtZXRob2QgZ2V0UG93SW5cclxuICogQHBhcmFtIHtOdW1iZXJ9IHBvdyBUaGUgZXhwb25lbnQgdG8gdXNlIChleC4gMyB3b3VsZCByZXR1cm4gYSBjdWJpYyBlYXNlKS5cclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICoqL1xuRWFzZS5nZXRQb3dJbiA9IGZ1bmN0aW9uIChwb3cpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgcmV0dXJuIE1hdGgucG93KHQsIHBvdyk7XG4gIH07XG59O1xuXG4vKipcclxuICogQ29uZmlndXJhYmxlIGV4cG9uZW50aWFsIGVhc2UuXHJcbiAqIEBtZXRob2QgZ2V0UG93T3V0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBwb3cgVGhlIGV4cG9uZW50IHRvIHVzZSAoZXguIDMgd291bGQgcmV0dXJuIGEgY3ViaWMgZWFzZSkuXHJcbiAqIEBzdGF0aWNcclxuICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAqKi9cbkVhc2UuZ2V0UG93T3V0ID0gZnVuY3Rpb24gKHBvdykge1xuICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICByZXR1cm4gMSAtIE1hdGgucG93KDEgLSB0LCBwb3cpO1xuICB9O1xufTtcblxuLyoqXHJcbiAqIENvbmZpZ3VyYWJsZSBleHBvbmVudGlhbCBlYXNlLlxyXG4gKiBAbWV0aG9kIGdldFBvd0luT3V0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBwb3cgVGhlIGV4cG9uZW50IHRvIHVzZSAoZXguIDMgd291bGQgcmV0dXJuIGEgY3ViaWMgZWFzZSkuXHJcbiAqIEBzdGF0aWNcclxuICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAqKi9cbkVhc2UuZ2V0UG93SW5PdXQgPSBmdW5jdGlvbiAocG93KSB7XG4gIHJldHVybiBmdW5jdGlvbiAodCkge1xuICAgIGlmICgodCAqPSAyKSA8IDEpIHtcbiAgICAgIHJldHVybiAwLjUgKiBNYXRoLnBvdyh0LCBwb3cpO1xuICAgIH1cbiAgICByZXR1cm4gMSAtIDAuNSAqIE1hdGguYWJzKE1hdGgucG93KDIgLSB0LCBwb3cpKTtcbiAgfTtcbn07XG5cbi8qKlxyXG4gKiBAbWV0aG9kIHF1YWRJblxyXG4gKiBAcGFyYW0ge051bWJlcn0gdFxyXG4gKiBAc3RhdGljXHJcbiAqIEByZXR1cm4ge051bWJlcn1cclxuICoqL1xuRWFzZS5xdWFkSW4gPSBFYXNlLmdldFBvd0luKDIpO1xuLyoqXHJcbiAqIEBtZXRob2QgcXVhZE91dFxyXG4gKiBAcGFyYW0ge051bWJlcn0gdFxyXG4gKiBAc3RhdGljXHJcbiAqIEByZXR1cm4ge051bWJlcn1cclxuICoqL1xuRWFzZS5xdWFkT3V0ID0gRWFzZS5nZXRQb3dPdXQoMik7XG4vKipcclxuICogQG1ldGhvZCBxdWFkSW5PdXRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHRcclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqKi9cbkVhc2UucXVhZEluT3V0ID0gRWFzZS5nZXRQb3dJbk91dCgyKTtcblxuLyoqXHJcbiAqIEBtZXRob2QgY3ViaWNJblxyXG4gKiBAcGFyYW0ge051bWJlcn0gdFxyXG4gKiBAc3RhdGljXHJcbiAqIEByZXR1cm4ge051bWJlcn1cclxuICoqL1xuRWFzZS5jdWJpY0luID0gRWFzZS5nZXRQb3dJbigzKTtcbi8qKlxyXG4gKiBAbWV0aG9kIGN1YmljT3V0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0XHJcbiAqIEBzdGF0aWNcclxuICogQHJldHVybiB7TnVtYmVyfVxyXG4gKiovXG5FYXNlLmN1YmljT3V0ID0gRWFzZS5nZXRQb3dPdXQoMyk7XG4vKipcclxuICogQG1ldGhvZCBjdWJpY0luT3V0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0XHJcbiAqIEBzdGF0aWNcclxuICogQHJldHVybiB7TnVtYmVyfVxyXG4gKiovXG5FYXNlLmN1YmljSW5PdXQgPSBFYXNlLmdldFBvd0luT3V0KDMpO1xuXG4vKipcclxuICogQG1ldGhvZCBxdWFydEluXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0XHJcbiAqIEBzdGF0aWNcclxuICogQHJldHVybiB7TnVtYmVyfVxyXG4gKiovXG5FYXNlLnF1YXJ0SW4gPSBFYXNlLmdldFBvd0luKDQpO1xuLyoqXHJcbiAqIEBtZXRob2QgcXVhcnRPdXRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHRcclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqKi9cbkVhc2UucXVhcnRPdXQgPSBFYXNlLmdldFBvd091dCg0KTtcbi8qKlxyXG4gKiBAbWV0aG9kIHF1YXJ0SW5PdXRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHRcclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqKi9cbkVhc2UucXVhcnRJbk91dCA9IEVhc2UuZ2V0UG93SW5PdXQoNCk7XG5cbi8qKlxyXG4gKiBAbWV0aG9kIHF1aW50SW5cclxuICogQHBhcmFtIHtOdW1iZXJ9IHRcclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqKi9cbkVhc2UucXVpbnRJbiA9IEVhc2UuZ2V0UG93SW4oNSk7XG4vKipcclxuICogQG1ldGhvZCBxdWludE91dFxyXG4gKiBAcGFyYW0ge051bWJlcn0gdFxyXG4gKiBAc3RhdGljXHJcbiAqIEByZXR1cm4ge051bWJlcn1cclxuICoqL1xuRWFzZS5xdWludE91dCA9IEVhc2UuZ2V0UG93T3V0KDUpO1xuLyoqXHJcbiAqIEBtZXRob2QgcXVpbnRJbk91dFxyXG4gKiBAcGFyYW0ge051bWJlcn0gdFxyXG4gKiBAc3RhdGljXHJcbiAqIEByZXR1cm4ge051bWJlcn1cclxuICoqL1xuRWFzZS5xdWludEluT3V0ID0gRWFzZS5nZXRQb3dJbk91dCg1KTtcblxuLyoqXHJcbiAqIEBtZXRob2Qgc2luZUluXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0XHJcbiAqIEBzdGF0aWNcclxuICogQHJldHVybiB7TnVtYmVyfVxyXG4gKiovXG5FYXNlLnNpbmVJbiA9IGZ1bmN0aW9uICh0KSB7XG4gIHJldHVybiAxIC0gTWF0aC5jb3ModCAqIE1hdGguUEkgLyAyKTtcbn07XG5cbi8qKlxyXG4gKiBAbWV0aG9kIHNpbmVPdXRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHRcclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqKi9cbkVhc2Uuc2luZU91dCA9IGZ1bmN0aW9uICh0KSB7XG4gIHJldHVybiBNYXRoLnNpbih0ICogTWF0aC5QSSAvIDIpO1xufTtcblxuLyoqXHJcbiAqIEBtZXRob2Qgc2luZUluT3V0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0XHJcbiAqIEBzdGF0aWNcclxuICogQHJldHVybiB7TnVtYmVyfVxyXG4gKiovXG5FYXNlLnNpbmVJbk91dCA9IGZ1bmN0aW9uICh0KSB7XG4gIHJldHVybiAtMC41ICogKE1hdGguY29zKE1hdGguUEkgKiB0KSAtIDEpO1xufTtcblxuLyoqXHJcbiAqIENvbmZpZ3VyYWJsZSBcImJhY2sgaW5cIiBlYXNlLlxyXG4gKiBAbWV0aG9kIGdldEJhY2tJblxyXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IFRoZSBzdHJlbmd0aCBvZiB0aGUgZWFzZS5cclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICoqL1xuRWFzZS5nZXRCYWNrSW4gPSBmdW5jdGlvbiAoYW1vdW50KSB7XG4gIHJldHVybiBmdW5jdGlvbiAodCkge1xuICAgIHJldHVybiB0ICogdCAqICgoYW1vdW50ICsgMSkgKiB0IC0gYW1vdW50KTtcbiAgfTtcbn07XG5cbi8qKlxyXG4gKiBAbWV0aG9kIGJhY2tJblxyXG4gKiBAcGFyYW0ge051bWJlcn0gdFxyXG4gKiBAc3RhdGljXHJcbiAqIEByZXR1cm4ge051bWJlcn1cclxuICoqL1xuRWFzZS5iYWNrSW4gPSBFYXNlLmdldEJhY2tJbigxLjcpO1xuXG4vKipcclxuICogQ29uZmlndXJhYmxlIFwiYmFjayBvdXRcIiBlYXNlLlxyXG4gKiBAbWV0aG9kIGdldEJhY2tPdXRcclxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBUaGUgc3RyZW5ndGggb2YgdGhlIGVhc2UuXHJcbiAqIEBzdGF0aWNcclxuICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAqKi9cbkVhc2UuZ2V0QmFja091dCA9IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgcmV0dXJuIC0tdCAqIHQgKiAoKGFtb3VudCArIDEpICogdCArIGFtb3VudCkgKyAxO1xuICB9O1xufTtcblxuLyoqXHJcbiAqIEBtZXRob2QgYmFja091dFxyXG4gKiBAcGFyYW0ge051bWJlcn0gdFxyXG4gKiBAc3RhdGljXHJcbiAqIEByZXR1cm4ge051bWJlcn1cclxuICoqL1xuRWFzZS5iYWNrT3V0ID0gRWFzZS5nZXRCYWNrT3V0KDEuNyk7XG5cbi8qKlxyXG4gKiBDb25maWd1cmFibGUgXCJiYWNrIGluIG91dFwiIGVhc2UuXHJcbiAqIEBtZXRob2QgZ2V0QmFja0luT3V0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgVGhlIHN0cmVuZ3RoIG9mIHRoZSBlYXNlLlxyXG4gKiBAc3RhdGljXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gKiovXG5FYXNlLmdldEJhY2tJbk91dCA9IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgYW1vdW50ICo9IDEuNTI1O1xuICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICBpZiAoKHQgKj0gMikgPCAxKSB7XG4gICAgICByZXR1cm4gMC41ICogKHQgKiB0ICogKChhbW91bnQgKyAxKSAqIHQgLSBhbW91bnQpKTtcbiAgICB9XG4gICAgcmV0dXJuIDAuNSAqICgodCAtPSAyKSAqIHQgKiAoKGFtb3VudCArIDEpICogdCArIGFtb3VudCkgKyAyKTtcbiAgfTtcbn07XG5cbi8qKlxyXG4gKiBAbWV0aG9kIGJhY2tJbk91dFxyXG4gKiBAcGFyYW0ge051bWJlcn0gdFxyXG4gKiBAc3RhdGljXHJcbiAqIEByZXR1cm4ge051bWJlcn1cclxuICoqL1xuRWFzZS5iYWNrSW5PdXQgPSBFYXNlLmdldEJhY2tJbk91dCgxLjcpO1xuXG4vKipcclxuICogQG1ldGhvZCBjaXJjSW5cclxuICogQHBhcmFtIHtOdW1iZXJ9IHRcclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqKi9cbkVhc2UuY2lyY0luID0gZnVuY3Rpb24gKHQpIHtcbiAgcmV0dXJuIC0oTWF0aC5zcXJ0KDEgLSB0ICogdCkgLSAxKTtcbn07XG5cbi8qKlxyXG4gKiBAbWV0aG9kIGNpcmNPdXRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHRcclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqKi9cbkVhc2UuY2lyY091dCA9IGZ1bmN0aW9uICh0KSB7XG4gIHJldHVybiBNYXRoLnNxcnQoMSAtIC0tdCAqIHQpO1xufTtcblxuLyoqXHJcbiAqIEBtZXRob2QgY2lyY0luT3V0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0XHJcbiAqIEBzdGF0aWNcclxuICogQHJldHVybiB7TnVtYmVyfVxyXG4gKiovXG5FYXNlLmNpcmNJbk91dCA9IGZ1bmN0aW9uICh0KSB7XG4gIGlmICgodCAqPSAyKSA8IDEpIHtcbiAgICByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpO1xuICB9XG4gIHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAodCAtPSAyKSAqIHQpICsgMSk7XG59O1xuXG4vKipcclxuICogQG1ldGhvZCBib3VuY2VJblxyXG4gKiBAcGFyYW0ge051bWJlcn0gdFxyXG4gKiBAc3RhdGljXHJcbiAqIEByZXR1cm4ge051bWJlcn1cclxuICoqL1xuRWFzZS5ib3VuY2VJbiA9IGZ1bmN0aW9uICh0KSB7XG4gIHJldHVybiAxIC0gRWFzZS5ib3VuY2VPdXQoMSAtIHQpO1xufTtcblxuLyoqXHJcbiAqIEBtZXRob2QgYm91bmNlT3V0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0XHJcbiAqIEBzdGF0aWNcclxuICogQHJldHVybiB7TnVtYmVyfVxyXG4gKiovXG5FYXNlLmJvdW5jZU91dCA9IGZ1bmN0aW9uICh0KSB7XG4gIGlmICh0IDwgMSAvIDIuNzUpIHtcbiAgICByZXR1cm4gNy41NjI1ICogdCAqIHQ7XG4gIH0gZWxzZSBpZiAodCA8IDIgLyAyLjc1KSB7XG4gICAgcmV0dXJuIDcuNTYyNSAqICh0IC09IDEuNSAvIDIuNzUpICogdCArIDAuNzU7XG4gIH0gZWxzZSBpZiAodCA8IDIuNSAvIDIuNzUpIHtcbiAgICByZXR1cm4gNy41NjI1ICogKHQgLT0gMi4yNSAvIDIuNzUpICogdCArIDAuOTM3NTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gNy41NjI1ICogKHQgLT0gMi42MjUgLyAyLjc1KSAqIHQgKyAwLjk4NDM3NTtcbiAgfVxufTtcblxuLyoqXHJcbiAqIEBtZXRob2QgYm91bmNlSW5PdXRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHRcclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqKi9cbkVhc2UuYm91bmNlSW5PdXQgPSBmdW5jdGlvbiAodCkge1xuICBpZiAodCA8IDAuNSkge1xuICAgIHJldHVybiBFYXNlLmJvdW5jZUluKHQgKiAyKSAqIDAuNTtcbiAgfVxuICByZXR1cm4gRWFzZS5ib3VuY2VPdXQodCAqIDIgLSAxKSAqIDAuNSArIDAuNTtcbn07XG5cbi8qKlxyXG4gKiBDb25maWd1cmFibGUgZWxhc3RpYyBlYXNlLlxyXG4gKiBAbWV0aG9kIGdldEVsYXN0aWNJblxyXG4gKiBAcGFyYW0ge051bWJlcn0gYW1wbGl0dWRlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBwZXJpb2RcclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICoqL1xuRWFzZS5nZXRFbGFzdGljSW4gPSBmdW5jdGlvbiAoYW1wbGl0dWRlLCBwZXJpb2QpIHtcbiAgdmFyIHBpMiA9IE1hdGguUEkgKiAyO1xuICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICBpZiAodCA9PT0gMCB8fCB0ID09PSAxKSB7XG4gICAgICByZXR1cm4gdDtcbiAgICB9XG4gICAgdmFyIHMgPSBwZXJpb2QgLyBwaTIgKiBNYXRoLmFzaW4oMSAvIGFtcGxpdHVkZSk7XG4gICAgcmV0dXJuIC0oYW1wbGl0dWRlICogTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAtIHMpICogcGkyIC8gcGVyaW9kKSk7XG4gIH07XG59O1xuXG4vKipcclxuICogQG1ldGhvZCBlbGFzdGljSW5cclxuICogQHBhcmFtIHtOdW1iZXJ9IHRcclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqKi9cbkVhc2UuZWxhc3RpY0luID0gRWFzZS5nZXRFbGFzdGljSW4oMSwgMC4zKTtcblxuLyoqXHJcbiAqIENvbmZpZ3VyYWJsZSBlbGFzdGljIGVhc2UuXHJcbiAqIEBtZXRob2QgZ2V0RWxhc3RpY091dFxyXG4gKiBAcGFyYW0ge051bWJlcn0gYW1wbGl0dWRlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBwZXJpb2RcclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICoqL1xuRWFzZS5nZXRFbGFzdGljT3V0ID0gZnVuY3Rpb24gKGFtcGxpdHVkZSwgcGVyaW9kKSB7XG4gIHZhciBwaTIgPSBNYXRoLlBJICogMjtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgaWYgKHQgPT09IDAgfHwgdCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHQ7XG4gICAgfVxuICAgIHZhciBzID0gcGVyaW9kIC8gcGkyICogTWF0aC5hc2luKDEgLyBhbXBsaXR1ZGUpO1xuICAgIHJldHVybiBhbXBsaXR1ZGUgKiBNYXRoLnBvdygyLCAtMTAgKiB0KSAqIE1hdGguc2luKCh0IC0gcykgKiBwaTIgLyBwZXJpb2QpICsgMTtcbiAgfTtcbn07XG5cbi8qKlxyXG4gKiBAbWV0aG9kIGVsYXN0aWNPdXRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHRcclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqKi9cbkVhc2UuZWxhc3RpY091dCA9IEVhc2UuZ2V0RWxhc3RpY091dCgxLCAwLjMpO1xuXG4vKipcclxuICogQ29uZmlndXJhYmxlIGVsYXN0aWMgZWFzZS5cclxuICogQG1ldGhvZCBnZXRFbGFzdGljSW5PdXRcclxuICogQHBhcmFtIHtOdW1iZXJ9IGFtcGxpdHVkZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gcGVyaW9kXHJcbiAqIEBzdGF0aWNcclxuICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAqKi9cbkVhc2UuZ2V0RWxhc3RpY0luT3V0ID0gZnVuY3Rpb24gKGFtcGxpdHVkZSwgcGVyaW9kKSB7XG4gIHZhciBwaTIgPSBNYXRoLlBJICogMjtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgdmFyIHMgPSBwZXJpb2QgLyBwaTIgKiBNYXRoLmFzaW4oMSAvIGFtcGxpdHVkZSk7XG4gICAgaWYgKCh0ICo9IDIpIDwgMSkge1xuICAgICAgcmV0dXJuIC0wLjUgKiAoYW1wbGl0dWRlICogTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAtIHMpICogcGkyIC8gcGVyaW9kKSk7XG4gICAgfVxuICAgIHJldHVybiBhbXBsaXR1ZGUgKiBNYXRoLnBvdygyLCAtMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAtIHMpICogcGkyIC8gcGVyaW9kKSAqIDAuNSArIDE7XG4gIH07XG59O1xuXG4vKipcclxuICogQG1ldGhvZCBlbGFzdGljSW5PdXRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHRcclxuICogQHN0YXRpY1xyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqKi9cbkVhc2UuZWxhc3RpY0luT3V0ID0gRWFzZS5nZXRFbGFzdGljSW5PdXQoMSwgMC4zICogMS41KTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBFYXNlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5leHBvcnRzLmxvYWRSZXNvdXJjZSA9IGxvYWRSZXNvdXJjZTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIF9saWJ0Z2EgPSByZXF1aXJlKCdsaWJ0Z2EnKTtcblxudmFyIF9saWJ0Z2EyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGlidGdhKTtcblxuLyoqXHJcbiAqIExvYWRzIGEgcmVzb3VyY2UgdmlhIHhociBvciBJbWFnZVxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgdXJsICAgICAgaHJlZiBvZiB0aGUgcmVzb3VyY2UgdG8gZmV0Y2hcclxuICogQHBhcmFtICB7U3RyaW5nfSAgIHR5cGUgICAgIE9uZSBvZiBYSE1MSHR0cFJlcXVlc3QncyBzdXBwb3J0ZWQgcmVzcG9uc2VUeXBlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgKGFycmF5YnVmZmVyLCBibG9iLCBkb2N1bWVudCwganNvbiwgdGV4dClcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yICdpbWFnZScgb3IgJ2ltYWdlLmNvJyAoZm9yIGEgY3Jvc3Mtb3JpZ2luIGltYWdlKVxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gZXhlY3V0ZSBvbiBzdWNjZXNzIG9yIGZhaWx1cmUuICBUYWtlc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyLCB2YWx1ZSBhcyBwYXJhbWV0ZXJzLiAgVmFsdWUgd2lsbCBiZSBudWxsIGlmIGVyclxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgbm90IG51bGxcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXG5cbmZ1bmN0aW9uIGxvYWRSZXNvdXJjZSh1cmwsIHR5cGUsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlID09PSAnaW1hZ2UnIHx8IHR5cGUgPT09ICdpbWFnZS5jbycpIHtcbiAgICBpZiAoL1xcLnRnYSQvLnRlc3QodXJsKSkge1xuICAgICAgX2xpYnRnYTJbJ2RlZmF1bHQnXS5sb2FkRmlsZSh1cmwsIGZ1bmN0aW9uIChlcnIsIHRnYSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY2FsbGJhY2soZXJyLCBudWxsKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB2YXIgaW1hZ2VEYXRhID0gY29udGV4dC5jcmVhdGVJbWFnZURhdGEodGdhLndpZHRoLCB0Z2EuaGVpZ2h0KTtcbiAgICAgICAgaW1hZ2VEYXRhLmRhdGEuc2V0KHRnYS5pbWFnZURhdGEpO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gdGdhLmhlaWdodDtcbiAgICAgICAgY2FudmFzLndpZHRoID0gdGdhLndpZHRoO1xuICAgICAgICBjb250ZXh0LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xuICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICBpbWFnZS5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBjYWxsYmFjayhlLCBudWxsKTtcbiAgICAgICAgfTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBpID0gbmV3IEltYWdlKCk7XG4gICAgICAvLyBjcm9zcy1vcmlnaW4gaW1hZ2U6XG4gICAgICBpZiAodHlwZSA9PT0gJ2ltYWdlLmNvJykge1xuICAgICAgICBpLmNyb3NzT3JpZ2luID0gJ2Fub3ltb3VzJztcbiAgICAgIH1cbiAgICAgIGkub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsYmFjayhudWxsLCB0aGlzKTtcbiAgICAgIH07XG4gICAgICBpLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjYWxsYmFjayhlLCBudWxsKTtcbiAgICAgIH07XG4gICAgICBpLnNyYyA9IHVybDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSB0eXBlO1xuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjYWxsYmFjayhudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICB9O1xuICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNhbGxiYWNrKGUsIG51bGwpO1xuICAgIH07XG5cbiAgICB4aHIuc2VuZCgpO1xuICB9XG59XG5cbi8qKlxyXG4gKiBBbiBBc3NldExvYWRlciBtYW5hZ2VzIGxvYWRpbmcgb25lIG9yIG1vcmUgYXNzZXRzLiAgSXQgaGFuZGxlcyBkZWJvdW5jaW5nIG9mXHJcbiAqIG9mIG11bHRpcGxlIHJlcXVlc3RzIGZvciB0aGUgc2FtZSBhc3NldCwgZXRjLlxyXG4gKi9cblxudmFyIEFzc2V0TG9hZGVyID0gKGZ1bmN0aW9uICgpIHtcblxuICAvKipcclxuICAgKiBOb29wLlxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEFzc2V0TG9hZGVyKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBc3NldExvYWRlcik7XG5cbiAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcbiAgICB0aGlzLl9hc3NldHMgPSB7fTtcbiAgfVxuXG4gIC8qKlxyXG4gICAqIExvYWRzIGEgc2luZ2xlIGFzc2V0LlxyXG4gICAqXHJcbiAgICogSWYgdGhlIGFzc2V0IGlzIGFscmVhZHkgbG9hZGVkLCB0aGUgY2FsbGJhY2sgaXMgaW1tZWRpYXRlbHkgaW52b2tlZC5cclxuICAgKiBAc2VlIGxvYWRSZXNvdXJjZVxyXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhBc3NldExvYWRlciwgW3tcbiAgICBrZXk6ICdsb2FkQXNzZXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkQXNzZXQodXJsLCB0eXBlLCBjYWxsYmFjaykge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIG5hbWUgPSAnXycgKyBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICAgIGlmICh0aGlzLl9hc3NldHNbbmFtZV0pIHtcbiAgICAgICAgLy8gVE9ETzogYm91bmNlIHRoaXMgb3V0IG9mIHRoZSBjdXJyZW50IGV4ZWN1dGlvblxuICAgICAgICBjYWxsYmFjayhudWxsLCB0aGlzLl9hc3NldHNbbmFtZV0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9jYWxsYmFja3NbbmFtZV0gPSB0aGlzLl9jYWxsYmFja3NbbmFtZV0gfHwgW107XG4gICAgICB0aGlzLl9jYWxsYmFja3NbbmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgICBpZiAoIXRoaXMuX2Fzc2V0cy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICB0aGlzLl9hc3NldHNbbmFtZV0gPSBmYWxzZTtcbiAgICAgICAgbG9hZFJlc291cmNlKHVybCwgdHlwZSwgZnVuY3Rpb24gKGVyciwgdmFsdWUpIHtcbiAgICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgX3RoaXMuX2Fzc2V0c1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY2I7XG4gICAgICAgICAgd2hpbGUgKGNiID0gX3RoaXMuX2NhbGxiYWNrc1tuYW1lXS5zaGlmdCgpKSB7XG4gICAgICAgICAgICBjYihlcnIsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogTG9hZCBhIHNldCBvZiBhc3NldHMgaW4gcGFyYWxsZWxcclxuICAgICAqIEBwYXJhbSAge0FycmF5fSAgIHVybHMgICAgICBBcnJheSBvZiB1cmxzIG9mIHJlc291cmNlc1xyXG4gICAgICogQHBhcmFtICB7QXJyYXl9ICAgdHlwZXMgICAgIEFycmF5IG9mIHR5cGVzIG9mIHJlc291cmNlc1xyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCByZXNvdXJjZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqIEBzZWUgIGxvYWRSZXNvdXJjZVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdsb2FkQXNzZXRHcm91cCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvYWRBc3NldEdyb3VwKHVybHMsIHR5cGVzLCBjYWxsYmFjaykge1xuICAgICAgaWYgKHVybHMubGVuZ3RoICE9PSB0eXBlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgJ0luY29tcGF0aWJsZSB0eXBlczogdHlwZXMubGVuZ3RoID0gJyArIHR5cGVzLmxlbmd0aCArICc7IHVybHMubGVuZ3RoID0gJyArIHVybHMubGVuZ3RoO1xuICAgICAgfVxuICAgICAgdmFyIGxlbiA9IHVybHMubGVuZ3RoLFxuICAgICAgICAgIHJlc3VsdHMgPSBuZXcgQXJyYXkobGVuKTtcbiAgICAgIHZhciBvbkVhY2ggPSBmdW5jdGlvbiBvbkVhY2goaWR4LCBlcnIsIHZhbHVlKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBjYWxsYmFjayhlcnIsIG51bGwpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHRzW2lkeF0gPSB2YWx1ZTtcbiAgICAgICAgdmFyIGksXG4gICAgICAgICAgICByID0gdHJ1ZTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgciA9IHIgJiYgcmVzdWx0c1tpXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocikge1xuICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1cmxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMubG9hZEFzc2V0KHVybHNbaV0sIHR5cGVzW2ldLCBvbkVhY2guYmluZCh1bmRlZmluZWQsIGkpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIERpcmVjdGx5IHJldHJpZXZlIGFuIGFzc2V0IGZyb20gdGhlIGNhY2hlXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgVGhlIGNhY2hlIGtleVxyXG4gICAgICogQHJldHVybiB7bWl4ZWR9ICAgICAgIFRoZSBjYWNoZWQgYXNzZXQsIGlmIGl0IGV4aXN0cy5cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnZ2V0QXNzZXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBc3NldChuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYXNzZXRzW25hbWVdO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBc3NldExvYWRlcjtcbn0pKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEFzc2V0TG9hZGVyOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9nbEJvdW5kID0gcmVxdWlyZSgnLi9nbC1ib3VuZCcpO1xuXG52YXIgX2dsQm91bmQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xCb3VuZCk7XG5cbnZhciBfYXNzZXRMb2FkZXIgPSByZXF1aXJlKCcuL2Fzc2V0LWxvYWRlcicpO1xuXG52YXIgX2Fzc2V0TG9hZGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2V0TG9hZGVyKTtcblxudmFyIF9tZXNoRmlsZSA9IHJlcXVpcmUoJy4vbWVzaC9maWxlJyk7XG5cbnZhciBfbWVzaEZpbGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWVzaEZpbGUpO1xuXG52YXIgX3RleHR1cmUgPSByZXF1aXJlKCcuL3RleHR1cmUnKTtcblxudmFyIF90ZXh0dXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RleHR1cmUpO1xuXG52YXIgX3Byb2dyYW0gPSByZXF1aXJlKCcuL3Byb2dyYW0nKTtcblxudmFyIF9wcm9ncmFtMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb2dyYW0pO1xuXG52YXIgX3Byb2dyYW1HbG93cmFtcCA9IHJlcXVpcmUoJy4vcHJvZ3JhbS9nbG93cmFtcCcpO1xuXG52YXIgX3Byb2dyYW1HbG93cmFtcDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9ncmFtR2xvd3JhbXApO1xuXG52YXIgX3Byb2dyYW1PcGFxdWUgPSByZXF1aXJlKCcuL3Byb2dyYW0vb3BhcXVlJyk7XG5cbnZhciBfcHJvZ3JhbU9wYXF1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9ncmFtT3BhcXVlKTtcblxudmFyIF9wcm9ncmFtcyA9IHtcbiAgJ0dsb3dyYW1wJzogX3Byb2dyYW1HbG93cmFtcDJbJ2RlZmF1bHQnXSxcbiAgJ09wYXF1ZSc6IF9wcm9ncmFtT3BhcXVlMlsnZGVmYXVsdCddXG59O1xuXG5mdW5jdGlvbiBhcmVMb2FkaW5nKG4sIGUpIHtcbiAgaWYgKGUgPT09IDApIHtcbiAgICBuKys7XG4gIH1cbiAgcmV0dXJuIG47XG59XG5cbmZ1bmN0aW9uIGFyZUxvYWRlZChuLCBlKSB7XG4gIGlmIChlID4gMCkge1xuICAgIG4rKztcbiAgfVxuICByZXR1cm4gbjtcbn1cblxuZnVuY3Rpb24gYXJlRXJyb3IobiwgZSkge1xuICBpZiAoZSA8IDApIHtcbiAgICBuKys7XG4gIH1cbiAgcmV0dXJuIG47XG59XG5cbmZ1bmN0aW9uIHNpbXBsZU1lcmdlKGxlZnQsIHJpZ2h0KSB7XG4gIGxlZnQgPSBsZWZ0IHx8IHt9O1xuICBmb3IgKHZhciBpIGluIHJpZ2h0KSB7XG4gICAgbGVmdFtpXSA9IHJpZ2h0W2ldO1xuICB9XG4gIHJldHVybiBsZWZ0O1xufVxuXG5mdW5jdGlvbiBtZXJnZU1hbmlmZXN0cyhiYXNlLCBhZGQpIHtcbiAgdmFyIGtleXMgPSBbJ3RleHR1cmUnLCAnbWVzaCcsICdwcm9ncmFtJywgJ3Jhd1Byb2dyYW0nXTtcbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5IGluIGFkZCkge1xuICAgICAgYmFzZVtrZXldID0gc2ltcGxlTWVyZ2UoYmFzZVtrZXldLCBhZGRba2V5XSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGJhc2U7XG59XG5cbi8qKlxyXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIGdldCBzb21lIGluZm8gb24gbG9hZGluZyBzdGF0ZXMuXHJcbiAqIEBwYXJhbSAge0FycmF5fSBxdWV1ZSAgTGlzdCBvZiBzdGF0dXMgY29kZXMsIG9uZSBwZXIgcmVxdWVzdFxyXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgIFNob3J0IHN1bW1hcnkgb2YgdGhlIHN0YXRlIG9mIHRoZSBxdWV1ZS5cclxuICovXG5mdW5jdGlvbiBzdW1tYXJpemUocXVldWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3RhbDogcXVldWUubGVuZ3RoLFxuICAgIGxvYWRpbmc6IHF1ZXVlLnJlZHVjZShhcmVMb2FkaW5nLCAwKSxcbiAgICBsb2FkZWQ6IHF1ZXVlLnJlZHVjZShhcmVMb2FkZWQsIDApLFxuICAgIGVycm9yOiBxdWV1ZS5yZWR1Y2UoYXJlRXJyb3IsIDApXG4gIH07XG59XG5cbi8qKlxyXG4gKiBBbiBBc3NldE1hbmFnZXIgbWFuYWdlcyBhbGwgdGhlIHZhcmlvdXMgdHlwZXMgb2YgYXNzZXRzIHRoYXQgbmVlZCB0byBiZSBib3VuZCB0b1xyXG4gKiB0byBhIGdsIGNvbnRleHQuICBJdCB1c2VzIGFuIEFzc2V0TG9hZGVyIHRvIGhhbmRsZSB0aGUgbG9hZGluZyBhbmQgY2FjaGluZyBvZiB0aGVcclxuICogYXNzZXQgc291cmNlcywgYW5kIGFsc28gbWFpbnRhaW5zIGEgcGFyYWxsZWwgY2FjaGUgb2YgdGhlIGJvdW5kIHJlc291cmNlcy5cclxuICovXG5cbnZhciBBc3NldE1hbmFnZXIgPSAoZnVuY3Rpb24gKF9HTEJvdW5kKSB7XG4gIF9pbmhlcml0cyhBc3NldE1hbmFnZXIsIF9HTEJvdW5kKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGFuIGFzc2V0IGxvYWRlci5cclxuICAgKiBAcGFyYW0gIHtjb250ZXh0fSBnbCAgICAgIEEgM2QgY29udGV4dCBmcm9tIGEgY2FudmFzXHJcbiAgICogQHBhcmFtICB7T2JqZWN0fSBtYW5pZmVzdCBBIG1hcHBpbmcgb2Yga2V5OnZhbHVlIHBhaXJzIGZvciB0aGUgZm9sbG93aW5nIHR5cGVzOlxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZSwgbWVzaCwgcHJvZ3JhbSwgcmF3UHJvZ3JhbVxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEFzc2V0TWFuYWdlcihnbCwgbWFuaWZlc3QpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXNzZXRNYW5hZ2VyKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEFzc2V0TWFuYWdlci5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsKTtcbiAgICB0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG4gICAgdGhpcy5sb2FkZXIgPSBuZXcgX2Fzc2V0TG9hZGVyMlsnZGVmYXVsdCddKCk7XG4gICAgdGhpcy50ZXh0dXJlcyA9IHt9O1xuICAgIHRoaXMubWVzaGVzID0ge307XG4gICAgdGhpcy5wcm9ncmFtcyA9IHt9O1xuICAgIHRoaXMucXVldWVzID0ge1xuICAgICAgdGV4dHVyZTogW10sXG4gICAgICBtZXNoOiBbXSxcbiAgICAgIHByb2dyYW06IFtdXG4gICAgfTtcbiAgICB0aGlzLnN0YXRzID0ge1xuICAgICAgdGV4dHVyZToge30sXG4gICAgICBtZXNoOiB7fSxcbiAgICAgIHByb2dyYW06IHt9LFxuICAgICAgcmF3UHJvZ3JhbToge31cbiAgICB9O1xuICAgIHRoaXMuY29tcGxldGUgPSBudWxsO1xuICAgIHRoaXMucGF0aCA9ICcvYXNzZXRzLyc7XG4gIH1cblxuICAvKipcclxuICAgKiBNZXJnZXMgaW4gYW5vdGhlciBtYW5pZmVzdCB0byB0aGUgZXhpc3RpbmcgYXNzZXQgbWFuaWZlc3RcclxuICAgKlxyXG4gICAqIEFkZGl0aW9uYWwgbWFuaWZlc3RzIHNob3VsZCBiZSBtZXJnZWQgaW4gYmVmb3JlIGxvYWRpbmcuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG1hbmlmZXN0IEBzZWUgY29uc3RydWN0b3JcclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoQXNzZXRNYW5hZ2VyLCBbe1xuICAgIGtleTogJ2FkZEFzc2V0cycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEFzc2V0cyhtYW5pZmVzdCkge1xuICAgICAgdGhpcy5tYW5pZmVzdCA9IG1lcmdlTWFuaWZlc3RzKHRoaXMubWFuaWZlc3QsIG1hbmlmZXN0KTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBib3VuZCB0ZXh0dXJlIHRvIHRoZSB0ZXh0dXJlIGNhY2hlLCB1bmRlciBhIGdpdmVuIGludGVybmFsIG5hbWVcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICAgICBUZXh0dXJlIGludGVybmFsIG5hbWVcclxuICAgICAqIEBwYXJhbSB7VGV4dHVyZX0gdGV4dHVyZSBBIGJvdW5kIFRleHR1cmVcclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnYWRkVGV4dHVyZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZFRleHR1cmUobmFtZSwgdGV4dHVyZSkge1xuICAgICAgdGhpcy50ZXh0dXJlc1tuYW1lXSA9IHRleHR1cmU7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgYm91bmQgbWVzaCB0byB0aGUgbWVzaCBjYWNoZSwgdW5kZXIgYSBnaXZlbiBpbnRlcm5hbCBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBNZXNoIGludGVybmFsIG5hbWVcclxuICAgICAqIEBwYXJhbSB7TWVzaH0gbWVzaCAgIEEgYm91bmQgbWVzaFxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdhZGRNZXNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkTWVzaChuYW1lLCBtZXNoKSB7XG4gICAgICB0aGlzLm1lc2hlc1tuYW1lXSA9IG1lc2g7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgYm91bmQgcHJvZ3JhbSB0byB0aGUgcHJvZ3JhbSBjYWNoZSwgdW5kZXIgYSBnaXZlbiBpbnRlcm5hbCBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAgICAgUHJvZ3JhbSBpbnRlcm5hbCBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge1Byb2dyYW19IHByb2dyYW0gQSBib3VuZCBQcm9ncmFtXHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ2FkZFByb2dyYW0nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRQcm9ncmFtKG5hbWUsIHByb2dyYW0pIHtcbiAgICAgIHRoaXMucHJvZ3JhbXNbbmFtZV0gPSBwcm9ncmFtO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIGJvdW5kIHRleHR1cmUgZGlyZWN0bHkgZnJvbSB0aGUgY2FjaGUuXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgVGV4dHVyZSBpbnRlcm5hbCBuYW1lXHJcbiAgICAgKiBAcmV0dXJuIHtUZXh0dXJlfSAgICAgVGhlIGJvdW5kIHRleHR1cmUsIG9yIHVuZGVmaW5lZCBpZiBpdCBkb2VzIG5vdFxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgIGV4aXN0IG9yIGlzIG5vdCB5ZXQgbG9hZGVkLlxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRUZXh0dXJlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VGV4dHVyZShuYW1lKSB7XG4gICAgICB2YXIgdGV4dHVyZSA9IHRoaXMudGV4dHVyZXNbbmFtZV07XG4gICAgICBpZiAodGV4dHVyZSkge1xuICAgICAgICB0aGlzLnN0YXRzLnRleHR1cmVbbmFtZV0gPSAodGhpcy5zdGF0cy50ZXh0dXJlW25hbWVdIHx8IDApICsgMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZXh0dXJlO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIGJvdW5kIG1lc2ggZGlyZWN0bHkgZnJvbSB0aGUgY2FjaGUuXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgTWVzaCBpbnRlcm5hbCBuYW1lXHJcbiAgICAgKiBAcmV0dXJuIHtNZXNofSAgICAgICAgVGhlIGJvdW5kIG1lc2gsIG9yIHVuZGVmaW5lZCBpZiBpdCBkb2VzIG5vdFxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgIGV4aXN0IG9yIGlzIG5vdCB5ZXQgbG9hZGVkLlxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRNZXNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0TWVzaChuYW1lKSB7XG4gICAgICB2YXIgbWVzaCA9IHRoaXMubWVzaGVzW25hbWVdO1xuICAgICAgaWYgKG1lc2gpIHtcbiAgICAgICAgdGhpcy5zdGF0cy5tZXNoW25hbWVdID0gKHRoaXMuc3RhdHMubWVzaFtuYW1lXSB8fCAwKSArIDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWVzaDtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEdldHMgYSBib3VuZCBwcm9ncmFtIGRpcmVjdGx5IGZyb20gdGhlIGNhY2hlLlxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIFByb2dyYW0gaW50ZXJuYWwgbmFtZVxyXG4gICAgICogQHJldHVybiB7UHJvZ3JhbX0gICAgIFRoZSBib3VuZCBwcm9ncmFtLCBvciB1bmRlZmluZWQgaWYgaXQgZG9lcyBub3RcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICBleGlzdCBvciBpcyBub3QgeWV0IGxvYWRlZC5cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnZ2V0UHJvZ3JhbScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFByb2dyYW0obmFtZSkge1xuICAgICAgdmFyIHByb2cgPSB0aGlzLnByb2dyYW1zW25hbWVdO1xuICAgICAgaWYgKHByb2cpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHMucmF3UHJvZ3JhbS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIHRoaXMuc3RhdHMucmF3UHJvZ3JhbVtuYW1lXSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3RhdHMucHJvZ3JhbVtuYW1lXSA9ICh0aGlzLnN0YXRzLnByb2dyYW1bbmFtZV0gfHwgMCkgKyAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvZztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIExvYWRzIGFsbCByZW1vdGUgcmVzb3VyY2VzIGZvdW5kIGluIHRoZSBtYW5pZmVzdCwgYW5kIGNyZWF0ZXMgYW55IHN0YXRpYyBwcm9ncmFtc1xyXG4gICAgICogaW5jbHVkZWQgaW4gdGhlIG1hbmlmZXN0J3MgcmF3UHJvZ3JhbXMgc2VjdGlvbiwgaWYgaXQgZXhpc3RzLlxyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIGludm9rZWQgdXBvbiBjb21wbGV0aW9uXHJcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gICAgICAgICAgUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB0byBnZXQgaW5mb3JtYXRpb25cclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbiBsb2FkaW5nIHN0YXR1cy4gQHNlZSBnZXRTdGF0dXNcclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnbG9hZEFsbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvYWRBbGwoY2FsbGJhY2spIHtcbiAgICAgIHZhciBpLFxuICAgICAgICAgIGFzc2V0LFxuICAgICAgICAgIG1hbmlmZXN0ID0gdGhpcy5tYW5pZmVzdDtcbiAgICAgIHRoaXMuY29tcGxldGUgPSBjYWxsYmFjaztcbiAgICAgIGZvciAoaSBpbiBtYW5pZmVzdC50ZXh0dXJlKSB7XG4gICAgICAgIGlmIChtYW5pZmVzdC50ZXh0dXJlLmhhc093blByb3BlcnR5KGkpICYmICEoaSBpbiB0aGlzLnRleHR1cmVzKSkge1xuICAgICAgICAgIHRoaXMudGV4dHVyZXNbaV0gPSBudWxsO1xuICAgICAgICAgIGFzc2V0ID0gbWFuaWZlc3QudGV4dHVyZVtpXTtcbiAgICAgICAgICB0aGlzLmxvYWRlci5sb2FkQXNzZXQoKCFhc3NldFsnc3RhdGljJ10gPyB0aGlzLnBhdGggOiAnJykgKyBhc3NldC5wYXRoLCAnaW1hZ2UnLCB0aGlzLl9oYW5kbGVUZXh0dXJlLmJpbmQodGhpcywgdGhpcy5xdWV1ZXMudGV4dHVyZS5sZW5ndGgsIGksIGFzc2V0KSk7XG4gICAgICAgICAgdGhpcy5xdWV1ZXMudGV4dHVyZS5wdXNoKDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGkgaW4gbWFuaWZlc3QubWVzaCkge1xuICAgICAgICBpZiAobWFuaWZlc3QubWVzaC5oYXNPd25Qcm9wZXJ0eShpKSAmJiAhKGkgaW4gdGhpcy5tZXNoZXMpKSB7XG4gICAgICAgICAgdGhpcy5tZXNoZXNbaV0gPSBudWxsO1xuICAgICAgICAgIGFzc2V0ID0gbWFuaWZlc3QubWVzaFtpXTtcbiAgICAgICAgICB0aGlzLmxvYWRlci5sb2FkQXNzZXQoKCFhc3NldFsnc3RhdGljJ10gPyB0aGlzLnBhdGggOiAnJykgKyBhc3NldC5wYXRoLCAnYXJyYXlidWZmZXInLCB0aGlzLl9oYW5kbGVNZXNoLmJpbmQodGhpcywgdGhpcy5xdWV1ZXMubWVzaC5sZW5ndGgsIGksIGFzc2V0KSk7XG4gICAgICAgICAgdGhpcy5xdWV1ZXMubWVzaC5wdXNoKDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGkgaW4gbWFuaWZlc3QucHJvZ3JhbSkge1xuICAgICAgICBpZiAobWFuaWZlc3QucHJvZ3JhbS5oYXNPd25Qcm9wZXJ0eShpKSAmJiAhKGkgaW4gdGhpcy5wcm9ncmFtcykpIHtcbiAgICAgICAgICB0aGlzLnByb2dyYW1zW2ldID0gbnVsbDtcbiAgICAgICAgICBhc3NldCA9IG1hbmlmZXN0LnByb2dyYW1baV07XG4gICAgICAgICAgdGhpcy5sb2FkZXIubG9hZEFzc2V0R3JvdXAoWyghYXNzZXRbJ3N0YXRpYyddID8gdGhpcy5wYXRoIDogJycpICsgYXNzZXQudmVydGV4LCAoIWFzc2V0WydzdGF0aWMnXSA/IHRoaXMucGF0aCA6ICcnKSArIGFzc2V0LmZyYWdtZW50XSwgWyd0ZXh0JywgJ3RleHQnXSwgdGhpcy5faGFuZGxlUHJvZ3JhbS5iaW5kKHRoaXMsIHRoaXMucXVldWVzLnByb2dyYW0ubGVuZ3RoLCBpLCBhc3NldCkpO1xuICAgICAgICAgIHRoaXMucXVldWVzLnByb2dyYW0ucHVzaCgwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChpIGluIG1hbmlmZXN0LnJhd1Byb2dyYW0pIHtcbiAgICAgICAgaWYgKG1hbmlmZXN0LnJhd1Byb2dyYW0uaGFzT3duUHJvcGVydHkoaSkgJiYgIShpIGluIHRoaXMucHJvZ3JhbXMpKSB7XG4gICAgICAgICAgdGhpcy5zdGF0cy5yYXdQcm9ncmFtW2ldID0gMDtcbiAgICAgICAgICB0aGlzLl9jcmVhdGVQcm9ncmFtKGksIG1hbmlmZXN0LnJhd1Byb2dyYW1baV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmdldFN0YXR1cy5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHNtYWxsIHN1bW1hcnkgb2YgYWxsIHRoZSBsb2FkZXIgcXVldWVzIGZvciBhbGwgYXNzZXRzLlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBIHN1bW1hcnkgb2YgZWFjaCBxdWV1ZS4gQHNlZSBzdW1tYXJpemVcclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnZ2V0U3RhdHVzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U3RhdHVzKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dHVyZTogc3VtbWFyaXplKHRoaXMucXVldWVzLnRleHR1cmUpLFxuICAgICAgICBtZXNoOiBzdW1tYXJpemUodGhpcy5xdWV1ZXMubWVzaCksXG4gICAgICAgIHByb2dyYW06IHN1bW1hcml6ZSh0aGlzLnF1ZXVlcy5wcm9ncmFtKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlcyBhIGNvbXBhY3QgbWFuaWZlc3QgY29udGFpbmluZyBvbmx5IHRoZSByZXNvdXJjZXMgdGhhdCBoYXZlIGJlZW5cclxuICAgICAqIGFjdHVhbGx5IGJlIGZldGNoZWQgZnJvbSB0aGUgY2FjaGUsIGFmdGVyIGxvYWRpbmcuICBVc2VmdWwgdG8gcmVkdWNlIGxvYWRpbmdcclxuICAgICAqIHRpbWUgZm9yIHNjZW5lcyB0aGF0IG9ubHkgdXNlIGEgZmV3IHJlc291cmNlcy5cclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQSBtYW5pZmVzdCBjb250YWluaW5nIG9ubHkgdGhlIHJlc291cmNlcyB0aGF0IHdlcmUgYWN0dWFsbHkgdXNlZFxyXG4gICAgICogICAgICAgICAgICAgICAgICBhZnRlciBsb2FkaW5nLlxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdnZW5lcmF0ZU1hbmlmZXN0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2VuZXJhdGVNYW5pZmVzdCgpIHtcbiAgICAgIHZhciBtYW5pZmVzdCA9IHt9LFxuICAgICAgICAgIGtleXMgPSBbJ3RleHR1cmUnLCAnbWVzaCcsICdyYXdQcm9ncmFtJywgJ3Byb2dyYW0nXTtcbiAgICAgIGtleXMuZm9yRWFjaCgoZnVuY3Rpb24gKHNlY3Rpb24pIHtcbiAgICAgICAgbWFuaWZlc3Rbc2VjdGlvbl0gPSB7fTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnN0YXRzW3NlY3Rpb25dKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHNbc2VjdGlvbl0uaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5zdGF0c1tzZWN0aW9uXVtpXSA+IDApIHtcbiAgICAgICAgICAgIG1hbmlmZXN0W3NlY3Rpb25dW2ldID0gdGhpcy5tYW5pZmVzdFtzZWN0aW9uXVtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgICAgcmV0dXJuIG1hbmlmZXN0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19pc0NvbXBsZXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2lzQ29tcGxldGUoKSB7XG4gICAgICB2YXIgc3RhdHVzID0gdGhpcy5nZXRTdGF0dXMoKTtcbiAgICAgIGlmICh0aGlzLmNvbXBsZXRlICYmIHN0YXR1cy50ZXh0dXJlLmxvYWRpbmcgPT09IDAgJiYgc3RhdHVzLm1lc2gubG9hZGluZyA9PT0gMCAmJiBzdGF0dXMucHJvZ3JhbS5sb2FkaW5nID09PSAwKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfaGFuZGxlVGV4dHVyZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVUZXh0dXJlKGlkeCwgbmFtZSwgaW5mbywgZXJyLCB2YWx1ZSkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICB0aGlzLnF1ZXVlcy50ZXh0dXJlW2lkeF0gPSAtMTtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB0aHJvdyAnQ291bGQgbm90IGxvYWQgJyArIG5hbWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWRkVGV4dHVyZShuYW1lLCBuZXcgX3RleHR1cmUyWydkZWZhdWx0J10odGhpcy5fZ2wsIGluZm8sIHZhbHVlKSk7XG4gICAgICB0aGlzLnF1ZXVlcy50ZXh0dXJlW2lkeF0gPSAxO1xuICAgICAgdGhpcy5faXNDb21wbGV0ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19oYW5kbGVNZXNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2hhbmRsZU1lc2goaWR4LCBuYW1lLCBpbmZvLCBlcnIsIHZhbHVlKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHRoaXMucXVldWVzLm1lc2hbaWR4XSA9IC0xO1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIHRocm93ICdDb3VsZCBub3QgbG9hZCAnICsgbmFtZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hZGRNZXNoKG5hbWUsIG5ldyBfbWVzaEZpbGUyWydkZWZhdWx0J10odGhpcy5fZ2wsIHZhbHVlKSk7XG4gICAgICB0aGlzLnF1ZXVlcy5tZXNoW2lkeF0gPSAxO1xuICAgICAgdGhpcy5faXNDb21wbGV0ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19jcmVhdGVQcm9ncmFtJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NyZWF0ZVByb2dyYW0obmFtZSwgaW5mbykge1xuICAgICAgdmFyIEtsYXNzID0gX3Byb2dyYW0yWydkZWZhdWx0J107XG4gICAgICBpZiAoaW5mby5wcm9ncmFtIGluIF9wcm9ncmFtcykge1xuICAgICAgICBLbGFzcyA9IF9wcm9ncmFtc1tpbmZvLnByb2dyYW1dO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGRQcm9ncmFtKG5hbWUsIG5ldyBLbGFzcyh0aGlzLl9nbCwgaW5mby52ZXJ0ZXgsIGluZm8uZnJhZ21lbnQpKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfaGFuZGxlUHJvZ3JhbScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVQcm9ncmFtKGlkeCwgbmFtZSwgaW5mbywgZXJyLCB2YWxzKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHRoaXMucXVldWVzLnByb2dyYW1baWR4XSA9IC0xO1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIHRocm93ICdDb3VsZCBub3QgbG9hZCAnICsgbmFtZTtcbiAgICAgIH1cblxuICAgICAgdmFyIEtsYXNzID0gX3Byb2dyYW0yWydkZWZhdWx0J107XG4gICAgICBpZiAoaW5mby5wcm9ncmFtIGluIF9wcm9ncmFtcykge1xuICAgICAgICBLbGFzcyA9IF9wcm9ncmFtc1tpbmZvLnByb2dyYW1dO1xuICAgICAgfVxuICAgICAgdGhpcy5hZGRQcm9ncmFtKG5hbWUsIG5ldyBLbGFzcyh0aGlzLl9nbCwgdmFsc1swXSwgdmFsc1sxXSkpO1xuICAgICAgdGhpcy5xdWV1ZXMucHJvZ3JhbVtpZHhdID0gMTtcbiAgICAgIHRoaXMuX2lzQ29tcGxldGUoKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQXNzZXRNYW5hZ2VyO1xufSkoX2dsQm91bmQyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBBc3NldE1hbmFnZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG4vKipcclxuICogQSBDYW1lcmEgaXMgYSBjbGFzcyB0byBtYW5hZ2UgdmlldyBvZiB0aGUgc2NlbmUuXHJcbiAqL1xuXG52YXIgQ2FtZXJhID0gKGZ1bmN0aW9uICgpIHtcblxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgY2FtZXJhXHJcbiAgICpcclxuICAgKiBAY2hhaW5hYmxlXHJcbiAgICogQHJldHVybiB7dGhpc31cclxuICAgKi9cblxuICBmdW5jdGlvbiBDYW1lcmEod2lkdGgsIGhlaWdodCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDYW1lcmEpO1xuXG4gICAgdGhpcy5wb3NpdGlvbiA9IF9nbE1hdHJpeC52ZWMzLmNyZWF0ZSgpO1xuICAgIHRoaXMudmlldyA9IF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpO1xuICAgIHRoaXMucHJvamVjdCA9IF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpO1xuICAgIHRoaXMudmlld1Byb2plY3QgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICB0aGlzLmhGb1YgPSBNYXRoLlBJIC8gNDtcbiAgICB0aGlzLm5lYXIgPSAwLjE7XG4gICAgdGhpcy5mYXIgPSAxMDA7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuZm9jdXMgPSBfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKTtcbiAgICB0aGlzLnVwID0gX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygwLCAxLCAwKTtcbiAgICByZXR1cm4gdGhpcy5fdXBkYXRlUHJvamVjdGlvbigpLl91cGRhdGVWaWV3KCk7XG4gIH1cblxuICAvKipcclxuICAgKiBHZW5lcmF0ZXMgYSB2aWV3IG1hdHJpeCwgYXMgaWYgdGhlIGNhbWVyYSBpcyBsb29raW5nIGF0IHRoZSBzcGVjaWZpZWQgcG9pbnQuXHJcbiAgICpcclxuICAgKiBAY2hhaW5hYmxlXHJcbiAgICogQHBhcmFtICB7dmVjM30gcG9pbnQgICBUaGUgcG9pbnQgdG8gbG9vayBhdFxyXG4gICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKENhbWVyYSwgW3tcbiAgICBrZXk6ICdsb29rQXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsb29rQXQocG9pbnQpIHtcbiAgICAgIF9nbE1hdHJpeC52ZWMzLmNvcHkodGhpcy5mb2N1cywgcG9pbnQpO1xuICAgICAgcmV0dXJuIHRoaXMuX3VwZGF0ZVZpZXcoKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIE1vdmVzIHRoZSBjYW1lcmEncyBwb3NpdGlvbiBpbiBzb21lIGRpcmVjdGlvblxyXG4gICAgICpcclxuICAgICAqIE1haW50YWlucyB0aGUgY2FtZXJhJ3MgY3VycmVudCBmb2N1cy5cclxuICAgICAqXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKiBAcGFyYW0gIHt2ZWMzfSB2ZWMgICBUaGUgdmVjdG9yIHRvIHRyYW5zbGF0ZSBieVxyXG4gICAgICogQHJldHVybiB7dGhpc31cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAndHJhbnNsYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJhbnNsYXRlKHZlYykge1xuICAgICAgX2dsTWF0cml4LnZlYzMudHJhbnNsYXRlKHRoaXMucG9zaXRpb24sIHRoaXMucG9zaXRpb24sIHZlYyk7XG4gICAgICByZXR1cm4gdGhpcy5fdXBkYXRlVmlldygpO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY2FtZXJhJ3MgcG9zaXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKiBAcGFyYW0ge3ZlYzN9IHBvc2l0aW9uIENhbWVyYSBwb3NpdGlvblxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdzZXRQb3NpdGlvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICBfZ2xNYXRyaXgudmVjMy5jb3B5KHRoaXMucG9zaXRpb24sIHBvc2l0aW9uKTtcbiAgICAgIHJldHVybiB0aGlzLl91cGRhdGVWaWV3KCk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHZpZXdwb3J0IGRpbWVuc2lvbnMgYW5kIHVwZGF0ZSB0aGUgcHJvamVjdGlvbiBtYXRyaXhcclxuICAgICAqXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGggIFZpZXdwb3J0IHdpZHRoXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IFZpZXdwb3J0IGhlaWdodFxyXG4gICAgICogQHJldHVybiB7dGhpc31cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnc2V0RGltZW5zaW9ucycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldERpbWVuc2lvbnMod2lkdGgsIGhlaWdodCkge1xuICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICByZXR1cm4gdGhpcy5fdXBkYXRlUHJvamVjdGlvbigpO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBob3Jpem9udGFsIGZpZWxkIG9mIHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZm92IEZpZWxkIG9mIHZpZXcsIGluIHJhZGlhbnNcclxuICAgICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3NldEZpZWxkT2ZWaWV3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0RmllbGRPZlZpZXcoZm92KSB7XG4gICAgICB0aGlzLmhGb1YgPSBmb3Y7XG4gICAgICByZXR1cm4gdGhpcy5fdXBkYXRlUHJvamVjdGlvbigpO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZmFyIGNsaXAgZGlzdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZmFyIE1heCB2aWV3YWJsZSBkaXN0YW5jZVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdzZXRGYXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRGYXIoZmFyKSB7XG4gICAgICB0aGlzLmZhciA9IGZhcjtcbiAgICAgIHJldHVybiB0aGlzLl91cGRhdGVQcm9qZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjYW1lcmEncyB2aWV3IG1hdHJpeCBmcm9tIGFsbCBwYXJhbWV0ZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ191cGRhdGVWaWV3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZVZpZXcoKSB7XG4gICAgICBfZ2xNYXRyaXgubWF0NC5sb29rQXQodGhpcy52aWV3LCB0aGlzLnBvc2l0aW9uLCB0aGlzLmZvY3VzLCB0aGlzLnVwKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHRoZSBjYW1lcmEncyBwcm9qZWN0aW9uIG1hdHJpeFxyXG4gICAgICpcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ191cGRhdGVQcm9qZWN0aW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZVByb2plY3Rpb24oKSB7XG4gICAgICBfZ2xNYXRyaXgubWF0NC5wZXJzcGVjdGl2ZSh0aGlzLnByb2plY3QsIHRoaXMuaEZvViwgdGhpcy53aWR0aCAvIHRoaXMuaGVpZ2h0LCB0aGlzLm5lYXIsIHRoaXMuZmFyKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBDYW1lcmE7XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBDYW1lcmE7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbi8qKlxyXG4gKiBBIGJ1bmNoIG9mIHVzZWZ1bCBjb25zdGFudHMuXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xudmFyIENvbnN0YW50cyA9IHtcbiAgLyoqXHJcbiAgICogU2hvcnQgbGlzdCBvZiB0ZWFtIGNvbG9ycyBieSBpbnRlcm5hbCBuYW1lLlxyXG4gICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICovXG4gIHRlYW1Db2xvcnM6IHtcbiAgICBSRVNJU1RBTkNFOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAsIDAuNzYwNzg0MzEzNzI1NDkwMiwgMSwgMS4wKSxcbiAgICBFTkxJR0hURU5FRDogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjE1Njg2Mjc0NTA5ODAzOTIsIDAuOTU2ODYyNzQ1MDk4MDM5MywgMC4xNTY4NjI3NDUwOTgwMzkyLCAxLjApLFxuICAgIE5FVVRSQUw6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC45NzY0NzA1ODgyMzUyOTQxLCAwLjk3NjQ3MDU4ODIzNTI5NDEsIDAuOTc2NDcwNTg4MjM1Mjk0MSwgMS4wKSxcbiAgICBMT0tJOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDEsIDAuMTU2ODYyNzQ1MDk4MDM5MiwgMC4xNTY4NjI3NDUwOTgwMzkyLCAxLjApXG4gIH0sXG4gIC8qKlxyXG4gICAqIFF1YWxpdHkgYW5kIGxldmVsIGNvbG9ycywgYnkgaW50ZXJuYWwgbmFtZS5cclxuICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAqL1xuICBxdWFsaXR5Q29sb3JzOiB7XG4gICAgRVhUUkVNRUxZX1JBUkU6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC45ODAzOTIxNTY4NjI3NDUxLCAwLjM5MjE1Njg2Mjc0NTA5ODAzLCAwLjM5MjE1Njg2Mjc0NTA5ODAzLCAxLjApLFxuICAgIFZFUllfUkFSRTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjk1Njg2Mjc0NTA5ODAzOTMsIDAuNTIxNTY4NjI3NDUwOTgwNCwgMC45MjU0OTAxOTYwNzg0MzE0LCAxLjApLFxuICAgIE1PUkVfUkFSRTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjc2NDcwNTg4MjM1Mjk0MTEsIDAsIDEsIDEuMCksXG4gICAgUkFSRTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjY2NjY2NjY2NjY2NjY2NjYsIDAuNTM3MjU0OTAxOTYwNzg0MywgMC45ODQzMTM3MjU0OTAxOTYsIDEuMCksXG4gICAgTEVTU19DT01NT046IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC40NTA5ODAzOTIxNTY4NjI3NSwgMC42NTg4MjM1Mjk0MTE3NjQ3LCAxLCAxLjApLFxuICAgIENPTU1PTjogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjUwOTgwMzkyMTU2ODYyNzQsIDAuOTUyOTQxMTc2NDcwNTg4MiwgMC43MDU4ODIzNTI5NDExNzY1LCAxLjApLFxuICAgIFZFUllfQ09NTU9OOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNjk4MDM5MjE1Njg2Mjc0NSwgMC42OTgwMzkyMTU2ODYyNzQ1LCAwLjY5ODAzOTIxNTY4NjI3NDUsIDEuMCksXG4gICAgTDE6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC45OTYwNzg0MzEzNzI1NDksIDAuODA3ODQzMTM3MjU0OTAyLCAwLjM1Mjk0MTE3NjQ3MDU4ODI2LCAxLjApLFxuICAgIEwyOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDEsIDAuNjUwOTgwMzkyMTU2ODYyOCwgMC4xODgyMzUyOTQxMTc2NDcwNiwgMS4wKSxcbiAgICBMMzogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygxLCAwLjQ1MDk4MDM5MjE1Njg2Mjc1LCAwLjA4MjM1Mjk0MTE3NjQ3MDU5LCAxLjApLFxuICAgIEw0OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuODk0MTE3NjQ3MDU4ODIzNiwgMCwgMCwgMS4wKSxcbiAgICBMNTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjk5MjE1Njg2Mjc0NTA5ODEsIDAuMTYwNzg0MzEzNzI1NDkwMiwgMC41NzI1NDkwMTk2MDc4NDMxLCAxLjApLFxuICAgIEw2OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuOTIxNTY4NjI3NDUwOTgwMywgMC4xNDkwMTk2MDc4NDMxMzcyNSwgMC44MDM5MjE1Njg2Mjc0NTEsIDEuMCksXG4gICAgTDc6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC43NTY4NjI3NDUwOTgwMzkyLCAwLjE0MTE3NjQ3MDU4ODIzNTMsIDAuODc4NDMxMzcyNTQ5MDE5NiwgMS4wKSxcbiAgICBMODogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjU4ODIzNTI5NDExNzY0NzEsIDAuMTUyOTQxMTc2NDcwNTg4MjUsIDAuOTU2ODYyNzQ1MDk4MDM5MywgMS4wKVxuICB9LFxuICAvKipcclxuICAgKiBDb2xvciBjb25zdGFudHMgZm9yIGFub21hbHkgbWFya2Vycy5cclxuICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAqL1xuICBhbm9tYWx5Q29sb3JzOiB7XG4gICAgMTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygxLjAsIDAuNTY4NjI3NDUwOTgwMzkyMSwgMC4yMTE3NjQ3MDU4ODIzNTI5NCwgMS4wKSxcbiAgICAyOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDEuMCwgMC4zMjE1Njg2Mjc0NTA5ODA0LCAwLjkwNTg4MjM1Mjk0MTE3NjUsIDEuMCksXG4gICAgMzogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjYxOTYwNzg0MzEzNzI1NDksIDAuMzUyOTQxMTc2NDcwNTg4MjYsIDEuMCwgMS4wKSxcbiAgICA0OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuODQzMTM3MjU0OTAxOTYwOCwgMC4yNzA1ODgyMzUyOTQxMTc2MywgMC4yNzA1ODgyMzUyOTQxMTc2MywgMS4wKSxcbiAgICA1OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDEuMCwgMC45NDUwOTgwMzkyMTU2ODYyLCAwLjAsIDEuMCksXG4gICAgNjogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjY1MDk4MDM5MjE1Njg2MjgsIDEuMCwgMC45MDE5NjA3ODQzMTM3MjU1LCAxLjApLFxuICAgIDc6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC41NzI1NDkwMTk2MDc4NDMxLCAwLjU4MDM5MjE1Njg2Mjc0NTEsIDAuNTkyMTU2ODYyNzQ1MDk4LCAxLjApXG4gIH0sXG4gIC8qKlxyXG4gICAqIEdsb3cgY29sb3JzIGZvciB0aGUgdmFyaW91cyBhcnRpZmFjdDxjb2xvcj5HbG93IGRlY29yYXRpb25zIGZvciBzaGFyZCBwb3J0YWxzIGFuZFxyXG4gICAqIHRhcmdldCBwb3J0YWxzLCBieSBzZXJpZXMuXHJcbiAgICogQHR5cGUge09iamVjdH1cclxuICAgKi9cbiAgYXJ0aWZhY3RHbG93Q29sb3JzOiB7XG4gICAgSGVsaW9zOiB7XG4gICAgICBSZWQ6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC45MiwgMC41MSwgMC4xNCwgMS4wKSxcbiAgICAgIFB1cnBsZTogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygxLjAsIDAuODcsIDAuNTUsIDEuMCksXG4gICAgICBUYXJnZXQ6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMS4wLCAwLjcyLCAwLjAsIDEuMClcbiAgICB9LFxuICAgIEFtYXI6IHtcbiAgICAgIFRhcmdldDogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjYyLCAwLjIyLCAwLjYyLCAxLjApLFxuICAgICAgUmVkOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNzksIDAuMTEsIDAuNDksIDEuMCksXG4gICAgICBQdXJwbGU6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC41OCwgMC4xNywgMS4wLCAxLjApXG4gICAgfSxcbiAgICBKYXJ2aXM6IHtcbiAgICAgIFRhcmdldDogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjYyLCAwLjIyLCAwLjYyLCAxLjApLFxuICAgICAgUmVkOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNzksIDAuMTEsIDAuNDksIDEuMCksXG4gICAgICBQdXJwbGU6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC41OCwgMC4xNywgMS4wLCAxLjApXG4gICAgfSxcbiAgICBTaG9uaW46IHtcbiAgICAgIFJlZDogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjc4LCAwLjg0LCAxLjAsIDEuMCksXG4gICAgICBQdXJwbGU6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC4yNSwgMC44MSwgMS4wLCAxLjApLFxuICAgICAgVGFyZ2V0OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNzAsIDAuNzAsIDAuNzAsIDEuMClcbiAgICB9LFxuICAgIExpZ2h0bWFuOiB7XG4gICAgICBSZWQ6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMS4wLCAwLjQ0LCAwLjQ1LCAxLjApLFxuICAgICAgUHVycGxlOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDEuMCwgMC4yNCwgMC4yNSwgMS4wKSxcbiAgICAgIFRhcmdldDogX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLjc0LCAwLjAsIDAuMDIsIDEuMClcbiAgICB9XG4gIH0sXG4gIC8qKlxyXG4gICAqIENvbnN0YW50cyBmb3IgeG0gZ2xvdyBjb2xvcnMgKGZvciBpdGVtIHhtIGNvcmVzKVxyXG4gICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICovXG4gIHhtQ29sb3JzOiB7XG4gICAgY29yZUdsb3c6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC45MiwgMC43LCAwLjg5LCAxLjApLFxuICAgIGNvcmVHbG93QWx0OiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNiwgMC40LCAwLjYsIDAuOCksXG4gICAgY29yZUdsb3dBZGE6IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMCwgMC43NjA3ODQzMTM3MjU0OTAyLCAxLCAxLjApLFxuICAgIGNvcmVHbG93SmFydmlzOiBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuMTU2ODYyNzQ1MDk4MDM5MiwgMC45NTY4NjI3NDUwOTgwMzkzLCAwLjE1Njg2Mjc0NTA5ODAzOTIsIDEuMClcbiAgfSxcbiAgLyoqXHJcbiAgICogTWVzaCBpbnRlcm5hbCBuYW1lIGNvbnN0YW50cy5cclxuICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAqL1xuICBNZXNoOiB7XG4gICAgSW52ZW50b3J5OiB7XG4gICAgICBYbXA6ICdYbXBNZXNoJyxcbiAgICAgIFhtcFhtOiAnWG1wWE1NZXNoJyxcbiAgICAgIFVsdHJhc3RyaWtlOiAnVWx0cmFzdHJpa2VNZXNoJyxcbiAgICAgIFVsdHJhc3RyaWtlWG06ICdVbHRyYXN0cmlrZVhNTWVzaCcsXG4gICAgICBSZXNTaGllbGQ6ICdSZXNTaGllbGRNZXNoJyxcbiAgICAgIFJlc1NoaWVsZFhtOiAnUmVzU2hpZWxkWE1NZXNoJyxcbiAgICAgIFBvd2VyQ3ViZTogJ1Bvd2VyQ3ViZU1lc2gnLFxuICAgICAgUG93ZXJDdWJlWG06ICdQb3dlckN1YmVYbU1lc2gnLFxuICAgICAgTGlua0FtcDogJ0xpbmtBbXBNZXNoJyxcbiAgICAgIExpbmtBbXBYbTogJ0xpbmtBbXBYbU1lc2gnLFxuICAgICAgSGVhdFNpbms6ICdIZWF0U2lua01lc2gnLFxuICAgICAgSGVhdFNpbmtYbTogJ0hlYXRTaW5rWG1NZXNoJyxcbiAgICAgIE11bHRpSGFjazogJ011bHRpSGFja01lc2gnLFxuICAgICAgTXVsdGlIYWNrWG06ICdNdWx0aUhhY2tYbU1lc2gnLFxuICAgICAgRm9yY2VBbXA6ICdGb3JjZUFtcE1lc2gnLFxuICAgICAgRm9yY2VBbXBYbTogJ0ZvcmNlQW1wWG1NZXNoJyxcbiAgICAgIFR1cnJldDogJ1R1cnJldE1lc2gnLFxuICAgICAgVHVycmV0WG06ICdUdXJyZXRYbU1lc2gnLFxuICAgICAgRmxpcENhcmRBZGE6ICdGbGlwQ2FyZE1lc2hBZGEnLFxuICAgICAgRmxpcENhcmRKYXJ2aXM6ICdGbGlwQ2FyZE1lc2hKYXJ2aXMnLFxuICAgICAgRmxpcENhcmRYbTogJ0ZsaXBDYXJkWG1NZXNoJyxcbiAgICAgIFJlc29uYXRvcjogJ1Jlc29uYXRvck1lc2gnLFxuICAgICAgUmVzb25hdG9yWG06ICdSZXNvbmF0b3JYTU1lc2gnLFxuICAgICAgQ2Fwc3VsZTogJ0NhcHN1bGVNZXNoJyxcbiAgICAgIEludGVyZXN0Q2Fwc3VsZTogJ0ludGVyZXN0Q2Fwc3VsZU1lc2gnLFxuICAgICAgQ2Fwc3VsZVhtOiAnQ2Fwc3VsZVhtTWVzaCcsXG4gICAgICBFeHRyYVNoaWVsZDogJ0V4dHJhU2hpZWxkTWVzaCcsXG4gICAgICBNZWRpYUN1YmU6ICdNZWRpYUN1YmVNZXNoJyxcbiAgICAgIE1lZGlhUGxhbmVNZXNoOiAnTWVkaWFQbGFuZU1lc2gnXG4gICAgfSxcbiAgICBSZXNvdXJjZToge1xuICAgICAgWG1wOiAnWG1wUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBQb3J0YWxLZXlSZXNvdXJjZVVuaXQ6ICdQb3J0YWxLZXlSZXNvdXJjZVVuaXQnLFxuICAgICAgVWx0cmFzdHJpa2U6ICdVbHRyYXN0cmlrZVJlc291cmNlVW5pdE1lc2gnLFxuICAgICAgUG93ZXJDdWJlOiAnUG93ZXJDdWJlUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBMaW5rQW1wOiAnTGlua0FtcFJlc291cmNlVW5pdE1lc2gnLFxuICAgICAgSGVhdFNpbms6ICdIZWF0U2lua1Jlc291cmNlVW5pdE1lc2gnLFxuICAgICAgTXVsdGlIYWNrOiAnTXVsdGlIYWNrUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBGb3JjZUFtcDogJ0ZvcmNlQW1wUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBUdXJyZXQ6ICdUdXJyZXRSZXNvdXJjZVVuaXRNZXNoJyxcbiAgICAgIEZsaXBDYXJkQWRhOiAnRmxpcENhcmRSZXNvdXJjZVVuaXRNZXNoQWRhJyxcbiAgICAgIEZsaXBDYXJkSmFydmlzOiAnRmxpcENhcmRSZXNvdXJjZVVuaXRNZXNoSmFydmlzJyxcbiAgICAgIFJlc29uYXRvcjogJ1Jlc29uYXRvclJlc291cmNlVW5pdE1lc2gnLFxuICAgICAgUG9ydGFsU2hpZWxkOiAnUG9ydGFsU2hpZWxkUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBDYXBzdWxlOiAnQ2Fwc3VsZVJlc291cmNlVW5pdE1lc2gnLFxuICAgICAgSW50ZXJlc3RDYXBzdWxlOiAnSW50ZXJlc3RDYXBzdWxlUmVzb3VyY2VVbml0TWVzaCcsXG4gICAgICBFeHRyYVNoaWVsZDogJ0V4dHJhU2hpZWxkUmVzb3VyY2VVbml0TWVzaCdcbiAgICB9LFxuICAgIFBsYXllcjoge1xuICAgICAgUGxheWVyOiAnUGxheWVyTWVzaCcsXG4gICAgICBQbGF5ZXJFZGdlOiAnUGxheWVyTWVzaEVkZ2UnLFxuICAgICAgUGxheWVyUmVmbGVjdGlvbjogJ1BsYXllck1lc2hSZWZsZWN0aW9uJyxcbiAgICAgIFBsYXllckdsb3c6ICdQbGF5ZXJNZXNoR2xvdycsXG4gICAgICBCcmVhZENydW1iOiAnQnJlYWRDcnVtYk1lc2gnLFxuICAgICAgQ29tcGFzczogJ0NvbXBhc3NNZXNoJ1xuICAgIH0sXG4gICAgT3JuYW1lbnQ6IHtcbiAgICAgIE1lZXR1cFBvaW50OiAnT3JuYW1lbnRNZWV0dXBQb2ludE1lc2gnLFxuICAgICAgRmluaXNoUG9pbnQ6ICdPcm5hbWVudEZpbmlzaFBvaW50TWVzaCcsXG4gICAgICBDbHVzdGVyOiAnT3JuYW1lbnRDbHVzdGVyTWVzaCcsXG4gICAgICBWb2xhdGlsZTogJ09ybmFtZW50Vm9sYXRpbGVNZXNoJ1xuICAgIH0sXG4gICAgV29ybGQ6IHtcbiAgICAgIFNoaWVsZDogJ1BvcnRhbFNoaWVsZE1lc2gnLFxuICAgICAgUG9ydGFsOiAnVGV4dHVyZWRQb3J0YWxNZXNoJyxcbiAgICAgIFdheXBvaW50OiAnVGV4dHVyZWRTY2FubmVyRlRNZXNoJyxcbiAgICAgIFJlc29uYXRvcjogJ1Jlc29uYXRvclVuaXRMb3dSZXNNZXNoJyxcbiAgICAgIFhtcFJpbmc6ICdYbXBSaW5nTWVzaCcsXG4gICAgICBVbHRyYVN0cmlrZVJpbmc6ICdVbHRyYVN0cmlrZVJpbmdNZXNoJyxcbiAgICAgIFVsdHJhU3RyaWtlQ29sdW1uOiAnVWx0cmFTdHJpa2VDb2x1bW5NZXNoJyxcbiAgICAgIEFydGlmYWN0c1JlZEdsb3c6ICdBcnRpZmFjdHNSZWRHbG93JyxcbiAgICAgIEFydGlmYWN0c0dyZWVuR2xvdzogJ0FydGlmYWN0c0dyZWVuR2xvdycsXG4gICAgICBBcnRpZmFjdHNQdXJwbGVHbG93OiAnQXJ0aWZhY3RzUHVycGxlR2xvdycsXG4gICAgICBBcnRpZmFjdHNUYXJnZXRHbG93OiAnQXJ0aWZhY3RzVGFyZ2V0R2xvdycsXG4gICAgICBTaW5nbGVSZXNvbmF0b3I6ICdTaW5nbGVSZXNvbmF0b3JNZXNoJyxcbiAgICAgIE9ybmFtZW50TWVldHVwUG9pbnQ6ICdPcm5hbWVudE1lZXR1cFBvaW50TWVzaCcsXG4gICAgICBPcm5hbWVudEZpbmlzaFBvaW50OiAnT3JuYW1lbnRGaW5pc2hQb2ludE1lc2gnLFxuICAgICAgT3JuYW1lbnRDbHVzdGVyOiAnT3JuYW1lbnRDbHVzdGVyTWVzaCcsXG4gICAgICBPcm5hbWVudFZvbGF0aWxlOiAnT3JuYW1lbnRWb2xhdGlsZU1lc2gnXG4gICAgfVxuICB9LFxuICAvKipcclxuICAgKiBQcm9ncmFtIGludGVybmFsIG5hbWUgY29uc3RhbnRzLlxyXG4gICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICovXG4gIFByb2dyYW06IHtcbiAgICBCaWNvbG9yZWQ6ICdiaWNvbG9yX3RleHR1cmVkJyxcbiAgICBUZXh0dXJlZDogJ3RleHR1cmVkJyxcbiAgICBSZWdpb25UZXh0dXJlZDogJ3JlZ2lvbl90ZXh0dXJlZCcsXG4gICAgR2xvd3JhbXA6ICdwb3J0YWxfc2Nhbm5lcicsXG4gICAgWG06ICd4bScsXG4gICAgU2hpZWxkRWZmZWN0OiAnc2hpZWxkJyxcbiAgICBBdG1vc3BoZXJlOiAnYXRtb3NwaGVyZScsXG4gICAgTGluazogJ0xpbmtTaGFkZXInLFxuICAgIFNwaGVyaWNhbExpbms6ICdsaW5rM2QnLFxuICAgIFBhcnRpY2xlUG9ydGFsOiAncGFydGljbGVfcG9ydGFscydcbiAgfSxcbiAgLyoqXHJcbiAgICogVGV4dHVyZSBpbnRlcm5hbCBuYW1lIGNvbnN0YW50cy5cclxuICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAqL1xuICBUZXh0dXJlOiB7XG4gICAgRmxpcENhcmQ6ICdGbGlwQ2FyZFRleHR1cmUnLFxuICAgIFhtOiAnT2JqZWN0WE1UZXh0dXJlJyxcbiAgICBHbG93cmFtcDogJ0dsb3dyYW1wVGV4dHVyZScsXG4gICAgTWVkaWE6ICdNZWRpYUN1YmVUZXh0dXJlJyxcbiAgICBXYXlwb2ludDogJ0Z0V2F5cG9pbnRUZXh0dXJlJyxcbiAgICBTaGllbGRFZmZlY3Q6ICdQb3J0YWxTaGllbGRUZXh0dXJlJyxcbiAgICBDb2xvckdsb3c6ICdDb2xvckdsb3dUZXh0dXJlJyxcbiAgICBUYXJnZXRHbG93OiAnVGFyZ2V0R2xvd1RleHR1cmUnLFxuICAgIFBvcnRhbExpbms6ICdQb3J0YWxMaW5rVGV4dHVyZScsXG4gICAgUmVzb25hdG9yTGluazogJ1Jlc29uYXRvckxpbmtUZXh0dXJlJyxcbiAgICBPcm5hbWVudE1lZXR1cFBvaW50OiAnT3JuYW1lbnRNZWV0dXBQb2ludFRleHR1cmUnLFxuICAgIE9ybmFtZW50RmluaXNoUG9pbnQ6ICdPcm5hbWVudEZpbmlzaFBvaW50VGV4dHVyZScsXG4gICAgT3JuYW1lbnRDbHVzdGVyOiAnT3JuYW1lbnRDbHVzdGVyVGV4dHVyZScsXG4gICAgT3JuYW1lbnRWb2xhdGlsZTogJ09ybmFtZW50Vm9sYXRpbGVUZXh0dXJlJyxcbiAgICBQYXJ0aWNsZTogJ1BhcnRpY2xlVGV4dHVyZSdcbiAgfVxufTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gQ29uc3RhbnRzO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBfZ2xNYXRyaXggPSByZXF1aXJlKCdnbC1tYXRyaXgnKTtcblxuLyoqXHJcbiAqIEJhc2UgY2xhc3MgZm9yIGFsbCBcImRyYXdhYmxlXCIgdGhpbmdzLlxyXG4gKlxyXG4gKiBSZXF1aXJlcywgYXQgdGhlIHZlcnkgbGVhc3QsIGEgcHJvZ3JhbSB0byBydW4uXHJcbiAqL1xuXG52YXIgRHJhd2FibGUgPSAoZnVuY3Rpb24gKCkge1xuXG4gIC8qKlxyXG4gICAqIEdpdmVuIGEgbWVzaCBpbnRlcm5hbCBuYW1lIGFuZCBhIHByb2dyYW0gaW50ZXJuYWwgbmFtZSwgY29uc3RydWN0XHJcbiAgICogYSBEcmF3YWJsZVxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gcHJvZ3JhbU5hbWUgUHJvZ3JhbSBpbnRlcm5hbCBuYW1lXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBtZXNoTmFtZSAgICBNZXNoIGludGVybmFsIE5hbWVcclxuICAgKi9cblxuICBmdW5jdGlvbiBEcmF3YWJsZShwcm9ncmFtTmFtZSwgbWVzaE5hbWUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRHJhd2FibGUpO1xuXG4gICAgdGhpcy5wcm9ncmFtTmFtZSA9IHByb2dyYW1OYW1lO1xuICAgIHRoaXMubWVzaE5hbWUgPSBtZXNoTmFtZTtcbiAgICB0aGlzLm1lc2ggPSBudWxsO1xuICAgIHRoaXMucHJvZ3JhbSA9IG51bGw7XG4gICAgdGhpcy51bmlmb3JtcyA9IHt9O1xuICAgIHRoaXMuZHJhd2ZuID0gdGhpcy5fZHJhdy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZWxhcHNlZCA9IDA7XG4gICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgIHRoaXMudmlld1Byb2plY3QgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IF9nbE1hdHJpeC52ZWMzLmNyZWF0ZSgpO1xuICAgIHRoaXMuX3JvdGF0aW9uID0gX2dsTWF0cml4LnF1YXQuY3JlYXRlKCk7XG4gICAgdGhpcy5fc2NhbGUgPSBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDEsIDEsIDEpO1xuICAgIHRoaXMuX21vZGVsID0gX2dsTWF0cml4Lm1hdDQuY3JlYXRlKCk7XG4gICAgdGhpcy5sb2NhbCA9IF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpO1xuICAgIHRoaXMud29ybGQgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICB0aGlzLnVuaWZvcm1zLnVfbW9kZWxWaWV3UHJvamVjdCA9IF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgfVxuXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemVyIGZvciB0aGUgZHJhd2FibGVcclxuICAgKlxyXG4gICAqIEhvb2tzIHVwIHRoZSBkcmF3YWJsZSB0byBhbGwgaXRzIGdsLWJvdW5kIHJlc291cmNlc1xyXG4gICAqXHJcbiAgICogQHBhcmFtICB7QXNzZXRNYW5hZ2VyfSBtYW5hZ2VyIEFzc2V0TWFuYWdlciBjb250YWluaW5nIHRoZSBtYW5hZ2VkIHJlc291cmNlcyBmb3IgdGhpc1xyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmF3YWJsZS5cclxuICAgKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgUmV0dXJucyB0cnVlIGlmIHRoZSBhc3NldHMgYXJlIHN1Y2Nlc3NmdWxseSBmb3VuZCBhbmQgaW5pdGlhbGl6ZWQsXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlIChhbmQgZ2VuZXJhdGVzIGEgd2FybmluZykgb3RoZXJ3aXNlLlxyXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhEcmF3YWJsZSwgW3tcbiAgICBrZXk6ICdpbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdChtYW5hZ2VyKSB7XG4gICAgICBpZiAodGhpcy5tZXNoTmFtZSkge1xuICAgICAgICB0aGlzLm1lc2ggPSBtYW5hZ2VyLmdldE1lc2godGhpcy5tZXNoTmFtZSk7XG4gICAgICAgIGlmICghdGhpcy5tZXNoKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdtaXNzaW5nIG1lc2ggJyArIHRoaXMubWVzaE5hbWUpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvZ3JhbU5hbWUpIHtcbiAgICAgICAgdGhpcy5wcm9ncmFtID0gbWFuYWdlci5nZXRQcm9ncmFtKHRoaXMucHJvZ3JhbU5hbWUpO1xuICAgICAgICBpZiAoIXRoaXMucHJvZ3JhbSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybignbWlzc2luZyBwcm9ncmFtICcgKyB0aGlzLnByb2dyYW1OYW1lKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBzcGVjaWZpYyBkcmF3IGZ1bmN0aW9uIGZvciB0aGlzIGRyYXdhYmxlXHJcbiAgICAgKlxyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGRyYXcgZnVuY3Rpb24gdG8gdXNlIHdoZW4gZHJhd2FibGUgdGhpcyBvYmplY3RcclxuICAgICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3NldERyYXdGbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldERyYXdGbihmbikge1xuICAgICAgdGhpcy5kcmF3Zm4gPSBmbjtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogRXhlY3V0ZXMgYSBkcmF3IGNhbGwgZm9yIHRoaXMgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogSXNzdWVzIGEgd2FybmluZyBpZiB0aGUgZHJhd2FibGUgaGFzIG5vdCB5ZXQgYmVlbiBpbml0aWFsaXplZCB3aXRoIGBpbml0YFxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnZHJhdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXcoKSB7XG4gICAgICBpZiAoIXRoaXMucmVhZHkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdkcmF3YWJsZSBpcyBub3QgaW5pdGlhbGl6ZWQnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvZ3JhbSkge1xuICAgICAgICB0aGlzLnByb2dyYW0udXNlKHRoaXMuZHJhd2ZuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFNldHMgYSB1bmlmb3JtIG9uIHRoZSBkcmF3YWJsZVxyXG4gICAgICpcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICBOYW1lIG9mIHRoZSBkcmF3YWJsZSB0byBzZXRcclxuICAgICAqIEBwYXJhbSB7bWl4ZWR9IHZhbHVlICBWYWx1ZSB0byBzZXQgb24gdGhlIGRyYXdhYmxlLlxyXG4gICAgICogQHJldHVybnMge3RoaXN9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3NldFVuaWZvcm0nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRVbmlmb3JtKG5hbWUsIHZhbHVlKSB7XG4gICAgICB0aGlzLnVuaWZvcm1zW25hbWVdID0gdmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGVsYXBzZWQgdGltZSBmb3IgdGhpcyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQWxzbyBleGVjdXRlcyBhbnkgcGVyaW9kaWMgdXBkYXRlcyB0aGF0IGhhdmUgYmVlbiBhcHBsaWVkIHRvIHRoZSBkcmF3YWJsZVxyXG4gICAgICogKGkuZS4gYW5pbWF0aW9ucykuICBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzZXkgdmFsdWUsIGl0IHNpZ25hbHMgdGhhdCB0aGVcclxuICAgICAqIGFuaW1hdGlvbiBoYXMgZW5kZWQsIGFuZCB0aGF0IHRoZSBvYmplY3Qgc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSB0aGUgZHJhdyBsb29wLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge051bWJlcn0gZGVsdGEgQW1vdW50IG9mIHRpbWUgdGhhdCBoYXMgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCBkcmF3IGNhbGxcclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgUmV0dXJuIGZhbHNlIGlmIHRoZSBvYmplY3Qgc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSB0aGVcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvb3AuXHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZVRpbWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVUaW1lKGRlbHRhKSB7XG4gICAgICB0aGlzLmVsYXBzZWQgKz0gZGVsdGE7XG4gICAgICBpZiAodGhpcy5vblVwZGF0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vblVwZGF0ZShkZWx0YSwgdGhpcy5lbGFwc2VkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHRoZSBpbnRlcm5hbCB1X21vZGVsVmlld1Byb2plY3QgdW5pZm9ybVxyXG4gICAgICogYnkgYXBwbHlpbmcgd29ybGQgYW5kIGxvY2FsIHRyYW5zZm9ybXMgdG8gdGhlIG1vZGVsXHJcbiAgICAgKiBtYXRyaXguICBUaGVuLCBwcm9wYWdhdGUgdGhlIG5ldyBsb2NhbCB0cmFuc2Zvcm0gdG8gYWxsIHRoZSBjaGlsZHJlblxyXG4gICAgICogYnkgd2F5IG9mIHRoZWlyIHdvcmxkIHRyYW5zZm9ybXMuXHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZU1hdHJpeCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZU1hdHJpeCgpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIF9nbE1hdHJpeC5tYXQ0LmZyb21Sb3RhdGlvblRyYW5zbGF0aW9uKHRoaXMubG9jYWwsIHRoaXMuX3JvdGF0aW9uLCB0aGlzLl9wb3NpdGlvbik7XG4gICAgICBfZ2xNYXRyaXgubWF0NC5zY2FsZSh0aGlzLmxvY2FsLCB0aGlzLmxvY2FsLCB0aGlzLl9zY2FsZSk7XG4gICAgICBfZ2xNYXRyaXgubWF0NC5tdWx0aXBseSh0aGlzLl9tb2RlbCwgdGhpcy53b3JsZCwgdGhpcy5sb2NhbCk7XG4gICAgICBfZ2xNYXRyaXgubWF0NC5tdWx0aXBseSh0aGlzLnVuaWZvcm1zLnVfbW9kZWxWaWV3UHJvamVjdCwgdGhpcy52aWV3UHJvamVjdCwgdGhpcy5fbW9kZWwpO1xuICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICBjaGlsZC51cGRhdGVXb3JsZChfdGhpcy5sb2NhbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIG1vZGVsJ3MgXCJ3b3JsZFwiIHRyYW5zZm9ybS5cclxuICAgICAqIEBwYXJhbSAge21hdDR9IHdvcmxkICAgQSB3b3JsZCB0cmFuc2Zvcm1cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAndXBkYXRlV29ybGQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVXb3JsZCh3b3JsZCkge1xuICAgICAgdGhpcy53b3JsZCA9IHdvcmxkO1xuICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSB0aGUgaW50ZXJuYWwgdmlld1Byb2plY3QgbWF0cml4IChwcm9qZWN0aW9uICogdmlldyBtYXRyaWNlcylcclxuICAgICAqIEBwYXJhbSAge21hdDR9IHZpZXdQcm9qZWN0IFByb2plY3Rpb24gbWF0cml4IG11bHRpcGxpZWQgYnkgdmlldyBtYXRyaXhcclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAndXBkYXRlVmlldycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVZpZXcodmlld1Byb2plY3QpIHtcbiAgICAgIHRoaXMudmlld1Byb2plY3QgPSB2aWV3UHJvamVjdDtcbiAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBtb2RlbCB0cmFuc2Zvcm0gdG8gYSBnaXZlbiBtYXRyaXhcclxuICAgICAqIEBwYXJhbSB7bWF0NH0gbWF0IE1hdHJpeCB0byB1c2VcclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnc2V0TWF0cml4JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0TWF0cml4KG1hdCkge1xuICAgICAgdGhpcy5fbW9kZWwgPSBtYXQ7XG4gICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlIGEgbW9kZWwgYWxvbmcgc29tZSB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSAge3ZlYzN9IHZlYyAgIFRoZSB2ZWN0b3JcclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAndHJhbnNsYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJhbnNsYXRlKHZlYykge1xuICAgICAgX2dsTWF0cml4LnZlYzMuYWRkKHRoaXMuX3Bvc2l0aW9uLCB0aGlzLl9wb3NpdGlvbiwgdmVjKTtcbiAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTY2FsZSBhIG1vZGVsIGJ5IHNvbWUgdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0gIHt2ZWMzfSB2ZWMgICBUaGUgdmVjdG9yXHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3NjYWxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2NhbGUodmVjKSB7XG4gICAgICBfZ2xNYXRyaXgudmVjMy5hZGQodGhpcy5fc2NhbGUsIHRoaXMuX3NjYWxlLCB2ZWMpO1xuICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHNjYWxlIG9mIHRoZSBsb2NhbCB0cmFuc2Zvcm1cclxuICAgICAqIEBwYXJhbSB7dmVjM30gdmVjIFRoZSBzY2FsZSB0byBzZXQgdG8uXHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3NldFNjYWxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0U2NhbGUodmVjKSB7XG4gICAgICBfZ2xNYXRyaXgudmVjMy5jb3B5KHRoaXMuX3NjYWxlLCB2ZWMpO1xuICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFJvdGF0ZSBhIG1vZGVsIHdpdGggYSBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAcGFyYW0gIHtxdWF0fSBxdWF0ICAgVGhlIHF1YXRlcm5pb25cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAncm90YXRlUXVhdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJvdGF0ZVF1YXQocXVhdCkge1xuICAgICAgcXVhdC5hZGQodGhpcy5fcm90YXRpb24sIHRoaXMuX3JvdGF0aW9uLCBxdWF0KTtcbiAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGUgdGhlIG1vZGVsIGFsb25nIHRoZSBYIGF4aXNcclxuICAgICAqIEBwYXJhbSAge2Zsb2F0fSBkaXN0ICBEaXN0YW5jZSB0byB0cmFuc2xhdGVcclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAndHJhbnNsYXRlWCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyYW5zbGF0ZVgoZGlzdCkge1xuICAgICAgdGhpcy50cmFuc2xhdGUoX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcyhkaXN0LCAwLCAwKSk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGUgdGhlIG1vZGVsIGFsb25nIHRoZSBZIGF4aXNcclxuICAgICAqIEBwYXJhbSAge2Zsb2F0fSBkaXN0ICBEaXN0YW5jZSB0byB0cmFuc2xhdGVcclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAndHJhbnNsYXRlWScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyYW5zbGF0ZVkoZGlzdCkge1xuICAgICAgdGhpcy50cmFuc2xhdGUoX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygwLCBkaXN0LCAwKSk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGUgdGhlIG1vZGVsIGFsb25nIHRoZSBaIGF4aXNcclxuICAgICAqIEBwYXJhbSAge2Zsb2F0fSBkaXN0ICBEaXN0YW5jZSB0byB0cmFuc2xhdGVcclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAndHJhbnNsYXRlWicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyYW5zbGF0ZVooZGlzdCkge1xuICAgICAgdGhpcy50cmFuc2xhdGUoX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygwLCAwLCBkaXN0KSk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTY2FsZSBhbGwgZGltZW5zaW9ucyBieSB0aGUgc2FtZSB2YWx1ZVxyXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBmIFRoZSBhbW91bnQgdG8gX3NjYWxlXHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3NjYWxhclNjYWxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2NhbGFyU2NhbGUoZikge1xuICAgICAgdGhpcy5zY2FsZShfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKGYsIGYsIGYpKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGxvY2FsIHNjYWxlIHRvIHNvbWUgc2NhbGFyIHZhbHVlIChmb3IgeCwgeSwgYW5kIHopXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZiBBbW91bnQgdG8gc2V0IHRoZSBzY2FsZSB0by5cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnc2V0U2NhbGFyU2NhbGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRTY2FsYXJTY2FsZShmKSB7XG4gICAgICB0aGlzLnNldFNjYWxlKF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoZiwgZiwgZikpO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogTllJXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdkaXNwb3NlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgIC8vIG5vb3A7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2RyYXcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZHJhdyhsb2NhdGlvbnMsIHVuaWZvcm1zKSB7XG4gICAgICBmb3IgKHZhciBpIGluIHRoaXMudW5pZm9ybXMpIHtcbiAgICAgICAgaWYgKHRoaXMudW5pZm9ybXMuaGFzT3duUHJvcGVydHkoaSkgJiYgaSBpbiB1bmlmb3Jtcykge1xuICAgICAgICAgIHVuaWZvcm1zW2ldKHRoaXMudW5pZm9ybXNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLm1lc2guZHJhdyhsb2NhdGlvbnMpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBEcmF3YWJsZTtcbn0pKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IERyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX2RyYXdhYmxlID0gcmVxdWlyZSgnLi4vZHJhd2FibGUnKTtcblxudmFyIF9kcmF3YWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZSk7XG5cbnZhciBfbWVzaFNwaGVyZSA9IHJlcXVpcmUoJy4uL21lc2gvc3BoZXJlJyk7XG5cbnZhciBfbWVzaFNwaGVyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tZXNoU3BoZXJlKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgUFJPR1JBTSA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uUHJvZ3JhbS5BdG1vc3BoZXJlO1xuXG4vKipcclxuICogVGhpcyBpcyBhIG1vZGlmaWVkIHZlcnNpb24gb2YgdGhlIGF0bW9zcGhlcmUgcHJvZ3JhbSBmcm9tOlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZGF0YWFydHMvd2ViZ2wtZ2xvYmUvYmxvYi9tYXN0ZXIvZ2xvYmUvZ2xvYmUuanNcclxuICovXG5cbnZhciBBdG1vc3BoZXJlRHJhd2FibGUgPSAoZnVuY3Rpb24gKF9EcmF3YWJsZSkge1xuICBfaW5oZXJpdHMoQXRtb3NwaGVyZURyYXdhYmxlLCBfRHJhd2FibGUpO1xuXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemVyXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSByYWRpdXMgICAgICBSYWRpdXMgb2YgdGhlIHdvcmxkLlxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhpcyBzaG91bGQgbWF0Y2ggdGhlIHJhZGl1cyBvZiB0aGUgd29ybGQgbWVzaCB0aGVcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0bW9zcGhlcmUgaXMgYmVpbmcgcmVuZGVyZWQgb3Zlci5cclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHZTbGljZXMgICAgIE51bWJlciBvZiB2ZXJ0aWNhbCBzbGljZXMgZm9yIHRoZSBzcGhlcmUgbWVzaFxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gaFNsaWNlcyAgICAgTnVtYmVyIG9mIGhvcml6b250YWwgc2xpY2VzIGZvciB0aGUgc3BoZXJlIG1lc2hcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHNjYWxlRmFjdG9yIFRoZSBwZXJjZW50IHRvIHNjYWxlIHRoZSBtZXNoXHJcbiAgICogQHJldHVybiB7dm9pZH1cclxuICAgKi9cblxuICBmdW5jdGlvbiBBdG1vc3BoZXJlRHJhd2FibGUocmFkaXVzLCB2U2xpY2VzLCBoU2xpY2VzLCBzY2FsZUZhY3Rvcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBdG1vc3BoZXJlRHJhd2FibGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXRtb3NwaGVyZURyYXdhYmxlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgUFJPR1JBTSwgbnVsbCk7XG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgdGhpcy52U2xpY2VzID0gdlNsaWNlcztcbiAgICB0aGlzLmhTbGljZXMgPSBoU2xpY2VzO1xuICAgIHRoaXMudW5pZm9ybXMudV9ub3JtYWxNYXRyaXggPSBfZ2xNYXRyaXgubWF0My5jcmVhdGUoKTtcbiAgICB0aGlzLnNjYWxlRmFjdG9yID0gc2NhbGVGYWN0b3IgfHwgMS4xO1xuICAgIHRoaXMuc2V0U2NhbGFyU2NhbGUodGhpcy5zY2FsZUZhY3Rvcik7XG4gIH1cblxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSB2aWV3IG1hdHJpY2VzIG9mIHRoZSBtb2RlbFxyXG4gICAqXHJcbiAgICogQGNoYWluYWJsZVxyXG4gICAqIEBzZWUgICAgc3JjL2RyYXdhYmxlL21vZGVsLmpzI3VwZGF0ZVZpZXdcclxuICAgKiBAcGFyYW0gIHttYXQ0fSB2aWV3UHJvamVjdCAgIGNvbWJpbmVkIHByb2plY3Rpb24gbWF0cml4IG11bHRpcGxpZWQgYnkgdmlldyBtYXRyaXguXHJcbiAgICogQHJldHVybiB7dGhpc31cclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoQXRtb3NwaGVyZURyYXdhYmxlLCBbe1xuICAgIGtleTogJ3VwZGF0ZVZpZXcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVWaWV3KHZpZXdQcm9qZWN0KSB7XG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihBdG1vc3BoZXJlRHJhd2FibGUucHJvdG90eXBlKSwgJ3VwZGF0ZVZpZXcnLCB0aGlzKS5jYWxsKHRoaXMsIHZpZXdQcm9qZWN0KTtcbiAgICAgIHZhciBpbnZlcnQgPSBfZ2xNYXRyaXgubWF0NC5pbnZlcnQoX2dsTWF0cml4Lm1hdDQuY3JlYXRlKCksIHZpZXdQcm9qZWN0KSxcbiAgICAgICAgICB0cmFuc3Bvc2UgPSBfZ2xNYXRyaXgubWF0NC50cmFuc3Bvc2UoX2dsTWF0cml4Lm1hdDQuY3JlYXRlKCksIGludmVydCk7XG4gICAgICB0aGlzLnVuaWZvcm1zLnVfbm9ybWFsTWF0cml4ID0gX2dsTWF0cml4Lm1hdDMuZnJvbU1hdDQoX2dsTWF0cml4Lm1hdDMuY3JlYXRlKCksIHRyYW5zcG9zZSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBkcmF3YWJsZVxyXG4gICAgICpcclxuICAgICAqIEBzZWUgICAgc3JjL2RyYXdhYmxlLmpzXHJcbiAgICAgKiBAcGFyYW0gIHtBc3NldE1hbmFnZXJ9IG1hbmFnZXIgVGhlIEFzc2V0TWFuYWdlciBjb250YWluaW5nIHRoZSByZXF1aXJlZCBhc3NldHMuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdpbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdChtYW5hZ2VyKSB7XG4gICAgICB0aGlzLm1lc2ggPSBuZXcgX21lc2hTcGhlcmUyWydkZWZhdWx0J10obWFuYWdlci5fZ2wsIHRoaXMucmFkaXVzLCB0aGlzLnZTbGljZXMsIHRoaXMuaFNsaWNlcyk7XG4gICAgICByZXR1cm4gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXRtb3NwaGVyZURyYXdhYmxlLnByb3RvdHlwZSksICdpbml0JywgdGhpcykuY2FsbCh0aGlzLCBtYW5hZ2VyKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQXRtb3NwaGVyZURyYXdhYmxlO1xufSkoX2RyYXdhYmxlMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gQXRtb3NwaGVyZURyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX3RleHR1cmVkID0gcmVxdWlyZSgnLi90ZXh0dXJlZCcpO1xuXG52YXIgX3RleHR1cmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RleHR1cmVkKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgUFJPR1JBTSA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uUHJvZ3JhbS5CaWNvbG9yZWQ7XG5cbi8qKlxyXG4gKiBEZWZhdWx0IHF1YWxpdHkgY29sb3IuXHJcbiAqIEB0eXBlIHt2ZWM0fVxyXG4gKi9cbnZhciBkZWZhdWx0Q29sb3IwID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5xdWFsaXR5Q29sb3JzLlZFUllfUkFSRSk7XG5cbi8qKlxyXG4gKiBEZWZhdWx0IGdsb3cgY29sb3JcclxuICogQHR5cGUge3ZlYzR9XHJcbiAqL1xudmFyIGRlZmF1bHRDb2xvcjEgPSBfZ2xNYXRyaXgudmVjNC5jbG9uZShfY29uc3RhbnRzMlsnZGVmYXVsdCddLnhtQ29sb3JzLmNvcmVHbG93KTtcblxuLyoqXHJcbiAqIFRoaXMgaXMgdXNlZCBmb3IgaXRlbXMgYW5kIG90aGVyIHJlbmRlcmFibGVzIHRoYXQgaGF2ZSB0d28gdmlzaWJsZSBjb2xvcnNcclxuICpcclxuICogVGhlIHNwZWNpZmljcyBvZiBpdCBhcmUgYmFzaWNhbGx5OiBpZiB0aGUgdGV4dHVyZSBoYXMgYW4gb3BhY2l0eSBsZXNzIHRoYW4gMC41LFxyXG4gKiB0aGUgdGV4dHVyZSBjb2xvciBpcyBibGVuZGVkIHdpdGggdV9jb2xvcjBcclxuICogT3RoZXJ3aXNlLCBpdCdzIHRoZSB0ZXh0dXJlIGNvbG9yIGJsZW5kZWQgd2l0aCB1X2NvbG9yMVxyXG4gKlxyXG4gKiBPciBzb21ldGhpbmcgbGlrZSB0aGF0LlxyXG4gKi9cblxudmFyIEJpY29sb3JlZERyYXdhYmxlID0gKGZ1bmN0aW9uIChfVGV4dHVyZWREcmF3YWJsZSkge1xuICBfaW5oZXJpdHMoQmljb2xvcmVkRHJhd2FibGUsIF9UZXh0dXJlZERyYXdhYmxlKTtcblxuICAvKipcclxuICAgKiBJbml0aWFsaXplZCBhIGJpLWNvbG9yZWQgZHJhd2FibGVcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IG1lc2hOYW1lICAgIEludGVybmFsIG5hbWUgb2YgdGhlIG1lc2ggZm9yIHRoaXMgZHJhd2FibGVcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHRleHR1cmVOYW1lIEludGVybmFsIG5hbWUgb2YgdGhlIHRleHR1cmUgZm9yIHRoaXMgZHJhd2JsZVxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEJpY29sb3JlZERyYXdhYmxlKG1lc2hOYW1lLCB0ZXh0dXJlTmFtZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCaWNvbG9yZWREcmF3YWJsZSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihCaWNvbG9yZWREcmF3YWJsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIFBST0dSQU0sIG1lc2hOYW1lLCB0ZXh0dXJlTmFtZSk7XG4gICAgdGhpcy51bmlmb3Jtcy51X2NvbG9yMCA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKGRlZmF1bHRDb2xvcjApO1xuICAgIHRoaXMudW5pZm9ybXMudV9jb2xvcjEgPSBfZ2xNYXRyaXgudmVjNC5jbG9uZShkZWZhdWx0Q29sb3IxKTtcbiAgfVxuXG4gIHJldHVybiBCaWNvbG9yZWREcmF3YWJsZTtcbn0pKF90ZXh0dXJlZDJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEJpY29sb3JlZERyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX3RleHR1cmVkID0gcmVxdWlyZSgnLi90ZXh0dXJlZCcpO1xuXG52YXIgX3RleHR1cmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RleHR1cmVkKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgUFJPR1JBTSA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uUHJvZ3JhbS5HbG93cmFtcDtcblxuLyoqXHJcbiAqIERlZmF1bHQgYmFzZSBjb2xvciBmb3IgdGhlIGdsb3dyYW1wIGRyYXdhYmxlXHJcbiAqIEB0eXBlIHt2ZWM0fVxyXG4gKi9cbnZhciBkZWZhdWx0QmFzZUNvbG9yID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS50ZWFtQ29sb3JzLk5FVVRSQUwpO1xuXG4vKipcclxuICogQSBcImdsb3dyYW1wXCIgcmVmZXJzIHRvIHRoZSB1c2FnZSBvZiB0aGUgcmVkLCBncmVlbiwgYW5kIGJsdWUgY2hhbm5lbHMgdG8gY3JlYXRlXHJcbiAqIGEgXCJnbG93aW5nXCIgdGV4dHVyZS5cclxuICovXG5cbnZhciBHbG93cmFtcERyYXdhYmxlID0gKGZ1bmN0aW9uIChfVGV4dHVyZWREcmF3YWJsZSkge1xuICBfaW5oZXJpdHMoR2xvd3JhbXBEcmF3YWJsZSwgX1RleHR1cmVkRHJhd2FibGUpO1xuXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBnbG93cmFtcCBkcmF3YWJsZVxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gbWVzaE5hbWUgICAgSW50ZXJuYWwgbmFtZSBvZiB0aGUgbWVzaFxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdGV4dHVyZU5hbWUgSW50ZXJuYWwgbmFtZSBvZiB0aGUgdGV4dHVyZVxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEdsb3dyYW1wRHJhd2FibGUobWVzaE5hbWUsIHRleHR1cmVOYW1lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEdsb3dyYW1wRHJhd2FibGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoR2xvd3JhbXBEcmF3YWJsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIFBST0dSQU0sIG1lc2hOYW1lLCB0ZXh0dXJlTmFtZSk7XG4gICAgdGhpcy51bmlmb3Jtcy51X2Jhc2VDb2xvciA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKGRlZmF1bHRCYXNlQ29sb3IpO1xuICAgIHRoaXMudW5pZm9ybXMudV9yb3RhdGlvbiA9IDA7XG4gICAgdGhpcy51bmlmb3Jtcy51X3JhbXBUYXJnZXQgPSAwO1xuICAgIHRoaXMudW5pZm9ybXMudV9hbHBoYSA9IDAuNjtcbiAgfVxuXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgZGVmYXVsdCBnbG93cmFtcCB2YXJpYWJsZXMgKHJvdGF0aW9uLCByYW1wIHRhcmdldCwgZWxhcHNlZCB0aW1lXHJcbiAgICogYW5kIGFscGhhKVxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gdGljayBUaW1lIGRlbHRhIHNpbmNlIGxhc3QgdGlja1xyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICBAc2VlIHNyYy9kcmF3YWJsZS5qcyN1cGRhdGVUaW1lXHJcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKEdsb3dyYW1wRHJhd2FibGUsIFt7XG4gICAga2V5OiAndXBkYXRlVGltZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVRpbWUodGljaykge1xuICAgICAgdmFyIHJldCA9IF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEdsb3dyYW1wRHJhd2FibGUucHJvdG90eXBlKSwgJ3VwZGF0ZVRpbWUnLCB0aGlzKS5jYWxsKHRoaXMsIHRpY2spO1xuICAgICAgdmFyIGluYyA9IHRoaXMuZWxhcHNlZCAvIDUwMDA7XG4gICAgICB0aGlzLnVuaWZvcm1zLnVfcm90YXRpb24gPSBpbmM7XG4gICAgICB0aGlzLnVuaWZvcm1zLnVfcmFtcFRhcmdldCA9IE1hdGguc2luKE1hdGguUEkgLyAyICogKGluYyAtIE1hdGguZmxvb3IoaW5jKSkpO1xuICAgICAgdGhpcy51bmlmb3Jtcy51X2FscGhhID0gTWF0aC5zaW4oaW5jKSAqIDAuMDUgKyAwLjc1O1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gR2xvd3JhbXBEcmF3YWJsZTtcbn0pKF90ZXh0dXJlZDJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEdsb3dyYW1wRHJhd2FibGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbnZhciBfY29uc3RhbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnN0YW50cyk7XG5cbnZhciBfYmljb2xvcmVkID0gcmVxdWlyZSgnLi9iaWNvbG9yZWQnKTtcblxudmFyIF9iaWNvbG9yZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmljb2xvcmVkKTtcblxudmFyIF94bSA9IHJlcXVpcmUoJy4veG0nKTtcblxudmFyIF94bTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF94bSk7XG5cbnZhciBfdGV4dHVyZWQgPSByZXF1aXJlKCcuL3RleHR1cmVkJyk7XG5cbnZhciBfdGV4dHVyZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGV4dHVyZWQpO1xuXG4vKipcclxuICogVGhpcyBmaWxlIGNvbnN0cnVjdHMgdGhlIGRyYXdhYmxlIHByaW1pdGl2ZXMgZm9yIG1hbnkgb2YgdGhlIGludmVudG9yeSBpdGVtcy5cclxuICovXG5cbnZhciBJbnZlbnRvcnkgPSB7fTtcbnZhciBtZXNoZXMgPSBfY29uc3RhbnRzMlsnZGVmYXVsdCddLk1lc2guSW52ZW50b3J5O1xudmFyIHRleHR1cmVzID0gX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5UZXh0dXJlO1xuXG4vKipcclxuICogQ3JlYXRlcyB0aGUgb3V0ZXIgXCJzaGVsbFwiIGZvciBhbiB4bSBpdGVtLlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgSW50ZXJuYWwgbmFtZSBvZiB0aGUgbWVzaFxyXG4gKiBAcmV0dXJuIHtpdGVtYmFzZX0gICAgQSBCaWNvbG9yZWREcmF3YWJsZSB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzaCBuYW1lXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIGZsaXBjYXJkIHRleHR1cmVcclxuICovXG5mdW5jdGlvbiBjcmVhdGVTaGVsbChuYW1lKSB7XG4gIHZhciBpdGVtYmFzZSA9IChmdW5jdGlvbiAoX0JpY29sb3JlZERyYXdhYmxlKSB7XG4gICAgX2luaGVyaXRzKGl0ZW1iYXNlLCBfQmljb2xvcmVkRHJhd2FibGUpO1xuXG4gICAgZnVuY3Rpb24gaXRlbWJhc2UoKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgaXRlbWJhc2UpO1xuXG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihpdGVtYmFzZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIG1lc2hlc1tuYW1lXSwgdGV4dHVyZXMuRmxpcENhcmQpO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtYmFzZTtcbiAgfSkoX2JpY29sb3JlZDJbJ2RlZmF1bHQnXSk7XG5cbiAgcmV0dXJuIGl0ZW1iYXNlO1xufVxuXG4vKipcclxuICogQ3JlYXRlcyB0aGUgeG0gXCJjb3JlXCIgb2YgYW4gaXRlbVxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgSW50ZXJuYWwgbmFtZSBvZiB0aGUgeG0gbWVzaFxyXG4gKiBAcmV0dXJuIHt4bWJhc2V9ICAgICAgQW4gWG1EcmF3YWJsZSB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzaCBuYW1lXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICBhbmQgdGhlIFhtIHRleHR1cmUuXHJcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ29yZShuYW1lKSB7XG4gIHZhciB4bWJhc2UgPSAoZnVuY3Rpb24gKF9YbURyYXdhYmxlKSB7XG4gICAgX2luaGVyaXRzKHhtYmFzZSwgX1htRHJhd2FibGUpO1xuXG4gICAgZnVuY3Rpb24geG1iYXNlKCkge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIHhtYmFzZSk7XG5cbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKHhtYmFzZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIG1lc2hlc1tuYW1lXSwgdGV4dHVyZXMuWG0pO1xuICAgIH1cblxuICAgIHJldHVybiB4bWJhc2U7XG4gIH0pKF94bTJbJ2RlZmF1bHQnXSk7XG5cbiAgcmV0dXJuIHhtYmFzZTtcbn1cblxuLyoqXHJcbiAqIENyZWF0ZXMgYSBtZWRpYSBpdGVtXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBNZWRpYSBtZXNoIGludGVybmFsIG5hbWVcclxuICogQHJldHVybiB7bWVkaWF9ICAgICAgIEEgVGV4dHVyZWREcmF3YWJsZSB3aXRoIHRoZSBUZXh0dXJlZCBwcm9ncmFtLFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIHNwZWNpZmllZCBtZXNoLCBhbmQgdGhlIGZsaXBjYXJkIHRleHR1cmUuXHJcbiAqL1xuZnVuY3Rpb24gY3JlYXRlTWVkaWEobmFtZSkge1xuICB2YXIgbWVkaWEgPSAoZnVuY3Rpb24gKF9UZXh0dXJlZERyYXdhYmxlKSB7XG4gICAgX2luaGVyaXRzKG1lZGlhLCBfVGV4dHVyZWREcmF3YWJsZSk7XG5cbiAgICBmdW5jdGlvbiBtZWRpYSgpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBtZWRpYSk7XG5cbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKG1lZGlhLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5Qcm9ncmFtLlRleHR1cmVkLCBtZXNoZXNbbmFtZV0sIF9jb25zdGFudHMyWydkZWZhdWx0J10uVGV4dHVyZS5GbGlwQ2FyZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lZGlhO1xuICB9KShfdGV4dHVyZWQyWydkZWZhdWx0J10pO1xuXG4gIHJldHVybiBtZWRpYTtcbn1cblxuZm9yICh2YXIgaSBpbiBtZXNoZXMpIHtcbiAgaWYgKC9eTWVkaWEvLnRlc3QoaSkpIHtcbiAgICBpZiAoaSA9PT0gJ01lZGlhUGxhbmUnKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgSW52ZW50b3J5W2ldID0gY3JlYXRlTWVkaWEoaSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKC9YbSQvLnRlc3QoaSkpIHtcbiAgICAgIEludmVudG9yeVtpXSA9IGNyZWF0ZUNvcmUoaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEludmVudG9yeVtpXSA9IGNyZWF0ZVNoZWxsKGkpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBJbnZlbnRvcnk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfdGV4dHVyZWQgPSByZXF1aXJlKCcuL3RleHR1cmVkJyk7XG5cbnZhciBfdGV4dHVyZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGV4dHVyZWQpO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbi8qKlxyXG4gKiBUaGUgTGlua0RyYXdhYmxlIHJlcHJlc2VudHMgdGhlIGJhc2UgY2xhc3MgZm9yIGxpbmstdHlwZSBkcmF3YWJsZXMuXHJcbiAqL1xuXG52YXIgTGlua0RyYXdhYmxlID0gKGZ1bmN0aW9uIChfVGV4dHVyZWREcmF3YWJsZSkge1xuICBfaW5oZXJpdHMoTGlua0RyYXdhYmxlLCBfVGV4dHVyZWREcmF3YWJsZSk7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhIGxpbmsgZHJhd2FibGUgd2l0dGggdGhlIGdpdmVuIHByb2dyYW0gYW5kIHRleHR1cmUuXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBwcm9ncmFtTmFtZSBJbnRlcm5hbCBuYW1lIG9mIHRoZSBwcm9ncmFtIHRvIHVzZVxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdGV4dHVyZU5hbWUgSW50ZXJuYWwgbmFtZSBvZiB0aGUgdGV4dHVyZSB0byB1c2VcclxuICAgKi9cblxuICBmdW5jdGlvbiBMaW5rRHJhd2FibGUocHJvZ3JhbU5hbWUsIHRleHR1cmVOYW1lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIExpbmtEcmF3YWJsZSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihMaW5rRHJhd2FibGUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBwcm9ncmFtTmFtZSwgbnVsbCwgdGV4dHVyZU5hbWUpO1xuICAgIHRoaXMudW5pZm9ybXMudV9jYW1lcmFGd2QgPSBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDAsIDAsIC0xKTtcbiAgICB0aGlzLnVuaWZvcm1zLnVfZWxhcHNlZFRpbWUgPSAwO1xuICB9XG5cbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgY2FtZXJhIHRyYW5zZm9ybXMgZm9yIHRoZSBsaW5rIGRyYXdhYmxlc1xyXG4gICAqIEBwYXJhbSAge21hdDR9IHZpZXdQcm9qZWN0IENvbWJpbmVkIHZpZXcgYW5kIHByb2plY3QgbWF0cml4XHJcbiAgICogQHBhcmFtICB7bWF0NH0gdmlldyAgICAgICAgVmlldyBNYXRyaXhcclxuICAgKiBAcGFyYW0gIHttYXQ0fSBwcm9qZWN0ICAgICBQcm9qZWN0aW9uIG1hdHJpeFxyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKExpbmtEcmF3YWJsZSwgW3tcbiAgICBrZXk6ICd1cGRhdGVWaWV3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVmlldyh2aWV3UHJvamVjdCwgY2FtZXJhKSB7XG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihMaW5rRHJhd2FibGUucHJvdG90eXBlKSwgJ3VwZGF0ZVZpZXcnLCB0aGlzKS5jYWxsKHRoaXMsIHZpZXdQcm9qZWN0LCBjYW1lcmEpO1xuICAgICAgaWYgKGNhbWVyYSkge1xuICAgICAgICB2YXIgcm90ID0gX2dsTWF0cml4Lm1hdDMuZnJvbU1hdDQoX2dsTWF0cml4Lm1hdDMuY3JlYXRlKCksIGNhbWVyYS52aWV3KTtcbiAgICAgICAgdmFyIHEgPSBfZ2xNYXRyaXgucXVhdC5mcm9tTWF0MyhfZ2xNYXRyaXgucXVhdC5jcmVhdGUoKSwgcm90KTtcbiAgICAgICAgdmFyIGZ3ZCA9IF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybVF1YXQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoMCwgMCwgLTEpLCBxKTtcbiAgICAgICAgX2dsTWF0cml4LnZlYzMubm9ybWFsaXplKGZ3ZCwgZndkKTtcbiAgICAgICAgdGhpcy51bmlmb3Jtcy51X2NhbWVyYUZ3ZCA9IGZ3ZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgZGVmYXVsdCBwZXJpb2RpYyB1bmlmb3JtcyBmb3IgbGlua3NcclxuICAgICAqIEBwYXJhbSAge051bWJlcn0gZGVsdGEgVGltZSBkZWx0YSBzaW5jZSBsYXN0IGRyYXdcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgQHNlZSBzcmMvZHJhd2FibGUuanMjdXBkYXRlVGltZVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGVUaW1lJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVGltZShkZWx0YSkge1xuICAgICAgdmFyIHJldCA9IF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKExpbmtEcmF3YWJsZS5wcm90b3R5cGUpLCAndXBkYXRlVGltZScsIHRoaXMpLmNhbGwodGhpcywgZGVsdGEpO1xuICAgICAgdGhpcy51bmlmb3Jtcy51X2VsYXBzZWRUaW1lID0gdGhpcy5lbGFwc2VkIC8gMTAwMCAlIDMwMC4wICogMC4xO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTGlua0RyYXdhYmxlO1xufSkoX3RleHR1cmVkMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gTGlua0RyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX3RleHR1cmVkID0gcmVxdWlyZSgnLi90ZXh0dXJlZCcpO1xuXG52YXIgX3RleHR1cmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RleHR1cmVkKTtcblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKTtcblxudmFyIF9jb25zdGFudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uc3RhbnRzKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgUFJPR1JBTSA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uUHJvZ3JhbS5SZWdpb25UZXh0dXJlZDtcblxuLyoqXHJcbiAqIEFuIE9ybmFtZW50RHJhd2FibGUgaXMgYSBUZXh0dWVkRHJhd2FibGUgdGhhdCBkcmF3cyBhbiBvcm5hbWVudCBvblxyXG4gKiBhIHVuaXQgcGxhbmUuXHJcbiAqL1xuXG52YXIgT3JuYW1lbnREcmF3YWJsZSA9IChmdW5jdGlvbiAoX1RleHR1cmVkRHJhd2FibGUpIHtcbiAgX2luaGVyaXRzKE9ybmFtZW50RHJhd2FibGUsIF9UZXh0dXJlZERyYXdhYmxlKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGFuIG9ybmFtZW50XHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBtZXNoTmFtZSAgICBJbnRlcm5hbCBuYW1lIG9mIHRoZSBvcm5hbWVudCBtZXNoXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSB0ZXh0dXJlTmFtZSBJbnRlcm5hbCBuYW1lIG9mIHRoZSB0ZXh0dXJlXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gT3JuYW1lbnREcmF3YWJsZShtZXNoTmFtZSwgdGV4dHVyZU5hbWUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgT3JuYW1lbnREcmF3YWJsZSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihPcm5hbWVudERyYXdhYmxlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgUFJPR1JBTSwgbWVzaE5hbWUsIHRleHR1cmVOYW1lKTtcbiAgICB0aGlzLnVuaWZvcm1zLnVfdGV4Q29vcmRCYXNlID0gX2dsTWF0cml4LnZlYzIuZnJvbVZhbHVlcygwLCAwKTtcbiAgICB0aGlzLnVuaWZvcm1zLnVfdGV4Q29vcmRFeHRlbnQgPSBfZ2xNYXRyaXgudmVjMi5mcm9tVmFsdWVzKDEsIDEpO1xuICAgIHRoaXMudW5pZm9ybXMudV9jb2xvciA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKF9jb25zdGFudHMyWydkZWZhdWx0J10udGVhbUNvbG9ycy5MT0tJKTtcbiAgfVxuXG4gIHJldHVybiBPcm5hbWVudERyYXdhYmxlO1xufSkoX3RleHR1cmVkMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gT3JuYW1lbnREcmF3YWJsZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKTtcblxudmFyIF9jb25zdGFudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uc3RhbnRzKTtcblxudmFyIF9wYXJ0aWNsZSA9IHJlcXVpcmUoJy4vcGFydGljbGUnKTtcblxudmFyIF9wYXJ0aWNsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wYXJ0aWNsZSk7XG5cbnZhciBfbWVzaFBhcnRpY2xlUG9ydGFsID0gcmVxdWlyZSgnLi4vbWVzaC9wYXJ0aWNsZS1wb3J0YWwnKTtcblxudmFyIF9tZXNoUGFydGljbGVQb3J0YWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWVzaFBhcnRpY2xlUG9ydGFsKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgUFJPR1JBTSA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uUHJvZ3JhbS5QYXJ0aWNsZVBvcnRhbDtcbnZhciBNQVhfU1lTVEVNUyA9IDQwO1xuXG52YXIgUGFydGljbGVQb3J0YWxEcmF3YWJsZSA9IChmdW5jdGlvbiAoX1BhcnRpY2xlRHJhd2FibGUpIHtcbiAgX2luaGVyaXRzKFBhcnRpY2xlUG9ydGFsRHJhd2FibGUsIF9QYXJ0aWNsZURyYXdhYmxlKTtcblxuICBmdW5jdGlvbiBQYXJ0aWNsZVBvcnRhbERyYXdhYmxlKGNvbG9yLCBoZWlnaHQsIGNvdW50LCBzcHJlYWQsIGRpc3RhbmNlKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBhcnRpY2xlUG9ydGFsRHJhd2FibGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUGFydGljbGVQb3J0YWxEcmF3YWJsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIFBST0dSQU0pO1xuICAgIHZhciBtb2RDb2xvciA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKGNvbG9yKTtcbiAgICBtb2RDb2xvclszXSA9IGNvdW50O1xuICAgIC8vIHVuaWZvcm1zIHNob3VsZCBiZSBmbGF0dGVuZWQgYXJyYXlzLlxuICAgIC8vIFNpbmNlIHRoZXkncmUgZXhwZWN0ZWQgdG8gY29udGFpbiB1cCB0byA0MCBzeXN0ZW1zLCB3ZSdsbCBuZWVkIHRvIGNyZWF0ZVxuICAgIC8vIGFycmF5cyBvZiA0MCAqIDQgZWxlbWVudHMgZWFjaC5cbiAgICB0aGlzLnVuaWZvcm1zLnVfY29sb3IgPSBuZXcgRmxvYXQzMkFycmF5KE1BWF9TWVNURU1TICogNCk7XG4gICAgdGhpcy51bmlmb3Jtcy51X3Bvc2l0aW9uID0gbmV3IEZsb2F0MzJBcnJheShNQVhfU1lTVEVNUyAqIDQpO1xuICAgIHRoaXMudW5pZm9ybXMudV9wYXJhbXMgPSBuZXcgRmxvYXQzMkFycmF5KE1BWF9TWVNURU1TICogNCk7XG4gICAgLy8gZmlsbCBpbiB0aGUgZmlyc3QgNCBzbG90cy5cbiAgICBfZ2xNYXRyaXgudmVjNC5jb3B5KHRoaXMudW5pZm9ybXMudV9jb2xvciwgbW9kQ29sb3IpO1xuICAgIF9nbE1hdHJpeC52ZWM0LmNvcHkodGhpcy51bmlmb3Jtcy51X3Bvc2l0aW9uLCBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAsIDAsIDAsIGhlaWdodCkpO1xuICAgIF9nbE1hdHJpeC52ZWM0LmNvcHkodGhpcy51bmlmb3Jtcy51X3BhcmFtcywgX2dsTWF0cml4LnZlYzQuZnJvbVZhbHVlcygwLCBkaXN0YW5jZSwgc3ByZWFkLCAxKSk7XG4gIH1cblxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIHZpZXcsIGFuZCB1bmlmb3JtcyBwZXJ0YWluaW5nIHRvIHRoZSB2aWV3XHJcbiAgICogQHBhcmFtICB7bWF0NH0gdmlld1Byb2plY3QgICBDYW1lcmEncyBjb21iaW5lIHZpZXcgYW5kIHByb2plY3Rpb24gbWF0cml4XHJcbiAgICogQHBhcmFtICB7Q2FtZXJhfSBjYW1lcmEgICAgICBUaGUgY2FtZXJhXHJcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKFBhcnRpY2xlUG9ydGFsRHJhd2FibGUsIFt7XG4gICAga2V5OiAndXBkYXRlVmlldycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVZpZXcodmlld1Byb2plY3QsIGNhbWVyYSkge1xuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUGFydGljbGVQb3J0YWxEcmF3YWJsZS5wcm90b3R5cGUpLCAndXBkYXRlVmlldycsIHRoaXMpLmNhbGwodGhpcywgdmlld1Byb2plY3QsIGNhbWVyYSk7XG4gICAgICBpZiAoY2FtZXJhKSB7XG4gICAgICAgIHZhciBkaXN0ID0gX2dsTWF0cml4LnZlYzMubGVuZ3RoKGNhbWVyYS5wb3NpdGlvbik7XG4gICAgICAgIHZhciBzY2FsZSA9IE1hdGgucG93KGRpc3QsIDAuMik7XG4gICAgICAgIHRoaXMudW5pZm9ybXMudV9wYXJhbXNbM10gPSBzY2FsZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSB0aGUgdGltZSBmb3IgdGhlIHN5c3RlbVxyXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBkZWx0YSBUaW1lIHNpbmNlIGxhc3QgdGlja1xyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgICBSZXN1bHRzIG9mIG9uVXBkYXRlXHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZVRpbWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVUaW1lKGRlbHRhKSB7XG4gICAgICB2YXIgcmV0ID0gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUGFydGljbGVQb3J0YWxEcmF3YWJsZS5wcm90b3R5cGUpLCAndXBkYXRlVGltZScsIHRoaXMpLmNhbGwodGhpcywgZGVsdGEpO1xuICAgICAgdGhpcy51bmlmb3Jtcy51X3BhcmFtc1swXSA9IHRoaXMuZWxhcHNlZCAvIDEwMDAwMCAqIHRoaXMudW5pZm9ybXMudV9wYXJhbXNbMV07XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgcG9ydGFsIHBhcnRpY2xlIG1lc2hcclxuICAgICAqIEBwYXJhbSAge0Fzc2V0TWFuYWdlcn0gbWFuYWdlciBBc3NldE1hbmFnZXIgY29udGFpbmluZyB0aGUgcmVtYWluaW5nIGFzc2V0c1xyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgICAgICAgICAgIFN1Y2Nlc3MvZmFpbHVyZVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdpbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdChtYW5hZ2VyKSB7XG4gICAgICB0aGlzLm1lc2ggPSBuZXcgX21lc2hQYXJ0aWNsZVBvcnRhbDJbJ2RlZmF1bHQnXShtYW5hZ2VyLl9nbCk7XG4gICAgICByZXR1cm4gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUGFydGljbGVQb3J0YWxEcmF3YWJsZS5wcm90b3R5cGUpLCAnaW5pdCcsIHRoaXMpLmNhbGwodGhpcywgbWFuYWdlcik7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFBhcnRpY2xlUG9ydGFsRHJhd2FibGU7XG59KShfcGFydGljbGUyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBQYXJ0aWNsZVBvcnRhbERyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX3RleHR1cmVkID0gcmVxdWlyZSgnLi90ZXh0dXJlZCcpO1xuXG52YXIgX3RleHR1cmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RleHR1cmVkKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgVEVYVFVSRSA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uVGV4dHVyZS5QYXJ0aWNsZTtcblxuLyoqXHJcbiAqIEEgUGFydGljbGVEcmF3YWJsZSByZXByZXNlbnRzIHRoZSBiYXNlIGNsYXNzIGZvciBwYXJ0aWNsZXNcclxuICpcclxuICogQGV4dGVuZHMge1RleHR1cmVkRHJhd2FibGV9XHJcbiAqL1xuXG52YXIgUGFydGljbGVEcmF3YWJsZSA9IChmdW5jdGlvbiAoX1RleHR1cmVkRHJhd2FibGUpIHtcbiAgX2luaGVyaXRzKFBhcnRpY2xlRHJhd2FibGUsIF9UZXh0dXJlZERyYXdhYmxlKTtcblxuICBmdW5jdGlvbiBQYXJ0aWNsZURyYXdhYmxlKHByb2dyYW1OYW1lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBhcnRpY2xlRHJhd2FibGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUGFydGljbGVEcmF3YWJsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIHByb2dyYW1OYW1lLCBudWxsLCBURVhUVVJFKTtcbiAgICB0aGlzLnVuaWZvcm1zLnVfY2FtZXJhUG9zID0gX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygwLCAwLCAwKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhQYXJ0aWNsZURyYXdhYmxlLCBbe1xuICAgIGtleTogJ3VwZGF0ZVZpZXcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVWaWV3KHZpZXdQcm9qZWN0LCBjYW1lcmEpIHtcbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFBhcnRpY2xlRHJhd2FibGUucHJvdG90eXBlKSwgJ3VwZGF0ZVZpZXcnLCB0aGlzKS5jYWxsKHRoaXMsIHZpZXdQcm9qZWN0LCBjYW1lcmEpO1xuICAgICAgaWYgKGNhbWVyYSkge1xuICAgICAgICBfZ2xNYXRyaXgudmVjMy5jb3B5KHRoaXMudW5pZm9ybXMudV9jYW1lcmFQb3MsIGNhbWVyYS5wb3NpdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFBhcnRpY2xlRHJhd2FibGU7XG59KShfdGV4dHVyZWQyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBQYXJ0aWNsZURyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX2xpbmsgPSByZXF1aXJlKCcuL2xpbmsnKTtcblxudmFyIF9saW5rMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2xpbmspO1xuXG52YXIgX21lc2hQb3J0YWxMaW5rID0gcmVxdWlyZSgnLi4vbWVzaC9wb3J0YWwtbGluaycpO1xuXG52YXIgX21lc2hQb3J0YWxMaW5rMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lc2hQb3J0YWxMaW5rKTtcblxuLyoqXHJcbiAqIEEgTGlua0RyYXdhYmxlIHRoYXQgcmVwcmVzZW50cyBhIGxpbmsgZnJvbSBvbmUgcG9ydGFsIHRvIGFub3RoZXJcclxuICogQGV4dGVuZHMge0xpbmtEcmF3YWJsZX1cclxuICovXG5cbnZhciBQb3J0YWxMaW5rRHJhd2FibGUgPSAoZnVuY3Rpb24gKF9MaW5rRHJhd2FibGUpIHtcbiAgX2luaGVyaXRzKFBvcnRhbExpbmtEcmF3YWJsZSwgX0xpbmtEcmF3YWJsZSk7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgcG9ydGFsIGxpbmtcclxuICAgKiBAcGFyYW0gIHt2ZWMyfSBzdGFydCAgICAgICAgICBYLCBaIG9mIG9yaWdpbiBwb3J0YWxcclxuICAgKiBAcGFyYW0gIHt2ZWMyfSBlbmQgICAgICAgICAgICBYLCBaIG9mIGRlc3RpbmF0aW9uIHBvcnRhbFxyXG4gICAqIEBwYXJhbSAge3ZlYzR9IGNvbG9yICAgICAgICAgIENvbG9yIG9mIGxpbmtcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHN0YXJ0UGVyY2VudCBQZXJjZW50IGhlYWx0aCBvZiB0aGUgb3JpZ2luIHBvcnRhbFxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gZW5kUGVyY2VudCAgIFBlcmNlbnQgaGVhbHRoIG9mIHRoZSBkZXN0aW5hdGlvbiBwb3J0YWxcclxuICAgKi9cblxuICBmdW5jdGlvbiBQb3J0YWxMaW5rRHJhd2FibGUoc3RhcnQsIGVuZCwgY29sb3IsIHN0YXJ0UGVyY2VudCwgZW5kUGVyY2VudCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQb3J0YWxMaW5rRHJhd2FibGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUG9ydGFsTGlua0RyYXdhYmxlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5Qcm9ncmFtLkxpbmssIF9jb25zdGFudHMyWydkZWZhdWx0J10uVGV4dHVyZS5Qb3J0YWxMaW5rKTtcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5lbmQgPSBlbmQ7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMuc3RhcnRQZXJjZW50ID0gc3RhcnRQZXJjZW50O1xuICAgIHRoaXMuZW5kUGVyY2VudCA9IGVuZFBlcmNlbnQ7XG4gIH1cblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgdGhlIFBvcnRhbExpbmtNZXNoIGZvciB0aGlzIGxpbmtcclxuICAgKiBAcGFyYW0gIHtBc3NldE1hbmFnZXJ9IG1hbmFnZXIgQXNzZXRNYW5hZ2VyIHRvIGxvb2sgdXAgdGhlIHByb2dyYW0gYW5kIHRleHR1cmVcclxuICAgKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgICAgICAgU3VjY2Vzcy9mYWlsdXJlXHJcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKFBvcnRhbExpbmtEcmF3YWJsZSwgW3tcbiAgICBrZXk6ICdpbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdChtYW5hZ2VyKSB7XG4gICAgICB0aGlzLm1lc2ggPSBuZXcgX21lc2hQb3J0YWxMaW5rMlsnZGVmYXVsdCddKG1hbmFnZXIuX2dsLCB0aGlzLnN0YXJ0LCB0aGlzLmVuZCwgdGhpcy5jb2xvciwgdGhpcy5zdGFydFBlcmNlbnQsIHRoaXMuZW5kUGVyY2VudCk7XG4gICAgICByZXR1cm4gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUG9ydGFsTGlua0RyYXdhYmxlLnByb3RvdHlwZSksICdpbml0JywgdGhpcykuY2FsbCh0aGlzLCBtYW5hZ2VyKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUG9ydGFsTGlua0RyYXdhYmxlO1xufSkoX2xpbmsyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBQb3J0YWxMaW5rRHJhd2FibGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbnZhciBfY29uc3RhbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnN0YW50cyk7XG5cbnZhciBfbGluayA9IHJlcXVpcmUoJy4vbGluaycpO1xuXG52YXIgX2xpbmsyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGluayk7XG5cbnZhciBfbWVzaFJlc29uYXRvckxpbmsgPSByZXF1aXJlKCcuLi9tZXNoL3Jlc29uYXRvci1saW5rJyk7XG5cbnZhciBfbWVzaFJlc29uYXRvckxpbmsyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWVzaFJlc29uYXRvckxpbmspO1xuXG4vKipcclxuICogQSBSZXNvbmF0b3JMaW5rRHJhd2FibGUgaXMgYSBMaW5rRHJhd2FibGUgdGhhdCByZXByZXNlbnRzIGEgbGlua1xyXG4gKiBiZXR3ZWVuIGEgcG9ydGFsIGFuZCBhIHJlc29uYXRvclxyXG4gKi9cblxudmFyIFJlc29uYXRvckxpbmtEcmF3YWJsZSA9IChmdW5jdGlvbiAoX0xpbmtEcmF3YWJsZSkge1xuICBfaW5oZXJpdHMoUmVzb25hdG9yTGlua0RyYXdhYmxlLCBfTGlua0RyYXdhYmxlKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBwb3J0YWwgbGluayByZXNvbmF0b3JcclxuICAgKiBAcGFyYW0gIHt2ZWMyfSBwb3J0YWxQb3NpdGlvbiAgICAgWCxaIG9mIHRoZSBwb3J0YWwgKHVzdWFsbHkgMCwwKVxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gc2xvdCAgICAgICAgICAgICBTbG90ICgwLTcpXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSBkaXN0YW5jZSAgICAgICAgIFVzdWFsbHkgMC00MFxyXG4gICAqIEBwYXJhbSAge3ZlYzR9IGNvbG9yICAgICAgICAgICAgICBDb2xvciBvZiB0aGUgcmVzb25hdG9yIGxpbmsgKFRPRE86IG1ha2UgdGhpcyBkaXNjbylcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHJlc29uYXRvclBlcmNlbnQgUGVyY2VudCBoZWFsdGggb2YgdGhlIHJlc29uYXRvclxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIFJlc29uYXRvckxpbmtEcmF3YWJsZShwb3J0YWxQb3NpdGlvbiwgc2xvdCwgZGlzdGFuY2UsIGNvbG9yLCByZXNvbmF0b3JQZXJjZW50KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlc29uYXRvckxpbmtEcmF3YWJsZSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihSZXNvbmF0b3JMaW5rRHJhd2FibGUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBfY29uc3RhbnRzMlsnZGVmYXVsdCddLlByb2dyYW0uTGluaywgX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5UZXh0dXJlLlJlc29uYXRvckxpbmspO1xuICAgIHRoaXMucG9ydGFsUG9zaXRpb24gPSBwb3J0YWxQb3NpdGlvbjtcbiAgICB0aGlzLnNsb3QgPSBzbG90O1xuICAgIHRoaXMuZGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5yZXNvbmF0b3JQZXJjZW50ID0gcmVzb25hdG9yUGVyY2VudDtcbiAgfVxuXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBSZXNvbmF0b3JMaW5rTWVzaCB3aXRoIHRoZSBnaXZlbiBwYXJhbXMsIGFuZCBpbml0aWFsaXplcyB0aGVcclxuICAgKiB0ZXh0dXJlL3Byb2dyYW1cclxuICAgKiBAcGFyYW0gIHtBc3NldE1hbmFnZXJ9IG1hbmFnZXIgQXNzZXRNYW5hZ2VyIGNvbnRhaW5pbmcgdGhlIHJlcXVpcmVkIHByb2dyYW0vdGV4dHVyZVxyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgICAgICAgICBTdWNjZXNzL2ZhaWx1cmVcclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoUmVzb25hdG9yTGlua0RyYXdhYmxlLCBbe1xuICAgIGtleTogJ2luaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KG1hbmFnZXIpIHtcbiAgICAgIHRoaXMubWVzaCA9IG5ldyBfbWVzaFJlc29uYXRvckxpbmsyWydkZWZhdWx0J10obWFuYWdlci5fZ2wsIHRoaXMucG9ydGFsUG9zaXRpb24sIHRoaXMuc2xvdCwgdGhpcy5kaXN0YW5jZSwgdGhpcy5jb2xvciwgdGhpcy5yZXNvbmF0b3JQZXJjZW50KTtcbiAgICAgIHJldHVybiBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihSZXNvbmF0b3JMaW5rRHJhd2FibGUucHJvdG90eXBlKSwgJ2luaXQnLCB0aGlzKS5jYWxsKHRoaXMsIG1hbmFnZXIpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBSZXNvbmF0b3JMaW5rRHJhd2FibGU7XG59KShfbGluazJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFJlc29uYXRvckxpbmtEcmF3YWJsZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKTtcblxudmFyIF9jb25zdGFudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uc3RhbnRzKTtcblxudmFyIF9iaWNvbG9yZWQgPSByZXF1aXJlKCcuL2JpY29sb3JlZCcpO1xuXG52YXIgX2JpY29sb3JlZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9iaWNvbG9yZWQpO1xuXG52YXIgUmVzb3VyY2UgPSB7fTtcbnZhciBtZXNoZXMgPSBfY29uc3RhbnRzMlsnZGVmYXVsdCddLk1lc2guUmVzb3VyY2U7XG5cbi8qKlxyXG4gKiBDcmVhdGVzIGEgcmVzb3VyY2UgZHJhd2FibGVcclxuICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIEludGVybmFsTmFtZVxyXG4gKiBAcmV0dXJuIHtpdGVtYmFzZX0gICAgQSBCaWNvbG9yZWREcmF3YWJsZSByZXByZXNlbnRpbmcgdGhpcyByZXNvdXJjZSBpdGVtXHJcbiAqL1xuZnVuY3Rpb24gY3JlYXRlUmVzb3VyY2UobmFtZSkge1xuICB2YXIgaXRlbWJhc2UgPSAoZnVuY3Rpb24gKF9CaWNvbG9yZWREcmF3YWJsZSkge1xuICAgIF9pbmhlcml0cyhpdGVtYmFzZSwgX0JpY29sb3JlZERyYXdhYmxlKTtcblxuICAgIGZ1bmN0aW9uIGl0ZW1iYXNlKCkge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIGl0ZW1iYXNlKTtcblxuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoaXRlbWJhc2UucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBtZXNoZXNbbmFtZV0sIF9jb25zdGFudHMyWydkZWZhdWx0J10uVGV4dHVyZS5GbGlwQ2FyZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1iYXNlO1xuICB9KShfYmljb2xvcmVkMlsnZGVmYXVsdCddKTtcblxuICByZXR1cm4gaXRlbWJhc2U7XG59XG5cbmZvciAodmFyIGkgaW4gbWVzaGVzKSB7XG4gIFJlc291cmNlW25hbWVdID0gY3JlYXRlUmVzb3VyY2UoaSk7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFJlc291cmNlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX3RleHR1cmVkID0gcmVxdWlyZSgnLi90ZXh0dXJlZCcpO1xuXG52YXIgX3RleHR1cmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RleHR1cmVkKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgUFJPR1JBTSA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uUHJvZ3JhbS5TaGllbGRFZmZlY3Q7XG5cbi8vIHRoZXNlIGRlZmF1bHRzIGFyZSB3aGFjay4gIE5lZWQgdG8gZmluZCB0aGUgcmVhbFxuLy8gZnVuY3Rpb25zIHVzZWQgdG8gdXBkYXRlIHRoZXNlLCB0b29cbi8vIEFzIG9mIDEuNjIuMCwgdGhhdCB3YXMgaW4gLi4uaW5ncmVzcy5jb21tb24uc2Nhbm5lci5iLmEuZFxuLy8gVGhlIGJha3NtYWxpIGlzIGEgbGl0dGxlIGphY2tlZCB1cCwgdGhvdWdoLlxudmFyIGRlZmF1bHRDb2xvciA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKF9jb25zdGFudHMyWydkZWZhdWx0J10udGVhbUNvbG9ycy5ORVVUUkFMKTtcbnZhciBkZWZhdWx0UmFtcFRhcmdldEludiA9IF9nbE1hdHJpeC52ZWMyLmZyb21WYWx1ZXMoMC41LCAxLjMpO1xudmFyIGRlZmF1bHRDb250cmlidXRpb25zID0gX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygwLjUsIDAuNSwgMC41KTtcblxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIHNoaWVsZCBpZGxlIGVmZmVjdFxyXG4gKlxyXG4gKiBOb3RlOiBUaGlzIHByb2JhYmx5IHNob3VsZCBhY3R1YWxseSBiZSBnZW5lcmFsaXplZCBkaWZmZXJlbnRseS4uLlxyXG4gKiBBcHBhcmVudGx5IGFsbCB0aHJlZSBzaGllbGQgZWZmZWN0cyB1c2UgdGhlIHNhbWUgdGV4dHVyZSBhbmQgbWVzaCwgYnV0IGhhdmVcclxuICogZGlmZmVyZW50IHByb2dyYW1zIGFuZCB2YXJpYWJsZXMuXHJcbiAqXHJcbiAqIFNvLCBwZXJoYXBzIGEgYmV0dGVyIHdheSB3b3VsZCBiZSB0byBoYXZlIHRoZSBiYXNlIGNsYXNzIGhhcmRjb2RlIHRoZSB0ZXh0dXJlXHJcbiAqIGFuZCBtZXNoIGludGVybmFsIG5hbWVzLCBhbmQgdGhlbiB0aGUgZGVyaXZlZCBjbGFzc2VzIHBpY2sgYSBwcm9ncmFtIGFuZCBoYW5kbGVcclxuICogdGhlIHZhcmlhYmxlcy5cclxuICovXG5cbnZhciBTaGllbGRFZmZlY3REcmF3YWJsZSA9IChmdW5jdGlvbiAoX1RleHR1cmVkRHJhd2FibGUpIHtcbiAgX2luaGVyaXRzKFNoaWVsZEVmZmVjdERyYXdhYmxlLCBfVGV4dHVyZWREcmF3YWJsZSk7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhIHNoaWVsZCBlZmZlY3RcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IG1lc2hOYW1lICAgIE1lc2ggaW50ZXJuYWwgbmFtZVxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdGV4dHVyZU5hbWUgVGV4dHVyZSBpbnRlcm5hbCBuYW1lXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gU2hpZWxkRWZmZWN0RHJhd2FibGUobWVzaE5hbWUsIHRleHR1cmVOYW1lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNoaWVsZEVmZmVjdERyYXdhYmxlKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFNoaWVsZEVmZmVjdERyYXdhYmxlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgUFJPR1JBTSwgbWVzaE5hbWUsIHRleHR1cmVOYW1lKTtcbiAgICB0aGlzLnVuaWZvcm1zLnVfY29sb3IgPSBfZ2xNYXRyaXgudmVjNC5jbG9uZShkZWZhdWx0Q29sb3IpO1xuICAgIHRoaXMudW5pZm9ybXMudV9yYW1wVGFyZ2V0SW52V2lkdGggPSBfZ2xNYXRyaXgudmVjMi5jbG9uZShkZWZhdWx0UmFtcFRhcmdldEludik7XG4gICAgdGhpcy51bmlmb3Jtcy51X2NvbnRyaWJ1dGlvbnNBbmRBbHBoYSA9IF9nbE1hdHJpeC52ZWMzLmNsb25lKGRlZmF1bHRDb250cmlidXRpb25zKTtcbiAgfVxuXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIGRlZmF1bHQgdW5pZm9ybXNcclxuICAgKlxyXG4gICAqIE5vdGU6IHRoZXNlIGFyZSBub3RoaW5nIGxpa2Ugd2hhdCdzIGluIHRoZSBhcGssIGp1c3Qgc29tZSBmdW5jdGlvbnMgdGhhdFxyXG4gICAqIGhhcHBlbiB0byBsb29rIGtpbmRhIHNvcnRhIG5pY2VcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGRlbHRhIFRpbWUgc2luY2UgbGFzdCBmcmFtZVxyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgUmV0dXJucyB0cnVlIHRvIGNvbnRpbnVlIHRoZSBhbmltYXRpb24uXHJcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKFNoaWVsZEVmZmVjdERyYXdhYmxlLCBbe1xuICAgIGtleTogJ3VwZGF0ZVRpbWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVUaW1lKGRlbHRhKSB7XG4gICAgICB2YXIgcmV0ID0gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoU2hpZWxkRWZmZWN0RHJhd2FibGUucHJvdG90eXBlKSwgJ3VwZGF0ZVRpbWUnLCB0aGlzKS5jYWxsKHRoaXMsIGRlbHRhKTtcbiAgICAgIHZhciBpbmMgPSB0aGlzLmVsYXBzZWQgLyAxMDAwMDtcbiAgICAgIC8vIHRoaXMgaXMgc28gc2hpdHR5LCBidXQgYWdhaW4sIHRoaXMgamF2YSBkZWNvbXBpbGVyIHJlYWxseSBkb2Vzbid0IGxpa2UgdGhlIGZpbGUuXG4gICAgICAvLyBUaGlzIGlzIG5vdGhpbmcgY2xvc2UgdG8gd2hhdCdzICdzdXBwb3NlZCcgdG8gaGFwcGVuIGluIHRoZXNlIHVuaWZvcm1zLCBqdXN0IGEgaGFja1xuICAgICAgLy8gdGhhdCdzIGtpbmRhIHNvcnRhIGxpa2UgdGhlIGFjdHVhbCB0aGluZy5cbiAgICAgIHRoaXMudW5pZm9ybXMudV9yYW1wVGFyZ2V0SW52V2lkdGhbMF0gPSAtKGluYyAtIE1hdGguZmxvb3IoaW5jKSk7XG4gICAgICB0aGlzLnVuaWZvcm1zLnVfcmFtcFRhcmdldEludldpZHRoWzFdID0gTWF0aC5zaW4oKGluYyAtIE1hdGguZmxvb3IoaW5jKSkgKiBNYXRoLlBJIC8gMik7XG4gICAgICAvLyB1X2NvbnRyaWJ1dGlvbnNBbmRBbHBoYT9cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNoaWVsZEVmZmVjdERyYXdhYmxlO1xufSkoX3RleHR1cmVkMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gU2hpZWxkRWZmZWN0RHJhd2FibGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbnZhciBfY29uc3RhbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnN0YW50cyk7XG5cbnZhciBfbGluayA9IHJlcXVpcmUoJy4vbGluaycpO1xuXG52YXIgX2xpbmsyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbGluayk7XG5cbnZhciBfbWVzaFNwaGVyaWNhbFBvcnRhbExpbmsgPSByZXF1aXJlKCcuLi9tZXNoL3NwaGVyaWNhbC1wb3J0YWwtbGluaycpO1xuXG52YXIgX21lc2hTcGhlcmljYWxQb3J0YWxMaW5rMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lc2hTcGhlcmljYWxQb3J0YWxMaW5rKTtcblxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBwb3J0YWwgbGluayB0aGF0IGZvbGxvd3MgdGhlIHN1cmZhY2Ugb2YgYSBzcGhlcmUuXHJcbiAqXHJcbiAqIEhvb3JheSBmb3IgY3VzdG9tIHNoYWRlcnMsIGV0YyFcclxuICovXG5cbnZhciBTcGhlcmljYWxQb3J0YWxMaW5rRHJhd2FibGUgPSAoZnVuY3Rpb24gKF9MaW5rRHJhd2FibGUpIHtcbiAgX2luaGVyaXRzKFNwaGVyaWNhbFBvcnRhbExpbmtEcmF3YWJsZSwgX0xpbmtEcmF3YWJsZSk7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgc3BoZXJpY2FsIHBvcnRhbCBsaW5rXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSBzcGhlcmVSYWRpdXMgUmFkaXVzIG9mIHRoZSBzcGhlcmVcclxuICAgKiBAcGFyYW0gIHt2ZWMyfSBzdGFydCAgICAgICAgICBMYXQsbG5nIG9mIHRoZSBvcmlnaW4gcG9ydGFsXHJcbiAgICogQHBhcmFtICB7dmVjMn0gZW5kICAgICAgICAgICAgTGF0LGxuZyBvZiB0aGUgZGVzdGluYXRpb24gcG9ydGFsXHJcbiAgICogQHBhcmFtICB7dmVjNH0gY29sb3IgICAgICAgICAgQ29sb3Igb2YgdGhlIGxpbmtcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHN0YXJ0UGVyY2VudCBQZXJjZW50IGhlYWx0aCBvZiB0aGUgb3JpZ2luIHBvcnRhbFxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gZW5kUGVyY2VudCAgIFBlcmNlbnQgaGVhbHRoIG9mIHRoZSBkZXN0aW5hdGlvbiBwb3J0YWxcclxuICAgKi9cblxuICBmdW5jdGlvbiBTcGhlcmljYWxQb3J0YWxMaW5rRHJhd2FibGUoc3BoZXJlUmFkaXVzLCBzdGFydCwgZW5kLCBjb2xvciwgc3RhcnRQZXJjZW50LCBlbmRQZXJjZW50KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNwaGVyaWNhbFBvcnRhbExpbmtEcmF3YWJsZSk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihTcGhlcmljYWxQb3J0YWxMaW5rRHJhd2FibGUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBfY29uc3RhbnRzMlsnZGVmYXVsdCddLlByb2dyYW0uU3BoZXJpY2FsTGluaywgX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5UZXh0dXJlLlBvcnRhbExpbmspO1xuICAgIHRoaXMucmFkaXVzID0gc3BoZXJlUmFkaXVzO1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLmVuZCA9IGVuZDtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5zdGFydFBlcmNlbnQgPSBzdGFydFBlcmNlbnQ7XG4gICAgdGhpcy5lbmRQZXJjZW50ID0gZW5kUGVyY2VudDtcbiAgICB0aGlzLnVuaWZvcm1zLnVfbW9kZWwgPSB0aGlzLl9tb2RlbDtcbiAgfVxuXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdHMgYSBtZXNoIGZvciB0aGUgbGluaywgdGhlbiBpbml0aWFsaXplcyB0aGUgcmVtYWluaW5nIGFzc2V0cy5cclxuICAgKiBAcGFyYW0gIHtBc3NldE1hbmFnZXJ9IG1hbmFnZXIgQXNzZXRNYW5hZ2VyIGNvbnRhaW5pbmcgdGhlIHByb2dyYW0vdGV4dHVyZVxyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgICAgICAgICBTdWNjZXNzL2ZhaWx1cmVcclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoU3BoZXJpY2FsUG9ydGFsTGlua0RyYXdhYmxlLCBbe1xuICAgIGtleTogJ2luaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KG1hbmFnZXIpIHtcbiAgICAgIHRoaXMubWVzaCA9IG5ldyBfbWVzaFNwaGVyaWNhbFBvcnRhbExpbmsyWydkZWZhdWx0J10obWFuYWdlci5fZ2wsIHRoaXMucmFkaXVzLCB0aGlzLnN0YXJ0LCB0aGlzLmVuZCwgdGhpcy5jb2xvciwgdGhpcy5zdGFydFBlcmNlbnQsIHRoaXMuZW5kUGVyY2VudCk7XG4gICAgICByZXR1cm4gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3BoZXJpY2FsUG9ydGFsTGlua0RyYXdhYmxlLnByb3RvdHlwZSksICdpbml0JywgdGhpcykuY2FsbCh0aGlzLCBtYW5hZ2VyKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGVWaWV3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVmlldyh2aWV3UHJvamVjdCwgY2FtZXJhKSB7XG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihTcGhlcmljYWxQb3J0YWxMaW5rRHJhd2FibGUucHJvdG90eXBlKSwgJ3VwZGF0ZVZpZXcnLCB0aGlzKS5jYWxsKHRoaXMsIHZpZXdQcm9qZWN0LCBjYW1lcmEpO1xuICAgICAgdGhpcy51bmlmb3Jtcy51X21vZGVsID0gdGhpcy5fbW9kZWw7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNwaGVyaWNhbFBvcnRhbExpbmtEcmF3YWJsZTtcbn0pKF9saW5rMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gU3BoZXJpY2FsUG9ydGFsTGlua0RyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX3RleHR1cmVkID0gcmVxdWlyZSgnLi90ZXh0dXJlZCcpO1xuXG52YXIgX3RleHR1cmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RleHR1cmVkKTtcblxudmFyIF9tZXNoU3BoZXJlID0gcmVxdWlyZSgnLi4vbWVzaC9zcGhlcmUnKTtcblxudmFyIF9tZXNoU3BoZXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lc2hTcGhlcmUpO1xuXG52YXIgUFJPR1JBTSA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uUHJvZ3JhbS5UZXh0dXJlZDtcblxuLyoqXHJcbiAqIEEgc3BoZXJlIHdpdGggYSB0ZXh0dXJlIG1hcHBlZCB0byBpdFxyXG4gKi9cblxudmFyIFRleHR1cmVkU3BoZXJlRHJhd2FibGUgPSAoZnVuY3Rpb24gKF9UZXh0dXJlZERyYXdhYmxlKSB7XG4gIF9pbmhlcml0cyhUZXh0dXJlZFNwaGVyZURyYXdhYmxlLCBfVGV4dHVyZWREcmF3YWJsZSk7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgdGV4dHVyZWQgc3BoZXJlXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSB0ZXh0dXJlTmFtZSBJbnRlcm5hbCBuYW1lIG9mIHRoZSB0ZXh0dXJlIHRvIHVzZVxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gcmFkaXVzICAgICAgUmFkaXVzIG9mIHRoZSBzcGhlcmVcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHZTbGljZXMgICAgIE51bWJlciBvZiB2ZXJ0aWNhbCBzbGljZXNcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGhTbGljZXMgICAgIE51bWJlciBvZiBob3Jpem9udGFsIHNsaWNlc1xyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIFRleHR1cmVkU3BoZXJlRHJhd2FibGUodGV4dHVyZU5hbWUsIHJhZGl1cywgdlNsaWNlcywgaFNsaWNlcykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUZXh0dXJlZFNwaGVyZURyYXdhYmxlKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFRleHR1cmVkU3BoZXJlRHJhd2FibGUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBQUk9HUkFNLCBudWxsLCB0ZXh0dXJlTmFtZSk7XG4gICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgdGhpcy52U2xpY2VzID0gdlNsaWNlcztcbiAgICB0aGlzLmhTbGljZXMgPSBoU2xpY2VzO1xuICB9XG5cbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgc3BoZXJlIG1lc2ggYW5kIGluaXRpYWxpemUgdGhlIG90aGVyIHJlc291cmNlc1xyXG4gICAqIEBwYXJhbSAge0Fzc2V0TWFuYWdlcn0gbWFuYWdlciBBc3NldE1hbmFnZXIgY29udGFpbmluZyB0aGUgdGV4dHVyZS9wcm9ncmFtXHJcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgICAgICAgICAgIFN1Y2Nlc3MvZmFpbHVyZVxyXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhUZXh0dXJlZFNwaGVyZURyYXdhYmxlLCBbe1xuICAgIGtleTogJ2luaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KG1hbmFnZXIpIHtcbiAgICAgIHRoaXMubWVzaCA9IG5ldyBfbWVzaFNwaGVyZTJbJ2RlZmF1bHQnXShtYW5hZ2VyLl9nbCwgdGhpcy5yYWRpdXMsIHRoaXMudlNsaWNlcywgdGhpcy5oU2xpY2VzKTtcbiAgICAgIHJldHVybiBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihUZXh0dXJlZFNwaGVyZURyYXdhYmxlLnByb3RvdHlwZSksICdpbml0JywgdGhpcykuY2FsbCh0aGlzLCBtYW5hZ2VyKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVGV4dHVyZWRTcGhlcmVEcmF3YWJsZTtcbn0pKF90ZXh0dXJlZDJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFRleHR1cmVkU3BoZXJlRHJhd2FibGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfZHJhd2FibGUgPSByZXF1aXJlKCcuLi9kcmF3YWJsZScpO1xuXG52YXIgX2RyYXdhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYXdhYmxlKTtcblxuLyoqXHJcbiAqIEEgVGV4dHVyZWREcmF3YWJsZSBpcyBhIERyYXdhYmxlIHdpdGggYSBzcGVjaWZpYyB0ZXh0dXJlXHJcbiAqL1xuXG52YXIgVGV4dHVyZWREcmF3YWJsZSA9IChmdW5jdGlvbiAoX0RyYXdhYmxlKSB7XG4gIF9pbmhlcml0cyhUZXh0dXJlZERyYXdhYmxlLCBfRHJhd2FibGUpO1xuXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIHRleHR1cmVkIGRyYXdhYmxlLCBnaXZlbiBhIHByb2dyYW0sIG1lc2gsIGFuZCB0ZXh0dXJlXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBwcm9ncmFtTmFtZSBQcm9ncmFtIGludGVybmFsIG5hbWVcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IG1lc2hOYW1lICAgIE1lc2ggaW50ZXJuYWwgbmFtZVxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdGV4dHVyZU5hbWUgVGV4dHVyZSBpbnRlcm5hbCBuYW1lXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gVGV4dHVyZWREcmF3YWJsZShwcm9ncmFtTmFtZSwgbWVzaE5hbWUsIHRleHR1cmVOYW1lKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRleHR1cmVkRHJhd2FibGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoVGV4dHVyZWREcmF3YWJsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIHByb2dyYW1OYW1lLCBtZXNoTmFtZSk7XG4gICAgdGhpcy50ZXh0dXJlTmFtZSA9IHRleHR1cmVOYW1lO1xuICAgIHRoaXMudGV4dHVyZSA9IG51bGw7XG4gIH1cblxuICAvKipcclxuICAgKiBEcmF3IHRoZSB0ZXh0dXJlZCBvYmplY3RcclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoVGV4dHVyZWREcmF3YWJsZSwgW3tcbiAgICBrZXk6ICdkcmF3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJhdygpIHtcbiAgICAgIHRoaXMudGV4dHVyZS51c2UoMCk7XG4gICAgICB0aGlzLnVuaWZvcm1zLnVfdGV4dHVyZSA9IDA7XG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihUZXh0dXJlZERyYXdhYmxlLnByb3RvdHlwZSksICdkcmF3JywgdGhpcykuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemUgdGhlIHRleHR1cmUsIHRoZW4gaW5pdGlhbGl6ZSBvdGhlciByZXNvdXJjZXNcclxuICAgICAqIEBwYXJhbSAge0Fzc2V0TWFuYWdlcn0gbWFuYWdlciBBc3NldE1hbmFnZXIgY29udGFpbmluZyB0aGUgdGV4dHVyZSBhbmQgb3RoZXIgcmVzb3VyY2VzXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICAgICAgICAgU3VjY2Vzcy9mYWlsdXJlXHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ2luaXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KG1hbmFnZXIpIHtcbiAgICAgIGlmICh0aGlzLnRleHR1cmVOYW1lKSB7XG4gICAgICAgIHRoaXMudGV4dHVyZSA9IG1hbmFnZXIuZ2V0VGV4dHVyZSh0aGlzLnRleHR1cmVOYW1lKTtcbiAgICAgICAgaWYgKCF0aGlzLnRleHR1cmUpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ21pc3NpbmcgdGV4dHVyZSAnICsgdGhpcy50ZXh0dXJlTmFtZSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoVGV4dHVyZWREcmF3YWJsZS5wcm90b3R5cGUpLCAnaW5pdCcsIHRoaXMpLmNhbGwodGhpcywgbWFuYWdlcik7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFRleHR1cmVkRHJhd2FibGU7XG59KShfZHJhd2FibGUyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBUZXh0dXJlZERyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX2dsb3dyYW1wID0gcmVxdWlyZSgnLi9nbG93cmFtcCcpO1xuXG52YXIgX2dsb3dyYW1wMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsb3dyYW1wKTtcblxudmFyIF9iaWNvbG9yZWQgPSByZXF1aXJlKCcuL2JpY29sb3JlZCcpO1xuXG52YXIgX2JpY29sb3JlZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9iaWNvbG9yZWQpO1xuXG52YXIgX3NoaWVsZEVmZmVjdCA9IHJlcXVpcmUoJy4vc2hpZWxkLWVmZmVjdCcpO1xuXG52YXIgX3NoaWVsZEVmZmVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zaGllbGRFZmZlY3QpO1xuXG52YXIgX29ybmFtZW50ID0gcmVxdWlyZSgnLi9vcm5hbWVudCcpO1xuXG52YXIgX29ybmFtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX29ybmFtZW50KTtcblxuLyoqXHJcbiAqIFZhcmlvdXMgd29ybGQgZHJhd2FibGVzXHJcbiAqXHJcbiAqIEluY2x1ZGVzIFBvcnRhbCwgU2hpZWxkRWZmZWN0LCB3YXlwb2ludHMsIHJlc29uYXRvcnMsIGFuZCBhcnRpZmFjdCBnbG93c1xyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cbnZhciBXb3JsZCA9IHt9O1xudmFyIG1lc2hlcyA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uTWVzaC5Xb3JsZDtcbnZhciB0ZXh0dXJlcyA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uVGV4dHVyZTtcblxuZnVuY3Rpb24gbWFrZUdsb3dyYW1wKG1lc2gsIHRleHR1cmUpIHtcbiAgdmFyIGdsb3dyYW1wYmFzZSA9IChmdW5jdGlvbiAoX0dsb3dyYW1wRHJhd2FibGUpIHtcbiAgICBfaW5oZXJpdHMoZ2xvd3JhbXBiYXNlLCBfR2xvd3JhbXBEcmF3YWJsZSk7XG5cbiAgICBmdW5jdGlvbiBnbG93cmFtcGJhc2UoKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgZ2xvd3JhbXBiYXNlKTtcblxuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvd3JhbXBiYXNlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgbWVzaCwgdGV4dHVyZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdsb3dyYW1wYmFzZTtcbiAgfSkoX2dsb3dyYW1wMlsnZGVmYXVsdCddKTtcblxuICByZXR1cm4gZ2xvd3JhbXBiYXNlO1xufVxuXG5mdW5jdGlvbiBtYWtlQmljb2xvcmVkKG1lc2gsIHRleHR1cmUpIHtcbiAgdmFyIGJpY29sb3JlZGJhc2UgPSAoZnVuY3Rpb24gKF9CaWNvbG9yZWREcmF3YWJsZSkge1xuICAgIF9pbmhlcml0cyhiaWNvbG9yZWRiYXNlLCBfQmljb2xvcmVkRHJhd2FibGUpO1xuXG4gICAgZnVuY3Rpb24gYmljb2xvcmVkYmFzZSgpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBiaWNvbG9yZWRiYXNlKTtcblxuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoYmljb2xvcmVkYmFzZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIG1lc2gsIHRleHR1cmUpO1xuICAgIH1cblxuICAgIHJldHVybiBiaWNvbG9yZWRiYXNlO1xuICB9KShfYmljb2xvcmVkMlsnZGVmYXVsdCddKTtcblxuICByZXR1cm4gYmljb2xvcmVkYmFzZTtcbn1cblxuZnVuY3Rpb24gbWFrZVNoaWVsZEVmZmVjdChtZXNoLCB0ZXh0dXJlKSB7XG4gIHZhciBzaGllbGRlZmZlY3RiYXNlID0gKGZ1bmN0aW9uIChfU2hpZWxkRWZmZWN0RHJhd2FibGUpIHtcbiAgICBfaW5oZXJpdHMoc2hpZWxkZWZmZWN0YmFzZSwgX1NoaWVsZEVmZmVjdERyYXdhYmxlKTtcblxuICAgIGZ1bmN0aW9uIHNoaWVsZGVmZmVjdGJhc2UoKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgc2hpZWxkZWZmZWN0YmFzZSk7XG5cbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKHNoaWVsZGVmZmVjdGJhc2UucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBtZXNoLCB0ZXh0dXJlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2hpZWxkZWZmZWN0YmFzZTtcbiAgfSkoX3NoaWVsZEVmZmVjdDJbJ2RlZmF1bHQnXSk7XG5cbiAgcmV0dXJuIHNoaWVsZGVmZmVjdGJhc2U7XG59XG5cbmZ1bmN0aW9uIG1ha2VPcm5hbWVudChtZXNoLCB0ZXh0dXJlKSB7XG4gIHZhciBvcm5hbWVudGJhc2UgPSAoZnVuY3Rpb24gKF9Pcm5hbWVudERyYXdhYmxlKSB7XG4gICAgX2luaGVyaXRzKG9ybmFtZW50YmFzZSwgX09ybmFtZW50RHJhd2FibGUpO1xuXG4gICAgZnVuY3Rpb24gb3JuYW1lbnRiYXNlKCkge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIG9ybmFtZW50YmFzZSk7XG5cbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9ybmFtZW50YmFzZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIG1lc2gsIHRleHR1cmUpO1xuICAgIH1cblxuICAgIHJldHVybiBvcm5hbWVudGJhc2U7XG4gIH0pKF9vcm5hbWVudDJbJ2RlZmF1bHQnXSk7XG5cbiAgcmV0dXJuIG9ybmFtZW50YmFzZTtcbn1cblxuV29ybGQuUG9ydGFsID0gbWFrZUdsb3dyYW1wKG1lc2hlcy5Qb3J0YWwsIHRleHR1cmVzLkdsb3dyYW1wKTtcbldvcmxkLldheXBvaW50ID0gbWFrZUdsb3dyYW1wKG1lc2hlcy5XYXlwb2ludCwgdGV4dHVyZXMuV2F5cG9pbnQpO1xuV29ybGQuQXJ0aWZhY3RzUmVkR2xvdyA9IG1ha2VHbG93cmFtcChtZXNoZXMuQXJ0aWZhY3RzUmVkR2xvdywgdGV4dHVyZXMuQ29sb3JHbG93KTtcbldvcmxkLkFydGlmYWN0c0dyZWVuR2xvdyA9IG1ha2VHbG93cmFtcChtZXNoZXMuQXJ0aWZhY3RzR3JlZW5HbG93LCB0ZXh0dXJlcy5Db2xvckdsb3cpO1xuV29ybGQuQXJ0aWZhY3RzUHVycGxlR2xvdyA9IG1ha2VHbG93cmFtcChtZXNoZXMuQXJ0aWZhY3RzUHVycGxlR2xvdywgdGV4dHVyZXMuQ29sb3JHbG93KTtcbldvcmxkLkFydGlmYWN0c1RhcmdldEdsb3cgPSBtYWtlR2xvd3JhbXAobWVzaGVzLkFydGlmYWN0c1RhcmdldEdsb3csIHRleHR1cmVzLlRhcmdldEdsb3cpO1xuXG5Xb3JsZC5TaGllbGQgPSBtYWtlU2hpZWxkRWZmZWN0KG1lc2hlcy5TaGllbGQsIHRleHR1cmVzLlNoaWVsZEVmZmVjdCk7XG5Xb3JsZC5SZXNvbmF0b3IgPSBtYWtlQmljb2xvcmVkKG1lc2hlcy5SZXNvbmF0b3IsIHRleHR1cmVzLkZsaXBDYXJkKTtcblxuV29ybGQuT3JuYW1lbnRNZWV0dXBQb2ludCA9IG1ha2VPcm5hbWVudChtZXNoZXMuT3JuYW1lbnRNZWV0dXBQb2ludCwgdGV4dHVyZXMuT3JuYW1lbnRNZWV0dXBQb2ludCk7XG5Xb3JsZC5Pcm5hbWVudEZpbmlzaFBvaW50ID0gbWFrZU9ybmFtZW50KG1lc2hlcy5Pcm5hbWVudEZpbmlzaFBvaW50LCB0ZXh0dXJlcy5Pcm5hbWVudEZpbmlzaFBvaW50KTtcbldvcmxkLk9ybmFtZW50Q2x1c3RlciA9IG1ha2VPcm5hbWVudChtZXNoZXMuT3JuYW1lbnRDbHVzdGVyLCB0ZXh0dXJlcy5Pcm5hbWVudENsdXN0ZXIpO1xuV29ybGQuT3JuYW1lbnRWb2xhdGlsZSA9IG1ha2VPcm5hbWVudChtZXNoZXMuT3JuYW1lbnRWb2xhdGlsZSwgdGV4dHVyZXMuT3JuYW1lbnRWb2xhdGlsZSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFdvcmxkO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cycpO1xuXG52YXIgX2NvbnN0YW50czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25zdGFudHMpO1xuXG52YXIgX3RleHR1cmVkID0gcmVxdWlyZSgnLi90ZXh0dXJlZCcpO1xuXG52YXIgX3RleHR1cmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RleHR1cmVkKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG52YXIgUFJPR1JBTSA9IF9jb25zdGFudHMyWydkZWZhdWx0J10uUHJvZ3JhbS5YbTtcbnZhciBkZWZhdWx0VGVhbUNvbG9yID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS54bUNvbG9ycy5jb3JlR2xvdyk7XG52YXIgZGVmYXVsdEFsdENvbG9yID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS54bUNvbG9ycy5jb3JlR2xvd0FsdCk7XG5cbi8qKlxyXG4gKiBBbiBYbURyYXdhYmxlIGlzIGEgZHJhd2FibGUgcmVwcmVzZW50aW5nIHRoZSBhbmltYXRlIFwieG0gY29yZVwiIG9mIGludmVudG9yeSBpdGVtc1xyXG4gKi9cblxudmFyIFhtRHJhd2FibGUgPSAoZnVuY3Rpb24gKF9UZXh0dXJlZERyYXdhYmxlKSB7XG4gIF9pbmhlcml0cyhYbURyYXdhYmxlLCBfVGV4dHVyZWREcmF3YWJsZSk7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGFuIHhtIGNvcmVcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IG1lc2hOYW1lICAgIE1lc2ggaW50ZXJuYWwgbmFtZVxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdGV4dHVyZU5hbWUgVGV4dHVyZSBpbnRlcm5hbCBuYW1lXHJcbiAgICogQHBhcmFtICB7dmVjNH0gdGVhbUNvbG9yICAgICBDb2xvciBvZiB0aGUgeG0gZ2xvdy5cclxuICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKi9cblxuICBmdW5jdGlvbiBYbURyYXdhYmxlKG1lc2hOYW1lLCB0ZXh0dXJlTmFtZSwgdGVhbUNvbG9yKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFhtRHJhd2FibGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoWG1EcmF3YWJsZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIFBST0dSQU0sIG1lc2hOYW1lLCB0ZXh0dXJlTmFtZSk7XG4gICAgdGhpcy51bmlmb3Jtcy51X2VsYXBzZWRUaW1lID0gMDtcbiAgICB0aGlzLnVuaWZvcm1zLnVfdGVhbUNvbG9yID0gX2dsTWF0cml4LnZlYzQuY2xvbmUodGVhbUNvbG9yIHx8IGRlZmF1bHRUZWFtQ29sb3IpO1xuICAgIHRoaXMudW5pZm9ybXMudV9hbHRDb2xvciA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKGRlZmF1bHRBbHRDb2xvcik7XG4gIH1cblxuICAvKipcclxuICAgKiBBbmltYXRlcyB0aGUgeG0gY29yZVxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gZGVsdGEgVGltZSBzaW5jZSBsYXN0IGZyYW1lXHJcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gICAgICBSZXR1cm5zIHRydWUgdG8gY29udGludWUgdGhlIGFuaW1hdGlvbi5cclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoWG1EcmF3YWJsZSwgW3tcbiAgICBrZXk6ICd1cGRhdGVUaW1lJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVGltZShkZWx0YSkge1xuICAgICAgdmFyIHJldCA9IF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFhtRHJhd2FibGUucHJvdG90eXBlKSwgJ3VwZGF0ZVRpbWUnLCB0aGlzKS5jYWxsKHRoaXMsIGRlbHRhKTtcbiAgICAgIHRoaXMudW5pZm9ybXMudV9lbGFwc2VkVGltZSA9IHRoaXMuZWxhcHNlZCAvIDEwMDAgJSAzMDAuMCAqIDAuMTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFhtRHJhd2FibGU7XG59KShfdGV4dHVyZWQyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBYbURyYXdhYmxlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIF9hc3NldE1hbmFnZXIgPSByZXF1aXJlKCcuL2Fzc2V0LW1hbmFnZXInKTtcblxudmFyIF9hc3NldE1hbmFnZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzZXRNYW5hZ2VyKTtcblxudmFyIF9yZW5kZXJlck9iamVjdCA9IHJlcXVpcmUoJy4vcmVuZGVyZXIvb2JqZWN0Jyk7XG5cbnZhciBfcmVuZGVyZXJPYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVuZGVyZXJPYmplY3QpO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgX2RyYXdhYmxlV29ybGQgPSByZXF1aXJlKCcuL2RyYXdhYmxlL3dvcmxkJyk7XG5cbnZhciBfZHJhd2FibGVXb3JsZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZVdvcmxkKTtcblxudmFyIF9kcmF3YWJsZVJlc291cmNlID0gcmVxdWlyZSgnLi9kcmF3YWJsZS9yZXNvdXJjZScpO1xuXG52YXIgX2RyYXdhYmxlUmVzb3VyY2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVSZXNvdXJjZSk7XG5cbnZhciBfZHJhd2FibGVJbnZlbnRvcnkgPSByZXF1aXJlKCcuL2RyYXdhYmxlL2ludmVudG9yeScpO1xuXG52YXIgX2RyYXdhYmxlSW52ZW50b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYXdhYmxlSW52ZW50b3J5KTtcblxudmFyIF9lbnRpdHlJbnZlbnRvcnkgPSByZXF1aXJlKCcuL2VudGl0eS9pbnZlbnRvcnknKTtcblxudmFyIF9lbnRpdHlJbnZlbnRvcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW50aXR5SW52ZW50b3J5KTtcblxudmFyIF9lbnRpdHlQb3J0YWwgPSByZXF1aXJlKCcuL2VudGl0eS9wb3J0YWwnKTtcblxudmFyIF9lbnRpdHlQb3J0YWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW50aXR5UG9ydGFsKTtcblxudmFyIF9jYW1lcmEgPSByZXF1aXJlKCcuL2NhbWVyYScpO1xuXG52YXIgX2NhbWVyYTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jYW1lcmEpO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbi8qKlxyXG4gKiBUaGUgRW5naW5lIHByb3ZpZGVzIG5lYXJseSBhbGwgdGhlIG1lY2hhbmljcyBmb3IgYWN0dWFsbHkgZHJhd2luZyB0aGluZ3MgdG8gYSBjYW52YXMuXHJcbiAqXHJcbiAqIEFsc28gaW5jbHVkZXMgYSBmZXcgc2ltcGxlIGZ1bmN0aW9ucyBmb3IgZGVtb2luZyB2YXJpb3VzIGVudGl0aWVzL2RyYXdhYmxlcy4gIFRoaXNcclxuICogd2lsbCBwcm9iYWJseSBnbyBhd2F5IGluIGEgZnV0dXJlIHJlbGVhc2UuXHJcbiAqL1xuXG52YXIgRW5naW5lID0gKGZ1bmN0aW9uICgpIHtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGFuIGVuZ2luZSwgZ2l2ZW4gYSBjYW52YXMgdG8gcmVuZGVyIG9uIGFuZCBhIGxpc3Qgb2YgYXNzZXRzIHRvIHNlZWRcclxuICAgKiBpdHMgQXNzZXRNYW5hZ2VyIHdpdGguXHJcbiAgICogQHBhcmFtICB7SFRNTENhbnZhc30gY2FudmFzICAgICAgIEEgQ2FudmFzIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gIHtPYmplY3R9IGFzc2V0cyAgICAgICAgICAgQSBtYW5pZmVzdCB0byBwYXNzIHRvIHRoZSBpbnRlcm5hbCBBc3NldE1hbmFnZXJcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQHNlZSAgQXNzZXRNYW5hZ2VyXHJcbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gZW5hYmxlU25hcHNob3RzIElmIHNldCB0byB0cnVlLCB0aGUgY2FudmFzIHdpbGwgcHJlc2VydmUgaXRzIGRyYXdpbmdcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyLCB0byBhbGxvdyBmb3IgYWNjdXJhdGUgLnRvRGF0YVVSTCBjYWxscy5cclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhpcyB3aWxsIGhhdmUgYSBwZXJmb3JtYW5jZSBpbXBhY3QuXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gRW5naW5lKGNhbnZhcywgYXNzZXRzLCBlbmFibGVTbmFwc2hvdHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRW5naW5lKTtcblxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgIHZhciBvcHQgPSB7fTtcbiAgICBpZiAoZW5hYmxlU25hcHNob3RzKSB7XG4gICAgICBvcHQucHJlc2VydmVEcmF3aW5nQnVmZmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJywgb3B0KSB8fCBjYW52YXMuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJywgb3B0KTtcbiAgICBpZiAoIWdsKSB7XG4gICAgICB0aHJvdyAnQ291bGQgbm90IGluaXRpYWxpemUgd2ViZ2wnO1xuICAgIH1cbiAgICBnbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDEuMCk7XG4gICAgdGhpcy5nbCA9IGdsO1xuICAgIHRoaXMuY2FtZXJhID0gbmV3IF9jYW1lcmEyWydkZWZhdWx0J10oY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLmNhbWVyYS5zZXRQb3NpdGlvbihfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDAuMCwgMjAuMCwgMjUuMCkpLmxvb2tBdChfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDAuMCwgMTAuMCwgMC4wKSk7XG5cbiAgICAvLyB0aGlzIHNob3VsZCBiZSBpbiByYWRpYW5zLCBub3QgZGVncmVlcy5cbiAgICB0aGlzLmFzc2V0TWFuYWdlciA9IG5ldyBfYXNzZXRNYW5hZ2VyMlsnZGVmYXVsdCddKHRoaXMuZ2wsIGFzc2V0cyk7XG4gICAgdGhpcy5vYmplY3RSZW5kZXJlciA9IG5ldyBfcmVuZGVyZXJPYmplY3QyWydkZWZhdWx0J10odGhpcy5nbCwgdGhpcy5hc3NldE1hbmFnZXIpO1xuICAgIHRoaXMuc3RhcnQgPSB0aGlzLmxhc3QgPSBudWxsO1xuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5jbGVhcmVkID0gZmFsc2U7XG4gICAgdGhpcy5mcmFtZSA9IG51bGw7XG4gIH1cblxuICAvKipcclxuICAgKiBSZXNpemUgdGhlIGNhbnZhcyBhbmQgdmlld3BvcnQgdG8gbmV3IGRpbWVuc2lvbnNcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHdpZHRoICBXaWR0aCwgaW4gcGl4ZWxzXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSBoZWlnaHQgSGVpZ2gsIGluIHBpeGVsc1xyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKEVuZ2luZSwgW3tcbiAgICBrZXk6ICdyZXNpemUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgIHRoaXMuY2FtZXJhLnNldERpbWVuc2lvbnMod2lkdGgsIGhlaWdodCk7XG4gICAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgY3VycmVudCBkcmF3aW5nIHZpZXdwb3J0IHRvIHRoZSBjYW52YXMnIGN1cnJlbnQgZGltZW5zaW9uc1xyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAndXBkYXRlVmlldycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVZpZXcoKSB7XG4gICAgICB0aGlzLm9iamVjdFJlbmRlcmVyLnVwZGF0ZVZpZXcodGhpcy5jYW1lcmEpO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogU3RvcHMgdGhlIHJlbmRlciBsb29wLCBpZiBpdCdzIHJ1bm5pbmcuXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdzdG9wJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2xlYXJlZCA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMuZnJhbWUpIHtcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogQWRkcyBvbmUgb2YgZWFjaCBpbnZlbnRvcnkgaXRlbSwgYW5kIGEgcG9ydGFsLCB0byB0aGUgc2NlbmVcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ2RlbW9FbnRpdGllcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlbW9FbnRpdGllcygpIHtcbiAgICAgIHZhciB4ID0gLTUsXG4gICAgICAgICAgeSA9IDAsXG4gICAgICAgICAgeiA9IDQ7XG4gICAgICB2YXIgaSwgaXRlbTtcbiAgICAgIGZvciAoaSBpbiBfZW50aXR5SW52ZW50b3J5MlsnZGVmYXVsdCddKSB7XG4gICAgICAgIGl0ZW0gPSBuZXcgX2VudGl0eUludmVudG9yeTJbJ2RlZmF1bHQnXVtpXSh0aGlzKTtcbiAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICBpdGVtLnRyYW5zbGF0ZShfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKHgsIHksIHopKTtcbiAgICAgICAgICB4Kys7XG4gICAgICAgICAgaWYgKHggPiA1KSB7XG4gICAgICAgICAgICB4ID0gLTU7XG4gICAgICAgICAgICB6LS07XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKCdhZGRlZCAnICsgaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBwb3J0YWwgPSBuZXcgX2VudGl0eVBvcnRhbDJbJ2RlZmF1bHQnXSh0aGlzKTtcbiAgICAgIHBvcnRhbC50cmFuc2xhdGUoX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcyh4LCB5LCB6KSk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIG9uZSBvZiBlYWNoIGRyYXdhYmxlIHRvIHRoZSBzY2VuZVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnZGVtbycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlbW8oKSB7XG4gICAgICB2YXIgeCA9IC01LFxuICAgICAgICAgIHkgPSAwLFxuICAgICAgICAgIHogPSA0O1xuICAgICAgdmFyIGksIGl0ZW07XG4gICAgICBmb3IgKGkgaW4gX2RyYXdhYmxlSW52ZW50b3J5MlsnZGVmYXVsdCddKSB7XG4gICAgICAgIGl0ZW0gPSBuZXcgX2RyYXdhYmxlSW52ZW50b3J5MlsnZGVmYXVsdCddW2ldKCk7XG4gICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgX2dsTWF0cml4Lm1hdDQudHJhbnNsYXRlKGl0ZW0ud29ybGQsIGl0ZW0ud29ybGQsIF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoeCwgeSwgeikpO1xuICAgICAgICAgIHgrKztcbiAgICAgICAgICBpZiAoeCA+IDUpIHtcbiAgICAgICAgICAgIHggPSAtNTtcbiAgICAgICAgICAgIHotLTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5vYmplY3RSZW5kZXJlci5hZGREcmF3YWJsZShpdGVtKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnYWRkZWQgJyArIGkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoaSBpbiBfZHJhd2FibGVSZXNvdXJjZTJbJ2RlZmF1bHQnXSkge1xuICAgICAgICBpdGVtID0gbmV3IF9kcmF3YWJsZVJlc291cmNlMlsnZGVmYXVsdCddW2ldKCk7XG4gICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgX2dsTWF0cml4Lm1hdDQudHJhbnNsYXRlKGl0ZW0ud29ybGQsIGl0ZW0ud29ybGQsIF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoeCwgeSwgeikpO1xuICAgICAgICAgIHgrKztcbiAgICAgICAgICBpZiAoeCA+IDUpIHtcbiAgICAgICAgICAgIHggPSAtNTtcbiAgICAgICAgICAgIHotLTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5vYmplY3RSZW5kZXJlci5hZGREcmF3YWJsZShpdGVtKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnYWRkZWQgJyArIGkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoaSBpbiBfZHJhd2FibGVXb3JsZDJbJ2RlZmF1bHQnXSkge1xuICAgICAgICBpdGVtID0gbmV3IF9kcmF3YWJsZVdvcmxkMlsnZGVmYXVsdCddW2ldKCk7XG4gICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgX2dsTWF0cml4Lm1hdDQudHJhbnNsYXRlKGl0ZW0ud29ybGQsIGl0ZW0ud29ybGQsIF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoeCwgeSwgeikpO1xuICAgICAgICAgIHgrKztcbiAgICAgICAgICBpZiAoeCA+IDUpIHtcbiAgICAgICAgICAgIHggPSAtNTtcbiAgICAgICAgICAgIHotLTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5vYmplY3RSZW5kZXJlci5hZGREcmF3YWJsZShpdGVtKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnYWRkZWQgJyArIGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGEgc2luZ2xlIGZyYW1lLCB3aXRoIGEgc3BlY2lmaWVkIHRpbWUgc2luY2UgbGFzdCBkcmF3XHJcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGRlbHRhIFRpbWUgc2luY2UgbGFzdCByZW5kZXJcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ2RyYXcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3KGRlbHRhKSB7XG4gICAgICB2YXIgZ2wgPSB0aGlzLmdsO1xuICAgICAgLy8gZGVmYXVsdCBzZXR1cCBzdHVmZjpcbiAgICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQgfCBnbC5ERVBUSF9CVUZGRVJfQklUKTtcbiAgICAgICgwLCBfdXRpbHMucmVzZXRHTCkoZ2wpO1xuICAgICAgLy9nbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgICAgLy9nbC5kZXB0aE1hc2soZmFsc2UpO1xuXG4gICAgICAvLyByZW5kZXIgcGFzc2VzOlxuICAgICAgdGhpcy5vYmplY3RSZW5kZXJlci5yZW5kZXIoKTtcblxuICAgICAgLy8gcnVuIGFuaW1hdGlvbnNcbiAgICAgIHRoaXMub2JqZWN0UmVuZGVyZXIudXBkYXRlVGltZShkZWx0YSk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCB0aGUgcmVuZGVyIGxvb3AuXHJcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRpY2sgVGltZSBzaW5jZSBsYXN0IHRpY2sgKG9wdGlvbmFsKVxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKHRpY2spIHtcbiAgICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgICB0aGlzLmNsZWFyZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgZGVsdGEgPSAwO1xuICAgICAgaWYgKCF0aGlzLnN0YXJ0KSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSB0aWNrO1xuICAgICAgICB0aGlzLmxhc3QgPSB0aWNrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsdGEgPSB0aWNrIC0gdGhpcy5sYXN0O1xuICAgICAgICB0aGlzLmxhc3QgPSB0aWNrO1xuICAgICAgfVxuICAgICAgdGhpcy5kcmF3KGRlbHRhKTtcbiAgICAgIC8vIHF1ZXVlIHVwIG5leHQgZnJhbWU6XG4gICAgICB0aGlzLmZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFByZWxvYWRzIGFsbCBhc3NldHNcclxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayB0byBpbnZva2Ugb24gY29tcGxldGlvblxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAncHJlbG9hZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByZWxvYWQoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuYXNzZXRNYW5hZ2VyLmxvYWRBbGwoY2FsbGJhY2spO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBFbmdpbmU7XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBFbmdpbmU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG4vLyBUT0RPOiBEZXByZWNhdGVcblxudmFyIEVudGl0eSA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEVudGl0eShlbmdpbmUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRW50aXR5KTtcblxuICAgIHRoaXMuZHJhd2FibGVzID0ge307XG4gICAgdGhpcy50cmFuc2Zvcm0gPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICB0aGlzLmVuZ2luZSA9IGVuZ2luZTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhFbnRpdHksIFt7XG4gICAga2V5OiAnYWRkRHJhd2FibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGREcmF3YWJsZShuYW1lLCBkcmF3YWJsZSkge1xuICAgICAgLy8gYWRkIGRpc3Bvc2UgaWYgdGhpcyBhbHJlYWR5IGV4aXN0cy5cbiAgICAgIHRoaXMucmVtb3ZlRHJhd2FibGUobmFtZSk7XG4gICAgICB0aGlzLmRyYXdhYmxlc1tuYW1lXSA9IGRyYXdhYmxlO1xuICAgICAgdGhpcy5lbmdpbmUub2JqZWN0UmVuZGVyZXIuYWRkRHJhd2FibGUoZHJhd2FibGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbW92ZURyYXdhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlRHJhd2FibGUobmFtZSwgZGVzdHJveSkge1xuICAgICAgLy8gZGlzcG9zZSBzdHVmZnMuXG4gICAgICBpZiAodGhpcy5kcmF3YWJsZXNbbmFtZV0pIHtcbiAgICAgICAgdGhpcy5lbmdpbmUub2JqZWN0UmVuZGVyZXIucmVtb3ZlRHJhd2FibGUodGhpcy5kcmF3YWJsZXNbbmFtZV0sIGRlc3Ryb3kpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2FwcGx5VHJhbnNmb3JtJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXBwbHlUcmFuc2Zvcm0oKSB7XG4gICAgICBmb3IgKHZhciBpIGluIHRoaXMuZHJhd2FibGVzKSB7XG4gICAgICAgIHRoaXMuZHJhd2FibGVzW2ldLnNldE1hdHJpeCh0aGlzLnRyYW5zZm9ybSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndHJhbnNsYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJhbnNsYXRlKHZlYykge1xuICAgICAgX2dsTWF0cml4Lm1hdDQudHJhbnNsYXRlKHRoaXMudHJhbnNmb3JtLCB0aGlzLnRyYW5zZm9ybSwgdmVjKTtcbiAgICAgIHRoaXMuYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyb3RhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByb3RhdGUocXVhdCkge1xuICAgICAgdmFyIHJvdGF0ZSA9IF9nbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpO1xuICAgICAgX2dsTWF0cml4Lm1hdDQuZnJvbVF1YXQocm90YXRlLCBxdWF0KTtcbiAgICAgIF9nbE1hdHJpeC5tYXQ0Lm11bHRpcGx5KHRoaXMudHJhbnNmb3JtLCB0aGlzLnRyYW5zZm9ybSwgcm90YXRlKTtcbiAgICAgIHRoaXMuYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzZXRBbmltYXRpb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRBbmltYXRpb24oYW5pbWF0ZSkge1xuICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLmRyYXdhYmxlcykge1xuICAgICAgICB0aGlzLmRyYXdhYmxlc1tpXS5vblVwZGF0ZSA9IGFuaW1hdGU7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEVudGl0eTtcbn0pKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEVudGl0eTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZXhwb3J0cy5jcmVhdGVJdGVtRW50aXR5ID0gY3JlYXRlSXRlbUVudGl0eTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9jb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKTtcblxudmFyIF9jb25zdGFudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uc3RhbnRzKTtcblxudmFyIF9lbnRpdHkgPSByZXF1aXJlKCcuLi9lbnRpdHknKTtcblxudmFyIF9lbnRpdHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW50aXR5KTtcblxudmFyIF9kcmF3YWJsZUludmVudG9yeSA9IHJlcXVpcmUoJy4uL2RyYXdhYmxlL2ludmVudG9yeScpO1xuXG52YXIgX2RyYXdhYmxlSW52ZW50b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYXdhYmxlSW52ZW50b3J5KTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG4vLyBUT0RPOiBEZXByZWNhdGUgaW4gZmF2b3Igb2YgYSBwcm9wZXIgc2NlbmUgZ3JhcGhcbnZhciBJbnZlbnRvcnlJdGVtcyA9IHt9O1xuXG52YXIgc2ltcGxlID0ge1xuICBYbXA6ICdMOCcsXG4gIFVsdHJhc3RyaWtlOiAnTDgnLFxuICBSZXNTaGllbGQ6ICdWRVJZX1JBUkUnLFxuICBQb3dlckN1YmU6ICdMOCcsXG4gIExpbmtBbXA6ICdFWFRSRU1FTFlfUkFSRScsXG4gIEhlYXRTaW5rOiAnVkVSWV9SQVJFJyxcbiAgTXVsdGlIYWNrOiAnVkVSWV9SQVJFJyxcbiAgRm9yY2VBbXA6ICdSQVJFJyxcbiAgVHVycmV0OiAnUkFSRScsXG4gIFJlc29uYXRvcjogJ0w4JyxcbiAgQ2Fwc3VsZTogJ1JBUkUnXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVJdGVtRW50aXR5KG5hbWUsIGNvbG9yKSB7XG4gIHZhciBlbnRpdHliYXNlID0gKGZ1bmN0aW9uIChfRW50aXR5KSB7XG4gICAgX2luaGVyaXRzKGVudGl0eWJhc2UsIF9FbnRpdHkpO1xuXG4gICAgZnVuY3Rpb24gZW50aXR5YmFzZShlbmdpbmUpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBlbnRpdHliYXNlKTtcblxuICAgICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoZW50aXR5YmFzZS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGVuZ2luZSk7XG4gICAgICB0aGlzLmFkZERyYXdhYmxlKG5hbWUsIG5ldyBfZHJhd2FibGVJbnZlbnRvcnkyWydkZWZhdWx0J11bbmFtZV0oKSk7XG4gICAgICB0aGlzLmFkZERyYXdhYmxlKG5hbWUgKyAnWG0nLCBuZXcgX2RyYXdhYmxlSW52ZW50b3J5MlsnZGVmYXVsdCddW25hbWUgKyAnWG0nXSgpKTtcbiAgICAgIHRoaXMuZHJhd2FibGVzW25hbWVdLnVuaWZvcm1zLnVfY29sb3IwID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoY29sb3IpO1xuICAgIH1cblxuICAgIHJldHVybiBlbnRpdHliYXNlO1xuICB9KShfZW50aXR5MlsnZGVmYXVsdCddKTtcblxuICByZXR1cm4gZW50aXR5YmFzZTtcbn1cblxuZm9yICh2YXIgaSBpbiBzaW1wbGUpIHtcbiAgSW52ZW50b3J5SXRlbXNbaV0gPSBjcmVhdGVJdGVtRW50aXR5KGksIF9jb25zdGFudHMyWydkZWZhdWx0J10ucXVhbGl0eUNvbG9yc1tzaW1wbGVbaV1dKTtcbn1cblxudmFyIEZsaXBDYXJkQWRhID0gKGZ1bmN0aW9uIChfRW50aXR5Mikge1xuICBfaW5oZXJpdHMoRmxpcENhcmRBZGEsIF9FbnRpdHkyKTtcblxuICBmdW5jdGlvbiBGbGlwQ2FyZEFkYShlbmdpbmUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmxpcENhcmRBZGEpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoRmxpcENhcmRBZGEucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBlbmdpbmUpO1xuICAgIHRoaXMuYWRkRHJhd2FibGUoJ0ZsaXBDYXJkQWRhJywgbmV3IF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXS5GbGlwQ2FyZEFkYSgpKTtcbiAgICB0aGlzLmFkZERyYXdhYmxlKCdGbGlwQ2FyZFhtJywgbmV3IF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXS5GbGlwQ2FyZFhtKCkpO1xuICAgIHRoaXMuZHJhd2FibGVzLkZsaXBDYXJkWG0udW5pZm9ybXMudV90ZWFtQ29sb3IgPSBfZ2xNYXRyaXgudmVjNC5jbG9uZShfY29uc3RhbnRzMlsnZGVmYXVsdCddLnRlYW1Db2xvcnMuUkVTSVNUQU5DRSk7XG4gICAgdGhpcy5kcmF3YWJsZXMuRmxpcENhcmRBZGEudW5pZm9ybXMudV9jb2xvcjEgPSBfZ2xNYXRyaXgudmVjNC5jbG9uZShfY29uc3RhbnRzMlsnZGVmYXVsdCddLnRlYW1Db2xvcnMuUkVTSVNUQU5DRSk7XG4gICAgdGhpcy5kcmF3YWJsZXMuRmxpcENhcmRBZGEudW5pZm9ybXMudV9jb2xvcjAgPSBfZ2xNYXRyaXgudmVjNC5jbG9uZShfY29uc3RhbnRzMlsnZGVmYXVsdCddLnF1YWxpdHlDb2xvcnMuVkVSWV9SQVJFKTtcbiAgfVxuXG4gIHJldHVybiBGbGlwQ2FyZEFkYTtcbn0pKF9lbnRpdHkyWydkZWZhdWx0J10pO1xuXG5JbnZlbnRvcnlJdGVtcy5GbGlwQ2FyZEFkYSA9IEZsaXBDYXJkQWRhO1xuXG52YXIgRmxpcENhcmRKYXJ2aXMgPSAoZnVuY3Rpb24gKF9FbnRpdHkzKSB7XG4gIF9pbmhlcml0cyhGbGlwQ2FyZEphcnZpcywgX0VudGl0eTMpO1xuXG4gIGZ1bmN0aW9uIEZsaXBDYXJkSmFydmlzKGVuZ2luZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGbGlwQ2FyZEphcnZpcyk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihGbGlwQ2FyZEphcnZpcy5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGVuZ2luZSk7XG4gICAgdGhpcy5hZGREcmF3YWJsZSgnRmxpcENhcmRKYXJ2aXMnLCBuZXcgX2RyYXdhYmxlSW52ZW50b3J5MlsnZGVmYXVsdCddLkZsaXBDYXJkSmFydmlzKCkpO1xuICAgIHRoaXMuYWRkRHJhd2FibGUoJ0ZsaXBDYXJkWG0nLCBuZXcgX2RyYXdhYmxlSW52ZW50b3J5MlsnZGVmYXVsdCddLkZsaXBDYXJkWG0oKSk7XG4gICAgdGhpcy5kcmF3YWJsZXMuRmxpcENhcmRYbS51bmlmb3Jtcy51X3RlYW1Db2xvciA9IF9nbE1hdHJpeC52ZWM0LmNsb25lKF9jb25zdGFudHMyWydkZWZhdWx0J10udGVhbUNvbG9ycy5FTkxJR0hURU5FRCk7XG4gICAgdGhpcy5kcmF3YWJsZXMuRmxpcENhcmRKYXJ2aXMudW5pZm9ybXMudV9jb2xvcjEgPSBfZ2xNYXRyaXgudmVjNC5jbG9uZShfY29uc3RhbnRzMlsnZGVmYXVsdCddLnRlYW1Db2xvcnMuRU5MSUdIVEVORUQpO1xuICAgIHRoaXMuZHJhd2FibGVzLkZsaXBDYXJkSmFydmlzLnVuaWZvcm1zLnVfY29sb3IwID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5xdWFsaXR5Q29sb3JzLlZFUllfUkFSRSk7XG4gIH1cblxuICByZXR1cm4gRmxpcENhcmRKYXJ2aXM7XG59KShfZW50aXR5MlsnZGVmYXVsdCddKTtcblxuSW52ZW50b3J5SXRlbXMuRmxpcENhcmRKYXJ2aXMgPSBGbGlwQ2FyZEphcnZpcztcblxudmFyIEV4dHJhU2hpZWxkID0gKGZ1bmN0aW9uIChfRW50aXR5NCkge1xuICBfaW5oZXJpdHMoRXh0cmFTaGllbGQsIF9FbnRpdHk0KTtcblxuICBmdW5jdGlvbiBFeHRyYVNoaWVsZChlbmdpbmUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXh0cmFTaGllbGQpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoRXh0cmFTaGllbGQucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBlbmdpbmUpO1xuICAgIHRoaXMuYWRkRHJhd2FibGUoJ0V4dHJhU2hpZWxkJywgbmV3IF9kcmF3YWJsZUludmVudG9yeTJbJ2RlZmF1bHQnXS5FeHRyYVNoaWVsZCgpKTtcbiAgICB0aGlzLmFkZERyYXdhYmxlKCdSZXNTaGllbGRYbScsIG5ldyBfZHJhd2FibGVJbnZlbnRvcnkyWydkZWZhdWx0J10uUmVzU2hpZWxkWG0oKSk7XG4gICAgdGhpcy5kcmF3YWJsZXMuRXh0cmFTaGllbGQudW5pZm9ybXMudV9jb2xvcjAgPSBfZ2xNYXRyaXgudmVjNC5jbG9uZShfY29uc3RhbnRzMlsnZGVmYXVsdCddLnF1YWxpdHlDb2xvcnMuVkVSWV9SQVJFKTtcbiAgfVxuXG4gIHJldHVybiBFeHRyYVNoaWVsZDtcbn0pKF9lbnRpdHkyWydkZWZhdWx0J10pO1xuXG5JbnZlbnRvcnlJdGVtcy5FeHRyYVNoaWVsZCA9IEV4dHJhU2hpZWxkO1xuXG52YXIgSW50ZXJlc3RDYXBzdWxlID0gKGZ1bmN0aW9uIChfRW50aXR5NSkge1xuICBfaW5oZXJpdHMoSW50ZXJlc3RDYXBzdWxlLCBfRW50aXR5NSk7XG5cbiAgZnVuY3Rpb24gSW50ZXJlc3RDYXBzdWxlKGVuZ2luZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBJbnRlcmVzdENhcHN1bGUpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoSW50ZXJlc3RDYXBzdWxlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZW5naW5lKTtcbiAgICB0aGlzLmFkZERyYXdhYmxlKCdJbnRlcmVzdENhcHN1bGUnLCBuZXcgX2RyYXdhYmxlSW52ZW50b3J5MlsnZGVmYXVsdCddLkludGVyZXN0Q2Fwc3VsZSgpKTtcbiAgICB0aGlzLmFkZERyYXdhYmxlKCdDYXBzdWxlWG0nLCBuZXcgX2RyYXdhYmxlSW52ZW50b3J5MlsnZGVmYXVsdCddLkNhcHN1bGVYbSgpKTtcbiAgICB0aGlzLmRyYXdhYmxlcy5JbnRlcmVzdENhcHN1bGUudW5pZm9ybXMudV9jb2xvcjAgPSBfZ2xNYXRyaXgudmVjNC5jbG9uZShfY29uc3RhbnRzMlsnZGVmYXVsdCddLnF1YWxpdHlDb2xvcnMuVkVSWV9SQVJFKTtcbiAgfVxuXG4gIHJldHVybiBJbnRlcmVzdENhcHN1bGU7XG59KShfZW50aXR5MlsnZGVmYXVsdCddKTtcblxuSW52ZW50b3J5SXRlbXMuSW50ZXJlc3RDYXBzdWxlID0gSW50ZXJlc3RDYXBzdWxlO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBJbnZlbnRvcnlJdGVtczsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzJyk7XG5cbnZhciBfY29uc3RhbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnN0YW50cyk7XG5cbnZhciBfZW50aXR5ID0gcmVxdWlyZSgnLi4vZW50aXR5Jyk7XG5cbnZhciBfZW50aXR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2VudGl0eSk7XG5cbnZhciBfZHJhd2FibGVXb3JsZCA9IHJlcXVpcmUoJy4uL2RyYXdhYmxlL3dvcmxkJyk7XG5cbnZhciBfZHJhd2FibGVXb3JsZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZVdvcmxkKTtcblxudmFyIF9kcmF3YWJsZVJlc29uYXRvckxpbmsgPSByZXF1aXJlKCcuLi9kcmF3YWJsZS9yZXNvbmF0b3ItbGluaycpO1xuXG52YXIgX2RyYXdhYmxlUmVzb25hdG9yTGluazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZVJlc29uYXRvckxpbmspO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbi8vIFRPRE86IERlcHJlY2F0ZSBpbiBmYXZvciBvZiBhIHByb3BlciBzY2VuZSBncmFwaFxuXG52YXIgUG9ydGFsRW50aXR5ID0gKGZ1bmN0aW9uIChfRW50aXR5KSB7XG4gIF9pbmhlcml0cyhQb3J0YWxFbnRpdHksIF9FbnRpdHkpO1xuXG4gIGZ1bmN0aW9uIFBvcnRhbEVudGl0eShlbmdpbmUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUG9ydGFsRW50aXR5KTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFBvcnRhbEVudGl0eS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGVuZ2luZSk7XG4gICAgdGhpcy5hZGREcmF3YWJsZSgnUG9ydGFsJywgbmV3IF9kcmF3YWJsZVdvcmxkMlsnZGVmYXVsdCddLlBvcnRhbCgpKTtcbiAgICAvLyB3aHkgNj8gSSBkdW5ubywgYXNrIE5pYW50aWNcbiAgICBfZ2xNYXRyaXgubWF0NC5zY2FsZSh0aGlzLmRyYXdhYmxlcy5Qb3J0YWwubG9jYWwsIHRoaXMuZHJhd2FibGVzLlBvcnRhbC5sb2NhbCwgX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcyg2LCA2LCA2KSk7XG4gICAgdGhpcy5zZXRDb2xvcihfZ2xNYXRyaXgudmVjNC5jbG9uZShfY29uc3RhbnRzMlsnZGVmYXVsdCddLnRlYW1Db2xvcnMuTE9LSSkpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFBvcnRhbEVudGl0eSwgW3tcbiAgICBrZXk6ICdzZXRDb2xvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldENvbG9yKGNvbG9yKSB7XG4gICAgICB0aGlzLmNvbG9yID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoY29sb3IpO1xuICAgICAgdGhpcy5kcmF3YWJsZXMuUG9ydGFsLnVuaWZvcm1zLnVfYmFzZUNvbG9yID0gdGhpcy5jb2xvcjtcbiAgICAgIGlmICh0aGlzLmRyYXdhYmxlcy5TaGllbGQpIHtcbiAgICAgICAgdGhpcy5kcmF3YWJsZXMuU2hpZWxkLnVuaWZvcm1zLnVfY29sb3IgPSB0aGlzLmNvbG9yO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZHJhd2FibGVzLkFydGlmYWN0c0dyZWVuR2xvdykge1xuICAgICAgICB0aGlzLmRyYXdhYmxlcy5BcnRpZmFjdHNHcmVlbkdsb3cudV9iYXNlQ29sb3IgPSB0aGlzLmNvbG9yO1xuICAgICAgfVxuICAgICAgLypmb3IodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5fcmVkcmF3TGluayhpKTtzZFxyXG4gICAgICB9Ki9cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdhZGRSZXNvbmF0b3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRSZXNvbmF0b3IobGV2ZWwsIHNsb3QsIHJhbmdlLCBwZXJjZW50KSB7XG4gICAgICBpZiAocGVyY2VudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBlcmNlbnQgPSAxLjA7XG4gICAgICB9XG4gICAgICBpZiAoK3Nsb3QgPCAwIHx8ICtzbG90ID4gOCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Nsb3Qgb3V0IG9mIGJvdW5kcyBmb3IgcmVzb25hdG9yJyk7XG4gICAgICB9XG4gICAgICBpZiAoIShsZXZlbCBpbiBfY29uc3RhbnRzMlsnZGVmYXVsdCddLnF1YWxpdHlDb2xvcnMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbGV2ZWwgbXVzdCBiZSBvbmUgb2YgJyArIE9iamVjdC5rZXlzKF9jb25zdGFudHMyWydkZWZhdWx0J10ucXVhbGl0eUNvbG9ycykuam9pbignICcpKTtcbiAgICAgIH1cbiAgICAgIHJhbmdlID0gcmFuZ2UgPT09IHVuZGVmaW5lZCA/IDQwIDogcmFuZ2U7XG4gICAgICB2YXIgcmVzb25hdG9yTmFtZSA9ICdSZXNvbmF0b3InICsgK3Nsb3Q7XG4gICAgICB2YXIgbGlua05hbWUgPSAnTGluaycgKyArc2xvdDtcbiAgICAgIHZhciB0aGV0YSA9IHNsb3QgLyA4ICogMiAqIE1hdGguUEk7XG4gICAgICB2YXIgcmVzb25hdG9yID0gbmV3IF9kcmF3YWJsZVdvcmxkMlsnZGVmYXVsdCddLlJlc29uYXRvcigpO1xuICAgICAgdmFyIHggPSByYW5nZSAqIE1hdGguY29zKHRoZXRhKTtcbiAgICAgIHZhciB5ID0gcmFuZ2UgKiBNYXRoLnNpbih0aGV0YSk7XG4gICAgICB2YXIgbGluayA9IG5ldyBfZHJhd2FibGVSZXNvbmF0b3JMaW5rMlsnZGVmYXVsdCddKFswLCAwXSwgc2xvdCwgcmFuZ2UsIF9nbE1hdHJpeC52ZWM0LmNsb25lKHRoaXMuY29sb3IpLCAxLjApO1xuICAgICAgcmVzb25hdG9yLnVuaWZvcm1zLnVfY29sb3IwID0gX2dsTWF0cml4LnZlYzQuY2xvbmUoX2NvbnN0YW50czJbJ2RlZmF1bHQnXS5xdWFsaXR5Q29sb3JzW2xldmVsXSk7XG4gICAgICByZXNvbmF0b3IubG9jYWwgPSBfZ2xNYXRyaXgubWF0NC5jbG9uZSh0aGlzLmRyYXdhYmxlcy5Qb3J0YWwubG9jYWwpO1xuICAgICAgLy9saW5rLmxvY2FsID0gbWF0NC5jbG9uZSh0aGlzLmRyYXdhYmxlcy5Qb3J0YWwubG9jYWwpO1xuICAgICAgX2dsTWF0cml4Lm1hdDQudHJhbnNsYXRlKHJlc29uYXRvci5sb2NhbCwgcmVzb25hdG9yLmxvY2FsLCBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKHggLyA2LCAwLCB5IC8gNikpO1xuICAgICAgcmVzb25hdG9yLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgbGluay51cGRhdGVNYXRyaXgoKTtcbiAgICAgIC8vIGtlZXAgdGhlIHBvcnRhbCBzb3J0ZWQgbGFzdCAodGhpcyBpcyBhIHRlcnJpYmxlIHdheSBvZiBkb2luZyB0aGlzLilcbiAgICAgIHRoaXMuYWRkRHJhd2FibGUobGlua05hbWUsIGxpbmspO1xuICAgICAgdGhpcy5hZGREcmF3YWJsZShyZXNvbmF0b3JOYW1lLCByZXNvbmF0b3IpO1xuICAgICAgdGhpcy5hZGREcmF3YWJsZSgnUG9ydGFsJywgdGhpcy5kcmF3YWJsZXMuUG9ydGFsKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW1vdmVSZXNvbmF0b3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVSZXNvbmF0b3Ioc2xvdCkge1xuICAgICAgaWYgKCtzbG90IDwgMCB8fCArc2xvdCA+IDgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzbG90IG91dCBvZiBib3VuZHMgZm9yIHJlc29uYXRvcicpO1xuICAgICAgfVxuICAgICAgdmFyIG5hbWUgPSAnUmVzb25hdG9yJyArICtzbG90O1xuICAgICAgdmFyIHJlc29uYXRvciA9IHRoaXMuZHJhd2FibGVzW25hbWVdIHx8IG51bGw7XG4gICAgICBpZiAocmVzb25hdG9yKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRHJhd2FibGUobmFtZSk7XG4gICAgICAgIHRoaXMuX3JlbW92ZVJlc29uYXRvckxpbmsoc2xvdCk7XG4gICAgICAgIHRoaXMuYWRkRHJhd2FibGUoJ1BvcnRhbCcsIHRoaXMuZHJhd2FibGVzLlBvcnRhbCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnYWRkU2hpZWxkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkU2hpZWxkKCkge1xuICAgICAgaWYgKCEoJ1NoaWVsZCcgaW4gdGhpcy5kcmF3YWJsZXMpKSB7XG4gICAgICAgIHRoaXMuYWRkRHJhd2FibGUoJ1NoaWVsZCcsIG5ldyBfZHJhd2FibGVXb3JsZDJbJ2RlZmF1bHQnXS5TaGllbGQoKSk7XG4gICAgICAgIC8vIHdoeSAxMj8gSSBkb24ndCBrbm93LlxuICAgICAgICBfZ2xNYXRyaXgubWF0NC5zY2FsZSh0aGlzLmRyYXdhYmxlcy5TaGllbGQubG9jYWwsIHRoaXMuZHJhd2FibGVzLlNoaWVsZC5sb2NhbCwgX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygxMiwgMTIsIDEyKSk7XG4gICAgICAgIHRoaXMuZHJhd2FibGVzLlNoaWVsZC51cGRhdGVNYXRyaXgoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd2FibGVzLlNoaWVsZC51bmlmb3Jtcy51X2NvbG9yID0gdGhpcy5jb2xvcjtcbiAgICAgIHRoaXMuYXBwbHlUcmFuc2Zvcm0oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdhZGRBcnRpZmFjdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEFydGlmYWN0KGFydGlmYWN0LCBuYW1lKSB7XG4gICAgICB2YXIgcm90YXRlID0gZnVuY3Rpb24gcm90YXRlKGRlbHRhIC8qLCBlbGFwc2VkKi8pIHtcbiAgICAgICAgX2dsTWF0cml4Lm1hdDQucm90YXRlWSh0aGlzLm1vZGVsLCB0aGlzLm1vZGVsLCBkZWx0YSAvIDEwMDApO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgICBpZiAoIShuYW1lIGluIHRoaXMuZHJhd2FibGVzKSkge1xuICAgICAgICB0aGlzLmFkZERyYXdhYmxlKG5hbWUsIGFydGlmYWN0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZHJhd2FibGVzW25hbWVdLm9uVXBkYXRlID0gcm90YXRlO1xuICAgICAgdGhpcy5hcHBseVRyYW5zZm9ybSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2FkZEdsb3dNYXJrZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRHbG93TWFya2VyKG5hbWUsIGNvbG9yKSB7XG4gICAgICB2YXIgbiA9ICdBcnRpZmFjdHMnICsgbmFtZSArICdHbG93JztcbiAgICAgIGlmICghKG4gaW4gdGhpcy5kcmF3YWJsZXMpKSB7XG4gICAgICAgIHRoaXMuYWRkRHJhd2FibGUobiwgbmV3IF9kcmF3YWJsZVdvcmxkMlsnZGVmYXVsdCddW25dKCkpO1xuICAgICAgfVxuICAgICAgdGhpcy5kcmF3YWJsZXNbbl0udW5pZm9ybXMudV9iYXNlQ29sb3IgPSBfZ2xNYXRyaXgudmVjNC5jbG9uZShjb2xvcik7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFBvcnRhbEVudGl0eTtcbn0pKF9lbnRpdHkyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBQb3J0YWxFbnRpdHk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIvKipcclxuICogQmFzZSBjbGFzcyBmb3IgYWxsIHRoaW5ncyBib3VuZCB0byBhIGdsIGNvbnRleHQuXHJcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBHTEJvdW5kID1cblxuLyoqXHJcbiAqIEJpbmRzIHRvIGEgZ2wgY29udGV4dFxyXG4gKiBAcGFyYW0gIHtjb250ZXh0fSBnbCAgQSB3ZWJnbCBjb250ZXh0XHJcbiAqL1xuZnVuY3Rpb24gR0xCb3VuZChnbCkge1xuICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgR0xCb3VuZCk7XG5cbiAgdGhpcy5fZ2wgPSBnbDtcbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gR0xCb3VuZDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2dsQnVmZmVyID0gcmVxdWlyZSgnLi9nbC1idWZmZXInKTtcblxudmFyIF9nbEJ1ZmZlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbEJ1ZmZlcik7XG5cbi8qKlxyXG4gKiBBIEdMQXR0cmlidXRlIGlzIGEgR0xCdWZmZXIgdGhhdCByZXByZXNlbnRzIHZlcnRleCBhdHRyaWJ1dGVzXHJcbiAqXHJcbiAqIEBleHRlbmRzIHtHTEJ1ZmZlcn1cclxuICovXG5cbnZhciBHTEF0dHJpYnV0ZSA9IChmdW5jdGlvbiAoX0dMQnVmZmVyKSB7XG4gIF9pbmhlcml0cyhHTEF0dHJpYnV0ZSwgX0dMQnVmZmVyKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSB2ZXJ0ZXggYXR0cmlidXRlIGJ1ZmZlclxyXG4gICAqXHJcbiAgICogQGNoYWluYWJsZVxyXG4gICAqIEBwYXJhbSAge2NvbnRleHR9IGdsICAgICAgICAgICAgIFdlYkdMQ29udGV4dFxyXG4gICAqIEBwYXJhbSAge0FycmF5fSBhdHRyaWJ1dGVzICAgICAgIEFuIGFycmF5IG9mIFZlcnRleEF0dHJpYnV0ZXNcclxuICAgKiBAcGFyYW0gIHtBcnJheUJ1ZmZlcn0gdmFsdWVzICAgICBWYWx1ZXMgdG8gZmlsbCB0aGUgYnVmZmVyIHdpdGhcclxuICAgKiBAcGFyYW0gIHtlbnVtfSB1c2FnZSAgICAgICAgICAgICBVc2FnZSBAc2VlIGh0dHBzOi8vd3d3Lmtocm9ub3Mub3JnL3JlZ2lzdHJ5L3dlYmdsL3NwZWNzLzEuMC8jNS4xNC41XHJcbiAgICogQHJldHVybiB7dGhpc31cclxuICAgKi9cblxuICBmdW5jdGlvbiBHTEF0dHJpYnV0ZShnbCwgYXR0cmlidXRlcywgdmFsdWVzLCB1c2FnZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBHTEF0dHJpYnV0ZSk7XG5cbiAgICB1c2FnZSA9IHVzYWdlIHx8IGdsLlNUQVRJQ19EUkFXO1xuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEdMQXR0cmlidXRlLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZ2wsIGdsLkFSUkFZX0JVRkZFUiwgdXNhZ2UpO1xuICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG4gICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgdGhpcy5zaXplID0gdGhpcy5jb3VudCA9IG51bGw7XG4gICAgdGhpcy5fdmFsaWRhdGUgPSBmYWxzZTtcbiAgICB0aGlzLnNpemUgPSAwO1xuICAgIHRoaXMud2lkdGggPSAwO1xuICAgIGZvciAodmFyIGkgPSAwLCBhOyBpIDwgdGhpcy5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhID0gdGhpcy5hdHRyaWJ1dGVzW2ldO1xuICAgICAgdGhpcy5zaXplICs9IDQgKiBhLnNpemU7IC8vIDQgYmVjYXVzZSBmbG9hdCBpcyA0IGJ5dGVzLlxuICAgICAgdGhpcy53aWR0aCArPSBhLnNpemU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXHJcbiAgICogQ29uZmlybXMgdGhhdCB0aGUgdW5kZXJseWluZyBidWZmZXIncyBsZW5ndGggaXMgYW4gZXZlbiBtdWx0aXBsZVxyXG4gICAqIG9mIHRvdGFsIHNpemUgb2YgdGhlIGF0dHJpYnV0ZXMgZm9yIHRoZSBidWZmZXJcclxuICAgKlxyXG4gICAqIElzc3VlcyBhIHdhcm5pbmcgaWYgbm90LlxyXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhHTEF0dHJpYnV0ZSwgW3tcbiAgICBrZXk6ICd2YWxpZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbGlkYXRlKCkge1xuICAgICAgaWYgKHRoaXMuX3ZhbGlkYXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlcy5sZW5ndGggJSB0aGlzLndpZHRoICE9PSAwKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCd2YWx1ZXMgYXJyYXkgbGVuZ3RoIGlzIG5vdCBhbiBldmVuIG11bHRpcGxlIG9mIHRoZSB0b3RhbCBzaXplIG9mIHRoZSBhdHRyaWJ1dGVzJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSB0aGUgdmFsdWVzIGluIHRoZSBidWZmZXIgYW5kIHB1c2hlcyB0aGUgYnVmZmVyIHRvIHRoZSBncHVcclxuICAgICAqXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKiBAcGFyYW0gIHtBcnJheUJ1ZmZlcn0gdmFsdWVzIE5ldyB2YWx1ZXMgdG8gd3JpdGUgdG8gdGhlIGJ1ZmZlclxyXG4gICAgICogQHJldHVybiB7dGhpc31cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAndXBkYXRlVmFsdWVzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVmFsdWVzKHZhbHVlcykge1xuICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICB0aGlzLnZhbGlkYXRlKCk7XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEdpdmVuIGEgc2V0IG9mIHByb2dyYW0gbG9jYXRpb25zLCBzZXQgdXAgdGhlIGF0dHJpYnV0ZSBwb2ludGVyc1xyXG4gICAgICpcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqIEBwYXJhbSAge09iamVjdH0gbG9jYXRpb25zIE1hcCBvZiBhdHRyaWJ1dGUgbmFtZXMgdG8gcHJvZ3JhbSBsb2NhdGlvbnNcclxuICAgICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ2RyYXcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3KGxvY2F0aW9ucykge1xuICAgICAgdmFyIGdsID0gdGhpcy5fZ2w7XG4gICAgICB2YXIgYSxcbiAgICAgICAgICBzID0gMDtcbiAgICAgIGlmICghdGhpcy5nbEJ1Zikge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5iaW5kQnVmZmVyKCk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBhID0gdGhpcy5hdHRyaWJ1dGVzW2ldO1xuICAgICAgICBpZiAoIShhLm5hbWUgaW4gbG9jYXRpb25zKSkge1xuICAgICAgICAgIC8vIEkgZG9uJ3Qga25vdyBpZiBJIHNob3VsZCBzdXBwcmVzcyB0aGlzLCBidXQgaWYgSVxuICAgICAgICAgIC8vIGRvbid0LCBpdCBnZW5lcmF0ZXMgb25lIHdhcm5pbmcgcGVyIGZyYW1lLlxuICAgICAgICAgIC8vY29uc29sZS53YXJuKCdQcm9ncmFtIGlzIG1pc3NpbmcgYXR0cmlidXRlICcgKyBhLm5hbWUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uc1thLm5hbWVdKTtcbiAgICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihsb2NhdGlvbnNbYS5uYW1lXSwgYS5zaXplLCBnbC5GTE9BVCwgZmFsc2UsIHRoaXMuc2l6ZSwgcyk7XG4gICAgICAgIHMgKz0gNCAqIGEuc2l6ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzOyAvLy51bmJpbmRCdWZmZXIoKTsgIC8vIG1heWJlP1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvbiBlYWNoIHNldCBvZiB2YWx1ZXMgZm9yIHNvbWUgYXR0cmlidXRlXHJcbiAgICAgKlxyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIGF0dHJpYnV0ZUluZGV4IEluZGV4IG9mIHRoZSBhdHRyaWJ1dGUgdG8gc2VsZWN0XHJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgICAgICAgQ2FsbGJhY2tcclxuICAgICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ2VhY2hBdHRyaWJ1dGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlYWNoQXR0cmlidXRlKGF0dHJpYnV0ZUluZGV4LCBjYWxsYmFjaykge1xuICAgICAgdmFyIG9mZnNldCA9IDAsXG4gICAgICAgICAgc2l6ZSxcbiAgICAgICAgICBpO1xuICAgICAgaWYgKGF0dHJpYnV0ZUluZGV4ID49IDAgJiYgYXR0cmlidXRlSW5kZXggPCB0aGlzLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhdHRyaWJ1dGVJbmRleDsgaSsrKSB7XG4gICAgICAgICAgb2Zmc2V0ICs9IHRoaXMuYXR0cmlidXRlc1tpXS5zaXplO1xuICAgICAgICB9XG4gICAgICAgIHNpemUgPSB0aGlzLmF0dHJpYnV0ZXNbYXR0cmlidXRlSW5kZXhdLnNpemU7XG4gICAgICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IHRoaXMudmFsdWVzLmxlbmd0aDsgaSArPSB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgY2FsbGJhY2sodGhpcy52YWx1ZXMuc3ViYXJyYXkoaSwgaSArIHNpemUpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEdMQXR0cmlidXRlO1xufSkoX2dsQnVmZmVyMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gR0xBdHRyaWJ1dGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfZ2xCb3VuZCA9IHJlcXVpcmUoJy4uL2dsLWJvdW5kJyk7XG5cbnZhciBfZ2xCb3VuZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbEJvdW5kKTtcblxuLyoqXHJcbiAqIEEgR0xCdWZmZXIgaXMgYSBidWZmZXIgb2Ygc29tZSBzb3J0IHRoYXQgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGdwdVxyXG4gKlxyXG4gKiBAZXh0ZW5kcyB7R0xCb3VuZH1cclxuICovXG5cbnZhciBHTEJ1ZmZlciA9IChmdW5jdGlvbiAoX0dMQm91bmQpIHtcbiAgX2luaGVyaXRzKEdMQnVmZmVyLCBfR0xCb3VuZCk7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgZ2wtYm91bmQgYnVmZmVyXHJcbiAgICpcclxuICAgKiBAY2hhaW5hYmxlXHJcbiAgICogQHBhcmFtICB7Y29udGV4dH0gZ2wgICAgV2ViR0wgY29udGV4dFxyXG4gICAqIEBwYXJhbSAge2VudW19IHRhcmdldCAgIGdsIHRhcmdldCAgQHNlZSBodHRwczovL3d3dy5raHJvbm9zLm9yZy9yZWdpc3RyeS93ZWJnbC9zcGVjcy8xLjAvIzUuMTQuNVxyXG4gICAqIEBwYXJhbSAge2VudW19IHVzYWdlICAgIGdsIHVzYWdlIEBzZWUgaHR0cHM6Ly93d3cua2hyb25vcy5vcmcvcmVnaXN0cnkvd2ViZ2wvc3BlY3MvMS4wLyM1LjE0LjVcclxuICAgKiBAcmV0dXJuIHt0aGlzfSAgICAgICAgICB0aGUgR0xCdWZmZXJcclxuICAgKi9cblxuICBmdW5jdGlvbiBHTEJ1ZmZlcihnbCwgdGFyZ2V0LCB1c2FnZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBHTEJ1ZmZlcik7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihHTEJ1ZmZlci5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsKTtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldCB8fCBnbC5BUlJBWV9CVUZGRVI7IC8vIHByb2JhYmx5IHNob3VsZG4ndCBkZWZhdWx0IHRoaXMuXG4gICAgdGhpcy51c2FnZSA9IHVzYWdlIHx8IGdsLlNUQVRJQ19EUkFXO1xuICAgIHRoaXMuZ2xCdWYgPSBudWxsO1xuICAgIHRoaXMudmFsdWVzID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxyXG4gICAqIEJpbmRzIHRoZSBidWZmZXIgdG8gdGhlIGdwdVxyXG4gICAqXHJcbiAgICogQGNoYWluYWJsZVxyXG4gICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKEdMQnVmZmVyLCBbe1xuICAgIGtleTogJ2JpbmRCdWZmZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBiaW5kQnVmZmVyKCkge1xuICAgICAgaWYgKCF0aGlzLnZhbHVlcykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ3RyeWluZyB0byB1cGRhdGUgYSBidWZmZXIgd2l0aCBubyB2YWx1ZXMuJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5nbEJ1Zikge1xuICAgICAgICB0aGlzLmdsQnVmID0gdGhpcy5fZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9nbC5iaW5kQnVmZmVyKHRoaXMudGFyZ2V0LCB0aGlzLmdsQnVmKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogVW5iaW5kcyB0aGUgYnVmZmVyIChOUEkpXHJcbiAgICAgKlxyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQHJldHVybiB7dGhpc31cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAndW5iaW5kQnVmZmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdW5iaW5kQnVmZmVyKCkge1xuICAgICAgLy8gdGhpcy5fZ2wuYmluZEJ1ZmZlcih0aGlzLnRhcmdldCwgMCk7ICAvLyBhcHBhcmVudGx5IHRoaXMgbWFrZXMgd2ViZ2wgY3Jhbmt5XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSB0aGUgYnVmZmVyIGRhdGEgb24gdGhlIGdwdVxyXG4gICAgICpcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIHRoaXMuYmluZEJ1ZmZlcigpO1xuICAgICAgLy8gaWYgSSBkbyBpdCB0aGlzIHdheSwgZG9lcyBpdCBicmVhaz9cbiAgICAgIC8vIGlmIGl0IHdvcmtzLCB3aWxsIHVwZGF0aW5nIHRoZSB1bmRlcmx5aW5nIGJ1ZmZlclxuICAgICAgLy8gdXBkYXRlIHRoZSBidWZmZXIgd2l0aG91dCBuZWVkaW5nIHRvIGNhbGwgZ2wuYnVmZmVyRGF0YSBhZ2Fpbj8/XG4gICAgICB0aGlzLl9nbC5idWZmZXJEYXRhKHRoaXMudGFyZ2V0LCB0aGlzLnZhbHVlcywgdGhpcy51c2FnZSk7XG4gICAgICByZXR1cm4gdGhpczsgLy8gLnVuYmluZEJ1ZmZlcigpOyAvLyBhcHBhcmVudGx5IHRoaXMgbWFrZXMgd2ViZ2wgYW5ncnkuXG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBidWZmZXIgY29udGVudHNcclxuICAgICAqXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyfSB2YWx1ZXMgVmFsdWVzIHRvIHN0b3JlIGluIHRoZSBidWZmZXJcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgICAgICBPZmZzZXQgdG8gd3JpdGUgdGhlIHZhbHVlc1xyXG4gICAgICogQHJldHVybiB7dGhpc31cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnc2V0VmFsdWVzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0VmFsdWVzKHZhbHVlcywgb2Zmc2V0KSB7XG4gICAgICBpZiAoIXRoaXMudmFsdWVzKSB7XG4gICAgICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52YWx1ZXMuc2V0KHZhbHVlcywgb2Zmc2V0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIERlbGV0ZXMgYSBjaHVuayBvZiBhIGJ1ZmZlclxyXG4gICAgICpcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqIEBwYXJhbSAge051bWJlcn0gc3RhcnQgU3RhcnQgb2YgZGVsZXRpb25cclxuICAgICAqIEBwYXJhbSAge051bWJlcn0gZW5kICAgRW5kIG9mIGRlbGV0aW9uXHJcbiAgICAgKiBAcmV0dXJuIHt0aGlzfVxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdkZWxldGVXaXRoaW4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWxldGVXaXRoaW4oc3RhcnQsIGVuZCkge1xuICAgICAgaWYgKCF0aGlzLnZhbHVlcykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RyeWluZyB0byBzcGxpY2UgYSBidWZmZXIgdGhhdCBoYXMgbm8gdmFsdWVzLicpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB2YXIgblZhbHVlcyA9IGVuZCAtIHN0YXJ0O1xuICAgICAgdmFyIGVtcHR5ID0gbmV3IHRoaXMudmFsdWVzLmNvbnN0cnVjdG9yKG5WYWx1ZXMpO1xuICAgICAgdGhpcy52YWx1ZXMuc2V0KHRoaXMudmFsdWVzLnN1YmFycmF5KGVuZCksIHN0YXJ0KTtcbiAgICAgIHRoaXMudmFsdWVzLnNldChlbXB0eSwgdGhpcy52YWx1ZXMubGVuZ3RoIC0gblZhbHVlcyk7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBEbyBzb21ldGhpbmcgd2l0aCBlYWNoIGVsZW1udCBvZiB0aGUgYnVmZmVyXHJcbiAgICAgKlxyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBjYWxsYmFjayAodmFsdWVzIHJldHVybmVkIHdpbGwgb3ZlcndyaXRlXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGNvbnRlbnRzIG9mIHRoZSBidWZmZXIgYXQgdGhhdCBvZmZzZXQpXHJcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgc3RhcnQgICAgT2Zmc2V0IHRvIHN0YXJ0XHJcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgZW5kICAgICAgT2Zmc2V0IHRvIGVuZFxyXG4gICAgICogQHJldHVybiB7dGhpc31cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnbWFwJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWFwKGNhbGxiYWNrLCBzdGFydCwgZW5kKSB7XG4gICAgICBzdGFydCA9IHN0YXJ0ID09PSB1bmRlZmluZWQgPyAwIDogc3RhcnQ7XG4gICAgICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMudmFsdWVzLmxlbmd0aCA6IGVuZDtcbiAgICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgIHRoaXMudmFsdWVzW2ldID0gY2FsbGJhY2sodGhpcy52YWx1ZXNbaV0sIGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgYSBidWZmZXIncyB2YWx1ZXMsIGFuZCBhbHNvIHVwZGF0ZSB0aGUgYnVmZmVyIG9uIHRoZSBncHVcclxuICAgICAqXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKiBAcGFyYW0gIHtBcnJheUJ1ZmZlcn0gdmFsdWVzIE5ldyB2YWx1ZXMgdG8gZmlsbCB0aGUgYnVmZmVyIHdpdGhcclxuICAgICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICAgKi9cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZUJ1ZmZlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZUJ1ZmZlcih2YWx1ZXMpIHtcbiAgICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEdMQnVmZmVyO1xufSkoX2dsQm91bmQyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBHTEJ1ZmZlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9nbEJ1ZmZlciA9IHJlcXVpcmUoJy4vZ2wtYnVmZmVyJyk7XG5cbnZhciBfZ2xCdWZmZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xCdWZmZXIpO1xuXG4vKipcclxuICogQSBHTEluZGV4IGlzIGEgR0xCdWZmZXIgcmVwcmVzZW50aW5nIGFuIGluZGV4IGJ1ZmZlciBvZiBzb21lIGtpbmRcclxuICpcclxuICogQGV4dGVuZHMge0dMQnVmZmVyfVxyXG4gKi9cblxudmFyIEdMSW5kZXggPSAoZnVuY3Rpb24gKF9HTEJ1ZmZlcikge1xuICBfaW5oZXJpdHMoR0xJbmRleCwgX0dMQnVmZmVyKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYW4gaW5kZXggYnVmZmVyXHJcbiAgICpcclxuICAgKiBAY2hhaW5hYmxlXHJcbiAgICogQHBhcmFtICB7Y29udGV4dH0gZ2wgICAgICAgICAgIFdlYkdMIGNvbnRleHRcclxuICAgKiBAcGFyYW0gIHtBcnJheUJ1ZmZlcn0gdmFsdWVzICAgVmFsdWVzIHRvIGluaXRpYWxpemUgdGhlIGJ1ZmZlciB3aXRoXHJcbiAgICogQHBhcmFtICB7ZW51bX0gZHJhd01vZGUgICAgICAgIERyYXcgbW9kZSBAc2VlIGh0dHBzOi8vd3d3Lmtocm9ub3Mub3JnL3JlZ2lzdHJ5L3dlYmdsL3NwZWNzLzEuMC8jNS4xNC4xMVxyXG4gICAqIEBwYXJhbSAge2VudW19IHVzYWdlICAgICAgICAgICBVc2FnZSBAc2VlIGh0dHBzOi8vd3d3Lmtocm9ub3Mub3JnL3JlZ2lzdHJ5L3dlYmdsL3NwZWNzLzEuMC8jNS4xNC41XHJcbiAgICogQHJldHVybiB7dGhpc31cclxuICAgKi9cblxuICBmdW5jdGlvbiBHTEluZGV4KGdsLCB2YWx1ZXMsIGRyYXdNb2RlLCB1c2FnZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBHTEluZGV4KTtcblxuICAgIHVzYWdlID0gdXNhZ2UgfHwgZ2wuU1RBVElDX0RSQVc7XG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoR0xJbmRleC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsLCBnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdXNhZ2UpO1xuICAgIHRoaXMubW9kZSA9IGRyYXdNb2RlO1xuICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xuICAgIHRoaXMuY291bnQgPSBudWxsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXHJcbiAgICogUGVyZm9ybSBhIGRyYXcgY2FsbCB1c2luZyB0aGlzIGluZGV4IGJ1ZmZlci5cclxuICAgKlxyXG4gICAqIEBjaGFpbmFibGVcclxuICAgKiBAcmV0dXJuIHt0aGlzfVxyXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhHTEluZGV4LCBbe1xuICAgIGtleTogJ2RyYXcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3KCkge1xuICAgICAgdmFyIGdsID0gdGhpcy5fZ2w7XG4gICAgICBpZiAoIXRoaXMuZ2xCdWYpIHtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYmluZEJ1ZmZlcigpO1xuICAgICAgfVxuICAgICAgZ2wuZHJhd0VsZW1lbnRzKHRoaXMubW9kZSwgdGhpcy52YWx1ZXMubGVuZ3RoLCBnbC5VTlNJR05FRF9TSE9SVCwgMCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gR0xJbmRleDtcbn0pKF9nbEJ1ZmZlcjJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEdMSW5kZXg7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxudmFyIF9jb25zdGFudHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uc3RhbnRzKTtcblxudmFyIF9lbmdpbmUgPSByZXF1aXJlKCcuL2VuZ2luZScpO1xuXG52YXIgX2VuZ2luZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9lbmdpbmUpO1xuXG52YXIgX2Fzc2V0TG9hZGVyID0gcmVxdWlyZSgnLi9hc3NldC1sb2FkZXInKTtcblxudmFyIF9kcmF3YWJsZSA9IHJlcXVpcmUoJy4vZHJhd2FibGUnKTtcblxudmFyIF9kcmF3YWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZSk7XG5cbnZhciBfZHJhd2FibGVJbnZlbnRvcnkgPSByZXF1aXJlKCcuL2RyYXdhYmxlL2ludmVudG9yeScpO1xuXG52YXIgX2RyYXdhYmxlSW52ZW50b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYXdhYmxlSW52ZW50b3J5KTtcblxudmFyIF9kcmF3YWJsZVdvcmxkID0gcmVxdWlyZSgnLi9kcmF3YWJsZS93b3JsZCcpO1xuXG52YXIgX2RyYXdhYmxlV29ybGQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVXb3JsZCk7XG5cbnZhciBfZHJhd2FibGVQb3J0YWxMaW5rID0gcmVxdWlyZSgnLi9kcmF3YWJsZS9wb3J0YWwtbGluaycpO1xuXG52YXIgX2RyYXdhYmxlUG9ydGFsTGluazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZVBvcnRhbExpbmspO1xuXG52YXIgX2RyYXdhYmxlUmVzb25hdG9yTGluayA9IHJlcXVpcmUoJy4vZHJhd2FibGUvcmVzb25hdG9yLWxpbmsnKTtcblxudmFyIF9kcmF3YWJsZVJlc29uYXRvckxpbmsyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVSZXNvbmF0b3JMaW5rKTtcblxudmFyIF9kcmF3YWJsZVNwaGVyaWNhbFBvcnRhbExpbmsgPSByZXF1aXJlKCcuL2RyYXdhYmxlL3NwaGVyaWNhbC1wb3J0YWwtbGluaycpO1xuXG52YXIgX2RyYXdhYmxlU3BoZXJpY2FsUG9ydGFsTGluazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZVNwaGVyaWNhbFBvcnRhbExpbmspO1xuXG52YXIgX2RyYXdhYmxlQXRtb3NwaGVyZSA9IHJlcXVpcmUoJy4vZHJhd2FibGUvYXRtb3NwaGVyZScpO1xuXG52YXIgX2RyYXdhYmxlQXRtb3NwaGVyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZUF0bW9zcGhlcmUpO1xuXG52YXIgX2RyYXdhYmxlVGV4dHVyZWRTcGhlcmUgPSByZXF1aXJlKCcuL2RyYXdhYmxlL3RleHR1cmVkLXNwaGVyZScpO1xuXG52YXIgX2RyYXdhYmxlVGV4dHVyZWRTcGhlcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZHJhd2FibGVUZXh0dXJlZFNwaGVyZSk7XG5cbnZhciBfZHJhd2FibGVQYXJ0aWNsZVBvcnRhbCA9IHJlcXVpcmUoJy4vZHJhd2FibGUvcGFydGljbGUtcG9ydGFsJyk7XG5cbnZhciBfZHJhd2FibGVQYXJ0aWNsZVBvcnRhbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kcmF3YWJsZVBhcnRpY2xlUG9ydGFsKTtcblxudmFyIF9lbnRpdHlJbnZlbnRvcnkgPSByZXF1aXJlKCcuL2VudGl0eS9pbnZlbnRvcnknKTtcblxudmFyIF9lbnRpdHlJbnZlbnRvcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW50aXR5SW52ZW50b3J5KTtcblxudmFyIF9lbnRpdHlQb3J0YWwgPSByZXF1aXJlKCcuL2VudGl0eS9wb3J0YWwnKTtcblxudmFyIF9lbnRpdHlQb3J0YWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZW50aXR5UG9ydGFsKTtcblxudmFyIF9vcmJpdENvbnRyb2xzID0gcmVxdWlyZSgnLi9vcmJpdC1jb250cm9scycpO1xuXG52YXIgX29yYml0Q29udHJvbHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfb3JiaXRDb250cm9scyk7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBfYW5pbWF0aW9uRWFzaW5nID0gcmVxdWlyZSgnLi9hbmltYXRpb24vZWFzaW5nJyk7XG5cbnZhciBfYW5pbWF0aW9uRWFzaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FuaW1hdGlvbkVhc2luZyk7XG5cbnZhciBfYW5pbWF0aW9uQW5pbWF0aW9uID0gcmVxdWlyZSgnLi9hbmltYXRpb24vYW5pbWF0aW9uJyk7XG5cbnZhciBfYW5pbWF0aW9uQW5pbWF0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FuaW1hdGlvbkFuaW1hdGlvbik7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHtcbiAgQ29uc3RhbnRzOiBfY29uc3RhbnRzMlsnZGVmYXVsdCddLFxuICBFbmdpbmU6IF9lbmdpbmUyWydkZWZhdWx0J10sXG4gIFV0aWxpdGllczoge1xuICAgIGxvYWRSZXNvdXJjZTogX2Fzc2V0TG9hZGVyLmxvYWRSZXNvdXJjZSxcbiAgICByZXNldEdMOiBfdXRpbHMucmVzZXRHTCxcbiAgICBzZXRQYXJhbXM6IF91dGlscy5zZXRQYXJhbXMsXG4gICAgZGlzY286IF91dGlscy5kaXNjbyxcbiAgICBnZW5lcmF0ZUFydGlmYWN0czogX3V0aWxzLmdlbmVyYXRlQXJ0aWZhY3RzLFxuICAgIEVhc2U6IF9hbmltYXRpb25FYXNpbmcyWydkZWZhdWx0J10sXG4gICAgQW5pbWF0aW9uOiBfYW5pbWF0aW9uQW5pbWF0aW9uMlsnZGVmYXVsdCddXG4gIH0sXG4gIERyYXdhYmxlczoge1xuICAgIEludmVudG9yeTogX2RyYXdhYmxlSW52ZW50b3J5MlsnZGVmYXVsdCddLFxuICAgIFdvcmxkOiBfZHJhd2FibGVXb3JsZDJbJ2RlZmF1bHQnXSxcbiAgICBSZXNvbmF0b3JMaW5rOiBfZHJhd2FibGVSZXNvbmF0b3JMaW5rMlsnZGVmYXVsdCddLFxuICAgIFBvcnRhbExpbms6IF9kcmF3YWJsZVBvcnRhbExpbmsyWydkZWZhdWx0J10sXG4gICAgU3BoZXJpY2FsUG9ydGFsTGluazogX2RyYXdhYmxlU3BoZXJpY2FsUG9ydGFsTGluazJbJ2RlZmF1bHQnXSxcbiAgICBBdG1vc3BoZXJlOiBfZHJhd2FibGVBdG1vc3BoZXJlMlsnZGVmYXVsdCddLFxuICAgIFRleHR1cmVkU3BoZXJlOiBfZHJhd2FibGVUZXh0dXJlZFNwaGVyZTJbJ2RlZmF1bHQnXSxcbiAgICBQYXJ0aWNsZVBvcnRhbDogX2RyYXdhYmxlUGFydGljbGVQb3J0YWwyWydkZWZhdWx0J10sXG4gICAgRHJhd2FibGU6IF9kcmF3YWJsZTJbJ2RlZmF1bHQnXVxuICB9LFxuICBFbnRpdGllczoge1xuICAgIFdvcmxkOiB7XG4gICAgICBQb3J0YWw6IF9lbnRpdHlQb3J0YWwyWydkZWZhdWx0J11cbiAgICB9LFxuICAgIEludmVudG9yeTogX2VudGl0eUludmVudG9yeTJbJ2RlZmF1bHQnXVxuICB9LFxuICBDb250cm9sczoge1xuICAgIE9yYml0OiBfb3JiaXRDb250cm9sczJbJ2RlZmF1bHQnXVxuICB9LFxuICBWRVJTSU9OOiAnMC4yMS4wJ1xufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9nbEJvdW5kID0gcmVxdWlyZSgnLi9nbC1ib3VuZCcpO1xuXG52YXIgX2dsQm91bmQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xCb3VuZCk7XG5cbnZhciBNT0RFX1RSSUFOR0xFUyA9ICd0cmlhbmdsZXMnO1xudmFyIE1PREVfTElORVMgPSAnbGluZXMnO1xuXG4vKipcclxuICogQmFzZSBjbGFzcyBmb3IgYWxsIG1lc2hlc1xyXG4gKlxyXG4gKiBAZXh0ZW5kcyB7R0xCb3VuZH1cclxuICovXG5cbnZhciBNZXNoID0gKGZ1bmN0aW9uIChfR0xCb3VuZCkge1xuICBfaW5oZXJpdHMoTWVzaCwgX0dMQm91bmQpO1xuXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemVzIGEgbWVzaFxyXG4gICAqIEBwYXJhbSAge2NvbnRleHR9IGdsICAgICAgICAgICAgICBBIHdlYmdsIGNvbnRleHRcclxuICAgKiBAcGFyYW0gIHtGbG9hdDMyQXJyYXl9IGF0dHJpYnV0ZXMgQSB0eXBlZCBhcnJheSBvZiB2ZXJ0ZXggYXR0cmlidXRlc1xyXG4gICAqIEBwYXJhbSAge1VpbnQxNkFycmF5fSBmYWNlcyAgICAgICBBIHR5cGVkIGFycmF5IG9mIGZhY2UgaW5kaWNlc1xyXG4gICAqIEBwYXJhbSAge1VpbnQxNkFycmF5fSBsaW5lcyAgICAgICBBIHR5cGVkIGFycmF5IG9mIGxpbmUgaW5kaWNlc1xyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIE1lc2goZ2wsIGF0dHJpYnV0ZXMsIGZhY2VzLCBsaW5lcykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBNZXNoKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKE1lc2gucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBnbCk7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcbiAgICB0aGlzLmZhY2VzID0gZmFjZXM7XG4gICAgdGhpcy5saW5lcyA9IGxpbmVzO1xuICAgIHRoaXMubW9kZSA9IE1PREVfVFJJQU5HTEVTO1xuICAgIHRoaXMuYm91bmRzID0gbnVsbDtcbiAgICB0aGlzLmNlbnRlciA9IG51bGw7XG4gIH1cblxuICAvKipcclxuICAgKiBHaXZlbiBhIHNldCBvZiBsb2NhdGlvbnMgZnJvbSB0aGUgY3VycmVudGx5LWFjdGl2ZSBzaGFkZXIsIGRyYXcgdGhpcyBtZXNoXHJcbiAgICogQHBhcmFtICB7T2JqZWN0fSBsb2NhdGlvbnMgQSBoYXNoIG9mIGxvY2F0aW9ucyBieSBuYW1lXHJcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKE1lc2gsIFt7XG4gICAga2V5OiAnZHJhdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRyYXcobG9jYXRpb25zKSB7XG4gICAgICB0aGlzLmF0dHJpYnV0ZXMuZHJhdyhsb2NhdGlvbnMpO1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9UUklBTkdMRVMpIHtcbiAgICAgICAgdGhpcy5mYWNlcy5kcmF3KCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gTU9ERV9MSU5FUykge1xuICAgICAgICB0aGlzLmxpbmVzLmRyYXcoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZSB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBtZXNoXHJcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGNvb3JkQXR0cmlidXRlIEluZGV4IG9mIHRoZSBhdHRyaWJ1dGUgcmVwcmVzZW50aW5nIHZlcnRleCBwb3NpdGlvblxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICBBbiBvYmplY3QgY29uc2lzdGluZyBvZiB0d28gYXJyYXlzIG9mIHRoZSBzYW1lIGxlbmd0aFxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcyB0aGUgY29vcmRpbmF0ZSBhdHRyaWJ1dGUsIHJlcHJlc2VudGluZyBtaW4gYW5kIG1heFxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb29yZGluYXRlcy5cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnYm91bmRpbmdCb3gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBib3VuZGluZ0JveChjb29yZEF0dHJpYnV0ZSkge1xuICAgICAgaWYgKCF0aGlzLmJvdW5kcykge1xuICAgICAgICBjb29yZEF0dHJpYnV0ZSA9IGNvb3JkQXR0cmlidXRlID09PSB1bmRlZmluZWQgPyAwIDogY29vcmRBdHRyaWJ1dGU7XG4gICAgICAgIHZhciBib3VuZHMgPSB7XG4gICAgICAgICAgbWF4OiBudWxsLFxuICAgICAgICAgIG1pbjogbnVsbFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMuZWFjaEF0dHJpYnV0ZShjb29yZEF0dHJpYnV0ZSwgZnVuY3Rpb24gKGFycikge1xuICAgICAgICAgIGlmIChBcnJheS5wcm90b3R5cGUucmVkdWNlLmNhbGwoYXJyLCBmdW5jdGlvbiAocywgYSkge1xuICAgICAgICAgICAgcmV0dXJuIHMgKyBhO1xuICAgICAgICAgIH0sIDApID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChib3VuZHMubWF4KSB7XG4gICAgICAgICAgICBib3VuZHMubWF4ID0gYm91bmRzLm1heC5tYXAoZnVuY3Rpb24gKGUsIGkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KGUsIGFycltpXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm91bmRzLm1heCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChib3VuZHMubWluKSB7XG4gICAgICAgICAgICBib3VuZHMubWluID0gYm91bmRzLm1pbi5tYXAoZnVuY3Rpb24gKGUsIGkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluKGUsIGFycltpXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm91bmRzLm1pbiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ib3VuZHMgPSBib3VuZHM7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5ib3VuZHM7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogZml4bWVcbiAgfSwge1xuICAgIGtleTogJ2NlbnRlck9mTWFzcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNlbnRlck9mTWFzcyhjb29yZEF0dHJpYnV0ZSkge1xuICAgICAgaWYgKCF0aGlzLmNlbnRlcikge1xuICAgICAgICBjb29yZEF0dHJpYnV0ZSA9IGNvb3JkQXR0cmlidXRlID09PSB1bmRlZmluZWQgPyAwIDogY29vcmRBdHRyaWJ1dGU7XG4gICAgICAgIHZhciBzdW0gPSBudWxsLFxuICAgICAgICAgICAgY291bnQgPSAwO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMuZWFjaEF0dHJpYnV0ZShjb29yZEF0dHJpYnV0ZSwgZnVuY3Rpb24gKGFycikge1xuICAgICAgICAgIGlmIChBcnJheS5wcm90b3R5cGUucmVkdWNlLmNhbGwoYXJyLCBmdW5jdGlvbiAocywgYSkge1xuICAgICAgICAgICAgcmV0dXJuIHMgKyBhO1xuICAgICAgICAgIH0sIDApID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgaWYgKHN1bSkge1xuICAgICAgICAgICAgc3VtID0gc3VtLm1hcChmdW5jdGlvbiAoZSwgaSkge1xuICAgICAgICAgICAgICByZXR1cm4gZSArIGFycltpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdW0gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHN1bS5tYXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICByZXR1cm4gZSAvIGNvdW50O1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jZW50ZXIgPSBzdW07XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5jZW50ZXI7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgYm91bmRpbmcgYm94LlxyXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBjb29yZEF0dHJpYnV0ZSBJbmRleCBvZiB0aGUgYXR0cmlidXRlIHJlcHJlc2VudGlvbiB2ZXJ0ZXggcG9zaXRpb24uXHJcbiAgICAgKiBAcmV0dXJuIHttaXhlZH0gICAgICAgICAgICAgICAgIEEgdmVjdG9yIG9mIHRoZSBzYW1lIHNpemUgYXMgdGhlIHBvc2l0aW9uIGF0dHJpYnV0ZSxcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwcmVzZW50aW5nIHRoZSBjZW50ZXIgb2YgdGhlIGJvdW5kaW5nIGJveC5cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnYm91bmRpbmdCb3hDZW50ZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBib3VuZGluZ0JveENlbnRlcihjb29yZEF0dHJpYnV0ZSkge1xuICAgICAgaWYgKCF0aGlzLmJvdW5kcykge1xuICAgICAgICB0aGlzLmJvdW5kaW5nQm94KGNvb3JkQXR0cmlidXRlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJvdW5kcy5tYXgubWFwKChmdW5jdGlvbiAoZSwgaSkge1xuICAgICAgICByZXR1cm4gKGUgLSB0aGlzLmJvdW5kcy5taW5baV0pIC8gMjtcbiAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBNZXNoO1xufSkoX2dsQm91bmQyWydkZWZhdWx0J10pO1xuXG5NZXNoLk1PREVfTElORVMgPSBNT0RFX0xJTkVTO1xuTWVzaC5NT0RFX1RSSUFOR0xFUyA9IE1PREVfVFJJQU5HTEVTO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBNZXNoO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX21lc2ggPSByZXF1aXJlKCcuLi9tZXNoJyk7XG5cbnZhciBfbWVzaDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tZXNoKTtcblxudmFyIF92ZXJ0ZXhBdHRyaWJ1dGUgPSByZXF1aXJlKCcuLi92ZXJ0ZXgtYXR0cmlidXRlJyk7XG5cbnZhciBfdmVydGV4QXR0cmlidXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ZlcnRleEF0dHJpYnV0ZSk7XG5cbnZhciBfZ2xHbEluZGV4ID0gcmVxdWlyZSgnLi4vZ2wvZ2wtaW5kZXgnKTtcblxudmFyIF9nbEdsSW5kZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xHbEluZGV4KTtcblxudmFyIF9nbEdsQXR0cmlidXRlID0gcmVxdWlyZSgnLi4vZ2wvZ2wtYXR0cmlidXRlJyk7XG5cbnZhciBfZ2xHbEF0dHJpYnV0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbEdsQXR0cmlidXRlKTtcblxudmFyIF9qYXZhRGVzZXJpYWxpemVyID0gcmVxdWlyZSgnamF2YS1kZXNlcmlhbGl6ZXInKTtcblxudmFyIF9qYXZhRGVzZXJpYWxpemVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2phdmFEZXNlcmlhbGl6ZXIpO1xuXG5mdW5jdGlvbiBwYXJzZUF0dHJpYnV0ZXMoYnVmKSB7XG4gIHZhciB2ID0gbmV3IERhdGFWaWV3KGJ1Zi5idWZmZXIsIGJ1Zi5ieXRlT2Zmc2V0LCBidWYuYnl0ZUxlbmd0aCksXG4gICAgICBjID0gMDtcbiAgdmFyIG4gPSB2LmdldFVpbnQzMihjKSxcbiAgICAgIHR5cGUsXG4gICAgICBzaXplLFxuICAgICAgbGVuLFxuICAgICAgaixcbiAgICAgIG5hbWU7XG4gIGMgKz0gNDtcbiAgdmFyIGF0dHJpYnV0ZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICB0eXBlID0gdi5nZXRVaW50MzIoYyk7XG4gICAgaWYgKHR5cGUgIT0gMHgwMSAmJiB0eXBlICE9IDB4MTApIHtcbiAgICAgIGNvbnNvbGUud2FybigndW5rbm93biB0eXBlICcgKyB0eXBlKTtcbiAgICB9XG4gICAgYyArPSA0O1xuICAgIHNpemUgPSB2LmdldFVpbnQzMihjKTtcbiAgICBjICs9IDQ7XG4gICAgbGVuID0gdi5nZXRVaW50MTYoYyk7XG4gICAgYyArPSAyO1xuICAgIG5hbWUgPSAnJztcbiAgICBmb3IgKGogPSAwOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgIG5hbWUgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh2LmdldFVpbnQ4KGMgKyBqKSk7XG4gICAgfVxuICAgIGMgKz0gbGVuO1xuICAgIGF0dHJpYnV0ZXMucHVzaChuZXcgX3ZlcnRleEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXShuYW1lLCBzaXplKSk7XG4gIH1cbiAgcmV0dXJuIGF0dHJpYnV0ZXM7XG59XG5cbi8qKlxyXG4gKiBBIEZpbGVNZXNoIGlzIGEgTWVzaCB0aGF0IGlzIGxvYWRlZCBmcm9tIGEgc2VyaWFsemllZCBKYXZhIG9iamVjdCxcclxuICogYXMgZm91bmQgaW4gdGhlIGFway5cclxuICpcclxuICogQGV4dGVuZHMge01lc2h9XHJcbiAqL1xuXG52YXIgRmlsZU1lc2ggPSAoZnVuY3Rpb24gKF9NZXNoKSB7XG4gIF9pbmhlcml0cyhGaWxlTWVzaCwgX01lc2gpO1xuXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCB0aGUgTWVzaCBmcm9tIHRoZSBnaXZlbiBmaWxlXHJcbiAgICogQHBhcmFtICB7Y29udGV4dH0gZ2wgICAgICAgICAgIFdlYkdMIGNvbnRleHRcclxuICAgKiBAcGFyYW0gIHtBcnJheUJ1ZmZlcn0gYXJyYXlidWYgQXJyYXlCdWZmZXIgcmVwcmVzZW50aW5nIHRoZSBlbnRpcmUgLm9iaiBmaWxlXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gRmlsZU1lc2goZ2wsIGFycmF5YnVmKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZpbGVNZXNoKTtcblxuICAgIHZhciBqZCA9IG5ldyBfamF2YURlc2VyaWFsaXplcjJbJ2RlZmF1bHQnXShhcnJheWJ1Zik7XG4gICAgdmFyIGJsb2NrcyA9IGpkLmdldENvbnRlbnRzKCk7XG5cbiAgICAvLyBzaG91bGQgYmUgRmxvYXQzMkFycmF5XG4gICAgdmFyIHZhbHVlcyA9IGJsb2Nrc1swXS5lbGVtZW50cztcblxuICAgIC8vIHNob3VsZCBiZSBBcnJheUJ1ZmZlclxuICAgIHZhciBhdHRyaWJ1dGVEYXRhID0gYmxvY2tzWzNdO1xuXG4gICAgLy8gYXJyYXkgb2YgVmVydGV4QXR0cmlidXRlc1xuICAgIHZhciBzcGVjID0gcGFyc2VBdHRyaWJ1dGVzKGF0dHJpYnV0ZURhdGEpO1xuXG4gICAgLy8gc2hvdWxkIGJlIFVpbnQxNkFycmF5XG4gICAgdmFyIGZhY2VzID0gbmV3IF9nbEdsSW5kZXgyWydkZWZhdWx0J10oZ2wsIGJsb2Nrc1sxXS5lbGVtZW50cywgZ2wuVFJJQU5HTEVTKTtcbiAgICB2YXIgYXR0cmlidXRlcyA9IG5ldyBfZ2xHbEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXShnbCwgc3BlYywgdmFsdWVzKTtcblxuICAgIC8vIHNob3VsZCBiZSBVaW50MTZBcnJheVxuICAgIHZhciBsaW5lcyA9IG5ldyBfZ2xHbEluZGV4MlsnZGVmYXVsdCddKGdsLCBibG9ja3NbMl0uZWxlbWVudHMsIGdsLkxJTkVTKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKEZpbGVNZXNoLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZ2wsIGF0dHJpYnV0ZXMsIGZhY2VzLCBsaW5lcyk7XG4gIH1cblxuICByZXR1cm4gRmlsZU1lc2g7XG59KShfbWVzaDJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEZpbGVNZXNoO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX21lc2ggPSByZXF1aXJlKCcuLi9tZXNoJyk7XG5cbnZhciBfbWVzaDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tZXNoKTtcblxudmFyIF92ZXJ0ZXhBdHRyaWJ1dGUgPSByZXF1aXJlKCcuLi92ZXJ0ZXgtYXR0cmlidXRlJyk7XG5cbnZhciBfdmVydGV4QXR0cmlidXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ZlcnRleEF0dHJpYnV0ZSk7XG5cbnZhciBfZ2xHbEluZGV4ID0gcmVxdWlyZSgnLi4vZ2wvZ2wtaW5kZXgnKTtcblxudmFyIF9nbEdsSW5kZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xHbEluZGV4KTtcblxudmFyIF9nbEdsQXR0cmlidXRlID0gcmVxdWlyZSgnLi4vZ2wvZ2wtYXR0cmlidXRlJyk7XG5cbnZhciBfZ2xHbEF0dHJpYnV0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbEdsQXR0cmlidXRlKTtcblxuLy8gY29uc3QgTUFYX1NZU1RFTVMgPSA0MDtcbnZhciBOVU1fUEFSVElDTEVTX1BFUl9TWVNURU0gPSA5NjtcbnZhciBOVU1fVkVSVElDRVNfUEVSX1BBUlRJQ0xFID0gNDtcbnZhciBOVU1fSU5ESUNFU19QRVJfRkFDRSA9IDY7XG52YXIgVE9UQUxfVkVSVEVYX1NJWkUgPSAzICsgMiArIDEgKyAxICsgMSArIDE7XG52YXIgVSA9IFswLjAsIDAuMCwgMS4wLCAxLjBdO1xudmFyIFYgPSBbMS4wLCAwLjAsIDEuMCwgMC4wXTtcblxudmFyIHNlZWRzID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IE5VTV9QQVJUSUNMRVNfUEVSX1NZU1RFTTsgaSsrKSB7XG4gIHNlZWRzLnB1c2goe1xuICAgIHg6IE1hdGgucmFuZG9tKCkgLSAwLjUsXG4gICAgeTogMC40ICogTWF0aC5yYW5kb20oKSAtIDAuMixcbiAgICB6OiBNYXRoLnJhbmRvbSgpIC0gMC41LFxuICAgIGFfc2NhbGU6IDEwLjAgKiAoMC4xICsgMC45ICogTWF0aC5yYW5kb20oKSksXG4gICAgYV9zcGVlZDogNi4wICogKDAuNSArIDAuNSAqIE1hdGgucmFuZG9tKCkpXG4gIH0pO1xufVxuXG4vKipcclxuICogQSBQYXJ0aWNsZVBvcnRhbE1lc2ggaXMgYSBNZXNoIHRoYXQgcmVwcmVzZW50cyBhIHNpbmdsZSBzeXN0ZW0gb3IgcG9ydGFsIHBhcnRpY2xlcy5cclxuICpcclxuICogQGV4dGVuZHMge01lc2h9XHJcbiAqL1xuXG52YXIgUGFydGljbGVQb3J0YWxNZXNoID0gKGZ1bmN0aW9uIChfTWVzaCkge1xuICBfaW5oZXJpdHMoUGFydGljbGVQb3J0YWxNZXNoLCBfTWVzaCk7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgc3lzdGVtIG9mIHBvcnRhbCBwYXJ0aWNsZXNcclxuICAgKiBAcGFyYW0gIHtjb250ZXh0fSBnbCAgICAgV2ViR0wgY29udGV4dFxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIFBhcnRpY2xlUG9ydGFsTWVzaChnbCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQYXJ0aWNsZVBvcnRhbE1lc2gpO1xuXG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBbXTtcbiAgICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10oJ2FfcG9zaXRpb24nLCAzKSk7XG4gICAgYXR0cmlidXRlcy5wdXNoKG5ldyBfdmVydGV4QXR0cmlidXRlMlsnZGVmYXVsdCddKCdhX3RleENvb3JkMCcsIDIpKTtcbiAgICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10oJ2Ffc2NhbGUnLCAxKSk7XG4gICAgYXR0cmlidXRlcy5wdXNoKG5ldyBfdmVydGV4QXR0cmlidXRlMlsnZGVmYXVsdCddKCdhX3NwZWVkJywgMSkpO1xuICAgIGF0dHJpYnV0ZXMucHVzaChuZXcgX3ZlcnRleEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXSgnYV9wb3J0YWxJbmRleCcsIDEpKTtcbiAgICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10oJ2FfaW5kZXgnLCAxKSk7XG4gICAgdmFyIHZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoTlVNX1BBUlRJQ0xFU19QRVJfU1lTVEVNICogTlVNX1ZFUlRJQ0VTX1BFUl9QQVJUSUNMRSAqIFRPVEFMX1ZFUlRFWF9TSVpFKTtcbiAgICB2YXIgc2VlZCxcbiAgICAgICAgaSxcbiAgICAgICAgaixcbiAgICAgICAgaWR4ID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgTlVNX1BBUlRJQ0xFU19QRVJfU1lTVEVNOyBpKyspIHtcbiAgICAgIHNlZWQgPSBzZWVkc1tpXTtcbiAgICAgIGZvciAoaiA9IDA7IGogPCBOVU1fVkVSVElDRVNfUEVSX1BBUlRJQ0xFOyBqKyspIHtcbiAgICAgICAgdmFsdWVzW2lkeCAqIFRPVEFMX1ZFUlRFWF9TSVpFICsgMF0gPSBzZWVkLng7XG4gICAgICAgIHZhbHVlc1tpZHggKiBUT1RBTF9WRVJURVhfU0laRSArIDFdID0gc2VlZC55O1xuICAgICAgICB2YWx1ZXNbaWR4ICogVE9UQUxfVkVSVEVYX1NJWkUgKyAyXSA9IHNlZWQuejtcbiAgICAgICAgdmFsdWVzW2lkeCAqIFRPVEFMX1ZFUlRFWF9TSVpFICsgM10gPSBVW2pdO1xuICAgICAgICB2YWx1ZXNbaWR4ICogVE9UQUxfVkVSVEVYX1NJWkUgKyA0XSA9IFZbal07XG4gICAgICAgIHZhbHVlc1tpZHggKiBUT1RBTF9WRVJURVhfU0laRSArIDVdID0gc2VlZC5hX3NjYWxlO1xuICAgICAgICB2YWx1ZXNbaWR4ICogVE9UQUxfVkVSVEVYX1NJWkUgKyA2XSA9IHNlZWQuYV9zcGVlZDtcbiAgICAgICAgdmFsdWVzW2lkeCAqIFRPVEFMX1ZFUlRFWF9TSVpFICsgN10gPSAwO1xuICAgICAgICB2YWx1ZXNbaWR4ICogVE9UQUxfVkVSVEVYX1NJWkUgKyA4XSA9IGk7XG4gICAgICAgIGlkeCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBmYWNlcyA9IG5ldyBVaW50MTZBcnJheShOVU1fUEFSVElDTEVTX1BFUl9TWVNURU0gKiBOVU1fSU5ESUNFU19QRVJfRkFDRSk7XG4gICAgdmFyIGluZGljZXMgPSBbMCwgMSwgMiwgMSwgMywgMl07XG4gICAgaWR4ID0gMDtcbiAgICB2YXIgZiA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IE5VTV9QQVJUSUNMRVNfUEVSX1NZU1RFTTsgaSsrKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgTlVNX0lORElDRVNfUEVSX0ZBQ0U7IGorKykge1xuICAgICAgICBmYWNlc1tmICsgal0gPSBpZHggKyBpbmRpY2VzW2pdO1xuICAgICAgfVxuICAgICAgZiArPSA2O1xuICAgICAgaWR4ICs9IDQ7XG4gICAgfVxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFBhcnRpY2xlUG9ydGFsTWVzaC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsLCBuZXcgX2dsR2xBdHRyaWJ1dGUyWydkZWZhdWx0J10oZ2wsIGF0dHJpYnV0ZXMsIHZhbHVlcyksIG5ldyBfZ2xHbEluZGV4MlsnZGVmYXVsdCddKGdsLCBmYWNlcywgZ2wuVFJJQU5HTEVTKSk7XG4gIH1cblxuICByZXR1cm4gUGFydGljbGVQb3J0YWxNZXNoO1xufSkoX21lc2gyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBQYXJ0aWNsZVBvcnRhbE1lc2g7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfbWVzaCA9IHJlcXVpcmUoJy4uL21lc2gnKTtcblxudmFyIF9tZXNoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lc2gpO1xuXG52YXIgX3ZlcnRleEF0dHJpYnV0ZSA9IHJlcXVpcmUoJy4uL3ZlcnRleC1hdHRyaWJ1dGUnKTtcblxudmFyIF92ZXJ0ZXhBdHRyaWJ1dGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmVydGV4QXR0cmlidXRlKTtcblxudmFyIF9nbEdsSW5kZXggPSByZXF1aXJlKCcuLi9nbC9nbC1pbmRleCcpO1xuXG52YXIgX2dsR2xJbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbEdsSW5kZXgpO1xuXG52YXIgX2dsR2xBdHRyaWJ1dGUgPSByZXF1aXJlKCcuLi9nbC9nbC1hdHRyaWJ1dGUnKTtcblxudmFyIF9nbEdsQXR0cmlidXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsR2xBdHRyaWJ1dGUpO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbi8vIFRPRE86IFBhcmFtZXRlcml6ZSB0aGlzIGNvbmNlcHQgYSBsaXR0bGUgYmV0dGVyXG4vLyB0aGlzIGhhcyBwb3RlbnRpYWwgdG8gYmUgYSByZWFsbHkgZmxleGlibGUgYW5kIHBvd2VyZnVsIHdheSBvZlxuLy8gbWFraW5nLCBlc3NlbnRpYWxseSwgZXh0cnVkZWQgZ2VvbWV0cnkuXG5cbi8vIDkgc2V0cyBvZiA2IHBvaW50cywgYnJlYWtpbmcgdGhlIGxpbmsgaW50byA4IHBpZWNlcywgZWFjaCBwcm92aWRpbmcgNiBmYWNlcywgc29tZXRoaW5nIGxpa2UgdGhhdD9cbnZhciBfbGVuID0gOSxcbiAgICBfc2l6ZSA9IF9sZW4gKiA2LFxuICAgIF9jaHVua1NpemUgPSAxMjtcbnZhciBjID0gbmV3IEFycmF5KF9sZW4pLFxuICAgIGQgPSBuZXcgQXJyYXkoX2xlbiksXG4gICAgZSA9IG5ldyBBcnJheShfbGVuKTtcblxudmFyIGJhc2VDb2xvciA9IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC40NiwgMC4xOCwgMC4xOCwgMS4wKTtcbnZhciBiYXNlT2Zmc2V0ID0gX2dsTWF0cml4LnZlYzQuY3JlYXRlKCk7XG5cbmZ1bmN0aW9uIGNsYW1wZWRTaW4oZikge1xuICByZXR1cm4gTWF0aC5zaW4oTWF0aC5QSSAqIE1hdGgubWF4KE1hdGgubWluKDEuMCwgZiksIDApIC8gMik7XG59XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgX2xlbjsgaSsrKSB7XG4gIHZhciBmID0gaSAvIDguMDtcbiAgY1tpXSA9IGY7XG4gIGVbaV0gPSAzLjAgKyAtMS41ICogTWF0aC5wb3coY2xhbXBlZFNpbigyLjAgKiBNYXRoLmFicyhmIC0gMC41KSksIDQpO1xuICBkW2ldID0gY2xhbXBlZFNpbigxLjAgLSAyLjAgKiBNYXRoLmFicyhmIC0gMC41KSk7XG59XG5cbmZ1bmN0aW9uIGZpbGxDaHVuayhidWYsIGluZGV4LCB4LCB5LCB6LCB1LCB2LCBub3JtYWwsIGY2LCBjb2xvcikge1xuICB2YXIgb2ZmID0gaW5kZXggKiBfY2h1bmtTaXplO1xuICBidWZbb2ZmICsgMF0gPSB4O1xuICBidWZbb2ZmICsgMV0gPSB5O1xuICBidWZbb2ZmICsgMl0gPSB6O1xuICBidWZbb2ZmICsgM10gPSBmNjtcbiAgYnVmW29mZiArIDRdID0gdTtcbiAgYnVmW29mZiArIDVdID0gdjtcbiAgYnVmW29mZiArIDZdID0gbm9ybWFsWzBdO1xuICBidWZbb2ZmICsgN10gPSBub3JtYWxbMl07XG4gIGJ1ZltvZmYgKyA4XSA9IGNvbG9yWzBdO1xuICBidWZbb2ZmICsgOV0gPSBjb2xvclsxXTtcbiAgYnVmW29mZiArIDEwXSA9IGNvbG9yWzJdO1xuICBidWZbb2ZmICsgMTFdID0gY29sb3JbM107XG59XG5cbmZ1bmN0aW9uIF9nZW5lcmF0ZUxpbmtBdHRyaWJ1dGVzKHN0YXJ0LCBlbmQsIGNvbG9yLCBzdGFydFBlcmNlbnQsIGVuZFBlcmNlbnQpIHtcbiAgc3RhcnRQZXJjZW50ID0gc3RhcnRQZXJjZW50ID09PSB1bmRlZmluZWQgPyAxIDogTWF0aC5tYXgoTWF0aC5taW4oc3RhcnRQZXJjZW50LCAxKSwgMCk7XG4gIGVuZFBlcmNlbnQgPSBlbmRQZXJjZW50ID09PSB1bmRlZmluZWQgPyAxIDogTWF0aC5tYXgoTWF0aC5taW4oZW5kUGVyY2VudCwgMSksIDApO1xuICB2YXIgdmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShfc2l6ZSAqIF9jaHVua1NpemUpO1xuICB2YXIgbGVuZ3RoID0gTWF0aC5zcXJ0KChlbmRbMF0gLSBzdGFydFswXSkgKiAoZW5kWzBdIC0gc3RhcnRbMF0pICsgKGVuZFsxXSAtIHN0YXJ0WzFdKSAqIChlbmRbMV0gLSBzdGFydFsxXSkpO1xuICB2YXIgeU1pbiA9IGJhc2VPZmZzZXRbMV0sXG4gICAgICB5TWF4ID0geU1pbiArIE1hdGgubWluKDMwLjAsIDAuMDggKiBsZW5ndGgpLFxuICAgICAgYXZnUGVyY2VudCA9IChzdGFydFBlcmNlbnQgKyBlbmRQZXJjZW50KSAvIDIuMCxcbiAgICAgIGY2ID0gMC4wMSAqIGxlbmd0aCxcbiAgICAgIGY3ID0gMC4xICsgYXZnUGVyY2VudCAqIDAuMztcbiAgdmFyIHZlYyA9IF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoZW5kWzBdLCAwLCBlbmRbMV0pO1xuICBfZ2xNYXRyaXgudmVjMy5zdWJ0cmFjdCh2ZWMsIHZlYywgX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcyhzdGFydFswXSwgMCwgc3RhcnRbMV0pKTtcbiAgdmFyIHVwID0gX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygwLCAxLCAwKTtcbiAgdmFyIHJpZ2h0ID0gX2dsTWF0cml4LnZlYzMuY3Jvc3MoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIHZlYywgdXApO1xuICBfZ2xNYXRyaXgudmVjMy5ub3JtYWxpemUocmlnaHQsIHJpZ2h0KTtcbiAgdmFyIHN0ZXAgPSBfbGVuICogMjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBfbGVuOyBpKyspIHtcbiAgICB2YXIgZjggPSBjW2ldLFxuICAgICAgICBmOSA9IHN0YXJ0UGVyY2VudCArIGY4ICogKGVuZFBlcmNlbnQgLSBzdGFydFBlcmNlbnQpLFxuICAgICAgICBmMTAgPSAwLjYgKyAwLjM1ICogZjksXG4gICAgICAgIGYxMiA9IGY4ICogZjYsXG4gICAgICAgIGYxMyA9IHN0YXJ0WzBdICsgZjggKiB2ZWNbMF0sXG4gICAgICAgIGYxNCA9IHN0YXJ0WzFdICsgZjggKiB2ZWNbMl0sXG4gICAgICAgIGYxNSA9IHlNaW4gKyBkW2ldICogKHlNYXggLSB5TWluKSxcbiAgICAgICAgZjE2ID0gZVtpXTtcbiAgICB2YXIgY2wgPSBfZ2xNYXRyaXgudmVjNC5sZXJwKF9nbE1hdHJpeC52ZWM0LmNyZWF0ZSgpLCBiYXNlQ29sb3IsIGNvbG9yLCAwLjI1ICsgZjkgKiAwLjc1KTtcbiAgICBjbFszXSA9IGYxMDtcbiAgICBmaWxsQ2h1bmsodmFsdWVzLCBpICogMiwgZjEzICsgZjE2ICogcmlnaHRbMF0sIGYxNSwgZjE0ICsgZjE2ICogcmlnaHRbMl0sIDAsIGYxMiwgdXAsIGY3LCBjbCk7XG4gICAgZmlsbENodW5rKHZhbHVlcywgaSAqIDIgKyAxLCBmMTMgLSBmMTYgKiByaWdodFswXSwgZjE1LCBmMTQgLSBmMTYgKiByaWdodFsyXSwgMC41LCBmMTIsIHVwLCBmNywgY2wpO1xuICAgIGZpbGxDaHVuayh2YWx1ZXMsIHN0ZXAgKyBpICogMiwgZjEzLCBmMTUgKyBmMTYsIGYxNCwgMCwgZjEyLCByaWdodCwgZjcsIGNsKTtcbiAgICBmaWxsQ2h1bmsodmFsdWVzLCBzdGVwICsgaSAqIDIgKyAxLCBmMTMsIGYxNSAtIGYxNiwgZjE0LCAwLjUsIGYxMiwgcmlnaHQsIGY3LCBjbCk7XG4gICAgZmlsbENodW5rKHZhbHVlcywgMiAqIHN0ZXAgKyBpICogMiwgZjEzLCBmMTUgLSBmMTYsIGYxNCwgMC41LCBmMTIsIHJpZ2h0LCBmNywgY2wpO1xuICAgIGZpbGxDaHVuayh2YWx1ZXMsIDIgKiBzdGVwICsgaSAqIDIgKyAxLCBmMTMsIDAsIGYxNCwgMS4wLCBmMTIsIHJpZ2h0LCBmNywgY2wpO1xuICB9XG4gIHJldHVybiB2YWx1ZXM7XG59XG5cbmZ1bmN0aW9uIF9nZW5lcmF0ZUZhY2VzKHZlcnRleE9mZnNldCkge1xuICB2YXIgaW5kID0gbmV3IFVpbnQxNkFycmF5KDE0NCksXG4gICAgICBpT2ZmID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgX2xlbiAtIDE7IGorKykge1xuXG4gICAgICBpbmRbaU9mZiArIDBdID0gdmVydGV4T2Zmc2V0ICsgMTtcbiAgICAgIGluZFtpT2ZmICsgMV0gPSB2ZXJ0ZXhPZmZzZXQgKyAwO1xuICAgICAgaW5kW2lPZmYgKyAyXSA9IHZlcnRleE9mZnNldCArIDI7XG4gICAgICBpbmRbaU9mZiArIDNdID0gdmVydGV4T2Zmc2V0ICsgMTtcbiAgICAgIGluZFtpT2ZmICsgNF0gPSB2ZXJ0ZXhPZmZzZXQgKyAyO1xuICAgICAgaW5kW2lPZmYgKyA1XSA9IHZlcnRleE9mZnNldCArIDM7XG4gICAgICB2ZXJ0ZXhPZmZzZXQgKz0gMjtcbiAgICAgIGlPZmYgKz0gNjtcbiAgICB9XG4gICAgdmVydGV4T2Zmc2V0ICs9IDI7XG4gIH1cblxuICByZXR1cm4gaW5kO1xufVxuXG4vKipcclxuICogQSBQb3J0YWxMaW5rTWVzaCByZXByZXNlbnRzIHRoZSBtZXNoIGZvciBhIHNpbmdsZSBwb3J0YWwgbGluay5cclxuICpcclxuICogQGV4dGVuZHMge01lc2h9XHJcbiAqL1xuXG52YXIgUG9ydGFsTGlua01lc2ggPSAoZnVuY3Rpb24gKF9NZXNoKSB7XG4gIF9pbmhlcml0cyhQb3J0YWxMaW5rTWVzaCwgX01lc2gpO1xuXG4gIC8qKlxyXG4gICAqIFByb2dyYW1hdGljYWxseSBjb25zdHJ1Y3RzIHRoZSBtZXNoIGZvciBhIGxpbmsgYmV0d2VlbiB0d28gcG9pbnRzXHJcbiAgICogQHBhcmFtICB7Y29udGV4dH0gZ2wgICAgICAgICAgV2ViR0wgY29udGV4dFxyXG4gICAqIEBwYXJhbSAge3ZlYzJ9IHN0YXJ0ICAgICAgICAgIFgsWiBvZiB0aGUgb3JpZ2luIHBvaW50XHJcbiAgICogQHBhcmFtICB7dmVjMn0gZW5kICAgICAgICAgICAgWCxaIG9mIHRoZSBkZXN0aW5hdGlvbiBwb2ludFxyXG4gICAqIEBwYXJhbSAge3ZlYzR9IGNvbG9yICAgICAgICAgIENvbG9yIG9mIHRoZSBsaW5rXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSBzdGFydFBlcmNlbnQgT3JpZ2luIHBvaW50IHBlcmNlbnRhZ2VcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGVuZFBlcmNlbnQgICBEZXN0aW5hdGlvbiBwb2ludCBwZXJjZW50YWdlXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gUG9ydGFsTGlua01lc2goZ2wsIHN0YXJ0LCBlbmQsIGNvbG9yLCBzdGFydFBlcmNlbnQsIGVuZFBlcmNlbnQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUG9ydGFsTGlua01lc2gpO1xuXG4gICAgdmFyIGJ1ZiA9IF9nZW5lcmF0ZUxpbmtBdHRyaWJ1dGVzKHN0YXJ0LCBlbmQsIGNvbG9yLCBzdGFydFBlcmNlbnQsIGVuZFBlcmNlbnQpO1xuICAgIHZhciBpbmQgPSBfZ2VuZXJhdGVGYWNlcygwKTtcbiAgICB2YXIgYXR0cmlidXRlcyA9IFtdO1xuICAgIGF0dHJpYnV0ZXMucHVzaChuZXcgX3ZlcnRleEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXSgnYV9wb3NpdGlvbicsIDQpKTtcbiAgICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10oJ2FfdGV4Q29vcmQwJywgNCkpO1xuICAgIGF0dHJpYnV0ZXMucHVzaChuZXcgX3ZlcnRleEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXSgnYV9jb2xvcicsIDQpKTtcbiAgICB2YXIgYXR0cmlidXRlID0gbmV3IF9nbEdsQXR0cmlidXRlMlsnZGVmYXVsdCddKGdsLCBhdHRyaWJ1dGVzLCBidWYsIGdsLkRZTkFNSUNfRFJBVyk7XG4gICAgdmFyIGZhY2VzID0gbmV3IF9nbEdsSW5kZXgyWydkZWZhdWx0J10oZ2wsIGluZCwgZ2wuVFJJQU5HTEVTKTtcbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihQb3J0YWxMaW5rTWVzaC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsLCBhdHRyaWJ1dGUsIGZhY2VzKTtcbiAgfVxuXG4gIHJldHVybiBQb3J0YWxMaW5rTWVzaDtcbn0pKF9tZXNoMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gUG9ydGFsTGlua01lc2g7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChfeCwgX3gyLCBfeDMpIHsgdmFyIF9hZ2FpbiA9IHRydWU7IF9mdW5jdGlvbjogd2hpbGUgKF9hZ2FpbikgeyB2YXIgb2JqZWN0ID0gX3gsIHByb3BlcnR5ID0gX3gyLCByZWNlaXZlciA9IF94MzsgZGVzYyA9IHBhcmVudCA9IGdldHRlciA9IHVuZGVmaW5lZDsgX2FnYWluID0gZmFsc2U7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyBfeCA9IHBhcmVudDsgX3gyID0gcHJvcGVydHk7IF94MyA9IHJlY2VpdmVyOyBfYWdhaW4gPSB0cnVlOyBjb250aW51ZSBfZnVuY3Rpb247IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfbWVzaCA9IHJlcXVpcmUoJy4uL21lc2gnKTtcblxudmFyIF9tZXNoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21lc2gpO1xuXG52YXIgX3ZlcnRleEF0dHJpYnV0ZSA9IHJlcXVpcmUoJy4uL3ZlcnRleC1hdHRyaWJ1dGUnKTtcblxudmFyIF92ZXJ0ZXhBdHRyaWJ1dGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmVydGV4QXR0cmlidXRlKTtcblxudmFyIF9nbEdsSW5kZXggPSByZXF1aXJlKCcuLi9nbC9nbC1pbmRleCcpO1xuXG52YXIgX2dsR2xJbmRleDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbEdsSW5kZXgpO1xuXG52YXIgX2dsR2xBdHRyaWJ1dGUgPSByZXF1aXJlKCcuLi9nbC9nbC1hdHRyaWJ1dGUnKTtcblxudmFyIF9nbEdsQXR0cmlidXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsR2xBdHRyaWJ1dGUpO1xuXG52YXIgX2dsTWF0cml4ID0gcmVxdWlyZSgnZ2wtbWF0cml4Jyk7XG5cbi8vIFRPRE86IFBhcmFtZXRlcml6ZSB0aGlzIGNvbmNlcHQgYSBsaXR0bGUgYmV0dGVyXG4vLyB0aGlzIGhhcyBwb3RlbnRpYWwgdG8gYmUgYSByZWFsbHkgZmxleGlibGUgYW5kIHBvd2VyZnVsIHdheSBvZlxuLy8gbWFraW5nLCBlc3NlbnRpYWxseSwgZXh0cnVkZWQgZ2VvbWV0cnkuXG5cbi8vIDUgc2V0cyBvZiA0IHBvaW50cywgYnJlYWtpbmcgdGhlIGxpbmsgaW50byA0IHBpZWNlcywgZWFjaCBwcm92aWRpbmcgNCBmYWNlc1xuLy8gY2h1bmtzaXplIGlzIHNpemUgb2YgZWFjaCBlbGVtZW50IGluIHRoZSBwYWNrZWQgdmVydGV4IGFycmF5LCBpbiBieXRlc1xudmFyIF9sZW4gPSA1LFxuICAgIF9zaXplID0gX2xlbiAqIDQsXG4gICAgX2NodW5rU2l6ZSA9IDEyO1xudmFyIGogPSBuZXcgQXJyYXkoX2xlbiksXG4gICAgayA9IG5ldyBBcnJheShfbGVuKSxcbiAgICBsID0gbmV3IEFycmF5KF9sZW4pO1xuXG5mdW5jdGlvbiBjbGFtcGVkU2luKGYpIHtcbiAgcmV0dXJuIE1hdGguc2luKE1hdGguUEkgKiBNYXRoLm1heChNYXRoLm1pbigxLjAsIGYpLCAwKSAvIDIpO1xufVxuXG5mb3IgKHZhciBpID0gMDsgaSA8IF9sZW47IGkrKykge1xuICB2YXIgZiA9IGkgLyA0LjA7XG4gIGpbaV0gPSBmO1xuICBsW2ldID0gMy41ICogTWF0aC5tYXgoMS4wIC0gTWF0aC5wb3coY2xhbXBlZFNpbigyLjAgKiBNYXRoLmFicyhmIC0gMC41KSksIDQuMCksIDAuMik7XG4gIGtbaV0gPSBjbGFtcGVkU2luKDEuMCAtIDIuMCAqIE1hdGguYWJzKGYgLSAwLjUpKTtcbn1cblxudmFyIGJhc2VDb2xvciA9IF9nbE1hdHJpeC52ZWM0LmZyb21WYWx1ZXMoMC43OCwgMC4zMSwgMC4zMSwgMS4wKTtcbnZhciByZXNvbmF0b3JNaWRPZmZzZXQgPSAwO1xudmFyIHBvcnRhbEJhc2VPZmZzZXQgPSAwO1xudmFyIHVwID0gX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygwLCAxLCAwKTtcblxuZnVuY3Rpb24gZmlsbENodW5rKGJ1ZiwgaW5kZXgsIHgsIHksIHosIHUsIHYsIG5vcm1hbCwgZjYsIGNvbG9yKSB7XG4gIHZhciBvZmYgPSBpbmRleCAqIF9jaHVua1NpemU7XG4gIGJ1ZltvZmYgKyAwXSA9IHg7XG4gIGJ1ZltvZmYgKyAxXSA9IHk7XG4gIGJ1ZltvZmYgKyAyXSA9IHo7XG4gIGJ1ZltvZmYgKyAzXSA9IGY2O1xuICBidWZbb2ZmICsgNF0gPSB1O1xuICBidWZbb2ZmICsgNV0gPSB2O1xuICBidWZbb2ZmICsgNl0gPSBub3JtYWxbMF07XG4gIGJ1ZltvZmYgKyA3XSA9IG5vcm1hbFsyXTtcbiAgYnVmW29mZiArIDhdID0gY29sb3JbMF07XG4gIGJ1ZltvZmYgKyA5XSA9IGNvbG9yWzFdO1xuICBidWZbb2ZmICsgMTBdID0gY29sb3JbMl07XG4gIGJ1ZltvZmYgKyAxMV0gPSBjb2xvclszXTtcbn1cblxuZnVuY3Rpb24gX2dlbmVyYXRlTGlua0F0dHJpYnV0ZXMocG9ydGFsLCByZXNvbmF0b3IsIGNvbG9yLCByZXNvbmF0b3JQZXJjZW50KSB7XG4gIHJlc29uYXRvclBlcmNlbnQgPSByZXNvbmF0b3JQZXJjZW50ID09PSB1bmRlZmluZWQgPyAxIDogTWF0aC5tYXgoTWF0aC5taW4ocmVzb25hdG9yUGVyY2VudCwgMSksIDApO1xuICB2YXIgdmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShfc2l6ZSAqIF9jaHVua1NpemUpO1xuICB2YXIgZGlzdCA9IE1hdGguc3FydCgocmVzb25hdG9yWzBdIC0gcG9ydGFsWzBdKSAqIChyZXNvbmF0b3JbMF0gLSBwb3J0YWxbMF0pICsgKHJlc29uYXRvclsxXSAtIHBvcnRhbFsxXSkgKiAocmVzb25hdG9yWzFdIC0gcG9ydGFsWzFdKSk7XG4gIHZhciBmNCA9IDIgLyAzMCAqIGRpc3QsXG4gICAgICBmNSA9IDAuOSArIDAuMSAqIHJlc29uYXRvclBlcmNlbnQsXG4gICAgICBmNiA9IDAuNjUgKyAwLjM1ICogcmVzb25hdG9yUGVyY2VudCxcbiAgICAgIGY4ID0gMC4xICsgMC4zICogcmVzb25hdG9yUGVyY2VudDtcbiAgdmFyIGNsID0gX2dsTWF0cml4LnZlYzQubGVycChfZ2xNYXRyaXgudmVjNC5jcmVhdGUoKSwgYmFzZUNvbG9yLCBjb2xvciwgMC4xICsgcmVzb25hdG9yUGVyY2VudCAqIDAuODUpO1xuICBjbFszXSA9IDAuNzUgKyAwLjI1ICogcmVzb25hdG9yUGVyY2VudCAqIGNsWzNdO1xuICB2YXIgdmVjID0gX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcyhyZXNvbmF0b3JbMF0sIDAsIHJlc29uYXRvclsxXSk7XG4gIF9nbE1hdHJpeC52ZWMzLnN1YnRyYWN0KHZlYywgdmVjLCBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKHBvcnRhbFswXSwgMCwgcG9ydGFsWzFdKSk7XG4gIHZhciByaWdodCA9IF9nbE1hdHJpeC52ZWMzLmNyb3NzKF9nbE1hdHJpeC52ZWMzLmNyZWF0ZSgpLCB2ZWMsIHVwKTtcbiAgX2dsTWF0cml4LnZlYzMubm9ybWFsaXplKHJpZ2h0LCByaWdodCk7XG4gIHZhciBzdGVwID0gX2xlbiAqIDI7XG4gIHZhciBmMTAgPSA1LjAgKiAocG9ydGFsWzBdICsgcG9ydGFsWzFdIC0gTWF0aC5mbG9vcihwb3J0YWxbMF0gKyBwb3J0YWxbMV0pKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBfbGVuOyBpKyspIHtcbiAgICB2YXIgZjExID0galtpXSxcbiAgICAgICAgZjEyID0gcG9ydGFsWzBdICsgZjExICogdmVjWzBdLFxuICAgICAgICBmMTMgPSBwb3J0YWxbMV0gKyBmMTEgKiB2ZWNbMl0sXG4gICAgICAgIGYxNCA9IHBvcnRhbEJhc2VPZmZzZXQgKyBmMTEgKiAocmVzb25hdG9yTWlkT2Zmc2V0IC0gcG9ydGFsQmFzZU9mZnNldCkgKyBmNSAqIGtbaV0sXG4gICAgICAgIGYxNSA9IGY2ICogbFtpXSxcbiAgICAgICAgZjE2ID0gZjExICogZjQ7XG4gICAgZmlsbENodW5rKHZhbHVlcywgaSAqIDIgKyAwLCBmMTIgKyBmMTUgKiByaWdodFswXSwgZjE0LCBmMTMgKyBmMTUgKiByaWdodFsyXSwgMC4wLCBmMTYgKyBmMTAsIHVwLCBmOCwgY2wpO1xuICAgIGZpbGxDaHVuayh2YWx1ZXMsIGkgKiAyICsgMSwgZjEyIC0gZjE1ICogcmlnaHRbMF0sIGYxNCwgZjEzIC0gZjE1ICogcmlnaHRbMl0sIDEuMCwgZjE2ICsgZjEwLCB1cCwgZjgsIGNsKTtcbiAgICBmaWxsQ2h1bmsodmFsdWVzLCBzdGVwICsgaSAqIDIgKyAwLCBmMTIsIGYxNCArIGYxNSwgZjEzLCAwLjAsIGYxNiArIGYxMCwgcmlnaHQsIGY4LCBjbCk7XG4gICAgZmlsbENodW5rKHZhbHVlcywgc3RlcCArIGkgKiAyICsgMSwgZjEyLCBmMTQgLSBmMTUsIGYxMywgMS4wLCBmMTYgKyBmMTAsIHJpZ2h0LCBmOCwgY2wpO1xuICB9XG4gIHJldHVybiB2YWx1ZXM7XG59XG5cbmZ1bmN0aW9uIF9nZW5lcmF0ZUZhY2VzKHZlcnRleE9mZnNldCkge1xuICB2YXIgaW5kID0gbmV3IFVpbnQxNkFycmF5KDQ4KSxcbiAgICAgIGlPZmYgPSAwO1xuXG4gIGZvciAoaSA9IDA7IGkgPCAyOyBpKyspIHtcbiAgICBmb3IgKHZhciBpMiA9IDA7IGkyIDwgX2xlbiAtIDE7IGkyKyspIHtcbiAgICAgIGluZFtpT2ZmICsgMF0gPSB2ZXJ0ZXhPZmZzZXQgKyAxO1xuICAgICAgaW5kW2lPZmYgKyAxXSA9IHZlcnRleE9mZnNldCArIDA7XG4gICAgICBpbmRbaU9mZiArIDJdID0gdmVydGV4T2Zmc2V0ICsgMjtcbiAgICAgIGluZFtpT2ZmICsgM10gPSB2ZXJ0ZXhPZmZzZXQgKyAxO1xuICAgICAgaW5kW2lPZmYgKyA0XSA9IHZlcnRleE9mZnNldCArIDI7XG4gICAgICBpbmRbaU9mZiArIDVdID0gdmVydGV4T2Zmc2V0ICsgMztcbiAgICAgIHZlcnRleE9mZnNldCArPSAyO1xuICAgICAgaU9mZiArPSA2O1xuICAgIH1cbiAgICB2ZXJ0ZXhPZmZzZXQgKz0gMjtcbiAgfVxuXG4gIHJldHVybiBpbmQ7XG59XG5cbi8qKlxyXG4gKiBBIFJlc29uYXRvckxpbmtNZXNoIGlzIGEgTWVzaCB0aGF0IHJlcHJlc2VudHMgYSBzaW5nbGUgbGluayBiZXR3ZWVuIGEgcG9ydGFsIGFuZCBhIHJlc29uYXRvclxyXG4gKlxyXG4gKiBUT0RPOiBNYWtlIGRpc2NvXHJcbiAqXHJcbiAqIEBleHRlbmRzIHtNZXNofVxyXG4gKi9cblxudmFyIFJlc29uYXRvckxpbmtNZXNoID0gKGZ1bmN0aW9uIChfTWVzaCkge1xuICBfaW5oZXJpdHMoUmVzb25hdG9yTGlua01lc2gsIF9NZXNoKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSByZXNvbmF0b3IgbGluayBtZXNoXHJcbiAgICogQHBhcmFtICB7Y29udGV4dH0gZ2wgICAgICAgICAgICAgIFdlYkdMIGNvbnRleHRcclxuICAgKiBAcGFyYW0gIHt2ZWMyfSBwb3J0YWxQb3NpdGlvbiAgICAgWCxaIG9mIHRoZSBwb3J0YWxcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHNsb3QgICAgICAgICAgICAgUmVzb25hdG9yIHNsb3QgKDAtNylcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGRpc3RhbmNlICAgICAgICAgRGlzdGFuY2UgZnJvbSB0aGUgcG9ydGFsXHJcbiAgICogQHBhcmFtICB7dmVjNH0gY29sb3IgICAgICAgICAgICAgIENvbG9yIG9mIHRoZSByZXNvbmF0b3IgbGlua1xyXG4gICAqIEBwYXJhbSAge051bWJlcn0gcmVzb25hdG9yUGVyY2VudCBQZXJjZW50IGhlYWx0aCBvZiB0aGUgcmVzb25hdG9yXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gUmVzb25hdG9yTGlua01lc2goZ2wsIHBvcnRhbFBvc2l0aW9uLCBzbG90LCBkaXN0YW5jZSwgY29sb3IsIHJlc29uYXRvclBlcmNlbnQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVzb25hdG9yTGlua01lc2gpO1xuXG4gICAgdmFyIHRoZXRhID0gc2xvdCAvIDggKiAyICogTWF0aC5QSTtcbiAgICB2YXIgZW5kID0gX2dsTWF0cml4LnZlYzIuY3JlYXRlKCk7XG4gICAgdmFyIHJlbGF0aXZlID0gX2dsTWF0cml4LnZlYzIuZnJvbVZhbHVlcyhkaXN0YW5jZSAqIE1hdGguY29zKHRoZXRhKSwgZGlzdGFuY2UgKiBNYXRoLnNpbih0aGV0YSkpO1xuICAgIF9nbE1hdHJpeC52ZWMyLmFkZChlbmQsIHBvcnRhbFBvc2l0aW9uLCByZWxhdGl2ZSk7XG4gICAgdmFyIGJ1ZiA9IF9nZW5lcmF0ZUxpbmtBdHRyaWJ1dGVzKHBvcnRhbFBvc2l0aW9uLCBlbmQsIGNvbG9yLCByZXNvbmF0b3JQZXJjZW50KTtcbiAgICB2YXIgaW5kID0gX2dlbmVyYXRlRmFjZXMoMCk7XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBbXTtcbiAgICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10oJ2FfcG9zaXRpb24nLCA0KSk7XG4gICAgYXR0cmlidXRlcy5wdXNoKG5ldyBfdmVydGV4QXR0cmlidXRlMlsnZGVmYXVsdCddKCdhX3RleENvb3JkMCcsIDQpKTtcbiAgICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10oJ2FfY29sb3InLCA0KSk7XG4gICAgdmFyIGF0dHJpYnV0ZSA9IG5ldyBfZ2xHbEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXShnbCwgYXR0cmlidXRlcywgYnVmLCBnbC5EWU5BTUlDX0RSQVcpO1xuICAgIHZhciBmYWNlcyA9IG5ldyBfZ2xHbEluZGV4MlsnZGVmYXVsdCddKGdsLCBpbmQsIGdsLlRSSUFOR0xFUyk7XG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUmVzb25hdG9yTGlua01lc2gucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBnbCwgYXR0cmlidXRlLCBmYWNlcyk7XG4gIH1cblxuICByZXR1cm4gUmVzb25hdG9yTGlua01lc2g7XG59KShfbWVzaDJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFJlc29uYXRvckxpbmtNZXNoO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX21lc2ggPSByZXF1aXJlKCcuLi9tZXNoJyk7XG5cbnZhciBfbWVzaDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tZXNoKTtcblxudmFyIF92ZXJ0ZXhBdHRyaWJ1dGUgPSByZXF1aXJlKCcuLi92ZXJ0ZXgtYXR0cmlidXRlJyk7XG5cbnZhciBfdmVydGV4QXR0cmlidXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ZlcnRleEF0dHJpYnV0ZSk7XG5cbnZhciBfZ2xHbEluZGV4ID0gcmVxdWlyZSgnLi4vZ2wvZ2wtaW5kZXgnKTtcblxudmFyIF9nbEdsSW5kZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xHbEluZGV4KTtcblxudmFyIF9nbEdsQXR0cmlidXRlID0gcmVxdWlyZSgnLi4vZ2wvZ2wtYXR0cmlidXRlJyk7XG5cbnZhciBfZ2xHbEF0dHJpYnV0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbEdsQXR0cmlidXRlKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG4vLyBwYXJ0IG9mIGRvaW5nIGF3YXkgd2l0aCB0aGUgVEhSRUUuanMgZGVwZW5kZW5jeVxuLy8gbWVhbnMgZ2l2aW5nIHVwIGEgbG90IG9mIGhlbHBlciBjb2RlIGZvciBkb2luZyB0aGluZ3Ncbi8vIGxpa2UgdGhpcy5cbi8vXG4vLyBOZWVkbGVzcyB0byBzYXksIHRoaXMgYm9ycm93cyBoZWF2aWx5IGZyb20gVEhSRUUuU3BoZXJlR2VvbWV0cnlcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvYmxvYi9tYXN0ZXIvc3JjL2V4dHJhcy9nZW9tZXRyaWVzL1NwaGVyZUdlb21ldHJ5LmpzXG5mdW5jdGlvbiBjcmVhdGVTcGhlcmUocmFkaXVzLCBwaGlTbGljZXMsIHRoZXRhU2xpY2VzKSB7XG4gIHZhciBpLFxuICAgICAgaixcbiAgICAgIHUsXG4gICAgICB2LFxuICAgICAgdmVjLFxuICAgICAgdjEsXG4gICAgICB2MixcbiAgICAgIHYzLFxuICAgICAgdjQsXG4gICAgICB2ZXJ0aWNlc1JvdyxcbiAgICAgIGZhY2VzLFxuICAgICAgcGhpID0gTWF0aC5QSSAqIDIsXG4gICAgICB0aGV0YSA9IE1hdGguUEksXG5cbiAgLy8gc2l6ZSBpcyA4IGZvciB2ZWMzIGFfcG9zaXRpb24gKyB2ZWMyIGFfdGV4Q29vcmQgKyB2ZWMzIGFfbm9ybWFsXG4gIHZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoKHBoaVNsaWNlcyArIDEpICogKHRoZXRhU2xpY2VzICsgMSkgKiA4KSxcbiAgICAgIGZhY2VBcnJheSA9IFtdLFxuICAgICAgdmVydGljZXMgPSBbXSxcbiAgICAgIGFJZHggPSAwLFxuICAgICAgYXR0cmlidXRlcyA9IFtdO1xuICBwaGlTbGljZXMgPSBNYXRoLm1heCgzLCBwaGlTbGljZXMgfHwgOCk7XG4gIHRoZXRhU2xpY2VzID0gTWF0aC5tYXgoMiwgdGhldGFTbGljZXMgfHwgNik7XG5cbiAgZm9yIChpID0gMDsgaSA8PSBwaGlTbGljZXM7IGkrKykge1xuICAgIHZlcnRpY2VzUm93ID0gW107XG4gICAgZm9yIChqID0gMDsgaiA8PSB0aGV0YVNsaWNlczsgaisrKSB7XG4gICAgICB1ID0gaiAvIHBoaVNsaWNlcztcbiAgICAgIHYgPSBpIC8gdGhldGFTbGljZXM7XG4gICAgICB2ZWMgPSBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKC1yYWRpdXMgKiBNYXRoLmNvcyh1ICogcGhpKSAqIE1hdGguc2luKHYgKiB0aGV0YSksIHJhZGl1cyAqIE1hdGguY29zKHYgKiB0aGV0YSksIHJhZGl1cyAqIE1hdGguc2luKHUgKiBwaGkpICogTWF0aC5zaW4odiAqIHRoZXRhKSk7XG5cbiAgICAgIHZhbHVlc1thSWR4ICogOCArIDBdID0gdmVjWzBdO1xuICAgICAgdmFsdWVzW2FJZHggKiA4ICsgMV0gPSB2ZWNbMV07XG4gICAgICB2YWx1ZXNbYUlkeCAqIDggKyAyXSA9IHZlY1syXTtcbiAgICAgIHZhbHVlc1thSWR4ICogOCArIDNdID0gdTtcbiAgICAgIHZhbHVlc1thSWR4ICogOCArIDRdID0gdjtcbiAgICAgIC8vIG5vcm1hbGl6ZWQ6XG4gICAgICBfZ2xNYXRyaXgudmVjMy5ub3JtYWxpemUodmVjLCB2ZWMpO1xuICAgICAgdmFsdWVzW2FJZHggKiA4ICsgNV0gPSB2ZWNbMF07XG4gICAgICB2YWx1ZXNbYUlkeCAqIDggKyA2XSA9IHZlY1sxXTtcbiAgICAgIHZhbHVlc1thSWR4ICogOCArIDddID0gdmVjWzJdO1xuXG4gICAgICB2ZXJ0aWNlc1Jvdy5wdXNoKGFJZHgrKyk7XG4gICAgfVxuICAgIHZlcnRpY2VzLnB1c2godmVydGljZXNSb3cpO1xuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IHBoaVNsaWNlczsgaSsrKSB7XG4gICAgZm9yIChqID0gMDsgaiA8IHRoZXRhU2xpY2VzOyBqKyspIHtcbiAgICAgIHYxID0gdmVydGljZXNbaV1baiArIDFdO1xuICAgICAgdjIgPSB2ZXJ0aWNlc1tpXVtqXTtcbiAgICAgIHYzID0gdmVydGljZXNbaSArIDFdW2pdO1xuICAgICAgdjQgPSB2ZXJ0aWNlc1tpICsgMV1baiArIDFdO1xuXG4gICAgICBpZiAoTWF0aC5hYnModmFsdWVzW3YxICogOCArIDFdKSA9PT0gcmFkaXVzKSB7XG4gICAgICAgIGZhY2VBcnJheS5wdXNoLmFwcGx5KGZhY2VBcnJheSwgW3YxLCB2MywgdjRdKTtcbiAgICAgICAgdmFsdWVzW3YxICogOCArIDNdID0gKHZhbHVlc1t2MSAqIDggKyAzXSArIHZhbHVlc1t2MiAqIDggKyAzXSkgLyAyO1xuICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyh2YWx1ZXNbdjMgKiA4ICsgMV0pID09PSByYWRpdXMpIHtcbiAgICAgICAgZmFjZUFycmF5LnB1c2guYXBwbHkoZmFjZUFycmF5LCBbdjEsIHYyLCB2M10pO1xuICAgICAgICB2YWx1ZXNbdjMgKiA4ICsgM10gPSAodmFsdWVzW3YzICogOCArIDNdICsgdmFsdWVzW3Y0ICogOCArIDNdKSAvIDI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYWNlQXJyYXkucHVzaC5hcHBseShmYWNlQXJyYXksIFt2MSwgdjIsIHY0XSk7XG4gICAgICAgIGZhY2VBcnJheS5wdXNoLmFwcGx5KGZhY2VBcnJheSwgW3YyLCB2MywgdjRdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmYWNlcyA9IG5ldyBVaW50MTZBcnJheShmYWNlQXJyYXkubGVuZ3RoKTtcbiAgZmFjZUFycmF5LmZvckVhY2goZnVuY3Rpb24gKHYsIGkpIHtcbiAgICBmYWNlc1tpXSA9IHY7XG4gIH0pO1xuICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10oJ2FfcG9zaXRpb24nLCAzKSk7XG4gIGF0dHJpYnV0ZXMucHVzaChuZXcgX3ZlcnRleEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXSgnYV90ZXhDb29yZDAnLCAyKSk7XG4gIGF0dHJpYnV0ZXMucHVzaChuZXcgX3ZlcnRleEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXSgnYV9ub3JtYWwnLCAzKSk7XG4gIHJldHVybiB7XG4gICAgdmFsdWVzOiB2YWx1ZXMsXG4gICAgZmFjZXM6IGZhY2VzLFxuICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXNcbiAgfTtcbn1cblxuLyoqXHJcbiAqIEEgU3BoZXJlTWVzaCBpcyBhIE1lc2ggdGhhdCBpcyBhIHNwaGVyZSwgbWFkZSBvZiBhIG51bWJlciBvZiBxdWFkcyBkZXRlcm1pbmVkXHJcbiAqIGJ5IHRoZSBudW1iZXIgb2YgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgc2xpY2VzIGludm9sdmVkIGluIGl0cyBjb25zdHJ1Y3Rpb25cclxuICpcclxuICogQGV4dGVuZHMge01lc2h9XHJcbiAqL1xuXG52YXIgU3BoZXJlTWVzaCA9IChmdW5jdGlvbiAoX01lc2gpIHtcbiAgX2luaGVyaXRzKFNwaGVyZU1lc2gsIF9NZXNoKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBzcGhlcmVcclxuICAgKiBAcGFyYW0gIHtjb250ZXh0fSBnbCAgICAgV2ViR0wgY29udGV4dFxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gcmFkaXVzICBSYWRpdXMgb2YgdGhlIHNwaGVyZVxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gdlNsaWNlcyBOdW1iZXIgb2YgdmVydGljYWwgc2xpY2VzXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSBoU2xpY2VzIE51bWJlciBvZiBob3Jpem9udGFsIHNsaWNlc1xyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIFNwaGVyZU1lc2goZ2wsIHJhZGl1cywgdlNsaWNlcywgaFNsaWNlcykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTcGhlcmVNZXNoKTtcblxuICAgIHZhciBwYXJzZWQgPSBjcmVhdGVTcGhlcmUocmFkaXVzLCB2U2xpY2VzLCBoU2xpY2VzKTtcbiAgICB2YXIgYXR0cmlidXRlcyA9IG5ldyBfZ2xHbEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXShnbCwgcGFyc2VkLmF0dHJpYnV0ZXMsIHBhcnNlZC52YWx1ZXMpO1xuICAgIHZhciBmYWNlcyA9IG5ldyBfZ2xHbEluZGV4MlsnZGVmYXVsdCddKGdsLCBwYXJzZWQuZmFjZXMsIGdsLlRSSUFOR0xFUyk7XG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3BoZXJlTWVzaC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsLCBhdHRyaWJ1dGVzLCBmYWNlcyk7XG4gIH1cblxuICByZXR1cm4gU3BoZXJlTWVzaDtcbn0pKF9tZXNoMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gU3BoZXJlTWVzaDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9tZXNoID0gcmVxdWlyZSgnLi4vbWVzaCcpO1xuXG52YXIgX21lc2gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbWVzaCk7XG5cbnZhciBfdmVydGV4QXR0cmlidXRlID0gcmVxdWlyZSgnLi4vdmVydGV4LWF0dHJpYnV0ZScpO1xuXG52YXIgX3ZlcnRleEF0dHJpYnV0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92ZXJ0ZXhBdHRyaWJ1dGUpO1xuXG52YXIgX2dsR2xJbmRleCA9IHJlcXVpcmUoJy4uL2dsL2dsLWluZGV4Jyk7XG5cbnZhciBfZ2xHbEluZGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsR2xJbmRleCk7XG5cbnZhciBfZ2xHbEF0dHJpYnV0ZSA9IHJlcXVpcmUoJy4uL2dsL2dsLWF0dHJpYnV0ZScpO1xuXG52YXIgX2dsR2xBdHRyaWJ1dGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xHbEF0dHJpYnV0ZSk7XG5cbnZhciBfZ2xNYXRyaXggPSByZXF1aXJlKCdnbC1tYXRyaXgnKTtcblxudmFyIF9jaHVua1NpemUgPSAxMztcbnZhciBiYXNlQ29sb3IgPSBfZ2xNYXRyaXgudmVjNC5mcm9tVmFsdWVzKDAuNDYsIDAuMTgsIDAuMTgsIDEuMCk7XG52YXIgYmFzZU9mZnNldCA9IF9nbE1hdHJpeC52ZWM0LmNyZWF0ZSgpO1xuXG5mdW5jdGlvbiBjbGFtcGVkU2luKGYpIHtcbiAgcmV0dXJuIE1hdGguc2luKE1hdGguUEkgKiBNYXRoLm1heChNYXRoLm1pbigxLjAsIGYpLCAwKSAvIDIpO1xufVxuXG5mdW5jdGlvbiBnZXRCZWFyaW5nKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHMgPSBzdGFydFswXSxcbiAgICAgIGUgPSBlbmRbMF0sXG4gICAgICBkbCA9IGVuZFsxXSAtIHN0YXJ0WzFdO1xuICB2YXIgeSA9IE1hdGguc2luKGRsKSAqIE1hdGguY29zKGUpLFxuICAgICAgeCA9IE1hdGguY29zKHMpICogTWF0aC5zaW4oZSkgLSBNYXRoLnNpbihzKSAqIE1hdGguY29zKGUpICogTWF0aC5jb3MoZGwpO1xuXG4gIHJldHVybiAoTWF0aC5hdGFuMih5LCB4KSArIE1hdGguUEkgKiAyKSAlIChNYXRoLlBJICogMik7XG59XG5cbmZ1bmN0aW9uIGRlc3QocCwgYmVhcmluZywgYW5nbGUpIHtcbiAgdmFyIGxhdCA9IE1hdGguYXNpbihNYXRoLnNpbihwWzBdKSAqIE1hdGguY29zKGFuZ2xlKSArIE1hdGguY29zKHBbMF0pICogTWF0aC5zaW4oYW5nbGUpICogTWF0aC5jb3MoYmVhcmluZykpLFxuICAgICAgbG9uID0gcFsxXSArIE1hdGguYXRhbjIoTWF0aC5zaW4oYmVhcmluZykgKiBNYXRoLnNpbihhbmdsZSkgKiBNYXRoLmNvcyhwWzBdKSwgTWF0aC5jb3MoYW5nbGUpIC0gTWF0aC5zaW4ocFswXSkgKiBNYXRoLnNpbihsYXQpKTtcblxuICBsb24gPSAobG9uICsgMyAqIE1hdGguUEkpICUgKDIgKiBNYXRoLlBJKSAtIE1hdGguUEk7XG4gIHJldHVybiBfZ2xNYXRyaXgudmVjMi5mcm9tVmFsdWVzKGxhdCwgbG9uKTtcbn1cblxuZnVuY3Rpb24gYnVpbGRNYXRyaXgocywgZSwgcmFkaXVzKSB7XG4gIHZhciBtYXQgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgX2dsTWF0cml4Lm1hdDQucm90YXRlWShtYXQsIG1hdCwgc1sxXSk7XG4gIF9nbE1hdHJpeC5tYXQ0LnJvdGF0ZVoobWF0LCBtYXQsIHNbMF0gLSBNYXRoLlBJIC8gMik7XG4gIF9nbE1hdHJpeC5tYXQ0LnJvdGF0ZVkobWF0LCBtYXQsIC1nZXRCZWFyaW5nKHMsIGUpKTtcbiAgX2dsTWF0cml4Lm1hdDQudHJhbnNsYXRlKG1hdCwgbWF0LCBbMCwgcmFkaXVzLCAwXSk7XG4gIHJldHVybiBtYXQ7XG59XG5cbmZ1bmN0aW9uIGdldFJhZGlhbERpc3RhbmNlKHMsIGUpIHtcbiAgdmFyIGRMYXQgPSBlWzBdIC0gc1swXSxcbiAgICAgIGRMb24gPSBlWzFdIC0gc1sxXTtcblxuICB2YXIgYSA9IE1hdGguc2luKGRMYXQgLyAyKSAqIE1hdGguc2luKGRMYXQgLyAyKSArIE1hdGguY29zKHNbMF0pICogTWF0aC5jb3MoZVswXSkgKiBNYXRoLnNpbihkTG9uIC8gMikgKiBNYXRoLnNpbihkTG9uIC8gMik7XG5cbiAgcmV0dXJuIDIgKiBNYXRoLmF0YW4yKE1hdGguc3FydChhKSwgTWF0aC5zcXJ0KDEgLSBhKSk7XG59XG5cbmZ1bmN0aW9uIHRvUmFkaWFucyhwb2ludCkge1xuICByZXR1cm4gX2dsTWF0cml4LnZlYzIuZnJvbVZhbHVlcyhwb2ludFswXSAqIE1hdGguUEkgLyAxODAsIHBvaW50WzFdICogTWF0aC5QSSAvIDE4MCk7XG59XG5cbmZ1bmN0aW9uIGZpbGxDaHVuayhidWYsIGluZGV4LCBwb3MsIHV2LCBub3JtYWwsIGY2LCBjb2xvcikge1xuICB2YXIgb2ZmID0gaW5kZXggKiBfY2h1bmtTaXplO1xuICBfZ2xNYXRyaXgudmVjMy5ub3JtYWxpemUobm9ybWFsLCBub3JtYWwpO1xuICBidWZbb2ZmICsgMF0gPSBwb3NbMF07XG4gIGJ1ZltvZmYgKyAxXSA9IHBvc1sxXTtcbiAgYnVmW29mZiArIDJdID0gcG9zWzJdO1xuICBidWZbb2ZmICsgM10gPSBmNjtcbiAgYnVmW29mZiArIDRdID0gdXZbMF07XG4gIGJ1ZltvZmYgKyA1XSA9IHV2WzFdO1xuICBidWZbb2ZmICsgNl0gPSBub3JtYWxbMF07XG4gIGJ1ZltvZmYgKyA3XSA9IG5vcm1hbFsxXTtcbiAgYnVmW29mZiArIDhdID0gbm9ybWFsWzJdO1xuICBidWZbb2ZmICsgOV0gPSBjb2xvclswXTtcbiAgYnVmW29mZiArIDEwXSA9IGNvbG9yWzFdO1xuICBidWZbb2ZmICsgMTFdID0gY29sb3JbMl07XG4gIGJ1ZltvZmYgKyAxMl0gPSBjb2xvclszXTtcbn1cblxuLy8gc3RhcnQgYW5kIGVuZCBzaG91bGQgcHJvYmFibHkgYmUgaW4gcmFkaWFucz9cbmZ1bmN0aW9uIF9nZW5lcmF0ZUxpbmtBdHRyaWJ1dGVzKHJhZGl1cywgc3RhcnQsIGVuZCwgY29sb3IsIHN0YXJ0UGVyY2VudCwgZW5kUGVyY2VudCkge1xuICB2YXIgcyA9IHRvUmFkaWFucyhzdGFydCk7XG4gIHZhciBlID0gdG9SYWRpYW5zKGVuZCk7XG4gIHZhciBhbmdsZSA9IGdldFJhZGlhbERpc3RhbmNlKHMsIGUpO1xuICB2YXIgYmVhcmluZyA9IGdldEJlYXJpbmcocywgZSk7XG4gIHZhciBsZW5ndGggPSBhbmdsZSAqIHJhZGl1cztcbiAgdmFyIHNlZ21lbnRzID0gTWF0aC5tYXgoTWF0aC5mbG9vcihhbmdsZSAvIE1hdGguUEkgKiA1MCkgKyAxLCA4KTsgLy8gNTAgc2VnbWVudHMgZm9yIGEgaGFsZi1jaXJjbGUgc291bmRzIGdvb2QsIEkgZ3Vlc3MuXG4gIHN0YXJ0UGVyY2VudCA9IHN0YXJ0UGVyY2VudCA9PT0gdW5kZWZpbmVkID8gMSA6IE1hdGgubWF4KE1hdGgubWluKHN0YXJ0UGVyY2VudCwgMSksIDApO1xuICBlbmRQZXJjZW50ID0gZW5kUGVyY2VudCA9PT0gdW5kZWZpbmVkID8gMSA6IE1hdGgubWF4KE1hdGgubWluKGVuZFBlcmNlbnQsIDEpLCAwKTtcbiAgdmFyIHZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoc2VnbWVudHMgKiBfY2h1bmtTaXplICogNik7XG4gIHZhciB5TWluID0gYmFzZU9mZnNldFsxXSxcbiAgICAgIHlNYXggPSB5TWluICsgTWF0aC5taW4ocmFkaXVzICogMC4wMSwgMC4wOCAqIGxlbmd0aCksXG4gICAgICBhdmdQZXJjZW50ID0gKHN0YXJ0UGVyY2VudCArIGVuZFBlcmNlbnQpIC8gMi4wLFxuICAgICAgZjYgPSAwLjAxICogbGVuZ3RoLFxuICAgICAgZjcgPSAwLjEgKyBhdmdQZXJjZW50ICogMC4zLFxuICAgICAgdXAgPSBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDAsIDEsIDApLFxuICAgICAgcmlnaHQgPSBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDAsIDAsIDEpO1xuICB2YXIgc3RlcCA9IHNlZ21lbnRzICogMjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWdtZW50czsgaSsrKSB7XG4gICAgdmFyIGY4ID0gaSAvIChzZWdtZW50cyAtIDEpLFxuICAgICAgICBmOSA9IHN0YXJ0UGVyY2VudCArIGY4ICogKGVuZFBlcmNlbnQgLSBzdGFydFBlcmNlbnQpLFxuICAgICAgICBmMTAgPSAwLjYgKyAwLjM1ICogZjksXG5cbiAgICAvLyB2IGFzIGluIFwidXZcIiBhcyBpbiB0ZXhjb29yZHNcbiAgICB2ID0gZjggKiBmNixcblxuICAgIC8vIFwiY3VycmVudFwiIHBvaW50IGluIHByb2dyZXNzaW9uXG4gICAgY3VyciA9IGY4ID09PSAwID8gcyA6IGRlc3QocywgYmVhcmluZywgYW5nbGUgKiBmOCksXG5cbiAgICAvLyBcIm5leHRcIiBwb2ludCBpbiB0aGUgcHJvZ3Jlc3Npb25cbiAgICBuZXh0ID0gZGVzdChzLCBiZWFyaW5nLCBhbmdsZSAqIChmOCArIDEgLyAoc2VnbWVudHMgLSAxKSkpLFxuICAgICAgICB0cmFuc2Zvcm0gPSBidWlsZE1hdHJpeChjdXJyLCBuZXh0LCByYWRpdXMpLFxuXG4gICAgLy8gXCJoZWlnaHRcIiBvZiB0aGUgY2VudGVycG9pbnQgb2YgdGhlIGxpbmsuXG4gICAgaCA9IF9nbE1hdHJpeC52ZWMzLmZyb21WYWx1ZXMoMCwgeU1pbiArICgzLjAgKyAtMS41ICogTWF0aC5wb3coY2xhbXBlZFNpbigyLjAgKiBNYXRoLmFicyhmOCAtIDAuNSkpLCA0KSkgKiAoeU1heCAtIHlNaW4pLCAwKSxcblxuICAgIC8vIFwicmFkaXVzXCIgb2YgdGhlIGxpbmtcbiAgICB3ID0gcmFkaXVzICogMC4wMSAqIGNsYW1wZWRTaW4oMS4wIC0gMi4wICogTWF0aC5hYnMoZjggLSAwLjUpKSxcbiAgICAgICAgd1VwID0gX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygwLCB3LCAwKSxcbiAgICAgICAgd1JpZ2h0ID0gX2dsTWF0cml4LnZlYzMuZnJvbVZhbHVlcygwLCAwLCB3KSxcbiAgICAgICAgY2wgPSBfZ2xNYXRyaXgudmVjNC5sZXJwKF9nbE1hdHJpeC52ZWM0LmNyZWF0ZSgpLCBiYXNlQ29sb3IsIGNvbG9yLCAwLjI1ICsgZjkgKiAwLjc1KTtcbiAgICBjbFszXSA9IGYxMDtcblxuICAgIC8vIHRvcCBob3Jpem9udGFsIHNlZ21lbnRcbiAgICAvLyByaWdodCBwb2ludFxuICAgIGZpbGxDaHVuayh2YWx1ZXMsIGkgKiAyLCBfZ2xNYXRyaXgudmVjMy50cmFuc2Zvcm1NYXQ0KF9nbE1hdHJpeC52ZWMzLmNyZWF0ZSgpLCBfZ2xNYXRyaXgudmVjMy5hZGQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIGgsIHdSaWdodCksIHRyYW5zZm9ybSksIF9nbE1hdHJpeC52ZWMyLmZyb21WYWx1ZXMoMCwgdiksIF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybU1hdDQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIHVwLCB0cmFuc2Zvcm0pLCBmNywgY2wpO1xuICAgIC8vIGxlZnQgcG9pbnRcbiAgICBmaWxsQ2h1bmsodmFsdWVzLCBpICogMiArIDEsIF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybU1hdDQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIF9nbE1hdHJpeC52ZWMzLnN1YnRyYWN0KF9nbE1hdHJpeC52ZWMzLmNyZWF0ZSgpLCBoLCB3UmlnaHQpLCB0cmFuc2Zvcm0pLCBfZ2xNYXRyaXgudmVjMi5mcm9tVmFsdWVzKDAuNSwgdiksIF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybU1hdDQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIHVwLCB0cmFuc2Zvcm0pLCBmNywgY2wpO1xuXG4gICAgLy8gdG9wIHZlcnRpY2FsIHNlZ21lbnRcbiAgICBmaWxsQ2h1bmsodmFsdWVzLCBzdGVwICsgaSAqIDIsIF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybU1hdDQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIF9nbE1hdHJpeC52ZWMzLmFkZChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgaCwgd1VwKSwgdHJhbnNmb3JtKSwgX2dsTWF0cml4LnZlYzIuZnJvbVZhbHVlcygwLCB2KSwgX2dsTWF0cml4LnZlYzMudHJhbnNmb3JtTWF0NChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgcmlnaHQsIHRyYW5zZm9ybSksIGY3LCBjbCk7XG4gICAgZmlsbENodW5rKHZhbHVlcywgc3RlcCArIGkgKiAyICsgMSwgX2dsTWF0cml4LnZlYzMudHJhbnNmb3JtTWF0NChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgX2dsTWF0cml4LnZlYzMuc3VidHJhY3QoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIGgsIHdVcCksIHRyYW5zZm9ybSksIF9nbE1hdHJpeC52ZWMyLmZyb21WYWx1ZXMoMC41LCB2KSwgX2dsTWF0cml4LnZlYzMudHJhbnNmb3JtTWF0NChfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSwgcmlnaHQsIHRyYW5zZm9ybSksIGY3LCBjbCk7XG5cbiAgICAvLyBib3R0b20gdmVydGljYWwgc2VnbWVudFxuICAgIGZpbGxDaHVuayh2YWx1ZXMsIDIgKiBzdGVwICsgaSAqIDIsIF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybU1hdDQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIF9nbE1hdHJpeC52ZWMzLnN1YnRyYWN0KF9nbE1hdHJpeC52ZWMzLmNyZWF0ZSgpLCBoLCB3VXApLCB0cmFuc2Zvcm0pLCBfZ2xNYXRyaXgudmVjMi5mcm9tVmFsdWVzKDAuNSwgdiksIF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybU1hdDQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIHJpZ2h0LCB0cmFuc2Zvcm0pLCBmNywgY2wpO1xuICAgIGZpbGxDaHVuayh2YWx1ZXMsIDIgKiBzdGVwICsgaSAqIDIgKyAxLCBfZ2xNYXRyaXgudmVjMy50cmFuc2Zvcm1NYXQ0KF9nbE1hdHJpeC52ZWMzLmNyZWF0ZSgpLCBfZ2xNYXRyaXgudmVjMy5mcm9tVmFsdWVzKDAsIDAsIDApLCB0cmFuc2Zvcm0pLCBfZ2xNYXRyaXgudmVjMi5mcm9tVmFsdWVzKDEuMCwgdiksIF9nbE1hdHJpeC52ZWMzLnRyYW5zZm9ybU1hdDQoX2dsTWF0cml4LnZlYzMuY3JlYXRlKCksIHJpZ2h0LCB0cmFuc2Zvcm0pLCBmNywgY2wpO1xuICB9XG4gIHJldHVybiB2YWx1ZXM7XG59XG5cbmZ1bmN0aW9uIF9nZW5lcmF0ZUZhY2VzKHZlcnRleE9mZnNldCwgc2VnbWVudHMpIHtcbiAgdmFyIGluZCA9IG5ldyBVaW50MTZBcnJheSg2ICogKHNlZ21lbnRzIC0gMSkgKiAzKSxcbiAgICAgIGlPZmYgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZWdtZW50cyAtIDE7IGorKykge1xuXG4gICAgICBpbmRbaU9mZiArIDBdID0gdmVydGV4T2Zmc2V0ICsgMTtcbiAgICAgIGluZFtpT2ZmICsgMV0gPSB2ZXJ0ZXhPZmZzZXQgKyAwO1xuICAgICAgaW5kW2lPZmYgKyAyXSA9IHZlcnRleE9mZnNldCArIDI7XG4gICAgICBpbmRbaU9mZiArIDNdID0gdmVydGV4T2Zmc2V0ICsgMTtcbiAgICAgIGluZFtpT2ZmICsgNF0gPSB2ZXJ0ZXhPZmZzZXQgKyAyO1xuICAgICAgaW5kW2lPZmYgKyA1XSA9IHZlcnRleE9mZnNldCArIDM7XG4gICAgICB2ZXJ0ZXhPZmZzZXQgKz0gMjtcbiAgICAgIGlPZmYgKz0gNjtcbiAgICB9XG4gICAgdmVydGV4T2Zmc2V0ICs9IDI7XG4gIH1cblxuICByZXR1cm4gaW5kO1xufVxuXG4vKipcclxuICogQSBTcGhlcmVpY2FsUG9ydGFsTGlua01lc2ggaXMgYSBNZXNoIHRoYXQgcmVwcmVzZW50cyBhIHBvcnRhbCBsaW5rIGJldHdlbiB0d28gcG9ydGFsc1xyXG4gKiBvbiB0aGUgc3VyZmFjZSBvZiBhIHNwaGVyZVxyXG4gKlxyXG4gKiBAZXh0ZW5kcyB7TWVzaH1cclxuICovXG5cbnZhciBTcGhlcmljYWxQb3J0YWxMaW5rTWVzaCA9IChmdW5jdGlvbiAoX01lc2gpIHtcbiAgX2luaGVyaXRzKFNwaGVyaWNhbFBvcnRhbExpbmtNZXNoLCBfTWVzaCk7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgc3BoZXJpY2FsIHBvcnRhbCBsaW5rXHJcbiAgICogQHBhcmFtICB7Y29udGV4dH0gZ2wgICAgICAgICAgV2ViR0wgY29udGV4dFxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gc3BoZXJlUmFkaXVzIFJhZGl1cyBvZiB0aGUgc3BoZXJlXHJcbiAgICogQHBhcmFtICB7dmVjMn0gc3RhcnQgICAgICAgICAgbGF0LGxuZyBvZiB0aGUgb3JpZ2luIHBvaW50XHJcbiAgICogQHBhcmFtICB7dmVjMn0gZW5kICAgICAgICAgICAgbGF0LGxuZyBvZiB0aGUgZGVzdGlvbmF0aW9uIHBvaW50XHJcbiAgICogQHBhcmFtICB7dmVjNH0gY29sb3IgICAgICAgICAgQ29sb3Igb2YgdGhlIGxpbmtcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHN0YXJ0UGVyY2VudCBPcmlnaW4gcG9ydGFsIGhlYWx0aCBwZXJjZW50YWdlXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSBlbmRQZXJjZW50ICAgRGVzdGluYXRpb24gcG9ydGFsIGhlYWx0aCBwZXJjZW50YWdlXHJcbiAgICovXG5cbiAgZnVuY3Rpb24gU3BoZXJpY2FsUG9ydGFsTGlua01lc2goZ2wsIHNwaGVyZVJhZGl1cywgc3RhcnQsIGVuZCwgY29sb3IsIHN0YXJ0UGVyY2VudCwgZW5kUGVyY2VudCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTcGhlcmljYWxQb3J0YWxMaW5rTWVzaCk7XG5cbiAgICB2YXIgYnVmID0gX2dlbmVyYXRlTGlua0F0dHJpYnV0ZXMoc3BoZXJlUmFkaXVzLCBzdGFydCwgZW5kLCBjb2xvciwgc3RhcnRQZXJjZW50LCBlbmRQZXJjZW50KTtcbiAgICB2YXIgbGVuID0gYnVmLmxlbmd0aCxcbiAgICAgICAgc2VnbWVudHMgPSBNYXRoLmZsb29yKGxlbiAvIF9jaHVua1NpemUgLyA2KTtcbiAgICB2YXIgaW5kID0gX2dlbmVyYXRlRmFjZXMoMCwgc2VnbWVudHMpO1xuICAgIHZhciBhdHRyaWJ1dGVzID0gW107XG4gICAgYXR0cmlidXRlcy5wdXNoKG5ldyBfdmVydGV4QXR0cmlidXRlMlsnZGVmYXVsdCddKCdhX3Bvc2l0aW9uJywgNCkpO1xuICAgIGF0dHJpYnV0ZXMucHVzaChuZXcgX3ZlcnRleEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXSgnYV90ZXhDb29yZDAnLCAyKSk7XG4gICAgYXR0cmlidXRlcy5wdXNoKG5ldyBfdmVydGV4QXR0cmlidXRlMlsnZGVmYXVsdCddKCdhX25vcm1hbCcsIDMpKTtcbiAgICBhdHRyaWJ1dGVzLnB1c2gobmV3IF92ZXJ0ZXhBdHRyaWJ1dGUyWydkZWZhdWx0J10oJ2FfY29sb3InLCA0KSk7XG4gICAgdmFyIGF0dHJpYnV0ZSA9IG5ldyBfZ2xHbEF0dHJpYnV0ZTJbJ2RlZmF1bHQnXShnbCwgYXR0cmlidXRlcywgYnVmLCBnbC5EWU5BTUlDX0RSQVcpO1xuICAgIHZhciBmYWNlcyA9IG5ldyBfZ2xHbEluZGV4MlsnZGVmYXVsdCddKGdsLCBpbmQsIGdsLlRSSUFOR0xFUyk7XG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3BoZXJpY2FsUG9ydGFsTGlua01lc2gucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBnbCwgYXR0cmlidXRlLCBmYWNlcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXR1cm4gU3BoZXJpY2FsUG9ydGFsTGlua01lc2g7XG59KShfbWVzaDJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFNwaGVyaWNhbFBvcnRhbExpbmtNZXNoO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBfZ2xNYXRyaXggPSByZXF1aXJlKCdnbC1tYXRyaXgnKTtcblxudmFyIFBJX0hBTEYgPSBNYXRoLlBJIC8gMi4wO1xudmFyIE1JTl9MT0dfRElTVCA9IDUuMDtcblxuZnVuY3Rpb24gY2xvbmVUb3VjaCh0b3VjaCkge1xuICByZXR1cm4geyBpZGVudGlmaWVyOiB0b3VjaC5pZGVudGlmaWVyLCB4OiB0b3VjaC5jbGllbnRYLCB5OiB0b3VjaC5jbGllbnRZIH07XG59XG5cbmZ1bmN0aW9uIGdldFRvdWNoSW5kZXgodG91Y2hlcywgdG91Y2gpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHRvdWNoZXNbaV0uaWRlbnRpZmllciA9PSB0b3VjaC5pZGVudGlmaWVyKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcclxuICogQ2FtZXJhIGNvbnRyb2xzIGZvciBjb250cm9sbGluZyBhIGNhbWVyYSB0aGF0IG9yYml0cyBhIGZpeGVkIHBvaW50LFxyXG4gKiB3aXRoIHZhcmlhYmxlIHBvc2l0aW9uIGFuZCBkZXB0aC5cclxuICpcclxuICogVGhpcyBpcyBhIHBvcnQgb2YgdGhlIFRIUkVFLmpzIE9yYml0Q29udHJvbHMgZm91bmQgd2l0aCB0aGUgd2ViZ2wgZ2xvYmUuXHJcbiAqL1xuXG52YXIgT3JiaXRDb250cm9scyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhbiBvcmJpdGluZyBjYW1lcmEgY29udHJvbC5cclxuICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudCAgVGFyZ2V0IGVsZW1lbnQgdG8gYmluZCBsaXN0ZW5lcnMgdG9cclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGRpc3RhbmNlIFN0YXJ0aW5nIGRpc3RhbmNlIGZyb20gb3JpZ2luXHJcbiAgICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zICBIYXNoIG9mIG9wdGlvbnMgZm9yIGNvbmZpZ3VyYXRpb25cclxuICAgKi9cblxuICBmdW5jdGlvbiBPcmJpdENvbnRyb2xzKGVsZW1lbnQsIGNhbWVyYSwgZGlzdGFuY2UsIG9wdGlvbnMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgT3JiaXRDb250cm9scyk7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuICAgIHRoaXMuZGlzdGFuY2UgPSBkaXN0YW5jZSB8fCAyO1xuICAgIHRoaXMuZGlzdGFuY2VUYXJnZXQgPSB0aGlzLmRpc3RhbmNlO1xuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICB6b29tRGFtcDogMC41LFxuICAgICAgZGlzdGFuY2VTY2FsZTogMC41LFxuICAgICAgZGlzdGFuY2VNYXg6IDEwMDAsXG4gICAgICBkaXN0YW5jZU1pbjogMSxcbiAgICAgIHRvdWNoU2NhbGU6IDAuMSxcbiAgICAgIHdoZWVsU2NhbGU6IDAuMDEsXG4gICAgICBmcmljdGlvbjogMC4yLFxuICAgICAgdGFyZ2V0OiBfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKSxcbiAgICAgIGFsbG93Wm9vbTogdHJ1ZVxuICAgIH07XG4gICAgdGhpcy5vcHRpb25zID0gKDAsIF91dGlscy5zZXRQYXJhbXMpKHBhcmFtcywgb3B0aW9ucyk7XG4gICAgdGhpcy5jYW1lcmEubG9va0F0KHRoaXMub3B0aW9ucy50YXJnZXQpO1xuICAgIHRoaXMubW91c2UgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICB0aGlzLm1vdXNlT25Eb3duID0geyB4OiAwLCB5OiAwIH07XG4gICAgdGhpcy5yb3RhdGlvbiA9IHsgeDogMCwgeTogMCB9O1xuICAgIHRoaXMudGFyZ2V0ID0geyB4OiBNYXRoLlBJICogMyAvIDIsIHk6IE1hdGguUEkgLyA2LjAgfTtcbiAgICB0aGlzLnRhcmdldE9uRG93biA9IHsgeDogMCwgeTogMCB9O1xuICAgIHRoaXMub3ZlclJlbmRlcmVyID0gZmFsc2U7XG4gICAgLy8gUHJlLWJpbmQgYWxsIHRoZXNlIGhhbmRsZXJzIHNvIHdlIGNhbiB1bmJpbmQgdGhlIGxpc3RlbmVycyBsYXRlci5cbiAgICB0aGlzLm1vdXNlTW92ZSA9IHRoaXMuX29uTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5tb3VzZVVwID0gdGhpcy5fb25Nb3VzZVVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5tb3VzZU91dCA9IHRoaXMuX29uTW91c2VPdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdXNlRG93biA9IHRoaXMuX29uTW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgdGhpcy5tb3VzZVdoZWVsID0gdGhpcy5fb25Nb3VzZVdoZWVsLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnRvdWNoZXMgPSBbXTtcbiAgICB0aGlzLnRvdWNoRGVsdGEgPSAwO1xuICAgIHRoaXMudG91Y2hNb3ZlID0gdGhpcy5fb25Ub3VjaE1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLnRvdWNoRW5kID0gdGhpcy5fb25Ub3VjaEVuZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMudG91Y2hMZWF2ZSA9IHRoaXMuX29uVG91Y2hMZWF2ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMudG91Y2hTdGFydCA9IHRoaXMuX29uVG91Y2hTdGFydC5iaW5kKHRoaXMpO1xuICAgIHRoaXMubW91c2VPdmVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMub3ZlclJlbmRlcmVyID0gdHJ1ZTtcbiAgICB9KS5iaW5kKHRoaXMpO1xuICAgIHRoaXMubW91c2VPdXQgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5vdmVyUmVuZGVyZXIgPSBmYWxzZTtcbiAgICB9KS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXHJcbiAgICogVW5iaW5kcyBhbGwgbGlzdGVuZXJzIGFuZCBkaXNhYmxlcyB0aGUgY29udHJvbHNcclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoT3JiaXRDb250cm9scywgW3tcbiAgICBrZXk6ICdkaXNhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93biwgZmFsc2UpO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlLCBmYWxzZSk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcCwgZmFsc2UpO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5tb3VzZU91dCwgZmFsc2UpO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLnRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnRvdWNoTW92ZSwgZmFsc2UpO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZCwgZmFsc2UpO1xuICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobGVhdmUnLCB0aGlzLnRvdWNoTGVhdmUsIGZhbHNlKTtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgdGhpcy5tb3VzZVdoZWVsLCBmYWxzZSk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdGhpcy5tb3VzZU92ZXIsIGZhbHNlKTtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHRoaXMubW91c2VPdXQsIGZhbHNlKTtcbiAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogQmluZHMgYWxsIGxpc3RlbmVycyBhbmQgZW5hYmxlcyB0aGUgY29udHJvbHNcclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnZW5hYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duLCBmYWxzZSk7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmFsbG93Wm9vbSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIHRoaXMubW91c2VXaGVlbCwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLnRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLm1vdXNlT3ZlciwgZmFsc2UpO1xuICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5tb3VzZU91dCwgZmFsc2UpO1xuICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSB0aGUgZ2l2ZW4gY2FtZXJhIG1hdHJpeCB3aXRoIG5ldyBwb3NpdGlvbiBpbmZvcm1hdGlvbiwgZXRjXHJcbiAgICAgKiBAcGFyYW0gIHttYXQ0fSB2aWV3ICAgQSB2aWV3IG1hdHJpeFxyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGVWaWV3JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVmlldygpIHtcbiAgICAgIHZhciBkeCA9IHRoaXMudGFyZ2V0LnggLSB0aGlzLnJvdGF0aW9uLngsXG4gICAgICAgICAgZHkgPSB0aGlzLnRhcmdldC55IC0gdGhpcy5yb3RhdGlvbi55LFxuICAgICAgICAgIGR6ID0gdGhpcy5kaXN0YW5jZVRhcmdldCAtIHRoaXMuZGlzdGFuY2UsXG4gICAgICAgICAgY2FtZXJhUG9zaXRpb24gPSBfZ2xNYXRyaXgudmVjMy5jcmVhdGUoKTtcbiAgICAgIGlmIChNYXRoLmFicyhkeCkgPiAwLjAwMDAxIHx8IE1hdGguYWJzKGR5KSA+IDAuMDAwMDEgfHwgTWF0aC5hYnMoZHopID4gMC4wMDAwMSkge1xuICAgICAgICB0aGlzLnJvdGF0aW9uLnggKz0gZHggKiB0aGlzLm9wdGlvbnMuZnJpY3Rpb247XG4gICAgICAgIHRoaXMucm90YXRpb24ueSArPSBkeSAqIHRoaXMub3B0aW9ucy5mcmljdGlvbjtcbiAgICAgICAgdGhpcy5kaXN0YW5jZSArPSBkeiAqIHRoaXMub3B0aW9ucy5kaXN0YW5jZVNjYWxlO1xuXG4gICAgICAgIGNhbWVyYVBvc2l0aW9uWzBdID0gdGhpcy5kaXN0YW5jZSAqIE1hdGguc2luKHRoaXMucm90YXRpb24ueCkgKiBNYXRoLmNvcyh0aGlzLnJvdGF0aW9uLnkpICsgdGhpcy5vcHRpb25zLnRhcmdldFswXTtcbiAgICAgICAgY2FtZXJhUG9zaXRpb25bMV0gPSB0aGlzLmRpc3RhbmNlICogTWF0aC5zaW4odGhpcy5yb3RhdGlvbi55KSArIHRoaXMub3B0aW9ucy50YXJnZXRbMV07XG4gICAgICAgIGNhbWVyYVBvc2l0aW9uWzJdID0gdGhpcy5kaXN0YW5jZSAqIE1hdGguY29zKHRoaXMucm90YXRpb24ueCkgKiBNYXRoLmNvcyh0aGlzLnJvdGF0aW9uLnkpICsgdGhpcy5vcHRpb25zLnRhcmdldFsyXTtcblxuICAgICAgICB0aGlzLmNhbWVyYS5zZXRQb3NpdGlvbihjYW1lcmFQb3NpdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3VwZGF0ZVRhcmdldHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlVGFyZ2V0cygpIHtcbiAgICAgIHZhciBzY2FsZSA9IHRoaXMuZGlzdGFuY2UgPCBNSU5fTE9HX0RJU1QgPyB0aGlzLmRpc3RhbmNlIDogTWF0aC5sb2codGhpcy5kaXN0YW5jZSk7XG4gICAgICB2YXIgem9vbURhbXAgPSBzY2FsZSAvIHRoaXMub3B0aW9ucy56b29tRGFtcDtcblxuICAgICAgdGhpcy50YXJnZXQueCA9IHRoaXMudGFyZ2V0T25Eb3duLnggKyAodGhpcy5tb3VzZS54IC0gdGhpcy5tb3VzZU9uRG93bi54KSAqIDAuMDA1ICogem9vbURhbXA7XG4gICAgICB0aGlzLnRhcmdldC55ID0gdGhpcy50YXJnZXRPbkRvd24ueSArICh0aGlzLm1vdXNlLnkgLSB0aGlzLm1vdXNlT25Eb3duLnkpICogMC4wMDUgKiB6b29tRGFtcDtcblxuICAgICAgdGhpcy50YXJnZXQueSA9IHRoaXMudGFyZ2V0LnkgPiBQSV9IQUxGID8gUElfSEFMRiA6IHRoaXMudGFyZ2V0Lnk7XG4gICAgICB0aGlzLnRhcmdldC55ID0gdGhpcy50YXJnZXQueSA8IC1QSV9IQUxGID8gLVBJX0hBTEYgOiB0aGlzLnRhcmdldC55O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1vdXNlRG93bicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1vdXNlRG93bihldikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZSwgZmFsc2UpO1xuICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXAsIGZhbHNlKTtcbiAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHRoaXMubW91c2VPdXQsIGZhbHNlKTtcblxuICAgICAgdGhpcy5tb3VzZU9uRG93bi54ID0gLWV2LmNsaWVudFg7XG4gICAgICB0aGlzLm1vdXNlT25Eb3duLnkgPSBldi5jbGllbnRZO1xuICAgICAgdGhpcy50YXJnZXRPbkRvd24ueCA9IHRoaXMudGFyZ2V0Lng7XG4gICAgICB0aGlzLnRhcmdldE9uRG93bi55ID0gdGhpcy50YXJnZXQueTtcblxuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmN1cnNvciA9ICdtb3ZlJztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Nb3VzZU1vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Nb3VzZU1vdmUoZXYpIHtcbiAgICAgIHRoaXMubW91c2UueCA9IC1ldi5jbGllbnRYO1xuICAgICAgdGhpcy5tb3VzZS55ID0gZXYuY2xpZW50WTtcbiAgICAgIHRoaXMuX3VwZGF0ZVRhcmdldHMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Nb3VzZVVwJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTW91c2VVcChldikge1xuICAgICAgdGhpcy5fb25Nb3VzZU91dChldik7XG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2F1dG8nO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19vbk1vdXNlT3V0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX29uTW91c2VPdXQoKSB7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmUsIGZhbHNlKTtcbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwLCBmYWxzZSk7XG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzLm1vdXNlT3V0LCBmYWxzZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uTW91c2VXaGVlbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vbk1vdXNlV2hlZWwoZXYpIHtcbiAgICAgIGlmICh0aGlzLm92ZXJSZW5kZXJlcikge1xuICAgICAgICB0aGlzLl96b29tKGV2LndoZWVsRGVsdGFZICogdGhpcy5vcHRpb25zLndoZWVsU2NhbGUgKiAodGhpcy5kaXN0YW5jZSA8IE1JTl9MT0dfRElTVCA/IHRoaXMuZGlzdGFuY2UgOiBNYXRoLmxvZyh0aGlzLmRpc3RhbmNlKSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uVG91Y2hTdGFydCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblRvdWNoU3RhcnQoZXYpIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAodGhpcy50b3VjaGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy50b3VjaE1vdmUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZCwgZmFsc2UpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hsZWF2ZScsIHRoaXMudG91Y2hMZWF2ZSwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMudG91Y2hlcy5wdXNoKGNsb25lVG91Y2goZXYuY2hhbmdlZFRvdWNoZXNbaV0pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGhpcy5tb3VzZU9uRG93bi54ID0gLXRoaXMudG91Y2hlc1swXS54O1xuICAgICAgICB0aGlzLm1vdXNlT25Eb3duLnkgPSB0aGlzLnRvdWNoZXNbMF0ueTtcblxuICAgICAgICB0aGlzLnRhcmdldE9uRG93bi54ID0gdGhpcy50YXJnZXQueDtcbiAgICAgICAgdGhpcy50YXJnZXRPbkRvd24ueSA9IHRoaXMudGFyZ2V0Lnk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudG91Y2hlcy5sZW5ndGggPT09IDIgJiYgdGhpcy5vcHRpb25zLmFsbG93Wm9vbSkge1xuICAgICAgICB2YXIgeCA9IE1hdGguYWJzKHRoaXMudG91Y2hlc1swXS54IC0gdGhpcy50b3VjaGVzWzFdLngpO1xuICAgICAgICB2YXIgeSA9IE1hdGguYWJzKHRoaXMudG91Y2hlc1swXS55IC0gdGhpcy50b3VjaGVzWzFdLnkpO1xuXG4gICAgICAgIHRoaXMudG91Y2hEZWx0YSA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmN1cnNvciA9ICdtb3ZlJztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Ub3VjaE1vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Ub3VjaE1vdmUoZXYpIHtcbiAgICAgIHZhciBjaGFuZ2VkID0gZXYuY2hhbmdlZFRvdWNoZXMsXG4gICAgICAgICAgbCA9IGNoYW5nZWQubGVuZ3RoO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGlkeCA9IGdldFRvdWNoSW5kZXgodGhpcy50b3VjaGVzLCBjaGFuZ2VkW2ldKTtcbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgdGhpcy50b3VjaGVzLnNwbGljZShpZHgsIDEsIGNsb25lVG91Y2goY2hhbmdlZFtpXSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3VsZCBub3QgZmluZCBldmVudCAnLCBjaGFuZ2VkW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLm1vdXNlLnggPSAtdGhpcy50b3VjaGVzWzBdLng7XG4gICAgICAgIHRoaXMubW91c2UueSA9IHRoaXMudG91Y2hlc1swXS55O1xuICAgICAgICB0aGlzLnVwZGF0ZVRhcmdldHMoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50b3VjaGVzLmxlbmd0aCA9PT0gMiAmJiB0aGlzLm9wdGlvbnMuYWxsb3dab29tKSB7XG4gICAgICAgIHZhciB4ID0gdGhpcy50b3VjaGVzWzBdLnggLSB0aGlzLnRvdWNoZXNbMV0ueDtcbiAgICAgICAgdmFyIHkgPSB0aGlzLnRvdWNoZXNbMF0ueSAtIHRoaXMudG91Y2hlc1sxXS55O1xuXG4gICAgICAgIHZhciBuZXdEZWx0YSA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbiAgICAgICAgdGhpcy5fem9vbSgobmV3RGVsdGEgLSB0aGlzLnRvdWNoRGVsdGEpICogdGhpcy5vcHRpb25zLnRvdWNoU2NhbGUpO1xuICAgICAgICB0aGlzLnRvdWNoRGVsdGEgPSBuZXdEZWx0YTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfcmVtb3ZlVG91Y2hlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9yZW1vdmVUb3VjaGVzKGV2KSB7XG4gICAgICB2YXIgY2hhbmdlZCA9IGV2LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICAgIGwgPSBjaGFuZ2VkLmxlbmd0aDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBpZHggPSBnZXRUb3VjaEluZGV4KHRoaXMudG91Y2hlcywgY2hhbmdlZFtpXSk7XG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgIHRoaXMudG91Y2hlcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMudG91Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudG91Y2hNb3ZlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobGVhdmUnLCB0aGlzLnRvdWNoTGVhdmUsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLm1vdXNlT25Eb3duLnggPSAtdGhpcy50b3VjaGVzWzBdLng7XG4gICAgICAgIHRoaXMubW91c2VPbkRvd24ueSA9IHRoaXMudG91Y2hlc1swXS55O1xuXG4gICAgICAgIHRoaXMudGFyZ2V0T25Eb3duLnggPSB0aGlzLnRhcmdldC54O1xuICAgICAgICB0aGlzLnRhcmdldE9uRG93bi55ID0gdGhpcy50YXJnZXQueTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfb25Ub3VjaEVuZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblRvdWNoRW5kKGV2KSB7XG4gICAgICB0aGlzLl9yZW1vdmVUb3VjaGVzKGV2KTtcbiAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnYXV0byc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX29uVG91Y2hMZWF2ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9vblRvdWNoTGVhdmUoZXYpIHtcbiAgICAgIHRoaXMuX3JlbW92ZVRvdWNoZXMoZXYpO1xuICAgIH1cblxuICAgIC8vP1xuICB9LCB7XG4gICAga2V5OiAnX29uVG91Y2hDYW5jZWwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfb25Ub3VjaENhbmNlbChldikge1xuICAgICAgdGhpcy5fcmVtb3ZlVG91Y2hlcyhldik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3pvb20nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfem9vbShkZWx0YSkge1xuICAgICAgdGhpcy5kaXN0YW5jZVRhcmdldCAtPSBkZWx0YTtcbiAgICAgIHRoaXMuZGlzdGFuY2VUYXJnZXQgPSBNYXRoLm1pbih0aGlzLmRpc3RhbmNlVGFyZ2V0LCB0aGlzLm9wdGlvbnMuZGlzdGFuY2VNYXgpO1xuICAgICAgdGhpcy5kaXN0YW5jZVRhcmdldCA9IE1hdGgubWF4KHRoaXMuZGlzdGFuY2VUYXJnZXQsIHRoaXMub3B0aW9ucy5kaXN0YW5jZU1pbik7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE9yYml0Q29udHJvbHM7XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBPcmJpdENvbnRyb2xzO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9IH07XG5cbmV4cG9ydHMuZml4UHJlY2lzaW9uID0gZml4UHJlY2lzaW9uO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfZ2xCb3VuZCA9IHJlcXVpcmUoJy4vZ2wtYm91bmQnKTtcblxudmFyIF9nbEJvdW5kMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dsQm91bmQpO1xuXG4vKipcclxuICogRml4ZXMgYW4gaXNzdWUgd2l0aCBzaGFkZXJzIHdoZXJlIHRoZSBzaGFkZXIgZG9lc24ndCBzZXQgYSBwcmVjaXNpb24sXHJcbiAqIGxlYWRpbmcgaXQgdG8gaGF2ZSBhIG1pc21hdGNoIHdpdGggaXRzIGNvdW50ZXJwYXJ0XHJcbiAqXHJcbiAqIEkuZS4gdGhlIHZlcnRleCBzaGFkZXIgbWlnaHQgc2V0IGEgcHJlY2lzaW9uLCBidXQgdGhlIGZyYWdtZW50IHNoYWRlclxyXG4gKiBkb2VzIG5vdCwgbGVhZGluZyB0byBwcmVjaXNpb24gbWlzbWF0Y2ggZXJyb3JzLlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHNoYWRlciBUaGUgc2hhZGVyIHRvIGNoZWNrL2ZpeFxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICBUaGUgZml4ZWQgc2hhZGVyLCBvciB0aGUgb3JpZ2luYWwgaWYgaXQgbmVlZGVkXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIG5vIHBhdGNoaW5nLlxyXG4gKi9cblxuZnVuY3Rpb24gZml4UHJlY2lzaW9uKHNoYWRlcikge1xuICBpZiAoL3ByZWNpc2lvbiBtZWRpdW1wIGZsb2F0L2cudGVzdChzaGFkZXIpKSB7XG4gICAgcmV0dXJuIHNoYWRlcjtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGluZXMgPSBzaGFkZXIuc3BsaXQoXCJcXG5cIik7XG4gICAgbGluZXMuc3BsaWNlKDEsIDAsIFwiI2lmZGVmIEdMX0VTXCIsIFwicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsIFwiI2VuZGlmXCIpO1xuICAgIHJldHVybiBsaW5lcy5qb2luKFwiXFxuXCIpO1xuICB9XG59XG5cbi8vIFRha2VuIGZyb20gUGhpbG9HTCdzIHByb2dyYW0gY2xhc3M6XG4vL1JldHVybnMgYSBNYWdpYyBVbmlmb3JtIFNldHRlclxuZnVuY3Rpb24gZ2V0VW5pZm9ybVNldHRlcihnbCwgcHJvZ3JhbSwgaW5mbywgaXNBcnJheSkge1xuICB2YXIgbmFtZSA9IGluZm8ubmFtZSxcbiAgICAgIGxvYyA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBuYW1lKSxcbiAgICAgIHR5cGUgPSBpbmZvLnR5cGUsXG4gICAgICBtYXRyaXggPSBmYWxzZSxcbiAgICAgIHZlY3RvciA9IHRydWUsXG4gICAgICBnbEZ1bmN0aW9uLFxuICAgICAgdHlwZWRBcnJheTtcblxuICBpZiAoaW5mby5zaXplID4gMSAmJiBpc0FycmF5KSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIGdsLkZMT0FUOlxuICAgICAgICBnbEZ1bmN0aW9uID0gZ2wudW5pZm9ybTFmdjtcbiAgICAgICAgdHlwZWRBcnJheSA9IEZsb2F0MzJBcnJheTtcbiAgICAgICAgdmVjdG9yID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBnbC5JTlQ6Y2FzZSBnbC5CT09MOmNhc2UgZ2wuU0FNUExFUl8yRDpjYXNlIGdsLlNBTVBMRVJfQ1VCRTpcbiAgICAgICAgZ2xGdW5jdGlvbiA9IGdsLnVuaWZvcm0xaXY7XG4gICAgICAgIHR5cGVkQXJyYXkgPSBVaW50MTZBcnJheTtcbiAgICAgICAgdmVjdG9yID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmICh2ZWN0b3IpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgZ2wuRkxPQVQ6XG4gICAgICAgIGdsRnVuY3Rpb24gPSBnbC51bmlmb3JtMWY7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBnbC5GTE9BVF9WRUMyOlxuICAgICAgICBnbEZ1bmN0aW9uID0gZ2wudW5pZm9ybTJmdjtcbiAgICAgICAgdHlwZWRBcnJheSA9IGlzQXJyYXkgPyBGbG9hdDMyQXJyYXkgOiBuZXcgRmxvYXQzMkFycmF5KDIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZ2wuRkxPQVRfVkVDMzpcbiAgICAgICAgZ2xGdW5jdGlvbiA9IGdsLnVuaWZvcm0zZnY7XG4gICAgICAgIHR5cGVkQXJyYXkgPSBpc0FycmF5ID8gRmxvYXQzMkFycmF5IDogbmV3IEZsb2F0MzJBcnJheSgzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGdsLkZMT0FUX1ZFQzQ6XG4gICAgICAgIGdsRnVuY3Rpb24gPSBnbC51bmlmb3JtNGZ2O1xuICAgICAgICB0eXBlZEFycmF5ID0gaXNBcnJheSA/IEZsb2F0MzJBcnJheSA6IG5ldyBGbG9hdDMyQXJyYXkoNCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBnbC5JTlQ6Y2FzZSBnbC5CT09MOmNhc2UgZ2wuU0FNUExFUl8yRDpjYXNlIGdsLlNBTVBMRVJfQ1VCRTpcbiAgICAgICAgZ2xGdW5jdGlvbiA9IGdsLnVuaWZvcm0xaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGdsLklOVF9WRUMyOmNhc2UgZ2wuQk9PTF9WRUMyOlxuICAgICAgICBnbEZ1bmN0aW9uID0gZ2wudW5pZm9ybTJpdjtcbiAgICAgICAgdHlwZWRBcnJheSA9IGlzQXJyYXkgPyBVaW50MTZBcnJheSA6IG5ldyBVaW50MTZBcnJheSgyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGdsLklOVF9WRUMzOmNhc2UgZ2wuQk9PTF9WRUMzOlxuICAgICAgICBnbEZ1bmN0aW9uID0gZ2wudW5pZm9ybTNpdjtcbiAgICAgICAgdHlwZWRBcnJheSA9IGlzQXJyYXkgPyBVaW50MTZBcnJheSA6IG5ldyBVaW50MTZBcnJheSgzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGdsLklOVF9WRUM0OmNhc2UgZ2wuQk9PTF9WRUM0OlxuICAgICAgICBnbEZ1bmN0aW9uID0gZ2wudW5pZm9ybTRpdjtcbiAgICAgICAgdHlwZWRBcnJheSA9IGlzQXJyYXkgPyBVaW50MTZBcnJheSA6IG5ldyBVaW50MTZBcnJheSg0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGdsLkZMT0FUX01BVDI6XG4gICAgICAgIG1hdHJpeCA9IHRydWU7XG4gICAgICAgIGdsRnVuY3Rpb24gPSBnbC51bmlmb3JtTWF0cml4MmZ2O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZ2wuRkxPQVRfTUFUMzpcbiAgICAgICAgbWF0cml4ID0gdHJ1ZTtcbiAgICAgICAgZ2xGdW5jdGlvbiA9IGdsLnVuaWZvcm1NYXRyaXgzZnY7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBnbC5GTE9BVF9NQVQ0OlxuICAgICAgICBtYXRyaXggPSB0cnVlO1xuICAgICAgICBnbEZ1bmN0aW9uID0gZ2wudW5pZm9ybU1hdHJpeDRmdjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy9UT0RPKG5pY28pOiBTYWZhcmkgNS4xIGRvZXNuJ3QgaGF2ZSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5cbiAgLy9yZW1vdmUgdGhpcyBjaGVjayB3aGVuIHRoZXkgaW1wbGVtZW50IGl0LlxuICBpZiAoZ2xGdW5jdGlvbi5iaW5kKSB7XG4gICAgZ2xGdW5jdGlvbiA9IGdsRnVuY3Rpb24uYmluZChnbCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhcmdldCA9IGdsRnVuY3Rpb247XG4gICAgZ2xGdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRhcmdldC5hcHBseShnbCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgLy9TZXQgYSB1bmlmb3JtIGFycmF5XG4gIGlmIChpc0FycmF5ICYmIHR5cGVkQXJyYXkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgZ2xGdW5jdGlvbihsb2MsIG5ldyB0eXBlZEFycmF5KHZhbCkpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbiAgICB9O1xuXG4gICAgLy9TZXQgYSBtYXRyaXggdW5pZm9ybVxuICB9IGVsc2UgaWYgKG1hdHJpeCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgZ2xGdW5jdGlvbihsb2MsIGZhbHNlLCB2YWwpO1xuICAgICAgfTtcblxuICAgICAgLy9TZXQgYSB2ZWN0b3IvdHlwZWQgYXJyYXkgdW5pZm9ybVxuICAgIH0gZWxzZSBpZiAodHlwZWRBcnJheSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIHR5cGVkQXJyYXkuc2V0KHZhbC50b0Zsb2F0MzJBcnJheSA/IHZhbC50b0Zsb2F0MzJBcnJheSgpIDogdmFsKTtcbiAgICAgICAgICBnbEZ1bmN0aW9uKGxvYywgdHlwZWRBcnJheSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy9TZXQgYSBwcmltaXRpdmUtdmFsdWVkIHVuaWZvcm1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGdsRnVuY3Rpb24obG9jLCB2YWwpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAvLyBGSVhNRTogVW5yZWFjaGFibGUgY29kZVxuICB0aHJvdyBcIlVua25vd24gdHlwZTogXCIgKyB0eXBlO1xufVxuXG4vKipcclxuICogUmVwcmVzZW50cyBhIHNoYWRlciBwcm9ncmFtIGNvbnNpc3Rpbmcgb2YgYSB2ZXJ0ZXggc2hhZGVyIGFuZCBhIGZyYWdtZW50XHJcbiAqIHNoYWRlci5cclxuICogQGV4dGVuZHMge0dMQm91bmR9XHJcbiAqL1xuXG52YXIgUHJvZ3JhbSA9IChmdW5jdGlvbiAoX0dMQm91bmQpIHtcbiAgX2luaGVyaXRzKFByb2dyYW0sIF9HTEJvdW5kKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGEgcHJvZ3JhbSBmcm9tIHRoZSBnaXZlbiB2ZXJ0ZXggYW5kIGZyYWdtZW50IHNoYWRlciBzdHJpbmdzLlxyXG4gICAqXHJcbiAgICogTWFuYWdlcyB0aGUgc2hhZGVyJ3MgYXR0cmlidXRlcyBhbmQgdW5pZm9ybXMuXHJcbiAgICogQHBhcmFtICB7Y29udGV4dH0gZ2wgICAgICBXZWJnbCBjb250ZXh0XHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSB2ZXJ0ZXggICBWZXJ0ZXggc2hhZGVyXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBmcmFnbWVudCBGcmFnbWVudCBzaGFkZXJcclxuICAgKi9cblxuICBmdW5jdGlvbiBQcm9ncmFtKGdsLCB2ZXJ0ZXgsIGZyYWdtZW50KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFByb2dyYW0pO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoUHJvZ3JhbS5wcm90b3R5cGUpLCBcImNvbnN0cnVjdG9yXCIsIHRoaXMpLmNhbGwodGhpcywgZ2wpO1xuICAgIHRoaXMucHJvZ3JhbSA9IG51bGw7XG4gICAgdGhpcy52ZXJ0ZXhTb3VyY2UgPSBmaXhQcmVjaXNpb24odmVydGV4KTtcbiAgICB0aGlzLmZyYWdtZW50U291cmNlID0gZnJhZ21lbnQ7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG4gICAgdGhpcy51bmlmb3JtcyA9IHt9O1xuICB9XG5cbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgc2hhZGVyXHJcbiAgICpcclxuICAgKiBQYXJzZXMgb3V0IHNoYWRlciBwYXJhbWV0ZXJzLCBjb21waWxlcyB0aGUgc2hhZGVyLCBhbmQgYmluZHMgaXQgdG9cclxuICAgKiB0aGUgY29udGV4dC5cclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoUHJvZ3JhbSwgW3tcbiAgICBrZXk6IFwiaW5pdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdmFyIGdsID0gdGhpcy5fZ2wsXG4gICAgICAgICAgdmVydGV4LFxuICAgICAgICAgIGZyYWdtZW50O1xuICAgICAgdmVydGV4ID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xuICAgICAgZ2wuc2hhZGVyU291cmNlKHZlcnRleCwgdGhpcy52ZXJ0ZXhTb3VyY2UpO1xuICAgICAgZ2wuY29tcGlsZVNoYWRlcih2ZXJ0ZXgpO1xuICAgICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodmVydGV4LCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGdsLmdldFNoYWRlckluZm9Mb2codmVydGV4KSk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NvdWxkIG5vdCBjb21waWxlIHZlcnRleCBzaGFkZXI6ICcgKyB0aGlzLnZlcnRleFNvdXJjZSk7XG4gICAgICAgIHRocm93ICdWZXJ0ZXggc2hhZGVyIGNvbXBpbGUgZXJyb3IhJztcbiAgICAgIH1cbiAgICAgIGZyYWdtZW50ID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XG4gICAgICBnbC5zaGFkZXJTb3VyY2UoZnJhZ21lbnQsIHRoaXMuZnJhZ21lbnRTb3VyY2UpO1xuICAgICAgZ2wuY29tcGlsZVNoYWRlcihmcmFnbWVudCk7XG4gICAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihmcmFnbWVudCwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihnbC5nZXRTaGFkZXJJbmZvTG9nKGZyYWdtZW50KSk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NvdWxkIG5vdCBjb21waWxlIGZyYWdtZW50IHNoYWRlcjogJyArIHRoaXMuZnJhZ21lbnRTb3VyY2UpO1xuICAgICAgICB0aHJvdyAnRnJhZ21lbnQgc2hhZGVyIGNvbXBpbGUgZXJyb3IhJztcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJvZ3JhbSwgdmVydGV4KTtcbiAgICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLnByb2dyYW0sIGZyYWdtZW50KTtcblxuICAgICAgZ2wubGlua1Byb2dyYW0odGhpcy5wcm9ncmFtKTtcblxuICAgICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICAgIC8vIFRPRE86IHZlcmJvc2UgbGlrZSBhYm92ZVxuICAgICAgICB0aHJvdyAnQ291bGQgbm90IGxpbmsgcHJvZ3JhbSc7XG4gICAgICB9XG4gICAgICBnbC51c2VQcm9ncmFtKHRoaXMucHJvZ3JhbSk7XG5cbiAgICAgIHRoaXMuX3NldHVwTG9jYXRpb25zKCk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBVc2UgdGhlIHByb2dyYW0gd2l0aCB0aGUgZ2l2ZW4gZHJhdyBmdW5jdGlvblxyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGhhbmRsZSB0aGUgYWN0dWFsIGRyYXdpbmcuXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgVGhlIHByb2dyYW1zIGF0dHJpYnV0ZXMgYW5kIHVuaWZvcm1zIHdpbGxcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICBiZSBwYXNzZWQgdG8gdGhlIGRyYXcgZnVuY3Rpb24gZm9yIHVzZS5cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiBcInVzZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1c2UoZm4pIHtcbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgaWYgKCF0aGlzLnByb2dyYW0pIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnbC51c2VQcm9ncmFtKHRoaXMucHJvZ3JhbSk7XG4gICAgICB9XG4gICAgICBmbih0aGlzLmF0dHJpYnV0ZXMsIHRoaXMudW5pZm9ybXMpO1xuICAgICAgLy9nbC51c2VQcm9ncmFtKDApO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfc2V0dXBMb2NhdGlvbnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldHVwTG9jYXRpb25zKCkge1xuICAgICAgdmFyIGdsID0gdGhpcy5fZ2wsXG4gICAgICAgICAgcHJvZ3JhbSA9IHRoaXMucHJvZ3JhbTtcbiAgICAgIC8vIHRoaXMgaXMgdGFrZW4gcGFydGx5IGZyb20gUGhpbG9HTCdzIFByb2dyYW0gY2xhc3MuXG4gICAgICAvL2ZpbGwgYXR0cmlidXRlIGxvY2F0aW9uc1xuICAgICAgdmFyIGxlbiA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX0FUVFJJQlVURVMpLFxuICAgICAgICAgIGluZm8sXG4gICAgICAgICAgbmFtZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaW5mbyA9IGdsLmdldEFjdGl2ZUF0dHJpYihwcm9ncmFtLCBpKTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzW2luZm8ubmFtZV0gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBpbmZvLm5hbWUpO1xuICAgICAgfVxuXG4gICAgICAvL2NyZWF0ZSB1bmlmb3JtIHNldHRlcnNcbiAgICAgIGxlbiA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX1VOSUZPUk1TKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpbmZvID0gZ2wuZ2V0QWN0aXZlVW5pZm9ybShwcm9ncmFtLCBpKTtcbiAgICAgICAgbmFtZSA9IGluZm8ubmFtZTtcbiAgICAgICAgLy9pZiBhcnJheSBuYW1lIHRoZW4gY2xlYW4gdGhlIGFycmF5IGJyYWNrZXRzXG4gICAgICAgIG5hbWUgPSBuYW1lW25hbWUubGVuZ3RoIC0gMV0gPT0gJ10nID8gbmFtZS5zdWJzdHIoMCwgbmFtZS5sZW5ndGggLSAzKSA6IG5hbWU7XG4gICAgICAgIHRoaXMudW5pZm9ybXNbbmFtZV0gPSBnZXRVbmlmb3JtU2V0dGVyKGdsLCBwcm9ncmFtLCBpbmZvLCBpbmZvLm5hbWUgIT0gbmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFByb2dyYW07XG59KShfZ2xCb3VuZDJbXCJkZWZhdWx0XCJdKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBQcm9ncmFtOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9wcm9ncmFtID0gcmVxdWlyZSgnLi4vcHJvZ3JhbScpO1xuXG52YXIgX3Byb2dyYW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvZ3JhbSk7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcclxuICogQSBHbG93cmFtcFByb2dyYW0gaXMgYSBwcm9ncmFtIG1lYW50IGZvciBkcmF3aW5nXHJcbiAqIHRyYW5zcGFyZW50IGdsb3dyYW1wIGRyYXdhYmxlc1xyXG4gKlxyXG4gKiBAZXh0ZW5kcyB7UHJvZ3JhbX1cclxuICovXG5cbnZhciBHbG93cmFtcFByb2dyYW0gPSAoZnVuY3Rpb24gKF9Qcm9ncmFtKSB7XG4gIF9pbmhlcml0cyhHbG93cmFtcFByb2dyYW0sIF9Qcm9ncmFtKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGEgR2xvd3JhbXAgcHJvZ3JhbSBnaXZlbiB2ZXJ0ZXggYW5kIGZyYWdtZW50IHNoYWRlciBzb3VyY2VzXHJcbiAgICogQHBhcmFtICB7Y29udGV4dH0gZ2wgICAgICBXZWJHTCBjb250ZXh0XHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSB2ZXJ0ZXggICBWZXJ0ZXggc2hhZGVyIHNvdXJjZVxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gZnJhZ21lbnQgRnJhZ21lbnQgc2hhZGVyIHNvdXJjZVxyXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEdsb3dyYW1wUHJvZ3JhbShnbCwgdmVydGV4LCBmcmFnbWVudCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBHbG93cmFtcFByb2dyYW0pO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoR2xvd3JhbXBQcm9ncmFtLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZ2wsIHZlcnRleCwgZnJhZ21lbnQpO1xuICB9XG5cbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgcHJvZ3JhbSB0byBkcmF3XHJcbiAgICpcclxuICAgKiBTZXRzIHVwIHRoZSBwcm9wZXIgYmxlbmRpbmcgbW9kZXMsIGV0Y1xyXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiBUaGUgZHJhdyBmdW5jdGlvblxyXG4gICAqL1xuXG4gIF9jcmVhdGVDbGFzcyhHbG93cmFtcFByb2dyYW0sIFt7XG4gICAga2V5OiAndXNlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXNlKGZuKSB7XG4gICAgICBpZiAoIXRoaXMucHJvZ3JhbSkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgIH1cbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xuICAgICAgLy8gaW5pdCBzdHVmZnMuXG4gICAgICBnbC5kaXNhYmxlKGdsLkNVTExfRkFDRSk7XG4gICAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgICAgZ2wuZGVwdGhNYXNrKGZhbHNlKTtcbiAgICAgIGdsLmJsZW5kRXF1YXRpb24oZ2wuRlVOQ19BREQpO1xuICAgICAgLy9nbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgICAgIGdsLmJsZW5kRnVuY1NlcGFyYXRlKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSwgZ2wuT05FLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcblxuICAgICAgZm4odGhpcy5hdHRyaWJ1dGVzLCB0aGlzLnVuaWZvcm1zKTtcblxuICAgICAgKDAsIF91dGlscy5yZXNldEdMKShnbCk7XG4gICAgICAvL2dsLnVzZVByb2dyYW0oMCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEdsb3dyYW1wUHJvZ3JhbTtcbn0pKF9wcm9ncmFtMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gR2xvd3JhbXBQcm9ncmFtO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX3Byb2dyYW0gPSByZXF1aXJlKCcuLi9wcm9ncmFtJyk7XG5cbnZhciBfcHJvZ3JhbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9ncmFtKTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxyXG4gKiBBbmQgT3BhcXVlUHJvZ3JhbSBpcyBhIFByb2dyYW0gdXNlZCB0byBkcmF3IG9wYXF1ZSBkcmF3YWJsZXNcclxuICpcclxuICogQGV4dGVuZHMge1Byb2dyYW19XHJcbiAqL1xuXG52YXIgT3BhcXVlUHJvZ3JhbSA9IChmdW5jdGlvbiAoX1Byb2dyYW0pIHtcbiAgX2luaGVyaXRzKE9wYXF1ZVByb2dyYW0sIF9Qcm9ncmFtKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYW4gb3BhcXVlIHByb2dyYW0gZ2l2ZW4gdmVydGV4IGFuZCBmcmFnbWVudCBzaGFkZXJcclxuICAgKiBzb3VyY2VzLlxyXG4gICAqIEBwYXJhbSAge2NvbnRleHR9IGdsICAgICAgV2ViR0wgY29udGV4dFxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdmVydGV4ICAgVmVydGV4IHNoYWRlciBzb3VyY2VcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IGZyYWdtZW50IEZyYWdtZW50IHNoYWRlciBzb3VyY2VcclxuICAgKi9cblxuICBmdW5jdGlvbiBPcGFxdWVQcm9ncmFtKGdsLCB2ZXJ0ZXgsIGZyYWdtZW50KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE9wYXF1ZVByb2dyYW0pO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoT3BhcXVlUHJvZ3JhbS5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsLCB2ZXJ0ZXgsIGZyYWdtZW50KTtcbiAgfVxuXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIHByb2dyYW0gdG8gZHJhdy5cclxuICAgKlxyXG4gICAqIFNldHMgdXAgdGhlIHByb3BlciBjdWxsaW5nIGZvciBkcmF3aW5nIG9wYXF1ZSBvYmplY3RzXHJcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuIFRoZSBkcmF3IGZ1bmN0aW9uXHJcbiAgICovXG5cbiAgX2NyZWF0ZUNsYXNzKE9wYXF1ZVByb2dyYW0sIFt7XG4gICAga2V5OiAndXNlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXNlKGZuKSB7XG4gICAgICBpZiAoIXRoaXMucHJvZ3JhbSkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgIH1cbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xuICAgICAgLy8gaW5pdCBzdHVmZnMuXG4gICAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgICBnbC5lbmFibGUoZ2wuQ1VMTF9GQUNFKTtcbiAgICAgIGdsLmZyb250RmFjZShnbC5DQ1cpO1xuICAgICAgZ2wuY3VsbEZhY2UoZ2wuQkFDSyk7XG4gICAgICBnbC5kZXB0aE1hc2sodHJ1ZSk7XG5cbiAgICAgIGZuKHRoaXMuYXR0cmlidXRlcywgdGhpcy51bmlmb3Jtcyk7XG5cbiAgICAgICgwLCBfdXRpbHMucmVzZXRHTCkoZ2wpO1xuICAgICAgLy9nbC51c2VQcm9ncmFtKDApO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBPcGFxdWVQcm9ncmFtO1xufSkoX3Byb2dyYW0yWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBPcGFxdWVQcm9ncmFtO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2dsQm91bmQgPSByZXF1aXJlKCcuL2dsLWJvdW5kJyk7XG5cbnZhciBfZ2xCb3VuZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nbEJvdW5kKTtcblxudmFyIF9nbE1hdHJpeCA9IHJlcXVpcmUoJ2dsLW1hdHJpeCcpO1xuXG4vKipcclxuICogLi4uIEluIHJldHJvc3BlY3QsIEknbSBub3Qgc3VyZSBleGFjdGx5IHRoZSBwdXJwb3NlIHRoaXMgY2xhc3Mgc2VydmVzXHJcbiAqIEl0IHNlZW1zIHRoYXQgT2JqZWN0UmVuZGVyZXIgaW5oZXJpdHMgZnJvbSB0aGlzIGNsYXNzLCBidXQgaXQncyBhbHNvXHJcbiAqIHRoZSBvbmx5IHJlbmRlcmVyIHRoYXQncyBjdXJyZW50bHkgdXNlZC5cclxuICogVE9ETzogUmV2aXNpdCB0aGlzXHJcbiAqIEBleHRlbmRzIHtHTEJvdW5kfVxyXG4gKi9cblxudmFyIFJlbmRlcmVyID0gKGZ1bmN0aW9uIChfR0xCb3VuZCkge1xuICBfaW5oZXJpdHMoUmVuZGVyZXIsIF9HTEJvdW5kKTtcblxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSByZW5kZXJlciBnaXZlbiBhIGNvbnRleHQgYW5kIGEgbWFuYWdlclxyXG4gICAqIEBwYXJhbSAge2NvbnRleHR9IGdsICAgICAgICAgICBBIFdlYkdMIGNvbnRleHRcclxuICAgKiBAcGFyYW0gIHtBc3NldE1hbmFnZXJ9IG1hbmFnZXIgQW4gQXNzZXRNYW5hZ2VyIHRvIG1hbmFnZSBHTC1ib3VuZFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZXNcclxuICAgKi9cblxuICBmdW5jdGlvbiBSZW5kZXJlcihnbCwgbWFuYWdlcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZW5kZXJlcik7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihSZW5kZXJlci5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGdsKTtcbiAgICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xuICAgIHRoaXMudmlld1Byb2plY3QgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICB0aGlzLnZpZXcgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICB0aGlzLnByb2plY3QgPSBfZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcbiAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICB9XG5cbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBpbnRlcm5hbCB2aWV3IGFuZCBwcm9qZWN0aW9uIG1hdHJpY2VzXHJcbiAgICogQHBhcmFtICB7bWF0NH0gdmlldyAgICBWaWV3IG1hdHJpeFxyXG4gICAqIEBwYXJhbSAge21hdDR9IHByb2plY3QgUHJvamVjdGlvbiBtYXRyaXhcclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoUmVuZGVyZXIsIFt7XG4gICAga2V5OiAndXBkYXRlVmlldycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVZpZXcoY2FtZXJhKSB7XG4gICAgICB0aGlzLnZpZXcgPSBjYW1lcmEudmlldztcbiAgICAgIHRoaXMucHJvamVjdCA9IGNhbWVyYS5wcm9qZWN0O1xuICAgICAgX2dsTWF0cml4Lm1hdDQubXVsdGlwbHkodGhpcy52aWV3UHJvamVjdCwgdGhpcy5wcm9qZWN0LCB0aGlzLnZpZXcpO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogQWN0dWFsbHkgY29udHJvbHMgdGhlIHJlbmRlciBsb29wP1xyXG4gICAgICovXG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJiYXNlIGNsYXNzIHJlbmRlcnMgbm90aGluZy5cIik7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBpbnRlcm5hbCBjb3VudGVyIG9mIGVsYXBzZWQgdGltZS5cclxuICAgICAqIEBwYXJhbSAge051bWJlcn0gZGVsdGEgVGltZSBlbGFwc2VkIHNpbmNlIGxhc3QgcmVuZGVyIGNhbGxcclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAndXBkYXRlVGltZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVRpbWUoZGVsdGEpIHtcbiAgICAgIHRoaXMuZWxhcHNlZCArPSBkZWx0YTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUmVuZGVyZXI7XG59KShfZ2xCb3VuZDJbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFJlbmRlcmVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQoX3gsIF94MiwgX3gzKSB7IHZhciBfYWdhaW4gPSB0cnVlOyBfZnVuY3Rpb246IHdoaWxlIChfYWdhaW4pIHsgdmFyIG9iamVjdCA9IF94LCBwcm9wZXJ0eSA9IF94MiwgcmVjZWl2ZXIgPSBfeDM7IGRlc2MgPSBwYXJlbnQgPSBnZXR0ZXIgPSB1bmRlZmluZWQ7IF9hZ2FpbiA9IGZhbHNlOyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgX3ggPSBwYXJlbnQ7IF94MiA9IHByb3BlcnR5OyBfeDMgPSByZWNlaXZlcjsgX2FnYWluID0gdHJ1ZTsgY29udGludWUgX2Z1bmN0aW9uOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfSB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX3JlbmRlcmVyID0gcmVxdWlyZSgnLi4vcmVuZGVyZXInKTtcblxudmFyIF9yZW5kZXJlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZW5kZXJlcik7XG5cbnZhciBfZHJhd2FibGUgPSByZXF1aXJlKCcuLi9kcmF3YWJsZScpO1xuXG52YXIgX2RyYXdhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYXdhYmxlKTtcblxuLy8gVE9ETyByZXdvcmsgdGhpcy5cblxudmFyIE9iamVjdFJlbmRlcmVyID0gKGZ1bmN0aW9uIChfUmVuZGVyZXIpIHtcbiAgX2luaGVyaXRzKE9iamVjdFJlbmRlcmVyLCBfUmVuZGVyZXIpO1xuXG4gIGZ1bmN0aW9uIE9iamVjdFJlbmRlcmVyKGdsLCBtYW5hZ2VyKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE9iamVjdFJlbmRlcmVyKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdFJlbmRlcmVyLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgZ2wsIG1hbmFnZXIpO1xuICAgIHRoaXMuZHJhd2FibGVzID0gW107XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoT2JqZWN0UmVuZGVyZXIsIFt7XG4gICAga2V5OiAnYWRkRHJhd2FibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGREcmF3YWJsZShkcmF3YWJsZSkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgaWYgKCFkcmF3YWJsZSBpbnN0YW5jZW9mIF9kcmF3YWJsZTJbJ2RlZmF1bHQnXSkge1xuICAgICAgICB0aHJvdyAnRHJhd2FibGVzIG11c3QgYWx3YXlzIGluaGVyaXQgZnJvbSB0aGUgYmFzZSBEcmF3YWJsZSc7XG4gICAgICB9XG4gICAgICBpZiAoIWRyYXdhYmxlLmluaXQodGhpcy5tYW5hZ2VyKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ2NvdWxkIG5vdCBpbml0aWFsaXplIGRyYXdhYmxlOiAnLCBkcmF3YWJsZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChkcmF3YWJsZS51cGRhdGVWaWV3KSB7XG4gICAgICAgIGRyYXdhYmxlLnVwZGF0ZVZpZXcodGhpcy52aWV3UHJvamVjdCwgbnVsbCk7XG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdhYmxlcy5wdXNoKGRyYXdhYmxlKTtcbiAgICAgIGRyYXdhYmxlLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgX3RoaXMuYWRkRHJhd2FibGUoYyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW1vdmVEcmF3YWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZURyYXdhYmxlKGRyYXdhYmxlLCBkZXN0cm95KSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZHJhd2FibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYXdhYmxlc1tpXSA9PT0gZHJhd2FibGUpIHtcbiAgICAgICAgICB0aGlzLmRyYXdhYmxlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgaWYgKGRlc3Ryb3kpIHtcbiAgICAgICAgICAgIGRyYXdhYmxlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZHJhd2FibGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnYWRkRW50aXR5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWRkRW50aXR5KGVudGl0eSkge1xuICAgICAgZm9yICh2YXIgaSBpbiBlbnRpdHkuZHJhd2FibGVzKSB7XG4gICAgICAgIHRoaXMuYWRkRHJhd2FibGUoZW50aXR5LmRyYXdhYmxlc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlVmlldycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVZpZXcoY2FtZXJhKSB7XG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihPYmplY3RSZW5kZXJlci5wcm90b3R5cGUpLCAndXBkYXRlVmlldycsIHRoaXMpLmNhbGwodGhpcywgY2FtZXJhKTtcbiAgICAgIHZhciBpLFxuICAgICAgICAgIGxlbiA9IHRoaXMuZHJhd2FibGVzLmxlbmd0aDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAodGhpcy5kcmF3YWJsZXNbaV0udXBkYXRlVmlldykge1xuICAgICAgICAgIHRoaXMuZHJhd2FibGVzW2ldLnVwZGF0ZVZpZXcodGhpcy52aWV3UHJvamVjdCwgY2FtZXJhKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBpLFxuICAgICAgICAgIGxlbiA9IHRoaXMuZHJhd2FibGVzLmxlbmd0aDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB0aGlzLmRyYXdhYmxlc1tpXS5kcmF3KCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlVGltZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVRpbWUoZGVsdGEpIHtcbiAgICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdFJlbmRlcmVyLnByb3RvdHlwZSksICd1cGRhdGVUaW1lJywgdGhpcykuY2FsbCh0aGlzLCBkZWx0YSk7XG4gICAgICB2YXIgaSxcbiAgICAgICAgICBsZW4gPSB0aGlzLmRyYXdhYmxlcy5sZW5ndGg7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgLy8gaWYgdGhlc2UgcmV0dXJuIGZhbHNlLCByZW1vdmUgdGhlbSBmcm9tIHRoZSByZW5kZXIgbG9vcDpcbiAgICAgICAgaWYgKCF0aGlzLmRyYXdhYmxlc1tpXS51cGRhdGVUaW1lKGRlbHRhKSkge1xuICAgICAgICAgIHRoaXMuZHJhd2FibGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBpLS07XG4gICAgICAgICAgbGVuLS07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gT2JqZWN0UmVuZGVyZXI7XG59KShfcmVuZGVyZXIyWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBPYmplY3RSZW5kZXJlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIF9nbEJvdW5kID0gcmVxdWlyZSgnLi9nbC1ib3VuZCcpO1xuXG52YXIgX2dsQm91bmQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2xCb3VuZCk7XG5cbi8qKlxyXG4gKiBBIGdsLWJvdW5kIHRleHR1cmVcclxuICogU3VwcG9ydHMgbW9zdCAoYWxsPykgb2YgdGhlIHRleHR1cmUgYmluZGluZyBvcHRpb25zLlxyXG4gKiBBbHNvIGdlbmVyYXRlcyBtaXBtYXBzIGlmIHRoZSB0ZXh0dXJlIHJlcXVpcmVzIGl0LlxyXG4gKi9cblxudmFyIFRleHR1cmUgPSAoZnVuY3Rpb24gKF9HTEJvdW5kKSB7XG4gIF9pbmhlcml0cyhUZXh0dXJlLCBfR0xCb3VuZCk7XG5cbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhIGdsLWJvdW5kIHRleHR1cmUsIHNldHMgYWxsIHRoZSBwcm9wZXIgcGFyYW1ldGVycywgYW5kIGJpbmRzXHJcbiAgICogaXQgdG8gdGhlIGNvbnRleHRcclxuICAgKiBAcGFyYW0gIHtjb250ZXh0fSBnbCAgIEEgV2ViR0wgY29udGV4dFxyXG4gICAqIEBwYXJhbSAge09iamVjdH0gaW5mbyAgVGV4dHVyZSBwYXJhbWV0ZXJzXHJcbiAgICogQHBhcmFtICB7SW1hZ2VzfSBpbWFnZSBBbiBpbWFnZSB0byB1c2UgYXMgdGhlIHRleHR1cmVcclxuICAgKi9cblxuICBmdW5jdGlvbiBUZXh0dXJlKGdsLCBpbmZvLCBpbWFnZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUZXh0dXJlKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFRleHR1cmUucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBnbCk7XG4gICAgdGhpcy5pbmZvID0gaW5mbztcbiAgICB2YXIgbWFwID0ge1xuICAgICAgJ01pcE1hcExpbmVhckxpbmVhcic6IGdsLkxJTkVBUl9NSVBNQVBfTElORUFSLFxuICAgICAgJ0xpbmVhcic6IGdsLkxJTkVBUixcbiAgICAgICdNaXBNYXBMaW5lYXJOZWFyZXN0JzogZ2wuTElORUFSX01JUE1BUF9ORUFSRVNULFxuICAgICAgJ01pcE1hcE5lYXJlc3RMaW5lYXInOiBnbC5ORUFSRVNUX01JUE1BUF9MSU5FQVIsXG4gICAgICAnUmVwZWF0JzogZ2wuUkVQRUFULFxuICAgICAgJ0NsYW1wVG9FZGdlJzogZ2wuQ0xBTVBfVE9fRURHRVxuICAgIH07XG4gICAgdmFyIHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIG1hcFtpbmZvLm1pbkZpbHRlcl0pO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBtYXBbaW5mby5tYWdGaWx0ZXJdKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBtYXBbaW5mby53cmFwU10pO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIG1hcFtpbmZvLndyYXBUXSk7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBpbWFnZSk7XG4gICAgaWYgKC9NaXBNYXAvLnRlc3QoaW5mby5taW5GaWx0ZXIpKSB7XG4gICAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcbiAgICB9XG5cbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcblxuICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XG4gIH1cblxuICAvKipcclxuICAgKiBCaW5kIHRoZSB0ZXh0dXJlIHRvIGEgcGFydGljdWxhciB0ZXh0dXJlIGluZGV4XHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSBpbmRleCBUZXh0dXJlIGluZGV4IHRvIGJpbmQgdG9cclxuICAgKi9cblxuICBfY3JlYXRlQ2xhc3MoVGV4dHVyZSwgW3tcbiAgICBrZXk6ICd1c2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1c2UoaW5kZXgpIHtcbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgaW5kZXggPSBpbmRleCB8fCAwO1xuICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy50ZXh0dXJlKTtcbiAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyBpbmRleCk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBOWUk6IFRPRE9cclxuICAgICAqL1xuICB9LCB7XG4gICAga2V5OiAnZGlzcG9zZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAvLyBUT0RPOiBGaWd1cmUgb3V0IHdoZW4gdGhpcyBzaG91bGQgYmUgY2FsbGVkLlxuICAgICAgLy8gbm9vcDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVGV4dHVyZTtcbn0pKF9nbEJvdW5kMlsnZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gVGV4dHVyZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KF94LCBfeDIsIF94MykgeyB2YXIgX2FnYWluID0gdHJ1ZTsgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7IHZhciBvYmplY3QgPSBfeCwgcHJvcGVydHkgPSBfeDIsIHJlY2VpdmVyID0gX3gzOyBkZXNjID0gcGFyZW50ID0gZ2V0dGVyID0gdW5kZWZpbmVkOyBfYWdhaW4gPSBmYWxzZTsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IF94ID0gcGFyZW50OyBfeDIgPSBwcm9wZXJ0eTsgX3gzID0gcmVjZWl2ZXI7IF9hZ2FpbiA9IHRydWU7IGNvbnRpbnVlIF9mdW5jdGlvbjsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH0gfTtcblxuZXhwb3J0cy5yZXNldEdMID0gcmVzZXRHTDtcbmV4cG9ydHMuc2V0UGFyYW1zID0gc2V0UGFyYW1zO1xuZXhwb3J0cy5kaXNjbyA9IGRpc2NvO1xuZXhwb3J0cy5nZW5lcmF0ZUFydGlmYWN0cyA9IGdlbmVyYXRlQXJ0aWZhY3RzO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX2NvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbnZhciBfY29uc3RhbnRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnN0YW50cyk7XG5cbnZhciBfZHJhd2FibGVUZXh0dXJlZCA9IHJlcXVpcmUoJy4vZHJhd2FibGUvdGV4dHVyZWQnKTtcblxudmFyIF9kcmF3YWJsZVRleHR1cmVkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RyYXdhYmxlVGV4dHVyZWQpO1xuXG4vKipcclxuICogUmVzZXQgdGhlIEdMIHN0YXRlIHRvIHNvbWUgYmFzZSBzdGF0ZVxyXG4gKiBAcGFyYW0gIHtjb250ZXh0fSBnbCBBIFdlYkdMIGNvbnRleHRcclxuICovXG5cbmZ1bmN0aW9uIHJlc2V0R0woZ2wpIHtcbiAgZ2wubGluZVdpZHRoKDEuMCk7XG4gIGdsLmVuYWJsZShnbC5DVUxMX0ZBQ0UpO1xuICBnbC5mcm9udEZhY2UoZ2wuQ0NXKTtcbiAgZ2wuY3VsbEZhY2UoZ2wuQkFDSyk7XG4gIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcbiAgZ2wuYmxlbmRFcXVhdGlvbihnbC5GVU5DX0FERCk7XG4gIC8vZ2wuYmxlbmRGdW5jKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gIGdsLmJsZW5kRnVuY1NlcGFyYXRlKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSwgZ2wuT05FLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgZ2wuZGlzYWJsZShnbC5CTEVORCk7XG4gIGdsLmRlcHRoTWFzayh0cnVlKTtcbn1cblxuLyoqXHJcbiAqIFNldCBwYXJhbWV0ZXJzIGJhc2Ugb24gc29tZSBiYXNlIHNldCBvZiBkZWZhdWx0c1xyXG4gKiBAcGFyYW0ge09iamVjdH0gYmFzZSAgUGFyYW1ldGVyIGRlZmluaXRpb24gd2l0aCBkZWZhdWx0c1xyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyAgT3B0aW9ucyAob3ZlcnJpZGVzKVxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGRlZXAgRG8gZGVlcCBjb3B5aW5nIG9uIG9iamVjdHMuXHJcbiAqL1xuXG5mdW5jdGlvbiBzZXRQYXJhbXMoYmFzZSwgb3B0cywgZGVlcCkge1xuICBmb3IgKHZhciBpIGluIGJhc2UpIHtcbiAgICBpZiAoYmFzZS5oYXNPd25Qcm9wZXJ0eShpKSAmJiBvcHRzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICBpZiAoZGVlcCAmJiB0eXBlb2YgYmFzZVtpXSA9PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb3B0c1tpXSA9PSAnb2JqZWN0Jykge1xuICAgICAgICBiYXNlW2ldID0gc2V0UGFyYW1zKGJhc2VbaV0sIG9wdHNbaV0sIGRlZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYmFzZVtpXSA9IG9wdHNbaV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBiYXNlO1xufVxuXG4vKipcclxuICogRGlzY28gcG9ydGFsIGFuaW1hdGlvblxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IGRlbHRhICAgVGltZSBzaW5jZSBsYXN0IGZyYW1lXHJcbiAqIEBwYXJhbSAge051bWJlcn0gZWxhcHNlZCBUb3RhbCB0aW1lIGVsYXBzZWRcclxuICogQHJldHVybiB7Qm9vbGVhbn0gICAgICAgIFJldHVybnMgdHJ1ZSB0byBjb250aW51ZSBhbmltYXRpb25cclxuICovXG5cbmZ1bmN0aW9uIGRpc2NvKGRlbHRhLCBlbGFwc2VkKSB7XG4gIHZhciBpbmMgPSBlbGFwc2VkIC8gMTAwMDtcbiAgdGhpcy51bmlmb3Jtcy51X2Jhc2VDb2xvclswXSA9IE1hdGguc2luKGluYyk7XG4gIHRoaXMudW5pZm9ybXMudV9iYXNlQ29sb3JbMV0gPSBNYXRoLnNpbihpbmMgKyAyICogTWF0aC5QSSAvIDMpO1xuICB0aGlzLnVuaWZvcm1zLnVfYmFzZUNvbG9yWzJdID0gTWF0aC5zaW4oaW5jICsgNCAqIE1hdGguUEkgLyAzKTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIG1ha2VBcnRpZmFjdChtZXNoTmFtZSwgdGV4dHVyZU5hbWUpIHtcbiAgdmFyIGFydGlmYWN0ID0gKGZ1bmN0aW9uIChfVGV4dHVyZWREcmF3YWJsZSkge1xuICAgIF9pbmhlcml0cyhhcnRpZmFjdCwgX1RleHR1cmVkRHJhd2FibGUpO1xuXG4gICAgZnVuY3Rpb24gYXJ0aWZhY3QoKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgYXJ0aWZhY3QpO1xuXG4gICAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihhcnRpZmFjdC5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIF9jb25zdGFudHMyWydkZWZhdWx0J10uUHJvZ3JhbS5UZXh0dXJlZCwgbWVzaE5hbWUsIHRleHR1cmVOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJ0aWZhY3Q7XG4gIH0pKF9kcmF3YWJsZVRleHR1cmVkMlsnZGVmYXVsdCddKTtcblxuICByZXR1cm4gYXJ0aWZhY3Q7XG59XG5cbi8qKlxyXG4gKiBHZW5lcmF0ZSBhIHNldCBvZiBhcnRpZmFjdHNcclxuICogQHBhcmFtICB7U3RyaW5nfSAgc2VyaWVzICAgIFNlcmllcyBuYW1lXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaG91bGQgbWF0Y2ggdGhlIGludGVybmFsIG5hbWUgb2YgdGhlIHJlc291cmNlc1xyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9ICBudW0gICAgICAgTnVtYmVyIG9mIGFydGlmYWN0cyBpbiB0aGUgc2VyaWVzXHJcbiAqIEBwYXJhbSAge0Jvb2xlYW59IGhhc0Zyb3plbiBXaGV0aGVyIG9yIG5vdCB0aGUgc2VyaWVzIGFsc28gaW5jbHVkZXMgZnJvemVuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50c1xyXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgT2JqZWN0IGNvbnRhaW5pbmcgYXJ0aWZhY3QgZHJhd2FibGUgY2xhc3Nlc1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIGVhY2ggYXJ0aWZhY3QuXHJcbiAqL1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUFydGlmYWN0cyhzZXJpZXMsIG51bSwgaGFzRnJvemVuKSB7XG4gIHZhciBpLFxuICAgICAgbWVzaE5hbWUsXG4gICAgICB0ZXh0dXJlTmFtZSA9ICdBcnRpZmFjdCcgKyBzZXJpZXMgKyAnVGV4dHVyZSc7XG5cbiAgdmFyIGFydGlmYWN0cyA9IHt9O1xuXG4gIGZvciAoaSA9IDE7IGkgPD0gbnVtOyBpKyspIHtcbiAgICBtZXNoTmFtZSA9IHNlcmllcyArIGk7XG4gICAgYXJ0aWZhY3RzWycnICsgaV0gPSBtYWtlQXJ0aWZhY3QobWVzaE5hbWUsIHRleHR1cmVOYW1lKTtcbiAgfVxuICBpZiAoaGFzRnJvemVuKSB7XG4gICAgZm9yIChpID0gMTsgaSA8PSBudW07IGkrKykge1xuICAgICAgbWVzaE5hbWUgPSBzZXJpZXMgKyAnRnJvemVuJyArIGk7XG4gICAgICBhcnRpZmFjdHNbJ0Zyb3plbicgKyBpXSA9IG1ha2VBcnRpZmFjdChtZXNoTmFtZSwgdGV4dHVyZU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhcnRpZmFjdHM7XG59IiwiLyoqXHJcbiAqIEEgdmVydGV4IGF0dHJpYnV0ZVxyXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgVmVydGV4QXR0cmlidXRlID1cbi8qKlxyXG4gKiBBIHZlcnRleCBhdHRyaWJ1dGVcclxuICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIGF0dHJpYnV0ZVxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IHNpemUgU2l6ZSBvZiB0aGUgYXR0cmlidXRlIChpbiBieXRlcylcclxuICovXG5mdW5jdGlvbiBWZXJ0ZXhBdHRyaWJ1dGUobmFtZSwgc2l6ZSkge1xuICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVmVydGV4QXR0cmlidXRlKTtcblxuICB0aGlzLm5hbWUgPSBuYW1lO1xuICB0aGlzLnNpemUgPSBzaXplO1xufTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBWZXJ0ZXhBdHRyaWJ1dGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyJdfQ==
