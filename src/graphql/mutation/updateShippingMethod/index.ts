import { GraphQlClient } from '@utils'
import cart from '../cart'
import { v4 as uuidv4 } from 'uuid';

const updateShippingMethodMutation = async (method, sessionToken) => {
  const mutation = `
  mutation updateShippingMethod {
    updateShippingMethod(input: {
      shippingMethods: "${method}",
      clientMutationId: "${uuidv4()}"
    }) {
      ${cart()}
    }
  }
`
  const result = await GraphQlClient(mutation, {}, null, sessionToken)
  return result?.updateShippingMethod || result || {}
}

export default updateShippingMethodMutation
