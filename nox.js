/**
* Nox.js 0.0.0
*
* Created by: Mauricio Soares (http://github.com/msodeveloper)
* Inspired by the Sandbox pattern
*/

;(function(global) {
  'use strict';

	var Nox = function() {
		var args = Array.prototype.slice.call(arguments),

			// first arg is the namespace
			ns_string = args.shift(),

			// last arg is the callback
			callback = args.pop(),

      // defines a dependencie object, where all
      // dependencies are stored to pass in the function
			dependencies = {},

      // all modules from the args will be stored in here
      modules,

      // the function after aliased and with modules
      fn,

      // used in loopings
      i;

    // gets all modules beeing passed as different args, or as an Array
    if(args[0] && typeof args[0] === 'string') {
      modules = args;
    } else if(args[0] && typeof args[0] === 'object') {
      modules = args[0];
    } else {
      modules = [];
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

		// adds the callback to the namespace
		fn = namespace(ns_string, {
      callback: callback,
      dependencies: dependencies
    });

    // if it has initialize, then runs it
    return fn.initialize && fn.initialize();
	};

	var namespace = function(ns_string, conf) {
		var parts = ns_string.split('.'),
			parent = global,
      length = parts.length,
			i;

		for(i = 0; i < length; i += 1) {
      if(i + 1 === length) {
        parent[parts[i]] = new conf.callback(conf.dependencies);
        return parent[parts[i]];
      }

      if(typeof parent[parts[i]] === 'undefined') {
				parent[parts[i]] = {};
			}

			parent = parent[parts[i]];
		}
	};

	global.Nox = Nox;

} (this));

// modules
(function(global) {
  'use strict';

	var Nox = global.Nox;

	Nox.modules = {};
	Nox.modules.dom = function(box) {
		box.dom = {
			getElement: function() {}
		};
	};

	Nox.modules.ajax = function(box) {
		box.ajax = {
			request: function() {}
		};
	};

	Nox.modules.events = function(box) {
		box.events = {
			click: function() {}
		};
	};
} (this));