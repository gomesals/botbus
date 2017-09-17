/*global angular*/
(function() {
	'use strict';
	angular
		.module('botbus')
		.controller('authCtrl', authCtrl);

	function authCtrl($http) {
		const vm = this;
		vm.data = {};

		vm.checking = false;

		vm.check = () => {
			vm.checking = true;
			$http.post('api/auth', vm.data)
				.then(r => {
					window.location = 'painel/itinerarios';
				}, e => {
					vm.checking = false;
					handleError(e);
				});
		};
	}

	function handleError(e) {
		if (e.status === 403) {
			alert('Usuário ou senha incorretos');
		}
		console.log(e);
	}

	authCtrl.$inject = ['$http'];
})();
