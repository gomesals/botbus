(function() {
	'use strict';
	const expect = require('chai').expect;
	const util = require('../tools/utils');
	const moment = require('moment');
	describe('Util', () => {
		describe('removeAccents', () => {
			it('should remove all accents', () => {
				var result = util.removeAccents('caçador');
				expect(result).to.equal('cacador');
				result = util.removeAccents('ação');
				expect(result).to.equal('acao');
			});
		});
		describe('convertTime', () => {
			it('should return 0900 - nove', () => {
				var result = util.convertTime('depois das nove');
				if (moment().format('a') == 'am') {
					expect(result.hour).to.equal('09');
				} else {
					expect(result.hour).to.equal('21');
				}
				expect(result.minute).to.equal('00');
				expect(result.check).to.equal('gte');
				expect(result.period).to.equal(moment().format('a'));
			});
			it('should return 0900 - 09', () => {
				var result = util.convertTime('antes das 09');
				expect(result.hour).to.equal('09');
				expect(result.minute).to.equal('00');
				expect(result.check).to.equal('lt');
				expect(result.period).to.equal('am');
			});
			it('should return 0900 - 9', () => {
				var result = util.convertTime('depois das 9');
				expect(result.hour).to.equal('09');
				expect(result.minute).to.equal('00');
				expect(result.check).to.equal('gte');
				expect(result.period).to.equal('am');
			});
			it('should return 0900 - 09:00', () => {
				var result = util.convertTime('depois das 09:00');
				expect(result.hour).to.equal('09');
				expect(result.minute).to.equal('00');
				expect(result.check).to.equal('gte');
				expect(result.period).to.equal('am');
			});
			it('should return 0900 - 0900', () => {
				var result = util.convertTime('depois das 0900');
				expect(result.hour).to.equal('09');
				expect(result.check).to.equal('gte');
				expect(result.minute).to.equal('00');
				expect(result.period).to.equal('am');
			});
			it('should return 0900 - 930', () => {
				var result = util.convertTime('depois das 930');
				expect(result.hour).to.equal('09');
				expect(result.check).to.equal('gte');
				expect(result.minute).to.equal('30');
				expect(result.period).to.equal('am');
			});
			it('should return 0930 - 9:3', () => {
				var result = util.convertTime('depois das 9:3');
				expect(result.hour).to.equal('09');
				expect(result.check).to.equal('gte');
				expect(result.minute).to.equal('30');
				expect(result.period).to.equal('am');
			});
			it('should return 0900 - 090', () => {
				var result = util.convertTime('depois das 090');
				expect(result.hour).to.equal('09');
				expect(result.check).to.equal('gte');
				expect(result.minute).to.equal('00');
				expect(result.period).to.equal('am');
			});
			it('should return 1030 - 103', () => {
				var result = util.convertTime('depois das 103');
				expect(result.hour).to.equal('10');
				expect(result.minute).to.equal('30');
				expect(result.check).to.equal('gte');
				expect(result.period).to.equal('am');
			});
			it('should return 2030 - 203', () => {
				var result = util.convertTime('depois das 203');
				expect(result.hour).to.equal('20');
				expect(result.minute).to.equal('30');
				expect(result.check).to.equal('gte');
				expect(result.period).to.equal('pm');
			});
			it('should return 0303 - 303', () => {
				var result = util.convertTime('antes das 303');
				expect(result.hour).to.equal('03');
				expect(result.minute).to.equal('03');
				expect(result.check).to.equal('lt');
				expect(result.period).to.equal('am');
			});
			it('should return 2200 - dez', () => {
				var result = util.convertTime('depois das dez da noite');
				expect(result.hour).to.equal('22');
				expect(result.minute).to.equal('00');
				expect(result.check).to.equal('gte');
				expect(result.period).to.equal('pm');
			});
			it('should return 1130 - onze', () => {
				var result = util.convertTime(' lugar a outro antes das onze e trinta');
				if (moment().format('a') == 'am') {
					expect(result.hour).to.equal('11');
				} else {
					expect(result.hour).to.equal('23');
				}
				expect(result.minute).to.equal('30');
				expect(result.check).to.equal('lt');
				expect(result.period).to.equal(moment().format('a'));
			});
			it('should return 2040 - vinte', () => {
				var result = util.convertTime('depois das vinte e quarenta da noite');
				expect(result.hour).to.equal('20');
				expect(result.minute).to.equal('40');
				expect(result.check).to.equal('gte');
				expect(result.period).to.equal('pm');
			});
			it('should return 2250 - vinte e duas', () => {
				var result = util.convertTime('coisa depois das vinte e duas e cinquenta');
				expect(result.hour).to.equal('22');
				expect(result.minute).to.equal('50');
				expect(result.check).to.equal('gte');
				expect(result.period).to.equal('pm');
			});
			it('should return 0010 - vinte e quatro', () => {
				var result = util.convertTime(' coisa depois das vinte e quatro e dez da noite');
				expect(result.hour).to.equal('00');
				expect(result.minute).to.equal('10');
				expect(result.check).to.equal('gte');
				expect(result.period).to.equal('pm');
			});
			it('should return now', () => {
				var result = util.convertTime('este lugar nao tem hora');
				expect(result.hour).to.equal(moment().format('HH'));
				expect(result.minute).to.equal(moment().format('mm'));
				expect(result.check).to.equal('gte');
				expect(result.period).to.equal(moment().format('a'));
			});
			it('should return am', () => {
				var result = util.convertTime('depois das cinco e meia da manha');
				expect(result.period).to.equal('am');
			});
			it('should return pm', () => {
				var result = util.convertTime('depois das cinco e meia da tarde');
				expect(result.period).to.equal('pm');
				result = util.convertTime('depois das cinco e meia da noite');
				expect(result.period).to.equal('pm');
			});
			it('should return am or pm based on time', () => {
				var result = util.convertTime('depois das cinco e meia');
				expect(result.period).to.equal(moment().format('a'));
			});
			it('should return lt', () => {
				var result = util.convertTime('antes das cinco e meia da manha');
				expect(result.check).to.equal('lt');
				result = util.convertTime('proximo onibus antes cinco e meia');
				expect(result.check).to.equal('lt');
			});
			it('should return lt - with place', () => {
				var result = util.convertTime('antes das nove do guaeca ate o centro');
				expect(result.check).to.equal('lt');
			});
			it('should return gte', () => {
				var result = util.convertTime('depois das cinco e meia da manha');
				expect(result.check).to.equal('gte');
				result = util.convertTime('proximo onibus cinco e meia');
				expect(result.check).to.equal('gte');
			});
			it('should return 10 minute', () => {
				var result = util.convertTime('depois das cinco e dez da manha');
				expect(result.minute).to.equal('10');
			});
			it('should return 20 minute', () => {
				var result = util.convertTime('depois das cinco e vinte da manha');
				expect(result.minute).to.equal('20');
			});
			it('should return 30 minute', () => {
				var result = util.convertTime('depois das cinco e trinta da manha');
				expect(result.minute).to.equal('30');
				result = util.convertTime('depois das cinco e meia da manha');
				expect(result.minute).to.equal('30');
			});
			it('should return 40 minute', () => {
				var result = util.convertTime('depois das cinco e quarenta da manha');
				expect(result.minute).to.equal('40');
			});
			it('should return 50 minute', () => {
				var result = util.convertTime('depois das cinco e cinquenta da manha');
				expect(result.minute).to.equal('50');
			});
			it('should return 00 minute', () => {
				var result = util.convertTime('depois das cinco em ponto da manha');
				expect(result.minute).to.equal('00');
			});
			it('should return 5 hour', () => {
				var result = util.convertTime('depois das cinco em ponto da manha');
				expect(result.hour).to.equal('05');
			});
			it('should return 3 hour', () => {
				var result = util.convertTime('depois das três em ponto da manha');
				expect(result.hour).to.equal('03');
			});
			it('should return 7 hour', () => {
				var result = util.convertTime('depois das sete em ponto da manha');
				expect(result.hour).to.equal('07');
			});
			it('should return 13 hour', () => {
				var result = util.convertTime('depois das treze em ponto da manha');
				expect(result.hour).to.equal('13');
			});
			it('should return 19 hour', () => {
				var result = util.convertTime('depois das dezenove em ponto da manha');
				expect(result.hour).to.equal('19');
			});
			it('should return 20 hour', () => {
				var result = util.convertTime('depois das vinte e quarenta da manha');
				expect(result.hour).to.equal('20');
			});
			it('should return 21 hour and 30 minute', () => {
				var result = util.convertTime('depois das vinte e uma e trinta');
				expect(result.hour).to.equal('21');
				expect(result.minute).to.equal('30');
			});
			it('should return 23 hour', () => {
				var result = util.convertTime('depois das vinte e tres e dez da manha');
				expect(result.hour).to.equal('23');
			});
			it('should return 3 horas, 30 minutos, am e gte', () => {
				var result = util.convertTime('depois das tres e trinta da manha');
				expect(result.hour).to.equal('03');
				expect(result.minute).to.equal('30');
				expect(result.period).to.equal('am');
				expect(result.check).to.equal('gte');
			});
			it('should return 14 horas, 20 minutos, pm e lt', () => {
				var result = util.convertTime('antes das catorze e vinte');
				expect(result.hour).to.equal('14');
				expect(result.minute).to.equal('20');
				expect(result.period).to.equal('pm');
				expect(result.check).to.equal('lt');
			});
			it('should return all time information correct', () => {
				var result = util.convertTime('depois das 17:30 hoje');
				expect(result.hour).to.equal('17');
				expect(result.minute).to.equal('30');
				expect(result.period).to.equal('pm');
				expect(result.check).to.equal('gte');
				result = util.convertTime('apos as 4');
				expect(result.hour).to.equal('04');
				expect(result.minute).to.equal('00');
				expect(result.period).to.equal('am');
				expect(result.check).to.equal('gte');
				result = util.convertTime('antes das 21');
				expect(result.hour).to.equal('21');
				expect(result.minute).to.equal('00');
				expect(result.period).to.equal('pm');
				expect(result.check).to.equal('lt');
				result = util.convertTime('antes das 23:45');
				expect(result.hour).to.equal('23');
				expect(result.minute).to.equal('45');
				expect(result.period).to.equal('pm');
				expect(result.check).to.equal('lt');
			});
			it('should show from now', () => {
				var result = util.convertTime('proximo onibus');
				expect(result.hour).to.equal(moment().format('HH'));
				expect(result.minute).to.equal(moment().format('mm'));
				expect(result.period).to.equal(moment().format('a'));
				expect(result.check).to.equal('gte');
			});
		});
		describe('getPlace', () => {
			it('should return `centro;morro do abrigo`', () => {
				var result = util.getPlace('depois das tres e trinta da manha do centro ao morro do abrigo');
				expect(result.from).to.equal('centro');
				expect(result.to).to.equal('morro do abrigo');
			});
			it('should return `guaeca;topo`', () => {
				var result = util.getPlace('depois das dez da manhã do guaeca ao topo');
				expect(result.from).to.equal('guaeca');
				expect(result.to).to.equal('topo');
			});
			it('should return `guaeca;centro`', () => {
				var result = util.getPlace('saindo de guaeca ao centro antes das 4');
				expect(result.from).to.equal('guaeca');
				expect(result.to).to.equal('centro');
			});
			it('should return `sao francisco;centro`', () => {
				var result = util.getPlace('saindo de centro ao sao francisco antes das 4');
				expect(result.from).to.equal('centro');
				expect(result.to).to.equal('sao francisco');
			});
			it('should return `sao francisco;centro`', () => {
				var result = util.getPlace('saindo de sao francisco ao centro antes das 4');
				expect(result.from).to.equal('sao francisco');
				expect(result.to).to.equal('centro');
			});
			it('should return `guaeca;centro`', () => {
				var result = util.getPlace('do guaeca ao centro depois das 14');
				expect(result.from).to.equal('guaeca');
				expect(result.to).to.equal('centro');
			});
			it('aqui nao tem lugar', () => {
				var result = util.getPlace('aqui nao tem lugar');
				expect(result.from).to.equal(false);
				expect(result.to).to.equal(false);
			});
			it('should return `morro;morro abrigo`', () => {
				var result = util.getPlace('saindo do morro do abrigo ate o morro do abrigo');
				expect(result.from).to.equal('morro');
				expect(result.to).to.equal('morro do abrigo');
			});
			it('should return `centro;morro do abrigo`', () => {
				var result = util.getPlace('depois das tres e trinta da manha do centro ao morro do abrigo');
				expect(result.from).to.equal('centro');
				expect(result.to).to.equal('morro do abrigo');
			});
			it('should return `balneario;centro`', () => {
				var result = util.getPlace('depois das tres e trinta da manha do balneario ate o centro');
				expect(result.from).to.equal('balneario');
				expect(result.to).to.equal('centro');
			});
			it('should return `centro;false`', () => {
				var result = util.getPlace('depois das tres e trinta da manha do centro');
				expect(result.from).to.equal(false);
				expect(result.to).to.equal(false);
			});
			it('should return `guaeca;centro`', () => {
				var result = util.getPlace('do guaeca ao centro');
				expect(result.from).to.equal('guaeca');
				expect(result.to).to.equal('centro');
			});
			it('should return `morro;barequecaba', () => {
				var result = util.getPlace('saindo do morro do abrigo ate barequecaba');
				expect(result.from).to.equal('morro');
				expect(result.to).to.equal('barequecaba');
			});
			it('should return `morro;morro abrigo`', () => {
				var result = util.getPlace('saindo do morro do abrigo ate o morro do abrigo');
				expect(result.from).to.equal('morro');
				expect(result.to).to.equal('morro do abrigo');
			});
		});
	});
})();
