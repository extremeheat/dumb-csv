const dumbcsv = require('dumb-csv')
dumbcsv
  .fromCSV({ data: 'hello,world', seperator: ',', headerFields: ['a', 'b'] })
  .toJSON()
// [{"a":"hello","b":"world"}]