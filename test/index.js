var geonames = require('../index.js');
var assert = require('chai').assert;

describe('geonames.read()', function() {
	it('should return error when file doesn\'t exist', function(done) {
		geonames.read('missing.csv', 'admin_codes', function() {}, function(err) {
			assert.equal(err, 'File does not exist');
			done();
		});
	});
	it('should return error when unrecognized file', function(done) {
		geonames.read(__dirname + '/fixtures/unknown.csv', function() {}, function(err) {
			assert.match(err, /Unrecognized/);
			done();
		});
	});
	it('should return error when unrecognized type provided', function(done) {
		geonames.read(__dirname + '/fixtures/unknown.csv', 'unknown', function() {}, function(err) {
			assert.match(err, /Unrecognized/);
			done();
		});
	});

	it('should handle administrative code files', function(done) {
		var data_actual = [];
		var data_expected = [
			{"path":"US.WY","geoname_id":5843591,"name":"Wyoming","asciiname":"Wyoming"},
			{"path":"US.HI","geoname_id":5855797,"name":"Hawaii","asciiname":"Hawaii"},
			{"path":"US.AK","geoname_id":5879092,"name":"Alaska","asciiname":"Alaska"},
		];
		geonames.read(__dirname + '/fixtures/adminCodes.csv', function(line, callback) {
			data_actual.push(line);
			callback();
		}, function(err) {
			assert.equal(err, null);
			assert.deepEqual(data_actual, data_expected);
			done();
		});
	});
	it('should handle geonames files', function(done) {
		var data_actual = [];
		var data_expected = [
			{"id":8740307,"name":"Southwest Headland","asciiname":"Southwest Headland","alternatenames":"","latitude":54.12201,"longitude":-165.02109,"feature_class":"T","feature_code":"HDLD","country_code":"US","cc2":"","admin1_code":"AK","admin2_code":"013","admin3_code":"","admin4_code":"","population":0,"elevation":0,"dem":"72","timezone":"America/Nome","date_modified":"2014-03-26"},
			{"id":8740337,"name":"Manitar","asciiname":"Manitar","alternatenames":"","latitude":47.48679,"longitude":-120.41813,"feature_class":"P","feature_code":"PPL","country_code":"US","cc2":"","admin1_code":"WA","admin2_code":"007","admin3_code":"","admin4_code":"","population":0,"elevation":0,"dem":"244","timezone":"America/Los_Angeles","date_modified":"2014-03-26"},
			{"id":8740355,"name":"East Chugach Light","asciiname":"East Chugach Light","alternatenames":"","latitude":59.1063,"longitude":-151.44364,"feature_class":"S","feature_code":"LTHSE","country_code":"US","cc2":"","admin1_code":"AK","admin2_code":"122","admin3_code":"","admin4_code":"","population":0,"elevation":0,"dem":"-9999","timezone":"America/Anchorage","date_modified":"2014-03-27"}
		];
		geonames.read(__dirname + '/fixtures/geonames.csv', 'geonames', function(line, callback) {
			data_actual.push(line);
			callback();
		}, function(err) {
			assert.equal(err, null);
			assert.deepEqual(data_actual, data_expected);
			done();
		});
	});
	it('should handle alternate names files', function(done) {
		var data_actual = [];
		var data_expected = [
			{"id":9445241,"geoname_id":9199808,"isolanguage":"en","alternate_name":"Redbill Point, Bicheno","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9445244,"geoname_id":9199815,"isolanguage":"link","alternate_name":"http://en.wikipedia.org/wiki/North_Stradbroke_Island","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9445245,"geoname_id":9199816,"isolanguage":"link","alternate_name":"http://en.wikipedia.org/wiki/North_Stradbroke_Island_Historical_Museum","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9445359,"geoname_id":9199850,"isolanguage":"link","alternate_name":"http://en.wikipedia.org/wiki/Dasarahalli","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9445376,"geoname_id":9199860,"isolanguage":"link","alternate_name":"http://en.wikipedia.org/wiki/Yarpur","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9445378,"geoname_id":9199861,"isolanguage":"gml","alternate_name":"Werckesbuttle [a. 1338]","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9445379,"geoname_id":9199861,"isolanguage":"de","alternate_name":"Wüstung Warxbüttel","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9445393,"geoname_id":9199864,"isolanguage":"en","alternate_name":"Yeslur","is_preferred":true,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9445392,"geoname_id":9199866,"isolanguage":"en","alternate_name":"Devarunde","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9445404,"geoname_id":9199870,"isolanguage":"en","alternate_name":"Vanagur","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9445405,"geoname_id":9199871,"isolanguage":"en","alternate_name":"Vanagur Estate","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9445407,"geoname_id":9199875,"isolanguage":"link","alternate_name":"http://en.wikipedia.org/wiki/Gaoligongshan_National_Nature_Reserve","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9445419,"geoname_id":9199884,"isolanguage":"link","alternate_name":"http://en.wikipedia.org/wiki/Chandubi_Lake","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9471332,"geoname_id":9199896,"isolanguage":"link","alternate_name":"http://en.wikipedia.org/wiki/Llandudno_Pier","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9471333,"geoname_id":9199897,"isolanguage":"link","alternate_name":"http://en.wikipedia.org/wiki/Llandudno_Pier_Pavilion_Theatre","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9471348,"geoname_id":9199899,"isolanguage":"link","alternate_name":"http://en.wikipedia.org/wiki/Symonds_Yat_railway_station","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9471349,"geoname_id":9199900,"isolanguage":"link","alternate_name":"http://en.wikipedia.org/wiki/Symonds_Yat_Rapids","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9471351,"geoname_id":9199901,"isolanguage":"link","alternate_name":"http://en.wikipedia.org/wiki/Yalding_House","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false},
			{"id":9471352,"geoname_id":9199904,"isolanguage":"link","alternate_name":"http://en.wikipedia.org/wiki/Capton,_Somerset","is_preferred":false,"is_short":false,"is_colloquial":false,"is_historic":false}
		];
		geonames.read(__dirname + '/fixtures/alternateNames.csv', function(line, callback) {
			data_actual.push(line);
			callback();
		}, function(err) {
			assert.equal(err, null);
			assert.deepEqual(data_actual, data_expected);
			done();
		});
	});
	it('should handle timezone files', function(done) {
		var data_actual = [];
		var data_expected = [
			{"name":"Africa/Abidjan","country_code":"CI","gmt_offset":0,"dst_offset":0,"raw_offset":0},
			{"name":"Africa/Accra","country_code":"GH","gmt_offset":0,"dst_offset":0,"raw_offset":0},
			{"name":"Africa/Addis_Ababa","country_code":"ET","gmt_offset":3,"dst_offset":3,"raw_offset":3},
			{"name":"Africa/Algiers","country_code":"DZ","gmt_offset":1,"dst_offset":1,"raw_offset":1},
			{"name":"Africa/Asmara","country_code":"ER","gmt_offset":3,"dst_offset":3,"raw_offset":3},
			{"name":"Africa/Bamako","country_code":"ML","gmt_offset":0,"dst_offset":0,"raw_offset":0},
			{"name":"Africa/Bangui","country_code":"CF","gmt_offset":1,"dst_offset":1,"raw_offset":1},
			{"name":"Africa/Banjul","country_code":"GM","gmt_offset":0,"dst_offset":0,"raw_offset":0},
			{"name":"Africa/Bissau","country_code":"GW","gmt_offset":0,"dst_offset":0,"raw_offset":0},
			{"name":"Africa/Blantyre","country_code":"MW","gmt_offset":2,"dst_offset":2,"raw_offset":2},
			{"name":"Africa/Brazzaville","country_code":"CG","gmt_offset":1,"dst_offset":1,"raw_offset":1},
			{"name":"Africa/Bujumbura","country_code":"BI","gmt_offset":2,"dst_offset":2,"raw_offset":2},
			{"name":"Africa/Cairo","country_code":"EG","gmt_offset":2,"dst_offset":2,"raw_offset":2},
			{"name":"Africa/Casablanca","country_code":"MA","gmt_offset":0,"dst_offset":0,"raw_offset":0},
			{"name":"Africa/Ceuta","country_code":"ES","gmt_offset":1,"dst_offset":2,"raw_offset":1},
			{"name":"Africa/Conakry","country_code":"GN","gmt_offset":0,"dst_offset":0,"raw_offset":0},
			{"name":"Africa/Dakar","country_code":"SN","gmt_offset":0,"dst_offset":0,"raw_offset":0},
			{"name":"Africa/Dar_es_Salaam","country_code":"TZ","gmt_offset":3,"dst_offset":3,"raw_offset":3},
			{"name":"Africa/Djibouti","country_code":"DJ","gmt_offset":3,"dst_offset":3,"raw_offset":3}
		];
		geonames.read(__dirname + '/fixtures/timeZones.csv', function(line, callback) {
			data_actual.push(line);
			callback();
		}, function(err) {
			assert.equal(err, null);
			assert.lengthOf(data_actual, 418);
			assert.deepEqual(data_actual.slice(0, 19), data_expected);
			done();
		});
	});
	it('should handle hierarchy files', function(done) {
		var data_actual = [];
		var data_expected = [
			{"parent_id": 6295630, "child_id": 6255146, "type":	"ADM"},
			{"parent_id": 6295630, "child_id": 6255152, "type":	"ADM"},
			{"parent_id": 6295630, "child_id": 6255147, "type":	"ADM"},
			{"parent_id": 6295630, "child_id": 6255148, "type":	"ADM"},
			{"parent_id": 6295630, "child_id": 6255149, "type":	"ADM"},
			{"parent_id": 6295630, "child_id": 6255151, "type":	"ADM"},
			{"parent_id": 6295630, "child_id": 6255150, "type":	"ADM"},
			{"parent_id": 6255148, "child_id": 3041565, "type":	"ADM"},
			{"parent_id": 6255147, "child_id": 290557, "type": "ADM"},
			{"parent_id": 6255147, "child_id": 1149361, "type":	"ADM"},
			{"parent_id": 6255149, "child_id": 3576396, "type":	"ADM"},
			{"parent_id": 6255149, "child_id": 3573511, "type":	"ADM"},
			{"parent_id": 6255148, "child_id": 783754, "type": "ADM"},
			{"parent_id": 6255147, "child_id": 174982, "type": "ADM"}
		];
		geonames.read(__dirname + '/fixtures/hierarchy.csv', function(line, callback) {
			data_actual.push(line);
			callback();
		}, function(err) {
			assert.equal(err, null);
			assert.deepEqual(data_actual, data_expected);
			done();
		});
	});
});

describe('geonames.guessType()', function() {
	it('should return null when unrecognized', function() {
		assert.isNull(geonames.guessType('path/awfawg'));
	});
	it('should recognize "admin_codes"', function() {
		assert.equal(geonames.guessType('path/admin1CodesASCII.txt'), 'admin_codes');
		assert.equal(geonames.guessType('path/admin1CodesASCII.csv'), 'admin_codes');
		assert.equal(geonames.guessType('path/admin2Codes.txt'), 'admin_codes');
		assert.equal(geonames.guessType('path/admin2Codes.csv'), 'admin_codes');
	});
	it('should recognize "alternate_names"', function() {
		assert.equal(geonames.guessType('path/alternateNames.txt'), 'alternate_names');
		assert.equal(geonames.guessType('path/alternateNames.csv'), 'alternate_names');
	});
	it('should recognize "geonames"', function() {
		assert.equal(geonames.guessType('path/US.txt'), 'geonames');
		assert.equal(geonames.guessType('path/US.csv'), 'geonames');
		assert.equal(geonames.guessType('path/ZW.txt'), 'geonames');
		assert.equal(geonames.guessType('path/ZW.csv'), 'geonames');
		assert.equal(geonames.guessType('path/allCountries.txt'), 'geonames');
		assert.equal(geonames.guessType('path/allCountries.csv'), 'geonames');
		assert.equal(geonames.guessType('path/cities1000.txt'), 'geonames');
		assert.equal(geonames.guessType('path/cities1000.csv'), 'geonames');
		assert.equal(geonames.guessType('path/cities5000.txt'), 'geonames');
		assert.equal(geonames.guessType('path/cities5000.csv'), 'geonames');
		assert.equal(geonames.guessType('path/cities15000.txt'), 'geonames');
		assert.equal(geonames.guessType('path/cities15000.csv'), 'geonames');
	});
	it('should recognize "timezones"', function() {
		assert.equal(geonames.guessType('path/timeZones.txt'), 'timezones');
		assert.equal(geonames.guessType('path/timeZones.csv'), 'timezones');
	});
	it('should recognize "hierarchy"', function() {
		assert.equal(geonames.guessType('path/hierarchy.txt'), 'hierarchy');
		assert.equal(geonames.guessType('path/hierarchy.csv'), 'hierarchy');
	});
});