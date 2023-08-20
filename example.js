const dumbcsv = require('dumb-csv')
const json = dumbcsv
  .fromCSV({ data: 'hello,world', separator: ',', headerFields: ['a', 'b'] })
  .toJSON()
console.log(json)
// [{"a":"hello","b":"world"}]
