import Link from 'next/link'
import React, { useCallback, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequestAction, LOG_IN_REQUEST } from '../reducers/user'

const ButtonWrapper = styled.div`
  margin-top: '10px';
`
const FormWrapper = styled(Form)`
  padding: 10px;
`
const LoginForm = () => {
  const { loginLoading, loginError } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [email, onChangeEmail] = useInput('')
  const [password, onChangePwd] = useInput('')

  const onSubmitForm = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    })
  }, [email, password])

  useEffect(() => {
    if (loginError) {
      alert(loginError)
    }
  }, [loginError])
  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input
          name="user-email"
          value={email}
          onChange={onChangeEmail}
          type="email"
          required
        />
      </div>
      <div>
        <label htmlFor="user-pwd">비밀번호</label>
        <br />
        <Input
          name="user-pwd"
          value={password}
          onChange={onChangePwd}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={loginLoading}>
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
