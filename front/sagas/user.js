import { all, fork, put, takeLatest, delay } from 'redux-saga/effects'
import axios from 'axios'
import {
	LOG_IN_FAILURE,
	LOG_IN_REQUEST,
	LOG_IN_SUCCESS,
	LOG_OUT_FAILURE,
	LOG_OUT_REQUEST,
	LOG_OUT_SUCCESS,
	SIGN_UP_FAILURE,
	SIGN_UP_REQUEST,
	SIGN_UP_SUCCESS,
} from '../reducers/user'

export default function* userSaga() {
	function loginAPI(data) {
		return axios.post('/api/login', data)
	}

	function* logIn(action) {
		try {
			// const result = yield call(loginAPI, action.data)
			yield delay(1000)
			yield put({
				type: LOG_IN_SUCCESS,
				// data: result.data,
				data: action.data,
			})
		} catch (error) {
			//PUT은 Dispatch라고 생각하자
			yield put({
				type: LOG_IN_FAILURE,
				error: error.response.data,
			})
		}
	}

	function logoutAPI() {
		return axios.post('/api/logout')
	}

	function* logOut() {
		try {
			// const result = yield call(logoutAPI)
			yield delay(1000)
			yield put({
				type: LOG_OUT_SUCCESS,
			})
		} catch (error) {
			//PUT은 Dispatch라고 생각하자
			yield put({
				type: LOG_OUT_FAILURE,
				error: error.response.data,
			})
		}
	}

	function signUpAPI() {
		return axios.post('/api/signUp')
	}

	function* signUp() {
		try {
			// const result = yield call(logoutAPI)
			yield delay(1000)
			yield put({
				type: SIGN_UP_SUCCESS,
				// data : result.data
			})
		} catch (error) {
			//PUT은 Dispatch라고 생각하자
			yield put({
				type: SIGN_UP_FAILURE,
				error: error.response.data,
			})
		}
	}

	function* watchLogIn() {
		yield takeLatest(LOG_IN_REQUEST, logIn)
	}

	function* watchLogOut() {
		yield takeLatest(LOG_OUT_REQUEST, logOut)
	}
	function* watchSignUp() {
		yield takeLatest(SIGN_UP_REQUEST, signUp)
	}

	yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)])
}
