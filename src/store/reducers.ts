import { combineReducers } from 'redux'
import loader from './loader/reducer'
import page from './page/reducer'


const reducers = combineReducers({
  loader,
  page
})

export default reducers
