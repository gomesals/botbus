(function() {
	'use strict';
	const express = require('express');
	const router = express.Router();
	router.route('/').get(_get);
	router.route('/sair').get(logout);

	function _get(req, res) {
		res.render('auth');
	}

	function logout(req, res) {
		delete req.session.auth;
		res.redirect('https://' + req.headers.host + '/painel');
	}
	module.exports = router;
})();
