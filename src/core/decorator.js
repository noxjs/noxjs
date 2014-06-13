(function() {
  'use strict';

  Nox.decorator = function(ns_string, fn) {
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
    constr.decorators[decorator_string[1]] = fn;
  };
} ());