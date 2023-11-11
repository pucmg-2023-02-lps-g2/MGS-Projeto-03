const { supabase } = require("../app");

async function renderBenefitsPage(req, res) {
    return new Promise(async (resolve, reject) => {

        const { token } = req.cookies

        try {

            const { balance } = await getPersonById(token)

            const benefits = await listBenefits()

            res.render('benefits', { benefits, balance })

            resolve({ status: 200 })

        } catch (error) {

            reject({ status: 500 })

        }
    })
}