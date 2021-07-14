import { GraphQlClient } from  '@utils'

const resetUserPasswordMutation = async ({ key, email, password }) => {
  const mutation = `
    mutation RESET_USER_PASSWORD {
      resetUserPassword(input: {
        key: "${key}",
        login: "${email}",
        password: "${password}"
      }) {
        user {
          locale
        }
      }
    }
  `

  const result = await GraphQlClient(mutation)
  return result
}

export default resetUserPasswordMutation
