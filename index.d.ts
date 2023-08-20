module "dumb-csv" {
  // Input object :
  // * `data` (string) -- a string representing the CSV data
  // * OR `file` (string) -- a path to the CSV
  // * `headerFields` (optional string[]) -- an array of strings containing the headers for the CSV, assuming they are not the 1st line
  // * `overrideExistingHeader` (optional bool) -- if the 1st line IS a header, but your `headerFields` should override it
  // 
  // Output object :
  // * `toJSON()` (function) -- calling this will return a javascript object that represents the CSV
  // * `toMarkdown()` (function) -- calling this will return a string that has a formatted markdown table inside that represents the CSV
  function fromCSV(data: string?, file?: string, separator = ',', headerFields?: string[], overrideExistingHeader?: boolean) : { toJSON: () => object, toMarkdown: () => string }
}