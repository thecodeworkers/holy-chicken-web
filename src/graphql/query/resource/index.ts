import { GraphQlClient, normalized, normalizedArray } from '@utils'
import attributesQuery from './attributes'
import countries from './countries'
import generalQuery from './generalPage'
import paymentMethods from './paymentMethods'
import productsQuery from './products'
import productsCategoriesQuery from './productsCategories'

const resource = (page) => {
  const query = `
      ${generalQuery}
      ${paymentMethods}
      ${countries}
      ${(page === 'storePage' || page === 'homePage' || page === '') ? `
      ${productsQuery()}
      ${productsCategoriesQuery}
      ` : ''}
  `

  return query
}

export default resource
