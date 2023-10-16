const benefitModel = require(".././models/benefitModel")
const userModel = require(".././models/userModel")

async function redeemBenefit(req, res) {

    try {

        const benefit = await benefitModel.getBenefitById(req.params.id)

        await userModel.removeFromStudentBalance(req.cookies.cpf, req.body.benefitPrice)
        
        const balance = await userModel.getStudentBalance(req.cookies.cpf)

        res.render('redeemed', { benefit, balance })
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

}

async function listBenefits(req, res) {
    try {
        const benefits = await benefitModel.getAllBenefits();
        return benefits;
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    listBenefits,
    redeemBenefit,
};