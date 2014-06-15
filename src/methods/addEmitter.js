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

  /* Polyfill indexOf. */
  var indexOf;

  if (typeof Array.prototype.indexOf === 'function') {
    indexOf = function (haystack, needle) {
      return haystack.indexOf(needle);
    };
  } else {
    indexOf = function (haystack, needle) {
      var i = 0, length = haystack.length, idx = -1, found = false;

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
      fn.removeListener = function(event, listener) {
        var idx;

        if(typeof this.events[event] === 'object') {
          idx = indexOf(this.events[event], listener);

          if(idx > -1) {
            this.events[event].splice(idx, 1);
          }
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
