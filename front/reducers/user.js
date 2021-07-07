const initialState = {
	isLoggedIn: false,
	signUpData: {},
	loginData: {},
	me: null,
}

//액션 크리에이터

export const loginAction = data => {
	return {
		type: 'LOG_IN',
		data,
	}
}
export const logOutAction = data => {
	return {
		type: 'LOG_OUT',
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
