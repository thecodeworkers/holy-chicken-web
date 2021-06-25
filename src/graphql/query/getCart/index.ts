import { GraphQlClient } from '@utils'
import cart from '../../mutation/cart'

const getCartQuery = async (isAuth, sessionToken) => {
  const query = `
  query getCardQuery {
      ${isAuth ? cart() : ''}
  }
`
  const result = await GraphQlClient(query, {}, null, sessionToken)
  return result
}

export default getCartQuery



