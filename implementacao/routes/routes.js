const router = require('express').Router();

const authController = require('../controllers/authController.js')
const userController = require('../controllers/userController.js')
const partnerController = require('../controllers/partnerController.js')
const benefitController = require('../controllers/benefitController.js')

// Index

router.get("/", (req, res) => {
    res.render('index.ejs')
})

router.get("/home", async (req, res, next) => {
    const role = req.cookies.user_role
    cpf = req.cookies.cpf

    if (role === 'teacher') {
        const teacherBalance = await userController.getTeacherBalance(req, res, cpf);
        res.render("home_teacher", { teacherBalance });
    } else {
        try {
            const studentBalance = await userController.getStudentBalance(req, res, cpf);
            const benefits = await benefitController.listBenefits();
            res.render("home_student", { benefits, studentBalance });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
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
router.get('/users', userController.listUsers, benefitController.listBenefits);

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
