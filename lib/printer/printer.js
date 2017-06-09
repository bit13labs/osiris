'use strict';
/* jshint ignore:start */
import inject from '../inject';
/* jshint ignore:end */

class Printer {
  /* jshint ignore:start */
  @inject()
  /* jshint ignore:end */
  get logger() {
    return this._logger;
  }

  constructor(...args) {
    this.logger.debug('Printer.constructor: %j', args);
  }

  connect() {
  }

  disconnect() {
  }

  read() {
  }

  write(data) {
    this.logger.debug('Printer.write data: %j', data);
  }
}

export default Printer;
