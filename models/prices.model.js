(function() {
	'use strict';
	const mongoose = require('mongoose');
	var Prices = new mongoose.Schema({
		title: String,
		price: String,
	});
	module.exports = mongoose.model('Prices', Prices, 'prices');
})();
