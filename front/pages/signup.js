import React, { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import { Form, Input, Checkbox, Button } from 'antd'
import useInput from '../hooks/useInput'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { SIGN_UP_REQUEST } from '../reducers/user'
import Router from 'next/router'
const ErrorMessages = styled.div`
  color: red;
`
const Signup = () => {
  const [email, onChangeId] = useInput('')
  const [nickname, onChangeNickname] = useInput('')
  const [password, onChangePassword] = useInput('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const dispatch = useDispatch()
  const { signUpLoading, signUpDone, signUpError } = useSelector(
    state => state.user
  )
  useEffect(() => {
    if (signUpDone) {
      Router.push('/')
    }
  }, [signUpDone])

  useEffect(() => {
    if (signUpError) {
      alert('이미 존재하는 아이디입니다.')
    }
  }, [signUpError])
  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.target.value)
      setPasswordError(e.target.value !== password)
    },
    [password]
  )
  const [term, setTerm] = useState('')
  const [termError, setTermError] = useState(false)
  const onChangeTerm = useCallback(e => {
    setTerm(e.target.checked)
    setTermError(false)
  }, [])
  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true)
    }
    if (!term) {
      return setTermError(true)
    }
    console.log('view', email, password, nickname)
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    })
  }, [email, password, passwordCheck, term])
  return (
    <>
      <AppLayout>
        <Head>
          <meta charSet="utf-8" />
          <title>My profile</title>
        </Head>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-email">이메일</label>
            <br />
            <Input
              name="user-id"
              value={email}
              required
              onChange={onChangeId}
              type="email"
            />
          </div>
          <div>
            <label htmlFor="user-nick">닉네임</label>
            <br />
            <Input
              name="user-nick"
              value={nickname}
              required
              onChange={onChangeNickname}
            />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호 확인</label>
            <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <ErrorMessages>비밀번호가 일치하지 않습니다.</ErrorMessages>
            )}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              약관에 동의합니다.
            </Checkbox>
            {termError && (
              <ErrorMessages>약관에 동의하셔야 합니다.</ErrorMessages>
            )}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit" loading={signUpLoading}>
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  )
}
export default Signup
