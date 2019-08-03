const { assert } = require('chai')
const sinon = require('sinon')

const SUT = require('./selector')

describe('modules/TruthTable/selector', () => {
  let sandbox = null

  beforeEach(async () => {
    sandbox = await sinon.createSandbox()
  })

  afterEach(async () => {
    await sandbox.restore()
  })

  describe('general', () => {
    it('should return required view props as expected', () => {
      const state = {
        functions: [
          (x, y) => x & y,
          (x, y) => x | y,
          (x, y) => x | (x & y),
        ],
      }
      assert.deepEqual(SUT(state), {
        functionCount: 3,
        header: ['x y', 'f g h'],
        body: [
          ['0 0', '0 0 0'],
          ['0 1', '0 1 0'],
          ['1 0', '0 1 1'],
          ['1 1', '1 1 1'],
        ],
        bodySize: 3,
        rowHeadSize: 5,
      })
    })
  })
})
