import React from 'react'
import propTypes from 'prop-types'
import Link from 'next/link'
import { Input, Menu, Row, Col } from 'antd'

const AppLayout = ({ children }) => {
	return (
		<div>
			<Menu mode="horizontal">
				<Menu.Item>
					<Link href="/">
						<a>Devicii</a>
					</Link>
				</Menu.Item>
				<Menu.Item>
					<Link href="/profile">
						<a>Profile</a>
					</Link>
				</Menu.Item>
				<Menu.Item>
					<Link href="/signup">
						<a>SignUp</a>
					</Link>
				</Menu.Item>
				<Menu.Item>
					<Input.Search enterButton style={{ verticalAlign: 'middle' }} />
				</Menu.Item>
			</Menu>
			<Row gutter={8}>
				<Col xs={24} md={6}>
					Lefts
				</Col>
				<Col xs={24} md={12}>
					center
					{children}
				</Col>
				<Col xs={24} md={6}>
					<a
						href="https:://google.co.kr"
						target="blank"
						rel="noreferrer noopener"
					>
						made in korea
					</a>
				</Col>
			</Row>
		</div>
	)
}

AppLayout.propTypes = {
	children: propTypes.node.isRequired,
}

export default AppLayout
