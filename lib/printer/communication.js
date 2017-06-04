'use strict';
const SerialPort = require('serialport');
const parser = require('../gcode/parser');
const Promise = require('promise');
const merge = require('merge');
const config = require('../../config');
const async = require('async');
const events = require('./events');

let PRINTER_CONNECTED = false;
let STATUS_LOOP = null;

let _Communication = function() {
	let _ = this;
	_.commandQueue = [];
	_.open = (port, options) => {
		_.port = new SerialPort(port, merge(options, {
			parser: SerialPort.parsers.readline("\n")
		}));

		_.port.on("open", () => {
			PRINTER_CONNECTED = true;
			//_temp_loop();
			_get_firmware_info();
			console.log("open");
		}).on("disconnect", () => {
			PRINTER_CONNECTED = false;
			console.log("disconnect");
		}).on("close", () => {
			PRINTER_CONNECTED = false;
			console.log("close");
		}).on("error", (err) => {
			console.log('error: ', err.message);
		}).on("data", (data) => {

			_parse_data(data);
			// let pdata = parser.parse(data);
			// if(pdata) {
			// 	console.log(pdata);
			// }


		});
	};

	_.write = (data) => {
		try {
			_.port.write(data, () => {
				let command = data.replace(/\n/,"").trim().split(' ');
				let args = command.slice(1);
				events._fire(command[0], "start", args.join(' ').trim());
				_.commandQueue.push( { command: command[0], args: args } );
			});
		} catch (err) {
			console.log(err.message);
		}
	};

	let _get_firmware_info = () => {
		let wait = setTimeout(() => {
			clearTimeout(wait);
			events.on("M115", null, () => {
				console.log(config.printer);
				if(config.printer.supports('AUTOREPORT_TEMP') && !config.serial.forceM105) {
					_.write("M155 S5\n");
				} else {
					// fallback to M105
					console.warn("AUTOREPORT_TEMP (M155) not supported. Using fallback of polling M105");
					STATUS_LOOP = setInterval(() => {
						if (!PRINTER_CONNECTED || !_.port.isOpen()) {
							clearInterval(STATUS_LOOP);
							return;
						}
						_.write("M105\n");
					}, 5 * 1000);
				}
			});
			_.write("M115\n");
		}, 5 * 1000);
	};

	let _parse_data = function(data) {
		if (!data) {
			return;
		}
		let lines = data.split(/(\r\n|\n)/);
		async.each(lines, (line, next) => {
			let l = line.trim();
			if (l === "ok" || l.match(/^ok\s+/) ) {
				if(_.commandQueue.length > 0) {
					let afterOk = l.replace(/^ok\s+/, '').trim();
					let q = _.commandQueue[0];
					events._fire(q.command, "done", afterOk);
					_.commandQueue.pop();
				}
				return next();
			}

			if(_.commandQueue.length === 0) {
				_process_receive(l);
				return next();
			}

			let m = config.regex.M115_FIRMWARE.exec(l);
			if (m) {
				config.printer._timestamp = new Date();
				for(let name in config.printer) {
				//async.each(config.printer, (name, n) => {
					let pattern = new RegExp(`(${name}):([^\\s]+)`);
					if (name === "FIRMWARE_NAME") {
						pattern = /(FIRMWARE_NAME):(.*?)\sSOURCE_CODE_URL:/g;
					}
					let match = pattern.exec(l);
					if (match) {
						config.printer[match[1].trim()] = match[2].trim();
					}
				}
				return next();
			}

			m = config.regex.M115_CAPABILITY.exec(l);
			if (m) {
				config.printer.capabilities[m[1]] = parseInt(m[2], 0);
				return next();
			}
			_process_receive(l);

			return next();
		}, (err) => {
			if (err) {
				console.log(err);
			}
		});
	};

	let _process_receive = (line) => {
		let m = config.regex.M105.exec(line);
		if (m) {
			if(config.printer.supports('AUTOREPORT_TEMP')) {
				events._fire("M105", "start");
			}
			for(let x = 0; x < _.commandQueue.length; ++x) {
				if(_.commandQueue[x].command === "M105") {
					_.commandQueue = _.commandQueue.splice(x,1);
					break;
				}
			}
			// M105 prefixes this response with 'ok\s'
			events._fire("M105", "done", line.replace(/^ok\s+/, ''));
			return;
		}
	};

	let _temp_loop = () => {
		STATUS_LOOP = setInterval(() => {
			if (!PRINTER_CONNECTED || !_.port.isOpen()) {
				clearInterval(STATUS_LOOP);
				return;
			}
			_.write("M155 S5\n");
		}, 5 * 1000);
	};
};

module.exports = _Communication;
