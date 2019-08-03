const Container = require('./container.js')
const { reducer, actions, actionCreators } = require('./reducer')
const utils = require('./utils')

module.exports = {
  Component: Container,
  reducer,
  utils,
  ...actions,
  ...actionCreators,
}
