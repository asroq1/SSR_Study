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
          src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'nero',
          },
          content: '우와 개정판이 나왔군요~',
        },
        {
          User: {
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

  addCommentDone: false,
  addCommentLoading: false,
  addCommentError: null,
}
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

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
  id: '2',
  content: data,
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
})
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostDone: true,
        addPostLoading: false,
        addPostError: null,
      }
    case ADD_POST_FAILURE:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addCommentDone: false,
        addCommentLoading: false,
        addCommentError: action.error,
      }
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      }
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addCommentDone: true,
        addCommentLoading: false,
        addCommentError: null,
      }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addCommentDone: false,
        addCommentLoading: false,
        addCommentError: action.error,
      }
    default:
      return state
  }
}

export default reducer
