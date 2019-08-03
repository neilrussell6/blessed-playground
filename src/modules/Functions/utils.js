const R = require('ramda')

// --------------------------------------
// get function validation error
// --------------------------------------

const getFunctionValidationError = R.tryCatch(
  R.pipe(
    f => eval(f),
    f => f(...R.repeat(0, f.length)),
    R.ifElse(R.is(Number), R.identity, () => { throw Error('invalid return type: not number') }),
    R.ifElse(R.includes(R.__, [0, 1]), R.identity, () => { throw Error('invalid return type: not binary') }),
    R.empty,
  ),
  R.prop('message'),
)

module.exports.getFunctionValidationError = getFunctionValidationError

// --------------------------------------
// validate function
// --------------------------------------

const validateFunction = R.pipe(
  getFunctionValidationError,
  R.ifElse(R.isNil, R.T, R.F),
)

module.exports.validateFunction = validateFunction
