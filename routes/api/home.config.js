'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"api/home": {
		route: ['/api/v1']
	}
};

module.exports = merge(xconfig, config);
