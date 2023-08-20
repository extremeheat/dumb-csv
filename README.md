# dumb-csv
[![NPM version](https://img.shields.io/npm/v/dumb-csv.svg?logo=npm)](http://npmjs.com/package/dumb-csv)
[![Build Status](https://img.shields.io/github/actions/workflow/status/extremeheat/dumb-csv/ci.yml.svg?label=CI&logo=github)](https://github.com/extremeheat/dumb-csv/actions?query=workflow%3A%22CI%22)
[![Try it on gitpod](https://img.shields.io/static/v1.svg?label=try&message=on%20gitpod&color=brightgreen&logo=gitpod)](https://gitpod.io/#https://github.com/extremeheat/dumb-csv)

[![Official Discord](https://img.shields.io/static/v1.svg?label=OFFICIAL&message=DISCORD&color=blue&logo=discord&style=for-the-badge)](https://discord.gg/GsEFRM8)

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

