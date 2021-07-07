import { combineReducers } from 'redux'
import loader from './loader/reducer'
import page from './page/reducer'
import resource from './resource/reducer'
import intermitence from './intermitence/reducer'
import auth from './auth/reducer'
import toast from './toast/reducer'
import cart from './cart/reducer'
import product from './product/reducer'

const reducers = combineReducers({
  loader,
  page,
  resource,
  intermitence,
  auth,
  toast,
  cart,
  product
})

export default reducers
