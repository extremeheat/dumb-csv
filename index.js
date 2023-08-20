const fs = require('fs')

function split (text, delimiter) {
  let escaping = false
  let inQuote = false
  let current = ''
  const out = []
  for (const char of text) {
    if (escaping) {
      current += char
      escaping = false
    } else if (char === '\\') {
      escaping = true
    } else if (char === '"') {
      inQuote = !inQuote
    } else if (char === delimiter && !inQuote) {
      out.push(current)
      current = ''
    } else {
      current += char
    }
  }
  out.push(current)
  return out
}

function fromCSV ({ data, file, separator = ',', headerFields, overrideExistingHeader }) {
  function load (data) {
    data = data.replaceAll('\r\n', '\n')
    const lines = data.split('\n')
    let headers = []
    if (!headerFields) {
      const head = lines.shift()
      headers = split(head, separator)
    } else {
      if (overrideExistingHeader) lines.shift()
      headers = headerFields
    }
    const out = []
    for (const line of lines) {
      const row = split(line, separator)
      const obj = {}
      for (const i in headers) {
        obj[headers[i]] = row[i]
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

module.exports = {
  fromCSV
}
