const { supabase, sgMail } = require("../app");
const { createNewTransaction, getPersonByCpf } = require("./userModel");

async function getBalanceByCpf(cpf) {
    const { data } = await supabase.from('person').select('balance').eq('cpf', cpf)

    return data
}

async function getBenefitById(id) {
    const { data } = await supabase.from('benefits').select('*').eq('id', id)

    return data
}

async function getPartnerById(id) {

    const { data, error } = await supabase.from('partner_reps').select('*').eq('partner_id', id)

    return data
}

async function getPersonEmailByUUID(uuid) {

    // const { data, error } = await supabase.from('auth.users').select('email').eq('id', uuid)

    const { data, error } = await supabase.auth.admin.getUserById(uuid)
    
    console.log(data, error);

    return data
}

async function removeCoins(req, res) {
    const { price, id } = req.body;
    const { cpf, email, name } = req.cookies;

    try {
        const benefit = await getBenefitById(id);
        const partner = await getPartnerById(benefit[0].partner_id);
        const partnerPerson = await getPersonByCpf(partner[0].cpf);
        const studentBalance = await getBalanceByCpf(cpf);

        checkBalance(studentBalance, price, res);

        await updateBalance(cpf, studentBalance, price);

        const message = `- ${Number(price)} Moedas - Resgatou ${benefit[0].name}`;
        await createNewTransaction(cpf, message);

        const cupomId = crypto.randomUUID();

        await sendEmailToStudent(email, benefit, cupomId);
        await sendEmailToPartner(partnerPerson.email, name, benefit, cupomId);

        res.render('redeemed', { benefit: benefit[0], balance: studentBalance });

        return { status: 200 };
    } catch (error) {
        throw new Error(`Failed to remove coins: ${error}`);
    }
}

function checkBalance(studentBalance, price, res) {
    if (Number(studentBalance[0].balance) - Number(price) < 0) {
        res.render('error', { message: 'Você não tem moedas suficientes para resgatar esse benefício' });
        throw new Error('Insufficient balance');
    }
}

async function updateBalance(cpf, studentBalance, price) {
    await supabase.from('person').update({ balance: (Number(studentBalance[0].balance) - Number(price)) }).eq('cpf', cpf);
}

async function sendEmailToStudent(email, benefit, cupomId) {
    const msgStudent = {
        to: email.replace(/%40/g, "@"),
        from: '1396722@sga.pucminas.br',
        subject: 'MGS - Cupom para Resgate de Beneficio Presencial',
        text: 'Cupom MGS',
        html: `
            <div>
                <p>Obrigado por resgatar o beneficio <strong>${benefit[0].name}!</strong> Geramos um cupom para que você possa resgata-lo presencialmente: </p>
                <p>Cupom: <strong>${cupomId}</strong></p>
            <div>`,
    };

    await sgMail.send(msgStudent);
}

async function sendEmailToPartner(email, name, benefit, cupomId) {
    const msgPartner = {
        to: email,
        from: '1396722@sga.pucminas.br',
        subject: 'MGS - Beneficio Resgatado',
        text: 'Cupom MGS',
        html: `
            <div>
                <p>A estudante <strong>${name.replace(/%40/g, " ")}</strong> resgatou o beneficio <strong>${benefit[0].name}</strong> e um cupom foi gerado: </p>
                <p>Cupom: <strong>${cupomId}</strong></p>
            </div>`,
    };

    await sgMail.send(msgPartner);
}


async function giveCoins(req, res) {
    return new Promise(async (resolve, reject) => {
    
        const studentCpf = req.params.id

        const { cpf } = req.cookies

        const { coins } = req.body

        try {

            const studentBalance = await getBalanceByCpf(studentCpf)

            const teacherBalance = await getBalanceByCpf(cpf)

            if (Number(teacherBalance[0].balance) - Number(coins) < 0) {
                res.render('error', { message: 'Você não tem moedas suficientes para enviar' })

                return
            }

            await supabase.from('person').update({ balance: (Number(studentBalance[0].balance) + Number(coins)) }).eq('cpf', studentCpf)

            await supabase.from('person').update({ balance: (Number(teacherBalance[0].balance) - Number(coins)) }).eq('cpf', cpf)

            await createNewTransaction(studentCpf, `+ ${Number(coins)} moedas — Recebeu moedas`)

            await createNewTransaction(cpf, `- ${Number(coins)} moedas — Enviou moedas`)

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