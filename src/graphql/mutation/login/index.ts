import { GraphQlClient } from  '@utils'
import { v4 as uuidv4 } from 'uuid';

const loginMutation = async ({ email, password, sessionToken }) => {
  const mutation = `
  mutation Login {
    login(input: {clientMutationId: "${uuidv4()}", username: "${email}", password: "${password}"}) {
      authToken
      sessionToken
      customer {
        sessionToken
        jwtAuthToken
      }
      user {
        email
        firstName
        lastName
      }
      customer {
        billing {
          phone
        }
      }
    }
  }
`
  const result = await GraphQlClient(mutation, sessionToken)
  return result
}

export default loginMutation






