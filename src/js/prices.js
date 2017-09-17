/*global angular*/
(function() {
	'use strict';
	angular
		.module('botbus')
		.controller('pricesCtrl', pricesCtrl)
		.controller('pricesFormCtrl', pricesFormCtrl);

	function pricesCtrl($http) {
		const vm = this;

		$http.get('api/prices').then(r => {
			vm.data = r.data.map(price => {
				price.price = price.price.split('\n');
				return price;
			});
		}, handleError);

		vm.remove = item => {
			const index = vm.data.indexOf(item);
			$http.delete(`api/prices/${vm.data[index]._id}`).then(r => {
				if (r.status === 200) {
					vm.data.splice(index, 1);
				}
			}, handleError);
		};
	}

	function pricesFormCtrl($http) {
		const vm = this;
		const id = window.location.pathname.split('/')[3];

		vm.saving = false;
		vm.data = {};

		setTimeout(() => {
			if (vm.edit) {
				$http.get(`api/prices/${id}`).then(r => {
					vm.data = r.data;
				}, handleError);
			}
		}, 100);

		vm.save = () => {
			vm.saving = true;
			$http({
				method: (vm.edit ? 'PUT' : 'POST'),
				url: (vm.edit ? `api/prices/${id}` : 'api/prices'),
				data: vm.data,
			}).then(r => {
				window.location = 'painel/tarifas';
			}, e => {
				vm.saving = false;
				handleError(e);
			});
		};
	}

	function handleError(e) {
		console.log(e);
	}

	pricesCtrl.$inject = ['$http'];
	pricesFormCtrl.$inject = ['$http'];
})();
