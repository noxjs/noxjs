function Sandbox() {
	var args = Array.prototype.slice.call(arguments),

		// last arg is the callback
		callback = args.pop(),

		// gets all modules beeing passed as different args, or as an Array
		modules = (args[0] && typeof args[0] === 'string') ? args : args[0],
		i,
		dependencies = {};

		// if its not beeing called as a constructor
		// if(!(this instanceof Sandbox)) {
		// 	return new Sandbox(modules, callback);
		// }

		// if no module is passed, or '*'
		if(!modules || modules[0] === '*') {
			modules = [];
			for(i in Sandbox.modules) {
				modules.push(i);
			}
		}

		// starts all the modules
		for(i = 0; i < modules.length; i += 1) {
			Sandbox.modules[modules[i]](dependencies);
		}

		// calls the callback
		return new callback(dependencies)
}

Sandbox.modules = {};
Sandbox.modules.dom = function(box) {
	box.dom = {
		getElement: function() {}
	}
}

Sandbox.modules.ajax = function(box) {
	box.ajax = {
		request: function() {}
	}
}

Sandbox.modules.events = function(box) {
	box.events = {
		click: function() {}
	}
}

var View = Sandbox('*', function(box) {
	this.initialize = function() {
		console.log(box);
	}
});

var Home = Sandbox(['dom', 'ajax'], function(box) {
	this.initialize = function() {
		console.log(box);
	}
});
