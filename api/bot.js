(function() {
	'use strict';
	const express = require('express');
	const router = express.Router();
	const Lines = require('../models/lines.model');
	const request = require('request-promise');
	const moment = require('moment-timezone');
	const direction = require('../tools/direction');
	moment.locale('pt-br');
	moment.tz.setDefault("America/Sao_Paulo");
	router.route('/:from/:to/:now/:today/:check').get(_get);

	async function _get(req, res) {
		try {
			const search = constructSearch(req.params);
			const data = await Lines
				.find(search, 'timeOut timeOutShow special neighborhoods passesBy from to')
				.sort({ timeOut: 1 })
				.limit(8);
			const results = await direction.compare({
				from: req.params.from,
				to: req.params.to,
			}, data, 4);
			return res.json(results);
		}
		catch (err) {
			res.sendStatus(500);
			handleErr(err);
		}
	};
	module.exports = router;

	/**
	 * Constructs and returns the search object.
	 * 
	 * @param {Object} params The params from the request.
	 * @return	{Object} Object with the search params. {neighborhoods, workDay, timeOut}
	 * 
	 */
	function constructSearch(params) {
		const search = {
			neighborhoods: {
				$all: [
					params.from,
					params.to
				]
			},
			workDay: getDay(params.today),
		};
		if (!params.check || params.check === 'gte') {
			search.timeOut = {
				$gte: getTime(params.now, params.check)
			};
		}
		else {
			search.timeOut = {
				$gte: getTime(params.now, params.check),
				$lte: params.now
			};
		}
		return search;
	}

	/**
	 * Gets the time to search.
	 * 
	 * @param {String} time The time to search;
	 * @param {String} period The period to search. gte if after the current time; lt if before.
	 * @return	{String} The time to search.
	 * 
	 */
	function getTime(time, period) {
		let t = time === 'true' ? moment().format('HHmm') : time;
		if (period === 'lt') {
			t -= 170;
		}
		else {
			t -= 5;
		}
		t = (t < 1000) ? '0' + t : t;
		t = (t < 100) ? '0' + t : t;
		return t;
	}

	/**
	 * Gets the day to search.
	 * 
	 * @param {String} today True if the search is for today; false otherwise.
	 * @return {String} The day to search.
	 * 
	 */
	function getDay(today) {
		// TODO: Move holidays to database
		const holidays = ['0101', '0228', '0414', '0421', '0501', '0615', '0907', '1012', '1102', '1115', '1225'];
		if (holidays.indexOf(moment().format('MMDD')) > -1) {
			return 'Sun';
		}
		if (today === 'true') {
			return moment().locale('en').format('ddd');
		}
		return today;
	}

	function handleErr(err) {
		console.log(err);
	}
})();
