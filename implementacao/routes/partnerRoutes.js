const partnerController = require('../controllers/partnerController');

const router = require('express').Router()

router.post('/add', partnerController.addPartner);

router.post('/delete/:id', partnerController.deletePartner);

module.exports = router