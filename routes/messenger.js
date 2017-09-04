(function() {
	'use strict';
	const express = require('express');
	const messengerPlatform = require('../platform/messenger');
	const generalPlatform = require('../platform/general');
	const Messenger = new messengerPlatform();
	const General = new generalPlatform(Messenger);
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
		events.map(async(event) => {
			General.setUid(event.sender.id);
			if (event.message && event.message.text) {
				try {
					General.setText(event.message.text);
					General.interpretate();
				}
				catch (err) {
					handleErr(err);
				}
			}
			else if (event.postback) {
				General.postbacks(event.postback);
			}
		});
		res.sendStatus(200);
	};

	function handleErr(err) {
		console.log(err);
	}
	module.exports = router;
})();
