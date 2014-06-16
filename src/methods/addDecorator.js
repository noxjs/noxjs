/**
* Adds the decorate method to the prototype
*
* @method addDecorator
* @param {Object} fn The prototype of the new Nox Contructor
* @return {Boolean} Returns true or false if everything ocurred ok
*/
(function(global, Nox) {
  'use strict';
  Nox.methods = Nox.methods || {};

  Nox.methods.addDecorator = function(fn) {
    if(typeof fn.decorate !== 'function') {
      fn.decorate = function(decorator) {
        var overrides = this.constructor.decorators[decorator],
        newobj,
        i;

        newobj = Object.create(this);
        newobj.uber = this;

        for(i in overrides) {
          newobj[i] = overrides[i];
        }
        return newobj;
      };
    }
  };
} (this, this.Nox));
