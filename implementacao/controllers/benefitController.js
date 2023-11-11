const { renderBenefitsPage } = require("../models/userModel")

module.exports = {
    async getBenefitsPage(req, res) {

        await renderBenefitsPage(req, res)
    },
}