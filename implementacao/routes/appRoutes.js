const userController = require('../controllers/userController');

const router = require('express').Router()

// GET

router.get('/home', userController.getHomePage);

router.get('/benefits', userController.getBenefitsPage);

router.get('/partners', userController.getPartnersPage);

router.get('/students', userController.getStudentsPage);

module.exports = router