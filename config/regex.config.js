'use strict';

module.exports = {
	regex: {
		"M105": /^T:(\d{1,})\s\/(\d{1,})\sB:(\d{1,})\s\/(\d{1,})\s@:(\d{1,})\sB@:(\d{1,})/i,
		// just to check it
		"M115_FIRMWARE": /^\s?(FIRMWARE_NAME):/,
		"M115_CAPABILITY": /^Cap:([A-Z_0-9]+):(\d)$/
	}
}
