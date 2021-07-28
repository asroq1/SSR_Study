import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects'
import axios from 'axios'
import {
  CHANGE_NICKNAME_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from '../reducers/user'

function loadMyInfoAPI() {
  return axios.get('/user')
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data)
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: error.response.data,
    })
  }
}

function loginAPI(data) {
  return axios.post('/user/login', data)
}

function* logIn(action) {
  try {
    const result = yield call(loginAPI, action.data)
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    //PUT은 Dispatch라고 생각하자
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
    })
  }
}

function logoutAPI() {
  return axios.post('/user/logout')
}

function* logOut() {
  try {
    call(logoutAPI)
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch (error) {
    //PUT은 Dispatch라고 생각하자
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    })
  }
}

function signUpAPI(data) {
  return axios.post('/user', data)
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data)
    console.log('Res', result.data)
    yield put({
      type: SIGN_UP_SUCCESS,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    })
  }
}

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`)
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data)
    console.log('FOLLOW', result.data)
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    //PUT은 Dispatch라고 생각하자
    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data,
    })
  }
}

function unFollowAPI(data) {
  return axios.delete(`/user/${data}/follow`)
}

function* unFollow(action) {
  try {
    const result = yield call(unFollowAPI, action.data)
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: UNFOLLOW_FAILURE,
      error: error.response.data,
    })
  }
}

function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', { nickname: data })
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data)
    console.log('nick Res', result.data)
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    //PUT은 Dispatch라고 생각하자
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: error.response.data,
    })
  }
}

function loadFollowersAPI(data) {
  return axios.get('/user/followers', data)
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data)
    console.log('팔로워', result.data)
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    //PUT은 Dispatch라고 생각하자
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: error.response.data,
    })
  }
}

function loadFollwingsAPI(data) {
  return axios.get('/user/followings', data)
}

function* loadFollwings(action) {
  try {
    const result = yield call(loadFollwingsAPI, action.data)
    console.log('팔로잉', result.data)
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    //PUT은 Dispatch라고 생각하자
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: error.response.data,
    })
  }
}

function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`)
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data)
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    //PUT은 Dispatch라고 생각하자
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: error.response.data,
    })
  }
}
function* watchRemoveFollowers() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower)
}
function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers)
}
function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollwings)
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn)
}
function* watchLoadUser() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo)
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow)
}
function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unFollow)
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname)
}

export default function* userSaga() {
  yield all([
    fork(watchRemoveFollowers),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchLogIn),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLoadUser),
    fork(watchChangeNickname),
  ])
}
