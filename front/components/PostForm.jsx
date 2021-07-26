import React, { useCallback, useEffect, useRef } from 'react'
import { Form, Input, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, ADD_POST_REQUEST } from '../reducers/post'
import useInput from '../hooks/useInput'
const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector(state => state.post)
  const dispatch = useDispatch()
  const [text, onChangeText, setText] = useInput('')
  const imageInput = useRef()

  useEffect(() => {
    if (addPostDone) {
      setText('')
    }
  }, [addPostDone])

  const onSubmit = useCallback(() => {
    dispatch({ type: ADD_POST_REQUEST, data: text })
  }, [text])
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current])
  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="당신의 기분을 말해보세요."
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          확인
        </Button>
      </div>
      <div>
        {imagePaths.map(data => (
          <div key={data} style={{ display: 'inline-block' }}>
            <img src={data} style={{ width: '200px' }} alt={data} />
          </div>
        ))}
      </div>
    </Form>
  )
}

export default PostForm
