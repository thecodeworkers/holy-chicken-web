import { GraphQlClient } from '@utils'
import cart from '../cart'
import { v4 as uuidv4 } from 'uuid';

const addItemToCartMutation = async (key, sessionToken) => {
  const mutation = `
  mutation removeCartItem {
    removeItemsFromCart(input: {keys: "${key}", clientMutationId: "${uuidv4()}"}) {
      ${cart()}
    }
  }
`
  const result = await GraphQlClient(mutation, {}, null, sessionToken)
  return result
}

export default addItemToCartMutation






