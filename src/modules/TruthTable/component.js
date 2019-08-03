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

const buildBorderMid = (params, bodySize, rowHeadSize, selectedIndex) => {
  const wrapperBox = blessed.box(params)

  const borderContent = ['\u251C', ...R.repeat('\u2500', bodySize + 3), '\u253C', ...R.repeat('\u2500', rowHeadSize + 3), '\u2524']
  R.addIndex(R.forEach)((x, i) => {
    const highlightIndex = selectedIndex + bodySize + 6
    const borderBox = blessed.box({
      left: (i * 1),
      style: {
        fg: highlightIndex === i
            ? theme['3']
            : highlightIndex - 1 === i || highlightIndex + 1 === i
              ? theme['2']
              : theme['1'],
      },
      content: x,
    })
    wrapperBox.append(borderBox)
  })(borderContent)

  return wrapperBox
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

const buildRow = (params, body, header, selectedIndex, isHeader = false) => {
  const wrapperBox = blessed.box(params)

  const borderBox = blessed.box({
    style: {
      fg: theme['1'],
    },
    content: R.join('', ['\u2502', ...R.repeat(' ', body.length + 3), '\u2502', ...R.repeat(' ', header.length + 3), '\u2502']),
  })
  wrapperBox.append(borderBox)

  const bodyBox = blessed.box({
    height: 1,
    width: body.length,
    left: 3,
    style: {
      fg: isHeader ? theme['4'] : theme['4_faded'],
    },
    content: body,
  })
  wrapperBox.append(bodyBox)

  const headerContent = R.split(' ', header)
  const headerBox = blessed.box({
    left: body.length + 6,
    width: header.length,
  })
  const headerBoxItemParams = {
    height: 1,
    width: 1,
  }
  R.addIndex(R.forEach)((x, i) => {
    const _headerBoxItemParams = {
      left: i * 2,
      style: {
        fg: selectedIndex === i ? theme['4'] : theme['2']
      },
      content: x,
    }
    const headerBoxItem = blessed.box(R.mergeDeepRight(headerBoxItemParams, _headerBoxItemParams))
    headerBox.append(headerBoxItem)
  })(headerContent)
  wrapperBox.append(headerBox)

  return wrapperBox
}

const updateRow = (row, body, header, selectedIndex) => {
  const bodyBox = row.children[1]
  bodyBox.content = body

  const headerBoxItems = row.children[2].children
  const headerContent = R.split(' ', header)
  R.addIndex(R.forEach)((x, i) => {
    headerBoxItems[i].style.fg = selectedIndex === i ? theme['4'] : theme['2']
    headerBoxItems[i].content = x
  })(headerContent)
}

const updateBorderMid = (box, bodySize, selectedIndex) => {
  const highlightIndex = ( selectedIndex * 2 ) + bodySize + 6
  R.addIndex(R.forEach)((x, i) => {
    x.style.fg = highlightIndex === i
                 ? theme['4']
                 : highlightIndex - 1 === i || highlightIndex + 1 === i
                   ? theme['2']
                   : theme['1']
  })(box.children)
}

// --------------------------------------
// init
// --------------------------------------

const init = ({ parent, selectedFunctionIndex, functionCount, header, body, bodySize, rowHeadSize }) => {
  const view = blessed.box()

  view.append(buildBorderTop({ top: 0 }, bodySize, rowHeadSize))
  const _header = buildRow({ top: 1 }, header[0], header[1], selectedFunctionIndex, true)
  view.append(_header)
  const _borderBoxMid = buildBorderMid({ top: 2 }, bodySize, rowHeadSize, selectedFunctionIndex)
  view.append(_borderBoxMid)
  const rows = R.addIndex(R.map)(([x, y], i) => buildRow({ top: 3 + i }, x, y, selectedFunctionIndex), body)
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
  state.header = _header
  state.borderBoxMid = _borderBoxMid
  state.rows = rows

  return wrapperView
}

module.exports.init = init

// --------------------------------------
// update
// --------------------------------------

const update = view => ({ selectedFunctionIndex, functionCount, header, body, bodySize, rowHeadSize }) => {
  updateRow(state.header, header[0], header[1], selectedFunctionIndex, true)
  updateBorderMid(state.borderBoxMid, bodySize, selectedFunctionIndex)
  R.addIndex(R.forEach)(([x, y], i) => updateRow(state.rows[i], x, y, selectedFunctionIndex), body)
}

module.exports.update = update
