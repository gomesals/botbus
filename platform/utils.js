(function() {
	'use strict';
	const Messenger = require('./messenger');

	function utils() {
		const obj = {
			setPlatform: setPlatform,
			sendText: sendText
		};
		var platform;

		function setPlatform(p) {
			platform = Messenger;
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
