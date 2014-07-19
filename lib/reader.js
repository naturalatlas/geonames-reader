var csv = require('binary-csv');
var through2 = require('through2');

/**
 * Parses an input stream.
 *
 * @param {object} stream
 * @param {function} item_callback
 * @param {function} done
 * @return {void}
 */
module.exports.read = function(stream, item_callback, done) {
	var parser = csv({
		separator: '\t',
		newline: '\n',
		detectNewlines: true
	});

	var waiting = 0;
	var transformer = through2(function(chunk, enc, callback) {
		var cells = parser.line(chunk).map(function(cell) {
			return cell.toString('utf8');
		});
		waiting++;
		item_callback(cells, function(err) {
			waiting--;
			callback(err);
		});
	});

	var finish = function(err) {
		if (!waiting) {
			return done(err);
		}
		setTimeout(finish, 10);
	};

	stream.on('end', finish);
	stream.pipe(parser).pipe(transformer);
};