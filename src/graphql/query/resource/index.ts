import { GraphQlClient, normalized, normalizedArray } from '@utils'
import attributes from './attributes'
import attributesQuery from './attributes'
import generalQuery from './generalPage'
import paymentMethods from './paymentMethods'
import productsQuery from './products'
import productsCategoriesQuery from './productsCategories'
const resource = async () => {

  const query = `
    query Resources {
      ${generalQuery}
      ${productsQuery()}
      ${productsCategoriesQuery}
      ${attributesQuery}
      ${paymentMethods}
    }
  `

  const data: any = await GraphQlClient(query)

  const resources = {
    general: normalized(data?.generalPage),
    products: normalizedArray(data?.products.nodes),
    productsCategories: normalizedArray(data?.productCategories.nodes),
    attributes: normalizedArray(data?.attributes.nodes),
    paymentMethods: normalizedArray(data?.paymentGateways.nodes)
  }
  return resources
}

export default resource
