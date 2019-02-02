const R = require('ramda')

const { styleHeading } = require('./styles')

const screen = () => ({
  smartCSR: true,
  autoPadding: false,
  terminal: 'xterm-256color',
})

const heading = (extra = {}) => R.mergeDeepRight({
  height: 4,
  top: -1,
  left: -2,
  right: -2,
  padding: {
    top: 1,
  },
  width: '100%+4',
  ...extra,
}, styleHeading)

module.exports = {
  screen,
  heading,
}
