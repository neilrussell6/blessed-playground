const { endpoint } = require('../../common/redux/utils')
const { updateItemByIndexWith } = require('../../common/redux/reducers')
const utils = require('./utils')

//---------------------------------
// initial state
//---------------------------------

const INITIAL_STATE = [
  '(x, y) => ~(~(x) & ~(x | y))',
  '(x, y) => ~(~(x) & (~(x) & ~(y)))', // APPLY de morgan law
  '(x, y) => ~((~(x) & ~(x)) & ~(y))', // APPLY associative law
  '(x, y) => ~(~(x) & ~(y))', // APPLY idempotence law
  '(x, y) => ~(~(x)) | ~(~(y))', // APPLY de morgan law
]

//---------------------------------
// actions
//---------------------------------

const UPDATE_FUNCTION = 'app/Functions/UPDATE_FUNCTION'

const FOCUS_FUNCTION = 'app/Functions/FOCUS_FUNCTION'

module.exports.actions = {
  UPDATE_FUNCTION,
  FOCUS_FUNCTION,
}

//---------------------------------
// action creators
//---------------------------------

const updateFunction = ({ index, data }) => ({ type: UPDATE_FUNCTION, payload: { index, data } })

const focusFunction = index => ({ type: FOCUS_FUNCTION, payload: index })

module.exports.actionCreators = {
  updateFunction,
  focusFunction,
}

//---------------------------------
// action -> reducer mapping
//---------------------------------

const reducers = {
  [UPDATE_FUNCTION]: updateItemByIndexWith(utils.validateFunction),
}

module.exports.reducer = endpoint(reducers, INITIAL_STATE)
