(function() {
	'use strict';
	require('dotenv').load();
	const expect = require('chai').expect;
	const messengerPlatform = require('../platform/messenger');
	const generalPlatform = require('../platform/general');
	const Messenger = new messengerPlatform();
	const General = new generalPlatform(Messenger);

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


	describe('platform general', () => {
		describe('#sendText()', () => {
			it('should be the same object', async() => {
				try {
					General.setUid(id);
					const response = await General.sendText(text);
					expect(response).to.deep.equal(options);
				}
				catch (error) {
					throw error;
				}
			});
		});
		describe('#sendWritting()', () => {
			it('should be the same object', async() => {
				const text = 'Ola, tudo bem pessoal?';
				const options = {
					uri,
					qs,
					method,
					body: {
						recipient,
						sender_action: 'typing_on',
					},
					json: true,
				};
				try {
					General.setUid(id);
					const response = await General.sendWritting();
					expect(response).to.deep.equal(options);
				}
				catch (error) {
					throw error;
				}
			});
		});
		describe('#getInfo()', () => {
			it('should be the same object', async() => {
				try {
					General.setUid('1415778101834732');
					const { first_name } = await General.getInfo();
					expect(first_name).to.equal('Alexandre');
				}
				catch (error) {
					throw error;
				}
			});
		});
		describe('#sendButton()', () => {
			it('should be the same object to postback', async() => {
				const options = {
					uri,
					qs,
					method,
					body: {
						recipient,
						message: {
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
						},
					},
					json: true,
				};
				try {
					const button = await General.createButton('button txt', 'postback', 'ACTION');
					General.setUid('someuid');
					const response = await General.sendButton([button], 'texto da mensagem');
					expect(response).to.deep.equal(options);
				}
				catch (error) {
					throw error;
				}
			});
			it('should be the same object to url', async() => {
				const options = {
					uri,
					qs,
					method,
					body: {
						recipient,
						message: {
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
						},
					},
					json: true,
				};
				try {
					const button = await General.createButton('button txt', 'url', 'http://messenger.com');
					General.setUid('someuid');
					const response = await General.sendButton([button], 'texto da mensagem');
					expect(response).to.deep.equal(options);
				}
				catch (error) {
					throw error;
				}
			});
		});
	});
})();
