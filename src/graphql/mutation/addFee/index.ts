import { GraphQlClient } from '@utils'
import { v4 as uuidv4 } from 'uuid';
import cart from '../cart'

const addFeeMutation = async (fee, amount, sessionToken) => {
  const mutation = `
  mutation feeMutation {
    addFee(input: {name: "${fee}", amount: ${amount}, clientMutationId: "${uuidv4()}"}) {
      ${cart()}
    }
  }
`
  const result = await GraphQlClient(mutation, {}, null, sessionToken)
  return result
}

export default addFeeMutation






