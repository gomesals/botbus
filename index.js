(function() {
	'use strict';
	require('dotenv').load();
	const express = require('express');
	const app = express();
	const PAGES = {
		index: require('./routes/index'),
		messenger: require('./routes/messenger'),
	};
	const API = {
		auth: require('./api/auth'),
		lines: require('./api/lines'),
		paths: require('./api/paths'),
		neighborhoods: require('./api/neighborhoods'),
		prices: require('./api/prices'),
	};
	const PAINEL = {
		neighborhoods: require('./routes/neighborhoods'),
	};
	require('./settings')(app);
	app.use('/painel/neighborhoods', PAINEL.neighborhoods);
	app.use('/api/auth', API.auth);
	app.use('/api/lines', API.lines);
	app.use('/api/paths', API.paths);
	app.use('/api/neighborhoods', API.neighborhoods);
	app.use('/api/prices', API.prices);
	app.use('/', PAGES.index);
	app.use('/webhook/messenger', PAGES.messenger);
	app.listen((process.env.PORT || 3000), () => {
		console.log('Server running at port ' + (process.env.PORT || 3000));
	});
})();
