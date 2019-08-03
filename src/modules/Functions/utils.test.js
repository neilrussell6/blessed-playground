const { assert } = require('chai')
const parametrize = require('js-parametrize')

const SUT = require('./utils')

describe('modules/Functions/utils', () => {
  describe('getFunctionValidationError', () => {
    parametrize([
      '(x, y) => x & y',
      '(x, y) => x | y',
      '(x) => x',
    ], f => {
      it('should return null if function is valid', () => {
        assert.equal(SUT.getFunctionValidationError(f), null)
      })
    })

    parametrize([
      ['(x, y) => x & (y | x', 'Unexpected end of input'],
      ['(x, y) => x | y & z', 'z is not defined'],
      ['(x) => x + "A"', 'invalid return type: not number'],
      ['(x) => 2', 'invalid return type: not binary'],
    ], (f, expected) => {
      it('should return expected error message for invalid function', () => {
        assert.equal(SUT.getFunctionValidationError(f), expected)
      })
    })
  })

  describe('validateFunction', () => {
    parametrize([
      '(x, y) => x & y',
      '(x, y) => x | y',
      '(x) => x',
    ], f => {
      it('should return true if function is valid', () => {
        assert.isTrue(SUT.validateFunction(f))
      })
    })

    parametrize([
      '(x, y) => x & (y | x',
      '(x, y) => x | y & z',
      '(x) => x + "A"',
      '(x) => 2',
    ], f => {
      it('should return false if function is invalid', () => {
        assert.isFalse(SUT.validateFunction(f))
      })
    })
  })
})
