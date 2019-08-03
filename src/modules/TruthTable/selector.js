const R = require('ramda')
const { createSelector } = require('reselect')

const utils = require('./utils')
const {
  ARG_NAMES,
  FUNCTION_NAMES,
} = require('./constants')

const selector = createSelector([R.identity], R.pipe(
  R.applySpec({
    functions: R.compose(R.map(x => eval(x)), R.prop('functions')),
  }),
  R.applySpec({
    functions: R.prop('functions'),
    argNames: R.compose(R.take(R.__, ARG_NAMES), R.length, R.head, R.prop('functions')),
    functionNames: R.compose(R.take(R.__, FUNCTION_NAMES), R.length, R.prop('functions')),
  }),
  R.applySpec({
    functions: R.prop('functions'),
    header: R.compose(R.map(R.join(' ')), R.values, R.pick(['argNames', 'functionNames'])),
    truthTables: R.compose(R.map(utils.buildTruthTable), R.prop('functions')),
  }),
  R.applySpec({
    functions: R.prop('functions'),
    header: R.prop('header'),
    body: R.pipe(
      R.prop('truthTables'),
      truthTables => R.pipe(
        R.tail,
        R.map(R.map(R.last)),
        R.ifElse(
          R.compose(R.equals(0), R.length),
          R.pipe(
            R.always(R.head(truthTables)),
            R.map(([x, y]) => [x, [y]]),
          ),
          R.pipe(
            utils.zipAll,
            R.zip(R.head(truthTables)),
            R.map(([[x, y], z]) => [x, [y, ...z]]),
          ),
        ),
        R.map(R.map(R.join(' '))),
      )(truthTables),
    ),
  }),
  R.applySpec({
    functionCount: R.compose(R.length, R.prop('functions')),
    header: R.prop('header'),
    body: R.prop('body'),
    bodySize: R.compose(R.length, R.head, R.head, R.prop('body')),
    rowHeadSize: R.compose(R.length, R.last, R.head, R.prop('body')),
  }),
))

module.exports = selector
