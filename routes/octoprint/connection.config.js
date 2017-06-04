'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"octoprint/connection": {
		route: '/api/connection'
	}
};

module.exports = merge(xconfig, config);
