'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"octoprint/files": {
		route: '/api/files'
	}
};

module.exports = merge(xconfig, config);
