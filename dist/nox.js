/** nox.js - v0.2.3 - 2014-06-17
* Copyright (c) 2014 Mauricio Soares de Oliveira;
* Licensed MIT 
*/

/**
* @module Nox
*/

;(function(global) {
  'use strict';

  var Nox = function() {
    var args = Nox.methods.toArray(arguments),

      // first arg is the namespace
      ns_string = Nox.methods.getNamespace(args),

      // last arg is the callback
      callback = Nox.methods.getCallback(args),

      // all modules from the args will be stored in here
      modules = Nox.methods.getModules(args),

      newArgs = [],

      // the function after aliased and with modules
      namespace,

      // slice prototype
      slice = Array.prototype.slice,

      // used in loopings
      i;

    // starts all the modules
    for(i = 0; i < modules.length; i += 1) {
      newArgs.push(Nox.modules[modules[i]]());
    }

    // adds the Callback to the namespace
    namespace = Nox.methods.namespace(ns_string);

    namespace = namespace.parent[namespace.index] = function() {
      // adds the prototype to a index called "fn" (thx jquery)
      namespace.fn = namespace.prototype;

      // adds the function itself to the newArgs
      newArgs.unshift(namespace);

      // calls the callback with the function itself, and the dependencies
      callback.apply(this, newArgs);

      Nox.methods.addDecorator(namespace.fn);
      Nox.methods.addEmitter.call(this, namespace.fn);

      if(typeof namespace.fn.initialize === 'function') {
        namespace.fn.initialize.apply(this, slice.call(arguments));
      }
    };

    // Adds the new constructor as a Nox Module
    Nox.module(ns_string, function() {
      return namespace;
    });
  };

  Nox.modules = {};

  // Adds Nox to the global namespace
  global.Nox = Nox;
} (this));

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

        newobj = Nox.methods.objectCreate(this);
        newobj.uber = this;

        for(i in overrides) {
          newobj[i] = overrides[i];
        }
        return newobj;
      };
    }
  };
} (this, this.Nox));

/**
* Adds the decorate method to the prototype, thx to this little guy:
* https://gist.github.com/mudge/5830382
*
* @method addEmitter
* @param {Object} fn the prototype of the constructor
*/
(function(global, Nox) {
  'use strict';

  Nox.methods = Nox.methods || {};

  Nox.methods.addEmitter = function(fn) {
    this.events = {};

    if(typeof fn.on !== 'function') {
      fn.on = function(event, listener) {
        if(typeof this.events[event] !== 'object') {
          this.events[event] = [];
        }

        this.events[event].push(listener);
      };
    }

    if(typeof fn.removeListener !== 'function') {
      fn.removeListener = function(event) {
        var idx;

        if(typeof this.events[event] === 'object') {
          delete this.events[event];
        }
      };
    }

    if(typeof fn.emit !== 'function') {
      fn.emit = function(event) {
        var i,
          listeners,
          length,
          args = Array.prototype.slice.call(arguments, 1);

        if(typeof this.events[event] === 'object') {
          listeners = this.events[event].slice();
          length = listeners.length;

          for(i = 0; i < length; i += 1) {
            listeners[i].apply(this, args);
          }
        }
      };
    }

    if(typeof fn.once !== 'function') {
      fn.once = function(event, listener) {
        this.on(event, function g() {
          this.removeListener(event, g);
          listener.apply(this, arguments);
        });
      };
    }

  };
} (this, this.Nox));

/**
* Returns the last index of the array, which is the callback
*
* @method getCallback
* @param {Array} arr The array of arguments
* @return {Function} Returns callback
*/
(function(global, Nox) {
  'use strict';
  Nox.methods = Nox.methods || {};

  Nox.methods.getCallback = function(arr) {
    var callback =  arr.pop();

    if(typeof callback !== 'function') {
      throw new Error('Last parameter should be a function');
    }

    return callback;
  };
} (this, this.Nox));

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

/**
* Returns the first index of the array, which is the namespace
*
* @method getNamespace
* @param {Array} arr The array of arguments
* @return {String} Returns the string of the namespace
*/
(function(global, Nox) {
  'use strict';
  Nox.methods = Nox.methods || {};

  Nox.methods.getNamespace = function(arr) {
    var namespace = arr.shift();

    if(typeof namespace !== 'string') {
      throw new Error('First must be a string');
    }

    namespace = namespace.split('.');

    // checks if the string is only a number, or if it starts with a number
    for(var i = 0; i < namespace.length; i += 1) {
      if(!isNaN(namespace[i]) || !isNaN(namespace[i].substring(0, 1))) {
        throw new Error('Any of variables separated by dots can be a number or start with a number');
      }
    }

    return namespace.join('.');
  };
} (this, this.Nox));

/**
* Adds the decorate method to the prototype, thx to this little guy:
*
* @method indexOf
* @param {Array} haystack the array which will look for
* @param {Object} needle the object i'm looking for
* @return {Number} idx the index of the element, if
* there's none, then return -1
*/
(function(global, Nox) {
  'use strict';

  Nox.methods = Nox.methods || {};

  if (typeof Array.prototype.indexOf === 'function') {
    Nox.methods.indexOf = function (haystack, needle) {
      return haystack.indexOf(needle);
    };
  } else {
    Nox.methods.indexOf = function (haystack, needle) {
      var i = 0,
        length = haystack.length,
        idx = -1,
        found = false;

      while (i < length && !found) {
        if (haystack[i] === needle) {
          idx = i;
          found = true;
        }

        i++;
      }

      return idx;
    };
  }
} (this, this.Nox));

/**
* Creates an structure of objects in the global
* namespace
*
* @method namespace
* @param {String} ns_string The string which will be
* converted into objects, must be separated with dots
* @return {Object} Returns the last but one index, and
* the name of the last index
*/
(function(global, Nox) {
  'use strict';
  Nox.methods = Nox.methods || {};

  Nox.methods.namespace = function(ns_string) {
    if(!ns_string || typeof ns_string !== 'string') {
      throw new Error('You need to pass a string');
    }

    var parts = ns_string.split('.'),
      parent = global,
      length = parts.length,
      i;

    for(i = 0; i < length; i += 1) {
      if(i + 1 === length) {
        return {
          parent: parent,
          index: parts[i]
        };
      }

      if(typeof parent[parts[i]] === 'undefined') {
        parent[parts[i]] = {};
      }

      parent = parent[parts[i]];
    }
  };
} (this, this.Nox));

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

/**
* converts an Array-like to an Array
*
* @method toArray
* @param {Object} obj The object which will be converted
* @return {Array} Returns the converted Array
*/
(function(global, Nox) {
  'use strict';
  Nox.methods = Nox.methods || {};

  Nox.methods.toArray = function(obj) {
    return Array.prototype.slice.call(obj);
  };
} (this, this.Nox));
