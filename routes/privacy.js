(function() {
	'use strict';
	const express = require('express');
	const router = express.Router();
	router.route('/').get(_get);

	function _get(req, res) {
		res.render('privacy');
	}
	module.exports = router;
})();
