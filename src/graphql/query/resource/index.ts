import { GraphQlClient, normalized, normalizedArray } from '@utils'
import generalQuery from './generalPage'

const resource = async () => {

  const query = `
    query Resources {
      ${generalQuery}
    }
  `

  const data: any = await GraphQlClient(query)

  const resources = {
    general: normalizedArray(data?.generalPage)
  }
  console.log(resources);

  return resources
}

export default resource
