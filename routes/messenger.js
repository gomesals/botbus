(function() {
	'use strict';
	const express = require('express');
	const router = express.Router();
	const Messenger = require('../platform/messenger');
	const request = require('request');
	router.route('/').get(_get).post(_post);

	function _get(req, res) {
		if (req.query['hub.verify_token'] === process.env.TOKEN) {
			res.send(req.query['hub.challenge']);
		} else {
			res.send('Invalid TOKEN');
			console.log('Invalid TOKEN');
		}
	}

	function _post(req, res) {
		var events = req.body.entry[0].messaging;
		for (var i = 0; i < events.length; i++) {
			var event = events[i];
			if (event.message && event.message.text) {
				Messenger.sendText(event.sender.id, 'Echo:' + event.message.text).then(next).catch(handleErr);
			}
		}
		res.sendStatus(200);
	}

	function next(data) {
		// console.log(data);
	}

	function handleErr(err) {
		throw err;
	}
	module.exports = router;
})();
