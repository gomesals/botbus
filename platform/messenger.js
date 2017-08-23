(function() {
	'use strict';
	const request = require('request');
	class Messenger {
		setUid(uid) {
			this.uid = uid;
			return this;
		}
		wait(ms) {
			return new Promise((resolve) => {
				setTimeout(resolve, ms);
			});
		}
		sendText(text) {
			return new Promise((resolve, reject) => {
				send(this.uid, {
					text,
				}, 'message').then(response => {
					resolve(response);
				}).catch(error => {
					reject(error);
				});
			});
		}
	}
	module.exports = Messenger;

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
					uid,
					message,
					type: type,
					date: Date.now()
				});
			});
		});
	}
})();
