'use strict';
const SerialPort = require('serialport');
const parser = require('../gcode/parser');
const Promise = require('promise');
const merge = require('merge');

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
			_temp_loop();
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
			let pdata = parser.parse(data);
			if(pdata) {
				console.log(pdata);
			}
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

	let _temp_loop = () => {
		STATUS_LOOP = setInterval(() => {
			if( !PRINTER_CONNECTED || !_.port.isOpen() ) {
				clearInterval(STATUS_LOOP);
				return;
			}
			_.write("M105 S3\n");
		}, 5*1000);
	};
};

module.exports = _Communication;
