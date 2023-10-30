const { giveCoins, removeCoins } = require("../models/studentModel")

module.exports = {

    async giveCoins(req, res) {

        await giveCoins(req, res)
    },

    async removeCoins(req, res) {

        await removeCoins(req, res)
    },
}