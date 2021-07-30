import React from 'react'
import { useRouter } from 'next/router'
import { LOAD_SINGLE_POST_REQUEST } from '../../reducers/post'
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user'
import { END } from '@redux-saga/core'
import wrapper from '../../store/configureStore'
import axios from 'axios'
import AppLayout from '../../components/AppLayout'
import PostCard from '../../components/PostCard'
import { useSelector } from 'react-redux'

const Post = () => {
  const router = useRouter()
  const { id } = router.query
  const { singlePost } = useSelector(state => state.post)
  return (
    <AppLayout>
      <PostCard post={singlePost} />
    </AppLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : ''
  console.log(context)
  axios.defaults.headers.Cookie = ''
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  })
  context.store.dispatch({
    type: LOAD_SINGLE_POST_REQUEST,
    data: context.params.id,
  })
  context.store.dispatch(END)
  await context.store.sagaTask.toPromise()
  return { props: {} }
})

export default Post
