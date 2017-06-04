'use strict';
// http://docs.octoprint.org/en/master/api/util.html
const express = require('express');
const router = express.Router();
const config = require('./home.config');
const merge = require('merge');

router.post("/", (req, res, next) => {
	res.json( { } );
});

module.exports = router;
