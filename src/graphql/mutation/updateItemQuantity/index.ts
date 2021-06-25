import { GraphQlClient } from '@utils'
import cart from '../cart'
import { v4 as uuidv4 } from 'uuid';

const updateItemQuantity = async (key, quantity, sessionToken) => {
  const mutation = `
  mutation updateItemQuantity {
    updateItemQuantities(input: { items: {key: "${key}", quantity: ${quantity}}, clientMutationId: "${uuidv4()}"}) {
      ${cart()}
    }
  }
`
  const result = await GraphQlClient(mutation, {}, null, sessionToken)
  return result
}

export default updateItemQuantity



