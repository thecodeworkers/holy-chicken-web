import { GraphQlClient, normalized, normalizedArray } from '@utils'
import generalQuery from './generalPage'
import productsQuery from './products'
import productsCategoriesQuery from './productsCategories'
const resource = async () => {

  const query = `
    query Resources {
      ${generalQuery}
      ${productsQuery()}
      ${productsCategoriesQuery}
    }
  `

  const data: any = await GraphQlClient(query)

  const resources = {
    general: normalized(data?.generalPage),
    products: normalizedArray(data?.products.nodes),
    productsCategories: normalizedArray(data?.productCategories.nodes)
  }
  return resources
}

export default resource
