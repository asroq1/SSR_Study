export const initialState = {
	mainPosts: [
		{
			id: 1,
			User: {
				id: 1,
				nickname: 'devicii',
			},
			content: ' 첫 번째 게시글 #해시태크 #태스트',
			Images: [
				{
					src: 'https://placeimg.com/200/100/any',
				},
				{
					src: 'https://placeimg.com/200/100/any',
				},
				{
					src: 'https://placeimg.com/200/100/any',
				},
			],
		},
	],
	Comments: [
		{
			User: {
				nickname: 'devicii',
			},
			content: '너무 신기해요 !',
		},
		{
			User: {
				nickname: 'jung',
			},
			content: 'Pretty awesome !  !',
		},
	],

	imagePaths: [],
	postAdded: false,
}

const ADD_POST = 'ADD_POST'

export const addPost = {
	type: ADD_POST,
}

const dummyPost = {
	id: 2,
	content: '더미 이미지',
}
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				mainPosts: [dummyPost, ...state.mainPosts],
				postAdded: true,
			}
		default:
			return state
	}
}

export default reducer
