const express = require('express')
const controller = express.Router()
const users = require('../data/simulated-database')
// let users = require('../data/simulated-database')


// post - create - create user
// http://localhost:5000/api/users
controller.post('/', (httpRequest, httpResponse) => {
     
     let user = {

          id: (users[users.length -1])?.id > 0 ? (users[users.length -1])?.id + 1 : 1,
          firstName: httpRequest.body.firstName,
          lastName: httpRequest.body.lastName,
          email: httpRequest.body.email,
          password: httpRequest.body.password
     }
     users.push(user)
     httpResponse.status(201).json(user)
})

// get - read - get all users
// http://localhost:5000/api/users
controller.get('/', (httpRequest, httpResponse) => {
     httpResponse.status(200).json(users)
})

module.exports = controller