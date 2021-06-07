import { GraphQlClient } from  '@utils'
import { v4 as uuidv4 } from 'uuid';

const registerMutation = async ({ firstName, lastName, email, password }) => {

  const mutation = `
  mutation RegisterUser {
    registerUser(
      input: {
          clientMutationId: "${uuidv4()}",
          username: "${email}",
          password: "${password}",
          email: "${email}",
          firstName: "${firstName}",
          lastName: "${firstName}",
      }) {
      user {
        jwtAuthToken
        jwtRefreshToken,
        email
      }
    }
  }
`
  const result = await GraphQlClient(mutation)
  return result
}

export default registerMutation
