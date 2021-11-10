import { SET_RESOURCES, } from './action-types'
import { actionObject, orderBy, productFilter, WooCommerceClient, formatWooCommerceAmount } from '../../utils'
import { pages, resources } from '../../graphql/query'
import { GET_PAGES } from '@store/page/action-types'
import { SEARCH_PRODUCTS, SET_FILTER, CLEAN_FILTER } from './action-types'
import { getCart } from '@store/cart/action'
import { setBackupProducts } from '@store/backupProducts/action'

export const getResources: any = (consult: string = '') => async (dispatch, getState) => {
  const { page } = getState()
  let data = page

  if (consult) {
    const homePage = await pages(consult)
    data[consult] = homePage
    dispatch(actionObject(GET_PAGES, data))
  }

  const resource = await resources(consult)
  const allCountries = await WooCommerceClient('data/countries')
  resource['outstanding'] = orderBy(resource.products, 'totalSales', 'asc').slice(0, 3)
  resource['shop'] = resource.products
  resource['allCountries'] = allCountries
  dispatch(getCart())
  dispatch(actionObject(SET_RESOURCES, { ...resource, productsCopy: resource?.products }))

  if (resource?.products.length) dispatch(setBackupProducts(orderBy(resource?.products, 'order', 'asc', 'spicy')))
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

  let data = shop.map((value, index) => {
    let totalP = value?.price?.includes('-') ? formatWooCommerceAmount(value?.price?.split('-')[0]) : formatWooCommerceAmount(value?.price)
    value.orderPrice = totalP
    return value
  })

  switch (value) {
    case 'outstanding':
      data = orderBy(data, 'totalSales', 'asc')
      break;
    case 'lowestCost':
      data = orderBy(data, 'orderPrice', 'asc')
      break;
    case 'highestCost':
      data = orderBy(data, 'orderPrice', 'desc')
      break;
  }

  dispatch(actionObject(SET_FILTER, { filter: filter, shop: data }))
}


export const cleanFilter: any = (value) => async (dispatch, getState) => {
  dispatch(actionObject(CLEAN_FILTER, {}))
}
