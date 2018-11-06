const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/database')
const bodyParser = require('body-parser')
const cors = require('cors')


mongoose.connect(config.database)
let db = mongoose.connection

db.once('open', () => {
  console.log('connect to mongodb')
})

db.on('error', (err) => {
  console.log(err)
})

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const articles = require('./routes/articles')
const users = require('./routes/users')

app.use('/api/articles', articles)
app.use('/api/users', users)

app.listen(8080, () => {
  console.log('server in running ...')
})



