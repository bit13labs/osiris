'use strict';
const express = require('express');
const router = express.Router();
const config = require('./home.config');
const merge = require('merge');

router.get("/", (req, res, next) => {
	// 	SerialPort.list(function (err, ports) {
	// 		if(err){
	// 			return res.render("error", {error: err, message: err.message});
	// 		}
	//
	// 		return res.render("index", { data: ports});
	//   // ports.forEach(function(port) {
	//   //   console.log(port.comName);
	//   //   console.log(port.pnpId);
	//   //   console.log(port.manufacturer);
	//   // });
	// });

	return res.render("index", { data: []})

});

module.exports = router;
