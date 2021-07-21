import produce from 'immer'
const initialState = {
  // logIn
  loginLoading: false,
  loginDone: false,
  loginError: false,
  //logOut
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  //signUp
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  //nickName
  changeNickNameLoading: false,
  changeNickNameDone: false,
  changeNickNameError: null,
  signUpData: {},
  loginData: {},
  me: null,
}

//액션 변수
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE'

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST'
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS'
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE'

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME'

//액션 크리에이터

const dummyUser = data => ({
  ...data,
  nickname: 'devicii',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [
    { nickname: '부기초' },
    { nickname: 'Chanho Lee' },
    { nickname: 'neue zeal' },
  ],
  Followers: [
    { nickname: '부기초' },
    { nickname: 'Chanho Lee' },
    { nickname: 'neue zeal' },
  ],
})
export const loginRequestAction = data => {
  return {
    type: LOG_IN_REQUEST,
    data,
  }
}

export const logOutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  }
}

export const changeNicknameAction = data => {
  return {
    type: CHANGE_NICKNAME_REQUEST,
    data,
  }
}
const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.loginLoading = true
        draft.loginError = null
        draft.loginDone = false
        break
      case LOG_IN_SUCCESS:
        draft.loginLoading = false
        draft.loginDone = false
        draft.me = dummyUser(action.data)
        break
      case LOG_IN_FAILURE:
        draft.loginDone = false
        draft.loginDone = false
        draft.loginError = action.error
        draft.me = action.data
        break
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true
        draft.logOutDone = false
        draft.logOutError = null
        break
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false
        draft.logOutDone = true
        draft.me = null
        break
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false
        draft.logOutError = action.error
        break
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true
        draft.signUpDone = false
        draft.signUpError = null
        break
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false
        draft.signUpDone = true
        break
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false
        draft.signUpError = action.error
        break
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNickNameLoading = true
        draft.changeNickNameDone = false
        draft.changeNickNameError = null
        break
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNickNameLoading = false
        draft.changeNickNameDone = true
        break
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNickNameLoading = false
        draft.changeNickNameError = action.error
        break
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data })
        break
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter(v => v.id !== action.data)
      default:
        break
    }
  })
}

export default reducer
