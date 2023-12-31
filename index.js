const fs = require('fs')
const { join } = require('path')

// Split csv text into an array of fields, note that two "" in a row is an escaped quote
function split (text, delimiter) {
  text = text.replaceAll('\\"', '""')
  const out = []
  let field = ''
  let inQuote = false
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (char === delimiter && !inQuote) {
      out.push(field)
      field = ''
    } else if (char === '"') {
      if (inQuote) {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuote = false
        }
      } else {
        inQuote = true
      }
    } else {
      field += char
    }
  }
  out.push(field)
  return out
}

function fromCSV ({ data, file, separator = ',', headerFields, overrideExistingHeader, parseFloats = true, skipEmptyLines = true, commentPrefix }) {
  function load (data) {
    data = data.replaceAll('\r\n', '\n')
    const lines = data.split('\n')
    let headers = []
    if (!headerFields) {
      const head = lines.shift()
      headers = split(head, separator).map(e => e.replace('#', ''))
    } else {
      if (overrideExistingHeader) lines.shift()
      headers = headerFields
    }
    const out = []
    for (const line of lines) {
      if (skipEmptyLines && !line) continue
      if (commentPrefix && line.startsWith(commentPrefix)) continue
      const row = split(line, separator)
      const obj = {}
      for (const i in headers) {
        let val = row[i]
        if (parseFloats && !isNaN(val)) {
          const floatVal = parseFloat(val)
          if (floatVal.toString() === row[i]) val = floatVal
        }
        obj[headers[i]] = val
      }
      out.push(obj)
    }
    return {
      toJSON: () => out,
      toMarkdown: () => toMarkdown(out)
    }
  }
  if (data) return load(data)
  else if (file) {
    data = fs.readFileSync(file, 'utf8')
    return load(data)
  } else {
    throw new Error('Must provide either data or file argument')
  }
}

function toMarkdown (data) {
  const headers = Object.keys(data[0])
  const out = []
  out.push(headers.join('|'))
  out.push(headers.map(() => '---').join('|'))
  for (const row of data) {
    out.push(headers.map(h => row[h]).join('|'))
  }
  return out.join('\n')
}

function withDir (root) {
  const openCSV = (fileName, options) => fromCSV({ file: join(root, fileName), separator: ',', ...options }).toJSON()
  const openTSV = (fileName, options) => fromCSV({ file: join(root, fileName), separator: '\t', ...options }).toJSON()
  return { openCSV, openTSV }
}

module.exports = {
  fromCSV, withDir
}
