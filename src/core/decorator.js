(function() {
  'use strict';

  /**
  * Includes a new decorate into the decorator of the constructor
  *
  * @method decorator
  * @param {String} ns_string name of the module and decorator splited by an underline,
  * example: 'App.Home_mydecorator'
  * @param {Object} obj the new object that the constructor will receive
  */

  Nox.decorator = function(ns_string, obj) {
    var namespace = Nox.methods.namespace(ns_string),
    decorator_string,
    constr;

    // splits the string, and gets the decorators name
    decorator_string = namespace.index.split('_');

    // alias for the constructor
    constr = namespace.parent[decorator_string[0]];

    // constructor receives decorators if they already exist
    constr.decorators = constr.decorators || {};

    // adds the index of new decorator
    constr.decorators[decorator_string[1]] = obj;
  };
} ());