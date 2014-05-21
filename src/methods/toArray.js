/**
* converts an Array-like to an Array
*
* @method toArray
* @param {Object} obj The object which will be converted
* @return {Array} Returns the converted Array
*/
(function(global, Nox) {
  'use strict';
  Nox.methods = Nox.methods || {};

  Nox.methods.toArray = function(obj) {
    return Array.prototype.slice.call(obj);
  };
} (this, this.Nox));
