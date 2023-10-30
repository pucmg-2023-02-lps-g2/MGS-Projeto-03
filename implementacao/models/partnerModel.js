const { supabase } = require("../app");

async function getAllPartners() {
    return new Promise(async (resolve, reject) => {
        try {

            const { data } = await supabase.from('partners').select('*');

            resolve({ status: 200, partners: data })

        } catch (error) {

            reject({ status: 500 })

        }
    })
}

async function addPartner(req, res) {
    return new Promise(async (resolve, reject) => {

        const { id, name } = req.body;

        try {

            await supabase.from('partners').insert([
                {
                    id,
                    name,
                },
            ]);

            resolve({ status: 200 })

        } catch (error) {

            reject({ status: 500 })

        }
    })
}

async function deletePartner(req, res) {
    return new Promise(async (resolve, reject) => {

        const partnerId = req.params.id;

        try {

            await supabase.from("partners").delete().eq("id", partnerId);

            resolve({ status: 200 })

        } catch (error) {

            reject({ status: 500 })

        }
    })
}

module.exports = {
    getAllPartners,
    addPartner,
    deletePartner,
}