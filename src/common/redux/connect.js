const R = require('ramda')

// --------------------------------------
// connect
// --------------------------------------

const connect = store => (mapStateToProps, mapDispatchToProps) => ({ init, update }) => parent => {
  const { getState, dispatch } = store
  let state = getState()
  const props = R.mergeRight(
    { parent },
    R.mergeDeepRight(
      mapStateToProps(state),
      mapDispatchToProps(dispatch),
    ),
  )

  let currentView = init(props)

  const handleStateChange = () => {
    const newState = getState()
    // TODO: add diff check here for conditional update/rerender
    // if (state deep equals newState) ...
    const props = R.mergeRight(
      { parent },
      R.mergeDeepRight(
        mapStateToProps(newState),
        mapDispatchToProps(dispatch),
      ),
    )
    update(currentView)(props)
    parent.render()
  }

  parent.append(currentView)

  const unsubscribe = store.subscribe(handleStateChange)
  return unsubscribe
}

module.exports = connect
