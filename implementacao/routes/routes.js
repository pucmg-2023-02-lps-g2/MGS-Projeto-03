const router = require('express').Router();

const authController = require('../controllers/authController.js')
const userController = require('../controllers/userController.js')
const partnerController = require('../controllers/partnerController.js')

// Index

router.get("/", (req, res) => {
    res.render('index.ejs')
})

// Home

router.get("/home", (req, res) => {
    res.render('home.ejs')
})

// Login

router.get("/login", (req, res) => {
    res.render('login.ejs')
})

// Logout

router.post('/logout', authController.logout)

router.post("/login", authController.login)

// Register

router.get("/register", authController.renderRegister)

router.post("/register", authController.register)

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
