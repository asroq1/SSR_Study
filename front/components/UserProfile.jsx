import { Button, Card } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOutRequestAction } from '../reducers/user'

const UserProfile = () => {
  const dispatch = useDispatch()
  const { me, logOutLoading } = useSelector(state => state.user)
  const onLogout = useCallback(() => {
    dispatch(logOutRequestAction())
  }, [])

  return (
    <>
      <Card
        actions={[
          <div key="twit">
            HOWLING
            <br />
            {me.Posts.length}
          </div>,
          <div key="followings">
            팔로잉
            <br />
            {me.Followings.length}
          </div>,
          <div key="followers">
            팔로워
            <br />
            {me.Followers.length}
          </div>,
        ]}
      >
        <Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title="jung" />
        <Button onClick={onLogout} loading={logOutLoading}>
          로그아웃
        </Button>
      </Card>
    </>
  )
}

export default UserProfile
