(function(global) {
	var Nox = function() {
		var args = Array.prototype.slice.call(arguments),

			// first arg is the namespace
			ns_string = args.shift(),

			// last arg is the callback
			callback = args.pop(),

			// gets all modules beeing passed as different args, or as an Array
			modules = (args[0] && typeof args[0] === 'string') ? args : args[0],
			dependencies = {};

			// if no module is passed, or '*'
			if(!modules || modules[0] === '*') {
				modules = [];
				for(var i in Nox.modules) {
					modules.push(i);
				}
			}

			// starts all the modules
			for(var i = 0; i < modules.length; i += 1) {
				Nox.modules[modules[i]](dependencies);
			}

			// adds the callback to the namespace
			a = namespace(ns_string);
			// new callback(dependencies);

	};

	var namespace = function(ns_string) {
		var parts = ns_string.split('.'),
			parent = global,
			i;

		for(i = 0; i < parts.length; i += 1) {
			if(typeof parent[parts[i]] === 'undefined') {
				parent[parts[i]] = {};
			}

			parent = parent[parts[i]];
		}

		return parent;
	}

	global.Nox = Nox;

} (window));

// modules
(function(global) {
	var Nox = global.Nox;

	Nox.modules = {};
	Nox.modules.dom = function(box) {
		box.dom = {
			getElement: function() {}
		}
	}

	Nox.modules.ajax = function(box) {
		box.ajax = {
			request: function() {}
		}
	}

	Nox.modules.events = function(box) {
		box.events = {
			click: function() {}
		}
	}
} (window));