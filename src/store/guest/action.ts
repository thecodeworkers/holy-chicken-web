import { getTmpSessionToken } from '@graphql';
import { actionObject } from '@utils';
import { GET_TMP_SESSION, RESET_GUEST_STORE, SET_TMP_BUY } from './action-types';

export const getTmpSession = () => async (dispatch) => {
  const response = await getTmpSessionToken();
  const tmpSessionToken = response?.sessionToken || ''

  return dispatch(actionObject(GET_TMP_SESSION, { tmpSessionToken }))
}

export const setTmpBuy = (tmpOrders) => actionObject(SET_TMP_BUY, { tmpOrders })

export const resetGuestStore = () => actionObject(RESET_GUEST_STORE)
