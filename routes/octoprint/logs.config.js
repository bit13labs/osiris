'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"octoprint/logs": {
		route: '/api/logs'
	}
};

module.exports = merge(xconfig, config);
