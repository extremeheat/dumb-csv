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
  .fromCSV({ data: 'hello,world', separator: ',', headerFields: ['a', 'b'] })
  .toJSON()
// [{"a":"hello","b":"world"}]
```

## API

### fromCSV(options: { data, file, separator = ',', headerFields, overrideExistingHeader, parseFloats = true, commentPrefix? }) : { toJSON: () => object, toMarkdown: () => string }
Input `options` object:
* `data` (string) -- a string representing the CSV data
* OR `file` (string) -- a path to the CSV
* `headerFields` (optional string[]) -- an array of strings containing the headers for the CSV, assuming they are not the 1st line
* `overrideExistingHeader` (optional bool) -- if the 1st line IS a header, but your `headerFields` should override it
* `parseFloats` (default true) -- if we should try and convert rows that are numbers into JS Number's, or if false keep everything as strings
* `commentPrefix` (optional) -- Ignore all lines that start with this comment prefix.

Output object :
* `toJSON()` (function) -- calling this will return a javascript object that represents the CSV
* `toMarkdown()` (function) -- calling this will return a string that has a formatted markdown table inside that represents the CSV

### withDir(root: string): { openCSV(path: string, options?), openTSV(path: string, options?) }

A simple way to open CSV/TSV/delimiter seperated files with respect to the `root` directory. Calling this function will return
2 functions, openCSV and openTSV, both of which take a `path` that will be appended to the `root` path. The options these
functions take are the same as `fromCSV`'s options, except that openTSV sets the seperator to '\t'. 
Additionally, `fromTSV()`'s `toJSON()` method is called at the end for simplicity. If you need more configurability, use `fromCSV` directly.

This is intended to return functions that can act similarly to the Node.js/CommonJS require() function. For example,

```js
const reader = require('dumb-csv').withDir(__dirname)
const data = reader.openTSV('./data/data.tsv')
```

the above function will open './data/data.tsv' with respect to this file's current directory, with the seperator set as '\t'.