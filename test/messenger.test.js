(function() {
	'use strict';
	require('dotenv').load();
	const expect = require('chai').expect;
	const uid = '1415778101834732';
	const Messenger = require('../platform/messenger');
	describe('platform messenger', () => {
		describe('send text', () => {
			it('should be the same object', () => {
				const text = 'Ola, tudo bem pessoal?';
				const options = {
					url: 'https://graph.facebook.com/v2.6/me/messages',
					qs: {
						access_token: 'EAAIgOCRb6bYBAAcWZCkgxP47gBnrHNO7HseKOE6FgIo4lqZCZChiJIWpBpGIkhpYFCUKCrVNEIA5SeTZB0UabwJF7SIuYIZCZAhyvcVtpQOOrFAOjAYZAdWjIfcql9FC5TrSwOZCiFVVvzYfO1Swe2iDrfomQIE3A3qUWOYpX0u5kQZDZD'
					},
					method: 'POST',
					json: {
						recipient: {
							id: '1415778101834732'
						},
						message: {
							text: text
						}
					}
				};
				Messenger.sendText(uid, text).then(r => {
					expect(r).to.deep.equal(options);
				}).catch(e => {
					// It should not reach here
					console.log(e);
				});
			});
		});
	});
})();
