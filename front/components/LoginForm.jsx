import Link from 'next/link'
import React, { useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput'
import { useDispatch } from 'react-redux'
import { loginAction } from '../reducers/user'

const ButtonWrapper = styled.div`
	margin-top: '10px';
`
const FormWrapper = styled(Form)`
	padding: 10px;
`
const LoginForm = () => {
	const dispatch = useDispatch()
	const [id, onChangeId] = useInput('')
	const [password, onChangePwd] = useInput('')

	const onSubmitForm = useCallback(() => {
		dispatch(loginAction(id, password))
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

LoginForm.propTypes = {
	setIsLoggedIn: PropTypes.func.isRequired,
}
export default LoginForm
