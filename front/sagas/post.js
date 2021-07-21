import { all, fork, put, takeLatest, delay, throttle } from 'redux-saga/effects'
import axios from 'axios'
import shortId from 'shortid'
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  generateDummyPost,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from '../reducers/post'
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user'

export default function* rootSaga() {
  function loadPostAPI(action) {
    return axios.get('/api/post', action.data)
  }

  function* loadPost(action) {
    try {
      // const result = yield call(loadPostAPI, action.data)
      yield delay(1000)
      const id = shortId.generate()
      yield put({
        type: LOAD_POST_SUCCESS,
        data: generateDummyPost(10),
      })
    } catch (error) {
      //PUT은 Dispatch라고 생각하자
      yield put({
        type: LOAD_POST_FAILURE,
        data: error.response.data,
      })
    }
  }

  function addPostAPI(action) {
    return axios.post('/api/post', action.data)
  }

  function* addPost(action) {
    try {
      // const result = yield call(addPostAPI, action.data)
      yield delay(1000)
      const id = shortId.generate()
      yield put({
        type: ADD_POST_SUCCESS,
        data: {
          id,
          content: action.data,
        },
      })
      yield put({
        type: ADD_POST_TO_ME,
        data: id,
      })
    } catch (error) {
      //PUT은 Dispatch라고 생각하자
      yield put({
        type: ADD_POST_FAILURE,
        data: error.response.data,
      })
    }
  }

  function removePostAPI(action) {
    return axios.delete('/api/post', action.data)
  }

  function* removePost(action) {
    try {
      // const result = yield call(addPostAPI, action.data)
      yield delay(1000)
      const id = shortId.generate()
      yield put({
        type: REMOVE_POST_SUCCESS,
        data: action.data,
      })
      yield put({
        type: REMOVE_POST_OF_ME,
        data: action.data,
      })
    } catch (error) {
      //PUT은 Dispatch라고 생각하자
      yield put({
        type: REMOVE_POST_FAILURE,
        data: error.response.data,
      })
    }
  }
  function addCommentAPI(action) {
    return axios.post(`/api/post/${data.postId}/comment`, action.data)
  }

  function* addComment(action) {
    try {
      // const result = yield call(addPostAPI, action.data)
      yield delay(1000)
      yield put({
        type: ADD_COMMENT_SUCCESS,
        data: action.data,
      })
    } catch (error) {
      //PUT은 Dispatch라고 생각하자
      yield put({
        type: ADD_COMMENT_FAILURE,
        data: error.response.data,
      })
    }
  }

  function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost)
  }

  function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost)
  }

  function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
  }
  function* watchLoadPost() {
    yield throttle(2000, LOAD_POST_REQUEST, loadPost)
  }
  yield all([
    fork(watchRemovePost),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLoadPost),
  ])
}
