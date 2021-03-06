const blessed = require('blessed')

const Common = require('./common/components')
const Demo = require('./modules/Demo')

// --------------------------------------
// screen
// --------------------------------------

const screen = blessed.screen(Common.screen())
screen.title = 'BlessedJS Playground'
const heading = blessed.box(Common.heading({ content: ' Blessed Playground' }))
screen.append(heading)

// --------------------------------------
// view layout
// --------------------------------------

// demo

const renderDemo = () => {
  const { view, table } = Demo()
  const wrapperView = blessed.box({
    width: '90%',
    height: '80%',
    tags: true,
    top: 4,
    left: 'center',
  })
  wrapperView.append(view)
  return { view: wrapperView, table }
}

const { view: demoView } = renderDemo()
screen.append(demoView)

// --------------------------------------
// events
// --------------------------------------

// ...

// --------------------------------------
// ...
// --------------------------------------

// quit on Escape, q, or Control-C
screen.key(['escape', 'q', 'C-c'], (ch, key) => process.exit(0))

screen.render()
