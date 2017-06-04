'use strict';

// http://docs.octoprint.org/en/master/api/logs.html

const express = require('express');
const router = express.Router();
const config = require('./logs.config');
const merge = require('merge');

router.get("/", (req, res, next) => {
	res.json( {  } );
});

router.delete("/:filename", (req, res, next) => {
	res.json( {  } );
});
module.exports = router;
