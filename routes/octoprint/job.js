'use strict';

// http://docs.octoprint.org/en/master/api/job.html

const express = require('express');
const router = express.Router();
// const config = require('./job.config');

router.post("/", (req, res, next) => {
	res.json( {  } );
});

router.get("/", (req, res, next) => {
	res.json( {  } );
});

module.exports = router;
