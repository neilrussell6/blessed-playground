const R = require('ramda')

// --------------------------------------
// build style box
// --------------------------------------

const buildStyleBox = (theme) => ({
  style: {
    bg: 0,
    fg: theme['1'],
    label: {
      bg: 0,
      fg: theme['2'],
    },
  },
})

module.exports.buildStyleBox = buildStyleBox

// --------------------------------------
// build style border box
// --------------------------------------

const buildStyleBorderBox = (theme) => R.mergeDeepRight(
  buildStyleBox(theme),
  {
    border: {
      type: 'line',
    },
    style: {
      border: {
        bg: 0,
        fg: theme['1'],
      },
    },
  },
)

module.exports.buildStyleBorderBox = buildStyleBorderBox

// --------------------------------------
// build style faded border box
// --------------------------------------

const buildStyleFadedBorderBox = theme => R.pipe(
  buildStyleBorderBox,
  R.assocPath(['style', 'border', 'fg'], theme['4_faded']),
  R.assocPath(['style', 'label', 'fg'], theme['4_faded']),
)(theme)

module.exports.buildStyleFadedBorderBox = buildStyleFadedBorderBox

// --------------------------------------
// build style table
// --------------------------------------

const buildStyleTable = (theme) => ({
  bg: 0,
  fg: theme['4_faded'],
  selectedBg: theme['4_faded'],
  selectedFg: 'black',
  style: {
    bg: 0,
    fg: theme['3_faded'],
  },
})

module.exports.buildStyleTable = buildStyleTable

// --------------------------------------
// build style heading
// --------------------------------------

const buildStyleHeading = (theme) => ({
  border: {
    type: 'line',
  },
  style: {
    bg: 234,
    fg: theme['4_faded'],
    border: {
      bg: 234,
      fg: theme['4_faded'],
    },
  },
})

module.exports.buildStyleHeading = buildStyleHeading
