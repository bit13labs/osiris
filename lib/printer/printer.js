'use strict'

import inject from '../inject'

class Printer {

  @inject()
  get logger() {
    return this._logger
  }

  constructor(...args) {
    this.logger.debug('Printer.constructor: %j', args)
  }

  connect() {
  }

  disconnect() {
  }

  read() {
  }

  write(data) {
    this.logger.debug('Printer.write data: %j', data)
  }
}

export default Printer
