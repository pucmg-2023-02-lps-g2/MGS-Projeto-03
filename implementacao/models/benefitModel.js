const { supabase } = require("../app");

async function deleteBenefit(req, res) {
    return new Promise(async (resolve, reject) => {

        const benefitId = req.params.id;

        try {

            await supabase.from("benefits").delete().eq("id", benefitId);

            resolve({ status: 200 })

        } catch (error) {

            reject({ status: 500 })

        }
    })
}

module.exports = {
    deleteBenefit,
}