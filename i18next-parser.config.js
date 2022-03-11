module.exports = {
  createOldCatalogs: false,
  defaultValue: '__TRANSLATION MISSING__',
  indentation: 2,
  keySeparator: false,
  lexers: {
    ts: ['JavascriptLexer'],
    tsx: ['JsxLexer'],
    default: ['JavascriptLexer']
  },
  lineEnding: 'auto',
  locales: ['de', 'en'],
  namespaceSeparator: false,
  output: 'public/locales/$LOCALE.json',
  sort: true,
  skipDefaultValues: false,
  useKeysAsDefaultValue: true,
  verbose: false,
  failOnWarnings: false
};
