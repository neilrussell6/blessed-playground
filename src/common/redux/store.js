const { combineReducers, createStore, applyMiddleware } = require('redux')

const logger = ({ getState }) => {
  return next => action => {
    console.log('ACTION', action)
    console.log('STATE (before)', getState())

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    console.log('STATE (after)', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

const { reducer: functions } = require('../../modules/Functions')
const { reducer: message } = require('../../modules/Message')

const configureStore = () => {
  const reducer = combineReducers({
    functions,
    message,
  })
  // return createStore(reducer, {}, applyMiddleware(logger))
  return createStore(reducer, {})
}

module.exports.configureStore = configureStore
