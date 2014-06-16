/**
* polyfill for Object.create
*
* @method objectCreate
* @param {Object} obj The object which will be copied
* @return {Object} Returns the new object
*/
(function(global, Nox) {
  'use strict';
  Nox.methods = Nox.methods || {};

  if (!Object.create) {
    Nox.methods.objectCreate = (function(){
      function F(){}

      return function(o){
        if (arguments.length != 1) {
         throw new Error('Object.create implementation only accepts one parameter.');
        }
        F.prototype = o;
        return new F();
      };
    } ());
  } else {
    Nox.methods.objectCreate = Object.create;
  }
} (this, this.Nox));
