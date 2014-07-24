# geonames-reader

[![NPM version](https://badge.fury.io/js/geonames-reader.png)](http://badge.fury.io/js/geonames-reader)
[![Build Status](https://travis-ci.org/naturalatlas/geonames-reader.png?branch=master)](https://travis-ci.org/naturalatlas/geonames-reader)
[![Coverage Status](https://coveralls.io/repos/naturalatlas/geonames-reader/badge.png)](https://coveralls.io/r/naturalatlas/geonames-reader)

An async-friendly streaming parser for [geonames data](http://download.geonames.org/export/dump/). It supports the following types of files: "geonames" (features/cities), "adminCodes", "alternateNames", "hierarchy", "countryInfo", and "timeZones". The parser spits out objects with appropriate field names, as defined [here](lib/formatters.js).

```sh
$ npm install geonames-reader --save
```

### Usage

```js
var geonames = require('geonames-reader');

geonames.read('US.txt', function(feature, callback) {
    console.log(feature.name);
    console.log(feature.latitude);
    console.log(feature.longitude);
    callback();
}, function(err) {
    console.log('All done!');
});
```

### Test

```sh
$ npm test
```

## License

Copyright &copy; 2014 [Brian Reavis](https://github.com/brianreavis) & [Contributors](https://github.com/naturalatlas/geonames-reader/graphs/contributors)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.