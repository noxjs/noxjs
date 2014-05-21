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