const { addBenefit, editBenefit, deleteBenefit  } = require("../models/benefitModel")

module.exports = {

    async addBenefit(req, res) {

        await addBenefit(req, res)
    },

    async deleteBenefit(req, res) {

        await deleteBenefit(req, res)
    },

    async editBenefit(req, res) {

        await editBenefit(req, res)
    },
}