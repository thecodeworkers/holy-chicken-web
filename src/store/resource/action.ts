import { SET_RESOURCES, } from './action-types'
import { actionObject } from '../../utils'
import { pages, resources } from '../../graphql/query'
import { GET_PAGES } from '@store/page/action-types'


export const getResources: any = (consult: string) => async (dispatch, getState) => {
  const { page } = getState()
  let data = page

  const homePage = await pages(consult)
  data[consult] = homePage
  const resource = await resources()

  dispatch(actionObject(GET_PAGES, data))
  dispatch(actionObject(SET_RESOURCES, resource))
}
