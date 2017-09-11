(function() {
	'use strict';
	const express = require('express');
	const router = express.Router();
	router.route('/').post(_post);

	function _post(req, res) {
		console.log(req.session.auth);
		if (req.body.user === process.env.AUTH_USER && req.body.pass === process.env.AUTH_PASS) {
			req.session.auth = true;
			return res.sendStatus(200);
		}
		return res.sendStatus(403);
	}
	module.exports = router;
})();
