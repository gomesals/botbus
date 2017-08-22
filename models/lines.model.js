(function() {
	'use strict';
	const mongoose = require('mongoose');
	var linesSchema = new mongoose.Schema({
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
	var Lines = mongoose.model('Lines', linesSchema, 'lines');
	module.exports = {
		Lines,
	};
})();