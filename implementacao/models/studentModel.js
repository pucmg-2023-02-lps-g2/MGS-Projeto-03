const { supabase } = require("../app");

async function getBalanceByCpf(cpf) {
    const { data } = await supabase.from('person').select('balance').eq('cpf', cpf)

    return data
}

async function getBenefitById(id) {
    const { data } = await supabase.from('benefits').select('*').eq('id', id)

    return data
}

async function removeCoins(req, res) {
    return new Promise(async (resolve, reject) => {
    
        const { price, id } = req.body

        const { cpf } = req.cookies

        try {

            const benefit = await getBenefitById(id)

            const studentBalance = await getBalanceByCpf(cpf)

            await supabase.from('person').update({ balance: (Number(studentBalance[0].balance) - Number(price)) }).eq('cpf', cpf)

            res.render('redeemed', { benefit: benefit[0], balance: studentBalance })

            resolve({ status: 200 })

        } catch (error) {

            reject({ status: 500 })
        }

    })
}

async function giveCoins(req, res) {
    return new Promise(async (resolve, reject) => {
    
        const studentCpf = req.params.id

        const { cpf } = req.cookies

        const { coins } = req.body

        try {

            const studentBalance = await getBalanceByCpf(studentCpf)

            const teacherBalance = await getBalanceByCpf(cpf)

            await supabase.from('person').update({ balance: (Number(studentBalance[0].balance) + Number(coins)) }).eq('cpf', studentCpf)

            await supabase.from('person').update({ balance: (Number(teacherBalance[0].balance) - Number(coins)) }).eq('cpf', cpf)

            res.redirect('/app/students')

            resolve({ status: 200 })

        } catch (error) {

            reject({ status: 500 })

        }
    })
}

module.exports = {
    giveCoins,
    removeCoins,
}