import React, { useCallback, useState } from 'react'
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
import { REMOVE_POST_REQUEST } from '../reducers/post'
import FollowButton from './FollowButton'
const PostCard = ({ post }) => {
  const { me } = useSelector(state => state.user)
  const { removePostLoading } = useSelector(state => state.post)
  const id = me && me.id
  const [liked, setLiked] = useState(false)
  const [commentFormOpen, setCommentFormOpen] = useState(false)
  const dispatch = useDispatch()
  const onToggleLike = useCallback(() => {
    setLiked(prev => !prev)
  }, [])

  const onToggleComment = useCallback(() => {
    setCommentFormOpen(prev => !prev)
  }, [])

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    })
  }, [])

  return (
    <div style={{ marginBottom: 10 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
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
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
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
  }).isRequired,
}

export default PostCard
