'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"octoprint/job": {
		route: '/api/job'
	}
};

module.exports = merge(xconfig, config);
