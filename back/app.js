const express = require('express')
const app = express()
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
const cors = require('cors')
const db = require('./models')
db.sequelize
  .sync()
  .then(() => {
    console.log('DB Connected...')
  })
  .catch(console.error)

app.use(
  cors({
    origin: true,
    credentials: false,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('hello express')
})

app.get('/api', (req, res) => {
  res.send('hello api')
})

app.get('/posts', (req, res) => {
  res.json([
    {
      id: 1,
      content: ' hello',
    },
    {
      id: 2,
      content: ' hello',
    },
    {
      id: 3,
      content: ' hello',
    },
  ])
})

//How to set Prefix
app.use('/post', postRouter)
app.use('/user', userRouter)

app.listen(3065, () => {
  console.log('on Server ...!')
})
