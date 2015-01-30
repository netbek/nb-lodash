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
				 * Get the value of a key in an array or object.
				 *
				 * @param {object|array} obj
				 * @param {string} path Path to value, e.g. to get 'c' value of obj, use path 'a.b.c'
				 * @param {mixed} defaultValue
				 * @param {string} delimiter Path delimiter (default: .)
				 * @returns {mixed}
				 */
				_.get = function (obj, path, defaultValue, delimiter) {
					if (angular.isUndefined(delimiter)) {
						delimiter = '.';
					}

					var keys = path.split(delimiter);
					var key = keys.shift();

					if (!Object.prototype.hasOwnProperty.call(obj, key)) {
						return defaultValue;
					}

					if (keys.length > 0) {
						return _.get(obj[key], keys.join(delimiter));
					}

					return obj[key];
				};

				/**
				 * Set the value of a key in an array or object. Note that the array or object is modified.
				 *
				 * @param {object|array} obj
				 * @param {string} path Path to value, e.g. to set 'c' value of obj, use path 'a.b.c'
				 * @param {mixed} value
				 * @param {string} delimiter Path delimiter (default: .)
				 * @returns {object|array}
				 */
				_.set = function (obj, path, value, delimiter) {
					if (angular.isUndefined(delimiter)) {
						delimiter = '.';
					}

					var keys = path.split(delimiter);
					var len = keys.length - 1;
					var parent = obj;

					for (var i = 0; i < len; i++) {
						var key = keys[i];

						if (angular.isUndefined(parent[key]) || !angular.isObject(parent[key])) {
							if (isNaN(keys[i + 1])) {
								parent[key] = {};
							}
							else {
								parent[key] = [];
							}
						}

						parent = parent[key];
					}

					parent[keys[len]] = value;

					return obj;
				};

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

				/**
				 * Scales width and height while maintaining aspect ratio.
				 *
				 * @param {int} inWidth
				 * @param {int} inHeight
				 * @param {int} outWidth
				 * @param {int} outHeight
				 * @returns {object}
				 */
				_.scale = function (inWidth, inHeight, outWidth, outHeight) {
					var out = {
						x: 0,
						y: 0,
						width: 0,
						height: 0
					};

					if (!inWidth || !inHeight) {
						return out;
					}

					var ratioWidth = outWidth ? inWidth / outWidth : 0;
					var ratioHeight = outHeight ? inHeight / outHeight : 0;

					if (ratioWidth < ratioHeight) {
						out.width = Math.floor(inWidth / ratioHeight);
						out.height = outHeight;
					}
					else {
						out.width = outWidth;
						out.height = Math.floor(inHeight / ratioWidth);
					}

					if (out.width < outWidth) {
						out.x = Number(Math.max(0, Math.floor((outWidth - out.width) / 2)));
					}
					if (out.height < outHeight) {
						out.y = Number(Math.max(0, Math.floor((outHeight - out.height) / 2)));
					}

					return out;
				};

				return _;
			}])
		.run(runBlock);

	// Invoke at runtime to allow factory to delete global reference.
	runBlock.$inject = ['_'];
	function runBlock (_) {
	}
})(window, window.angular);