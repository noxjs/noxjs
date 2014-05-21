;(function(global) {
  'use strict';

  var Nox = function() {

    var args = Array.prototype.slice.call(arguments),

      // first arg is the namespace
      ns_string = args.shift(),

      // last arg is the callback
      Callback = args.pop(),

      // defines a dependencie object, where all
      // dependencies are stored to pass in the function
      dependencies = {},

      // all modules from the args will be stored in here
      modules = [],

      // the function after aliased and with modules
      fn,

      // used in loopings
      i;

    // gets all modules beeing passed as different args, or as an Array
    if(args[0] && typeof args[0] === 'string') {
      modules = args;
    } else if(args[0] && typeof args[0] === 'object') {
      modules = args[0];
    }


    // '*' is passed, gets all modules
    if(modules && modules[0] === '*') {
      modules = [];
      for(i in Nox.modules) {
        modules.push(i);
      }
    }

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
  global.Nox = Nox;
} (this));
