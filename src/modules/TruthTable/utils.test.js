const { assert } = require('chai')
const parametrize = require('js-parametrize')

const SUT = require('./utils')

describe('modules/TruthTable/utils', () => {
  describe('product', () => {
    it('should return cartesian product of provided args', () => {
      const result = SUT.product(['a', 'b'], ['1', '2'])
      assert.deepEqual(result, [['a', '1'], ['a', '2'], ['b', '1'], ['b', '2']])
    })
  })

  describe('buildTruthTable', () => {
    parametrize([
      [(x, y) => x & y, [0, 0, 0, 1]],
      [(x, y) => x | y, [0, 1, 1, 1]],
    ], (f, expected) => {
      it('should build truth table from provided function', () => {
        const result = SUT.buildTruthTable(f)
        assert.deepEqual(result, [
          [[0, 0], expected[0]],
          [[0, 1], expected[1]],
          [[1, 0], expected[2]],
          [[1, 1], expected[3]],
        ])
      })
    })
  })
})
