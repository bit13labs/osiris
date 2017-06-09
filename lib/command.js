'use strict';
/* jshint ignore:start */
import inject from './inject';
/* jshint ignore:end */

class Command {
  /* jshint ignore:start */
  @inject()
  /* jshint ignore:end */
  get logger() {
    return this._logger;
  }

  constructor() {
  }
  execute(...args) {
    this.logger.debug('Command.execute', { arguments: args });
  }
}

export default Command;
