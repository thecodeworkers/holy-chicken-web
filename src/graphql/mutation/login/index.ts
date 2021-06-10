import { GraphQlClient } from  '@utils'
import { v4 as uuidv4 } from 'uuid';

const loginMutation = async ({ email, password }) => {
  const mutation = `
  mutation Login {
    login(input: {username: "${email}", password: "${password}"}) {
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
  const result = await GraphQlClient(mutation)
  return result
}

export default loginMutation






