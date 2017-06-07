'use strict'

import inject from '../../inject'
import Command from '../../command'


class HomeCommand extends Command {

  @inject('printer', { options: { autoOpen: true }})
  get printer() {
    return this._printer
  }

  constructor() {
    super()
  }

  execute(...args) {
    return new Promise((resolve, reject) => {
      super.execute(args)
      if (this.printer) {
        this.logger.debug('HomeCommand.execute', { arguments: args })
        this.printer.write('G28').then(
          (resp) => {
            resolve(resp)
          }
        ).catch(
          (err) => {
            reject(err)
          }
        )
      } else {
        reject(Error('No printer found'))
      }
    })
  }
}

export default HomeCommand
