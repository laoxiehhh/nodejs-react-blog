const express = require('express')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const config = require('../config/jwt')
const User = require('../model/user')

let router = express.Router()

const commonValidateInput = (data) => {
  let errors = {}

  if (validator.isEmpty(data.username)) {
    errors.username = 'the field is required'
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'the field is required'    
  }
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'the field is required'
  }
  if (validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "The field is required";
  }
  if (!validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Passwords must match";
  }
  return {
    errors,
    isValid: !Object.keys(errors).length
  }
}

const validateInput = (data, otherValidations) => {
  let { errors } = otherValidations(data)

  let hasUsername, hasEmail
  return new Promise((resolve, reject) => {
    User.find({}, ['username', 'email'], (err, docs) => {
      if (err) {
        console.log(err)
      } else {
        hasUsername = docs.some((item, index) => {
          return item.username === data.username
        })
        hasEmail = docs.some((item, index) => {
          return item.email === data.email
        })
        if (hasEmail) errors.email = 'There is user with such email'
        if (hasUsername) errors.username = 'There is user with such username'  
        resolve({
          errors,
          isValid: !Object.keys(errors).length
        })
      }
    })
  })
}

router.post('/register/username', (req, res) => {
  let hasUsername
  User.find({}, 'username', (err, users) => {
    if (err) {
      res.status(500).json({ errors: err })
    } else {
      if (users) {
        hasUsername = users.some((user, index) => {
          return user.username === req.body.username
        })
      }
      if (hasUsername) {
        res.json({ success: false, message: 'There is user with such username' })
      } else {
        res.json({ success: true })
      }
    }
  })
})

router.post('/register/email', (req, res) => {
  let hasEmail
  User.find({}, 'email', (err, users) => {
    if (err) {
      res.status(500).json({ errors: err })
    } else {
      if (users) {
        hasEmail = users.some((user, index) => {
          return user.email === req.body.email
        })
      }
      if (hasEmail) {
        res.json({ success: false, message: 'There is user with such email' })
      } else {
        res.json({ success: true })
      }
    }
  })
})

router.post('/register', (req, res) => {
  validateInput(req.body, commonValidateInput).then(({ errors, isValid }) => {
    if (isValid) {
      const {username, name, email, password} = req.body
      const password_digest = bcrypt.hashSync(password, 10)
      const query = {username, name, email, password: password_digest}
      let user = new User(query)
      user.save((err) => {
        if (err) {
          res.status(500).json({ errors: err })
        } else {
          res.json({ success: true })
        }
      })
    } else {
      res.json({ success: false, errors })
    }
  })
})

router.get('/', (req,res) => {
  User.find({}, (err, docs) => {
    res.json({ data: docs })
  })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  let errors = {}
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).json({ errors: err })
    } else {
      if (!user) {
        res.json({
          success: false,
          message: 'No User Found'
        })
      } else {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            res.status(500).json({ errors: err })
          } 
          if (isMatch) {
            const token = jwt.sign({
              id: user._id,
              username: user.username
            }, config.jwtSecret)
            res.json({
              success: true,
              token
            })
          } else {
            res.json({
              success: false,
              message: 'Incorrect password'
            })
          }
        })
      }
    }
  })
})

module.exports = router