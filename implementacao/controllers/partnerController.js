const { addPartner, deletePartner } = require("../models/partnerModel")

module.exports = {

    async addPartner(req, res) {

        await addPartner(req, res)
    },

    async deletePartner(req, res) {

        await deletePartner(req, res)
    }
}