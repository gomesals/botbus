(function() {
	'use strict';
	const request = require('request');
	class Messenger {
		/**
		 * Sets user id.
		 * 
		 * @param {Int} uid User identification.
		 * 
		 */
		setUid(uid) {
			this.uid = uid;
			return this;
		}
		/**
		 * Returns a callback after the @ms time.
		 * 
		 * @param {Int} ms Time in milliseconds to wai.
		 * @reutrn	{Function} Callback
		 * 
		 */
		wait(ms) {
			return new Promise((resolve) => {
				setTimeout(resolve, ms);
			});
		}
		/**
		 * Sends a text.
		 * 
		 * @param {String} Text to be sent.
		 * @return	{Promise} Same as send().
		 * 
		 */
		sendText(text) {
			return new Promise((resolve, reject) => {
				send(this.uid, {
					text,
				}).then(resolve).catch(reject);
			});
		}
		/**
		 * Sends a writting action.
		 *
		 * @return	{Promise} Same as send().
		 * 
		 */
		sendWritting() {
			return new Promise((resolve, reject) => {
				send(this.uid, null, 'typing_on').then(resolve).catch(reject);
			});
		}
		/**
		 * Returns som info about the user.
		 * 
		 * @return {Promise} Object with the info: {first_name};
		 * 
		 */
		getInfo() {
			const url = `https://graph.facebook.com/v2.6/${this.uid}?fields=first_name&access_token=${process.env.PAGE_ACCESS_TOKEN}`;
			return new Promise((resolve, reject) => {
				request(url, (err, res, body) => {
					if (err) return reject(err);
					if (res.body.error) return reject(res.body.error);
					body = JSON.parse(body);
					const { first_name } = body;
					return resolve({ first_name });
					// return next(body.first_name);
				});
			});
		}
		createButton(title, type, action) {
			let button = {
				title,
			};
			if (type === 'url') {
				button.type = 'web_url';
				button.url = action;
			}
			else {
				button.type = 'postback';
				button.payload = action;
			}
			return button;
		}
		sendButton(buttons, text) {
			const message = {
				attachment: {
					type: "template",
					payload: {
						template_type: "button",
						text,
						buttons,
					}
				}
			};

			return new Promise((resolve, reject) => {
				send(this.uid, message).then(resolve).catch(reject);
			});
		}
	}
	module.exports = Messenger;

	/**
	 * Sends a message.
	 * 
	 * @param {Int} uid The user id.
	 * @param {String | null} message The text to be sent; Null when sending an action.
	 * @param {String} The type of the action: message, typing_on.
	 * @return	{Promise} If ok, returns an object {uid, message, type, date}; Returns an error otherwise.
	 *
	 */
	function send(uid, message, type = 'message') {
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
			else {
				options.json.sender_action = type;
			}
			if (process.env.NODE_ENV === 'test') {
				return resolve(options);
			}
			request(options, (err, res, body) => {
				if (err || res.body.error) {
					const e = (err ? err : res.body.error);
					return reject(Error(e));
				}
				resolve({
					uid,
					message,
					type,
					date: Date.now()
				});
			});
		});
	}
})();
