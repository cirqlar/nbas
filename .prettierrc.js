/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
module.exports = {
  arrowParens: 'avoid',
  singleQuote: true,
  trailingComma: 'all',
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: './src/global.css'
};
