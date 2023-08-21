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

  it('escapes with backticks', () => {
    const json = dumbcsv
      .fromCSV({ data: 'hello,"\\"world\\""', separator: ',', headerFields: ['a', 'b'] })
      .toJSON()
    assert.deepEqual(json, [{ a: 'hello', b: '"world"' }])
  })

  it('escapes with double quotes', () => {
    const json = dumbcsv
      .fromCSV({ data: 'hello,"""world"""', separator: ',', headerFields: ['a', 'b'] })
      .toJSON()
    assert.deepEqual(json, [{ a: 'hello', b: '"world"' }])
  })

  it('parses floats', () => {
    const json = dumbcsv
      .fromCSV({ data: 'hello,world,3.14159', headerFields: ['a', 'b', 'c'] })
      .toJSON()
    console.log(json)
    assert.deepStrictEqual(json, [{ a: 'hello', b: 'world', c: 3.14159 }])
  })

  it('NOT parses bad floats', () => {
    const json = dumbcsv
      .fromCSV({ data: '436E0248,3.141592653589793238462643383279502884197,3.14159', headerFields: ['a', 'b', 'c'] })
      .toJSON()
    console.log(json)
    assert.deepStrictEqual(json, [{ a: '436E0248', b: '3.141592653589793238462643383279502884197', c: 3.14159 }])
  })

  it('NOT parses floats', () => {
    const json = dumbcsv
      .fromCSV({ data: 'hello,world,3.14159', headerFields: ['a', 'b', 'c'], parseFloats: false })
      .toJSON()
    console.log(json)
    assert.deepStrictEqual(json, [{ a: 'hello', b: 'world', c: '3.14159' }])
  })
})
