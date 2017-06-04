'use strict';
const express = require('express');
const router = express.Router();
const config = require('./home.config');
const merge = require('merge');


router.get("/capabilities", (req, res, next) => {
	res.json( config.printer );
})

module.exports = router;
