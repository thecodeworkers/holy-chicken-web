import { LOADER } from './actions-types'

export const setLoader = (show: boolean) => {

  return {
    type: LOADER,
    payload: show
  }
}
