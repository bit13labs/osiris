'use strict';

// http://docs.octoprint.org/en/master/api/apps.html

const express = require('express');
const router = express.Router();
// const config = require('./apps.config');

router.get("/", (req, res, next) => {
	res.json( { } );
});

router.post("/", (req, res, next) => {
	res.json( { } );
});

module.exports = router;
