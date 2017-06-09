'use strict';

import Printer from '../printer.js';
import config from '../../../config';

class VirtualPrinter extends Printer {

  constructor(options = { autoOpen: false }) {
    super();
    this.logger.debug('VirtualPrinter.constructor options=> %j', options);
    let {autoOpen} = options;
    if (autoOpen) {
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

  get isConnected() {
    return config.app.connected;
  }
}

export default VirtualPrinter;
