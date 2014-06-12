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

      newArgs = [],

      // the function after aliased and with modules
      namespace,

      // slice prototype
      slice = Array.prototype.slice,

      // used in loopings
      i;

    // starts all the modules
    for(i = 0; i < modules.length; i += 1) {
      newArgs.push(Nox.modules[modules[i]]());
    }

    // adds the Callback to the namespace
    namespace = Nox.methods.namespace(ns_string);

    namespace = namespace.parent[namespace.index] = function() {
      // adds the prototype to a index called "fn" (thx jquery)
      namespace.fn = namespace.prototype;

      // adds the function itself to the newArgs
      newArgs.unshift(namespace);

      // calls the callback with the function itself, and the dependencies
      callback.apply(this, newArgs);

      if(typeof namespace.fn.initialize === 'function') {
        namespace.fn.initialize.apply(this, slice.call(arguments));
      }
    };

    // Adds the new constructor as a Nox Module
    Nox.module(ns_string, function() {
      return namespace;
    });
  };

  Nox.modules = {};

  // Adds Nox to the global namespace
  global.Nox = Nox;
} (this));
