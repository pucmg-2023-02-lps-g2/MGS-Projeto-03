const userController = require('../controllers/userController');

const router = require('express').Router()

router.get('/', (req, res) => res.render('index.ejs'));

router.get('/home', userController.getHomePage);

module.exports = router