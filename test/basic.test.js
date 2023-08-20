/* eslint-env mocha */
const dumbcsv = require('dumb-csv')
const assert = require('assert')

describe('basic', () => {
  it('works', () => {
    const json = dumbcsv
      .fromCSV({ data: 'hello,world', headerFields: ['a', 'b'] })
      .toJSON()
    assert.deepEqual(json, [{ a: 'hello', b: 'world' }])
  })

  it('tsv works', () => {
    const json = dumbcsv
      .fromCSV({ data: 'hello\tworld', separator: '\t', headerFields: ['a', 'b'] })
      .toJSON()
    assert.deepEqual(json, [{ a: 'hello', b: 'world' }])
  })

  it('works with quotes', () => {
    const json = dumbcsv
      .fromCSV({ data: 'hello,"world"', headerFields: ['a', 'b'] })
      .toJSON()
    assert.deepEqual(json, [{ a: 'hello', b: 'world' }])
  })

  it('escapes with quotes', () => {
    const json = dumbcsv
      .fromCSV({ data: 'hello,"\\"world\\""', seperator: ',', headerFields: ['a', 'b'] })
      .toJSON()
    assert.deepEqual(json, [{ a: 'hello', b: '"world"' }])
  })
})
