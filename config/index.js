'use strict';
const fs = require('fs');
const path = require('path');
const npmpackage = require('../package.json');
const scan_path = '../';
const normalizedPath = path.join(__dirname, scan_path);
const merge = require('merge');

let config_base = merge({}, { package: npmpackage });

let _processPath = (p) => {
	fs.readdirSync(p).forEach((file) => {
		try {
			//let configMatch = /.*?\.config\.js$/i;
			let configMatch = /(\.config\.js|\/config\/.*?\.js)$/i;
			let deepPath = p.substring(normalizedPath.length).replace(/\\/g, "/");
			let fullPath = path.join(p, file);
			if (fs.lstatSync(fullPath).isDirectory()) {
				_processPath(fullPath);
			} else {

				if (file !== 'index.js' && configMatch.test(fullPath)) {
					let name = file.substring(0, file.lastIndexOf('.'));
					let p1 = deepPath.length > 0 ? `${deepPath}/` : "";
					try {
						let req_config = require(`${scan_path}${p1}${name}`);
						config_base = merge(req_config, config_base);
					} catch (e) {
						console.log(e);
					}
				}
			}
		} catch (ex) {
			console.error(ex);
		}
	});
};


_processPath(normalizedPath);


// Very naive implementation of DI container
class Container {

	constructor() {
		this.components = {};
	}
	service(name, obj) {
		this.components[name] = obj;
	}

	resolve(name, ...args) {
		if (this.components[name]) {
			return new this.components[name](...args);
		}
		return null;
	}

	list() {
		return Object.keys(this.components);
	}
}

config_base.container = new Container();

module.exports = config_base;
