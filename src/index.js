const blessed = require('blessed')
// const R = require('ramda')

const { configureStore } = require('./common/redux/store.js')
const Common = require('./common/components')
const { Component: Functions } = require('./modules/Functions')
const { Component: TruthTable } = require('./modules/TruthTable')
const { Component: Message } = require('./modules/Message')
// const Help = require('./modules/Help')
// const Message = require('./modules/Message')

// --------------------------------------
// screen
// --------------------------------------

const screen = blessed.screen(Common.screen())
screen.title = 'BOOLEAN LOGIC'
const heading = blessed.box(Common.heading({ content: ' BOOLEAN LOGIC' }))
screen.append(heading)

// --------------------------------------
// view layout
// --------------------------------------

// const renderHelp = () => {
//   const { view } = Help({})
//   const wrapperView = blessed.box({
//     height: 3,
//     width: '100%',
//     tags: true,
//     bottom: 0,
//     left: 'center',
//   })
//   wrapperView.append(view)
//   return { view: wrapperView }
// }
//
// const renderMessage = (data) => {
//   const { view } = Message(data)
//   const wrapperView = blessed.box({
//     height: 3,
//     width: '100%',
//     tags: true,
//     bottom: 0,
//     left: 'center',
//   })
//   wrapperView.append(view)
//   return { view: wrapperView }
// }

// const { view: functionsView, form: functionsForm } = Functions(store, screen)
// const { view: truthTableView } = TruthTable(store, screen)

const store = configureStore()

Functions(store)(screen)
TruthTable(store)(screen)
Message(store)(screen)

// const { view: helpView } = renderHelp()
// let messageView = null
// let hasMessageView = false
//
// // screen.append(functionsView)
// // screen.append(truthTableView)
// screen.append(helpView)

// --------------------------------------
// state changes
// --------------------------------------

// functionsForm.on('submit', (data, ...args) => {
//   if (hasMessageView) {
//     screen.remove(messageView)
//   }
//
//   try {
//     const { view: truthTableView } = renderTruthTable(R.values(data))
//     screen.append(truthTableView)
//   } catch (e) {
//     const message = e.message
//     if (message) {
//       const { view } = renderMessage({ type: 'error', message })
//       messageView = view
//       screen.append(messageView)
//       hasMessageView = true
//     }
//   }
//
//   screen.render()
// })

// --------------------------------------
// ...
// --------------------------------------

// quit on Escape, q, or Control-C
screen.key(['escape', 'q', 'C-c'], (ch, key) => process.exit(0))

screen.render()
