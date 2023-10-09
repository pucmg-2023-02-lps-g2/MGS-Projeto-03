const router = require('express').Router();

const authController = require('../controllers/authController.js')
const userController = require('../controllers/userController.js')
const partnerController = require('../controllers/partnerController.js')

// General
router.get("/", (req, res) => {
    res.render('index.ejs')
})

router.get("/home", (req, res) => {
    res.render('home.ejs')
})

// Login and register
router.get("/login", (req, res) => {
    res.render('login.ejs')
})

router.post("/login", authController.login)

router.post("/register", authController.register)

router.get("/register", (req, res) => {
    res.render('register.ejs')
})

// Users
router.get('/users', userController.listStudents, userController.listTeachers);

router.post('/addStudent', userController.addStudent);

router.post("/users/delete/:cpf", (req, res) => {
    userController.deleteStudent(req, res);
});

// Partners
router.get('/partners', partnerController.listPartners);

router.post('/partners/add', partnerController.addPartner);

router.post("/partners/delete/:id", (req, res) => {
    partnerController.deletePartner(req, res);
});

module.exports = router
