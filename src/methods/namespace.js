/**
* Creates an structure of objects in the global
* namespace
*
* @method namespace
* @param {String} ns_string The string which will be
* converted into objects, must be separated with dots
* @return {Object} Returns the last but one index, and
* the name of the last index
*/
(function(global, Nox) {
  'use strict';
  Nox.methods = Nox.methods || {};

  Nox.methods.namespace = function(ns_string) {
    if(!ns_string || typeof ns_string !== 'string') {
      throw new Error('You need to pass a string');
    }

    var parts = ns_string.split('.'),
      parent = global,
      length = parts.length,
      i;

    for(i = 0; i < length; i += 1) {
      if(i + 1 === length) {
        return {
          parent: parent,
          index: parts[i]
        };
      }

      if(typeof parent[parts[i]] === 'undefined') {
        parent[parts[i]] = {};
      }

      parent = parent[parts[i]];
    }
  };
} (this, this.Nox));
