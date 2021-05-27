import { combineReducers } from 'redux'
import loader from './loader/reducer'
import page from './page/reducer'
import resource from './resource/reducer'

const reducers = combineReducers({
  loader,
  page,
  resource
})

export default reducers
