(function(Nox) {
  'use strict';

  /**
  * Includes a new module into the modules index of Nox
  *
  * @method module
  * @param {String} index Basically the name of the module
  * @param {Function} fn the module itself
  */

  Nox.module = function(index, fn) {
    Nox.modules = Nox.modules || {};

    if(Nox.modules[index]) {
      throw new Error('There is already a "' + index + '" module');
    }

    Nox.modules[index] = fn;
  };
} (this.Nox));
