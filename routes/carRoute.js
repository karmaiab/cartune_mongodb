const express = require('express');
const carController=require('../controllers/carController')
const router = express.Router()

router.post('/car', carController.createCar);

module.exports = router;