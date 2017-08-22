(function() {
	'use strict';
	const Messenger = require('./messenger.platform');

	function utils() {
		const obj = {
			setPlatform: setPlatform,
			sendText: sendText
		};
		var platform;

		function setPlatform(p) {
			if (p === 'messenger') {
				platform = Messenger;
			}
			else {
				throw `Platform '${p}' not found.`;
			}
		}

		function sendText(uid, text) {
			return new Promise((resolve, reject) => {
				platform.sendText(uid, text).then(resolve).catch(reject);
			});
		}
		return obj;
	}
	module.exports = utils;
})();
