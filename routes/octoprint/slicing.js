'use strict';
// http://docs.octoprint.org/en/master/api/slicing.html
const express = require('express');
const router = express.Router();
const config = require('./slicing.config');
const merge = require('merge');

router.get("/", (req, res, next) => {
	res.json( { } );
});

router.get("/:slicer/profiles", (req, res, next) => {
	res.json( { } );
});

router.get("/:slicer/profiles/:key", (req, res, next) => {
	res.json( { } );
});

router.put("/:slicer/profiles/:key", (req, res, next) => {
	// this should do the work...
	// then send 204 on success
	res.status(201).send();
});

router.delete("/:slicer/profiles/:key", (req, res, next) => {
	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});

module.exports = router;
