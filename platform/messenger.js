(function() {
	'use strict';
	const request = require('request');
	const messenger = {
		sendText: sendText
	};

	function send(uid, message, type) {
		const options = {
			url: 'https://graph.facebook.com/v2.6/me/messages',
			qs: {
				access_token: process.env.PAGE_ACCESS_TOKEN
			},
			method: 'POST',
			json: {
				recipient: {
					id: uid
				},
			}
		};
		if (type === 'message') {
			options.json.message = message;
		}
		request(options, (err, res, body) => {
			if (err || res.body.error) {
				const e = (err ? err : res.body.error);
				console.log('Error sending message');
				console.log(e);
			}
		});
	}

	function sendText(uid, text) {
		send(uid, {
			text: text
		}, 'message');
	}
	module.exports = messenger;
})();
