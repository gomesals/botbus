(function() {
	'use strict';
	const mongoose = require('mongoose');
	var Lines = new mongoose.Schema({
		from: String,
		to: String,
		workDay: ['String'],
		neighborhoods: ['String'],
		timeOut: String,
		timeOutShow: String,
		special: {
			type: Boolean,
			default: false
		},
		passesBy: ['String']
	});
	module.exports = mongoose.model('Lines', Lines, 'lines');
})();
