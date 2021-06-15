import { GraphQlClient, normalized, normalizedArray } from '@utils'
import generalQuery from './generalPage'
import outstanding from './outstanding'
import productsQuery from './products'
import productsCategoriesQuery from './productsCategories'
const resource = async () => {

  const query = `
    query Resources {
      ${generalQuery}
      ${outstanding}
      ${productsQuery()}
      ${productsCategoriesQuery}
    }
  `

  const data: any = await GraphQlClient(query)

  const resources = {
    general: normalized(data?.generalPage),
    outstanding: normalizedArray(data?.outstanding.nodes),
    products: normalizedArray(data?.products.nodes),
    productsCategories: normalizedArray(data?.products.nodes),
  }
  return resources
}

export default resource
