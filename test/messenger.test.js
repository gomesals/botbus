(function() {
	'use strict';
	require('dotenv').load();
	const expect = require('chai').expect;
	const messengerPlatform = require('../platform/messenger');
	const Messenger = new messengerPlatform();

	const url = 'https://graph.facebook.com/v2.6/me/messages';
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
		url,
		qs,
		method,
		json: {
			recipient,
			message: {
				text,
			},
		},
	};


	describe('platform messenger', () => {
		describe('#sendText()', () => {
			it('should be the same object', async() => {
				try {
					Messenger.setUid(id);
					const response = await Messenger.sendText(text);
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
					url,
					qs,
					method,
					json: {
						recipient,
						sender_action: 'typing_on',
					}
				};
				try {
					Messenger.setUid(id);
					const response = await Messenger.sendWritting();
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
					Messenger.setUid('1415778101834732');
					const { first_name } = await Messenger.getInfo();
					expect(first_name).to.equal('Alexandre');
				}
				catch (error) {
					throw error;
				}
			});
		});
	});
})();
