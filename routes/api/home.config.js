'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"api/home": {
		route: '/api'
	}
};

module.exports = merge(xconfig, config);
