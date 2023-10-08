const router = require('express').Router();   

const authController = require('../controllers/authController.js')

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

router.get("/users", (req, res) => {
    res.send("users.ejs")
});

// TODO Adicionar rota /addStudent

module.exports = router
