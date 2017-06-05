'use strict'

import Printer from '../printer.js'
import config from '../../../config'

class VirtualPrinter extends Printer {

  constructor(options) {
    super(options)
  }

  connect() {
    super.connect()
    config.app.connected = true
    config.app.ready = false
  }

  disconnect() {
    super.disconnect()
  }
}

export default VirtualPrinter
