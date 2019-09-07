'use strict';

class Util {

  static objectIsEmpty(obj: object) {
    for(let key in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, key)) { return false; }
    }
    return true;
  }

}

export = Util;

