module.exports = {
	/**
	 * "geoname" table formatter.
	 *
	 * [0]  geonameid         : integer id of record in geonames database
	 * [1]  name              : name of geographical point (utf8) varchar(200)
	 * [2]  asciiname         : name of geographical point in plain ascii characters, varchar(200)
	 * [3]  alternatenames    : alternatenames, comma separated, ascii names automatically transliterated, convenience attribute from alternatename table, varchar(8000)
	 * [4]  latitude          : latitude in decimal degrees (wgs84)
	 * [5]  longitude         : longitude in decimal degrees (wgs84)
	 * [6]  feature class     : see http://www.geonames.org/export/codes.html, char(1)
	 * [7]  feature code      : see http://www.geonames.org/export/codes.html, varchar(10)
	 * [8]  country code      : ISO-3166 2-letter country code, 2 characters
	 * [9]  cc2               : alternate country codes, comma separated, ISO-3166 2-letter country code, 60 characters
	 * [10] admin1 code       : fipscode (subject to change to iso code), see exceptions below, see file admin1Codes.txt for display names of this code; varchar(20)
	 * [11] admin2 code       : code for the second administrative division, a county in the US, see file admin2Codes.txt; varchar(80)
	 * [12] admin3 code       : code for third level administrative division, varchar(20)
	 * [13] admin4 code       : code for fourth level administrative division, varchar(20)
	 * [14] population        : bigint (8 byte int)
	 * [15] elevation         : in meters, integer
	 * [16] dem               : digital elevation model, srtm3 or gtopo30, average elevation of 3''x3'' (ca 90mx90m) or 30''x30'' (ca 900mx900m) area in meters, integer. srtm processed by cgiar/ciat.
	 * [17] timezone          : the timezone id (see file timeZone.txt) varchar(40)
	 * [18] modification date : date of last modification in yyyy-MM-dd format
	 *
	 * @param {array} line
	 * @return {object}
	 */
	'geonames': function(line) {
		return {
			'id': Number(line[0]),
			'name': String(line[1]),
			'asciiname': String(line[2]),
			'alternatenames': String(line[3]),
			'latitude': Number(line[4]),
			'longitude': Number(line[5]),
			'feature_class': String(line[6]),
			'feature_code': String(line[7]),
			'country_code': String(line[8]),
			'cc2': String(line[9]),
			'admin1_code': String(line[10]),
			'admin2_code': String(line[11]),
			'admin3_code': String(line[12]),
			'admin4_code': String(line[13]),
			'population': Number(line[14]),
			'elevation': Number(line[15]),
			'dem': String(line[16]),
			'timezone': String(line[17]),
			'date_modified': String(line[18])
		};
	},

	/**
	 * "alternate names" table formatter.
	 *
	 * [0] alternateNameId   : the id of this alternate name, int
	 * [1] geonameid         : geonameId referring to id in table 'geoname', int
	 * [2] isolanguage       : iso 639 language code 2- or 3-characters; 4-characters 'post' for postal codes and 'iata','icao' and faac for airport codes, fr_1793 for French Revolution names,  abbr for abbreviation, link for a website, varchar(7)
	 * [3] alternate name    : alternate name or name variant, varchar(200)
	 * [4] isPreferredName   : '1', if this alternate name is an official/preferred name
	 * [5] isShortName       : '1', if this is a short name like 'California' for 'State of California'
	 * [6] isColloquial      : '1', if this alternate name is a colloquial or slang term
	 * [7] isHistoric        : '1', if this alternate name is historic and was used in the past
	 *
	 * @param {array} line
	 * @return {object}
	 */
	'alternate_names': function(line) {
		return {
			'id': Number(line[0]),
			'geoname_id': Number(line[1]),
			'isolanguage': String(line[2]),
			'alternate_name': String(line[3]),
			'is_preferred': Boolean(line[4]),
			'is_short': Boolean(line[5]),
			'is_colloquial': Boolean(line[5]),
			'is_historic': Boolean(line[6]),
		};
	},

	/**
	 * "admin codes" table formatter.
	 *
	 * [0] path       : a list of admin codes, delimited by "."
	 * [1] name       : name of the administrative region
	 * [2] asciiname  : name of the administrative region (ascii)
	 * [3] geonameid  : geonameId referring to id in table 'geoname', int
	 *
	 * @param {array} line
	 * @return {object}
	 */
	'admin_codes': function(line) {
		return {
			'path': String(line[0]),
			'geoname_id': Number(line[3]),
			'name': String(line[1]),
			'asciiname': String(line[2])
		};
	},

	/**
	 * "timezones" table formatter.
	 *
	 * [0] country_code
	 * [1] id
	 * [2] gmtOffset
	 * [3] dstOffset
	 * [4] rawOffset
	 *
	 * @param {array} line
	 * @return {object}
	 */
	'timezones': function(line) {
		return {
			'name': String(line[1]),
			'country_code': String(line[0]),
			'gmt_offset': Number(line[2]),
			'dst_offset': Number(line[3]),
			'raw_offset': Number(line[4])
		};
	},

	/**
	 * "hierarchy" table formatter.
	 *
	 * [0] parentID
	 * [1] childID
	 * [2] type
	 *
	 * @param {array} line
	 * @return {object}
	 */
	'hierarchy': function(line) {
		return {
			'parent_id': Number(line[0]),
			'child_id': Number(line[1]),
			'type': String(line[2]),
		};
	},

	/**
	 * "countries" table formatter.
	 *
	 * [0]  ISO
	 * [1]  ISO3
	 * [2]  ISO-Numeric
	 * [3]  fips
	 * [4]  Country
	 * [5]  Capital
	 * [6]  Area(in sq km)
	 * [7]  Population
	 * [8]  Continent
	 * [9]  tld
	 * [10] CurrencyCode
	 * [11] CurrencyName
	 * [12] Phone
	 * [13] Postal Code Format
	 *
	 * @param {array} line
	 * @return {object}
	 */
	'countries': function(line) {
		return {
			'iso': String(line[0]),
			'iso3': String(line[1]),
			'iso_numeric': Number(line[2]),
			'fips': String(line[3]),
			'name': String(line[4]),
			'capital': String(line[5]),
			'area': Number(line[6]),
			'population': Number(line[7]),
			'continent': String(line[8]),
			'tld': String(line[9]),
			'currency_code': String(line[10]),
			'currency_name': String(line[11]),
			'phone': String(line[12]),
			'postal_code_format': String(line[13]),
			'postal_code_regex': String(line[14]),
			'languages': String(line[15]),
      			'geoname_id': Number(line[16])
		};
	}

};
