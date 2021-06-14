import { GraphQlClient, normalized, normalizedArray } from '@utils'
import generalQuery from './generalPage'
import outstanding from './outstanding'
import productsQuery from './products'
const resource = async () => {

  const query = `
    query Resources {
      ${generalQuery}
      ${outstanding}
      ${productsQuery}
    }
  `

  const data: any = await GraphQlClient(query)

  const resources = {
    general: normalized(data?.generalPage),
    outstanding: normalizedArray(data?.products.nodes),
    products: normalized(data?.products),
  }
  return resources
}

export default resource
