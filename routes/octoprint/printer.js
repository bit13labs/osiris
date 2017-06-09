'use strict';

//http://docs.octoprint.org/en/master/api/printer.html
const express = require('express');
const router = express.Router();
// const config = require('./printer.config');
// const events = require('../../lib/printer/events');
const communication = require('../../lib/printer/communication');

router.post("/printhead", (req, res, next) => {
	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});

router.get("/tool", (req, res, next) => {
	// this should do the work...
	res.json({});
});

router.post("/tool", (req, res, next) => {
	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});

router.get("/bed", (req, res, next) => {
	// this should do the work...
	res.json({});
});

router.post("/bed", (req, res, next) => {
	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});

router.get("/sd", (req, res, next) => {
	// this should do the work...
	res.json({});
});

router.post("/sd", (req, res, next) => {
	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});

router.post("/command", (req, res, next) => {
	if(!req.body.command && !req.body.commands) {
		res.status(400).send('command not specified');
		return;
	}
	let commands = req.body.commands || [ req.body.command ];
	commands.forEach((x) => {
		communication.write(`${x}\n`);
	});

	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});

module.exports = router;
