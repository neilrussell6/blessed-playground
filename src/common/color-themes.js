const R = require('ramda')

const THEME_DEEP_SEA = 'deep-sea'
const THEME_SPACE_TERM = 'space-term'
const THEME_BLOOD = 'blood'

const themes = {
  [THEME_DEEP_SEA]: {
    '0': 23,
    '1': 23,
    '2': 30,
    '3': 37,
    '3_faded': 37,
    '4': 44,
    '4_faded': 73,
    '5': 80,
    '6': 159,
    '7': 195,
  },
  [THEME_SPACE_TERM]: {
    '0': 64,
    '1': 64,
    '2': 106,
    '3': 154,
    '3_faded': 150,
    '4': 191,
    '4_faded': 2,
    '5': 193,
    '6': 193,
    '7': 255,
  },
  [THEME_BLOOD]: {
    '0': 52,
    '1': 88,
    '2': 124,
    '3': 160,
    '3_faded': 196,
    '4': 1,
    '4_faded': 9,
    '5': 172,
    '6': 220,
    '7': 239,
  },
}

const themeName = R.propOr(THEME_SPACE_TERM, 'COLOR_THEME', process.env)

module.exports = {
  THEME_DEEP_SEA,
  THEME_SPACE_TERM,
  THEME_BLOOD,
  themeName: themeName,
  theme: themes[themeName],
  themes,
}
