'use strict';
let _supports = (name) => {
	return _printer.capabilities[name] !== undefined && _printer.capabilities[name] !== null &&
		_printer.capabilities[name] === 1;
};


let _recordHistory = (temp) => {
	_printer.temperature.splice(0,0,temp);
	// 0 = current, 1 - 26 = history
	_printer.temperature = _printer.temperature.slice(0, _printer.MAX_HISTORY + 1);
};

let _capabilities = {
	EEPROM: null,
	AUTOREPORT_TEMP: null,
	PROGRESS: null,
	AUTOLEVEL: null,
	Z_PROBE: null,
	SOFTWARE_POWER: null,
	TOGGLE_LIGHTS: null,
	EMERGENCY_PARSER: null
};

let _printer = {
	FIRMWARE_NAME: "Unknown",
	SOURCE_CODE_URL: null,
	PROTOCOL_VERSION: 1.0,
	MACHINE_TYPE: "RepRap",
	EXTRUDER_COUNT: 0,
	UUID: '00000000-0000-0000-0000-000000000000',
	MAX_HISTORY: 25,
	// empty history
	temperature: [],
	supports: _supports,
	recordHistory: _recordHistory,
	capabilities: _capabilities
};


module.exports = {
	printer : _printer,
};
