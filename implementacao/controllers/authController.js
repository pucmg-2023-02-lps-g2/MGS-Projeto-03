const { registerStudent, login, logout, renderRegisterPage } = require("../models/userModel")

module.exports = {

    async renderRegister(req, res) {

        await renderRegisterPage(req, res)
    },

    async register(req, res) {

        registerStudent(req, res)
    },

    async login(req, res) {

        login(req, res)
    },

    async logout(req, res) {

        await logout(req, res)
    }
}