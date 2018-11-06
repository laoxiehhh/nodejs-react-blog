const express = require('express')
const authenticate = require('../middlewares/authenticate')
let router = express.Router()
const Article = require('../model/article')
const User = require('../model/user')

const validate = (data) => {
  let errors = {}
  if (data.title === '') errors.title = "Can't be empty"
  if (data.body === '') errors.body = "Can't be empty"
  

  const isValid = Object.keys(errors).length === 0
  return { errors, isValid }
}

router.get('/', (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) {
      res.status(500).json({ errors: err })
    } else {
      res.json({ articles })
    }
  })
}) 

router.get('/:id', (req,res) => {
  Article.findById(req.params.id, (err, article) => {
    User.findById(article.author, (err, user) => {
      res.json({
        article,
        author: user.name
      })
    })
  })
})

router.post('/create', authenticate, (req, res) => {
  const { errors, isValid } = validate(req.body)
  if (isValid) {
    let article = new Article(req.body)
    article.author = req.currentUser._id
    article.save((err) => {
      if (err) {
        res.status(500).json({ errors: { global: "Something is wrong..." } })
      } else {
        res.json({ success: true })
      }
    })
  } else {
    res.json({ success: false, errors })
  }
})

router.put('/update/:id', authenticate, (req, res) => {
  let query = { _id: req.params.id }
  let { errors, isValid } = validate(req.body)
  if (isValid) {
    Article.update(query, req.body, (err) => {
      if (err) {
        res.status(500).json({ errors: { global: err } })
      } else {
        console.log(req.body)
        res.json({ success: true })
      }
    })
  } else {
    res.status(400).json({ errors })
  }
})

router.delete('/:id', authenticate, (req, res) => {
  let query = { _id: req.params.id }
  Article.findById(query, (err, article) => {
    if (article.author != req.currentUser._id) {
      res.status(500).send()
    } else {
      console.log(article.author)
      console.log(req.currentUser._id)
      Article.deleteOne(query, (err) => {
        if (err) {
          res.status(500).json({ errors: err })
        } else {
          res.json({ success: true })
        }
      })
    }
  })
})

module.exports = router