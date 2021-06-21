import { GraphQlClient } from  '@utils'
import { v4 as uuidv4 } from 'uuid';

const contactMutation = async ({ email, password }) => {
  const mutation = `
  mutation Contact {
    submitForm(input: {formId: 2, data: [{id: 6, value: "giberlara@gmail.com"}, {id: 5, value: "name"}, {id: 7, value: "message"}, {id: 18, value: "04242012127"}, {id: 17, value: "Lara"}, {id: 19, value: "proveedor"}]}) {
      message
      success
      clientMutationId
    }
  }
`
  const result = await GraphQlClient(mutation)
  return result
}

export default contactMutation






