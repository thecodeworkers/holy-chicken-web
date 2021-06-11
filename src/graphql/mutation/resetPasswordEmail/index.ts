import { GraphQlClient } from  '@utils'
import { v4 as uuidv4 } from 'uuid';

const restorePasswordEmailMutation = async ({ email }) => {
  const mutation = `
    mutation sendResetPassworMutation {
      sendPasswordResetEmail(input: {username: "${email}"}) {
        user {
          locale
        }
      }
    }
  `
  const result = await GraphQlClient(mutation)
  return result
}

export default restorePasswordEmailMutation
