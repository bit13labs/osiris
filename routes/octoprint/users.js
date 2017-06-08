'use strict';
// http://docs.octoprint.org/en/master/api/users.html
const express = require('express');
const router = express.Router();
// const config = require('./users.config');

router.get("/", (req, res, next) => {
	res.json( [] );
});

router.get("/:username", (req, res, next) => {
	res.json( { } );
});

router.post("/", (req, res, next) => {
	res.json( { } );
});

router.put("/:username", (req, res, next) => {
	res.json( { } );
});

router.delete("/:username", (req, res, next) => {
	res.json( { } );
});

router.put("/:username/password", (req, res, next) => {
	res.json( { } );
});


router.get("/:username/settings", (req, res, next) => {
	res.json( { } );
});

router.patch("/:username/settings", (req, res, next) => {
	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});

router.post("/:username/apikey", (req, res, next) => {
	res.json( { } );
});

router.delete("/:username/apikey", (req, res, next) => {
	// this should do the work...
	// then send 204 on success
	res.status(204).send();
});

module.exports = router;
