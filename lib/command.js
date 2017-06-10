'use strict';
/* jshint ignore:start */
import inject from 'lib/inject';
/* jshint ignore:end */

class Command {
  /* jshint ignore:start */
  @inject()
  get logger() {
    return this._logger;
  }
  /* jshint ignore:end */

  constructor() {
    if (new.target === Command) {
      throw TypeError("Cannot new abstract class Command");
    }
  }
  execute(...args) {
    this.logger.debug('Command.execute', { arguments: args });
  }
}

export default Command;
