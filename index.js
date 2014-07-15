var fs = require('fs');
var path = require('path');
var reader = require('./lib/reader.js');
var formatters = require('./lib/formatters.js');
var geonames = module.exports = {};

/**
 * Reads a geonames file.
 *
 * Examples:
 *
 *   - geonames.read('cities.txt', function(item, callback) { ... }, callback)
 *   - geonames.read('somefile.csv', 'cities', function(item, callback) { ... }, callback);
 *
 * If `type` is not provided, it will attempt to guess
 * using the name of the file. If specified, it should be
 * one of the following:
 *
 *   - 'geonames'
 *   - 'admin_codes'
 *   - 'alternate_names'
 *
 * @param {string} file
 * @param {string} type (optional)
 * @param {function} item_callback(item, callback)
 * @param {function} done
 * @return {void}
 */
geonames.read = function() {
	var formatter, file, type, item_callback, done;

	file = arguments[0];
	if (arguments.length === 4) {
		type = arguments[1];
		item_callback = arguments[2];
		done = arguments[3];
	} else {
		type = null;
		item_callback = arguments[1];
		done = arguments[2];
	}

	done = done || function() {};
	type = type || geonames.guessType(file);
	formatter = formatters[type];

	if (!formatter) {
		return done('Unrecognized geonames file. Available types: ' + Object.keys(formatters).join(', '));
	}

	fs.exists(file, function(exists) {
		if (!exists) return done('File does not exist');
		var stream = fs.createReadStream(file);
		var handler = function(item, callback) {
			item_callback(formatter(item), callback);
		};

		if (type === 'timezones') {
			handler = function(item, callback) {
				if (item[0] === 'CountryCode') return callback();
				item_callback(formatter(item), callback);
			};
		}

		return reader.read(stream, handler, done);
	});
};

/**
 * Attempts to guess the table type of a file
 * using its filename.
 *
 * @param {string} file
 * @return {string|undefined}
 */
geonames.guessType = function(file) {
	var filename = path.basename(file);
	if (/^(cities|[A-Z]{2}\.|allCountries)/i.test(filename)) {
		return 'geonames';
	}
	if (/^admin/i.test(filename)) {
		return 'admin_codes';
	}
	if (/^alternateNames/i.test(filename)) {
		return 'alternate_names';
	}
	if (/^timeZones/i.test(filename)) {
		return 'timezones';
	}
	if (/^hierarchy/i.test(filename)) {
		return 'hierarchy';
	}
	return null;
};