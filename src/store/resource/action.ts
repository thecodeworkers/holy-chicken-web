import { SET_RESOURCES, } from './action-types'
import { actionObject } from '../../utils'
import { pages, resources } from '../../graphql/query'
import { GET_PAGES } from '@store/page/action-types'


export const getResources: any = () => async (dispatch, getState) => {
  const { page } = getState()
  let data = page

  const homePage = await pages('homePage')
  data['homePage'] = homePage

  const aboutPage = await pages('homePage')
  data['aboutPage'] = aboutPage

  const resource = await resources()

  dispatch(actionObject(GET_PAGES, data))
  dispatch(actionObject(SET_RESOURCES, resource))
}
