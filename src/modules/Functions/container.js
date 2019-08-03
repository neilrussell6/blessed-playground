const R = require('ramda')

const connect = require('../../common/redux/connect')
const Component = require('./component')
const { actionCreators } = require('./reducer')

const { updateFunction, focusFunction } = actionCreators

const mapStateToProps = R.pick(['functions'])

const mapDispatchToProps = dispatch => ({
  onSubmit: (index, data) => dispatch(updateFunction({ index, data })),
  onFocus: index => dispatch(focusFunction(index)),
})

module.exports = store => connect(store)(
  mapStateToProps,
  mapDispatchToProps,
)(Component)
