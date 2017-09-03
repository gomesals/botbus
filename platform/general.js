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
    };
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
         * @param {Int} ms Time in milliseconds to wai.
         * @reutrn	{Function} Callback
         * 
         */
        wait(ms) {
            return new Promise(async(resolve) => {
                setTimeout(resolve, ms);
            });
        }
        /**
         * Treats the message sent by the user
         *
         */
        treat() {
            const { intent, ...search } = Analyze.content(this.text);
            console.log(intent);
            console.log(search);
            if (intent.isAllowed) {
                this.platform.sendText('pesquisando...');
                // TODO: search and send the information
                return;
            }
            if (intent.hasPrice) {
                this.platform.sendText(defaultOf.price[getRandom(defaultOf.price.length)]);
                // TODO: search and send the prices
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
            this.platform.sendText(defaultOf.confused[getRandom(defaultOf.confused.length)]);
            // TODO: send buttons of help
            return;
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
})();
