'use strict'

import config from '../config'

function inject(component, ...args) {
  return function (target, key, descriptor) {
    let {get} = descriptor;
    if (typeof get === "function") {
      descriptor.get = function() {
        let value = get.apply(this, arguments);
        if (!value) {
          if (component) {
            value = config.container.resolve(component, ...args)
          } else {
            value = config.container.resolve(key, ...args)
          }
        }
        Object.defineProperty(this, key, {
          value: value
        });
        return value;
      }
    }
    return descriptor;
  }
}

export default inject
