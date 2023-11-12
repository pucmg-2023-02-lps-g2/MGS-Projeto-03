const { renderHomePage, renderPartnersPage, renderStudentsPage, renderBenefitsPage, renderTransactionsPage } = require("../models/userModel")

module.exports = {

    async getHomePage(req, res) {

        await renderHomePage(req, res)
    },

    async getTransactionsPage(req, res) {

        await renderTransactionsPage(req, res)
    },

    async getStudentsPage(req, res) {

        await renderStudentsPage(req, res)
    },
    
    async getBenefitsPage(req, res) {

        await renderBenefitsPage(req, res)
    },

    async getPartnersPage(req, res) {

        await renderPartnersPage(req, res)
    },
}