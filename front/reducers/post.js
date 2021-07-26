import shortId from 'shortid'
import produce from 'immer'

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
}

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

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT _REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT _SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT _FAILURE'

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
        draft.hasMorePost = draft.mainPosts.length < 50
        draft.mainPosts = action.data.concat(draft.mainPosts)
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
        draft.mainPosts = [dummyPost, ...state.mainPosts]
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
