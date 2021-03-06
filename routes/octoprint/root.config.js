'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"octoprint/root": {
		route: '/api'
	}
};

module.exports = merge(xconfig, config);
