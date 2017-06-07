'use strict'
import inject from './inject'

const defaults = {
}

class Command {

  @inject()
  get logger() {
    return this._logger
  }

  constructor() {
  }
  execute(...args) {
    this.logger.debug('Command.execute', { arguments: args })
  }
}

export default Command
