const presets = [
  ['@babel/typescript', { jsxPragma: 'h' }],
  '@babel/preset-env'
];

const plugins = [
  ['@babel/plugin-proposal-decorators', { legacy: false, decoratorsBeforeExport: true }],
  ['@babel/plugin-proposal-class-properties', { loose : true }],
  ['@babel/plugin-proposal-optional-chaining'],
  ['@babel/plugin-transform-react-jsx', {
    pragma: 'h',
    pragmaFrag: 'Fragment',
  }]
];

module.exports = { presets, plugins };
