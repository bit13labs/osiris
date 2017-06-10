'use strict';
/* jshint ignore:start */
import HomeCommand from "lib/printer/commands/home.command";
import config from "config";
import container from 'test/lib/container.init';

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
    it("must execute without parameters", (done) => {
      config.app.connected = false;
      let cmd = new HomeCommand();
      expect(cmd).not.toBe(null || undefined);
      expect(cmd.printer).not.toBe(null || undefined);
      cmd.execute().then( (response) => {
        expect(response).not.toBe(null || undefined);
        expect(response.message).not.toBe(null || undefined);
        expect(response.gcode).not.toBe(null || undefined);
        expect(response.message).toBe('ok');
        expect(response.gcode).toBe('G28');
      });
      done();
    });
    it("must execute for X axis only", (done) => {
      config.app.connected = false;
      let cmd = new HomeCommand();
      expect(cmd).not.toBe(null || undefined);
      expect(cmd.printer).not.toBe(null || undefined);
      let [x, y, z] = [true, false, false];
      cmd.execute(x, y, z).then( (response) => {
        expect(response).not.toBe(null || undefined);
        expect(response.message).not.toBe(null || undefined);
        expect(response.gcode).not.toBe(null || undefined);
        expect(response.message).toBe('ok');
        expect(response.gcode).toBe('G28 X');
      });
      done();
    });
    it("must execute for Y axis only", (done) => {
      config.app.connected = false;
      let cmd = new HomeCommand();
      expect(cmd).not.toBe(null || undefined);
      expect(cmd.printer).not.toBe(null || undefined);
      let [x, y, z] = [false, true, false];
      cmd.execute(x, y, z).then( (response) => {
        expect(response).not.toBe(null || undefined);
        expect(response.message).not.toBe(null || undefined);
        expect(response.gcode).not.toBe(null || undefined);
        expect(response.message).toBe('ok');
        expect(response.gcode).toBe('G28 Y');
      });
      done();
    });
    it("must execute for Z axis only", (done) => {
      config.app.connected = false;
      let cmd = new HomeCommand();
      expect(cmd).not.toBe(null || undefined);
      expect(cmd.printer).not.toBe(null || undefined);
      let [x, y, z] = [false, false, true];
      cmd.execute(x, y, z).then( (response) => {
        expect(response).not.toBe(null || undefined);
        expect(response.message).not.toBe(null || undefined);
        expect(response.gcode).not.toBe(null || undefined);
        expect(response.message).toBe('ok');
        expect(response.gcode).toBe('G28 Z');
      });
      done();
    });
    it("must execute for X and Y axis only", (done) => {
      config.app.connected = false;
      let cmd = new HomeCommand();
      expect(cmd).not.toBe(null || undefined);
      expect(cmd.printer).not.toBe(null || undefined);
      let [x, y, z] = [true, true, false];
      cmd.execute(x, y, z).then( (response) => {
        expect(response).not.toBe(null || undefined);
        expect(response.message).not.toBe(null || undefined);
        expect(response.gcode).not.toBe(null || undefined);
        expect(response.message).toBe('ok');
        expect(response.gcode).toBe('G28 X Y');
      });
      done();
    });
    it("must execute for X and Z axis only", (done) => {
      config.app.connected = false;
      let cmd = new HomeCommand();
      expect(cmd).not.toBe(null || undefined);
      expect(cmd.printer).not.toBe(null || undefined);
      let [x, y, z] = [true, false, true];
      cmd.execute(x, y, z).then( (response) => {
        expect(response).not.toBe(null || undefined);
        expect(response.message).not.toBe(null || undefined);
        expect(response.gcode).not.toBe(null || undefined);
        expect(response.message).toBe('ok');
        expect(response.gcode).toBe('G28 X Z');
      });
      done();
    });
    it("must execute for Y and Z axis only", (done) => {
      config.app.connected = false;
      let cmd = new HomeCommand();
      expect(cmd).not.toBe(null || undefined);
      expect(cmd.printer).not.toBe(null || undefined);
      let [x, y, z] = [false, true, true];
      cmd.execute(x, y, z).then( (response) => {
        expect(response).not.toBe(null || undefined);
        expect(response.message).not.toBe(null || undefined);
        expect(response.gcode).not.toBe(null || undefined);
        expect(response.message).toBe('ok');
        expect(response.gcode).toBe('G28 Y Z');
      });
      done();
    });
  });
});
/* jshint ignore:end */
