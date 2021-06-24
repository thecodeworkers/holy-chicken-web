import { GraphQlClient } from '@utils'
import cart from '../cart'
import { v4 as uuidv4 } from 'uuid';

const addItemToCartMutation = async ({ product, quantity, sessionToken }) => {
  const mutation = `
  mutation addCartItem {
    addCartItems(input: { items: {productId: ${product}, quantity: ${quantity}}, clientMutationId: "${uuidv4()}"}) {
      ${cart()}
    }
  }
`
  const result = await GraphQlClient(mutation, {}, null, sessionToken)
  return result
}

export default addItemToCartMutation






