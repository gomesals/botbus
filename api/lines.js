(function() {
	'use strict';
	const express = require('express');
	const router = express.Router();
	const Lines = require('../models/lines.model');
	const request = require('request-promise');
	router.route('/').get(_get).post(_post);
	router.route('/:id').get(_getOne).put(_put).delete(_delete);

	async function _get(req, res) {
		if (req.query.info) {
			try {
				return res.json(await Lines.find({}, 'from passesBy special to workDay'));
			}
			catch (err) {
				res.sendStatus(500);
				handleErr(err);
			}
		}
		try {
			return res.json(await Lines.find({}));
		}
		catch (err) {
			res.sendStatus(500);
			handleErr(err);
		}
	};
	async function _post(req, res) {
		try {
			const { neighborhoods } = JSON.parse(await request(`${process.env.APP_URL}api/paths/${req.body.path_id}`));
			req.body.special = req.body.special === true;
			req.body.passesBy = req.body.passesBy ? req.body.passesBy.split(',') : [];
			req.body.workDay = (req.body.workDay && req.body.workDay.length > 0) ? req.body.workDay : ['Sun'];
			req.body.timeOutShow = req.body.timeOutShow.split(',');
			req.body.passesBy = clear(req.body.passesBy);
			req.body.timeOutShow = clear(req.body.timeOutShow);
			req.body.timeOut = redo(req.body.timeOutShow);
			req.body.neighborhoods = neighborhoods;

			const data = await new Lines(req.body).save();
			if (data) {
				return res.json(data);
			}
			return res.sendStatus(500);
		}
		catch (err) {
			res.sendStatus(500);
			handleErr(err);
		}
	};
	async function _getOne(req, res) {
		try {
			const data = await Lines.findOne({ _id: req.params.id });
			if (data) {
				return res.json({
					_id: data._id,
					from: data.from,
					to: data.to,
					passesBy: data.passesBy.join(', '),
					workDay: data.workDay,
					special: data.special,
					path_id: data.path_id,
					timeOutShow: data.timeOutShow.join(', '),
				});
			}
			return res.sendStatus(404);
		}
		catch (err) {
			res.sendStatus(500);
			handleErr(err);
		}
	};

	async function _put(req, res) {
		try {
			const { neighborhoods } = JSON.parse(await request(`${process.env.APP_URL}api/paths/${req.body.path_id}`));
			req.body.special = req.body.special === true;
			req.body.workDay = (req.body.workDay && req.body.workDay.length > 0) ? req.body.workDay : ['Sun'];
			req.body.neighborhoods = neighborhoods;
			if (req.body.passesBy) {
				if (typeof req.body.passesBy === 'string') {
					req.body.passesBy = req.body.passesBy.split(',');
					req.body.passesBy = clear(req.body.passesBy);
				}
			}
			if (req.body.timeOutShow) {
				if (typeof req.body.timeOutShow === 'string') {
					req.body.timeOutShow = req.body.timeOutShow.split(',');
					req.body.timeOutShow = clear(req.body.timeOutShow);
					req.body.timeOut = redo(req.body.timeOutShow);
				}
			}

			const { ok } = await Lines.update({ _id: req.params.id }, { $set: req.body });
			return res.sendStatus(ok === 1 ? 200 : 500);
		}
		catch (err) {
			res.sendStatus(500);
			handleErr(err);
		}
	};

	async function _delete(req, res) {
		try {
			await Lines.remove({ _id: req.params.id });
			return res.sendStatus(200);
		}
		catch (err) {
			res.sendStatus(500);
			handleErr(err);
		}
	};

	function redo(times) {
		return times.map(item => item.split(':').join(''));
	}

	function clear(values) {
		return values.map(item => item.replace(/ /g, ''));
	}
	module.exports = router;

	function handleErr(err) {
		console.log(err);
	}
})();
