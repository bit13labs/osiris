'use strict';
const config = require('../../config');

let _parse = (o) => {
	let tools = [];
	let match = null;
	while ((match = config.regex.M105_TOOLS.exec(o)) != null) {
		let type = match[1] || "U";
		let idx = match[2] || "0";
		let actual = parseFloat(match[3] || "0", 2);
		let target = parseFloat(match[4] || "0", 2);
		tools.push({
			type: type,
			id: `${type}${idx}`,
			actual: actual,
			target: target
		})
	};

	let i = 0;
	while ((match = config.regex.M105_TOOLS_OFFSET.exec(o)) != null) {
		tools[i].offset = parseFloat(match[2] || 0, 2);
		++i;
	};

	return tools;
};

let _Temperature = function(o) {
	let tools = _parse(o);
	let r = {
		time: new Date().getTime(),
	};
	for(let t = 0; t < tools.length; ++t){
		let item = tools[t];
		if(item.type === "B") {
			r["bed"] = item;
		} else {
			r[`tool${t}`] = item;
		}
	}
	return r;

}

module.exports = _Temperature;
