import { SET_RESOURCES, } from './action-types'
import { actionObject, orderBy } from '../../utils'
import { pages, resources } from '../../graphql/query'
import { GET_PAGES } from '@store/page/action-types'
import { SEARCH_PRODUCTS } from './action-types'


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

  dispatch(actionObject(SET_RESOURCES, { ...resource, productsCopy: resource?.products}))
}

export const searchProducts: any = (data) => actionObject(SEARCH_PRODUCTS, data)

