'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"octoprint/util": {
		route: '/api/util'
	}
};

module.exports = merge(xconfig, config);
