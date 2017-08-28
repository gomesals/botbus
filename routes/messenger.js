(function() {
	'use strict';
	const express = require('express');
	const messengerPlatform = require('../platform/messenger');
	const Messenger = new messengerPlatform();
	const router = express.Router();
	router.route('/').get(_get).post(_post);

	function _get(req, res) {
		if (req.query['hub.verify_token'] === process.env.TOKEN) {
			res.send(req.query['hub.challenge']);
		}
		else {
			res.send('Invalid TOKEN');
			console.log('Invalid TOKEN');
		}
	}

	async function _post(req, res) {
		const events = req.body.entry[0].messaging;
		events.map(async (event) => {
			if (event.message && event.message.text) {
				try {
					Messenger.setUid(event.sender.id);
					await Messenger.sendText(`Echo: ${event.message.text}`);
				}
				catch (err) {
					handleErr(err);
				}
			}
		});
		res.sendStatus(200);
	};

	function handleErr(err) {
		throw err;
	}
	module.exports = router;
})();
