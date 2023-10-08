const router = require('express').Router();   

const authController = require('../controllers/authController.js')
const userController = require('../controllers/userController.js')
const partnerController = require('../controllers/partnerController.js')

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

router.get('/users', userController.listStudents,userController.listTeachers);

router.get('/partners', partnerController.listPartners);

// TODO Adicionar rota /addStudent

module.exports = router
