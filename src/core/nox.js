/**
* @module Nox
*/

;(function(global) {
  'use strict';

  var Nox = function() {
    var args = Nox.methods.toArray(arguments),

      // first arg is the namespace
      ns_string = Nox.methods.getNamespace(args),

      // last arg is the callback, capital letters because it
      // will be invoked as a class with "new"
      Callback = Nox.methods.getCallback(args),

      // defines a dependencies object, where all
      // dependencies are stored to pass in the callback
      dependencies = {},

      // all modules from the args will be stored in here
      modules,

      // the function after aliased and with modules
      fn,

      // used in loopings
      i;

    // gets all modules beeing passed as different args, or as an Array
    modules = Nox.methods.getModules(args);

    // starts all the modules
    for(i = 0; i < modules.length; i += 1) {
      Nox.modules[modules[i]](dependencies);
    }

    // adds the Callback to the namespace
    fn = Nox.methods.namespace(ns_string);
    fn = fn.parent[fn.index] = new Callback(dependencies);

    // if it has initialize, then runs it
    // uses return so it can pass on jshint
    return fn.initialize && fn.initialize();
  };

  // Adds Nox to the global namespace
  Nox.modules = {};
  global.Nox = Nox;
} (this));
