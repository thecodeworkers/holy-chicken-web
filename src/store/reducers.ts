import { combineReducers } from 'redux'
import loader from './loader/reducer'
import page from './page/reducer'
import resource from './resource/reducer'
import intermitence from './intermitence/reducer'
import auth from './auth/reducer'
import toast from './toast/reducer'

const reducers = combineReducers({
  loader,
  page,
  resource,
  intermitence,
  auth,
  toast
})

export default reducers
