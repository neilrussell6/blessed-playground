const blessed = require('blessed')
const R = require('ramda')

const { theme } = require('../../common/color-themes')

// --------------------------------------
// init
// --------------------------------------

const init = ({ parent, functions, onSubmit, onFocus }) => {
  const view = blessed.box({
    left: 1,
  })
  const fNames = ['f', 'g', 'h', 'j', 'k', 'l']

  let selectedIndex = 0

  const form = blessed.form({
    name: 'form',
    top: 0,
    left: 6,
    width: '100%-6',
    height: '100%',
    focus: {
      fg: theme[3],
    },
  })

  let elements = R.addIndex(R.map)((f, i) => {
    const wrapper = blessed.box({
      top: i,
    })
    const nameBox = blessed.box({
      style: {
        fg: i === selectedIndex ? theme['4'] : theme['3_faded'],
      },
      content: fNames[i],
    })
    const divBox = blessed.box({
      left: 3,
      style: {
        fg: i === selectedIndex ? theme['3_faded'] : theme['1'],
      },
      content: '\u2502',
    })

    wrapper.append(nameBox)
    wrapper.append(divBox)
    return wrapper
  })(functions)

  R.addIndex(R.forEach)((f, i) => {
    const inputBox = blessed.textbox({
      name: `input_${fNames[i]}`,
      input: true,
      keys: true,
      height: 1,
      top: 1 * i,
      width: '100%-6',
      style: {
        fg: theme['2'],
        focus: {
          fg: theme['4'],
        }
      },
      value: f.toString(),
    })

    form.append(inputBox)

    inputBox.on('submit', (data) => {
      onSubmit(i, data)
    })
  })(functions)

  R.forEach(x => view.append(x), elements)
  view.append(form)

  form.children[selectedIndex].focus()

  parent.key(['down'], (ch, key) => {
    if (selectedIndex < functions.length - 1) {
      selectedIndex++
      form.children[selectedIndex].focus()
      R.addIndex(R.forEach)((x, i) => {
        x.children[0].style.fg = i === selectedIndex ? theme['4'] : theme['3_faded']
        x.children[1].style.fg = i === selectedIndex ? theme['3_faded'] : theme['1']
      }, elements)
    }
    onFocus(selectedIndex)
    parent.render()
  })

  parent.key(['up'], (ch, key) => {
    if (selectedIndex > 0) {
      selectedIndex--
      form.children[selectedIndex].focus()
      R.addIndex(R.forEach)((x, i) => {
        x.children[0].style.fg = i === selectedIndex ? theme['4'] : theme['3_faded']
        x.children[1].style.fg = i === selectedIndex ? theme['3_faded'] : theme['1']
      }, elements)
    }
    onFocus(selectedIndex)
    parent.render()
  })

  form.children[selectedIndex].focus()

  const wrapperView = blessed.box({
    width: '90%',
    height: functions.length,
    tags: true,
    top: 4,
    left: 'center',
  })
  wrapperView.append(view)

  return wrapperView
}

module.exports.init = init

// --------------------------------------
// update
// --------------------------------------

const update = view => ({ parent, functions, onSubmit }) => {
  // ...
}

module.exports.update = update
