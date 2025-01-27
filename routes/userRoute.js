const express = require('express');
const userController=require('../controllers/userController')
const router = express.Router()

router.post('/user', userController.regUser);

router.get('/user/all', userController.allUsers);

module.exports = router;