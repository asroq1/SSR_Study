import {
  all,
  fork,
  put,
  takeLatest,
  delay,
  throttle,
  call,
} from 'redux-saga/effects'
import axios from 'axios'
import shortId from 'shortid'
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
} from '../reducers/post'
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user'

export default function* rootSaga() {
  function loadPostAPI(data) {
    return axios.get('/posts', data)
  }

  function* loadPost(action) {
    try {
      const result = yield call(loadPostAPI, action.data)

      yield put({
        type: LOAD_POST_SUCCESS,
        data: result.data,
      })
    } catch (error) {
      //PUT은 Dispatch라고 생각하자
      yield put({
        type: LOAD_POST_FAILURE,
        data: error.response.data,
      })
    }
  }

  function addPostAPI(data) {
    return axios.post('/post', { content: data })
  }

  function* addPost(action) {
    console.log('action', action)
    try {
      const result = yield call(addPostAPI, action.data)
      yield put({
        type: ADD_POST_SUCCESS,
        data: result.data,
      })
      yield put({
        type: ADD_POST_TO_ME,
        data: result.data.id,
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
  function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data)
  }

  function* addComment(action) {
    try {
      const result = yield call(addCommentAPI, action.data)
      yield delay(1000)
      yield put({
        type: ADD_COMMENT_SUCCESS,
        data: result.data,
      })
    } catch (error) {
      yield put({
        type: ADD_COMMENT_FAILURE,
        data: error.response.data,
      })
    }
  }
  function likePostAPI(data) {
    return axios.patch(`/post/${data}/like`)
  }

  function* likePost(action) {
    try {
      const result = yield call(likePostAPI, action.data)
      yield put({
        type: LIKE_POST_SUCCESS,
        data: result.data,
      })
    } catch (error) {
      console.error(error),
        yield put({
          type: LIKE_POST_FAILURE,
          data: error.response.data,
        })
    }
  }
  function UnlikePostAPI(data) {
    return axios.delete(`/post/${data}/like`)
  }

  function* UnlikePost(action) {
    try {
      const result = yield call(UnlikePostAPI, action.data)
      yield put({
        type: UNLIKE_POST_SUCCESS,
        data: result.data,
      })
    } catch (error) {
      console.error(error),
        yield put({
          type: UNLIKE_POST_FAILURE,
          data: error.response.data,
        })
    }
  }

  function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost)
  }
  function* watchUnlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, UnlikePost)
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
    fork(watchLikePost),
    fork(watchUnlikePost),
  ])
}
