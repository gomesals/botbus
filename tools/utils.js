(function() {
	'use strict';
	const moment = require('moment-timezone');
	const accentsMap = {
		"â": "a",
		"Â": "A",
		"à": "a",
		"À": "A",
		"á": "a",
		"Á": "A",
		"ã": "a",
		"Ã": "A",
		"ê": "e",
		"Ê": "E",
		"è": "e",
		"È": "E",
		"é": "e",
		"É": "E",
		"î": "i",
		"Î": "I",
		"ì": "i",
		"Ì": "I",
		"í": "i",
		"Í": "I",
		"õ": "o",
		"Õ": "O",
		"ô": "o",
		"Ô": "O",
		"ò": "o",
		"Ò": "O",
		"ó": "o",
		"Ó": "O",
		"ü": "u",
		"Ü": "U",
		"û": "u",
		"Û": "U",
		"ú": "u",
		"Ú": "U",
		"ù": "u",
		"Ù": "U",
		"ç": "c",
		"Ç": "C"
	};
	const timeMap = [{
		'from': ['uma', 'treze'],
		'to': {
			'am': '01',
			'pm': '13'
		}
	}, {
		'from': ['duas', 'catorze'],
		'to': {
			'am': '02',
			'pm': '14'
		}
	}, {
		'from': ['tres', 'quinze'],
		'to': {
			'am': '03',
			'pm': '15'
		}
	}, {
		'from': ['quatro', 'dezesseis'],
		'to': {
			'am': '04',
			'pm': '16'
		}
	}, {
		'from': ['cinco', 'dezessete'],
		'to': {
			'am': '05',
			'pm': '17'
		}
	}, {
		'from': ['seis', 'dezoito'],
		'to': {
			'am': '06',
			'pm': '18'
		}
	}, {
		'from': ['sete', 'dezenove'],
		'to': {
			'am': '07',
			'pm': '19'
		}
	}, {
		'from': ['oito', 'vinte'],
		'to': {
			'am': '08',
			'pm': '20'
		}
	}, {
		'from': ['nove', 'vinte e uma'],
		'to': {
			'am': '09',
			'pm': '21'
		}
	}, {
		'from': ['dez', 'vinte e duas'],
		'to': {
			'am': '10',
			'pm': '22'
		}
	}, {
		'from': ['onze', 'vinte e tres'],
		'to': {
			'am': '11',
			'pm': '23'
		}
	}, {
		'from': ['doze', 'vinte e quatro'],
		'to': {
			'am': '12',
			'pm': '00'
		}
	}];
	const minutes = [{
		'from': 'e dez',
		'to': '10'
	}, {
		'from': 'e vinte',
		'to': '20'
	}, {
		'from': 'e meia',
		'to': '30'
	}, {
		'from': 'e trinta',
		'to': '30'
	}, {
		'from': 'e quarenta',
		'to': '40'
	}, {
		'from': 'e cinquenta',
		'to': '50'
	}, {
		'from': 'em ponto',
		'to': '00'
	}];
	const period = ['manha', 'tarde', 'noite'];
	const check = ['antes', 'Antes', 'depois', 'Depois'];
	moment.locale('pt-br');
	moment.tz.setDefault("America/Sao_Paulo");

	/**
	 * Removes accents.
	 * 
	 * @param       {string} word String to be treated
	 * @return       {string} The word without accents
	 */
	const removeAccents = (word) => word.replace(/[\W\[\] ]/gim, (letter) => accentsMap[letter] || letter).toLowerCase();
	/**
	 * Removes a time.
	 *
	 * @param      {string}  message  The message
	 * @return     {string}  The message without time
	 */
	const removeTime = (message) => {
		timeMap.map(element => {
			message = message.replace(element.from[0], '').replace(element.from[1], '');
		});
		return message;
	};
	/**
	 * Gets the places from the message
	 * 
	 * @param {string} message The text to be used
	 * @return {object} {from, to} if the places were found; {false, false} otherwise
	 */
	const getPlace = (message) => {
		message = removeAccents(message);
		message = removeTime(message);
		const pattern = /(d(o|e)|saindo d(o|e)) [a-z]{3,} ([a-z]{3,} )?(ate( (o|a))?|a(i|o)?|pr(o|a)|para( o)?) [a-z]{3,}/gmi;
		const place = message.match(pattern);
		if (place) {
			const patternFrom = /(do|de) [a-z]{3,} ([a-z]{3,} )?/gmi;
			const patternFromReplace = /(d(o|e)|ate( (o|a))?) ?/gmi;
			const patternTo = / (ate( (o|a))?|a(o|i)?|pr(o|a)|para( o)?|ao) [a-z]{3,}( ?(([a-z]| )+))/gmi;
			const patternToReplace = / (a|o|ao|ate( (o|a))?|a(o|i)?|pr(o|a)|para( o)?|(antes|depois) das) /gmi;
			try {
				let from = message.match(patternFrom, '');
				from = from[0].replace(patternFromReplace, '');
				from = from.replace(/^ /, '').replace(/ $/, '');
				let to = message.match(patternTo, '');
				to = to[0].replace(patternToReplace, '');
				to = to.replace(/^(a|o)? /, '').replace(/ $/, '');
				return {
					from,
					to,
				};
			}
			catch (err) {
				return {
					from: false,
					to: false,
				};
			}
		}
		return {
			from: false,
			to: false,
		};
	};
	/**
	 * Separates the minutes from the hour
	 * 
	 * @param {string} time The time
	 * @return {object} {hour, minute}
	 */
	const separateMinutes = (time) => {
		const patternHourMinute = /[0-9]{1}:[0-9]{1}/gim;
		const separate = time.match(patternHourMinute);
		let result = {};
		let temp;
		if (separate) {
			temp = separate[0].split(':');
			result.hour = '0' + temp[0];
			result.minute = temp[1] + '0';
		}
		else {
			temp = time.split('');
			let first = parseInt(temp[0], 10);
			if (first === 0) {
				result.hour = '0' + temp[1];
				result.minute = temp[2] + '0';
			}
			else {
				if (first > 2) {
					result.hour = '0' + temp[0];
					result.minute = temp[1] + temp[2];
				}
				else {
					result.hour = temp[0] + temp[1];
					result.minute = temp[2] + '0';
				}
			}
		}
		return result;
	};
	/**
	 * Checks if the message has the time provided in the number format
	 * 
	 * @param {string} message The text to be used
	 * @return {string} the time if found; false otherwise
	 */
	const getNumber = (message) => {
		const pattern = /[0-9]{1,2}:?[0-9]{0,2}/gim;
		let time = message.match(pattern);
		let result = {};
		if (time) {
			time = time[0];
			switch (time.length) {
				case 1:
					result.hour = '0' + time;
					result.minute = '00';
					break;
				case 2:
					result.hour = time;
					result.minute = '00';
					break;
				case 3:
					result = separateMinutes(time);
					break;
				case 4:
					result.hour = time[0] + time[1];
					result.minute = time[2] + time[3];
					break;
				case 5:
					result.hour = time[0] + time[1];
					result.minute = time[3] + time[4];
					break;
			}
			result.hour = parseInt(result.hour, 10) >= 24 ? '00' : result.hour;
			result.minute = parseInt(result.minute, 10) >= 60 ? 59 : result.minute;
			result.period = parseInt(result.hour, 10) < 12 ? 'am' : 'pm';
			return result;
		}
		return false;
	};
	/**
	 * Get the hours from the message
	 * 
	 * @param {string} message The text to be used
	 * @return {string} the hours if provided; 00 otherwise
	 */
	const getHours = (message) => {
		let hour = [];
		//TODO: replace for regex
		timeMap.map(time => {
			if (message.search(time.from[0]) != -1) {
				if (message.search('vinte e') == -1 && message.search('dezenove') == -1) {
					hour = hour.concat(time.to.am);
				}
			}
			if (message.search(time.from[1]) != -1) {
				if (message.search('vinte e') != -1) {
					if (message.search('vinte e uma') != -1) {
						hour = hour.concat('21');
					}
					else if (message.search('vinte e duas') != -1) {
						hour = hour.concat('22');
					}
					else if (message.search('vinte e tres') != -1) {
						hour = hour.concat('23');
					}
					else if (message.search('vinte e quatro') != -1) {
						hour = hour.concat('00');
					}
					else {
						hour = hour.concat('20');
					}
				}
				else {
					hour = hour.concat(time.to.pm);
				}
			}
		});
		return hour[0];
	};
	/**
	 * Get the minutes from the message
	 * 
	 * @param {string} message The text to be used
	 * @return {string} the minutes if provided; 00 otherwise
	 */
	const getMinutes = (message) => {
		const minute = minutes.filter(minute => message.search(minute.from) != -1);
		return minute.length > 0 ? minute[0].to : '00';
	};
	/**
	 * Get the time converted to be queried
	 * 
	 * @param {string} message The text to be used
	 * @return {object} with hour and minute
	 */
	const analyzeTime = (message) => {
		const hour = getHours(message);
		const minute = getMinutes(message);
		return {
			hour,
			minute
		};
	};
	/**
	 * Check if the time is to be used as after or before the time given
	 * 
	 * @param   {string} message The text to be used
	 * @return  {string} 'lt' if it is to be used before the time given; 'gte' otherwise
	 */
	const isAfterBefore = (message) => {
		if (message.search(check[0]) != -1 || message.search(check[1]) != -1) {
			return 'lt';
		}
		else {
			return 'gte';
		}
	};
	/**
	 * Returns if the time is 'pm' or 'am'
	 * 
	 * @param {string} message The text to be used
	 * @param {string} hour The hour to search
	 * @return {string} 'am' if the time is before 12, 'pm' otherwise
	 */
	const getPeriod = (message, hour) => {
		if (hour > 12) {
			return 'pm';
		}
		if (message.search(period[0]) != -1) {
			return 'am';
		}
		else {
			if (message.search(period[1]) != -1 || message.search(period[2]) != -1) {
				return 'pm';
			}
			else {
				return moment().format('a');
			}
		}
	};
	/**
	 * Converts from text to number
	 * Ex.: dezesseis e meia (sixteen and half) -> 16:30
	 * 
	 * @param {string} message The text to be used
	 * @return  {object} with the time (hour, minute, period)
	 */
	const convertTime = (message) => {
		message = removeAccents(message);
		let result = {};
		const number = getNumber(message);
		if (number) {
			result = number;
		}
		else {
			result = analyzeTime(message);
		}
		if (!result.hour) {
			result.hour = moment().format('HH');
			result.minute = moment().format('mm');
		}
		result.check = isAfterBefore(message);
		if (!result.period) {
			result.period = getPeriod(message, result.hour);
		}
		if (result.period === 'pm' && parseInt(result.hour, 10) < 12 && parseInt(result.hour, 10) !== 0) {
			result.hour = parseInt(result.hour, 10) + 12 + '';
		}
		return result;
	};
	module.exports = {
		removeAccents,
		convertTime,
		getPlace,
	};
})();
