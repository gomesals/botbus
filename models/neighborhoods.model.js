(function() {
	'use strict';
	const mongoose = require('mongoose');
	var neighborhoodsSchema = new mongoose.Schema({
		title: String,
	});
	var Neighborhoods = mongoose.model('Neighborhoods', neighborhoodsSchema, 'neighborhoods');
	module.exports = {
		Neighborhoods,
	};
})();