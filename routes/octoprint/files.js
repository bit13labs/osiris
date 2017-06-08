'use strict';

// http://docs.octoprint.org/en/master/api/files.html

const express = require('express');
const router = express.Router();
// const config = require('./files.config');

router.get("/", (req, res, next) => {
	res.json( { files: [] } );
});

router.get("/:location", (req, res, next) => {
	res.json( { files: [ ] } );
});

router.post("/:location", (req, res, next) => {
	// this should do the work...
	// then send 201 on success
	res.status(201).send();
});

router.get("/:location/:filename", (req, res, next) => {
	res.json( { } );
});

router.post("/:location/:filename", (req, res, next) => {
	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});

router.delete("/:location/:filename", (req, res, next) => {
	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});

module.exports = router;
