const Demo = require('./Demo.js')

const data = {
  text: `Blessed is a curses-like library with a high level terminal interface API for node.js.

Change the COLOR_THEME variable in your .env file for different color schemes.`
}

module.exports = () => Demo({ data })
