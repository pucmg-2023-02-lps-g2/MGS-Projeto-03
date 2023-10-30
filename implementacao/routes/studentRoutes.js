const studentController = require('../controllers/studentController');

const router = require('express').Router()

router.post('/update/:id', studentController.giveCoins);

router.post('/benefit/', studentController.removeCoins);

module.exports = router