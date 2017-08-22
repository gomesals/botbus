(function() {
	'use strict';
	const expect = require('chai').expect;
	const direction = require('../tools/direction');
	describe('direction', () => {
		describe('compare', () => {
			it('should return 1 item', () => {
				const data = [{
					from: 'centro',
					to: 'guaeca',
					neighborhoods: ['centro', 'varadouro', 'praia preta', 'barequecaba', 'guaeca']
				}, {
					from: 'guaeca',
					to: 'centro',
					neighborhoods: ['guaeca', 'barequecaba', 'praia preta', 'varadouro', 'centro']
				}];
				const searched = {
					from: 'guaeca',
					to: 'centro'
				};
				const result = direction.compare(searched, data);
				expect(result.length).to.equal(1);
				expect(result[0]).to.equal(data[1]);
			});
			it('should return 2 items', () => {
				const data = [{
					to: 'morro do abrigo',
					from: 'toque toque grande',
					neighborhoods: ['toque toque grande', 'guaeca', 'barequecaba', 'praia preta', 'varadouro', 'centro', 'morro do abrigo']
				}, {
					from: 'guaeca',
					to: 'centro',
					neighborhoods: ['guaeca', 'barequecaba', 'praia preta', 'varadouro', 'centro']
				}];
				const searched = {
					from: 'guaeca',
					to: 'centro'
				};
				const result = direction.compare(searched, data);
				expect(result.length).to.equal(2);
				expect(result[0]).to.equal(data[0]);
				expect(result[1]).to.equal(data[1]);
			});
			it('should return 2 items', () => {
				const data = [{
					from: 'toque toque grande',
					to: 'morro do abrigo',
					neighborhoods: ['toque toque grande', 'guaeca', 'barequecaba', 'praia preta', 'varadouro', 'centro', 'morro do abrigo']
				}, {
					from: 'centro',
					to: 'guaeca',
					neighborhoods: ['centro', 'varadouro', 'praia preta', 'barequecaba', 'guaeca']
				}, {
					from: 'guaeca',
					to: 'centro',
					neighborhoods: ['guaeca', 'barequecaba', 'praia preta', 'varadouro', 'centro']
				}, ];
				const searched = {
					from: 'guaeca',
					to: 'centro'
				};
				const result = direction.compare(searched, data);
				expect(result.length).to.equal(2);
				expect(result[0]).to.equal(data[0]);
				expect(result[1]).to.equal(data[2]);
			});
			it('should return 3 items', () => {
				const data = [{
					from: 'toque toque grande',
					to: 'morro do abrigo',
					neighborhoods: ['toque toque grande', 'guaeca', 'barequecaba', 'praia preta', 'varadouro', 'centro', 'morro do abrigo']
				}, {
					from: 'toque toque grande',
					to: 'arrastao',
					neighborhoods: ['toque toque grande', 'guaeca', 'barequecaba', 'praia preta', 'varadouro', 'centro', 'arrastao']
				}, {
					from: 'guaeca',
					to: 'centro',
					neighborhoods: ['guaeca', 'barequecaba', 'praia preta', 'varadouro', 'centro']
				}, ];
				const searched = {
					from: 'guaeca',
					to: 'centro'
				};
				const result = direction.compare(searched, data);
				expect(result.length).to.equal(3);
				expect(result[0]).to.equal(data[0]);
				expect(result[1]).to.equal(data[1]);
				expect(result[2]).to.equal(data[2]);
			});
			it('should return 0 item', () => {
				const data = [{
					from: 'toque toque grande',
					to: 'morro do abrigo',
					neighborhoods: ['toque toque grande', 'guaeca', 'barequecaba', 'praia preta', 'varadouro', 'centro', 'morro do abrigo']
				}, {
					from: 'toque toque grande',
					to: 'arrastao',
					neighborhoods: ['toque toque grande', 'guaeca', 'barequecaba', 'praia preta', 'varadouro', 'centro', 'arrastao']
				}, {
					from: 'guaeca',
					to: 'centro',
					neighborhoods: ['guaeca', 'barequecaba', 'praia preta', 'varadouro', 'centro']
				}, ];
				const searched = {
					from: 'centro',
					to: 'guaeca'
				};
				const result = direction.compare(searched, data);
				expect(result.length).to.equal(0);
			});
		});
	});
})();
