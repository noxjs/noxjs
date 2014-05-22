/**
* A optional Helper for handling Events
*
* @module ajax
*/

(function(global, Nox) {
  'use strict';

	Nox.modules = Nox.modules || {};
	Nox.modules.events = function(box) {
		box.events = {
			click: function() {}
		};
	};
} (this, this.Nox));