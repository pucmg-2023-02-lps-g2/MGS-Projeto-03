const benefitController = require('../controllers/benefitController');

const router = require('express').Router()

router.post('/delete/:id', benefitController.deleteBenefit);

module.exports = router