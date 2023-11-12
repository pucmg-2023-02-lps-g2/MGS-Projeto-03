const { supabase } = require("../app");
const { getPartnerIdByCpf } = require("./userModel");

async function addBenefit(req, res) {
    return new Promise(async (resolve, reject) => {
        const { id, name, price, description, } = req.body;
        const { cpf } = req.cookies;

        try {
            // Recupera o id do parceiro pelo cpf do usuário logado para que o usuário não necessite informá-lo
            // const partner_id = await getPartnerIdByCpf(cpf);
            const partner_id = 2;    

            await supabase.from('benefits').insert([
                {
                    id,
                    partner_id,
                    name,
                    price,
                    description
                },
            ]);

            res.status(200).redirect('back');
            resolve({ status: 200 });
        } catch (error) {
            console.error('Error:', error);
            reject({ status: 500 });
        }
    });
}

async function deleteBenefit(req, res) {
    return new Promise(async (resolve, reject) => {

        const benefitId = req.params.id;

        try {

            await supabase.from("benefits").delete().eq("id", benefitId);

            resolve({ status: 200 })

            res.status(200).redirect('back');

        } catch (error) {

            reject({ status: 500 })

        }
    })
}

module.exports = {
    addBenefit,
    deleteBenefit,
}