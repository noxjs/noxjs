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

    if(typeof namespace !== 'string') {
      throw new Error('First parameter must be a string');
    }

    namespace = namespace.split('.');

    // checks if the string is only a number, or if it starts with a number
    for(var i = 0; i < namespace.length; i += 1) {
      if(!/(^[a-z])|(^[A-Z])|(^\$)|(^\_)/.test(namespace[i])) {
        throw new Error('The namespace must contain only valid variables');
      }
    }

    return namespace.join('.');
  };
} (this, this.Nox));
