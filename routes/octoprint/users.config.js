'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"octoprint/users": {
		route: '/api/users'
	}
};

module.exports = merge(xconfig, config);
