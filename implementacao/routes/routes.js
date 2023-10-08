const router = require('express').Router();   

const authController = require('../controllers/authController.js')
const userController = require('../controllers/userController.js')

router.get("/", (req, res) => {
    res.render('index.ejs')
})

router.get("/login", (req, res) => {
    res.render('login.ejs')
})

router.post("/login", authController.login)

router.post("/register", authController.register)

router.get("/register", (req, res) => {
    res.render('register.ejs')
})

router.get('/users', userController.listStudents);

// TODO Adicionar rota /addStudent

module.exports = router
