(function() {
	'use strict';
	require('dotenv').load();
	const express = require('express');
	const bodyParser = require('body-parser');
	const app = express();
	const PAGES = {
		index: require('./routes/index'),
		messenger: require('./routes/messenger')
	};
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(bodyParser.json());
	app.use('/', PAGES.index);
	app.use('/webhook/messenger', PAGES.messenger);
	app.listen((process.env.PORT || 3000), () => {
		console.log('Server running at port ' + (process.env.port || 3000));
	});
})();
