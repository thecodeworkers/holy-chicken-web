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

  // mutation RegisterUser {
  //   registerUser(
  //     input: {
  //         clientMutationId: "${uuidv4()}",
  //         username: "${email}",
  //         password: "${password}",
  //         email: "${email}",
  //         firstName: "${firstName}",
  //         lastName: "${firstName}",
  //     }) {
  //     user {
  //       jwtAuthToken
  //       jwtRefreshToken,
  //       email
  //     }
  //   }
  // }


  // mutation RegisterUser {
  //   registerCustomer(input: {password: "${password}", firstName: "${firstName}", lastName: "${lastName}", email: "${email}", username: "${email}", billing: {phone: "${phone}"}}) {
  //     authToken
  //     clientMutationId
  //     refreshToken
  //   }
  // }
