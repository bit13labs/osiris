'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"octoprint/system": {
		route: '/api/system'
	}
};

module.exports = merge(xconfig, config);
