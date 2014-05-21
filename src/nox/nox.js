;(function(global) {
  'use strict';

  var methods = {},
    Nox;


  Nox = function() {

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
    fn = methods.namespace(ns_string);
    fn = fn.parent[fn.index] = new Callback(dependencies);

    // if it has initialize, then runs it
    // uses return so it can pass on jshint
    return fn.initialize && fn.initialize();
  };

  methods.namespace = function(ns_string) {
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

  // Adds Nox to the global namespace
  global.Nox = Nox;
} (this));
