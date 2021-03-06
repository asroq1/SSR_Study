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
  LOAD_SINGLE_POST_FAILURE,
  LOAD_SINGLE_POST_REQUEST,
  LOAD_SINGLE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  RETWEET_POST_FAILURE,
  RETWEET_POST_REQUEST,
  RETWEET_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
} from '../reducers/post'
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user'

export default function* rootSaga() {
  function loadPostsAPI(lastId) {
    return axios.get(`/posts?lastId=${lastId || 0}`)
  }

  function* loadPost(action) {
    try {
      const result = yield call(loadPostsAPI, action.lastId)
      yield put({
        type: LOAD_POST_SUCCESS,
        data: result.data,
      })
    } catch (err) {
      console.error(err)
      yield put({
        type: LOAD_POST_FAILURE,
        error: err.name,
      })
    }
  }
  function singlePostAPI(data) {
    return axios.get(`/post/${data}`)
  }

  function* singlePost(action) {
    try {
      const result = yield call(singlePostAPI, action.lastId)
      yield put({
        type: LOAD_SINGLE_POST_SUCCESS,
        data: result.data,
      })
    } catch (err) {
      console.error(err)
      yield put({
        type: LOAD_SINGLE_POST_FAILURE,
        error: err.name,
      })
    }
  }

  function addPostAPI(data) {
    return axios.post('/post', data)
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
      //PUT??? Dispatch?????? ????????????
      yield put({
        type: ADD_POST_FAILURE,
        error: error.response.data,
      })
    }
  }

  function removePostAPI(data) {
    return axios.delete(`/post/${data}`)
  }

  function* removePost(action) {
    try {
      const result = yield call(removePostAPI, action.data)
      yield put({
        type: REMOVE_POST_SUCCESS,
        data: result.data,
      })
      yield put({
        type: REMOVE_POST_OF_ME,
        data: result.data,
      })
    } catch (error) {
      //PUT??? Dispatch?????? ????????????
      console.error(error)
      yield put({
        type: REMOVE_POST_FAILURE,
        error: error.response.data,
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
        error: error.response.data,
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
          error: error.response.data,
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
          error: error.response.data,
        })
    }
  }

  function uploadImagesAPI(data) {
    return axios.post(`/post/images`, data)
  }

  function* uploadImages(action) {
    try {
      const result = yield call(uploadImagesAPI, action.data)
      console.log('ResultImg', result)
      yield put({
        type: UPLOAD_IMAGES_SUCCESS,
        data: result.data,
      })
    } catch (error) {
      console.error(error),
        yield put({
          type: UPLOAD_IMAGES_FAILURE,
          error: error.response.data,
        })
    }
  }
  function retweetAPI(data) {
    return axios.post(`/post/${data}/retweet`)
  }

  function* retweet(action) {
    try {
      const result = yield call(retweetAPI, action.data)
      console.log('RES', result.data)
      yield put({
        type: RETWEET_POST_SUCCESS,
        data: result.data,
      })
    } catch (error) {
      console.error(error),
        yield put({
          type: RETWEET_POST_FAILURE,
          error: error.response.data,
        })
    }
  }
  function* watchSinglePost() {
    yield takeLatest(LOAD_SINGLE_POST_REQUEST, singlePost)
  }
  function* watchRetweet() {
    yield takeLatest(RETWEET_POST_REQUEST, retweet)
  }
  function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages)
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
    fork(watchSinglePost),
    fork(watchRetweet),
    fork(watchUploadImages),
    fork(watchRemovePost),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLoadPost),
    fork(watchLikePost),
    fork(watchUnlikePost),
  ])
}
