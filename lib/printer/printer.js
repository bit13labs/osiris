'use strict';
/* jshint ignore:start */
import inject from 'lib/inject';
/* jshint ignore:end */

class Printer {
  /* jshint ignore:start */
  @inject()
  get logger() {
    return this._logger;
  }
  /* jshint ignore:end */

  constructor() {
    if (new.target === Printer) {
      throw TypeError("Cannot new abstract class Printer");
    }
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
