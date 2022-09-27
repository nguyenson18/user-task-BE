const  express = require('express')
const router = express.Router()
const {createUser, getAllUser, deleteUser, updateUser} = require('../controllers.js/user.controllers')

router.get('/', getAllUser)

router.post('/', createUser)

router.delete('/:id', deleteUser)

router.put('/:id', updateUser)

module.exports = router