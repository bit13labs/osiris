'use strict';

module.exports = {
	regex: {
		"M105": /^\s*ok\sT:(\d{1,})\s\/(\d{1,})\sB:(\d{1,})\s\/(\d{1,})\s@:(\d{1,})\sB@:(\d{1,})/gi,
		// just to check it
		"M115_FIRMWARE": /^\s?(FIRMWARE_NAME):/g,
		"M115_CAPABILITY": /^Cap:([A-Z_0-9]+):([0-1])$/g
	}
}
