const express = require('express')
const app = express()
const morgan = require('morgan')
const postsRouter = require('./routes/posts')
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')

const cors = require('cors')
const db = require('./models')
const passportConfig = require('./passport')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

dotenv.config()
db.sequelize
  .sync()
  .then(() => {
    console.log('DB Connected...')
  })
  .catch(console.error)
passportConfig()
app.use(morgan('dev'))
app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('hello express')
})

app.get('/api', (req, res) => {
  res.send('hello api')
})

//How to set Prefix
app.use('/posts', postsRouter)
app.use('/post', postRouter)
app.use('/user', userRouter)

app.listen(3065, () => {
  console.log('on Server ...!')
})
