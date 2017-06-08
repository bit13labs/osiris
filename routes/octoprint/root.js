'use strict';

// push: http://docs.octoprint.org/en/master/api/push.html

const express = require('express');
const router = express.Router();
const config = require('./root.config');

router.get("/version", (req, res, next) => {
	res.json( {
		server: config.package.version,
		api: "0.1",
		meta: {
			compatibility: {
				octoprint: "0.1"
			}
		}
	});
});

module.exports = router;
