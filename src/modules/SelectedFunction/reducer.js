const { endpoint } = require('../../common/redux/utils')
const { overwriteStateWithPayload } = require('../../common/redux/reducers')
const { FOCUS_FUNCTION } = require('../Functions')

//---------------------------------
// initial state
//---------------------------------

const INITIAL_STATE = 0

//---------------------------------
// action -> reducer mapping
//---------------------------------

const reducers = {
  [FOCUS_FUNCTION]: overwriteStateWithPayload,
}

module.exports.reducer = endpoint(reducers, INITIAL_STATE)
