import { GraphQlClient, normalized, normalizedArray } from '@utils'
import homePageQuery from './homePage'
import aboutPageQuery from './aboutPage'
import store from './storePage'
import resourceQuery from '../resource'

const pages = async (resource: any) => {

  const resources = {
    'homePage': homePageQuery,
    'aboutPage': aboutPageQuery,
    'storePage': store
  }

  const query = `
    query Page {
      ${(resources[resource]) ? resources[resource] : ''}
      ${resourceQuery(resource)}
    }
  `

  const data: any = await GraphQlClient(query)

  return {
    page: (data && data[resource]) ? 'nodes' in data[resource] ? normalized(data[resource].nodes) : normalized(data[resource]) : {},
    general: normalized(data?.generalPage),
    products: normalizedArray(data?.products?.nodes),
    productsCategories: normalizedArray(data?.productCategories?.nodes),
    paymentMethods: normalizedArray(data?.paymentGateways?.nodes),
    countries: normalizedArray(data?.countries?.nodes)
  }

}

export default pages
