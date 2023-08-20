# dumb-csv
[![NPM version](https://img.shields.io/npm/v/dumb-csv.svg?logo=npm)](http://npmjs.com/package/dumb-csv)
[![Build Status](https://img.shields.io/github/actions/workflow/status/extremeheat/dumb-csv/ci.yml.svg?label=CI&logo=github)](https://github.com/extremeheat/dumb-csv/actions?query=workflow%3A%22CI%22)
[![Try it on gitpod](https://img.shields.io/static/v1.svg?label=try&message=on%20gitpod&color=brightgreen&logo=gitpod)](https://gitpod.io/#https://github.com/extremeheat/dumb-csv)

An unfancy CSV to JSON/markdown parsing lib with no streams or asynchrony

## Install

```sh
npm install dumb-csv
```

## Usage

```js
const dumbcsv = require('dumb-csv')
dumbcsv
  .fromCSV({ data: 'hello,world', seperator: ',', headerFields: ['a', 'b'] })
  .toJSON()
// [{"a":"hello","b":"world"}]
```

## API

### fromCSV(data, file, separator = ',', headerFields, overrideExistingHeader) : { toJSON(), toMarkdown() }

* `data` -- a string representing the CSV data
* OR `file` -- a path to the CSV
* `headerFields` -- an array of strings containing the headers for the CSV, assuming they are not the 1st line
* `overrideExistingHeader` -- if the 1st line IS a header, but your `headerFields` should override it