(function() {
    "use strict";
    const request = require('request-promise');
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
         * Returns a callback after the @ms time.
         * 
         * @param {Int} ms Time in milliseconds to wai.
         * @reutrn	{Function} Callback
         * 
         */
        wait(ms) {
            return new Promise(async (resolve) => {
                setTimeout(resolve, ms);
            });
        }
        /**
         * Sends a text.
         * 
         * @param {String} Text to be sent.
         * @return	{Promise} Same as send().
         * 
         */
        sendText(text) {
            return new Promise(async(resolve, reject) => {
                try {
                    return resolve(await this.platform.sendText(text));
                }
                catch (error) {
                    return reject(error);
                }
            });
        }
        /**
         * Sends a writting action.
         *
         * @return	{Promise} Same as send().
         * 
         */
        sendWritting() {
            return new Promise(async(resolve, reject) => {
                try {
                    return resolve(await this.platform.sendWritting());
                }
                catch (error) {
                    return reject(error);
                }
            });
        }
        /**
         * Returns some info about the user.
         * 
         * @return {Promise} Object with the info: {first_name};
         * 
         */
        getInfo() {
            return new Promise(async(resolve, reject) => {
                try {
                    return resolve(await this.platform.getInfo());
                }
                catch (error) {
                    return reject(error);
                }
            });
        }
        /**
         * Creates a postback or url button and returns it.
         * 
         * @param {String} title Button's text;
         * @param {String} type Button's type: url | postback;
         * @param {String} action Button's action when clicked. Url if website, postback action otherwise.
         * @return	{Object} object with the button. {title, type, <url|payload>}.
         * 
         */
        createButton(title, type, action) {
            return new Promise(async(resolve, reject) => {
                try {
                    return resolve(await this.platform.createButton(title, type, action));
                }
                catch (error) {
                    return reject(error);
                }
            });
        }
        /**
         * Sends a button created by platform.createButton().
         * 
         * @param {Array} buttons Array of buttons;
         * @param {String} text Message's text before showing the buttons.
         * @return	{Promise} Same as platform.send().
         * 
         */
        sendButton(buttons, text) {
            return new Promise(async(resolve, reject) => {
                try {
                    return resolve(await this.platform.sendButton(buttons, text));
                }
                catch (error) {
                    return reject(error);
                }
            });
        }
    }
    module.exports = General;
})();
