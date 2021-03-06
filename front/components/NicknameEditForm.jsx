import React, { useCallback, useEffect, useMemo } from 'react'
import { Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user'
import useInput from '../hooks/useInput'

const NicknameEditform = () => {
  const { me } = useSelector(state => state.user)
  const [nickname, onChangeNickname] = useInput(me?.nickname || '')
  const dispatch = useDispatch()

  const style = useMemo(() => ({
    marginBottom: '20px',
    border: '1px solid #d0d0d0',
    padding: '20px',
  }))

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    })
  }, [nickname])

  return (
    <Form style={style}>
      <Input.Search
        value={nickname}
        addonBefore="닉네임"
        enterButton="수정"
        onChange={onChangeNickname}
        onSearch={onSubmit}
      />
    </Form>
  )
}

export default NicknameEditform
