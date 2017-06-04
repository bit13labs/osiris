'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"octoprint/slicing": {
		route: '/api/slicing'
	}
};

module.exports = merge(xconfig, config);
