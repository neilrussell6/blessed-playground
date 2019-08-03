const { endpoint } = require('../../common/redux/utils.js')
const { updateItemByIndexWith } = require('../../common/redux/reducers.js')
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

module.exports.actions = {
  UPDATE_FUNCTION,
}

//---------------------------------
// action creators
//---------------------------------

const updateFunction = ({ index, data }) => ({ type: UPDATE_FUNCTION, payload: { index, data } })

module.exports.actionCreators = {
  updateFunction,
}

//---------------------------------
// action -> reducer mapping
//---------------------------------

const reducers = {
  [UPDATE_FUNCTION]: updateItemByIndexWith(utils.validateFunction),
}

module.exports.reducer = endpoint(reducers, INITIAL_STATE)
