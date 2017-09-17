/*global angular*/
(function() {
	'use strict';
	angular.module('botbus', ['checklist-model']).controller('linesCtrl', linesCtrl).controller('linesFormCtrl', linesFormCtrl);

	function linesCtrl($http) {
		const vm = this;
		vm.loading = true;
		$http.get('api/lines').then(r => {
			vm.data = r.data;
			vm.loading = false;
		}, e => {
			vm.loading = false;
			handleError(e);
		});
		vm.remove = item => {
			const index = vm.data.indexOf(item);
			$http.delete(`api/lines/${vm.data[index]._id}`).then(r => {
				if (r.status === 200) {
					vm.data.splice(index, 1);
				}
			}, handleError);
		};
	}

	function linesFormCtrl($http) {
		const vm = this;
		const id = window.location.pathname.split('/')[3];
		vm.saving = false;
		vm.data = {};
		vm.days = [{
			value: 'Sun',
			title: 'Domingo'
		}, {
			value: 'Mon',
			title: 'Segunda-feira'
		}, {
			value: 'Tue',
			title: 'Terça-feira'
		}, {
			value: 'Wed',
			title: 'Quarta-feira'
		}, {
			value: 'Thu',
			title: 'Quinta-feira'
		}, {
			value: 'Fri',
			title: 'Sexta-feira'
		}, {
			value: 'Sat',
			title: 'Sábado'
		}];
		setTimeout(() => {
			if (vm.edit) {
				$http.get(`api/lines/${id}`).then(r => {
					vm.data = r.data;
				}, handleError);
			}
		}, 100);
		$http.get('/api/paths').then(r => {
			vm.paths = r.data;
		}, handleError);
		vm.save = () => {
			vm.saving = true;
			$http({
				method: (vm.edit ? 'PUT' : 'POST'),
				url: (vm.edit ? `api/lines/${id}` : 'api/lines'),
				data: vm.data,
			}).then(r => {
				window.location = 'painel/itinerarios';
			}, e => {
				vm.saving = false;
				handleError(e);
			});
		};
	}

	function handleError(e) {
		console.log(e);
	}
	linesCtrl.$inject = ['$http'];
	linesFormCtrl.$inject = ['$http'];
})();
