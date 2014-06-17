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
