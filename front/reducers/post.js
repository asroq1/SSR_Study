import shortId from 'shortid'
import produce from 'immer'
import { REMOVE_FOLLOWER_FAILURE } from './user'

export const initialState = {
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  imagePaths: [],
  mainPosts: [],
  loadPostDone: false,
  loadPostLoading: false,
  loadPostError: null,
  addPostDone: false,
  addPostLoading: false,
  addPostError: null,
  removePostDone: false,
  removePostLoading: false,
  removePostError: null,
  addCommentDone: false,
  addCommentLoading: false,
  addCommentError: null,
  hasMorePost: true,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
}
export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST'
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS'
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE'

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST'
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS'
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE'

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST'
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS'
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE'

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST'
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS'
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE'

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const REMOVE_IMAGE = 'REMOVE_IMAGE'

export const RETWEET_POST_REQUEST = 'RETWEET_POST_REQUEST'
export const RETWEET_POST_SUCCESS = 'RETWEET_POST_SUCCESS'
export const RETWEET_POST_FAILURE = 'RETWEET_POST_FAILURE'

export const addPost = data => ({
  type: ADD_POST_REQUEST,
  data,
})
export const addComment = data => ({
  type: ADD_COMMENT_REQUEST,
  data,
})

//리듀서란 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성 유지가 중요.)
const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case RETWEET_POST_REQUEST:
        draft.retweetLoading = true
        draft.retweetDone = false
        draft.retweetError = null
        break
      case RETWEET_POST_SUCCESS:
        draft.mainPosts.unshift(action.data)
        draft.retweetLoading = false
        draft.retweetDone = true
        draft.retweetError = null
        break
      case RETWEET_POST_FAILURE:
        draft.retweetLoading = false
        draft.retweetDone = false
        draft.retweetError = action.error
        break
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data)
        break
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true
        draft.uploadImagesDone = false
        break
      case UPLOAD_IMAGES_SUCCESS: {
        draft.uploadImagesDone = true
        draft.uploadImagesLoading = false
        draft.imagePaths = action.data
        break
      }
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesDone = false
        draft.uploadImagesLoading = false
        draft.uploadImagesError = action.error
        break
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true
        draft.likePostDone = false
        break
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find(v => v.id === action.data.PostId)
        post.Likers.push({ id: action.data.userId })
        draft.likePostDone = true
        draft.likePostLoading = false
        break
      }
      case LIKE_POST_FAILURE:
        draft.likePostDone = false
        draft.likePostLoading = false
        draft.likePostError = action.error
        break
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true
        draft.unlikePostDone = false
        break
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find(v => v.id === action.data.PostId)
        post.Likers = post.Likers.filter(v => v.id !== action.data.userId)
        draft.unlikePostDone = true
        draft.unlikePostLoading = false
        break
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostDone = false
        draft.unlikePostLoading = false
        draft.unlikePostError = action.error
        break
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true
        draft.loadPostDone = false
        break
      case LOAD_POST_SUCCESS:
        draft.loadPostDone = true
        draft.loadPostLoading = false
        draft.hasMorePosts = action.data.length === 10
        draft.mainPosts = draft.mainPosts.concat(action.data)
        break
      case LOAD_POST_FAILURE:
        draft.loadPostDone = false
        draft.loadPostLoading = false
        draft.loadPostError = action.error
        break
      case ADD_POST_REQUEST:
        draft.addPostLoading = true
        draft.addPostDone = false
        draft.addPostError = null
        break
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(action.data)
        draft.addPostDone = true
        draft.addPostLoading = false
        draft.addPostError = null
        draft.imagePaths = []
        break
      case ADD_POST_FAILURE:
        draft.addPostDone = false
        draft.addPostLoading = false
        draft.addPostError = action.error
        break
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true
        draft.removePostDone = false
        draft.removePostError = null
        break
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter(v => v.id !== action.data)
        draft.removePostDone = true
        draft.removePostLoading = false
        draft.removePostError = null
        break
      case REMOVE_POST_FAILURE:
        draft.removeCommentDone = false
        draft.removeCommentLoading = false
        draft.removeCommentError = action.error
        break
      case ADD_COMMENT_REQUEST:
        draft.removeCommentLoading = true
        draft.removeCommentDone = false
        draft.removeCommentError = null
        break
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find(v => v.id === action.data.PostId)
        post.Comments.unshift(action.data)
        draft.addCommentLoading = false
        draft.addCommentDone = true
        break
      case ADD_COMMENT_FAILURE:
        draft.addCommentDone = false
        draft.addCommentLoading = false
        draft.addCommentError = action.error
        break
      default:
        break
    }
  })
}

export default reducer
