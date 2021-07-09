import { GraphQlClient } from  '@utils'
import { v4 as uuidv4 } from 'uuid';
import cart from '../cart'

const applyCouponMutation = async (code, sessionToken) => {
  const mutation = `
  mutation cuponMutation {
    applyCoupon(input: {code: "${code}", clientMutationId: "${uuidv4()}"}) {
      ${cart()}
    }
  }
`
  const result = await GraphQlClient(mutation, {}, null, sessionToken)
  return result
}

export default applyCouponMutation






