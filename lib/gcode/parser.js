'use strict';
const Promise = require('promise');
let _parse = (line) => {
		let re = /^(?:echo:?)?\s*([GM]\d{1,3})\s(.*$)/gi;
		let cleanline = _cleanLine(line);
		let match = re.exec(cleanline);
		if(match) {
			let args = match[2].split(' ').filter((x)=> { return x.length > 0});
			return { command: match[1], args: args};
		} else {
			//return new Error(`Unable to match line: ${line}`);
			console.log(line);
			return null;
		}
};

let _cleanLine = (line) => {
	let re = /^(?:echo:?)?\s*([^;]*)(;.*)$/gi;
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
