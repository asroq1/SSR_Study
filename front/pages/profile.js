import React, { useEffect } from 'react'
React.useLayoutEffect = React.useEffect
import Head from 'next/head'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'
import AppLayout from '../components/AppLayout'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
} from '../reducers/user'
import wrapper from '../store/configureStore'
import { END } from 'redux-saga'
import axios from 'axios'
const Profile = () => {
  const dispatch = useDispatch()
  const { me } = useSelector(state => state.user)

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    })
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    })
  }, [])
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/')
    }
  }, [me && me.id])

  if (!me) {
    return null
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>My profile</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Followers} />
      </AppLayout>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : ''
  axios.defaults.headers.Cookie = ''
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie
  }

  context.store.dispatch({
    type: LOAD_POST_REQUEST,
  })
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  })
  context.store.dispatch(END)
  await context.store.sagaTask.toPromise()
})

export default Profile
