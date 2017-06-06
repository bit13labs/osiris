'use strict';

let _events = {

};
let _exists = ($event) => {
	return _events[$event];
};
let _register = ($event) => {
	if(_exists($event)) {
		return;
	}
	_events[$event] = {
		start: [],
		done: []
	};
};

module.exports = {
	// this should return a unique identifier or something, so it can be 'off'd'
	on: ($event, start, done) => {
		if(!_exists($event)) {
			_register($event);
		}
		_events[$event].start.push(start);
		_events[$event].done.push(done);
	},

	_register: _register,

	_fire: ($event, $when, $args = null) => {
		console.log(`${$event}.${$when}(${JSON.stringify($args)})`);
		if(!_exists($event)) {
			return;
		}
		let whens = _events[$event][$when];
		for(let x = 0; x < whens.length; x++) {
			if(whens[x]) {
				whens[x]($args);
			}
		}
	},
};
