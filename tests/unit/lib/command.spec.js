'use strict';

import Command from "../../../lib/command";

describe("/lib/command.js => new()", () => {
  describe("when creating Command", () => {
    it("must throw abstract class exception", (done) => {
      expect(() => {
        let cmd = new Command();
        cmd.execute();
      }).toThrow(new TypeError("Cannot new abstract class Command"));
      done();
    });
  });
});
