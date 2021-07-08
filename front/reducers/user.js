const initialState = {
	isLoggedIn: false,
	signUpData: {},
	loginData: {},
	me: null,
}

//액션 크리에이터

export const loginRequestAction = data => {
	return {
		type: 'LOG_IN_REQUEST',
		data,
	}
}
export const loginSuccessAction = data => {
	return {
		type: 'LOG_IN_SUCCESS',
		data,
	}
}
export const loginFailureAction = data => {
	return {
		type: 'LOG_IN_FAILURE',
		data,
	}
}
export const logOutRequestAction = data => {
	return {
		type: 'LOG_OUT_REQUEST',
	}
}
export const logOutSuccessAction = data => {
	return {
		type: 'LOG_OUT_SUCCESS',
	}
}
export const logOutFailureAction = data => {
	return {
		type: 'LOG_OUT_FAILURE',
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOG_IN':
			return {
				...state,
				isLoggedIn: true,
				me: action.data,
			}
		case 'LOG_OUT':
			return {
				...state,
				isLoggedIn: false,
				me: null,
			}
		default:
			return state
	}
}

export default reducer
