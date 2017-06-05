'use strict';
const express = require('express');
const router = express.Router();
const config = require('./printer.config');
const merge = require('merge');


router.get("/capabilities", (req, res, next) => {
	res.json( config.printer );
});

router.get("/", (req, res, next) => {
	if (config.printer.temperature.length === 0) {
		return res.json({ temperature: { } });
	}
	let all = config.printer.temperature.slice(0);
	let current = all[0];
	let history = all.slice(1);

	return res.json( {
		temperature: current,
		history: history,
		sd: { ready: true },
		state: {

		}
	});
});

module.exports = router;
