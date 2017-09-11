/*global angular*/
(function() {
	'use strict';
	angular.module('busbot', ['checklist-model']).controller('pathsCtrl', pathsCtrl).controller('pathsFormCtrl', pathsFormCtrl);

	function pathsCtrl($http) {
		const vm = this;
		$http.get('api/paths').then(r => {
			vm.data = r.data;
		}, handleError);
		vm.remove = item => {
			const index = vm.data.indexOf(item);
			$http.delete(`api/paths/${vm.data[index]._id}`).then(r => {
				if (r.status === 200) {
					vm.data.splice(index, 1);
				}
			}, handleError);
		};
	}

	function pathsFormCtrl($http) {
		const vm = this;
		vm.saving = false;
		vm.data = {};
		$http.get('api/neighborhoods').then(r => {
			vm.neighborhoods = r.data;
		}, handleError);
		const id = window.location.pathname.split('/')[3];
		setTimeout(() => {
			if (vm.edit) {
				$http.get(`api/paths/${id}`).then(r => {
					vm.data = r.data;
					vm.selected = r.data.neighborhoods;
				}, handleError);
			}
		}, 100);
		vm.clear = () => {
			vm.selected = [];
		};
		vm.confirm = () => {
			vm.confirmed = false;
		}
		vm.save = () => {
			vm.saving = true;
			const data = {
				title: vm.title,
				neighborhoods: vm.selected,
			};
			$http({
				method: (vm.edit ? 'PUT' : 'POST'),
				url: (vm.edit ? `api/paths/${id}` : 'api/paths'),
				data,
			}).then(r => {
				window.location = 'painel/trajetos';
			}, e => {
				vm.saving = false;
				handleError(e);
			});
		};
	}

	function handleError(e) {
		console.log(e);
	}
	pathsCtrl.$inject = ['$http'];
	pathsFormCtrl.$inject = ['$http'];
})();
