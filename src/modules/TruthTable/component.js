const blessed = require('blessed')
const R = require('ramda')

const { theme } = require('../../common/color-themes')

// --------------------------------------
// state
// --------------------------------------

let state = {}

// --------------------------------------
// utils
// --------------------------------------

const buildBorderTop = (params, bodySize, rowHeadSize) => {
  return blessed.box({
    ...params,
    style: {
      fg: theme['1'],
    },
    content: R.join('', ['\u256D', ...R.repeat('\u2500', bodySize + 3), '\u252C', ...R.repeat('\u2500', rowHeadSize + 3), '\u256E']),
  })
}

const buildBorderMid = (params, bodySize, rowHeadSize) => {
  return blessed.box({
    ...params,
    style: {
      fg: theme['1'],
    },
    content: R.join('', ['\u251C', ...R.repeat('\u2500', bodySize + 3), '\u253C', ...R.repeat('\u2500', rowHeadSize + 3), '\u2524']),
  })
}

const buildBorderBottom = (params, bodySize, rowHeadSize) => {
  return blessed.box({
    ...params,
    style: {
      fg: theme['1'],
    },
    content: R.join('', ['\u2570', ...R.repeat('\u2500', bodySize + 3), '\u2534', ...R.repeat('\u2500', rowHeadSize + 3), '\u256F']),
  })
}

const buildRow = (params, body, header, isHeader = false) => {
  const wrapperBox = blessed.box(params)
  const borderBox = blessed.box({
    style: {
      fg: theme['1'],
    },
    content: R.join('', ['\u2502', ...R.repeat(' ', body.length + 3), '\u2502', ...R.repeat(' ', header.length + 3), '\u2502']),
  })
  const bodyBox = blessed.box({
    height: 1,
    width: body.length,
    left: 3,
    style: {
      fg: isHeader ? theme['3'] : theme['2'],
    },
    content: body,
  })
  const headerBox = blessed.box({
    height: 1,
    width: header.length,
    left: body.length + 6,
    style: {
      fg: theme['3'],
    },
    content: header,
  })
  wrapperBox.append(borderBox)
  wrapperBox.append(bodyBox)
  wrapperBox.append(headerBox)
  return wrapperBox
}

const updateRow = (row, body, header) => {
  const bodyBox = row.children[1]
  bodyBox.content = body
  const headerBox = row.children[2]
  headerBox.content = header
}

// --------------------------------------
// init
// --------------------------------------

const init = ({ parent, functionCount, header, body, bodySize, rowHeadSize }) => {
  const view = blessed.box()

  view.append(buildBorderTop({ top: 0 }, bodySize, rowHeadSize))
  view.append(buildRow({ top: 1 }, header[0], header[1], true))
  view.append(buildBorderMid({ top: 2 }, bodySize, rowHeadSize))
  const rows = R.addIndex(R.map)(([x, y], i) => buildRow({ top: 3 + i }, x, y), body)
  R.forEach(x => view.append(x), rows)
  view.append(buildBorderBottom({ top: 3 + body.length }, bodySize, rowHeadSize))

  const wrapperView = blessed.box({
    width: '90%',
    tags: true,
    top: functionCount + 5,
    bottom: 5,
    left: 'center',
  })
  wrapperView.append(view)

  // update local state

  state.parent = parent
  state.rows = rows

  return wrapperView
}

module.exports.init = init

// --------------------------------------
// update
// --------------------------------------

const update = view => ({ functionCount, header, body, bodySize, rowHeadSize }) => {
  R.addIndex(R.forEach)(([x, y], i) => updateRow(state.rows[i], x, y), body)
}

module.exports.update = update
