import { BACKUP_PRODUCTS } from './action-types'
import { actionObject } from '@utils'

export const setBackupProducts = (data: any) => async (dispatch) => {
  await dispatch(actionObject(BACKUP_PRODUCTS, { backup: data }))
}
