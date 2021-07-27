import { GraphQlClient, normalized, normalizedArray } from '@utils'
import attributesQuery from './attributes'
import countries from './countries'
import generalQuery from './generalPage'
import paymentMethods from './paymentMethods'
import productsQuery from './products'
import productsCategoriesQuery from './productsCategories'
const resource = async (page) => {

  const query = `
    query Resources {
      ${generalQuery}
      ${paymentMethods}
      ${countries}
      ${(page === 'storePage' || page === 'homePage') ? `
      ${attributesQuery}
      ${productsQuery()}
      ${productsCategoriesQuery}
      ` : ''}
    }
  `

  const data: any = await GraphQlClient(query)

  return {
    general: normalized(data?.generalPage),
    products: normalizedArray(data?.products?.nodes),
    productsCategories: normalizedArray(data?.productCategories?.nodes),
    attributes: normalizedArray(data?.attributes?.nodes),
    paymentMethods: normalizedArray(data?.paymentGateways?.nodes),
    countries: normalizedArray(data?.countries?.nodes)
  }
}

export default resource
