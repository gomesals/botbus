/*global angular*/
(function() {
	'use strict';
	angular.module('busbot').controller('neighCtrl', neighCtrl).controller('neighFormCtrl', neighFormCtrl);

	function neighCtrl($http) {
		const vm = this;
		vm.name = 'alexandre';
		$http.get('api/neighborhoods').then(r => {
			vm.data = r.data;
		}, handleError);

		vm.remove = item => {
			const index = vm.data.indexOf(item);
			$http.delete(`api/neighborhoods/${vm.data[index]._id}`).then(r => {
				if (r.status === 200) {
					vm.data.splice(index, 1);
				}
			}, handleError);
		};
	}

	function neighFormCtrl($http) {
		const vm = this;
		vm.saving = false;
		vm.data = {};
		const id = window.location.pathname.split('/')[3];
		setTimeout(() => {
			if (vm.edit) {
				$http.get(`api/neighborhoods/${id}`).then(r => {
					vm.data = r.data;
				}, handleError);
			}
		}, 100);
		vm.save = () => {
			vm.saving = true;
			$http({
				method: (vm.edit ? 'PUT' : 'POST'),
				url: (vm.edit ? `api/neighborhoods/${id}` : 'api/neighborhoods'),
				data: vm.data,
			}).then(r => {
				window.location = 'painel/neighborhoods';
			}, handleError);
		};
	}

	function handleError(e) {
		console.log(e);
	}
	neighCtrl.$inject = ['$http'];
	neighFormCtrl.$inject = ['$http'];
})();
