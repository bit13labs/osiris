'use strict';

/* jshint ignore:start */
import inject from 'lib/inject'
/* jshint ignore:end */
import Command from 'lib/command';


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

  execute(x = true, y = true, z = true) {
    super.execute();
    return new Promise((resolve, reject) => {
      let gcodecmd = [];
      gcodecmd.push('G28');
      if (!(x && y && z)) {
        gcodecmd.push(x ? 'X' : '');
        gcodecmd.push(y ? 'Y' : '');
        gcodecmd.push(z ? 'Z' : '');
      }
      let gcode = gcodecmd.filter( (n) => { return n && n !== ''; }).join(' ').trim();
      if (this.printer) {
        this.logger.debug('HomeCommand.execute: "%s"', gcode);
        this.printer.write(gcode).then(
          (resp) => {
            resolve({
              gcode: gcode,
              message: resp
            });
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
