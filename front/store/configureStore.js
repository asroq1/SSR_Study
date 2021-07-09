// import { createWrapper } from 'next-redux-wrapper'
// import { applyMiddleware, compose, createStore } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import createSagaMiddleware from 'redux-saga'
// import reducer from '../reducers'
// import rootSaga from '../sagas'
// const configureStrore = () => {
// 	const sagaMiddleware = createSagaMiddleware()
// 	const middlewares = [sagaMiddleware]
// 	const enhancer =
// 		process.env.NODE_ENV === 'production'
// 			? compose(applyMiddleware(...middlewares))
// 			: composeWithDevTools(applyMiddleware(...middlewares))

// 	const store = createStore(reducer, enhancer)

// 	store.sagaTask = sagaMiddleware.run(rootSaga)
// 	return store
// }

// const wrapper = createWrapper(configureStrore, {
// 	debug: process.env.NODE_ENV === 'development',
// })

// export default wrapper

import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from '../reducers'
import rootSaga from '../sagas'

const configureStore = context => {
	console.log(context)
	const sagaMiddleware = createSagaMiddleware()
	const middlewares = [sagaMiddleware]
	const enhancer =
		process.env.NODE_ENV === 'production'
			? compose(applyMiddleware(...middlewares))
			: composeWithDevTools(applyMiddleware(...middlewares))
	const store = createStore(reducer, enhancer)
	store.sagaTask = sagaMiddleware.run(rootSaga)
	return store
}

const wrapper = createWrapper(configureStore, {
	debug: process.env.NODE_ENV === 'development',
})

export default wrapper
