const benefitModel = require(".././models/benefitModel")


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
};