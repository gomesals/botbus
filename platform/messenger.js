(function() {
	'use strict';
	const request = require('request-promise');
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
		 * Sends a text.
		 * 
		 * @param {String} Text to be sent.
		 * @return	{Promise} Same as send().
		 * 
		 */
		sendText(text) {
			return new Promise(async(resolve, reject) => {
				try {
					return resolve(await send(this.uid, { text }));
				}
				catch (error) {
					return reject(error);
				}
			});
		}
		/**
		 * Sends a writting action.
		 *
		 * @return	{Promise} Same as send().
		 * 
		 */
		sendWritting() {
			return new Promise(async(resolve, reject) => {
				try {
					return resolve(await send(this.uid, null, 'typing_on'));
				}
				catch (error) {
					return reject(error);
				}
			});
		}
		/**
		 * Returns some info about the user.
		 * 
		 * @return {Promise} Object with the info: {first_name};
		 * 
		 */
		getInfo() {
			const url = `https://graph.facebook.com/v2.6/${this.uid}?fields=first_name&access_token=${process.env.PAGE_ACCESS_TOKEN}`;
			return new Promise(async(resolve, reject) => {
				try {
					return resolve(JSON.parse(await request(url)));
				}
				catch (error) {
					return reject(error);
				}
			});
		}
		/**
		 * Creates a postback or url button and returns it.
		 * 
		 * @param {String} title Button's text;
		 * @param {String} type Button's type: url | postback;
		 * @param {String} action Button's action when clicked. Url if website, postback action otherwise.
		 * @return	{Object} object with the button. {title, type, <url|payload>}.
		 * 
		 */
		createButton(title, type, action) {
			return new Promise((resolve, reject) => {
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
				return resolve(button);
			});
		}
		/**
		 * Sends a button created by #createButton().
		 * 
		 * @param {Array} buttons Array of buttons;
		 * @param {String} text Message's text before showing the buttons.
		 * @return	{Promise} Same as send().
		 * 
		 */
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
			return new Promise(async(resolve, reject) => {
				try {
					return resolve(await send(this.uid, message));
				}
				catch (error) {
					return reject(error);
				}
			});
		}
		/**
		 * Sends actions after text
		 * 
		 * @param {Array} actions Array of objects of actions to be sent. [{title, payload}];
		 * @param {String} text Text to be sent above the actions.
		 * @return	{Promise} Same as send().
		 * 
		 */
		sendActions(actions, text) {
			let message = {
				text,
				quick_replies: []
			};
			message.quick_replies = actions.map(action => {
				return {
					content_type: "text",
					title: action.title,
					payload: action.payload,
				};
			});
			return new Promise(async(resolve, reject) => {
				try {
					return resolve(await send(this.uid, message));
				}
				catch (err) {
					return reject(err);
				}
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
		return new Promise(async(resolve, reject) => {
			const options = {
				uri: 'https://graph.facebook.com/v2.6/me/messages',
				qs: {
					access_token: process.env.PAGE_ACCESS_TOKEN
				},
				method: 'POST',
				body: {
					recipient: {
						id: uid
					},
				},
				json: true,
			};
			if (type === 'message') {
				options.body.message = message;
			}
			else {
				options.body.sender_action = type;
			}
			if (process.env.NODE_ENV === 'test') {
				return resolve(options);
			}
			try {
				return resolve(await request(options));
			}
			catch (error) {
				return reject(error);
			}
		});
	}
})();
