module "dumb-csv" {
  type Options = { data: string?, file?: string, separator: string, headerFields?: string[], overrideExistingHeader?: boolean, parseFloats?: boolean, commentPrefix?: boolean }

  // Input `options` object :
  // * `data` (string) -- a string representing the CSV data
  // * OR `file` (string) -- a path to the CSV
  // * `headerFields` (optional string[]) -- an array of strings containing the headers for the CSV, assuming they are not the 1st line
  // * `overrideExistingHeader` (optional bool) -- if the 1st line IS a header, but your `headerFields` should override it
  // * `parseFloats` (default true) -- if we should try and convert rows that are numbers into JS Number's, or if false keep everything as strings
  // * `commentPrefix` (optional) -- Ignore all lines that start with this comment prefix.
  // 
  // Output object :
  // * `toJSON()` (function) -- calling this will return a javascript object that represents the CSV
  // * `toMarkdown()` (function) -- calling this will return a string that has a formatted markdown table inside that represents the CSV
  function fromCSV(options: Options) : { toJSON: () => object, toMarkdown: () => string }

  // A simple way to open CSV/TSV/delimiter seperated files wrt the `root` directory. All `openCSV` or `openTSV` calls will
  // have the `root` prefixed to their file `path`. This is designed to return functions that act like CommonJS's require().
  function withDir(root: string) : {
    // Opens a TSV file at the `path` wrt the root, with the same options as `fromCSV` with the delimter set to '\t'
    openTSV: (path: string, options?: Options) => object,
    // Opens a CSV file at the `path` wrt the root, with the same options as `fromCSV`
    openCSV: (path: string, options?: Options) => object
  }
}