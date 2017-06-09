'use strict';
//const async = require('async');
var _events = {};
let _exists = ($event) => {
	return _events[$event] !== null && _events[$event] !== undefined;
};
let _register = ($event) => {
	if (_exists($event)) {
		return;
	}
	_events[$event] = {
		start: [],
		done: []
	};
};
let _clear = () => {
	_events = {};
};
module.exports = {
	// this should return a unique identifier or something, so it can be 'off'd'
	on: ($event, start, done) => {
		return new Promise(function(resolve, reject) {
			try {

				if (!_exists($event)) {
					_register($event);
				}

				_events[$event].start[_events[$event].start.length] = start;
				_events[$event].done[_events[$event].done.length] = done;

				return resolve(_events);
			} catch (e) {
				return reject(e);
			}
		});

	},
	_clear: _clear,
	_exists: _exists,
	_register: _register,
	_events: _events,
	_fire: ($event, $when, $args = null) => {
		console.log(`${$event}.${$when}(${JSON.stringify($args)})`);
		if (!_exists($event)) {
			return;
		}
		let whens = _events[$event][$when];
		for (let x = 0; x < whens.length; ++x) {
			if (whens[x]) {
				whens[x]($args);
			}
		}
	}
};
