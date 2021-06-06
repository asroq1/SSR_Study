import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { Form, Input, Button } from 'antd'
import styled from 'styled-components'
const ButtonWrapper = styled.div`
	margin-top: '10px';
`
const FormWrapper = styled(Form)`
	padding: 10px;
`
const LoginForm = ({ setIsLoggedIn }) => {
	const [id, setId] = useState('')
	const [password, setPassword] = useState('')

	const onChangeId = useCallback(e => {
		setId(e.target.value)
	}, [])

	const onChangePwd = useCallback(e => {
		setPassword(e.target.value)
	}, [])

	const onSubmitForm = useCallback(() => {
		console.log(id, password)
		setIsLoggedIn(true)
	}, [id, password])
	return (
		<FormWrapper onFinish={onSubmitForm}>
			<div>
				<label htmlFor="user-id">ID</label>
				<br />
				<Input name="user-id" value={id} onChange={onChangeId} required />
			</div>
			<div>
				<label htmlFor="user-pwd">Password</label>
				<br />
				<Input
					name="user-pwd"
					value={password}
					onChange={onChangePwd}
					required
				/>
			</div>
			<ButtonWrapper>
				<Button type="primary" htmlType="submit" loading={false}>
					LogIn
				</Button>
				<Link href="/signup">
					<a>
						<Button>SignUp</Button>
					</a>
				</Link>
			</ButtonWrapper>
			<div></div>
		</FormWrapper>
	)
}

export default LoginForm
