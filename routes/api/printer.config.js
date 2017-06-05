'use strict';

const xconfig = require('../../config');
const merge = require('merge');

let config = {
	"api/printer": {
		route: ['/api/v1/printer', '/api/printer']
	}
};

module.exports = merge(xconfig, config);
