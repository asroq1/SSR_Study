const express = require('express')
const { Post, Image, Comment, User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')

try {
  fs.accessSync('uploads')
} catch (error) {
  console.log('uploads폴더를 생성합니다.')
  fs.mkdirSync('uploads')
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads')
    },
    filename(req, file, done) {
      // 제로초.png
      const ext = path.extname(file.originalname) // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext) // 제로초
      done(null, basename + '_' + new Date().getTime() + ext) // 제로초15184712891.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
})

router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  console.log(req.files)
  res.json(req.files.map(data => data.filename))
})
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

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
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

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
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

router.delete(
  '/:postId',
  isLoggedIn,
  upload.array('image'),
  async (req, res, next) => {
    try {
      await Post.destroy({
        where: { id: req.params.postId },
        UserId: req.user.id,
      })
      res.status(200).json({ PostId: parseInt(req.params.postId) })
    } catch (err) {
      console.error(err)
      next(err)
    }
  }
)

module.exports = router
