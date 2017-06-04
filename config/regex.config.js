'use strict';

module.exports = {
	regex: {
		// this has an optional 'ok', because M105 puts ok at the start, M155 does not
		"M105": /^(?:ok\s+)?(?:T(\d?):(\d{1,}(?:\.\d{1,})?)\s\/(\d{1,}(?:\.\d{1,})?)\s)+B:(\d{1,}(?:\.\d{1,})?)\s\/(\d{1,}(?:\.\d{1,})?)(?:\s(\d?)@:(\d{1,}))+\sB@:(\d{1,})/,
		"M105_TOOLS": /(?:(T|B)(\d?):(\d{1,}(?:\.\d{1,})?)\s\/(\d{1,}(?:\.\d{1,})?)\s)/g,
		"M105_TOOLS_OFFSET": /\s(?:(\d?|B)@:(\d{1,}))/g,
		// just to check it
		"M115_FIRMWARE": /^\s?(FIRMWARE_NAME):/,
		"M115_CAPABILITY": /^Cap:([A-Z_0-9]+):(\d)$/,
		"M31": /^(?:echo:\s*)Print time:(.*$)/,

		"M114": /^X:(\d{1,}\.\d{2})\sY:(\d{1,}\.\d{2})\sZ:(\d{1,}\.\d{2})\sE:(\d{1,}\.\d{2})\s*/
	}
}
