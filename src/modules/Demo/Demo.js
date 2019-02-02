const blessed = require('blessed')
const R = require('ramda')

const { styleBorderBox } = require('../../common/styles')

const main = ({ data }) => {
  const view = blessed.box({
    width: '100%',
    height: '100%',
    tags: true,
    label: ' Demo ',
    padding: {
      top: 1,
      left: 2,
    },
    ...styleBorderBox,
    content: R.propOr('', 'text', data),
  })

  return { view }
}

module.exports = main
