(function() {
	'use strict';
	const mongoose = require('mongoose');
	var pathsSchema = new mongoose.Schema({
		title: String,
		neighborhoods: ['String'],
	});
	var Paths = mongoose.model('Paths', pathsSchema, 'paths');
	module.exports = {
		Paths,
	};
})();