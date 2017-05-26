(function() {
	'use strict';
	const Messenger = require('./messenger');
	const sample = require('./sample.js');

	function utils() {
		const obj = {
			setPlatform: setPlatform,
			sendText: sendText
		};
		var platform;

		function setPlatform(p) {
			if (p === 'messenger') {
				platform = Messenger;
			} else {
				platform = sample;
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
