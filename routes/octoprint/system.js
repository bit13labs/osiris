'use strict';
// http://docs.octoprint.org/en/master/api/system.html
const express = require('express');
const router = express.Router();
const config = require('./home.config');
const merge = require('merge');

router.get("/commands", (req, res, next) => {
	res.json( { } );
});

router.get("/commands/:source", (req, res, next) => {
	res.json( { } );
});

router.post("/commands/:source/:action", (req, res, next) => {
	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});
module.exports = router;
