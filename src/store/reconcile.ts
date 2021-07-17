const reconcile = (state, payload) => {
  const keyNames = Object.keys(state);
  let trueState = {}

  keyNames.forEach(key => {
    switch (key) {
      case 'page':
        let currentPages = state[key]
        const rewritePages = {}

        for (let currentPage in currentPages) {
          const prevPage = currentPages[currentPage]
          const existPrevPage = Object.keys(prevPage).length

          if (existPrevPage) {
            rewritePages[currentPage] = prevPage

            trueState = {
              ...trueState,
              page: {
                ...currentPages,
                ...payload[key],
                ...rewritePages
              }
            }
          }
        }

        break

      case 'guest':
        const guest = state[key]
        trueState = { ...trueState, guest }
        break

      case 'auth':
        const credentials = state[key]
        trueState = { ...trueState, auth: credentials }
        break

      case 'paymentStep':
        const paymentStep = state[key]
        trueState = { ...trueState, paymentStep }
        break

      case 'cart':
        const cart = state[key]
        trueState = { ...trueState, cart }
        break

      case 'intermitence':
        const intermitence = state[key]
        trueState = { ...trueState, intermitence }
        break

      default:
        break
    }
  });

  return trueState
}

export default reconcile
