(function() {
    'use strict';
    const expect = require('chai').expect;
    const moment = require('moment');
    const Analyze = require('../tools/analyze');
    describe('Analyze', () => {
        describe('hasGreeting', () => {
            it('should return true', () => {
                const result = Analyze.content('ola colega');
                expect(result.intent.hasGreeting).to.equal(true);
            });
            it('should return true', () => {
                const result = Analyze.content('bom dia');
                expect(result.intent.hasGreeting).to.equal(true);
            });
            it('should return false', () => {
                const result = Analyze.content('mano, coe');
                expect(result.intent.hasGreeting).to.equal(false);
            });
            it('should return false', () => {
                const result = Analyze.content('ola, gostaria de saber o próximo ônibus');
                expect(result.intent.hasGreeting).to.equal(false);
            });
        });
        describe('hasBye', () => {
            it('should return true', () => {
                const result = Analyze.content('xau, vejo vc mais tarde');
                expect(result.intent.hasBye).to.equal(true);
            });
            it('should return true', () => {
                const result = Analyze.content('vejo vc mais tarde');
                expect(result.intent.hasBye).to.equal(true);
            });
            it('should return true', () => {
                const result = Analyze.content('vejo você mais tarde');
                expect(result.intent.hasBye).to.equal(true);
            });
            it('should return true', () => {
                const result = Analyze.content('vejo você depois');
                expect(result.intent.hasBye).to.equal(true);
            });
        });
        describe('hasThanks', () => {
            it('should return true', () => {
                const result = Analyze.content('obrigado');
                expect(result.intent.hasThanks).to.equal(true);
            });
            it('should return true', () => {
                const result = Analyze.content('agradeço');
                expect(result.intent.hasThanks).to.equal(true);
            });
            it('should return true', () => {
                const result = Analyze.content('grato pelos resultados');
                expect(result.intent.hasThanks).to.equal(true);
            });
            it('should return false', () => {
                const result = Analyze.content('obrigado, e o próximo horário?');
                expect(result.intent.hasThanks).to.equal(false);
            });
        });
        describe('hasPrice', () => {
            it('should return true', () => {
                const result = Analyze.content('preço da passagem');
                expect(result.intent.hasPrice).to.equal(true);
            });
            it('should return true', () => {
                const result = Analyze.content('qual o valor da tarifa de ônibus');
                expect(result.intent.hasPrice).to.equal(true);
            });
            it('should return true', () => {
                const result = Analyze.content('quanto custa a tarifa');
                expect(result.intent.hasPrice).to.equal(true);
            });
            it('should return false', () => {
                const result = Analyze.content('quanto é o valor da tarifa?');
                expect(result.intent.hasPrice).to.equal(true);
            });
            it('should return false', () => {
                const result = Analyze.content('tarifa do ônibus');
                expect(result.intent.hasPrice).to.equal(true);
            });
            it('should return false', () => {
                const result = Analyze.content('qual o valor da passagem?');
                expect(result.intent.hasPrice).to.equal(true);
            });
            it('should return false', () => {
                const result = Analyze.content('passagens');
                expect(result.intent.hasPrice).to.equal(true);
            });
            it('should return false', () => {
                const result = Analyze.content('quais as tarifas');
                expect(result.intent.hasPrice).to.equal(true);
            });
            it('should return false', () => {
                const result = Analyze.content('quai são os valores do ônibus');
                expect(result.intent.hasPrice).to.equal(true);
            });
            it('should return false', () => {
                const result = Analyze.content('quais são as tarifas de ônibus?');
                expect(result.intent.hasPrice).to.equal(true);
            });
        });
        describe('hasCompliment', () => {
            it('should return true', () => {
                const result = Analyze.content('maneiro você');
                expect(result.intent.hasCompliment).to.equal(true);
            });
            it('should return true', () => {
                const result = Analyze.content('vocÊ é top');
                expect(result.intent.hasCompliment).to.equal(true);
            });
            it('should return true', () => {
                const result = Analyze.content('vc é bom');
                expect(result.intent.hasCompliment).to.equal(true);
            });
            it('should return true', () => {
                const result = Analyze.content('vocÊ é legal');
                expect(result.intent.hasCompliment).to.equal(true);
            });
            it('should return true', () => {
                const result = Analyze.content('top de mais');
                expect(result.intent.hasCompliment).to.equal(true);
            });
            it('should return true', () => {
                const result = Analyze.content('top demais');
                expect(result.intent.hasCompliment).to.equal(true);
            });
            it('should return true', () => {
                const result = Analyze.content('te amo');
                expect(result.intent.hasCompliment).to.equal(true);
            });
            it('should return true', () => {
                const result = Analyze.content('seu lindo');
                expect(result.intent.hasCompliment).to.equal(true);
            });
        });
        		describe('hasRequest', () => {
        			it('should return false', () => {
        				const result = Analyze.content('proximo onibus');
        				expect(result.intent.allowed).to.equal(false);
        			});
        			it('should return true', () => {
        				const result = Analyze.content('proximo onibus das cinco e trinta da tarde do centro ao bairro');
        				expect(result.intent.allowed).to.equal(true);
        			});
        			it('should return true', () => {
        				const result = Analyze.content('saindo do arrastao ao guaeca');
        				expect(result.intent.allowed).to.equal(true);
        			});
        // 			TODO: write more tests
        		});
    });
})();
