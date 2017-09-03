(function() {
	'use strict';
	const mongoose = require('mongoose');
	var Neighborhoods = new mongoose.Schema({
		title: String,
		value: String,
	});
	module.exports = mongoose.model('Neighborhoods', Neighborhoods, 'neighborhoods');
})();
