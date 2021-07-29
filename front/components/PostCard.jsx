import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import PostImages from './PostImages'
import { Popover, Card, Button, Avatar, List, Comment } from 'antd'
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import CommentForm from './CommentForm'
import PostCardContent from './PostCardContent'
import {
  LIKE_POST_REQUEST,
  REMOVE_POST_REQUEST,
  RETWEET_POST_REQUEST,
  UNLIKE_POST_REQUEST,
} from '../reducers/post'
import FollowButton from './FollowButton'
const PostCard = ({ post }) => {
  const { me } = useSelector(state => state.user)
  const { removePostLoading } = useSelector(state => state.post)
  const id = me && me.id
  const liked = post.Likers.find(v => v.id === id)
  const [commentFormOpen, setCommentFormOpen] = useState(false)
  const dispatch = useDispatch()

  const onLike = useCallback(() => {
    if (!id) {
      return alert('자신의 글은 리트윗 하실 수 없습니다.')
    }

    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    })
  }, [id])
  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('잘못된 접근입니다.')
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    })
  }, [id])

  const onToggleComment = useCallback(() => {
    if (!id) {
      return alert('잘못된 접근입니다.')
    }

    setCommentFormOpen(prev => !prev)
  }, [])

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('잘못된 접근입니다.')
    }

    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    })
  }, [])
  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('잘못된 접근입니[다.')
    }
    return dispatch({
      type: RETWEET_POST_REQUEST,
      data: post.id,
    })
  }, [id])
  return (
    <div style={{ marginBottom: 10 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onUnlike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      type="danger"
                      onClick={onRemovePost}
                      loading={removePostLoading}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
        title={
          post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null
        }
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <Card.Meta
              avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
          />
        )}
      </Card>
      {commentFormOpen && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={item => (
              <>
                <li>
                  <Comment
                    author={item.User.nickname}
                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                    content={item.content}
                  />
                </li>
              </>
            )}
          />
        </div>
      )}
      {/* <CommentForm />
			<Comments /> */}
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    UserId: PropTypes.number,
    content: PropTypes.string,
    createAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
}

export default PostCard
