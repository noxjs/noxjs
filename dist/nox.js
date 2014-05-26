/** nox.js - v0.0.1 - 2014-05-26
* Copyright (c) 2014 Mauricio Soares de Oliveira;
* Licensed MIT 
*/

/**
* @module Nox
*/

;(function(global) {
  'use strict';

  var Nox = function() {
    var args = Nox.methods.toArray(arguments),

      // first arg is the namespace
      ns_string = Nox.methods.getNamespace(args),

      // last arg is the callback
      callback = Nox.methods.getCallback(args),

      // all modules from the args will be stored in here
      modules = Nox.methods.getModules(args),

      // defines a dependencies object, where all
      // dependencies are stored to pass in the callback
      dependencies = {},

      newArgs = [],

      // the function after aliased and with modules
      namespace,

      // used in loopings
      i;

    // starts all the modules
    for(i = 0; i < modules.length; i += 1) {
      Nox.modules[modules[i]](dependencies);
      newArgs.push(dependencies[modules[i]]);
    }

    // adds the Callback to the namespace
    namespace = Nox.methods.namespace(ns_string);

    namespace = namespace.parent[namespace.index] = function() {
      // adds the prototype to a index called "fn" (thx jquery)
      namespace.fn = namespace.prototype;

      // adds the function itself to the newArgs
      newArgs.unshift(namespace);

      // calls the callback with the function itself, and the dependencies
      callback.apply({}, newArgs);
      // console.log(fn.parent[fn.index]);
    };

    // Adds the new constructor as a Nox Module
    Nox.module(ns_string, function(box) {
      box[ns_string] = namespace;
    });
  };

  Nox.modules = {};

  // Adds Nox to the global namespace
  global.Nox = Nox;
} (this));

(function(Nox) {
  'use strict';

  /**
  * Includes a new module into the modules index of Nox
  *
  * @method module
  * @param {String} index Basically the name of the module
  * @param {Function} fn the module itself
  */

  Nox.module = function(index, fn) {
    Nox.modules = Nox.modules || {};

    if(Nox.modules[index]) {
      throw new Error('There is already a "' + index + '" module');
    }

    Nox.modules[index] = fn;
  };
} (this.Nox));

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
    var callback =  arr.pop();

    if(typeof callback !== 'function') {
      throw new Error('Last parameter should be a function');
    }

    return callback;
  };
} (this, this.Nox));

/**
* Gets all modules which the user passed into Nox,
* if there is any
*
* @method getModules
* @param {Array} arr The array of methods
* @return {Array} Returns callback
*/
(function(global, Nox) {
  'use strict';
  Nox.methods = Nox.methods || {};

  Nox.methods.getModules = function(mods) {
    var modules = [],
      i;

    if(mods[0] && typeof mods[0] === 'string') {
      modules = mods;
    } else if(mods[0] && typeof mods[0] === 'object') {
      modules = mods[0];
    }

    // checks if the module exists
    for(i = 0; i < modules.length; i += 1) {
      if(!Nox.modules[modules[i]]) {
        throw new Error('This module doesn\'t exists');
      }
    }

    return modules;
  };
} (this, this.Nox));

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
      throw new Error('First must be a string');
    }

    namespace = namespace.split('.');

    // checks if the string is only a number, or if it starts with a number
    for(var i = 0; i < namespace.length; i += 1) {
      if(!isNaN(namespace[i]) || !isNaN(namespace[i].substring(0, 1))) {
        throw new Error('Any of variables separated by dots can be a number or start with a number');
      }
    }

    return namespace.join('.');
  };
} (this, this.Nox));

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
