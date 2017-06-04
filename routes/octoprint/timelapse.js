'use strict';
// http://docs.octoprint.org/en/master/api/timelapse.html
const express = require('express');
const router = express.Router();
const config = require('./timelapse.config');
const merge = require('merge');

router.get("/", (req, res, next) => {
	res.json( [] );
});

router.post("/", (req, res, next) => {
	res.json( [] );
});

router.delete("/:filename", (req, res, next) => {
	res.json( [] );
});

router.post("/unrendered/:name", (req, res, next) => {
	res.json( [] );
});

router.delete("/unrendered/:name", (req, res, next) => {
	res.json( [] );
});

module.exports = router;
