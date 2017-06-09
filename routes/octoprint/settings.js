'use strict';
// http://docs.octoprint.org/en/master/api/settings.html
const express = require('express');
const router = express.Router();
// const config = require('./settings.config');

router.get("/", (req, res, next) => {
	res.json( { } );
});

router.post("/", (req, res, next) => {
	res.json( { } );
});

router.post("/apikey", (req, res, next) => {
	res.json( { } );
});

module.exports = router;
