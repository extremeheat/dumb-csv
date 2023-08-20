const dumbcsv = require('dumb-csv')
const json = dumbcsv
  .fromCSV({ data: 'hello,world', seperator: ',', headerFields: ['a', 'b'] })
  .toJSON()
console.log(json)
// [{"a":"hello","b":"world"}]
