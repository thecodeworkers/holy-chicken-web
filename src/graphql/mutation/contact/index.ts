import { GraphQlClient } from  '@utils'
import { v4 as uuidv4 } from 'uuid';

const contactMutation = async ({ name, lastname, email, message, phone, type, file }) => {


  console.log(name, lastname, email, phone, message, type, file)
  const mutation = `
  mutation Contact {
    submitForm(input: {formId: 2, data: [{id: 6, value: "${email}"}, {id: 5, value: "${name}"}, {id: 7, value: "${message}"}, {id: 18, value: "${phone}"}, {id: 17, value: "${lastname}"}, {id: 19, value: "${type}"}]}) {
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






