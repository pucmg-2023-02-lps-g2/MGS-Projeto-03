const benefitController = require('../controllers/benefitController');

const router = require('express').Router()

router.post('/add', benefitController.addBenefit);

router.post('/delete/:id', benefitController.deleteBenefit);

router.post('/edit', benefitController.editBenefit);

module.exports = router