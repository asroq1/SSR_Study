import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects'
import axios from 'axios'
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from '../reducers/user'

function loginAPI(data) {
  return axios.post('/user/login', data)
}

function* logIn(action) {
  try {
    const result = yield call(loginAPI, action.data)
    console.log('RES', result.data)
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

function followAPI() {
  return axios.post('/api/follow')
}

function* follow(action) {
  try {
    // const result = yield call(followAPI)
    yield delay(1000)
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    })
  } catch (error) {
    //PUT은 Dispatch라고 생각하자
    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data,
    })
  }
}

function unFollowAPI() {
  return axios.post('/api/unfollow')
}

function* unFollow(action) {
  try {
    // const result = yield call(unFollowAPI)
    yield delay(1000)
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    })
  } catch (error) {
    //PUT은 Dispatch라고 생각하자
    yield put({
      type: UNFOLLOW_FAILURE,
      error: error.response.data,
    })
  }
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn)
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

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow),
  ])
}
