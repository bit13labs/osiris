'use strict';

module.exports = {
	regex: {
		// this has an optional 'ok', because M105 puts ok at the start, M155 does not
		"M105": /^(?:ok\s+)?T:(\d{1,})\s\/(\d{1,})\sB:(\d{1,})\s\/(\d{1,})\s@:(\d{1,})\sB@:(\d{1,})/g,
		// just to check it
		"M115_FIRMWARE": /^\s?(FIRMWARE_NAME):/,
		"M115_CAPABILITY": /^Cap:([A-Z_0-9]+):(\d)$/
	}
}
