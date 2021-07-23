const express = require('express')
const { User } = require('../models')
const bcrypt = require('bcrypt')

const router = express.Router()

router.post('/', async (req, res, next) => {
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

module.exports = router
