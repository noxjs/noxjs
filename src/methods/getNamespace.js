/**
* Returns the first index of the array, which is the namespace
*
* @method getNamespace
* @param {Array} arr The array of arguments
* @return {String} Returns the string of the namespace
*/
(function(global, Nox) {
  'use strict';
  Nox.methods = Nox.methods || {};

  Nox.methods.getNamespace = function(arr) {
    var namespace = arr.shift();

    // checks if the string is only a number, or if it starts with a number
    if(!isNaN(namespace) || !isNaN(namespace.substring(0, 1))) {
      throw new Error('First parameter can\'t be a number or start with a number');
    }

    return namespace;
  };
} (this, this.Nox));
