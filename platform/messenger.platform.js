(function() {
	'use strict';
	const request = require('request');
	const messenger = {
		sendText,
	};

	function send(uid, message, type) {
		return new Promise((resolve, reject) => {
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
			if (process.env.NODE_ENV === 'test') {
				return resolve(options);
			}
			request(options, (err, res, body) => {
				if (err || res.body.error) {
					const e = (err ? err : res.body.error);
					reject(Error(e));
				}
				resolve({
					uid: uid,
					message: message,
					type: type,
					date: Date.now()
				});
			});
		});
	}

	function sendText(uid, text) {
		return new Promise((resolve, reject) => {
			send(uid, {
				text: text
			}, 'message').then(r => {
				resolve(r);
			}).catch(e => {
				reject(e);
			});
		});
	}
	module.exports = messenger;
})();
