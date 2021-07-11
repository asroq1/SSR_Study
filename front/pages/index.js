import { useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { useEffect } from 'react'
const home = () => {
  const { me } = useSelector(state => state.user)
  const { mainPosts } = useSelector(state => state.post)

  useEffect(() => {
    mainPosts.map(post => {
      console.log(post.Images[0])
    })
  }, [])
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
