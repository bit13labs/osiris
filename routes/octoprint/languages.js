'use strict';

// http://docs.octoprint.org/en/master/api/job.html

const express = require('express');
const router = express.Router();
// const config = require('./languages.config');

router.get("/", (req, res, next) => {
	res.json( {  } );
});

router.post("/", (req, res, next) => {
	res.json( {  } );
});

router.delete("/:locale/:pack", (req, res, next) => {
	res.json( {  } );
});

module.exports = router;
