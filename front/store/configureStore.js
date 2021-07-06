import { createWrapper } from 'next-redux-wrapper'
import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from '../reducers'
const configureStrore = () => {
	const middlewares = []
	const enhancer =
		process.env.NODE_ENV === 'production'
			? compose(applyMiddleware(...middlewares))
			: composeWithDevTools(applyMiddleware(...middlewares))

	const store = createStore(reducer, enhancer)
	return store
}

const wrapper = createWrapper(configureStrore, {
	debug: process.env.NODE_ENV === 'development',
})

export default wrapper
