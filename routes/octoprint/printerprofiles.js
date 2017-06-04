'use strict';

// http://docs.octoprint.org/en/master/api/printerprofiles.html
const express = require('express');
const router = express.Router();
const config = require('./pritnerprofiles.config');
const merge = require('merge');

router.get("/", (req, res, next) => {
	res.json( [] );
});

router.post("/", (req, res, next) => {
	res.json( {} );
});

router.patch("/:profile", (req, res, next) => {
	res.json( [] );
});

router.delete("/:profile", (req, res, next) => {
	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});

module.exports = router;
