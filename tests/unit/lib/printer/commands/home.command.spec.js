'use strict';
/* jshint ignore:start */
import HomeCommand from "../../../../../lib/printer/commands/home.command";
import config from "../../../../../config";
import container from '../../container.init';

describe("/lib/printer/commands/home.command.js => new()", () => {
  describe("when creating HomeCommand without options", () => {
    it("must not be null or undefined", (done) => {
      config.app.connected = false;
      let cmd = new HomeCommand();
      expect(cmd).not.toBe(null || undefined);
      done();
    });
    it("must have printer component injected", (done) => {
      config.app.connected = false;
      let cmd = new HomeCommand();
      expect(cmd).not.toBe(null || undefined);
      expect(cmd.printer).not.toBe(null || undefined);
      done();
    });
  });
});
/* jshint ignore:end */
