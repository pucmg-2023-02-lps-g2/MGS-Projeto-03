const userController = require('../controllers/userController');

const router = require('express').Router()

router.get('/home', userController.getHomePage);

router.get('/partners', userController.getPartnersPage);

router.get('/students', userController.getStudentsPage);

router.get('/user-benefits', userController.getUserBenefitsPage);

router.get('/partner-benefits', userController.getPartnerBenefitsPage);

router.get('/transactions', userController.getTransactionsPage);

module.exports = router