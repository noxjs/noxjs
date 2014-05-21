/**
* Gets all modules which the user passed into Nox,
* if there is any
*
* @method getModules
* @param {Array} arr The array of methods
* @return {Array} Returns callback
*/
(function(global, Nox) {
  'use strict';
  Nox.methods = Nox.methods || {};

  Nox.methods.getModules = function(mods) {
  	var modules = [];

    if(mods[0] && typeof mods[0] === 'string') {
      modules = mods;
    } else if(mods[0] && typeof mods[0] === 'object') {
      modules = mods[0];
    }

    // '*' is passed, gets all modules
    if(modules && modules[0] === '*') {
      modules = [];
      for(var i in Nox.modules) {
        modules.push(i);
      }
    }

    return modules;
  };
} (this, this.Nox));
