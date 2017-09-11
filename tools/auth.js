(function() {
	'use strict';
	const auth = {
		isAuth,
	};

	function isAuth(req, res, next) {
		if (req.session.auth) {
			return next();
		}
		res.redirect('https://' + req.headers.host + '/painel');
	}

	module.exports = auth;
})();
