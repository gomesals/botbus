(function() {
    "use strict";
    require('dotenv').load();
    const request = require('request-promise');
    const options = {
        uri: 'https://graph.facebook.com/v2.6/me/thread_settings',
        qs: {
            access_token: process.env.PAGE_ACCESS_TOKEN
        },
        body: {},
        method: 'POST',
        json: true,
    };
    async function greeting() {
        options.body = {
            setting_type: "greeting",
            greeting: {
                text: 'Oi {{user_first_name}}, eu sou o BusBot, e tô aqui pra te ajudar com os ônibus de São Sebastião.',
            },
        };
        const { result } = await request(options);
        console.log(`#greeting(): ${result}`);
    };
    async function getStarted() {
        options.body = {
            setting_type: "call_to_actions",
            thread_state: "new_thread",
            call_to_actions: [{
                payload: "GET_STARTED_PAYLOAD",
            }],
        };
        const { result } = await request(options);
        console.log(`#getStarted(): ${result}`);
    }
    async function setMenu() {
        options.body = {
            setting_type: "call_to_actions",
            thread_state: "existing_thread",
            call_to_actions: [{
                type: "postback",
                title: "Ajuda",
                payload: "MENU_PAYLOAD_HELP",
            }, {
                type: "postback",
                title: "Exemplos",
                payload: "MENU_PAYLOAD_SAMPLES",
            }, {
                type: "postback",
                title: "Lista de bairros",
                payload: "MENU_PAYLOAD_LIST",
            }, {
                type: "postback",
                title: "Preço da Passagem",
                payload: "MENU_PAYLOAD_PRICE",
            }, {
                type: "postback",
                title: "Sobre",
                payload: "MENU_PAYLOAD_ABOUT",
            }, ]
        };
        const { result } = await request(options);
        console.log(`#setMenu(): ${result}`);
    };
    greeting();
    getStarted();
    setMenu();
})();
