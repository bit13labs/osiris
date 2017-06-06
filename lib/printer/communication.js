'use strict';
const SerialPort = require('serialport');
const parser = require('../gcode/parser');
const Promise = require('promise');
const merge = require('merge');
const config = require('../../config');
const async = require('async');
const events = require('./events');
const Temperature = require('./temperature');

let STATUS_LOOP = null;
let _port = null;
let _commandQueue = [];
let _open = (port, options) => {
	_port = new SerialPort(port, merge(options, {
		parser: SerialPort.parsers.readline("\n")
	}));

	_port.on("open", () => {
		config.app.connected = true;
		config.app.ready = false;
		_get_firmware_info();
	}).on("disconnect", () => {
		config.app.connected = false;
		console.log("disconnect");
	}).on("close", () => {
		config.app.connected = false;
		console.log("close");
	}).on("error", (err) => {
		console.log('error: ', err.message);
	}).on("data", (data) => {
		_parse_data(data);
	});
};

let _write = (data) => {
		try {
			_port.write(data, () => {
				let command = data.replace(/\n/,"").trim().split(' ');
				let args = command.slice(1);
				events._fire(command[0], "start", args.join(' ').trim());
				_commandQueue.push( { command: command[0], args: args } );
			});
		} catch (err) {
			console.log(err.message);
		}
}

let _get_firmware_info = () => {
	let wait = setTimeout(() => {
		clearTimeout(wait);
		_write("M115\n");
	}, 5 * 1000);
	events.on("M115", null, () => {
		config.app.ready = true;
		_write("M114\n");
		if(config.printer.supports('AUTOREPORT_TEMP') && !config.serial.forceM105) {
			_write("M155 S5\n")
		} else {
			// fallback to M105
			console.warn("AUTOREPORT_TEMP (M155) not supported. Using fallback of polling M105");
			STATUS_LOOP = setInterval(() => {
				if (!config.app.connected || !_port.isOpen()) {
					clearInterval(STATUS_LOOP);
					return;
				}
				_write("M105\n");
			}, 5 * 1000);
		}
	});
};

let _parse_data = function(data) {
	if (!data) {
		return;
	}
	let lines = data.split(/(\r\n|\n)/);
	async.each(lines, (line, next) => {
		let l = line.trim();

		console.log(l);

		if (l === "ok" || l.match(/^ok\s+/) ) {
			if(_commandQueue.length > 0) {
				let afterOk = l.replace(/^(ok|echo:)\s*/, '').trim();
				let q = _commandQueue[0];
				events._fire(q.command, "done", afterOk);
				_commandQueue = _commandQueue.splice(1);
			}
			return next();
		}

		let m = config.regex.BUSY.exec(l);
		if(m) {
			// notify of a BUSY
			events._fire("BUSY", "done", m[1].trim());
			return next();
		}

		if(_commandQueue.length === 0) {
			_process_receive(l);
			return next();
		}

		m = config.regex.M115_FIRMWARE.exec(l);
		if (m) {
			config.printer.time = new Date().getTime();
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

		// capabilities are sent separately, on seprate lines
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

		_removeCommandFromQueue("M105").done(() => {
			// M105 prefixes this response with 'ok\s'
			let temp_data = line.replace(/^ok\s+/, '');
			let temp = Temperature(temp_data);
			config.printer.recordHistory(temp);
			events._fire("M105", "done", temp_data);
			return;
		});

	}

	m = config.regex.M31.exec(line);
	if(m) {
		events._fire("M31", "done", m[1].trim());
	}

	m = config.regex.M111.exec(line);
	if(m) {
		_removeCommandFromQueue("M111").done(() => {
			let levels = [];
			let match = null;
			while ((match = config.regex.M111_TEST.exec(line)) != null) {
				levels.push(match[1]);
			};
			events._fire("M111", "done", levels);
		});
	}

	m = config.regex.M114.exec(line);
	if(m) {
		config.printer.position = {
			x: parseFloat(m[1], 2),
			y: parseFloat(m[2], 2),
			z: parseFloat(m[3], 2),
			e: parseFloat(m[4], 2)
		}
		console.log(config.printer);
	}

	m = config.regex.M160.exec(line);
	if(m) {
		config.printer.capabilities[m[1].toUpperCase()] = m[2].trim();
	}
};

let _removeCommandFromQueue = (command) => {
	return new Promise(function(resolve, reject) {
		try {
			for(let x = 0; x < _commandQueue.length; ++x) {
				if(_commandQueue[x].command === command) {
					_commandQueue = _commandQueue.splice(x,1);
					break;
				}
			}
			return resolve();
		} catch ( err ) {
			return reject(err);
		}
	});
}

module.exports = {
	open: _open,
	write: _write,
	commandQueue: _commandQueue,
	_port: _port
};
