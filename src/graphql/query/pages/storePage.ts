import { storeId } from '@utils/pageIds'

const store = `
storePage:page(id: "${storeId}") {
  store {
    title
    subtitle
  }
}

`

export default store
