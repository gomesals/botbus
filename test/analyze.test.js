(function() {
	'use strict';
	const expect = require('chai').expect;
	const moment = require('moment-timezone');
	const Analyze = require('../tools/analyze');
	moment.locale('pt-br');
	moment.tz.setDefault("America/Sao_Paulo");
	describe('Analyze', () => {
		describe('hasGreeting', () => {
			const tests_true = [
				'ola colega',
				'bom dia',
			];
			const tests_false = [
				'mano, coe',
				'ola, gostaria de saber o próximo ônibus',
			];
			tests_true.map((test, index) => {
				it(`${index}: should return true`, () => {
					const result = Analyze.content(test);
					expect(result.intent.hasGreeting).to.equal(true);
				});
			});
			tests_false.map((test, index) => {
				it(`${index}: should return false`, () => {
					const result = Analyze.content(test);
					expect(result.intent.hasGreeting).to.equal(false);
				});
			});
		});
		describe('hasBye', () => {
			const tests_true = [
				'xau, vejo vc mais tarde',
				'vejo vc mais tarde',
				'vejo você mais tarde',
				'vejo você depois',
			];
			tests_true.map((test, index) => {
				it(`${index}: should return true`, () => {
					const result = Analyze.content(test);
					expect(result.intent.hasBye).to.equal(true);
				});
			});
		});
		describe('hasThanks', () => {
			const tests_true = [
				'obrigado',
				'agradeço',
				'grato pelos resultados',
			];
			const tests_false = [
				'obrigado, e o próximo horário?',
			];
			tests_true.map((test, index) => {
				it(`${index}: should return true`, () => {
					const result = Analyze.content(test);
					expect(result.intent.hasThanks).to.equal(true);
				});
			});
			tests_false.map((test, index) => {
				it(`${index}: should return false`, () => {
					const result = Analyze.content(test);
					expect(result.intent.hasThanks).to.equal(false);
				});
			});
		});
		describe('hasPrice', () => {
			const tests_true = [
				'preço da passagem',
				'qual o valor da tarifa de ônibus',
				'quanto custa a tarifa',
				'quanto é o valor da tarifa?',
				'tarifa do ônibus',
				'qual o valor da passagem?',
				'passagens',
				'quais as tarifas',
				'quais são os valores do ônibus',
				'quais são as tarifas de ônibus?',
			];
			const tests_false = [
				'qual o próximo ônibus?',
				'qual é o próximo ônibus?',
			];
			tests_true.map((test, index) => {
				it(`${index}: should return true`, () => {
					const result = Analyze.content(test);
					expect(result.intent.hasPrice).to.equal(true);
				});
			});
			tests_false.map((test, index) => {
				it(`${index}: should return false`, () => {
					const result = Analyze.content(test);
					expect(result.intent.hasPrice).to.equal(false);
				});
			});
		});
		describe('hasCompliment', () => {
			const tests_true = [
				'maneiro você',
				'vocÊ é top',
				'vc é bom',
				'vocÊ é legal',
				'top de mais',
				'top demais',
				'te amo',
				'seu lindo',
			];
			tests_true.map((test, index) => {
				it(`${index}: should return true`, () => {
					const result = Analyze.content(test);
					expect(result.intent.hasCompliment).to.equal(true);
				});
			});
		});
		describe('hasRequest', () => {
			const tests_true = [
				'proximo onibus das cinco e trinta da tarde do centro ao bairro',
				'saindo do arrastao ao guaeca',
			];

			const tests_false = [
				'proximo onibus',
			];
			tests_true.map((test, index) => {
				it(`${index}: should return true`, () => {
					const result = Analyze.content(test);
					expect(result.intent.isAllowed).to.equal(true);
				});
			});
			tests_false.map((test, index) => {
				it(`${index}: should return false`, () => {
					const result = Analyze.content(test);
					expect(result.intent.isAllowed).to.equal(false);
				});
			});

			// 			TODO: write more tests
		});
		describe('hasList', () => {
			const tests_true = ['lista de bairros',
				'quais os bairros da cidade',
				'qual a lista de bairros de cidade',
				'quais são os bairros',
				'quais os locais',
				'quais são os locais',
				'quais são os bairros disponívis',
				'que bairros existem',
				'quais os destinos daqui',
			];
			tests_true.map((test, index) => {
				it(`${index}: should return true`, () => {
					const result = Analyze.content(test);
					expect(result.intent.hasList).to.equal(true);
				});
			});
		});
	});
})();
