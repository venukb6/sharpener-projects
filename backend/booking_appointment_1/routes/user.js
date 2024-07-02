const express = require('express')

const router = express.Router()

const userController = require('../controllers/user')

router.post('/add-user', userController.postAddUser)

router.get('/get-user', userController.getAllUsers)

router.delete('/delete-user/:id', userController.postDeleteUser)

router.put('/edit-user/:id', userController.postEditUser)


module.exports = router;

