'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"octoprint/settings": {
		route: '/api/settings'
	}
};

module.exports = merge(xconfig, config);
