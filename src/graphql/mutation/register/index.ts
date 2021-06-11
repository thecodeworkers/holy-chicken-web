import { GraphQlClient } from  '@utils'
import { v4 as uuidv4 } from 'uuid';

const registerMutation = async ({ firstName, lastName, email, password, phone }) => {
  const mutation = `
  mutation RegisterUser {
    registerCustomer(input:{password: "${password}", firstName: "${firstName}", lastName: "${lastName}", email: "${email}", username: "${email}", billing: {phone: "${phone}"}}) {
      authToken
      clientMutationId
      refreshToken
    }
  }
`
  const result = await GraphQlClient(mutation)
  return result
}

export default registerMutation

