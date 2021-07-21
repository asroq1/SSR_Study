import shortId from 'shortid'
import produce from 'immer'
export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '제로초',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          id: shortId.generate(),
          src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        },
        {
          id: shortId.generate(),
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        },
        {
          id: shortId.generate(),
          src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'nero',
          },
          content: '우와 개정판이 나왔군요~',
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'hero',
          },
          content: '얼른 사고싶어요~',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostDone: false,
  addPostLoading: false,
  addPostError: null,

  removePostDone: false,
  removePostLoading: false,
  removePostError: null,

  addCommentDone: false,
  addCommentLoading: false,
  addCommentError: null,
}
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

const dummyPost = data => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
})

const dummyComment = data => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: 'devicii',
  },
})

//리듀서란 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성 유지가 중요.)
const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true
        draft.addPostDone = false
        draft.addPostError = null
        break
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(dummyPost(action.data))
        draft.addPostDone = true
        draft.addPostLoading = false
        draft.addPostError = null
        break
      case ADD_POST_FAILURE:
        draft.addCommentDone = false
        draft.addCommentLoading = false
        draft.addCommentError = action.error
        break
      case ADD_POST_REQUEST:
        draft.addPostLoading = true
        draft.addPostDone = false
        draft.addPostError = null
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
        const post = draft.mainPosts.find(v => v.id === action.data.postId)
        post.Comments.unshift(dummyComment(action.data.content))
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
