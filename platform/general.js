(function() {
	"use strict";
	const request = require('request-promise');
	const config = require('config');
	const Analyze = require('../tools/analyze');
	// Default texts
	const defaultOf = {
		price: config.get('defaults.price'),
		hi: config.get('defaults.hi'),
		bye: config.get('defaults.bye'),
		thanks: config.get('defaults.thanks'),
		compliment: config.get('defaults.compliment'),
		confused: config.get('defaults.confused'),
		list: config.get('defaults.list'),
	};
	const searching = {
		defaults: config.get('search.defaults'),
		replace: {
			verb: config.get('search.replace.verb'),
			object: config.get('search.replace.object'),
			before: config.get('search.replace.before'),
			after: config.get('search.replace.after'),
			icons: config.get('search.replace.icons'),
		},
	};

	/**
	 * Class to handle the messages sent by the user.
	 * 
	 */
	class General {
		/**
		 * Sets the platform.
		 * 
		 * @param {object} platform The platform to be used.
		 * 
		 */
		constructor(platform) {
			this.platform = platform;
		}
		/**
		 * Sets user id.
		 * 
		 * @param {Int} uid User identification.
		 * 
		 */
		setUid(uid) {
			this.platform.setUid(uid);
		}
		/**
		 * Sets the text sent by the user.
		 * 
		 * @param {String} text Text send by the user.
		 *
		 */
		setText(text) {
			this.text = text;
		}
		/**
		 * Returns a callback after the @ms time.
		 * 
		 * @param {Int} ms Time in milliseconds to wait;
		 * @param {any} data Data to be used after timeout.
		 * @reutrn	{Function} Callback
		 * 
		 */
		wait(ms, data = null) {
			return new Promise(async(resolve) => {
				setTimeout(() => {
					resolve(data);
				}, ms);
			});
		}
		/**
		 * Checks if the text sent is a reserved word to be used as action.
		 * 
		 * @return	{Promise} true if is resrved; false otherwise.
		 * 
		 */
		isDefined() {
			return new Promise((resolve, reject) => {
				switch (this.text.toUpperCase()) {
					case 'EXEMPLOS':
						this.sendExamples();
						resolve(true);
						break;
					case 'SOBRE':
						this.sendAbout();
						resolve(true);
						break;
					case 'DUVIDA':
					case 'DUVIDAS':
					case 'DÚVIDA':
					case 'DÚVIDAS':
						this.sendDoubts();
						resolve(true);
						break;
					default:
						resolve(false);
						break;
				}
				resolve(false);
			});
		}
		/**
		 * Handles all the text sent by the user.
		 * 
		 */
		async interpretate() {
			const defined = await this.isDefined();
			if (!defined) {
				this.treat();
			}
		}
		/**
		 * Treats the message sent by the user
		 *
		 */
		treat() {
			const { intent, ...search } = Analyze.content(this.text);
			// console.log(intent);
			if (intent.isAllowed) {
				this.platform.sendText(getSearchingText(search));
				this.platform.sendWritting();
				console.log(search);
				// TODO: search and send the information
				return;
			}
			if (intent.hasPrice) {
				this.sendPrice();
				return;
			}
			if (intent.hasGreeting) {
				this.platform.sendText(defaultOf.hi[getRandom(defaultOf.hi.length)]);
				return;
			}
			if (intent.hasBye) {
				this.platform.sendText(defaultOf.bye[getRandom(defaultOf.bye.length)]);
				return;
			}
			if (intent.hasThanks) {
				this.platform.sendText(defaultOf.thanks[getRandom(defaultOf.thanks.length)]);
				return;
			}
			if (intent.hasCompliment) {
				this.platform.sendText(defaultOf.compliment[getRandom(defaultOf.compliment.length)]);
				return;
			}
			if (intent.hasList) {
				this.sendList();
				return;
			}
			this.confused();
			return;
		}
		/**
		 * Treats postbacks
		 * 
		 * @param {Object} postback Postback object {payload, title}
		 * 
		 */
		async postbacks(postback) {
			switch (postback.payload) {
				case 'GET_STARTED_PAYLOAD':
					const started = config.get('postback.getStarted');
					var offset = 0;
					started.map(message => {
						this.wait(offset).then(() => {
							this.platform.sendText(message);
						});
						offset += 4500;
					});
					break;
				case 'ACTIONS_PAYLOAD_DOUBTS':
					this.platform.sendText('Precisa implementar');
					break;
				case 'MENU_PAYLOAD_LIST':
					this.sendList();
					break;
				case 'MENU_PAYLOAD_HELP':
					const { first_name } = await this.platform.getInfo();
					this.platform.sendActions(config.get('postback.help.actions'), config.get('postback.help.text').replace('{name}', first_name));
					break;
				case 'MENU_PAYLOAD_SAMPLES':
					this.sendExamples();
					break;
				case 'MENU_PAYLOAD_PRICE':
					this.sendPrice();
					break;
				case 'MENU_PAYLOAD_ABOUT':
					this.sendAbout();
					break;
				case 'ACTION_PAYLOAD_DOUBTS_BEFORE':
					this.platform.sendText(config.get('postback.doubts.beforeTime.answer'));
					this.wait(500).then(() => {
						this.platform.sendWritting();
					});
					this.wait(4000).then(() => {
						this.platform.sendActions(config.get('postback.doubts.actions'), config.get('postback.doubts.examples'));
					});
					break;
				case 'ACTION_PAYLOAD_DOUBTS_TIME':
					this.sendDoubtsTime();
					break;
				default:
					this.confused();
					console.log(`Postback not expected: ${postback.payload}`);
					break;
			}
		}
		async sendAbout() {
			const { first_name } = await this.platform.getInfo();
			const buttonAlexandre = await this.platform.createButton('Alexandre', 'url', 'https://facebook.com/silvalexandre0');
			const buttonMessias = await this.platform.createButton('Messias', 'url', 'https://facebook.com/MessiasOliveira00');

			let offset = 0;
			config.get('postback.about.hi').map(hi => {
				this.wait(offset, hi).then(hi => {
					this.platform.sendText(hi);
					this.wait(500).then(() => {
						this.platform.sendWritting();
					});
				});
				offset += 3500;
			});
			offset += 3500;
			this.wait(offset).then(() => {
				this.platform.sendText(config.get('postback.about.iAmChild'));
				this.wait(1000).then(() => {
					this.platform.sendWritting();
				});
			});
			offset += 3500;
			this.wait(offset).then(() => {
				this.platform.sendText(config.get('postback.about.shy').replace('{name}', first_name));
				this.wait(500).then(() => {
					this.platform.sendWritting();
				});
			});
			offset += 3500;
			this.wait(offset).then(() => {
				this.platform.sendButton([buttonAlexandre, buttonMessias], config.get('postback.about.message'));
				this.wait(500).then(() => {
					this.platform.sendWritting();
				});
			});
			offset += 3500;
			this.wait(offset).then(() => {
				this.platform.sendText(config.get('postback.about.feedback')[0]);
				this.wait(500).then(() => {
					this.platform.sendWritting();
				});
			});
			offset += 3500;
			this.wait(offset).then(() => {
				this.platform.sendText(config.get('postback.about.feedback')[1]);
			});
		}
		/**
		 * Sends the answer to doubts.timeWrong.question
		 * 
		 */
		sendDoubtsTime() {
			this.platform.sendText(config.get('postback.doubts.timeWrong.answer')[0]);
			let offset = 500;
			this.wait(offset).then(() => {
				this.platform.sendWritting();
			});
			offset += 3500;
			this.wait(offset).then(() => {
				this.platform.sendText(config.get('postback.doubts.timeWrong.answer')[1]);
			});
			offset += 500;
			this.wait(offset).then(() => {
				this.platform.sendWritting();
			});
			offset += 3500;
			this.wait(offset).then(() => {
				this.platform.sendActions(config.get('postback.doubts.actions'), config.get('postback.doubts.examples'));
			});
		}
		/**
		 * Sends a list of doubts.
		 * 
		 */
		async sendDoubts() {
			const buttonBeforeTime = [
				await this.platform.createButton('Por quê?', 'postback', 'ACTION_PAYLOAD_DOUBTS_BEFORE'),
			];
			const buttonTimeWrong = [
				await this.platform.createButton('Por quê?', 'postback', 'ACTION_PAYLOAD_DOUBTS_TIME'),
			];
			let offset = 0;
			this.platform.sendText(config.get('postback.doubts.main'));
			this.wait(offset).then(() => {
				this.platform.sendWritting();
			});
			offset += 3500;
			this.wait(offset).then(() => {
				this.platform.sendButton(buttonBeforeTime, config.get('postback.doubts.beforeTime.question'));
			});
			offset += 500;
			this.wait(offset).then(() => {
				this.platform.sendWritting();
			});
			offset += 3500;
			this.wait(offset).then(() => {
				this.platform.sendButton(buttonTimeWrong, config.get('postback.doubts.timeWrong.question'));
			});
			// Adicionar botão para entrar em contato
		}
		/**
		 * Sends examples
		 * 
		 */
		sendExamples() {
			const messages = config.get('postback.examples');
			let offset = 0;
			messages.map(message => {
				this.wait(offset).then(() => {
					this.platform.sendText(message);
				});
				offset += 3500;
			});
		}
		/**
		 * Sends messages and buttons to help.
		 */
		confused() {
			this.platform.sendActions(defaultOf.confused.actions, defaultOf.confused.texts[getRandom(defaultOf.confused.texts.length)]);
		}
		/**
		 * Sends a list of prices.
		 * 
		 */
		async sendPrice() {
			this.platform.sendText(defaultOf.price[getRandom(defaultOf.price.length)]);
			// TODO: search and send the prices
		}
		/**
		 * Sends a list of neighborhoods available.
		 * 
		 */
		async sendList() {
			this.platform.sendText(defaultOf.list[getRandom(defaultOf.list.length)]);
			const options = {
				uri: `${process.env.APP_URL}api/neighborhoods`,
				qs: {
					title: 1,
				},
			};
			try {
				const data = JSON.parse(await request(options));
				const limit = 10;
				var msg = '';
				var offset = 1300;
				const offset_plus = 6000;
				var count = 0;
				data.map((item, index) => {
					msg += `${item.title}\u000A`;
					if (index > 0) {
						if (index % limit === 0) {
							count += 1;
							this.wait(offset, msg).then(msg => {
								this.platform.sendWritting();
								this.wait(5000, msg).then(msg => {
									this.platform.sendText(msg);
								});
							});
							offset += offset_plus;
							msg = '';
						}
						if ((data.length / 10) - 1 === count && index === data.length - 1) {
							this.wait(offset + offset_plus, msg).then(msg => {
								this.platform.sendText(msg);
							});
						}
					}
				});
			}
			catch (err) {
				throw err;
			}
		}
	}
	module.exports = General;
	/**
	 * Generates a random between 0 and length - 1.
	 * 
	 * @param {Int} length Max number allowed - 1.
	 * @return  {Int} The random number.
	 * 
	 */
	function getRandom(length) {
		return Math.floor(Math.random() * length);
	}
	/**
	 * Returns a random text term for searching results.
	 * 
	 * @param {Object} search options to be used at replace.
	 * @return  {String} The text to be sent.
	 * 
	 */
	function getSearchingText(search) {
		const message = {
			text: searching.defaults[getRandom(searching.defaults.length)],
			verb: searching.replace.verb[getRandom(searching.replace.verb.length)],
			object: searching.replace.object[getRandom(searching.replace.object.length)],
			before: searching.replace.before[getRandom(searching.replace.before.length)].replace('{time}', search.timeShow),
			after: searching.replace.after[getRandom(searching.replace.after.length)].replace('{time}', search.timeShow),
			icons: searching.replace.icons[getRandom(searching.replace.icons.length)],
		};
		const schedule = search.check === 'gte' ? message.after : message.before;
		message.text = message.text.replace('{verb}', message.verb);
		message.text = message.text.replace('{object}', message.object);
		message.text = message.text.replace('{from}', search.from);
		message.text = message.text.replace('{to}', search.to);
		message.text = message.text.replace('{schedule}', schedule);
		message.text += ` ${message.icons}`;
		return message.text;
	}
})();
