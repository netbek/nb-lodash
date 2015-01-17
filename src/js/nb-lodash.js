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

				/**
				 * Assigns own enumerable properties of source object(s) to the
				 * destination object for all destination properties that
				 * resolve to undefined. Once a property is set, additional
				 * defaults of the same property will be ignored.
				 *
				 * Returns a function.
				 */
				_.defaultsDeep = _.partialRight(_.merge, function deep (value, other) {
					return _.merge(value, other, deep);
				});

				/**
				 * Performs a non-strict comparison of the subset of two objects, defined by a list of keys.
				 *
				 * @param {Object} a The first object.
				 * @param {Object} b The second object.
				 * @param {Array} keys The list of keys within each object to compare. If the list is empty or not specified,
				 *                     it defaults to the list of keys in `a`.
				 * @return {Boolean} Returns `true` if the keys match, otherwise `false`.
				 */
				_.equalForKeys = function (a, b, keys) {
					if (!keys) {
						keys = [];
						for (var n in a)
							keys.push(n); // Used instead of Object.keys() for IE8 compatibility
					}

					for (var i = 0; i < keys.length; i++) {
						var k = keys[i];
						if (a[k] != b[k])
							return false; // Not '===', values aren't necessarily normalized
					}
					return true;
				};

				return _;
			}])
		.run(runBlock);

	// Invoke at runtime to allow factory to delete global reference.
	runBlock.$inject = ['_'];
	function runBlock (_) {
	}
})(window, window.angular);