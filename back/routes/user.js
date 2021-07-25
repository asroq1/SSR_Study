const express = require('express')
const { User, Post } = require('../models')
const { isLoggendIn, isNotLoggedIn } = require('./middlewares')
const bcrypt = require('bcrypt')
const passport = require('passport')
const router = express.Router()

router.post('/login', (req, res, next) => {
  passport.authenticate('local', isNotLoggedIn, (err, user, info) => {
    if (err) {
      console.error(err)
      next(err)
    }
    if (info) {
      return res.status(401).send(info.reason)
    }
    return req.login(user, async loginErr => {
      if (loginErr) {
        console.err(loginErr)
        return next(loginErr)
      }
      const fullUserNoPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: 'Followings',
          },
          {
            model: User,
            as: 'Followers',
          },
        ],
      })
      return res.status(200).json(fullUserNoPassword)
    })
  })(req, res, next)
})

router.post('/', isLoggendIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    })
    if (exUser) {
      return res.status(403).send('이미 존재하는 아이디입니다.')
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    })
    res.setHeader('Acess-Control-Allow-Origin', '*')
    res.status(201).send('ok')
  } catch (err) {
    console.log(err)
    next(error)
  }
})

router.post('/logout', isNotLoggedIn, (req, res) => {
  req.logout()
  req.session.destroy()
  res.send('ok')
})

module.exports = router
