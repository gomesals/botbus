(function() {
	'use strict';
	require('dotenv').load();
	const chai = require('chai');
	const chaiHttp = require('chai-http');
	const expect = chai.expect;
	const API = 'https://tcc-silvalexandre.c9users.io/api/neighborhoods';
	let ID = '';
	chai.use(chaiHttp);

	describe('Neighborhoods api', () => {
		describe('POST', () => {
			it('should create one item', async() => {
				try {
					const res = await chai.request(API)
						.post('/')
						.send({ title: 'bairro', });

					expect(res).to.have.status(200);
					expect(res).to.be.json;


					expect(res.body).to.have.property('title');
					expect(res.body.title).to.be.equal('bairro');
					ID = res.body._id;
				}
				catch (err) {
					handle(err);
				}
			});
		});
		describe('GET', () => {
			it('should return with data', async() => {
				try {
					const res = await chai.request(API)
						.get('/');

					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body.length).to.be.at.least(1);
				}
				catch (err) {
					handle(err);
				}
			});
			it('should return one item', async() => {
				try {
					const res = await chai.request(API)
						.get(`/${ID}`);

					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res).to.be.an('object');
					expect(res.body).to.have.property('title');
					expect(res.body.title).to.be.equal('bairro');
					expect(res.body._id).to.be.equal(ID);
				}
				catch (err) {
					handle(err);
				}
			});
			it('should return 404', async() => {
				try {
					await chai.request(API)
						.get('/588a6c9115b575001126e2a7');
				}
				catch (err) {
					expect(err).to.have.status(404);
				}
			});
		});
		describe('PUT', () => {
			it('should update one item', async() => {
				try {
					const update_from = 'bairro';
					const update_to = 'atualizado';

					const _put = await chai.request(API)
						.put(`/${ID}`)
						.send({
							title: update_to,
						});

					const _get = await chai.request(API)
						.get(`/${ID}`);

					const _put_after = await chai.request(API)
						.put(`/${ID}`)
						.send({
							title: update_from,
						});

					const _get_after = await chai.request(API)
						.get(`/${ID}`);

					expect(_put).to.have.status(200);
					expect(_put).to.be.text;
					expect(_put.body).to.be.deep.equal({});

					expect(_get).to.have.status(200);
					expect(_get).to.be.json;
					expect(_get.body).to.have.property('title');
					expect(_get.body.title).to.be.equal(update_to);

					expect(_put_after).to.have.status(200);
					expect(_put_after).to.be.text;
					expect(_put_after.body).to.be.deep.equal({});

					expect(_get_after).to.have.status(200);
					expect(_get_after).to.be.json;
					expect(_get_after.body).to.have.property('title');
					expect(_get_after.body.title).to.be.equal(update_from);
				}
				catch (err) {
					handle(err);
				}
			});
		});
		describe('DELETE', () => {
			it('should delete one item', async() => {
				try {
					const res = await chai.request(API)
						.delete(`/${ID}`);

					expect(res).to.have.status(200);
					expect(res).to.be.text;
					expect(res.body).to.be.deep.equal({});
				}
				catch (err) {
					handle(err);
				}
			});
		});
	});

	function handle(err) {
		console.log(err);
	}
})();
