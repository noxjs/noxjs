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

      // all modules from the args will be stored in here
      modules = Nox.methods.getModules(args),

      // defines a dependencies object, where all
      // dependencies are stored to pass in the callback
      dependencies = {},

      newArgs = [],

      // the function after aliased and with modules
      fn,

      // used in loopings
      i;

    // starts all the modules
    for(i = 0; i < modules.length; i += 1) {
      Nox.modules[modules[i]](dependencies);
      newArgs.push(dependencies[modules[i]]);
    }


    // adds the Callback to the namespace
    fn = Nox.methods.namespace(ns_string);

    fn.parent[fn.index] = function() {
      fn.parent[fn.index].fn = fn.parent[fn.index].prototype;
      newArgs.unshift(fn.parent[fn.index]);
      Callback.apply({}, newArgs);
    };

    Nox.module(ns_string, function(box) {
      box[ns_string] = fn.parent[fn.index];
    });
    // fn = fn.parent[fn.index] = new Callback(dependencies);

    // if it has initialize, then runs it
    // uses return so it can pass on jshint
    // return fn.initialize && fn.initialize();
  };

  // Adds Nox to the global namespace
  Nox.modules = {};
  global.Nox = Nox;
} (this));
