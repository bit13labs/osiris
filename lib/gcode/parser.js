'use strict';
const Promise = require('promise');
const config = require('../../config');

let _parse = (line) => {
		let regcode = /^(?:echo:?)?\s*([GM]\d{1,3})\s(.*$)/gi;
		let cleanline = _cleanLine(line);
		let match = regcode.exec(cleanline);
		if(match) {
			let args = match[2].split(' ').filter((x)=> { return x.length > 0});
			return { command: match[1], args: args };
		} else {

			let m = config.regex.M105.exec(cleanline);
			if(m) {
				console.log(`T:${m[1]} B:${m[3]}`);
			} else {
				console.log("no match");
				console.log(cleanline);
			}
			return null;
		}
};

let _cleanLine = (line) => {
	let re = /^(?:ok|echo:?)?\s*([^;]*)(;.*)$/gi;
	let match = re.exec(line);
	if (!match) {
		return line.trim();
	} else {
		return match[1];
	}
};

module.exports = {
	parse: _parse
};
