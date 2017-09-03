(function() {
	'use strict';
	require('dotenv').load();
	const util = require('./utils');

	function Analyze() {
		const regex = {
			request: new RegExp('^((?=.*proximo( )?)((?=.*onibus)|(?=.*horario( )?)))|((?=.*proxima( )?)(?=.*linha( )?))|((?=.*quero)((?=.*onibus)|(?=.*horario(s)?)))|((?=.*quais)((?=.*horario( )?)|(?=.*onibus)))|((?=.*onibus( )?)((?=.*agora)))', 'gim'),
			greeting: new RegExp('^(bom dia|boa (tarde|noite)|oi(e)?|ola|ea(e|i)|e a(e|i)|cole|qual e|oo(i|la)|ooo(i|la))(?!.*(?:proxim(a|o)|onibus|horario(s?)|linha)).*', 'gim'),
			bye: new RegExp('^(xau|tchau|te vejo (mais tarde|depois)|vejo (voce|vc) (depois|mais tarde)|ate( (logo|mais))?).*', 'gim'),
			thanks: new RegExp('^(entendi|agradeco|obrigad(a|o)|grat(o|a)|agradecid(o|a)|legal|maneiro|top)(?!.*(?:proxim(a|o)|onibus|horario(s?)|linha)).*', 'gim'),
			price: new RegExp('((qual|quanto|quais são)+ (custa|e|o(s))?)|(tarifa|passage(m|ns)|valor|preco).*', 'gim'),
			compliment: new RegExp('te amo|top de( )?mais|maneiro (voce|vc)|(voce|seu|vc)( e)?( um)? ((bem|muito) )?(legal|maneiro|top|bom|esperto|inteligente|de( )?mais|lindo)', 'gim'),
		};
		const hasGreeting = (message) => message.match(regex.greeting);
		const hasBye = (message) => message.match(regex.bye);
		const hasThanks = (message) => message.match(regex.thanks);
		const hasPrice = (message) => message.match(regex.price);
		const hasCompliment = (message) => message.match(regex.compliment);
		const hasRequest = (message) => message.match(regex.request);
		
		/**
		 * Determines if the message has a request.
		 *
		 * @param      {String}    message  The message
		 * @return     {object}   search object
		 */
		const content = (message) => {
			message = util.removeAccents(message);
			const intent = {
			  isAllowed: false,
			  hasRequest: false,
			  hasGreeting: false,
			  hasBye: false,
			  hasThanks: false,
			  hasPrice: false,
			  hasCompliment: false,
			  hasPlace: false,
			};
			if (hasGreeting(message)) {
				intent.hasGreeting = true;
			}
			if (hasBye(message)) {
				intent.hasBye = true;
			}
			if (hasThanks(message)) {
				intent.hasThanks = true;
			}
			if (hasPrice(message)) {
				intent.hasPrice = true;
			}
			if (hasCompliment(message)) {
				intent.hasCompliment = true;
			}
			const place = util.getPlace(message);
			const time = util.convertTime(message);
			intent.hasPlace = (place.from && place.to) ? true : false;
			intent.isAllowed = (place.from && place.to) ? true : false;
			return {
				intent,
				from: place.from,
				to: place.to,
				check: time.check,
				timeShow: time.hour + ':' + time.minute,
				time: time.hour + time.minute,
			};
		};
		return {
			content,
		};
	}
	module.exports = Analyze();
})();