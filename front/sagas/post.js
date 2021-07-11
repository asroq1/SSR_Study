import { all, fork, call, put, takeLatest, delay } from 'redux-saga/effects'
import axios from 'axios'
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from '../reducers/post'

export default function* postSaga() {
  function addPostAPI(action) {
    return axios.post('/api/post', action.data)
  }

  function* addPost(action) {
    try {
      // const result = yield call(addPostAPI, action.data)
      yield delay(1000)
      yield put({
        type: ADD_POST_SUCCESS,
        data: action.data,
      })
    } catch (error) {
      //PUT은 Dispatch라고 생각하자
      yield put({
        type: ADD_POST_FAILURE,
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

  function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
  }
  yield all([fork(watchAddPost), fork(watchAddComment)])
}
