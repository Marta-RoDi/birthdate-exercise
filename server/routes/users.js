const express = require('express');
const router = express.Router();
const User = require('../models/User');



router.get('/', (req, res, next) => {
  User.find()
  .then(allUsers => res.json(allUsers))
  .catch(err => console.log(err))
})

router.get('/user/:id', (req, res, next) => {
  const idUser = req.params.id
  User.findById(idUser)
  .then(thisUser => res.json(thisUser))
})

router.post('/new', (req, res) => {
  const {name, birthdate} = req.body;
  User.create({name, birthdate})
  .then(() => {
    User.find()
    .then(allUsers => res.json(allUsers))
  })
}) 

router.post('/edit/:id', (req, res, next) => {
  const {name, birthdate} = req.body;
  const idUser = req.params.id;
  User.findByIdAndUpdate({_id: idUser}, {$set: {name, birthdate}}, {new: true})
  .then(updateUser => res.json(updateUser))
})

router.get('/delete/:id', (req, res) => {
  const idUser = req.params.id;
  User.findByIdAndRemove({_id: idUser})
  .then(deleteUser => res.json(deleteUser))
})



module.exports = router;