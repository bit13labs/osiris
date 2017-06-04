'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"octoprint/timelapse": {
		route: '/api/timelapse'
	}
};

module.exports = merge(xconfig, config);
