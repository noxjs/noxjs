/**
* A optional Helper for handling with the DOM
*
* @module ajax
*/

(function(global, Nox) {
  'use strict';

	Nox.modules = Nox.modules || {};
	Nox.modules.dom = function(box) {
		box.dom = {
			getElement: function() {}
		};
	};
} (this, this.Nox));