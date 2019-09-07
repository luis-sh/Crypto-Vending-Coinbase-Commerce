'use strict';

class Util {

  static objectIsEmpty(obj) {
    for(let key in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, key)) { return false; }
    }
    return true;
  }

}

module.exports = Util;

