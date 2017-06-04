'use strict';

// push: http://docs.octoprint.org/en/master/api/push.html

const express = require('express');
const router = express.Router();
const config = require('./home.config');
const merge = require('merge');

router.get("/version", (req, res, next) => {
	res.json( { server: config.package.version, api: "0.1" } );
});

module.exports = router;
