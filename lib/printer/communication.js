'use strict';
const SerialPort = require('serialport');
const parser = require('../gcode/parser');
const Promise = require('promise');
const merge = require('merge');
const config = require('../../config');

let PRINTER_CONNECTED = false;
let STATUS_LOOP = null;

let _Communication = function () {
	let _ = this;
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
					console.log(data);
				});
			} catch (err) {
				console.log(err.message);
			}
	};

	let _get_firmware_info = () => {
		config.printer._timestamp = new Date();
		let wait = setTimeout(() => {
			clearTimeout(wait);
			_.write("M115\n");
			_.write("M155 S5\n");
		}, 5*1000);
		// can only call M155 if AUTOREPORT_TEMP = true
		//_.write("M155 S5\n");
	};

	let _parse_data = (data) => {
		if(!data){
			return;
		}
		let lines = data.split('\n');
		for(let x = 0; x < lines.length; ++x) {
			let line = lines[x];

			if(line === "ok") {
				console.log(config.printer);
				continue;
			}

			// check if capabilities report
			let m = config.regex.M115_FIRMWARE.exec(line);
			if(m) {
				for(let x in config.printer) {
					let pattern = new RegExp(`(${x}):([^\\s]+)`,'g');
					if(x === "FIRMWARE_NAME") {
						pattern = /(FIRMWARE_NAME):(.*?)\sSOURCE_CODE_URL:/g;
					}
					let match = pattern.exec(line);
					if(match) {
						config.printer[m[1]] = m[2];
						console.log(match[1]);
					}
				}
				continue;
			}
			m = config.regex.M115_CAPABILITY.exec(line);
			if(m) {
				config.printer[m[1]] = parseInt(m[2],0);
				continue;
			}
			console.log(line);
		}
	};

	let _temp_loop = () => {
		STATUS_LOOP = setInterval(() => {
			if( !PRINTER_CONNECTED || !_.port.isOpen() ) {
				clearInterval(STATUS_LOOP);
				return;
			}
			_.write("M155 S5\n");
		}, 5*1000);
	};
};

module.exports = _Communication;
