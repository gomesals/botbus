(function() {
	'use strict';

	function direction() {
		/**
		 * Checks the neighborhood order
		 *
		 * @param      {object}  compare  Searched data
		 * @param      {object}  data     Result data
		 * @param	   {int} limit Limit the results to this number
		 * @return     {Array}   Filtered result
		 */
		const compare = (compare, data, limit) => {
			let result = [];
			let actual = 0;
			data.map(line => {
				if (actual === limit) {
					return result;
				}
				const from = line.neighborhoods.indexOf(compare.from);
				const to = line.neighborhoods.indexOf(compare.to);
				if (from <= to) {
					result = result.concat(line);
					actual++;
				}
			});
			return result;
		};
		return {
			compare,
		};
	}
	module.exports = direction();
})();
