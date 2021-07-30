import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { useEffect } from 'react'
import { LOAD_POST_REQUEST } from '../reducers/post'
import { LOAD_MY_INFO_REQUEST } from '../reducers/user'

const home = () => {
  const { me } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { mainPosts, hasMorePost, loadPostLoading, retweetError } = useSelector(
    state => state.post
  )

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
    })
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    })
  }, [])

  useEffect(() => {
    if (retweetError) {
      alert(retweetError)
    }
  }, [retweetError])

  // scrollY : 내린 길이의 총합
  // clientHeight: 보이는 화면의 길이
  // scrollHeight: 브라우저 창의총 길이
  useEffect(() => {
    function onScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostLoading) {
          console.log('ON Scroll In')
          const lastId = mainPosts[mainPosts.length - 1]?.id
          dispatch({
            type: LOAD_POST_REQUEST,
            lastId,
          })
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [hasMorePost, loadPostLoading, mainPosts])

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  )
}

export default home
