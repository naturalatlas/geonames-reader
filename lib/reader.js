var file = require('pull-file');
var pull = require('pull-stream');
var bits = require('pull-tobits');

/**
 * Parses an input stream.
 *
 * @param {object} source
 * @param {function} item_callback
 * @param {function} done
 * @return {void}
 */
module.exports.read = function(source, item_callback, done) {
	pull(
		source,
		bits.split([0x0A]),
		pull.asyncMap(function(cells, callback) {
			var was_async;
			var line = cells.toString();
			if (line[0] === '#') return callback();
			cells = line.split('\t');
			was_async = false;
			item_callback(cells, function(err) {
				cells = null;
				if (!was_async) {
					setImmediate(function() {
						callback(err);
					});
				} else {
					callback(err);
				}
			});
			was_async = true;
		}),
		pull.onEnd(done)
	);
};