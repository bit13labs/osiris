'use strict';

//http://docs.octoprint.org/en/master/api/printer.html
const express = require('express');
const router = express.Router();
const config = require('./printer.config');
const merge = require('merge');


router.post("/printhead", (req, res, next) => {
	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});

/**
 * @example Content-Type: application/json

{
  "tool0": {
    "actual": 214.8821,
    "target": 220.0,
    "offset": 0
  },
  "tool1": {
    "actual": 25.3,
    "target": null,
    "offset": 0
  },
  "history": [
    {
      "time": 1395651928,
      "tool0": {
        "actual": 214.8821,
        "target": 220.0
      },
      "tool1": {
        "actual": 25.3,
        "target": null
      }
    },
    {
      "time": 1395651926,
      "tool0": {
        "actual": 212.32,
        "target": 220.0
      },
      "tool1": {
        "actual": 25.1
      }
    }
  ]
}
*/
router.get("/tool", (req, res, next) => {
	// this should do the work...
	res.json({});
});

router.post("/tool", (req, res, next) => {
	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});

router.get("/bed", (req, res, next) => {
	// this should do the work...
	res.json({});
});

router.post("/bed", (req, res, next) => {
	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});

router.get("/sd", (req, res, next) => {
	// this should do the work...
	res.json({});
});

router.post("/sd", (req, res, next) => {
	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});

router.post("/command", (req, res, next) => {
	if(!req.body.command && !req.body.commands) {
		res.status(400).send('command not specified');
		return;
	}
	let commands = req.body.commands || [ req.body.command ];
	console.log(commands);
	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});

module.exports = router;
