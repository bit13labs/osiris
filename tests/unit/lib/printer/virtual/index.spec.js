'use strict';

// Have to splatter config.app.connected = false all over the place due to singleton nature of the object

/* jshint ignore:start */
import VirtualPrinter from "lib/printer/virtual";
import config from "config";
import container from 'test/lib/container.init';

describe("/lib/printer/virtual/index.js => new()", () => {
  describe("when creating VirtualPrinter without options", () => {
    it("must not be null or undefined", (done) => {
      config.app.connected = false;
      let printer = new VirtualPrinter();
      expect(printer).not.toBe(null || undefined);
      done();
    });
    it("must not be connected", (done) => {
      config.app.connected = false;
      let printer = new VirtualPrinter();
      expect(printer).not.toBe(null || undefined);
      expect(printer.isConnected).toBe(false);
      done();
    });
  });

  describe("when creating VirtualPrinter with options", () => {
    it("must not be null or undefined when options are empty", (done) => {
      config.app.connected = false;
      let printer = new VirtualPrinter({});
      expect(printer).not.toBe(null || undefined);
      done();
    });
    it("must not be connected when options are empty", (done) => {
      config.app.connected = false;
      let printer = new VirtualPrinter({});
      expect(printer).not.toBe(null || undefined);
      expect(printer.isConnected).toBe(false);
      done();
    });
    it("must not be null or undefined when options have bogus keys", (done) => {
      config.app.connected = false;
      let printer = new VirtualPrinter({ foo: 'bar'});
      expect(printer).not.toBe(null || undefined);
      done();
    });
    it("must not be connected when options have bogus keys", (done) => {
      config.app.connected = false;
      let printer = new VirtualPrinter({ foo: 'bar'});
      expect(printer).not.toBe(null || undefined);
      expect(printer.isConnected).toBe(false);
      done();
    });
    it("must not be null or undefined when options contain autoOpen", (done) => {
      config.app.connected = false;
      let printer = new VirtualPrinter({ autoOpen: true });
      expect(printer).not.toBe(null || undefined);
      done();
    });
    it("must be connected when options.autoOpen = true", (done) => {
      config.app.connected = false;
      let printer = new VirtualPrinter({ autoOpen: true });
      expect(printer).not.toBe(null || undefined);
      expect(printer.isConnected).toBe(true);
      done();
    });
    it("must not be connected when options.autoOpen = false", (done) => {
      config.app.connected = false;
      let printer = new VirtualPrinter({ autoOpen: false });
      expect(printer).not.toBe(null || undefined);
      expect(printer.isConnected).toBe(false);
      done();
    });
    it("must have logger injected", (done) => {
      config.app.connected = false;
      let printer = new VirtualPrinter({ autoOpen: false });
      expect(printer).not.toBe(null || undefined);
      expect(printer.logger).not.toBe(null || undefined);
      done();
    });
  });
});
/* jshint ignore:end */
