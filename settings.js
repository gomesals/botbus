(function() {
	"use strict";
	const express = require('express');
	const bodyParser = require('body-parser');
	const compression = require('compression');
	const mongoose = require('mongoose');
	const moment = require('moment');
	const mongodbUri = process.env.MONGO_CONTROL;
	const options = {
		useMongoClient: true,
		keepAlive: true,
		reconnectTries: 30
	};

	moment.locale('pt-br');

	mongoose.connect(mongodbUri, options);
	mongoose.Promise = global.Promise;
	mongoose.connection.on('connected', connected);
	mongoose.connection.on('error', errConenection);
	mongoose.connection.on('disconnected', disconnected);
	module.exports = (app) => {
		app.set('view engine', 'pug');
		app.use(express.static('./public'));
		app.use(bodyParser.json());
		app.use(compression());
		app.use(bodyParser.urlencoded({
			extended: false
		}));
		app.locals.Site = {
			base: process.env.APP_URL,
		};
	};

	process.on('SIGINT', function() {
		mongoose.connection.close(closedByApp);
	});

	function connected() {
		console.log(`Database connected: ${moment().format('llll')}`);
	}

	function errConenection(err) {
		console.log(`Database connection error: ${moment().format('llll')}`);
		console.log(err);
	}

	function disconnected() {
		console.log(`Mongoose disconnected: ${moment().format('llll')}`);
	}

	function closedByApp() {
		console.log(`Mongoose connection disconnected through app termination: ${moment().format('llll')}`);
		process.exit(0);
	}
})();
