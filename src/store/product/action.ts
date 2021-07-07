import { actionObject } from '@utils';
import { SET_SELECTION } from './action-types';

export const setSelection = (payload) => actionObject(SET_SELECTION, payload)
