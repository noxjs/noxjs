/**
* Returns the last index of the array, which is the callback
*
* @method getCallback
* @param {Array} arr The array of arguments
* @return {Function} Returns callback
*/
(function(global, Nox) {
  'use strict';
  Nox.methods = Nox.methods || {};

  Nox.methods.getCallback = function(arr) {
    return arr.pop();
  };
} (this, this.Nox));
