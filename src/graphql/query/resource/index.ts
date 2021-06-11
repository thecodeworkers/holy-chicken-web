import { GraphQlClient, normalized, normalizedArray } from '@utils'
import generalQuery from './generalPage'
import outstanding from './outstanding'
const resource = async () => {

  const query = `
    query Resources {
      ${generalQuery}
      ${outstanding}
    }
  `

  const data: any = await GraphQlClient(query)

  const resources = {
    general: normalized(data?.generalPage),
    outstanding: normalizedArray(data?.products.nodes)
  }
  return resources
}

export default resource
