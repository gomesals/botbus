(function() {
	'use strict';
	const express = require('express');
	const router = express.Router();
	const Lines = require('../models/lines.model');
	const moment = require('moment-timezone');
	const direction = require('../tools/direction');
	moment.locale('pt-br');
	moment.tz.setDefault("America/Sao_Paulo");
	router.route('/:from/:to/:now/:today/:check').get(_get);

	async function _get(req, res) {
		try {
			const { search, time } = constructSearch(req.params);
			const data = await Lines
				.find(search, 'timeOut special neighborhoods passesBy from to')
				.sort({ timeOut: 1 })
				.limit(8);
			const resultsFilteredByDirection = await direction.compare({
				from: req.params.from,
				to: req.params.to,
			}, data, 4);

			return res.json(filterTime({ time }, resultsFilteredByDirection));
		}
		catch (err) {
			res.sendStatus(500);
			handleErr(err);
		}
	};
	module.exports = router;

	/**
	 * Filters the results with the search time.
	 * 
	 * @param {Object} filter options. {time}
	 * @param {Object} results The results from the search already filtered by location.
	 * @return	{Object} Results with the time filtered. {from, to timeOut, special, passesBy}
	 * 
	 */
	function filterTime(filter, results) {
		return results.map(line => {
			const timeSorted = line.timeOut.sort();
			if (!filter.time.lte) {
				line.timeOut = timeSorted.filter(time => {
					return parseInt(time, 10) >= parseInt(filter.time.gte, 10);
				}).filter((time, index) => {
					if (index < 4) {
						return time;
					}
				});
			}
			else {
				line.timeOut = timeSorted.filter(time => {
					return parseInt(time, 10) <= parseInt(filter.time.lte, 10);
				}).reverse().filter((time, index) => {
					if (index < 4) {
						return time;
					}
				});
			}
			return {
				from: line.from,
				to: line.to,
				timeOut: line.timeOut,
				special: line.special,
				passesBy: line.passesBy,
			};
		});
	}

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
		const gte = getTime(params.now, params.check);
		let lte;
		if (!params.check || params.check === 'gte') {
			search.timeOut = {
				$gte: gte,
			};
		}
		else {
			search.timeOut = {
				$gte: gte,
				$lte: params.now
			};
			lte = params.now;
		}
		return { search, time: { gte, lte } };
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
		const timeSearch = moment().hour(time[0] + '' + time[1]).minute(time[2] + '' + time[3]);
		if (period === 'lt') {
			return timeSearch.subtract(90, 'minutes').format('HHmm');
		}
		return timeSearch.subtract(10, 'minutes').format('HHmm');
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
