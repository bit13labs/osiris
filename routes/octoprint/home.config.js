'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"octoprint/home": {
		route: '/api'
	}
};

module.exports = merge(xconfig, config);
