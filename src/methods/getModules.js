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
    var modules = [],
      i;

    if(mods[0] && typeof mods[0] === 'string') {
      modules = mods;
    } else if(mods[0] && typeof mods[0] === 'object') {
      modules = mods[0];
    }

    // checks if the module exists
    for(i = 0; i < modules.length; i += 1) {
      if(!Nox.modules[modules[i]]) {
        throw new Error('This module doesn\'t exists');
      }
    }

    return modules;
  };
} (this, this.Nox));
