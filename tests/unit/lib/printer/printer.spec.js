'use strict';

import Printer from "lib/printer/printer";

describe("/lib/printer/printer.js => new()", () => {
  describe("when creating Printer", () => {
    it("must throw abstract class exception", (done) => {
      expect(() => {
        let printer = new Printer();
        printer.connect();
      }).toThrow(new TypeError("Cannot new abstract class Printer"));
      done();
    });
  });
});
