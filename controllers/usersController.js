const express = require('express')
const controller = express.Router()
const users = require('../data/simulated-database')
// let users = require('../data/simulated-database')


controller.param('id', (req, res, next, id) => {
     req.user = users.find(user => user.id == id)
     next()
})


     // post - create - create user - http://localhost:5000/api/users
controller.route('/')
.post((httpRequest, httpResponse) => {     
     
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
     // get - read - get all users - http://localhost:5000/api/users
.get((httpRequest, httpResponse) => {
     httpResponse.status(200).json(users)
})


// get - read - get specific user - http://localhost:5000/api/users/1
controller.route('/:id')
.get((httpRequest, httpResponse) => {
     
     if (httpRequest.user != undefined) {
          httpResponse.status(200).json(httpRequest.user)
     } else {
          httpResponse.status(404).json()
     }
})
.put((httpRequest, httpResponse) => {
          
     if (httpRequest.user != undefined) {
          users.forEach(user => {
               if (user.id == httpRequest.user.id) {
                    user.firstName = httpRequest.body.firstName ? httpRequest.body.firstName : user.firstName
                    user.lastName = httpRequest.body.lastName ? httpRequest.body.lastName : user.lastName
                    user.email = httpRequest.body.email ? httpRequest.body.email : user.email
               }
               httpResponse.status(200).json(httpRequest.user)
          })
     } else {
          httpResponse.status(404).json()
     } 
      
})
.delete((httpRequest, httpResponse) => {
          
     if (httpRequest.user != undefined) {
          users = users.filter(user => user.id !== httpRequest.user.id)
          httpResponse.status(204).json()
     
     } else {
          httpResponse.status(404).json()
     }
})

module.exports = controller