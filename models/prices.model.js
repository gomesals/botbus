(function() {
	'use strict';
	const mongoose = require('mongoose');
	var pricesSchema = new mongoose.Schema({
		title: String,
		neighborhoods: ['String'],
	});
	var Prices = mongoose.model('Prices', pricesSchema, 'prices');
	module.exports = {
		Prices,
	};
})();