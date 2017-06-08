'use strict';
// http://docs.octoprint.org/en/master/api/util.html
const express = require('express');
const router = express.Router();
const fs = require('fs');
const request = require('request');

/**
 * Provides commands to test paths or URLs for correctness.
 * @body {*} command: path, url
 * @body {path} path: the file system path to test. Required
 * @body {path} check_type: file or dir if the path should not only be checked for existence but also whether it is of the specified type. Optional.
 * @body {path} check_access: A list of any of r, w and x. If present it will also be checked if read, write, execute permissions on the specified path.
 *
 * @body {url} url: The url to test. Required.
 * @body {url} method: The request method to use for the test. Optional, defaults to HEAD
 * @body {url} timeout: A timeout for the request, in seconds. If no reply from the tested URL has been received within this time frame, the check will be considered a failure. Optional, defaults to 3 seconds.
 * @body {url} status: The status code(s) or named status range(s) to test for. Can be either a single value or a list of either HTTP status codes or any of the following named status ranges:
 * - informational: Status codes from 100 to 199
 * - success: Status codes from 200 to 299
 * - redirection: Status codes from 300 to 399
 * - client_error: Status codes from 400 to 499
 * - server_error: Status codes from 500 to 599
 * - normal: Status codes from 100 to 399
 * - error: Status codes from 400 to 599
 * - any: Any status code starting from 100
 * @body {url} response: If set to either true, json, or bytes, the response body and the response headers from the URL check will be returned as part of the check result as well. json will attempt to parse the response as json and return the parsed result. true or bytes will base64 encode the body and return that.
 */
router.post("/", (req, res, next) => {
	if(req.body.command.match(/^coffee|tea$/)) {
		return res.status(418).send("I'm a teapot");
	}
	if(!req.body.command.match(/^path|url$/)) {
		return res.status(400).send('command not specified');
	}
	switch (req.body.command) {
		case "path":
			if(!req.body.path) {
				return res.status(400).send("path missing");
			}
			let path = req.body.path;
			let check_type = req.body.check_type || null;
			let check_access = req.body.check_access || [ 'r', 'w', 'x' ];
			let accessFlags = fs.constants.F_OK | (check_access.indexOf('r') ? fs.constants.R_OK : 0)  | (check_access.indexOf('w') ? fs.constants.W_OK : 0) | (check_access.indexOf('x') ? fs.constants.X_OK : 0);
			fs.stat(path, (err,stat) => {
				let exists = false;
				if(!err) {
					exists = true;
				}
				fs.access(path, accessFlags, (err) => {
					let accessResult = true;
					if(err) {
						accessResult = false;
					}
					fs.lstat(path, (err, stats) => {
						let isType = check_type === null ? exists : check_type === 'file' ? stats.isFile() : stats.isDirectory();
						return res.json({path: path, exists: exists, typeok: isType, access: accessResult, result: exists && isType && accessResult });
					});
				});
			});

			break;
		default: // url
			if(!req.body.url) {
				return res.status(400).send('url missing');
			}

			let respCodes = {
				informational: [100, 199],
				success: [200, 299],
				redirection: [300, 399],
				client_error: [400, 499],
				server_error: [500, 599],
				normal: [100, 399],
				error: [400, 599],
				any: [100, 999]
			};

			let url = req.body.url;
			let method = (req.body.method || "HEAD").toLowerCase();
			let status = req.body.status || 200;

			request[method](url, (err, resp, b) => {
				let checkStatus = [];
				let returnResponse = req.body.response || false;
				if(typeof(status) === "string") {
					for(let x = respCodes[status][0]; x < respCodes[status][1]; ++x) {
						checkStatus.push(x);
					}
				} else if (typeof(status) === "number") {
					checkStatus.push(status);
				} else if ( Array.isArray(status) ){
					checkStatus = status;
				}

				let headers = resp.headers;
				let response = null;
				if(returnResponse && returnResponse === "json") {
					response = { headers: headers, content: JSON.parse(b) };
					return res.json({
						url: url,
						status: resp.statusCode,
						result: checkStatus.indexOf(resp.statusCode) >= 0,
						response: response
					});
				} else if (returnResponse) {
					let buffer = new Buffer(b).toString("base64");
					response = { headers: headers, content: buffer };
					return res.json({
						url: url,
						status: resp.statusCode,
						result: checkStatus.indexOf(resp.statusCode) >= 0,
						response: response
					});
				} else {
					return res.json({
						url: url,
						status: resp.statusCode,
						result: checkStatus.indexOf(resp.statusCode) >= 0
					});
				}
			});
			break;
	}

});

module.exports = router;
