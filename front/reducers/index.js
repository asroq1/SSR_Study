import { HYDRATE } from 'next-redux-wrapper'
import user from './user'
import post from './post'
import { combineReducers } from 'redux'

// 리듀서는 이전상태, 액션으로 새로운 상태로 만드는 것이다.

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action)
      return action.payload
    default: {
      const combineReducer = combineReducers({
        user,
        post,
      })
      return combineReducer(state, action)
    }
  }
}
export default rootReducer
