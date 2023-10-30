const authController = require('../controllers/authController.js');
const router = require('express').Router()

// GET PROCESSING (REFACTOR)

router.get('/login', (req, res) => res.render('login.ejs'));

router.get('/register', authController.renderRegister);

// POST MAPPING

router.post('/register', authController.register);

router.post('/login', authController.login)

router.post('/logout', authController.logout)

module.exports = router