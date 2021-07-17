import { GraphQlClient } from  '@utils'
import { v4 as uuidv4 } from 'uuid';

const loginMutation = async ({ email, password, sessionToken }) => {
  const mutation = `
  mutation Login {
    login(input: {clientMutationId: "${uuidv4()}", username: "${email}", password: "${password}"}) {
      authToken
      sessionToken
      customer {
        databaseId
        sessionToken
        jwtAuthToken
        billing {
          address1
          address2
          city
          country
          email
          firstName
          lastName
          phone
          postcode
          state
        }
        shipping {
          state
          postcode
          phone
          lastName
          firstName
          email
          country
          company
          city
          address2
          address1
        }
      }
      user {
        email
        firstName
        lastName
      }
    }
  }
`
  const result = await GraphQlClient(mutation, sessionToken)
  return result
}

export default loginMutation






