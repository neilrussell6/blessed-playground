const { assert } = require('chai')
const parametrize = require('js-parametrize')

const { updateFunction, utils: functionsUtils } = require('../Functions')
const { reducer: SUT } = require('./reducer')

describe('modules/Message/reducer', () => {
  describe('setErrorMessageIfInvalidFunction', () => {
    parametrize([
      [updateFunction, '(x, y) => z'],
    ], (action, payloadFunction) => {
      it('should set message to function validation error for invalid function', () => {
        // given ... some message currently in state
        const state = {
          type: 'STATE MESSAGE TYPE',
          message: 'STATE MESSAGE',
        }

        // when ... we update function with invalid code
        const payload = { index: 0, data: payloadFunction }
        const result = SUT(state, action(payload))

        // then ... should update state building a P2P transaction as expected
        assert.deepEqual(result, {
          type: 'error',
          message: functionsUtils.getFunctionValidationError(payloadFunction),
        })
      })
    })
  })
})
