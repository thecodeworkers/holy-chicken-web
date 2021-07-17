import { GraphQlClient } from '@utils'
import cart from '../../mutation/cart'

const getCartQuery = async (sessionToken) => {
  const query = `
  query getCardQuery {
      ${cart()}
  }
`
  const result = await GraphQlClient(query, {}, null, sessionToken)
  return result
}

export default getCartQuery



