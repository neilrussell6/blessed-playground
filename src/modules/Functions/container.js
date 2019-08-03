const R = require('ramda')

const connect = require('../../common/redux/connect.js')
const Component = require('./component.js')
const { actionCreators } = require('./reducer.js')

const { updateFunction } = actionCreators

const mapStateToProps = R.pick(['functions'])

const mapDispatchToProps = dispatch => ({
  onSubmit: (index, data) => dispatch(updateFunction({ index, data })),
})

module.exports = store => connect(store)(
  mapStateToProps,
  mapDispatchToProps,
)(Component)
