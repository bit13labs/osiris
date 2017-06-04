'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"octoprint/apps": {
		route: '/apps/auth'
	}
};

module.exports = merge(xconfig, config);
