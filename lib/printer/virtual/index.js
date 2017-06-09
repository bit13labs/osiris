'use strict';

import Printer from '../printer.js';
import config from '../../../config';

class VirtualPrinter extends Printer {

  constructor(...args) {
    super(...args);
    let [{options}] = args;
    if (options && options.autoOpen) {
      this.connect();
    }
  }

  connect() {
    super.connect();
    this.logger.debug('VirtualPrinter.connect');
    config.app.connected = true;
    config.app.ready = false;
  }

  disconnect() {
    super.disconnect();
  }

  read() {
    return new Promise( (resolve, reject) => {
      resolve('ok');
    });
  }

  write(data) {
    return new Promise( (resolve, reject) => {
      this.logger.debug('Printer.write data: %j', data);
      if (config.app.connected) {
        resolve('ok');
      } else {
        reject(Error('Printer not connected'));
      }
    });
  }
}

export default VirtualPrinter;
