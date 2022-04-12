import { combineReducers } from 'redux'
import loader from './loader/reducer'
import page from './page/reducer'
import resource from './resource/reducer'
import intermitence from './intermitence/reducer'
import auth from './auth/reducer'
import toast from './toast/reducer'
import contact from './contact/reducer'
import cart from './cart/reducer'
import product from './product/reducer'
import paymentStep from './paymentStep/reducer'
import scrollReference from './scrollReference/reducer'
import variableProduct from './variableProduct/reducer'
import guest from './guest/reducer'
import tenderProduct from './tenderProduct/reducer'
import backupProduct from './backupProducts/reducer'

const reducers = combineReducers({
  loader,
  page,
  resource,
  intermitence,
  auth,
  toast,
  contact,
  cart,
  product,
  paymentStep,
  scrollReference,
  variableProduct,
  guest,
  tenderProduct,
  backupProduct,
})

export default reducers
