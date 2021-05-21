import { SET_RESOURCES, } from './action-types'
import { actionObject } from '../../utils'
import { pages } from '../../graphql/query'
import { GET_PAGES } from '@store/page/action-types'


export const getResources: any = () => async (dispatch, getState) => {
  const { resource } = getState()
  const generalPage = await pages('generalPage')
  console.log(resource);

  dispatch(actionObject(GET_PAGES, { ...resource, ...{ generalPage: generalPage } }))
  dispatch(actionObject(SET_RESOURCES))
}
