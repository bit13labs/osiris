'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"octoprint/printerprofiles": {
		route: '/api/printerprofiles'
	}
};

module.exports = merge(xconfig, config);
