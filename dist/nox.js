/** nox.js - v0.0.0 - 2014-05-21
* Copyright (c) 2014 Mauricio Soares de Oliveira;
* Licensed MIT 
*/

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

(function(global, Nox) {
  Nox.methods = Nox.methods || {};
  Nox.methods.namespace = function(ns_string) {
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

// modules
(function(global, Nox) {
  'use strict';

	Nox.modules = Nox.modules || {};
	Nox.modules.ajax = function(box) {
		box.ajax = {
			request: function() {}
		};
	};
} (this, this.Nox));
// modules
(function(global, Nox) {
  'use strict';

	Nox.modules = Nox.modules || {};
	Nox.modules.dom = function(box) {
		box.dom = {
			getElement: function() {}
		};
	};
} (this, this.Nox));
// modules
(function(global, Nox) {
  'use strict';

	Nox.modules = Nox.modules || {};
	Nox.modules.events = function(box) {
		box.events = {
			click: function() {}
		};
	};
} (this, this.Nox));