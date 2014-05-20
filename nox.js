(function(global) {
	var Nox = function() {
		var args = Array.prototype.slice.call(arguments),

			// first arg is the namespace
			namespace = args.shift(),

			// last arg is the callback
			callback = args.pop(),

			// gets all modules beeing passed as different args, or as an Array
			modules = (args[0] && typeof args[0] === 'string') ? args : args[0],
			i,
			dependencies = {};

			// if its not beeing called as a constructor
			// if(!(this instanceof Nox)) {
			// 	return new Nox(modules, callback);
			// }

			// if no module is passed, or '*'
			if(!modules || modules[0] === '*') {
				modules = [];
				for(i in Nox.modules) {
					modules.push(i);
				}
			}

			// starts all the modules
			for(i = 0; i < modules.length; i += 1) {
				Nox.modules[modules[i]](dependencies);
			}

			// calls the callback
			return new callback(dependencies);
	};

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

	global.Nox = Nox;

} (window));