const R = require('ramda')

const { endpoint } = require('../../common/redux/utils.js')
const { updateItemWith } = require('../../common/redux/reducers.js')
const { UPDATE_FUNCTION, utils: functionsUtils } = require('../Functions')

//---------------------------------
// initial state
//---------------------------------

const INITIAL_STATE = {
  type: 'help',
  message: '[ENTER] Edit function',
}

//---------------------------------
// reducers
//---------------------------------

const setMessageIfValid = (state, { payload }) => {
  try {
    const g = eval(payload.f)
    g(...R.repeat(0, g.length))
    return INITIAL_STATE
  } catch (e) {
    return {
      type: 'error',
      message: e.message,
    }
  }
}

const setErrorMessageIfInvalidFunction = R.uncurryN(2, state => R.pipe(
  R.path(['payload', 'data']),
  functionsUtils.getFunctionValidationError,
  R.ifElse(R.isNil, R.always(INITIAL_STATE), R.pipe(R.objOf('message'), R.mergeRight({ type: 'error' }))),
))

//---------------------------------
// action -> reducer mapping
//---------------------------------

const reducers = {
  [UPDATE_FUNCTION]: setErrorMessageIfInvalidFunction,
}

module.exports.reducer = endpoint(reducers, INITIAL_STATE)
