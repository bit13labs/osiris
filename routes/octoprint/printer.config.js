'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"octoprint/printer": {
		route: '/api/printer'
	}
};

module.exports = merge(xconfig, config);
