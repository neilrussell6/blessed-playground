const { theme } = require('./color-themes')

const styleBox = {
  style: {
    bg: 0,
    fg: theme['1'],
    label: {
      bg: 0,
      fg: theme['2'],
    },
  },
}

const styleBorderBox = {
  border: {
    type: 'line',
  },
  style: {
    ...styleBox.style,
    border: {
      bg: 0,
      fg: theme['1'],
    },
  },
}

const styleTable = {
  bg: 0,
  fg: theme['4_faded'],
  selectedFg: 'black',
  selectedBg: theme['4_faded'],
  style: {
    bg: 0,
    fg: theme['3_faded'],
  },
}

const styleHeading = {
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
}

module.exports = {
  styleBox,
  styleBorderBox,
  styleTable,
  styleHeading,
}
