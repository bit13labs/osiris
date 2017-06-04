'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"octoprint/languages": {
		route: '/api/languages'
	}
};

module.exports = merge(xconfig, config);
