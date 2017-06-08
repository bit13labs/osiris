'use strict';
const express = require('express');
const router = express.Router();
const config = require('./home.config');
const semver = require('semver');

router.get("/version", (req, res, next) => {
	let m = semver.major(config.package.version);
	res.json( { server: config.package.version, api: `${m}` } );
});

module.exports = router;
