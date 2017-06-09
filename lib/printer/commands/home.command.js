'use strict';

/* jshint ignore:start */
import inject from '../../inject';
/* jshint ignore:end */
import Command from '../../command';


class HomeCommand extends Command {

  /* jshint ignore:start */
  @inject('printer', { autoOpen: true })
  /* jshint ignore:end */
  get printer() {
    return this._printer;
  }

  constructor() {
    super();
  }

  execute(...args) {
    super.execute(...args);
    return new Promise((resolve, reject) => {
      if (this.printer) {
        this.logger.debug('HomeCommand.execute', { arguments: args });
        this.printer.write('G28').then(
          (resp) => {
            resolve(resp);
          }
        ).catch(
          (err) => {
            reject(err);
          }
        );
      } else {
        reject(Error('No printer found'));
      }
    });
  }
}

export default HomeCommand;
