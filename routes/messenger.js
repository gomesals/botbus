(function() {
	'use strict';
	const express = require('express');
	const router = express.Router();
	router.route('/').get(_get);

	function _get(req, res) {
		if (req.query['hub.verify_token'] === process.env.TOKEN) {
			res.send(req.query['hub.challenge']);
		} else {
			res.send('Invalid TOKEN');
		}
	}
	module.exports = router;
})();
