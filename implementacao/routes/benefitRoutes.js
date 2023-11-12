const benefitController = require('../controllers/benefitController');

const router = require('express').Router()

router.post('/add', benefitController.addBenefit);

router.post('/delete/:id', benefitController.deleteBenefit);

module.exports = router