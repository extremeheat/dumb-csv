module "dumb-csv" {
  // * `data` -- a string representing the CSV data
  // * OR `file` -- a path to the CSV
  // * `headerFields` -- an array of strings containing the headers for the CSV, assuming they are not the 1st line
  // * `overrideExistingHeader` -- if the 1st line IS a header, but your `headerFields` should override it
  function fromCSV(data: string?, file?: string, separator = ',', headerFields?: string[], overrideExistingHeader?: boolean) : { toJSON: () => string, toMarkdown: () => string }
}