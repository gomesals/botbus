(function() {
	'use strict';
	const mongoose = require('mongoose');
	var Paths = new mongoose.Schema({
		title: String,
		neighborhoods: [String],
	});
	module.exports = mongoose.model('Paths', Paths, 'paths');
})();
