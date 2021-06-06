import React from 'react'
import 'antd/dist/antd.css'
import PropTypes from 'prop-types'
import Head from 'next/head'
const Devicii = ({ Component }) => {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title>devicii</title>
			</Head>
			<Component />
		</>
	)
}
Devicii.propTypes = {
	Components: PropTypes.elementType.isRequired,
}
export default Devicii
