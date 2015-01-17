/**
 * AngularJS wrapper for Lo-Dash
 *
 * @author Hein Bekker <hein@netbek.co.za>
 * @copyright (c) 2015 Hein Bekker
 * @license http://www.gnu.org/licenses/agpl-3.0.txt AGPLv3
 */

(function (window, angular, undefined) {
	'use strict';

	angular
		.module('nb.lodash', [])
		.factory('_', ['$window', function _ ($window) {
				var _ = $window._;
				delete $window._;
				return _;
			}])
		.run(runBlock);

	// Invoke at runtime to allow factory to delete global reference.
	runBlock.$inject = ['_'];
	function runBlock (_) {
	}
})(window, window.angular);