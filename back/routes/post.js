const express = require('express')
const { Post, Image, Comment, User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    })
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    })
    res.status(201).json(fullPost)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  //POST /post/?/comment
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    })
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.')
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    })
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    })

    res.status(201).json(fullComment)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.patch('/:postId/like', async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } })
    if (!post) {
      return res.status(403).send('게시물이 존재하지 않습니다.')
    }
    await post.addLikers(req.user.id)
    res.json({ PostId: post.id, UserId: req.user.id })
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.delete('/:postId/like', async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } })
    if (!post) {
      return res.status(403).send('게시물이 존재하지 않습니다.')
    }
    await post.removeLikers(req.user.id)
    res.json({ PostId: post.id, UserId: req.user.id })
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.delete('/', (req, res) => {
  //Delete /post
  res.json({
    id: 1,
  })
})
module.exports = router
