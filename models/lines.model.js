(function() {
	'use strict';
	const mongoose = require('mongoose');
	var Lines = new mongoose.Schema({
		from: String,
		to: String,
		workDay: [String],
		passesBy: [String],
		timeOut: [String],
		timeOutShow: [String],
		special: {
			type: Boolean,
			default: false
		},
		neighborhoods: [String],
		path_id: mongoose.Schema.Types.ObjectId,
	});
	module.exports = mongoose.model('Lines', Lines, 'lines');
})();
