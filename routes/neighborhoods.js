(function() {
	'use strict';
	const auth = require('../tools/auth');
	const express = require('express');
	const router = express.Router();
	router.route('/').get(auth.isAuth, _get);
	router.route('/novo').get(auth.isAuth, _new);
	router.route('/:id').get(auth.isAuth, _edit);

	function _get(req, res) {
		res.render('neighborhoods');
	}

	function _new(req, res) {
		res.render('neighborhoods-form', { edit: false });
	}

	function _edit(req, res) {
		res.render('neighborhoods-form', { edit: true });
	}
	module.exports = router;
})();
