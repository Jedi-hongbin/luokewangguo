import { createStore, combineReducers } from 'redux'

function battleResult (state = '来啊', action) {
  if (action.type === 'false') {
    console.log('败北')
    return '废物'
  }
  if (action.type === 'true') {
    console.log('完胜')
    return '有点东西'
  }
  return state
}
function addSpirit (state = '', action) {
  if (action.type === 'ADD_SPIRIT') {
    state = action.spiritName
    return state
  }
  return state
}
function snackbar (state = false, action) {
  if (action.type === 'show') {
    state = true
    return state
  }
  if (action.type === 'hidden') {
    state = false
    return state
  }
  return state
}

const reducer = combineReducers({ battleResult, addSpirit, snackbar })

const store = createStore(reducer)
export default store
