const { deleteBenefit, addBenefit  } = require("../models/benefitModel")

module.exports = {

    async addBenefit(req, res) {

        await addBenefit(req, res)
    },

    async deleteBenefit(req, res) {

        await deleteBenefit(req, res)
    }
}