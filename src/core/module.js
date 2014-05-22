(function(Nox) {
  'use strict';

  Nox.module = function(index, fn) {
    Nox.modules = Nox.modules || {};

    if(Nox.modules[index]) {
      throw new Error('There is already a "' + index + '" module');
    }

    Nox.modules[index] = fn;
  };
} (this.Nox));
