(function() {
	'use strict';
	require('dotenv').load();
	const expect = require('chai').expect;
	const messengerPlatform = require('../platform/messenger');
	const Messenger = new messengerPlatform();

	const uri = 'https://graph.facebook.com/v2.6/me/messages';
	const access_token = 'EAAIgOCRb6bYBAAcWZCkgxP47gBnrHNO7HseKOE6FgIo4lqZCZChiJIWpBpGIkhpYFCUKCrVNEIA5SeTZB0UabwJF7SIuYIZCZAhyvcVtpQOOrFAOjAYZAdWjIfcql9FC5TrSwOZCiFVVvzYfO1Swe2iDrfomQIE3A3qUWOYpX0u5kQZDZD';
	const method = 'POST';
	const id = 'someuid';
	const qs = {
		access_token,
	};
	const recipient = {
		id,
	};
	const text = 'Ola, tudo bem pessoal?';
	const options = {
		uri,
		qs,
		method,
		body: {
			recipient,
			message: {
				text,
			},
		},
		json: true,
	};


	describe('platform messenger', () => {
		describe('#sendText()', () => {
			it('should be the same object', async() => {
				try {
					Messenger.setUid(id);
					const response = await Messenger.sendText(text);
					expect(response).to.deep.equal(options);
				}
				catch (err) {
					handleErr(err);
				}
			});
		});
		describe('#sendWritting()', () => {
			it('should be the same object', async() => {
				const option = { ...options };
				option.body = {
					recipient,
					sender_action: 'typing_on',
				};
				try {
					Messenger.setUid(id);
					const response = await Messenger.sendWritting();
					expect(response).to.deep.equal(option);
				}
				catch (err) {
					handleErr(err);
				}
			});
		});
		describe('#getInfo()', () => {
			it('should be the same object', async() => {
				try {
					Messenger.setUid('1415778101834732');
					const { first_name } = await Messenger.getInfo();
					expect(first_name).to.equal('Alexandre');
				}
				catch (err) {
					handleErr(err);
				}
			});
		});
		describe('#sendActions()', () => {
			it('should be the same object', async() => {
				const option = { ...options };
				const actions = [{
					title: "Action 1",
					payload: "ACTIONS_PAYLOAD_1"
				}, {
					title: "Action 2",
					payload: "ACTIONS_PAYLOAD_2"
				}, ];
				const quick_replies = actions.map(action => {
					return {
						content_type: "text",
						title: action.title,
						payload: action.payload,
					};
				});

				const text = 'Sending actions is fun!';


				try {
					Messenger.setUid(id);
					const response = await Messenger.sendActions(actions, text);
					option.body.message = {
						text,
						quick_replies,
					};
					expect(option).to.deep.equal(response);
				}
				catch (err) {
					handleErr(err);
				}
			});
		});
		describe('#sendButton()', () => {
			it('should be the same object to postback', async() => {
				const option = { ...options };
				option.body.message = {
					attachment: {
						payload: {
							buttons: [{
								title: "button txt",
								type: "postback",
								payload: "ACTION",
							}, ],
							template_type: "button",
							text: "texto da mensagem",
						},
						type: "template",
					}
				};

				try {
					const button = await Messenger.createButton('button txt', 'postback', 'ACTION');
					Messenger.setUid(id);
					const response = await Messenger.sendButton([button], 'texto da mensagem');
					expect(response).to.deep.equal(option);
				}
				catch (err) {
					handleErr(err);
				}
			});
			it('should be the same object to url', async() => {
				const option = { ...options };
				option.body.message = {
					attachment: {
						payload: {
							buttons: [{
								title: "button txt",
								type: "web_url",
								url: "http://messenger.com",
							}, ],
							template_type: "button",
							text: "texto da mensagem",
						},
						type: "template",
					}
				};
				try {
					const button = await Messenger.createButton('button txt', 'url', 'http://messenger.com');
					Messenger.setUid(id);
					const response = await Messenger.sendButton([button], 'texto da mensagem');
					expect(response).to.deep.equal(option);
				}
				catch (err) {
					handleErr(err);
				}
			});
		});
	});

	function handleErr(err) {
		console.log(err);
	}
})();
