const R = require('ramda')
const { assert } = require('chai')
const parametrize = require('js-parametrize')

const SUT = require('./reducers')

describe('common/redux/reducers', () => {
  describe('updateItemByIndexWith', () => {
    parametrize([
      [['a'], { data: 'x', index: 0 }, ['x']],
      [['a', 'b'], { data: 'x', index: 0 }, ['x', 'b']],
      [['a', 'b'], { data: 'x', index: 1 }, ['a', 'x']],
      [['a', 'b', 'c'], { data: 'x', index: 1 }, ['a', 'x', 'c']],
    ], (state, payload, expected) => {
      it('should update item at provided index if predicate passes', () => {
        const action = { type: 'NA', payload }
        const result = SUT.updateItemByIndexWith(R.T)(state, action)
        assert.deepEqual(result, expected)
      })
    })

    parametrize([
      [['a'], { data: 'x', index: 0 }, ['a']],
      [['a', 'b'], { data: 'x', index: 0 }, ['a', 'b']],
      [['a', 'b'], { data: 'x', index: 1 }, ['a', 'b']],
      [['a', 'b', 'c'], { data: 'x', index: 1 }, ['a', 'b', 'c']],
    ], (state, payload, expected) => {
      it('should not update item at provided index if predicate fails', () => {
        const action = { type: 'NA', payload }
        const result = SUT.updateItemByIndexWith(R.F)(state, action)
        assert.deepEqual(result, expected)
      })
    })
  })
})
