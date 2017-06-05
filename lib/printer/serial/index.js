'use strict'

import SerialPort from 'serialport'
import Printer from '../printer.js'
import config from '../../../config'

const defaults = {
  port: config.serial.port,
  baudRate: config.serial.baudRate,
  autoOpen: true
}

class SerialPrinter extends Printer {
  constructor(options) {
    super(options)
    this.port = (options && options.port) || defaults.port
    this.baudRate = (options && options.baudRate) || defaults.baudRate
    this.autoOpen = (options && options.autoOpen) || defaults.autoOpen

    if (this.autoOpen) {
      this.connect()
    }
  }

  connect() {
    super.connect()
    if (!this._serialPort) {
      this._serialPort = new SerialPort(this.port, {
        baudRate: this.baudRate,
        autoOpen: this.autoOpen,
        parser: SerialPort.parsers.readline('\n')
      });
    }

    this._serialPort.on('open', () => {
      console.log('open')
    }).on('disconnect', () => {
      console.log('disconnect')
    }).on('close', () => {
      console.log('close')
    }).on('error', (err) => {
      console.log(err)
    }).on('data', (data) => {
      console.log(data)
    });
  }

  disconnect() {
    super.disconnect()
  }
}

export default SerialPrinter
