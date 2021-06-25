import { SET_RESOURCES, } from './action-types'
import { actionObject, formatWooCommerceAmount, orderBy, productFilter } from '../../utils'
import { pages, resources } from '../../graphql/query'
import { GET_PAGES } from '@store/page/action-types'
import { SEARCH_PRODUCTS, SET_FILTER } from './action-types'


export const getResources: any = (consult: string = '') => async (dispatch, getState) => {

  const { page } = getState()
  let data = page

  if (consult) {
    const homePage = await pages(consult)
    data[consult] = homePage
    dispatch(actionObject(GET_PAGES, data))
  }

  const resource = await resources()
  resource['outstanding'] = orderBy(resource.products, 'totalSales', 'asc').slice(0, 3)
  resource['shop'] = resource.products

  dispatch(actionObject(SET_RESOURCES, { ...resource, productsCopy: resource?.products }))
}

export const searchProducts: any = (data) => actionObject(SEARCH_PRODUCTS, data)

export const setProductFilter: any = (values) => async (dispatch, getState) => {
  try {

    const { resource: { products } } = getState()
    dispatch(actionObject(SET_FILTER, { filter: values, shop: productFilter(products, values, 'slug') }))

  } catch (error) {
    return error

  }
}

export const orderProducts: any = (value) => async (dispatch, getState) => {

  const { resource: { shop, filter } } = getState()

  let data = shop

  switch (value) {
    case 'outstanding':
      data = orderBy(data, 'totalSales', 'asc')
      break;
    case 'lowestCost':
      data = orderBy(data, 'price', 'asc')
      break;
    case 'highestCost':
      data = orderBy(data, 'price', 'desc')
      break;
  }

  dispatch(actionObject(SET_FILTER, { filter: filter, shop: data }))

}
